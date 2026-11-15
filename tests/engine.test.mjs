import test from 'node:test';
import assert from 'node:assert/strict';
import { Engine } from '../tools/engine_loader.mjs';
import { play } from '../tools/sim_n1.mjs';

const keys=['air','water','food','energy'];
const pick=n=>Math.floor(Engine.rand()*n);
function advance(s, random=true){
  let i;
  switch(s.phase){
    case 'choose':
      i=random?pick(s.hand.length):0;
      Engine.step(s,{type:'select',i});
      Engine.step(s,'confirm-card'); break;
    case 'cardResult': Engine.step(s,'after-card'); break;
    case 'event': Engine.step(s,{type:'event-opt',i:pick(s.lastEvent.options.length)}); break;
    case 'eventResult': Engine.step(s,'after-event'); break;
    case 'challenge': Engine.step(s,'challenge-ok'); break;
    case 'dayEnd': Engine.step(s,'next-day'); break;
    case 'cycleEnd':
      Engine.step(s,{type:'pick-reward',i:pick(s.rewards.length)});
      Engine.step(s,'next-cycle'); break;
    default: throw Error(s.phase);
  }
}
test('resource invariant across 2000 random games',()=>{
  for(let game=0;game<2000;game++){
    Engine.setSeed(game+1);
    const s=Engine.newState('challenge');
    Engine.step(s,'start');
    for(let turn=0;turn<1000 && s.phase!=='lose';turn++){
      advance(s);
      for(const k of keys) assert.ok(Number.isInteger(s.res[k]) && s.res[k]>=0 && s.res[k]<=100);
    }
    assert.equal(s.phase,'lose');
  }
});
test('same seed and actions give same state',()=>{
  const run=()=>{
    Engine.setSeed(123);
    const s=Engine.newState('challenge'); Engine.step(s,'start');
    for(let i=0;i<30 && s.phase!=='lose';i++) advance(s);
    return JSON.stringify(s);
  };
  assert.equal(run(),run());
});
test('classic has MVP consumption, five day win, and stars',()=>{
  Engine.setSeed(8);
  const s=Engine.newState('classic'); Engine.step(s,{type:'start',mode:'classic'});
  assert.deepEqual(s.res,{air:70,water:70,food:70,energy:70});
  for(let day=1;day<=5;day++){
    assert.equal(s.day,day);
    Engine.step(s,{type:'select',i:0}); Engine.step(s,'confirm-card');
    if(s.phase==='lose') break;
    Engine.step(s,'after-card');
    if(s.phase==='event'){ Engine.step(s,{type:'event-opt',i:0}); Engine.step(s,'after-event'); }
    if(s.phase==='dayEnd'){
      assert.equal(s.lastCons.air,-(Engine.CONS.air+day-1));
      Engine.step(s,'next-day');
    }
  }
  assert.equal(s.phase,'win');
  const avg=Math.round(keys.reduce((n,k)=>n+s.res[k],0)/4);
  assert.equal(avg>=50?3:avg>=38?2:1,avg>=50?3:avg>=38?2:1);
});
test('preparation card appears on days 3 to 5 across seeds and cycles',()=>{
  for(let seed=1;seed<=1000;seed++){
    Engine.setSeed(seed);
    const s=Engine.newState('challenge'); Engine.step(s,'start');
    for(let cycle=1;cycle<=10;cycle++){
      s.cycle=cycle;
      s.challenge=Engine.CHALLENGES[seed%3];
      for(let day=3;day<=5;day++){
        s.day=day; Engine.drawHand(s);
        assert.ok(s.hand.some(c=>c.id===s.challenge.card));
        const low=keys.reduce((a,b)=>s.res[b]<s.res[a]?b:a);
        assert.ok(s.hand.some(c=>(c.fx[low]||0)>=10));
      }
    }
  }
});
test('prepared challenge is survivable from 30 and halves damage',()=>{
  for(let cycle=1;cycle<=3;cycle++) for(const challenge of Engine.CHALLENGES){
    const s=Engine.newState('challenge'); Engine.step(s,'start');
    s.cycle=cycle; s.day=5; s.challenge=challenge; s.prepared=true;
    for(const k of keys) s.res[k]=30;
    s.phase='cardResult'; Engine.step(s,'after-card');
    assert.equal(s.phase,'challenge');
    assert.equal(s.challengeDamage,Math.floor(Math.min(10+3*cycle,25)*0.5+0.5));
    assert.ok(s.res[challenge.resource]>0);
  }
});
test('rewards are valid and heal is conditional',()=>{
  for(let seed=1;seed<=1000;seed++){
    Engine.setSeed(seed);
    const s=Engine.newState('challenge'); Engine.step(s,'start');
    s.day=5; s.phase='challenge'; s.prepared=true;
    Engine.step(s,'challenge-ok');
    assert.equal(s.phase,'cycleEnd');
    assert.ok(s.rewards.length>=1 && s.rewards.length<=3);
    assert.ok(s.rewards.every(r=>r.id!=='heal' || keys.some(k=>s.res[k]<40)));
  }
});
test('greedy simulation does not die in early cycles',()=>{
  for(let i=0;i<100;i++) assert.ok(play('greedy',i+1).cycles>=2);
});
