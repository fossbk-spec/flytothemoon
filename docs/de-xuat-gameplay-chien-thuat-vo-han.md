# Đề xuất gameplay: chiến thuật đơn giản, nâng level vô hạn

- Sản phẩm: Trạm Mặt Trăng Nhí
- Phiên bản tài liệu: 0.1 (đề xuất, chưa chốt)
- Ngày: 15/11/2026
- Tác giả: nhóm phát triển Trạm Mặt Trăng Nhí
- Tài liệu liên quan: `docs/chien-luoc-gameplay.md` (6 level), SDD mục 7–8 (thuật toán, thẻ, sự kiện)

## 1. Hiện trạng (đã đọc)

- Vòng chơi MVP: 4 tài nguyên (0–100) × 1 thẻ trong 3 thẻ/ngày × sự kiện 2 lựa chọn × tiêu thụ cuối ngày (`CONS` = 6/7/8/5, +1 mỗi ngày) × chu kỳ nắng/đêm 5 bước (`LUNAR`). 15 thẻ, 8 sự kiện, 5 ngày.
- Roadmap L1–L6 (5→12 ngày), mỗi level thêm đúng 1 luật. **Hạn chế:** hữu hạn, chơi hết L6 là hết; mỗi level là nội dung viết tay; chưa có "xây dựng dài hạn" nên thẻ chỉ là cộng/trừ tức thời.
- Điểm mạnh cần giữ: không áp lực thời gian, mọi thẻ là đánh đổi, luôn báo trước (dự báo nắng), mỗi level thêm 1 luật.

## 2. Bài học từ game nổi tiếng (chỉ lấy cơ chế, không lấy độ phức tạp)

| Game | Cơ chế đáng học | Áp dụng cho game trẻ 6–11 tuổi |
|---|---|---|
| Slay the Spire | Ascension: 20 bậc khó, mỗi bậc thêm 1 ràng buộc, các bậc **cộng dồn**; sau mỗi trận chọn 1 trong 3 phần thưởng để xây "bộ bài" | Bậc "Cấp bậc sứ mệnh" cộng dồn; cứ vài ngày chọn 1 trong 3 nâng cấp |
| Mini Metro / Mini Motorways | Luật tối giản, độ khó tăng bằng **số lượng** đối tượng chứ không thêm luật; có Endless (không thua, để thư giãn) và Extreme (khó) | Chế độ Vô hạn: khó tăng bằng số người + số module; có "Chế độ yên tâm" cho lớp học |
| Reigns | 1 quyết định/lượt, vài thanh cân bằng, thua là quay lại ngay | Đã có sẵn; giữ nguyên |
| Into the Breach | Báo trước đòn tấn công của địch, người chơi suy nghĩ chứ không đoán mò | Mở rộng "Dữ liệu NASA hôm nay" thành **dự báo 2–3 ngày tới** |
| Plants vs Zombies | Mỗi vài màn mở 1 "cây" mới; đợt tấn công tăng dần; chơi vô tận sau khi thắng | Mở 1 module mới mỗi mốc; đợt "thử thách" mỗi 5 ngày |
| Kingdom Rush | Đặt số ít công trình ở vài vị trí cố định; có nhánh nâng cấp 2 hướng | Lưới trạm nhỏ, mỗi ô 1 module, nâng cấp 2 hướng |
| Frostpunk / RimWorld (bản nhẹ) | Dân số tăng → nhu cầu tăng; sự kiện đẩy người chơi vào lựa chọn khó | Thêm phi hành gia theo mốc; sự kiện đạo đức nhẹ (chia sẻ, giúp nhau) |

Ghi chú nguồn: các tìm kiếm web trả về đủ cho Slay the Spire (Ascension, thích nghi bắt buộc) và Mini Metro/Mini Motorways (Endless, Extreme); phần Reigns, Into the Breach, PvZ, Kingdom Rush, Frostpunk dựa trên kiến thức chung, chưa dẫn nguồn trang web. Cần kiểm chứng trước khi trích dẫn trong thuyết minh.

## 3. Ý tưởng cốt lõi: "Sứ mệnh vô hạn" = 3 trục tăng độ khó độc lập

Giữ vòng chơi L1 (4 thanh + 1 thẻ/ngày). Thay vì viết tay từng level, tách độ khó thành 3 trục mà máy tự cộng dồn:

1. **Quy mô trạm (chiến thuật xây dựng).** Lưới 3×3 ô (mở rộng dần lên 4×4, 5×5). Mỗi ô đặt 1 module: Nhà kính, Máy lọc khí, Tấm pin, Máy sưởi, Kho nước, Khiên chắn, Xưởng ISRU… Module cho **thu nhập mỗi ngày** (đặt 1 lần, có lợi nhiều ngày). Thẻ "hành động" hằng ngày vẫn còn (sửa chữa, khẩn cấp). Đây là thay đổi chiến thuật lớn nhất: từ "chữa cháy mỗi ngày" sang "lập kế hoạch".
2. **Quy mô đội (nhu cầu).** Cứ 5 ngày có thêm 1 phi hành gia: tiêu thụ tăng, nhưng mở thêm ô/ thẻ chuyên môn (kỹ sư, bác sĩ, nhà thực vật).
3. **Áp lực môi trường (Cấp bậc sứ mệnh).** Cứ 5 ngày là 1 "Chu kỳ"; cuối mỗi chu kỳ có 1 **Thử thách** và người chơi nhận 1 **luật khó mới cộng dồn** (kiểu Ascension), ví dụ: đêm dài hơn, bão thường xuyên hơn, bụi bám nhanh hơn, tàu tiếp tế đến thưa dần.

Vòng lặp mỗi Chu kỳ (5 ngày, ~8–10 phút):

```
Ngày 1–4: chọn thẻ + đặt/nâng cấp module, đọc dự báo 3 ngày
Ngày 5  : THỬ THÁCH (bão / đêm dài / thiên thạch…) được báo trước từ ngày 2
Cuối chu kỳ: thắng → chọn 1 trong 3 phần thưởng (module mới / phi hành gia / nâng cấp)
             + nhận 1 luật khó mới (cộng dồn) + tăng "Cấp bậc"
```

Điểm số vô hạn = số Chu kỳ sống sót (không có "màn cuối"); kỷ lục lưu cục bộ (localStorage), không thu thập dữ liệu, đúng cam kết quyền riêng tư của MVP.

## 4. Đường cong độ khó (công thức, để mô phỏng)

Giá trị khởi điểm, cần chỉnh bằng mô phỏng 500 ván và playtest:

- Tiêu thụ mỗi ngày mỗi tài nguyên: `cons = base × (1 + 0,06 × (cấp − 1)) × số_người^0,85`. Hệ số mũ < 1 để tăng đều, không bùng nổ.
- Thu nhập module: giữ cố định theo cấp module (1–3); cấp bậc tăng nhanh hơn thu nhập một chút (≈ +6% nhu cầu so với +5% thu nhập) → độ khó tăng chậm nhưng **chắc chắn**, ai cũng thua ở một chu kỳ nào đó và muốn chơi lại.
- Thử thách chu kỳ `n`: độ mạnh = `10 + 3n`, chọn từ kho 8–10 thử thách; **không lặp lại liên tiếp**.
- Luật khó cộng dồn (mỗi chu kỳ 1 cái, chọn ngẫu nhiên trong kho, tối đa ~12 cái; sau đó chỉ tăng hệ số): xem bảng 5.
- Mục tiêu cân bằng: học sinh khá sống tới chu kỳ 6–8 (30–40 ngày), người giỏi tới 12–15; mỗi ván 10–20 phút. Thua → hiện "Điều con học được" + gợi ý, nút "Chơi lại từ chu kỳ gần nhất" (checkpoint mỗi 5 chu kỳ) để trẻ không bực.

## 5. Kho "luật khó" cộng dồn (gắn dữ liệu NASA thật)

| # | Luật | Gắn với |
|---|---|---|
| 1 | Đêm dài hơn 1 ngày | Ngày Mặt Trăng 29,5 ngày Trái Đất |
| 2 | Bụi bám pin nhanh hơn (mất 1 điện/ngày nếu không lau) | Bụi Mặt Trăng |
| 3 | Bão Mặt Trời xuất hiện thường hơn | Bức xạ, thời tiết không gian |
| 4 | Tàu tiếp tế thưa dần (tự lực nhiều hơn) | Kế hoạch trạm tự túc GĐ3 |
| 5 | Nước cần lọc trước khi dùng (−1 điện) | Tái chế nước ISS |
| 6 | Thiên thạch nhỏ làm hỏng 1 ô mỗi chu kỳ | Mặt Trăng không có khí quyển |
| 7 | Nhiệt độ cực đoan: sưởi tốn nhiều hơn | LRO Diviner +127 / −173°C |
| 8 | Nhà kính cho rau chậm hơn | Rau trồng trong vi trọng lực |
| 9 | Hố tối: có băng nhưng lạnh, tốn pin | Cực Nam, băng nước |
| 10 | Sự kiện kép (2 sự kiện cùng ngày) | L5 hiện có |
| 11 | Bão bụi (chu kỳ Sao Hỏa) | L6 hiện có |
| 12 | Sức khỏe đội: thiếu việc nhẹ thì mệt | Tâm lý/miễn dịch phi hành gia |

Các level L2–L6 đang có **không bỏ**: chúng trở thành "Chương" (Mặt Trăng ngày/đêm → cực Nam → ISRU → tự túc → Sao Hỏa), mỗi chương là một bộ luật khởi điểm và một nền (biome); sau chương 6, game chuyển sang chế độ Vô hạn trên Sao Hỏa với luật cộng dồn. Như vậy tận dụng nội dung đã viết mà không bị hết.

## 6. Chiến thuật "đơn giản mà có chiều sâu"

Chỉ giữ 3 loại quyết định, mỗi loại ≤ 3 lựa chọn:

1. **Xây gì, đặt ở đâu** (kề nhau có thưởng nhỏ: nhà kính cạnh nước +2, pin cạnh máy sưởi +2). Quy tắc kề nhau tối đa 3 loại, hiển thị bằng mũi tên xanh.
2. **Thẻ hôm nay** (sửa chữa/khẩn cấp/khám phá) — vòng chơi cũ.
3. **Phần thưởng cuối chu kỳ** (chọn 1/3: module, người, nâng cấp) — tạo "build" khác nhau mỗi ván (kiểu Slay the Spire): lối "tự túc nước", "năng lượng dồi dào", "đội đông"…

Không có thẻ/module trội tuyệt đối; mỗi module có 1 điểm yếu rõ (nhà kính ăn nước, máy sưởi ăn điện…), đúng nguyên tắc hiện có.

## 7. Giữ dễ chơi cho 6–11 tuổi

- Chế độ **Khám phá** (không thua, kiểu Endless của Mini Metro) cho lớp tiểu học nhỏ; chế độ **Thử thách** (có thua, cấp bậc cộng dồn) cho học sinh lớn/giáo viên chiếu lớp.
- Mỗi lần chỉ giới thiệu **1 khái niệm mới** (ô lưới ở chu kỳ 1, phi hành gia ở chu kỳ 3, luật khó từ chu kỳ 2…), có "Mẹo của chỉ huy" biến mất dần.
- Dự báo luôn hiện: ngày mai nắng bao nhiêu %, thử thách chu kỳ này là gì → chiến thuật dựa vào suy luận, không đoán.
- Văn bản mức đọc lớp 1–2, biểu tượng + màu như hiện nay; không tăng tốc độ bấm.

## 8. Lộ trình triển khai đề xuất (gối lên roadmap hiện có)

| Bản | Nội dung | Độ khó làm |
|---|---|---|
| v1.1 | Chu kỳ 5 ngày + checkpoint + chọn phần thưởng 1/3 (chưa có lưới); luật khó 1–4; điểm = số chu kỳ | Thấp–vừa |
| v1.2 | Lưới 3×3 + 6 module + thu nhập hằng ngày; dự báo 3 ngày | Vừa |
| v1.3 | Phi hành gia/chuyên môn; luật khó 5–8; kề nhau; chế độ Khám phá | Vừa |
| v2.0 | Chương Cực Nam + ISRU (đã trong roadmap) như bộ luật khởi điểm; luật khó 9–12 | Vừa |
| v2.5–3.0 | Tự túc, Sao Hỏa → chế độ Vô hạn cuối cùng; bảng kỷ lục cục bộ | Vừa–cao |

Lưu ý khớp tài liệu: thay đổi này đụng SRS (luật mới), SDD (ALG cân bằng, TBL tham số), UX (màn hình lưới, S-xx mới) — phải sửa tại tài liệu chủ quản theo quy trình ở tài liệu 7 trước khi lập trình.

## 9. Rủi ro và cách kiểm chứng

| Rủi ro | Giảm thiểu |
|---|---|
| Lưới + thẻ + phi hành gia làm game quá phức tạp cho 6–7 tuổi | Phát hành theo bản nhỏ (v1.1 trước), đo tỉ lệ "bắt đầu không cần giúp ≥ 90%"; chế độ Khám phá |
| Độ khó cộng dồn vô hạn thành "tường" | Mô phỏng 500 ván/chu kỳ; đặt trần cho từng luật, sau luật 12 chỉ tăng hệ số 3–5% |
| Một chiến lược trội (chỉ xây nhà kính) | Mỗi module có điểm yếu; thử thách xoay vòng đánh đúng điểm yếu; test bằng bot đơn giản |
| Nội dung khoa học sai khi mở rộng | Mọi luật/thẻ mới phải kèm nguồn NASA (đã có quy ước trong README) |
| Số liệu ở trên chỉ là khởi điểm | Giữ trong 1 đối tượng cấu hình duy nhất như SDD yêu cầu; chốt sau playtest 10 học sinh + 2 giáo viên |

## 10. Việc cần quyết định

1. Có thêm **lưới xây dựng** (v1.2) hay chỉ giữ thẻ + chu kỳ (v1.1) cho đợt dự thi này?
2. L2–L6 chuyển thành "Chương" rồi mới vào Vô hạn, hay chuyển Vô hạn lên sớm (sau L2)?
3. Chế độ Khám phá (không thua) có được đưa vào ngay bản đầu không?
