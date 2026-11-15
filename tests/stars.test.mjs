import test from 'node:test';
import assert from 'node:assert/strict';
import { Engine } from '../tools/engine_loader.mjs';
import { Profile } from '../tools/profile_loader.mjs';

const keys=['air','water','food','energy'];
const fresh=()=>Engine.newState('challenge');
const profile=()=>({v:1,starsTotal:0,bestCycles:0,bestStars:0,perfectChallenges:0,badges:{},seenIds:[]});

test('challenge scores cover all levels and loss',()=>{
  for(const [prepared,level,want,reason] of [[false,40,1,'pass'],[true,49,2,'prepared'],[true,50,3,'safe'],[true,0,0,null]]){
    const s=fresh(); s.prepared=prepared; keys.forEach(k=>s.res[k]=60); s.res.air=level;
    assert.deepEqual(Engine.challengeScore(s),{stars:want,reason});
  }
  const s=fresh(); Engine.step(s,'start'); s.phase='cardResult'; s.day=5; s.prepared=true;
  keys.forEach(k=>s.res[k]=50); Engine.step(s,'after-card');
  assert.equal(s.challengeStars,3); assert.equal(s.stars,3);
  assert.equal(s.starLog.length,1); assert.equal(s.challengeHistory.length,1);
  const lost=fresh(); Engine.step(lost,'start'); lost.phase='cardResult'; lost.day=5;
  keys.forEach(k=>lost.res[k]=50); lost.res[lost.challenge.resource]=1;
  Engine.step(lost,'after-card'); assert.equal(lost.phase,'lose'); assert.equal(lost.challengeStars,0); assert.equal(lost.stars,0);
});

const cases={
  'first-flight':s=>{s.cyclesDone=1;},
  planner:s=>{s.challengeHistory=[{id:'bao',prepared:true,stars:2}];},
  thorough:s=>{s.challengeHistory=Array.from({length:3},()=>({id:'bao',prepared:true,stars:3}));},
  'storm-shield':s=>{s.challengeHistory=[{id:'bao',prepared:true,stars:2}];},
  'keep-water':s=>{s.challengeHistory=[{id:'ong',prepared:true,stars:2}];},
  airtight:s=>{s.challengeHistory=[{id:'thien-thach',prepared:true,stars:2}];},
  'long-night':s=>{s.cyclesDone=2;s.activeRules=['long-night'];},
  'self-sufficient':s=>{keys.forEach(k=>s.systems[k]=2);},
  'chief-engineer':s=>{s.systems.air=3;},
  'safe-buffer':s=>{s.safeCycleStreak=3;},
  survivor:s=>{s.cyclesDone=5;},
  'young-scientist':s=>{s.seenIds=Array.from({length:15},(_,i)=>'id'+i);}
};
test('each badge has a positive and negative direct-state case',()=>{
  assert.equal(Engine.BADGES.length,12);
  for(const b of Engine.BADGES){
    const no=fresh(); assert.ok(!Engine.badgesEarned(no,profile()).includes(b.id),b.id+' negative');
    const yes=fresh(); cases[b.id](yes);
    assert.ok(Engine.badgesEarned(yes,profile()).includes(b.id),b.id+' positive');
    const owned=profile(); owned.badges[b.id]=true;
    assert.ok(!Engine.badgesEarned(yes,owned).includes(b.id),b.id+' already owned');
    assert.equal(b.status,'draft'); assert.ok(b.name && b.how && b.learn);
  }
});
test('thorough counts perfect challenges across profile and run',()=>{
  const s=fresh(), p=profile(); p.perfectChallenges=2;
  assert.ok(!Engine.badgesEarned(s,p).includes('thorough'));
  s.challengeHistory=[{id:'bao',prepared:true,stars:3}];
  assert.ok(Engine.badgesEarned(s,p).includes('thorough'));
});
test('profile ignores unknown or corrupt versions and migrates old best',()=>{
  const values=new Map([['tmtn.v2.best','7'],['tmtn.v2.profile','{bad json']]);
  const storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k),key:i=>[...values.keys()][i],get length(){return values.size;}};
  let p=new Profile(storage); assert.equal(p.data.starsTotal,0); assert.equal(p.data.bestCycles,7); assert.equal(p.available,true);
  values.set('tmtn.v2.profile',JSON.stringify({...profile(),v:99,starsTotal:80}));
  p=new Profile(storage); assert.equal(p.data.starsTotal,0); assert.equal(p.data.bestCycles,7);
  p.data.starsTotal=5; p.save(); assert.equal(JSON.parse(values.get('tmtn.v2.profile')).starsTotal,5);
  values.set('tmtn.v2.extra','x'); values.set('other','keep'); p.clear();
  assert.deepEqual([...values.keys()],['other']);
});
test('profile survives blocked storage and limits seen IDs',()=>{
  const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};
  const p=new Profile(blocked); assert.equal(p.available,false);
  p.data.starsTotal=3; p.save(); assert.equal(p.data.starsTotal,3); assert.equal(p.available,false);
  const long={...profile(),seenIds:Array.from({length:40},(_,i)=>'id'+i)};
  const q=new Profile({getItem:k=>k==='tmtn.v2.profile'?JSON.stringify(long):null});
  assert.equal(q.data.seenIds.length,30);
});
