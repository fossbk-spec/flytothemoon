"""Prototype balance model for 'Su menh vo han' (PRJ-INF-01). NOT the game engine.
Purpose: sanity-check that parameters give finite-but-long runs. Replace by tools/sim.mjs importing the real engine.
Usage: python tools/proto_balance.py [runs] [seed]
"""
import random, statistics, sys
R = ['air','water','food','energy']
CONS = dict(air=6, water=7, food=8, energy=5)
CFG = dict(start=70, y1=5.0, lvl_mult=(1.0,1.5,2.0), g=0.12, crew0=3, crew_exp=0.85,
           card_main=13, card_side=-6, ev_chance=0.55, ev_loss=8, chal_base=10, chal_step=3,
           lunar=[-4,4,6,3,-5], rule_drain=0.5, reward_heal=20, cons_day=0.0)
def cons(r, crew, n, day, nrules, cfg):
    base = CONS[r]*(crew/cfg['crew0'])**cfg['crew_exp']*(1+cfg['g']*(n-1)) + cfg['cons_day']*(day-1)
    return base + cfg['rule_drain']*nrules*(1 if r in ('energy','water') else 0.5)
def run(rng, cfg, policy='greedy'):
    res = {r:cfg['start'] for r in R}
    mods = [dict(r=r, lvl=0) for r in R]          # 4 starter modules
    crew, n, grid = cfg['crew0'], 1, 9
    rules = 0
    while True:
        for day in range(1,6):
            low = min(R, key=lambda r: res[r])
            # card: 3 random cards, each boosts one resource (+main) and costs side on another
            hand = [(rng.choice(R), rng.choice(R)) for _ in range(3)]
            if policy=='random': m,s = rng.choice(hand)
            else:
                hand.append((low, rng.choice([x for x in R if x!=low])))   # booster guarantee
                m,s = max(hand, key=lambda h:(h[0]==low, -(h[1]==low)))
            res[m]+=cfg['card_main']
            if s!=m: res[s]+=cfg['card_side']
            # build/upgrade action (greedy only): upgrade module of lowest net resource, cost 6 energy
            if policy!='random' and res['energy']>=30:
                cand=[x for x in mods if x['lvl']<2]
                if cand:
                    x=min(cand,key=lambda x:(res[x['r']]+0, x['lvl'])); x['lvl']+=1; res['energy']-=6
            if rng.random()<cfg['ev_chance'] and day<5:
                res[rng.choice(R)]-=cfg['ev_loss']
            if day==5:   # challenge, prepared 60% (greedy) / 20% (random)
                P=cfg['chal_base']+cfg['chal_step']*n
                prep = rng.random()<(0.6 if policy!='random' else 0.2)
                res[rng.choice(R)] -= P*(0.5 if prep else 1)
            for r in R:
                inc = sum(cfg['y1']*cfg['lvl_mult'][x['lvl']] for x in mods if x['r']==r)
                res[r] += inc - cons(r,crew,n,day,rules,cfg)
            res['energy'] += cfg['lunar'][day-1]
            for r in R: res[r]=max(0,min(100,res[r]))
            if min(res.values())<=0: return n-1 + (day-1)/5
        # cycle reward
        n+=1
        if n>=2: rules+=1
        if n in (3,6,9,12,15,18) and crew<8: crew+=1
        if n in (8,16): grid+=7
        opt = rng.random()
        low=min(R,key=lambda r:res[r])
        if len(mods)<grid and rng.random()<0.5: mods.append(dict(r=low,lvl=0))   # new module on weakest resource
        else:
            cand=[x for x in mods if x['lvl']<2]
            if cand: min(cand,key=lambda x:res[x['r']])['lvl']+=1
            else: res[low]=min(100,res[low]+cfg['reward_heal'])
def main():
    runs=int(sys.argv[1]) if len(sys.argv)>1 else 500; seed=int(sys.argv[2]) if len(sys.argv)>2 else 1
    for pol in ('random','greedy'):
        rng=random.Random(seed); out=[run(rng,CFG,pol) for _ in range(runs)]
        out.sort(); q=lambda p: out[int(p*(len(out)-1))]
        print(f"{pol:7s} runs={runs} median={statistics.median(out):.1f} p10={q(.1):.1f} p90={q(.9):.1f} "
              f"P(>=3)={sum(o>=3 for o in out)/runs:.2f} P(>=6)={sum(o>=6 for o in out)/runs:.2f} P(>=10)={sum(o>=10 for o in out)/runs:.2f}")
if __name__=='__main__': main()
