1. [HIGH] **Phần 4.1 tính mức tiêu thụ không khớp MVP.** Với `crew=3`, `rank=1`, công thức cho `round(CONS × (3/3)^0.85 × 1)`, tức đúng mức tiêu thụ cơ bản 6/7/8/5. Nhưng 4.1 lại nói tăng khoảng `+0,5/ngày`, trong khi MVP tăng `+1/ngày`; cũng chưa định nghĩa làm tròn cho tăng theo ngày và cách xử lý khi kết quả làm tròn về 0.

2. [HIGH] **Chu kỳ 1 có năng lượng âm ngay cả trước sự kiện.** Bốn module ban đầu tạo `+6` thức ăn, `+6` không khí, `+6` năng lượng và `+6` nước; chi phí module là 1 hành động để đặt, không phải tài nguyên. Trừ tiêu thụ 6/7/8/5 còn `0/-1/-2/+1`; thêm hiệu ứng Mặt Trăng vào năng lượng sau đó có thể cải thiện kết quả, nhưng tài liệu không nêu bảng `LUNAR` để xác nhận chu kỳ 1 có sống nổi qua 5 ngày hay bù được các thanh âm trước khi chạm 0.

3. [HIGH] **Không xác định rõ luồng áp dụng phép tính.** Module có thể cho nhiều loại tài nguyên và có hao phí duy trì; 4.1 dùng tổng `module_yield − cons + lunar_fx + rule_fx`, nhưng không nói rõ hao phí có bị cộng trừ cùng lúc hay phụ thuộc trạng thái module, ngày hoặc thứ tự hiệu ứng. Thanh bị clamp xuống 0 nên không thể dựa vào số âm để trả nợ về sau.

4. [HIGH] **Tăng độ khó vô hạn không khớp với giới hạn crew và lưới.** Crew ghi tối đa 8, lưới tăng đến 5×5 rồi dừng, trong khi mỗi chu kỳ tiếp tục tăng áp lực và công thức tiêu thụ tăng theo rank. Không có cơ chế sản xuất hay nâng cấp tăng vô hạn được mô tả để theo kịp; nguy cơ run kết thúc tất yếu chưa được kiểm chứng.

5. [HIGH] **Luật sau luật #12 có công thức chưa hoàn chỉnh.** Mỗi chu kỳ chỉ tăng hệ số `0,06 → 0,07 → 0,08…`, trần `0,10`, nhưng không nói hệ số tác động lên tài nguyên, chi phí nào, hay khi đạt trần thì game tăng độ khó bằng gì. Đây là lỗ hổng cốt lõi với chế độ vô hạn.

6. [HIGH] **Ngưỡng thua và hồi phục không thống nhất.** Thua khi bất kỳ thanh nào về 0 cuối ngày; chế độ Khám phá lại hồi thanh về 20 khi thua và mất module. Tài liệu chưa nói rõ trong chế độ đó có thể tiếp tục cùng ngày/chạy hay chấm dứt run; cũng chưa rõ một module hỏng bị trừ khỏi lưới và hao phí duy trì ra sao.

7. [MED] **Bảng thử thách có dấu hiệu bất khả thi hoặc nhập nhằng.** `P=10+3n`, nhưng mưa thiên thạch có thể làm hỏng 2 module, bão Mặt Trời làm hỏng 1 module, và sự cố tàu tiếp tế mất toàn bộ tiếp tế chu kỳ; chưa có giới hạn mức ảnh hưởng, cách phục hồi, hay bảo đảm lựa chọn chuẩn bị khả dụng. Một số chuẩn bị nêu thẻ chưa được định nghĩa trong bộ thẻ.

8. [MED] **Ngẫu nhiên có thể tạo thế thua sớm.** Thẻ “ít nhất một thẻ cho thanh thấp nhất” không bảo đảm thanh đó có thể được cứu; thẻ nâng cấp tiêu tốn 6 năng lượng và hành động, có thể không khả dụng khi năng lượng thấp. Thử thách và sự kiện cũng chưa có kiểm tra để tránh tổ hợp không thể sống sót.

9. [MED] **Cân bằng cho tuổi 6–11 có nhiều tải nhận thức đồng thời.** Người chơi phải quản lý 4 thanh, lưới module, cấp nâng cấp, phi hành đoàn, luật tích lũy, sự kiện, thử thách và thưởng. Cam kết “mỗi chu kỳ chỉ học 1 khái niệm mới” khó giữ khi chu kỳ đó còn tăng crew/lưới và giới thiệu nhiều cơ chế; tiêu chí dễ hiểu chỉ được đo chung, thiếu tiêu chí riêng cho nhóm 6–8.

10. [MED] **Khả năng chọn module ban đầu bị bó buộc.** Bốn module sẵn có đã chiếm lưới 3×3 (9 ô), còn module mới tốn hành động. Chưa rõ người chơi có thể đặt module thêm trước khi cần cứu thanh nào, và ra sao nếu ô trống/điều kiện mở khóa khiến không thể xây.

11. [MED] **Điểm, sao và mục tiêu sống sót mâu thuẫn về khuyến khích.** Điểm thưởng theo số chu kỳ và tổng tài nguyên còn lại, nhưng không có chuẩn hóa theo thời gian/run; chế độ vô hạn có thể kéo điểm lên vô hạn. “Hồi 20 cho thanh thấp nhất” là thưởng định lượng nhưng lại tuyên bố không có thưởng tuyệt đối tốt nhất.

12. [HIGH] **Kế hoạch và mốc thời gian không khả thi theo chính tài liệu.** Tài liệu ghi ngày 15/11/2026, trong khi R6 cảnh báo hạn dự thi 14–15/11/2026 đã qua; các giai đoạn vẫn phụ thuộc mô phỏng 500 ván, playtest trẻ em/giáo viên và cập nhật tài liệu chưa có trong phạm vi thời gian. Ước lượng chỉ S/M/L, không có số ngày, người phụ trách hay phụ thuộc.

13. [MED] **Phạm vi phát hành chưa chốt.** Mục 11 để mở các quyết định ảnh hưởng trực tiếp đến bản đầu: v1.1 hay v1.2, Khám phá có đưa vào không, mức L2–L6, và cách giữ đồng bộ hai file HTML. Không thể nghiệm thu một cấu hình phát hành cụ thể khi các quyết định này còn treo.

14. [HIGH] **Tiêu chí nghiệm thu chưa hoàn toàn kiểm thử được.** “Chọn thẻ không cần giúp ≥90%”, “hoàn thành một chu kỳ ≥80%”, “sống đến chu kỳ 6–8 đạt 60–80%” thiếu định nghĩa mẫu, cách đo “không cần giúp”, và mức độ khó/bot dùng để tính. Chỉ 10 học sinh là mẫu nhỏ; các chuẩn về WCAG và thời gian phản hồi cũng chưa ghi cách kiểm tra cụ thể.

15. [MED] **Mô phỏng 500 ván chưa đủ để xác nhận cân bằng vô hạn.** Chỉ nêu bot ngẫu nhiên/tham lam và một số mục tiêu đến chu kỳ 10; chưa mô tả chính sách chọn thưởng, xây/nâng cấp, thử thách, hay seed/bộ cấu hình cố định. Ngưỡng “không chiến lược nào >1,5× bot tham lam” cũng chưa xác định đo tỷ lệ sống hay điểm.

16. [LOW] **Số liệu tài liệu còn thiếu để tái lập kiểm tra mục 4.** Tài liệu chỉ nhắc `LUNAR` gồm 5 bước nhưng không đưa bảng giá trị; bộ `EVENTS`, thẻ MVP và bảng `CONFIG` đầy đủ cũng không có. Vì vậy các kết luận định lượng về sống sót đầu game, hiệu ứng luật và thưởng không thể xác minh chỉ từ hai tài liệu được yêu cầu đọc.

17. [MED] **Lời hứa riêng tư nhất quán ở mức thiết kế nhưng thiếu tiêu chí nghiệm thu.** Tài liệu cam kết không đăng nhập, không thu thập dữ liệu và không gửi mạng; đồng thời lưu kỷ lục trong `localStorage`. Chưa nói rõ phạm vi dữ liệu lưu, hành vi khi chặn/xóa lưu trữ, hay cách xác nhận bản phát hành không có yêu cầu mạng/telemetry; đây là điểm cần nghiệm thu để bảo đảm lời hứa “không dữ liệu”.

VERDICT: FAIL