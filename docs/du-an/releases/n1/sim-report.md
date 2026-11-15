# RUN A simulation

Command: `node tools/sim_n1.mjs 500 1`. Each bot played 500 seeded games.

| Measure | Greedy | Random |
|---|---:|---:|
| Median completed cycles | 6 | 4 |
| Loss before two completed cycles | 0% | 0.8% |
| Air losses | 108 | 26 |
| Water losses | 215 | 147 |
| Food losses | 44 | 78 |
| Energy losses | 133 | 249 |
| Largest loss share | 43% | 49.8% |

CONFIG tuning: `g = 0.14`, `sysYield = [5, 9, 12]`. All simulation targets are met for this seed and sample size.
