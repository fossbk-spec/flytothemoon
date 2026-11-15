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

## Điều chỉnh độ khó sau phản hồi "quá dễ" (15/11/2026)

Cấu hình trước: `startChallenge 80, g 0,14, sysYield [5,9,12]`, thử thách `P = min(10 + 3n, 25)`. Bot tham lam trung vị 6 chu kỳ, bot ngẫu nhiên 4.

Quét tham số (`node tools/tune_sweep.mjs '<json>'`, 500 ván, seed 1):

| Cấu hình | Tham lam (trung vị) | Ngẫu nhiên (trung vị / thua sớm) |
|---|---|---|
| Cũ (80; 0,14; [5,9,12]) | 6 | 4 / 0,8% |
| 70 | 6 | 4 / 2,8% |
| 70; g 0,18 | 5 | 4 / 2,8% |
| **70; g 0,18; [5,8,10] (chọn)** | **4** | **3 / 2,8%** |
| 70; g 0,20; [4,7,9]; pBase 12 | 3 | 3 / 8% |
| 60; g 0,20; [4,7,9]; pBase 12 | 3 | 2 / 18,6% |

Đã chọn dòng in đậm: khởi điểm Thử thách 70, `g = 0,18`, `sysYield = [5, 8, 10]`. Bot tham lam không thua trong 2 chu kỳ đầu; bot ngẫu nhiên thua sớm 2,8%; thanh gây thua nhiều nhất chiếm 41,6% (tham lam) và 51,8% (ngẫu nhiên, hơi vượt mục tiêu 50%). Chế độ Cổ điển không đổi. Mục tiêu trung vị trong brief N1 (6–9 chu kỳ) được hạ xuống 3–5 theo phản hồi; cần pilot để xác nhận.
