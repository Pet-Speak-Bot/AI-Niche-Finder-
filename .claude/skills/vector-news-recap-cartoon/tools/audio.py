# python3 tools/audio.py <ep>   -> build/mix_music.wav + build/mix_nomusic.wav (-14 LUFS)
# VO = episodes/<ep>/vo.mp3 ; music = episodes/<ep>/music.mp3, else engine/audio/default.mp3 if the user added one, else a soft synth pad
import json,numpy as np,subprocess,wave,sys,os
EP=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','episodes',sys.argv[1]);ENG=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','engine','audio')
META=json.load(open(os.path.join(EP,'build','meta.json')))
SR=44100;END=META['END'];N=int(END*SR)
def load(f):
    r=subprocess.run(['ffmpeg','-v','error','-i',f,'-f','f32le','-ac','1','-ar',str(SR),'-'],capture_output=True);return np.frombuffer(r.stdout,np.float32).copy()
vo=load(os.path.join(EP,'vo.mp3'));mf=os.path.join(EP,'music.mp3');df=os.path.join(ENG,'default.mp3')
def pad(n):
    x=np.arange(n)/SR;o=np.zeros(n)
    for i,ch in enumerate([(220,261.6,329.6),(174.6,220,261.6),(130.8,196,261.6),(196,246.9,293.7)]):
        w=np.zeros(n);w[int(i*4*SR):int((i+1)*4*SR)]=1
        o+=sum(np.sin(2*np.pi*f*x)+.3*np.sin(4*np.pi*f*x) for f in ch)*w
    k=int(.4*SR);return np.convolve(o,np.ones(k)/k,'same')*(1+.15*np.sin(2*np.pi*x/2))
mus=load(mf) if os.path.exists(mf) else load(df) if os.path.exists(df) else pad(16*SR);sw=[load(os.path.join(ENG,'swoosh1.wav')),load(os.path.join(ENG,'swoosh2.wav'))]
while len(mus)<N:mus=np.concatenate([mus,mus])
DUCK=META.get('DUCK',[])  # optional [[start,end]] quiet music (set window.DUCK in episode)
t=lambda d:np.arange(int(d*SR))/SR
def env(d,a=.003,r=None):
    x=t(d);e=np.minimum(1,x/a);return e*np.exp(-x/(r or d/4))
def pop(): x=t(.09);f=900*np.exp(-x*30)+300;return np.sin(2*np.pi*np.cumsum(f)/SR)*env(.09,.002,.025)*.8
def ding(f0=1320): x=t(1.2);return (np.sin(2*np.pi*f0*x)+.4*np.sin(2*np.pi*f0*2.01*x)+.2*np.sin(2*np.pi*f0*3.0*x))*env(1.2,.003,.3)*.35
def check(): return np.concatenate([ding(988)[:int(.09*SR)]*.8,ding(1480)])
def drop(): x=t(.25);f=1200*np.exp(-x*12)+200;return np.sin(2*np.pi*np.cumsum(f)/SR)*env(.25,.003,.08)*.7
def alert(): x=t(.7);return (np.sin(2*np.pi*440*x)*(x<.3)+np.sin(2*np.pi*330*x)*(x>=.32))*np.exp(-((x%.35))*5)*.25
def thump(): x=t(.4);f=120*np.exp(-x*8)+45;s=np.sin(2*np.pi*np.cumsum(f)/SR)*env(.4,.002,.1);n=np.random.RandomState(1).randn(len(x))*env(.4,.001,.02)*.3;return (s+n)*.9
def stamp(): a=thump();b=ding(1046);o=np.zeros(len(b)+int(.05*SR));o[:len(a)]+=a;o[int(.05*SR):]+=b*.7;return o
def chip(): x=t(.05);return np.random.RandomState(2).randn(len(x))*env(.05,.001,.008)*.35
def tick():
    o=np.zeros(int(1.45*SR))
    for k in range(18):
        i=int(k*.08*SR);c=chip()*1.2;o[i:i+len(c)]+=c[:len(o)-i]
    return o
G={'pop':pop,'ding':ding,'check':check,'drop':drop,'alert':alert,'stamp':stamp,'chip':chip,'tick':tick}
fx=np.zeros(N+SR*2,np.float32)
for e in META['SFX']:
    s=sw[0] if e['type']=='sw1' else sw[1] if e['type']=='sw2' else G[e['type']]()
    s=s/ (np.abs(s).max()+1e-9)*e['vol']
    i=int(e['t']*SR);fx[i:i+len(s)]+=s[:len(fx)-i]
fx=fx[:N]
v=np.zeros(N,np.float32);v[:min(N,len(vo))]=vo[:N]
def rms(x):return np.sqrt(np.mean(x[np.abs(x)>1e-4]**2))
fx*= rms(v)/rms(fx)*10**(-12/20)
m=mus[:N].copy();m*=rms(v)/rms(m)*10**(-21/20)
x=np.arange(N)/SR;g=np.ones(N);[g.__setitem__((x>a)&(x<b),.45) for a,b in DUCK];g=np.convolve(g,np.ones(SR//2)/(SR//2),'same');m*=g
m*=np.minimum(1,(END-x)/2.0)*np.minimum(1,x/0.3)
fade=np.minimum(1,(END-x)/.6)
def save(a,f):
    a=(a*fade).astype(np.float32);subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(SR),'-ac','1','-i','-','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-ar','48000','-ac','2',f],input=a.tobytes())
save(v+fx+m,os.path.join(EP,'build','mix_music.wav'));save(v+fx,os.path.join(EP,'build','mix_nomusic.wav'))
