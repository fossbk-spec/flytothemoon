import { play } from './sim_n1.mjs';
import { Engine } from './engine_loader.mjs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export function simulateStars(count=500,seed=1){
  const out={count,seed};
  for(const strategy of ['greedy','random']){
    const distribution={0:0,1:0,2:0,3:0};
    const safeCandidates=Object.fromEntries([30,40,50,60,70].map(n=>[n,0]));
    const badges=Object.fromEntries(Engine.BADGES.map(b=>[b.id,0]));
    for(let i=0;i<count;i++){
      const s=play(strategy,seed+i*7919+(strategy==='random'?1000003:0),true).state;
      for(const x of s.starLog) distribution[x.stars]++;
      for(const x of s.starLog) if(x.stars>0 && x.prepared){
        for(const n of [30,40,50,60,70]) if(x.minAfter>=n) safeCandidates[n]++;
      }
      if(s.loseWhere==='thử thách') distribution[0]++;
      const earned=Engine.badgesEarned(s,{perfectChallenges:0,badges:{},seenIds:[]});
      for(const id of earned) badges[id]++;
    }
    const attempts=Object.values(distribution).reduce((a,b)=>a+b,0);
    out[strategy]={attempts,distribution,atLeast2:(distribution[2]+distribution[3])/attempts,
      three:distribution[3]/attempts,safeLineThreeRates:Object.fromEntries(Object.entries(safeCandidates).map(([n,v])=>[n,v/attempts])),
      badgeRates:Object.fromEntries(Object.entries(badges).map(([id,n])=>[id,n/count]))};
  }
  return out;
}
if(process.argv[1] && resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url))){
  const count=Number(process.argv[2]||500), seed=Number(process.argv[3]||1);
  console.log(JSON.stringify(simulateStars(count,seed),null,2));
}
