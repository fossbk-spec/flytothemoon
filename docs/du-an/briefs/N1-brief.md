# Brief N1 — chu kỳ vô hạn tối giản (bản đơn giản, tối ưu nguồn lực)

Phiên bản: v0.1 · 15/11/2026 · Nguồn: PRJ-INF-01 v0.5 (5.2, 5.4, 5.7, 5.8), PRJ-INF-04 (mục 3.2, 5)

## Nguyên tắc

- Làm bản nhỏ nhất vẫn cho chơi vô hạn: **2 chế độ** (Cổ điển, Thử thách), **3 thử thách**, **thưởng 1 trong 3**, **2 luật khó**, **kỷ lục**. Bỏ: Khám phá, lưới/module, đội, thẻ mới, luật #3+.
- Chỉ sửa: `src/index.src.html`, `tools/`, `tests/`. **Không** sửa `index.html` bằng tay: sinh bằng `python tools/build.py`. Không đọc/in `src/assets.json`.
- Không thêm yêu cầu mạng, không thư viện ngoài, không ghi nhận công cụ AI ở bất kỳ file nào.
- Giữ nguyên: khối "DỮ LIỆU NASA" ở màn chọn thẻ và ở cuối ngày; văn bản tiếng Việt mức lớp 1–2; vùng chạm ≥ 48 px.

## Kiến trúc bắt buộc (để sau này tách engine mà không làm lại)

1. Đánh dấu `/* ENGINE:BEGIN */` … `/* ENGINE:END */` bao quanh: dữ liệu (`CARDS`, `EVENTS`, `LUNAR`, `CONS`, `EVENT_CHANCE`, `CONFIG`) và logic. Trong khối **không** dùng `document`, `window`, `localStorage`, `setTimeout`.
2. `CONFIG` là đối tượng duy nhất chứa mọi hằng số cân bằng (mục "Số liệu").
3. `rand()` là hàm duy nhất sinh ngẫu nhiên (`Engine.setSeed(n)` để cố định, mặc định dùng `Math.random`). Mọi `shuffle`, chọn sự kiện, chọn thưởng, chọn thử thách đều qua `rand()`.
4. Engine dạng bộ giảm trạng thái: `Engine.step(S, action)` thay đổi `S` tại chỗ và đặt `S.phase`; `Engine.newState(mode)` tạo trạng thái. UI chỉ: nhận sự kiện bấm → `Engine.step` → `render()`.
5. Một hàm `applyDelta` duy nhất cho mọi thay đổi tài nguyên (làm tròn nửa lên, `clamp` 0–100, số nguyên).
6. `Engine` được xuất ra phạm vi toàn cục của IIFE để UI và Node dùng; Node nạp khối ENGINE bằng `tools/engine_loader.mjs` (đọc `src/index.src.html`, cắt giữa hai dấu, `new Function`).
7. Trạng thái có `v: 2`.

## Hành động (action) và pha (phase)

Actions: `start{mode}`, `select{i}`, `confirm-card`, `after-card`, `event-opt{i}`, `after-event`, `challenge-ok`, `next-day`, `pick-reward{i}`, `next-cycle`, `play-again`.
Phases: `intro, choose, cardResult, event, eventResult, challenge, dayEnd, win` (chỉ Cổ điển), `cycleEnd` (chọn thưởng, rồi `next-cycle`), `lose`.

## Luật chế độ Cổ điển (phải trùng MVP)

Khởi điểm 70; tiêu thụ cuối ngày `CONS[r] + (day − 1)`; ngày 5 xong là `win`; không chu kỳ, thử thách, thưởng, luật khó; sao như cũ (≥50 → 3, ≥38 → 2).

## Luật chế độ Thử thách

- Khởi điểm **80** mỗi thanh (D-08). 4 "Hệ thống" (air, water, food, energy) mỗi cái cấp 1; thu nhập/ngày theo cấp: `sysYield = [5, 8, 10]`.
- Chu kỳ `n = 1, 2, …`, mỗi chu kỳ 5 ngày; ngày sang chu kỳ mới trở về ngày 1, **tài nguyên giữ nguyên**, `usedEvents` đặt lại.
- Cuối ngày, mỗi tài nguyên `r`: `delta_r = round(Y_r − C_r + L_r + U_r)` rồi `applyDelta` **một lần**, trong đó:
  - `Y_r = sysYield[level_r − 1]`;
  - `C_r = CONS[r] × (1 + 0,12 × (n − 1))` (không còn "+1 mỗi ngày");
  - `L_r` = `LUNAR[day − 1].energyFx` chỉ cho `energy` (chu kỳ nào cũng dùng 5 bước đó); luật #1 (từ chu kỳ 2): nếu `energyFx < 0` thì nhân 1,5;
  - `U_r = 0` (để dành).
- Thẻ và sự kiện áp dụng ngay như MVP. Luật #2 "Tiếp tế thưa" (từ chu kỳ 3): `fx` của thẻ `goi-tiep-te` nhân 0,5 (làm tròn nửa lên).
- Sự kiện ngẫu nhiên các ngày 1–4 với `EVENT_CHANCE[day]`; **ngày 5 không có sự kiện ngẫu nhiên** mà có **thử thách**.
- Thua khi bất kỳ thanh ≤ 0 sau bất kỳ lần áp dụng (như MVP).

### Thử thách (ngày 5, báo trước từ ngày 2)

Mỗi chu kỳ chọn 1 trong 3 (khác thử thách chu kỳ trước):

| id | Tên | Thanh chịu | Thẻ chuẩn bị (id có sẵn) |
|---|---|---|---|
| `bao` | Bão Mặt Trời lớn | energy | `dung-khien` |
| `ong` | Hỏng đường ống | water | `bom-nuoc` |
| `thien-thach` | Mưa thiên thạch | air | `sua-ro-ri` |

- `P = min(10 + 3n, 25)`; thiệt hại = `−P`, nếu `prepared` thì `−round(P × 0,5)`.
- `prepared` = người chơi đã **chốt** thẻ chuẩn bị đúng loại ở ngày 3, 4 hoặc 5 của chu kỳ đó.
- `drawHand` ở ngày 3, 4, 5 PHẢI có ít nhất 1 thẻ chuẩn bị (thay một thẻ không phải thẻ "booster" cho thanh thấp nhất); luật MVP (có 1 thẻ ≥ +10 cho thanh thấp nhất) vẫn giữ.
- Từ ngày 2: màn chọn thẻ hiện khung "Thử thách ngày 5: <tên> — chuẩn bị bằng thẻ <tên thẻ>". Ngày 5: pha `challenge` hiện kết quả (có/không chuẩn bị, thiệt hại), nút `challenge-ok` rồi sang cuối ngày.

### Hết chu kỳ và thưởng

Sau cuối ngày 5 (còn sống): `cyclesDone += 1`, lưu kỷ lục, pha `cycleEnd`. Thưởng 1 trong 3 rút ngẫu nhiên từ kho:
`up-air|up-water|up-food|up-energy` (nếu cấp < 3; +1 cấp), `heal` (chỉ khi có thanh < 40; +20 cho thanh thấp nhất), `stash` (luôn có; +8 mọi thanh). Hiện tối đa 3, hiện đủ số hợp lệ nếu ít hơn. `pick-reward` chọn, `next-cycle` sang chu kỳ mới (ngày 1), áp dụng luật khó mới nếu có, chọn thử thách mới. Màn `cycleEnd` ghi rõ "Chu kỳ sau: tiêu thụ tăng 12%".

### Kỷ lục và sao

Kỷ lục = số chu kỳ hoàn thành lớn nhất, lưu `localStorage` khóa `tmtn.v2.best` (bọc try/catch; thiếu lưu trữ thì vẫn chạy). Màn `lose` (Thử thách): "Con giữ trạm qua N chu kỳ và D ngày", kỷ lục cũ/mới, sao theo chu kỳ hoàn thành (★ ≥ 3, ★★ ≥ 6, ★★★ ≥ 10) kèm dòng tiêu chí, một mẹo (`LOSE_TIP`), và nút "Chơi lại" kèm cảnh báo mất thưởng. Không có "xu".

## Số liệu cân bằng (chỉ chỉnh trong CONFIG)

Mục tiêu khi chạy `node tools/sim_n1.mjs 500 1` (mỗi bot 500 ván): bot tham lam trung vị **6–9 chu kỳ**; bot ngẫu nhiên trung vị ≤ 4; bot tham lam chết trong chu kỳ 1–2 < 2%; không thanh nào gây > 50% số ván thua. Được chỉnh `g` trong [0,08; 0,14] và `sysYield`; không chỉnh luật khác.

Bot tham lam: chọn thẻ có `fx` lớn nhất cho thanh thấp nhất; ngày 3–5 nếu có thẻ chuẩn bị và thanh thấp nhất ≥ 30 thì chọn thẻ chuẩn bị; sự kiện chọn lựa chọn có tổng `fx` lớn nhất; thưởng: `heal` nếu có, nếu không thì nâng hệ thống của thanh thấp nhất (nếu cấp < 3), nếu không thì `stash`. Bot ngẫu nhiên: mọi lựa chọn ngẫu nhiên.

## Kiểm thử bắt buộc (`node --test tests/`)

1. Bất biến: mọi thanh là số nguyên 0–100, không NaN, qua 2000 ván bot ngẫu nhiên.
2. Xác định: cùng seed và cùng chuỗi action → cùng kết quả.
3. Cổ điển trùng MVP: với chuỗi lựa chọn cố định, tiêu thụ, kết thúc `win` ở ngày 5 và sao khớp công thức MVP.
4. `drawHand` ngày 3–5 luôn có thẻ chuẩn bị (1000 seed, mọi chu kỳ 1–10).
5. Thử thách: với bot luôn chọn thẻ chuẩn bị, thanh chịu thiệt hại không về 0 chỉ vì thử thách ở chu kỳ 1–3 khi các thanh ≥ 30 lúc bắt đầu ngày 3.
6. Kho thưởng luôn ≥ 1 mục hợp lệ; `heal` chỉ xuất hiện khi có thanh < 40.
7. `localStorage` bị chặn: Engine không dùng; lớp UI bọc try/catch (kiểm thủ công).

## Kết quả cần nộp

Mã trong `src/index.src.html`, `tools/engine_loader.mjs`, `tools/sim_n1.mjs`, `tests/engine.test.mjs`; chạy `python tools/build.py` để sinh `index.html`; báo cáo ngắn `docs/du-an/releases/n1/sim-report.md` (số liệu sim, tham số đã chỉnh). **Không** commit; người rà soát sẽ commit.

## RUN B — giao diện hoàn thiện (sau khi engine đạt test)

Chỉ sửa phần UI/CSS trong `src/index.src.html` (ngoài khối ENGINE, trừ khi cần thêm trường dữ liệu hiển thị) và gọi `python tools/build.py`. Không đổi luật hay `CONFIG`. Làm đủ các mục:

1. **Màn mở đầu:** chọn chế độ rõ ràng (Thử thách mặc định, Cổ điển) kèm 1 câu mô tả mỗi chế độ; giá trị khởi điểm hiển thị đúng (80 / 70), không còn câu "mức 70" cố định cho Thử thách.
2. **Màn chọn thẻ (Thử thách):** header "Chu kỳ n · Ngày d/5"; từ ngày 2 hiện khung "Thử thách ngày 5: <tên> — chuẩn bị bằng thẻ <tên thẻ>" (màu hổ phách, trên các thẻ); thẻ chuẩn bị có nhãn "Chuẩn bị cho <thử thách>"; khối "DỮ LIỆU NASA" giữ nguyên; thêm chú thích "% là độ nắng".
3. **Màn thử thách (ngày 5):** nêu tên, thanh chịu, có chuẩn bị hay không, thiệt hại; ngôn ngữ khích lệ, nút "Tiếp tục".
4. **Màn thưởng (`cycleEnd`):** tiêu đề "Hoàn thành chu kỳ n", 3 thẻ thưởng với **hiệu ứng bằng số** ("Năng lượng mỗi ngày +4"), chọn rồi mới bật nút "Sang chu kỳ n+1"; dòng "Chu kỳ sau: mức dùng tăng <x>%" (x tính từ `CONFIG.g`, làm tròn); khung "Luật khó mới" khi có (tên + một câu lý do NASA/thực tế).
5. **Luật khó đang bật:** khung nhỏ ở màn chọn thẻ liệt kê luật đang bật (không có thì ẩn).
6. **Màn thua (Thử thách):** "Con giữ trạm qua N chu kỳ và D ngày"; kỷ lục cũ/mới; sao theo chu kỳ + dòng tiêu chí ("★ từ 3 chu kỳ, ★★ từ 6, ★★★ từ 10"); mẹo `LOSE_TIP`; nút "Chơi lại (mất phần thưởng đã chọn)" và nút nhỏ "Xóa kỷ lục trên máy này".
7. **Kỷ lục:** `localStorage` khóa `tmtn.v2.best` bọc try/catch; không lỗi khi bị chặn; không lưu gì khác.
8. **Tiếp cận:** nút là `<button>`, vùng chạm ≥ 48 px, `aria-pressed` cho thẻ đang chọn, tương phản chữ đạt 4,5:1, không chỉ dựa vào màu, nhãn đọc màn hình cho thanh và sao.
9. **Cổ điển:** màn thắng/thua giữ nguyên như MVP (kể cả sao, tin 5 ngày).
10. Cập nhật `README.md` mục "Cách chơi" (một đoạn ngắn về chu kỳ, thử thách, thưởng, kỷ lục) và đoạn hướng dẫn trong `guideModal` nếu nhắc "5 ngày".

Kết quả: chạy `python tools/build.py`, `node --test tests/`; không chạy trình duyệt; tóm tắt ngắn danh sách thay đổi.
