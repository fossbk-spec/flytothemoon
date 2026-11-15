import { Engine } from './engine_loader.mjs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const keys = ['air','water','food','energy'];
const low = s => keys.reduce((a,b) => s.res[b] < s.res[a] ? b : a);
const sum = fx => keys.reduce((n,k) => n + (fx[k] || 0), 0);
const choice = n => Math.floor(Engine.rand()*n);
const median = a => { const x=[...a].sort((u,v)=>u-v); return (x[(x.length-1)>>1]+x[x.length>>1])/2; };

export function play(strategy, seed, detail=false) {
  Engine.setSeed(seed);
  const s=Engine.newState('challenge');
  Engine.step(s,{type:'start',mode:'challenge'});
  for(let turns=0; turns<10000 && s.phase!=='lose'; turns++){
    let i;
    switch(s.phase){
      case 'choose':
        if(strategy==='random') i=choice(s.hand.length);
        else {
          const k=low(s), prep=s.hand.findIndex(c=>c.id===s.challenge.card);
          i=s.day>=3 && prep>=0 && s.res[k]>=30 ? prep :
            s.hand.reduce((best,c,j)=> (c.fx[k]||0)>(s.hand[best].fx[k]||0) ? j : best,0);
        }
        Engine.step(s,{type:'select',i});
        Engine.step(s,'confirm-card');
        break;
      case 'cardResult': Engine.step(s,'after-card'); break;
      case 'event':
        i=strategy==='random' ? choice(s.lastEvent.options.length) :
          s.lastEvent.options.reduce((best,o,j)=>sum(o.fx)>sum(s.lastEvent.options[best].fx)?j:best,0);
        Engine.step(s,{type:'event-opt',i}); break;
      case 'eventResult': Engine.step(s,'after-event'); break;
      case 'challenge': Engine.step(s,'challenge-ok'); break;
      case 'dayEnd': Engine.step(s,'next-day'); break;
      case 'cycleEnd':
        if(strategy==='random') i=choice(s.rewards.length);
        else {
          const desired='up-'+low(s);
          i=s.rewards.findIndex(r=>r.id==='heal');
          if(i<0) i=s.rewards.findIndex(r=>r.id===desired);
          if(i<0) i=s.rewards.findIndex(r=>r.id==='stash');
          if(i<0) i=0;
        }
        Engine.step(s,{type:'pick-reward',i});
        Engine.step(s,'next-cycle'); break;
      default: throw new Error('Unexpected phase '+s.phase);
    }
  }
  return detail ? {cycles:s.cyclesDone, loss:s.loseRes, phase:s.phase, state:s} : {cycles:s.cyclesDone, loss:s.loseRes, phase:s.phase};
}

export function simulate(count=500, seed=1){
  const result={};
  for(const strategy of ['greedy','random']){
    const runs=Array.from({length:count},(_,i)=>play(strategy,seed+i*7919+(strategy==='random'?1000003:0)));
    const losses=Object.fromEntries(keys.map(k=>[k,runs.filter(r=>r.loss===k).length]));
    result[strategy]={median:median(runs.map(r=>r.cycles)),early:runs.filter(r=>r.cycles<2).length/count,
      losses, maxLossShare:Math.max(...Object.values(losses))/count};
  }
  return result;
}
if(process.argv[1] && resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url))){
  const count=Number(process.argv[2]||500), seed=Number(process.argv[3]||1);
  console.log(JSON.stringify({count,seed,...simulate(count,seed)},null,2));
}
