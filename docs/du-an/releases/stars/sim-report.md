# STARS simulation report

Seed 1, 500 games per strategy. The game resource rules and `safeLine = 30` were unchanged.

## N1 balance regression

Before STARS:

| Bot | Median cycles | Early loss | Air | Water | Food | Energy | Largest loss share |
|---|---:|---:|---:|---:|---:|---:|---:|
| Greedy | 4 | 0 | 93 | 208 | 51 | 148 | 0.416 |
| Random | 3 | 0.028 | 11 | 146 | 84 | 259 | 0.518 |

After STARS:

| Bot | Median cycles | Early loss | Air | Water | Food | Energy | Largest loss share |
|---|---:|---:|---:|---:|---:|---:|---:|
| Greedy | 4 | 0 | 93 | 208 | 51 | 148 | 0.416 |
| Random | 3 | 0.028 | 11 | 146 | 84 | 259 | 0.518 |

The tables match exactly.

## Stars per challenge attempt

| Bot | Attempts | 0 | 1 | 2 | 3 | At least 2 | 3 stars |
|---|---:|---:|---:|---:|---:|---:|---:|
| Greedy | 2738 | 388 | 308 | 498 | 1544 | 74.58% | 56.39% |
| Random | 1883 | 106 | 547 | 409 | 821 | 65.32% | 43.60% |

Zero includes a loss during the challenge. The greedy target (at least 40% earning 2 or more) passes. The random target (at most 10% earning 3) fails. A simulated threshold of `safeLine = 60` would bring random 3 star attempts to 6.59% while leaving the at least 2 star rule unchanged. This is a proposal for later review; the game still uses 30.

## Badge acquisition rate per game

| Badge | Greedy | Random |
|---|---:|---:|
| first-flight | 100.0% | 100.0% |
| planner | 100.0% | 98.6% |
| thorough | 77.4% | 17.4% |
| storm-shield | 92.4% | 67.0% |
| keep-water | 88.6% | 65.4% |
| airtight | 92.6% | 66.0% |
| long-night | 100.0% | 97.2% |
| self-sufficient | 0.8% | 1.4% |
| chief-engineer | 32.8% | 40.4% |
| safe-buffer | 2.0% | 6.8% |
| survivor | 43.2% | 9.4% |
| young-scientist | 100.0% | 99.4% |

Each game is measured with an initially empty profile, so the rates show achievements earned within one run. `thorough` can also accumulate across runs in the actual profile.

## Quyết định sau rà soát: `safeLine` 30 → 50 (3 sao)

Với `safeLine = 30`, bot ngẫu nhiên đạt 3 sao ở 43,6% thử thách (mục tiêu ≤ 10%) — thang sao quá dễ, trái phản hồi "quá dễ". Quét ngưỡng: 40 → 33%/34% (ngẫu nhiên/tham lam), **50 → 18,6%/16,7%**, 60 → 6,6%/2,5% (tham lam gần như không đạt được). Chọn **50**: khớp ngưỡng 3 sao của MVP (trung bình ≥ 50) và vẫn đạt được. Lưu ý: bot tham lam và ngẫu nhiên gần như tương đương về 3 sao, nghĩa là 3 sao hiện chủ yếu phản ánh *đệm tài nguyên lúc đó* chứ không phân biệt kỹ năng; cần pilot để xác nhận trẻ cảm nhận mức này.

Huy hiệu "Đệm an toàn" dùng ngưỡng riêng `CONFIG.stars.bufferLine = 30` (không đổi); tỉ lệ đạt thấp (tham lam 2%, ngẫu nhiên 6,8%) và "Trạm tự túc" ≈ 1%: hai huy hiệu dài hạn, theo dõi ở pilot, cân nhắc hạ điều kiện nếu không ai đạt.
