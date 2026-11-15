# PRJ-INF-04 — Phương án thực hiện theo lộ trình lai (N1 → N2) và giá trị khởi điểm

| Hạng mục | Nội dung |
|---|---|
| Mã tài liệu | PRJ-INF-04 |
| Phiên bản | v0.1 |
| Ngày | 15/11/2026 |
| Tác giả | Nhóm phát triển Trạm Mặt Trăng Nhí |
| Trạng thái | Draft — chờ PO chốt D-07, D-08 |
| Dựa trên | PRJ-INF-01 v0.5, PRJ-INF-02 v0.4, PRJ-INF-03 v0.2, RV-04 (rà soát vòng 4: PASS WITH FIXES) |
| Phạm vi | Cách thực hiện lộ trình lai: N1 "vá có kiểm soát" trước, N2 "tách engine" sau, nội dung Chương song song; và quyết định giá trị tài nguyên khởi điểm |

## 1. Tóm tắt

- Làm **N1 trước** (≈ 24 ngày công theo task list đã rà soát) trên `index.html` hiện tại để có bản chơi thử sớm; **thiết kế N1 để N2 tái dùng**: gom logic vào một khối "engine" không đụng DOM, đọc cấu hình từ một đối tượng `CONFIG`, RNG có thể gán seed, state có số phiên bản.
- Tài nguyên khởi điểm: **không dùng 100**. Khuyến nghị **Thử thách 80, Khám phá 90, Cổ điển 70** (D-08).
- Dự kiến (ước lượng kỹ thuật, không phải cam kết phát hành): N1 tới cổng pilot trong **~4 tuần (2 người)** hoặc **~7 tuần (1 người)** kể từ 16/11.

## 2. Giá trị tài nguyên khởi điểm: 70 hay 100? (D-08)

### 2.1 Số liệu (mô hình nháp `tools/proto_balance.py`, 900 ván/giá trị, 3 seed; chỉ minh họa, chưa phải engine)

| Khởi điểm | Bot tham lam: trung vị chu kỳ | P10 | Bot ngẫu nhiên: P(sống ≥ 3 chu kỳ) |
|---|---|---|---|
| 60 | 7,6 | 6,2 | 0,33 |
| 70 | 8,0 | 6,8 | 0,67 |
| 80 | 8,2 | 6,8 | 1,00 |
| 100 | 8,2 | 7,8 | 1,00 |

Đọc kết quả: giá trị khởi điểm gần như **không ảnh hưởng độ dài ván** về lâu dài (8,0 → 8,2); nó chỉ quyết định **độ an toàn của chu kỳ 1–2** cho người chơi chưa quen. Từ 80 trở lên người chơi ngẫu nhiên đã sống qua 3 chu kỳ; 100 không thêm lợi ích đo được.

### 2.2 Vì sao không dùng 100

1. **Chặn trần lãng phí.** Thanh giới hạn ở 100. Ở 100, mọi thẻ cộng (+10…+18) ngày 1 bị cắt hết: bản xem trước "Nếu chọn: +16 → 100" làm trẻ thấy thẻ vô nghĩa, trong khi bản xem trước là điểm UX mạnh nhất của mockup.
2. **Mất bài học đệm an toàn.** MVP dạy thói quen "giữ thanh trên 30"; xuất phát đầy thì không có gì để quản lý trong chu kỳ 1 (cũng là lý do Cổ điển giữ 70).
3. **Lệch cân bằng đã có.** Ngưỡng sao (3 sao ≥ 50 trung bình), bảng `CONS`, tay bài đều hiệu chỉnh quanh 70; thay đổi toàn cục kéo theo hiệu chỉnh lại.
4. **Thưởng "hồi sức"** (+20 cho thanh thấp nhất, chỉ khi có thanh < 40) mất ý nghĩa nếu mọi thanh bắt đầu quá cao và hiếm khi tụt dưới 40.

### 2.3 Khuyến nghị

| Chế độ | Giá trị khởi điểm | Lý do |
|---|---|---|
| Cổ điển (MVP) | **70** | Giữ nguyên trải nghiệm đã giao, ngưỡng sao cũ |
| Thử thách (mặc định) | **80** | Chu kỳ 1 là bài tập làm quen: còn 20 điểm trống để thẻ có tác dụng; bot ngẫu nhiên qua 3 chu kỳ ≈ 100% trong nháp |
| Khám phá | **90** | Không thua, ưu tiên cảm giác thành công; vẫn còn 10 điểm trống |

Điều kiện kiểm chứng trước khi chốt (D-08): chạy lại mô phỏng bằng engine thật (N2) hoặc khối engine đã tách của N1 (mục 5); pilot 5 em xem chu kỳ 1 có "quá dễ" không (tiêu chí: không em nào chán trước khi hết chu kỳ 1; ≥ 3/5 em chọn thẻ có cân nhắc, không bấm đại).

Ảnh hưởng tài liệu: ví dụ 5.4 của PRJ-INF-01 (chu kỳ 1 bỏ phí cả 5 ngày) tính ở 70; ở 80 mọi giá trị cộng 10 (chưa chạm trần), kết quả cuối ngày 5: 75/60/65/59.

## 3. Lộ trình lai

```
H0  Chuẩn bị          (16–22/11)  chốt D-07, D-08 + sửa mockup + schema state
H1  N1 xây            (từ 23/11)  chu kỳ, thử thách, thưởng, kỷ lục trên index.html
H2  N1 pilot          (~1 tuần)   5 em + giáo viên, quan sát
H3  N2 tách engine    (sau H2)    chuyển khối engine sang src/, test + sim.mjs, v1.1
H4  Nội dung Chương   (song song) viết thẻ/sự kiện/luật theo workflow PRJ-INF-02 §6
```

### 3.1 H0 — Chuẩn bị (≈ 5 ngày công, tuần 16–22/11)

| ID | Việc | Size | Ngày |
|---|---|---|---|
| H0-1 | PO chốt D-01…D-08 (bảng PRJ-INF-02 §10) | S | 1 |
| H0-2 | Sửa mockup theo V1, V2, V3, V4, V5, V7, V8, V9 (PRJ-INF-03 §3); V6 ưu tiên thấp | M | 2 |
| H0-3 | Quyết định thiết kế V3: thử thách ngày 5 tác động 1 ngày hay kéo sang chu kỳ sau | S | 0,5 |
| H0-4 | Viết schema state `v:2` + `CONFIG` + quy tắc RNG/seed (tài liệu ngắn, 1 trang) | S | 1 |
| H0-5 | Liên hệ giáo viên/học sinh cho pilot, đặt lịch | S | 0,5 |

Cổng G-H0: có D-07, D-08; mockup sửa; schema được duyệt.

### 3.2 H1 — N1: task list (≈ 24 ngày công, rà soát bởi RV-04)

| ID | Việc | Size | Ngày | Phụ thuộc | Tiêu chí chấp nhận |
|---|---|---|---|---|---|
| N1-01 | Rút `CONFIG` ra khỏi mã (CONS, EVENT_CHANCE, LUNAR, cân bằng), bọc `rand()` có seed tùy chọn, thêm `v:2` vào state | S | 1 | H0-4 | Chế độ Cổ điển cho kết quả giống MVP với cùng seed và chuỗi lựa chọn |
| N1-02 | Tách bước cuối ngày thành hàm thuần `stepEndDay(state, config)`; khối engine có đánh dấu `ENGINE:BEGIN/END` để Node nạp được | M | 2 | N1-01 | Hàm không đọc DOM; test Node chạy được trên chính file `index.html` |
| N1-03 | Chu kỳ 5 ngày, chuyển chu kỳ, màn hết chu kỳ, kết thúc ván, chơi lại (kèm cảnh báo mất thưởng) | L | 4 | N1-02 | Chơi 3 chu kỳ liên tục không lỗi; `S` đúng ở ngày 1 mỗi chu kỳ |
| N1-04 | Thử thách ngày 5 (3 loại: bão Mặt Trời, đêm dài, đường ống), báo trước từ ngày 2, cờ `prepared`, 3 thẻ mới | L | 4 | N1-03 | 1000 seed: luôn có đường chuẩn bị khả thi (PRJ-INF-01 5.7) |
| N1-05 | Rút thẻ: bảo đảm thẻ chuẩn bị xuất hiện ngày 3–5, không rút trùng | M | 2 | N1-04 | Test Node 1000 seed |
| N1-06 | Thưởng 1 trong 3 (nâng cấp hệ thống, hồi sức khi có thanh < 40, thẻ hiếm) | M | 2 | N1-03 | Kho thưởng theo bản (PRJ-INF-01 5.8) |
| N1-07 | Chế độ Cổ điển/Thử thách/Khám phá; giá trị khởi điểm theo D-08; luật khẩn cấp Khám phá | M | 2 | N1-03 | Cổ điển trùng MVP; Khám phá tiếp tục sau khẩn cấp |
| N1-08 | Kỷ lục, sao theo mốc chu kỳ, lưu `localStorage` an toàn (try/catch, khóa `tmtn.v2.*`, nút xóa) | M | 2 | N1-03 | Chặn `localStorage` vẫn chơi được; không lưu dữ liệu cá nhân |
| N1-09 | Luật khó #1–#2 + giao diện (S-04 mới, S-10, S-11, S-09), dự báo, giữ khối "Dữ liệu NASA hôm nay" | L | 3 | N1-04, 06 | Đúng mockup đã sửa; chạm ≥ 48 px; không mất bảng NASA |
| N1-10 | Cân bằng bằng script Node trên khối engine (bot ngẫu nhiên/tham lam) + kiểm thử thủ công các đường chơi chính | M | 3 | N1-05…09 | Bot tham lam trung vị 6–9 chu kỳ; chu kỳ 1–2 không thua (bot tham lam) |
| | **Tổng** | | **25** | | (24 theo RV-04 + 1 ngày N1-01) |

Đệm 15% (≈ 4 ngày) cho sửa lỗi và cân bằng nhiều vòng. **Tổng đến cổng pilot ≈ 25 + 4 + 5 (H0) ≈ 34 ngày công.**

Thay đổi so với kế hoạch gốc: N1-01/02 đưa việc "chuẩn bị engine" vào N1 (cộng ≈ 3 ngày công) để giảm chi phí N2; nếu bỏ chúng, N1 rẻ hơn nhưng N2 đắt hơn và N1 không mô phỏng được bằng Node.

### 3.3 H2 — Pilot N1 (≈ 3 ngày công + 1 tuần lịch)

- ≥ 5 học sinh (≥ 2 em 6–8 tuổi, ≥ 2 em 9–11 tuổi), ≥ 1 giáo viên; phiếu quan sát theo PRJ-INF-01 9.3.
- Đo thêm D-08: chu kỳ 1 có quá dễ; thử thách có hiểu; thưởng có chọn có cân nhắc.
- Báo cáo ngắn `docs/du-an/releases/n1/pilot.md`; quyết định điều chỉnh trước H3.

### 3.4 H3 — N2: tách engine (sau pilot)

Ước lượng thô: backlog v1.1 gốc 73 ngày công, trừ phần N1 đã tái dùng (INF-009…016 ≈ 20–25 ngày) → còn **≈ 48–53 ngày công** cho N2. Các bước chính:

1. Chuyển khối `ENGINE` sang `src/engine.js`, giữ nguyên hành vi (test đối chiếu với N1).
2. Tách nội dung sang `src/content/`; `build.mjs` ghép lại thành một `index.html`.
3. Thêm `tools/sim.mjs` trên engine thật (thay `proto_balance.py`), test bất biến, CI.
4. Hoàn thiện luật #3–#4, thử thách 7 loại, Khám phá chi tiết, hiệu chỉnh cân bằng, pilot 10 em.
5. Phát hành v1.1 theo PRJ-INF-01 9.4.

### 3.5 H4 — Nội dung Chương (song song)

Biên tập viên viết thẻ/sự kiện/luật Level 2–3 theo `chien-luoc-gameplay.md`, qua workflow PRJ-INF-02 §6 (draft → science_ok → language_ok → balance_ok → approved). Đưa vào bản sau H3.

## 4. Lịch tham chiếu (ước lượng kỹ thuật, bắt đầu 16/11/2026)

Đường găng của N1 dài ≈ 14 ngày làm việc (N1-01 → 02 → 03 → 04/06 → 09 → 10), nên 2 người không rút ngắn dưới ~3 tuần.

| Mốc | Kịch bản A (C = 10) | Kịch bản B (C = 5) |
|---|---|---|
| H0 xong | 22/11 | 22/11 (cả tuần) |
| N1 xong (≈ 29 ngày công) | ~ 11/12 | ~ 3/1/2027 |
| Pilot N1 | 14–18/12 | 4–8/1/2027 |
| H3 bắt đầu | 21/12 | 11/1/2027 |
| v1.1 (H3 xong, ≈ 50 ngày công) | ~ cuối 1/2027 (đệm Tết 6/2) | ~ cuối 3/2027 |

Quy tắc trượt lịch: giữ nguyên cổng chất lượng; nếu N1 trượt > 30% điểm thì cắt N1-09 phần luật #2 và một loại thử thách, không cắt N1-10.

## 5. Quy tắc kỹ thuật cho N1 (giảm làm lại ở N2)

1. **Khối engine tách bạch:** logic không đụng DOM, nằm trong cặp dấu `/* ENGINE:BEGIN */ … /* ENGINE:END */` để `tools/extract_engine.mjs` nạp vào Node cho test và mô phỏng ngay trong N1.
2. **Một bước cuối ngày duy nhất** `stepEndDay`; không rải `S.res[...] += ...` ngoài hàm `applyDelta` (một `clamp`).
3. **`CONFIG` đối tượng duy nhất**; không hằng số cân bằng nằm trong UI.
4. **RNG qua `rand()`**, mặc định `Math.random`, gán seed khi test; mô phỏng và tái hiện lỗi dựa vào đây.
5. **State có phiên bản** `v:2`; khác phiên bản thì bỏ qua, ván mới.
6. **Adapter UI mỏng:** UI chỉ gọi `engine.step(state, action)` và vẽ lại từ state, như API ở PRJ-INF-01 7.2.
7. **Cờ chế độ trong CONFIG**, không rẽ nhánh `if (classic)` rải rác; Cổ điển = cấu hình tắt chu kỳ/thử thách/thưởng.
8. **Bảng NASA bất khả xâm phạm:** khối "Dữ liệu NASA hôm nay" ở màn Ngày chơi là yêu cầu cố định mọi bản (kiểm trong checklist PR).
9. Không thêm yêu cầu mạng; `localStorage` bọc try/catch.

## 6. Quản lý giai đoạn

| Cổng | Điều kiện đạt |
|---|---|
| G-H0 | D-07, D-08 chốt; mockup sửa V1–V9; schema duyệt |
| G-N1a (giữa H1) | N1-01…05 xong; test Node xanh; Cổ điển trùng MVP |
| G-N1 (cuối H1) | N1-06…10 xong; bot tham lam trung vị 6–9 chu kỳ; checklist riêng tư (PRJ-INF-01 9.5); không mất bảng NASA |
| G-H2 | Pilot ≥ 5 em đạt ngưỡng PRJ-INF-01 9.3; quyết định D-08 cuối |
| G-H3 | PRJ-INF-01 9.4 (v1.1) |

Báo cáo tuần và mẫu theo PRJ-INF-02 §7. PR nhỏ, người rà soát khác tác giả; gắn thẻ Git `v1.0-mvp` trước khi chạm vào `index.html` để quay lui được.

## 7. Rủi ro riêng của lộ trình lai

| ID | Rủi ro | Giảm thiểu |
|---|---|---|
| L1 | N1 tích nợ kỹ thuật vì mã nằm một file 1,4 MB | Quy tắc mục 5; khối engine tách bạch; N2 bắt buộc sau pilot |
| L2 | Trạng thái toàn cục `S` lệch khi chuyển chu kỳ/chơi lại/tải lại | State `v:2`; test Node chuyển chu kỳ; một hàm khởi tạo duy nhất |
| L3 | `endDay()` thành "thùng chứa" luật, sai thứ tự clamp | `stepEndDay` đúng thứ tự PRJ-INF-01 5.2; một `applyDelta` |
| L4 | `drawHand()` không bảo đảm thẻ chuẩn bị | N1-05 và test 1000 seed |
| L5 | Hai chế độ (Cổ điển/Khám phá) rẽ nhánh chồng chéo | Cấu hình, không `if` rải |
| L6 | Pilot khó tuyển trong thời gian ngắn | Đặt lịch ở H0-5; dự phòng giáo viên thử thay |
| L7 | Ước lượng N1 chủ quan | Đệm 15%; ghi vận tốc thực ở G-N1a để cập nhật |
| L8 | Mô hình nháp ≠ khối engine N1 | Dùng khối engine N1 để mô phỏng thật trước G-N1 |

## 8. Việc cần PO chốt

| Mã | Câu hỏi | Khuyến nghị |
|---|---|---|
| D-07 | Năng lực thực tế mỗi tuần (C) | Báo số thật; mặc định B (C = 5) |
| D-08 | Giá trị khởi điểm | Thử thách 80, Khám phá 90, Cổ điển 70 |
| D-09 | Chấp nhận thêm ≈ 3 ngày công cho N1-01/02 (chuẩn bị engine) | Có |
| D-10 | Thử thách ngày 5: tác động 1 ngày hay kéo sang chu kỳ sau | 1 ngày trong N1 (đơn giản, kiểm thử dễ); cân nhắc kéo dài ở N2 |

## 9. Tham chiếu

PRJ-INF-01 v0.5 (5.2, 5.4, 5.7, 5.8, 7.2, 9); PRJ-INF-02 v0.4 (§4–§7, §10); PRJ-INF-03 v0.2; `reviews/RV-04_ra-soat-vong-4_PRJ-INF-03-v0.1_2026-11-15.md`; `tools/proto_balance.py`; `docs/du-an/mockup/` (nguồn mockup).
