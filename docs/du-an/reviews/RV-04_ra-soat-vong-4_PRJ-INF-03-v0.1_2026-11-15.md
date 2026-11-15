1. **Đối chiếu PRJ-INF-03 mục 2:** sai là hàng **NASA** — `Day.dc.html` có khối “Dữ liệu NASA hôm nay”, `End.dc.html` có “Nguồn: NASA, Trạm Vũ trụ Quốc tế”. Các hàng **12 xu**, **dự báo Mai/Trưa/Mốt**, **tên thẻ**, **tên thưởng**, **lưới trạm**, **emoji** và **kích thước màn game 1024×768** khớp với nguồn mockup; lưu ý `Main.dc.html` là trang tổng hợp rộng 1280 px, không phải màn game. Hàng ngưỡng sao so với `index.html` không kiểm chứng được từ các nguồn được phép đọc.

2. **Mục 3:** V1–V5, V7–V9 có căn cứ trong mockup hoặc PRJ-INF-01 được phép đọc. **V6 sai:** `Grid.dc.html` đã hiển thị rõ “Kề nhau: Nhà kính + Máy tái chế nước = Thức ăn +1”, trái với nhận xét bonus kề nhau chưa hiện trên lưới. V7 có căn cứ ở mức quy tắc `<40` trong PRJ-INF-01 §5.8, nhưng giá trị Nước 48 không thấy trong `Reward.dc.html`; đó là dữ liệu của màn Ngày chơi nên cần đối chiếu trạng thái trước khi khẳng định lỗi của màn thưởng.

3. **Review md còn nhận định sai ngoài các hàng đã liệt kê:** có. B1 lặp lại khẳng định NASA biến mất; sai theo `Day.dc.html` và `End.dc.html`. Ngoài ra review nói lưới không hiển thị bonus kề nhau, trong khi nguồn có hiển thị; PRJ-INF-03 đã bỏ sót lỗi đó ở mục 2 và kết luận ngược ở mục 3. Những nhận định về repo/GitHub Pages, canvas thực tế và ngưỡng sao không thể xác minh chỉ bằng các tệp được phép.

4. **N1 rồi N2:** hướng đi hợp lý để thử gameplay sớm, nhưng “thêm vào file hiện tại, không refactor lớn” dễ làm N2 tốn kém. Rủi ro cụ thể: thay đổi luồng trạng thái toàn cục `S` có thể làm lệch state giữa ngày, chu kỳ, kết thúc và chơi lại; `endDay()` dễ tích tụ thứ tự xử lý và clamp sai khi thêm tiêu thụ/luật/thử thách; `drawHand()` phải bảo đảm thẻ chuẩn bị xuất hiện đúng ngày và không rút trùng; dữ liệu `CARDS`, `EVENTS`, `LUNAR`, `CONS`, `EVENT_CHANCE` dễ bị trộn với logic và cấu hình cân bằng; lưu `localStorage` cũ có thể thiếu trường hoặc không tương thích; hiệu ứng lặp khi tải lại hoặc chọn lại; chế độ cổ điển và khám phá có nguy cơ rẽ nhánh chồng chéo. Giảm làm lại bằng cách sớm gom luật vào các hàm thuần có đầu vào/đầu ra rõ, tách cấu hình/dữ liệu khỏi xử lý, cho `endDay()` gọi một bước mô phỏng duy nhất, gắn phiên bản cho state lưu và giữ một adapter UI mỏng để gọi engine sau này. Đây là suy luận từ cấu trúc được nêu trong yêu cầu và PRJ-INF-01 §5.2, §5.4, §5.7, §5.8.

5. **Ước lượng N1:** 20–25 ngày công chỉ đáng tin nếu giới hạn chặt vào chu kỳ, thử thách, thưởng, kỷ lục, cân bằng và QA; chưa gồm lưới/module, nội dung mở rộng hay mô phỏng/CI đầy đủ. Ước lượng lý tưởng **24 ngày**:

   1. Chốt luật, schema state và tiêu chí hoàn tất — **S, 1 ngày**
   2. Chu kỳ 5 ngày, chuyển chu kỳ, kết thúc ván — **L, 4 ngày**
   3. Thử thách ngày 5, cờ chuẩn bị và xử lý ngày 3–5 — **L, 4 ngày**
   4. Thưởng 1/3 và nâng cấp/hồi sức — **M, 2 ngày**
   5. Điểm, sao, kỷ lục và lưu local — **M, 2 ngày**
   6. Điều chỉnh rút thẻ để bảo đảm thẻ chuẩn bị — **M, 2 ngày**
   7. Tách bước xử lý cuối ngày thành hàm thuần — **M, 2 ngày**
   8. UI chu kỳ, thử thách, thưởng, kết thúc và chơi lại — **L, 3 ngày**
   9. Tương thích/làm mới state lưu — **S, 1 ngày**
   10. Cân bằng và kiểm thử thủ công các đường chơi chính — **M, 3 ngày**

   Vì vậy **20–25 ngày là khả tín nhưng sát**; dễ vượt nếu phát sinh sửa mockup, cân bằng nhiều vòng hoặc tích hợp pilot. Không nên gọi N1 là “rủi ro lệch thấp” trước khi làm rõ tiêu chí kiểm thử và ranh giới phần chơi thử.

6. **Giá trị khởi đầu:** khuyến nghị mặc định **80**, không phải 100. Mô phỏng cho thấy 70→80 cải thiện sống sót của bot ngẫu nhiên từ 0,67 lên 1,00; 80→100 không tăng kết quả bot đã nêu. Mức 80 còn 20 điểm khoảng trống trước clamp để preview thẻ có tác dụng và giúp trẻ học giữ vùng an toàn trên 30; 100 dễ phí hồi phục/thưởng khi thanh chạm trần. Có thể đặt **Khám phá 90, Thử thách 80, Cổ điển giữ giá trị MVP 70** để bảo toàn cảm giác quen thuộc ở chế độ cổ điển. Chu kỳ 1 vẫn cần tutorial và giải thích luật tiêu thụ; tăng chỉ số không tự sửa trải nghiệm hướng dẫn.

7. **Lỗi khác cần sửa trong PRJ-INF-03:** phần kết luận nói N1 giúp “ra bản chơi thử sớm”, nhưng phần đề xuất lại mô tả phát hành/pilot 5 em mà không tính rõ thời gian chuẩn bị nội dung, thiết bị và vòng phản hồi; cần gọi đúng đây là ước lượng kỹ thuật, không phải lịch phát hành chắc chắn. Ngoài ra mục 3 V3 nói “PRJ-INF-01 5.7 cho Bão bụi tác động 3 ngày”, nhưng §5.7 mô tả thử thách và chuẩn bị; thông tin “3 ngày” nằm ở mockup, còn PRJ-INF-01 không xác nhận toàn bộ hiệu ứng kéo dài như mockup diễn đạt.

**VERDICT: PASS WITH FIXES** — sửa hàng NASA, V6 và các kết luận lặp lại trong review; làm rõ cơ sở estimate N1 và thời lượng thử thách trước khi chốt.