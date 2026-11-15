import { Engine } from './engine_loader.mjs';
import { simulate } from './sim_n1.mjs';
const base = JSON.parse(JSON.stringify(Engine.CONFIG));
const sets = JSON.parse(process.argv[2]);
for (const o of sets) {
  Object.assign(Engine.CONFIG, JSON.parse(JSON.stringify(base)), o);
  const r = simulate(500, 1);
  console.log(JSON.stringify(o), 'greedy med', r.greedy.median, 'early', r.greedy.early, '| random med', r.random.median, 'early', r.random.early, '| maxLoss', r.greedy.maxLossShare);
}
