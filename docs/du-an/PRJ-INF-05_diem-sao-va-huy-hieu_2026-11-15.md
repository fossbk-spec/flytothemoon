# PRJ-INF-05 — Phương án điểm sao khi vượt thử thách và hệ huy hiệu

| Hạng mục | Nội dung |
|---|---|
| Mã tài liệu | PRJ-INF-05 |
| Phiên bản | v0.1 |
| Ngày | 15/11/2026 |
| Tác giả | Nhóm phát triển Trạm Mặt Trăng Nhí |
| Trạng thái | Đề xuất, chờ PO chọn phương án (D-11…D-14) và rà soát |
| Dựa trên | Bản đang chạy trên `main` (7a0a75b): chế độ Thử thách, 3 thử thách, thưởng 1/3, kỷ lục theo chu kỳ; PRJ-INF-01 v0.5 (5.7, 5.9), PRJ-INF-02 §6, RV-04 |

## 1. Mục tiêu và nguyên tắc

1. Thưởng cho **hành vi học tập đúng**: chuẩn bị trước thử thách, giữ đệm an toàn, đa dạng hóa hệ thống, không chỉ sống lâu.
2. Làm người chơi có **cảm giác tiến bộ** ở mỗi chu kỳ (hiện chỉ có kỷ lục chu kỳ), đặc biệt với trẻ 6–8 tuổi chưa vượt xa.
3. **Không đổi độ khó**: sao và huy hiệu là phần thưởng tinh thần, không cộng tài nguyên, không mở khóa sức mạnh.
4. Giữ nguyên các cam kết: không tài khoản, không mạng, dữ liệu chỉ ở `localStorage`, không thông tin cá nhân; không áp lực thời gian; thua vẫn khích lệ.
5. Mỗi huy hiệu gắn một **điều con học được** có nguồn NASA (qua workflow nội dung PRJ-INF-02 §6).

## 2. Hiện trạng cần xử lý trước

- Sao hiện có ở màn thua: ★ ≥ 3 chu kỳ, ★★ ≥ 6, ★★★ ≥ 10 (xếp theo **số chu kỳ**). Nếu thêm "điểm sao" mà vẫn gọi là "sao" thì dễ nhầm hai loại. Đề xuất đổi tên (D-12):
  - **Sao** (thu thập, cộng dồn): kiếm khi vượt thử thách.
  - **Hạng chỉ huy** (xếp hạng cuối ván theo chu kỳ): Học viên (< 3 chu kỳ), Phi công (3–5), Chỉ huy (6–9), Chỉ huy trưởng (≥ 10); hiển thị bằng tên và biểu tượng, không dùng ba ngôi sao.
- Đã có `S.prepared` (đã chốt thẻ chuẩn bị đúng loại ở ngày 3–5) và `S.challengeDamage`; số sao tính từ đó, không cần cơ chế mới.

## 3. Ba phương án

### A. Tối giản (≈ 3 ngày công)

- 1 sao mỗi thử thách vượt qua (đã qua ngày 5 còn sống).
- 6 huy hiệu theo mốc (chu kỳ 1, 3, 5, 10; chuẩn bị lần đầu; nâng một hệ thống lên cấp 3).
- Ưu: rất ít thay đổi; nhược: không phân biệt chuẩn bị tốt hay không, ít giá trị học tập.

### B. Sao theo mức chuẩn bị + bộ sưu tập huy hiệu (≈ 7–8 ngày công) — **khuyến nghị**

- Sao thử thách theo **3 mức** (mục 4).
- 12 huy hiệu có điều kiện đa dạng (mục 5), mỗi cái kèm "Điều con học được".
- Màn **Bộ sưu tập** xem lại huy hiệu và sao tích lũy.
- Ưu: thưởng đúng điều muốn dạy; nhược: cần viết 12 mục nội dung và thêm màn hình.

### C. Có tiêu sao đổi thưởng (≈ 10+ ngày công) — **không khuyến nghị**

- Dùng sao đổi lấy thẻ/khả năng. Lý do loại: tạo nền kinh tế thứ hai khó cân bằng, dễ tái tạo vấn đề "xu" không giải thích mà RV đã nêu, ảnh hưởng độ khó vừa mới chỉnh, và tăng tải nhận thức cho trẻ 6–8 tuổi.

## 4. Quy tắc sao (phương án B)

Tính cuối ngày 5 khi vượt thử thách (còn sống sau thiệt hại):

| Kết quả | Điều kiện | Sao | Thông điệp cho trẻ |
|---|---|---|---|
| Vượt qua | Còn sống, không chuẩn bị | 1 | "Trạm vượt qua rồi! Lần sau thử chuẩn bị trước nhé." |
| Chuẩn bị tốt | `prepared` = đúng thẻ chuẩn bị ở ngày 3–5 | 2 | "Chuẩn bị đúng, thiệt hại chỉ còn một nửa!" |
| Chuẩn bị xuất sắc | `prepared` và **mọi thanh ≥ 30** sau thiệt hại | 3 | "Chuẩn bị tốt và còn đệm an toàn. Chỉ huy giỏi!" |

Ghi chú thiết kế:

- Mức 3 gắn với bài học "giữ đệm an toàn dưới 30" của MVP; không thưởng thêm cho việc chỉ may mắn.
- Sao **không** phụ thuộc chu kỳ để tránh lạm phát; chu kỳ cao đã khó hơn nên không cần cộng thêm.
- Thang 1–3 làm **tối đa 3 sao/thử thách**, 1 thử thách/chu kỳ → tối đa 3 sao/chu kỳ; ván 10 chu kỳ tối đa 30 sao, dễ đọc.
- Không trừ sao khi thua. Thử thách mà người chơi thua (thanh về 0) cho 0 sao.
- Màn thử thách hiển thị "+N sao" kèm lý do bằng chữ (không chỉ màu/số), và tổng sao của ván ở góc header.

## 5. Hệ huy hiệu (12 huy hiệu, phương án B)

Huy hiệu kiếm một lần, vĩnh viễn (lưu trên máy), nhận ngay khi đạt; không bị mất khi chơi lại. Kiểm tra bằng hàm thuần `Engine.badgesEarned(state, profile)`.

| # | Tên | Điều kiện | Điều con học được (cần nguồn NASA, duyệt theo workflow) |
|---|---|---|---|
| 1 | Chuyến bay đầu tiên | Hoàn thành chu kỳ 1 | Phi hành gia luôn bắt đầu bằng một chuyến bay thử |
| 2 | Người chuẩn bị | Chuẩn bị đúng 1 thử thách (2 sao trở lên) | Kế hoạch trước nhiệm vụ cứu mạng |
| 3 | Chuẩn bị chu đáo | 3 thử thách đạt 3 sao (tổng, nhiều ván) | Đệm an toàn trên trạm vũ trụ |
| 4 | Khiên che bão | Vượt Bão Mặt Trời có chuẩn bị | Bức xạ và nơi trú ẩn (bão Mặt Trời) |
| 5 | Giữ nước | Vượt Hỏng đường ống có chuẩn bị | ISS tái chế phần lớn nước |
| 6 | Kín như bưng | Vượt Mưa thiên thạch có chuẩn bị | Mặt Trăng không có khí quyển che chắn |
| 7 | Đêm dài không sợ | Hoàn thành chu kỳ khi luật Đêm dài đang bật | Một đêm trên Mặt Trăng dài khoảng 14 ngày |
| 8 | Trạm tự túc | Cả 4 hệ thống từ cấp 2 trở lên | Khép kín nước, không khí, thức ăn, điện |
| 9 | Kỹ sư trưởng | Một hệ thống đạt cấp 3 | Kỹ sư nâng cấp thiết bị thường xuyên |
| 10 | Đệm an toàn | Kết thúc 3 chu kỳ liên tiếp mà không có thanh nào dưới 30 lúc hết chu kỳ | Giữ dự trữ để ứng phó bất ngờ |
| 11 | Người sống sót | Hoàn thành 5 chu kỳ trong một ván | Trạm ở dài hạn cần sống ổn định |
| 12 | Nhà khoa học nhí | Gặp đủ 15 "Điều con học được" từ thẻ và sự kiện (tổng nhiều ván) | Mỗi thẻ đều có một dữ kiện NASA |

Ghi chú:

- Mọi điều kiện đều dựa trên dữ liệu đã có trong trạng thái (`prepared`, `challenge.id`, `rules`, `systems`, `res`, `cyclesDone`, `facts`).
- Huy hiệu #10 cần theo dõi giá trị thanh lúc hết chu kỳ (thêm một trường), #12 cần danh sách `id` các dữ kiện đã gặp (≤ 25 chuỗi).
- Huy hiệu #3 và #12 cộng dồn qua nhiều ván nên cần hồ sơ trên máy.

## 6. Dữ liệu và lưu trữ

Khóa `tmtn.v2.profile` (thay `tmtn.v2.best`, đọc thêm khóa cũ để di trú):

```json
{ "v": 1, "starsTotal": 0, "bestCycles": 0, "bestStars": 0,
  "perfectChallenges": 0, "badges": {"first-flight": true}, "facts": ["…"] }
```

- Không lưu tên, thời gian, thiết bị hay định danh; dung lượng < 3 KB.
- Đọc/ghi qua một lớp mỏng, bọc `try/catch`; thiếu `localStorage` thì huy hiệu chỉ có hiệu lực trong phiên (hiển thị thông báo "Chưa lưu được trên máy này").
- Nút "Xóa dữ liệu của tôi" xóa toàn bộ khóa `tmtn.v2.*`.

## 7. Thay đổi giao diện

| Màn | Thay đổi |
|---|---|
| Thử thách (ngày 5) | Thêm khối "Kết quả": 1/2/3 sao, lý do một câu |
| Header | Hiển thị "Sao: N" của ván (nhỏ, không gây rối) |
| Hết chu kỳ | Tóm tắt "Chu kỳ này: +N sao"; huy hiệu mới (nếu có) kèm một câu "Điều con học được" |
| Thua | "Hạng chỉ huy" (thay ba sao hiện tại), tổng sao của ván, huy hiệu mới nhận, kỷ lục |
| Mới: Bộ sưu tập | Lưới 12 huy hiệu: đã có (tên + điều học) và chưa có (dấu "?" + gợi ý cách đạt); tổng sao; nút xóa dữ liệu |
| Mở đầu | Liên kết nhỏ "Bộ sưu tập" |

Yêu cầu tiếp cận: mọi huy hiệu có tên văn bản và `aria-label`; sao hiển thị cả số và hình; không dùng màu làm tín hiệu duy nhất; vùng chạm ≥ 48 px; không âm thanh bắt buộc.

## 8. Ảnh hưởng đến cân bằng và kiểm thử

- Không đổi `CONFIG` cân bằng; chạy lại `node tools/sim_n1.mjs 500 1`: kết quả phải **y hệt** trước khi thêm (kiểm tra hồi quy).
- Mở rộng mô phỏng: phân bố sao/chu kỳ của bot tham lam và ngẫu nhiên để kiểm tra mức 2 và 3 có đạt được nhưng không tầm thường. Mục tiêu khởi điểm: bot tham lam đạt 2–3 sao ở ≥ 40% thử thách; bot ngẫu nhiên đạt 3 sao ≤ 10%.
- Test đơn vị (Node): tính sao theo 3 mức; thua = 0 sao; mỗi điều kiện huy hiệu có kịch bản dựng sẵn; huy hiệu không nhận hai lần; hồ sơ hỏng/đủ phiên bản; `localStorage` bị chặn.
- Khảo sát pilot: học sinh có hiểu vì sao được 1/2/3 sao (câu hỏi miệng), có đọc "Điều con học được" không.

## 9. Kế hoạch thực hiện (phương án B)

| Việc | Size | Ngày công |
|---|---|---|
| Engine: sao, huy hiệu (`badgesEarned`), thêm trường theo dõi, `CONFIG.stars` | M | 2 |
| Hồ sơ `localStorage` + di trú khóa cũ + xóa dữ liệu | S | 1 |
| UI: thử thách, hết chu kỳ, thua, header, Bộ sưu tập | L | 3 |
| Nội dung 12 huy hiệu (tên, mô tả, điều học, nguồn) theo workflow duyệt | M | 1,5 |
| Test, mô phỏng sao, kiểm thử thủ công | M | 1 |
| **Tổng** | | **≈ 8,5** |

Phương án A ≈ 3 ngày công. Làm sau khi pilot xác nhận độ khó (D-08); có thể giao cho bên viết mã theo mẫu brief N1 (`docs/du-an/briefs/`).

## 10. Rủi ro

| ID | Rủi ro | Giảm thiểu |
|---|---|---|
| S1 | Trẻ chỉ "đi săn sao", bỏ qua cân bằng 4 thanh | Mức 3 sao đòi mọi thanh ≥ 30; sao không đổi được sức mạnh |
| S2 | Nhầm "sao" và "hạng" | Đổi tên hạng (D-12) |
| S3 | Huy hiệu quá khó, trẻ nhỏ không có được gì | Huy hiệu #1, #2, #4–#6 đạt được trong 1–2 ván; thêm "gợi ý cách đạt" |
| S4 | Nội dung "Điều con học được" sai khoa học | Workflow `science_ok` trước khi phát hành; ghi nguồn |
| S5 | Hồ sơ trên máy chung (lớp học) bị trộn | Nút xóa dữ liệu; ghi chú cho giáo viên; không tên người chơi |
| S6 | Phình mã giao diện trong một file | Tách UI sao/huy hiệu thành hàm riêng; engine thuần như mục 7 PRJ-INF-04 |

## 11. Quyết định cần chốt

| Mã | Câu hỏi | Khuyến nghị |
|---|---|---|
| D-11 | Chọn phương án A hay B (không chọn C) | B |
| D-12 | Đổi ba sao cuối ván thành "Hạng chỉ huy" | Có |
| D-13 | Sao thử thách tối đa 3 và 0 khi thua | Có |
| D-14 | Hồ sơ huy hiệu cho phép tích lũy qua nhiều ván trên cùng máy | Có (kèm nút xóa dữ liệu) |

## 12. Tham chiếu

PRJ-INF-01 v0.5 (5.7, 5.9, 7.3, 9.5); PRJ-INF-02 v0.4 §6; PRJ-INF-04 v0.1 §5; `docs/du-an/briefs/N1-brief.md`; `tools/sim_n1.mjs`; `src/index.src.html` (ENGINE block).
