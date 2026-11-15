# python3 tools/islands.py <ep> [--model DIR]
# Finds speech islands in episodes/<ep>/vo.mp3 (silence >= 0.18 s) and transcribes each with sherpa-onnx whisper,
# so you can copy start times into C[] in episode.js.   --split S E   prints the quietest point between S and E
# (to start a caption card mid-island).   Model: sherpa-onnx-whisper-turbo from k2-fsa GitHub releases (see HOW-TO).
import sys,os,subprocess,re,numpy as np,wave
ep=sys.argv[1];EP=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','episodes',ep)
M=os.path.expanduser(sys.argv[sys.argv.index('--model')+1] if '--model' in sys.argv else '~/asr/sherpa-onnx-whisper-turbo')
wav=os.path.join(EP,'build','vo16.wav');os.makedirs(os.path.dirname(wav),exist_ok=True)
subprocess.run(['ffmpeg','-v','error','-y','-i',os.path.join(EP,'vo.mp3'),'-ar','16000','-ac','1',wav],check=True)
w=wave.open(wav);sr=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
if '--split' in sys.argv:
    i=sys.argv.index('--split');s,e=float(sys.argv[i+1]),float(sys.argv[i+2]);h=int(.06*sr)
    print('quietest point: %.2f'%min(np.arange(s,e,.01),key=lambda t:np.sqrt(np.mean(a[int(t*sr):int(t*sr)+h]**2))));sys.exit()
out=subprocess.run(['ffmpeg','-hide_banner','-i',wav,'-af','silencedetect=n=-38dB:d=0.18','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',out)];en=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',out)]
b=[0.0];[b.extend([s,e]) for s,e in zip(st,en)];b.append(len(a)/sr);isl=[(b[i],b[i+1]) for i in range(0,len(b)-1,2) if b[i+1]-b[i]>.15]
try:
    import sherpa_onnx
    r=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=M+'/turbo-encoder.int8.onnx',decoder=M+'/turbo-decoder.int8.onnx',tokens=M+'/turbo-tokens.txt',language='th',task='transcribe',num_threads=4)
except Exception as ex: r=None;print('(no ASR model: %s) times only'%ex)
lines=[]
for s,e in isl:
    txt=''
    if r: x=r.create_stream();x.accept_waveform(sr,a[int(s*sr):int(e*sr)]);r.decode_stream(x);txt=x.result.text
    lines.append('%6.2f-%6.2f  %s'%(s,e,txt));print(lines[-1],flush=True)
open(os.path.join(EP,'build','islands.txt'),'w').write('\n'.join(lines)+'\nVO length %.2f s\n'%(len(a)/sr))
