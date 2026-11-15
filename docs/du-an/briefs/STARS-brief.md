# Brief STARS — điểm sao thử thách + huy hiệu (phương án B của PRJ-INF-05)

Phiên bản v0.1 · 15/11/2026 · Nguồn: PRJ-INF-05 (D-11 = B, D-12/13/14 = Có). Áp dụng cho chế độ **Thử thách** (Cổ điển không đổi).

## Ràng buộc chung

- Chỉ sửa `src/index.src.html`, `tools/`, `tests/`, `README.md`, `docs/du-an/releases/stars/`. Sinh `index.html` bằng `python tools/build.py`. Không đọc/in `src/assets.json` hay `index.html`. Không chạy trình duyệt, không cài gói, không commit, không nhắc công cụ AI trong file.
- Logic mới nằm trong khối `ENGINE:BEGIN/END` (không DOM, không `localStorage`, ngẫu nhiên chỉ qua `rand()`); UI chỉ gọi và vẽ. Hằng số vào `CONFIG` (`CONFIG.stars = {base:1, prepared:2, safe:3, safeLine:30}`).
- **Không đổi cân bằng**: `node tools/sim_n1.mjs 500 1` phải cho kết quả y hệt trước khi sửa (so sánh trước/sau, ghi vào báo cáo).
- Không thêm yêu cầu mạng; lưu trữ chỉ khóa `tmtn.v2.*`, bọc try/catch.

## Sao thử thách (engine)

Tính trong bước thử thách ngày 5 sau khi áp thiệt hại, nếu còn sống:
- 1 sao: vượt qua, `prepared = false`.
- 2 sao: `prepared = true`.
- 3 sao: `prepared = true` và mọi thanh ≥ `safeLine` (30) sau thiệt hại.
- Thua ở thử thách: 0 sao.
Lưu `S.challengeStars`, `S.challengeStarReason` (id: `pass|prepared|safe`), `S.stars += challengeStars`, `S.starLog.push(...)`.

## Theo dõi thêm trong trạng thái

`S.safeCycleStreak` (số chu kỳ liên tiếp mà lúc hết chu kỳ không thanh nào < 30), `S.seenIds` (id thẻ/sự kiện đã gặp trong ván, duy nhất), `S.activeRules` (mảng id luật khó đang bật), `S.challengeHistory` ({id, prepared, stars}).

## Huy hiệu (engine: `Engine.badgesEarned(S, profile)` → mảng id mới, hàm thuần)

`profile = {v:1, starsTotal, bestCycles, bestStars, perfectChallenges, badges:{id:true}, seenIds:[…]}`. Hàm cũng nhận tài khoản của ván hiện tại để tính điều kiện tức thì.

| id | Tên | Điều kiện |
|---|---|---|
| `first-flight` | Chuyến bay đầu tiên | `cyclesDone ≥ 1` |
| `planner` | Người chuẩn bị | một thử thách đạt ≥ 2 sao |
| `thorough` | Chuẩn bị chu đáo | `profile.perfectChallenges + (3 sao của ván hiện tại) ≥ 3` |
| `storm-shield` | Khiên che bão | vượt `bao` có `prepared` |
| `keep-water` | Giữ nước | vượt `ong` có `prepared` |
| `airtight` | Kín như bưng | vượt `thien-thach` có `prepared` |
| `long-night` | Đêm dài không sợ | hoàn thành chu kỳ khi luật `long-night` đang bật |
| `self-sufficient` | Trạm tự túc | cả 4 hệ thống cấp ≥ 2 |
| `chief-engineer` | Kỹ sư trưởng | một hệ thống cấp 3 |
| `safe-buffer` | Đệm an toàn | `safeCycleStreak ≥ 3` |
| `survivor` | Người sống sót | `cyclesDone ≥ 5` trong một ván |
| `young-scientist` | Nhà khoa học nhí | `|union(profile.seenIds, S.seenIds)| ≥ 15` |

Văn bản (tên, một câu mô tả "Cách đạt", một câu "Điều con học được") đặt trong `BADGES` thuộc khối ENGINE; dùng đúng nội dung sau (đã gần với dữ kiện có sẵn trong game; ghi chú `status:'draft'` để duyệt khoa học trước khi phát hành chính thức):

1. first-flight — "Phi hành gia luôn tập luyện nhiều trước một chuyến bay thật."
2. planner — "Trước mỗi nhiệm vụ, các nhà khoa học lập kế hoạch cho cả những điều có thể xảy ra."
3. thorough — "Trạm vũ trụ luôn giữ thêm dự trữ để ứng phó khi có bất ngờ."
4. storm-shield — "Bão Mặt Trời gửi bức xạ rất mạnh; phi hành gia cần nơi trú ẩn có tường thật dày."
5. keep-water — "Trên Trạm Vũ trụ Quốc tế, hơn 90% lượng nước được lọc và dùng lại nhiều lần."
6. airtight — "Mặt Trăng không có khí quyển che chắn, nên đá và bụi vũ trụ rơi thẳng xuống bề mặt."
7. long-night — "Một đêm trên Mặt Trăng dài bằng khoảng 14 ngày ở Trái Đất."
8. self-sufficient — "Mang nước từ Trái Đất lên rất tốn kém, nên trạm phải tái chế tối đa."
9. chief-engineer — "Phi hành gia thường xuyên bảo dưỡng và nâng cấp thiết bị trên trạm."
10. safe-buffer — "Phi hành gia luôn giữ dự trữ nhiều hơn mức cần dùng."
11. survivor — "Phi hành gia trên Trạm Vũ trụ Quốc tế thường ở lại khoảng 6 tháng mỗi lần."
12. young-scientist — "Mỗi thẻ và sự kiện trong game đều có một dữ kiện về không gian thật."

## Hạng chỉ huy (thay ba ngôi sao cuối ván ở chế độ Thử thách)

Theo `cyclesDone`: Học viên (< 3), Phi công (3–5), Chỉ huy (6–9), Chỉ huy trưởng (≥ 10); hiển thị tên + biểu tượng + dòng tiêu chí ("Học viên: dưới 3 chu kỳ · Phi công: từ 3 · Chỉ huy: từ 6 · Chỉ huy trưởng: từ 10"). Cổ điển giữ ba ngôi sao như MVP.

## Hồ sơ và UI

- Lớp `Profile` ở phần UI (ngoài ENGINE): đọc/ghi khóa `tmtn.v2.profile`; nếu thấy khóa cũ `tmtn.v2.best` thì đọc `bestCycles` từ đó (di trú, không xóa); lỗi hoặc chặn lưu → chạy bằng bộ nhớ tạm và hiện dòng "Chưa lưu được trên máy này". Không lưu tên, thời gian, thiết bị. Nút "Xóa dữ liệu của tôi" xóa mọi khóa `tmtn.v2.*` (có xác nhận 1 bước). `seenIds` lưu tối đa 30 id.
- Màn thử thách: thêm khối "Kết quả: +N sao" với lý do bằng chữ và số sao bằng hình + chữ.
- Header (Thử thách): "Sao: N".
- Hết chu kỳ: dòng "Chu kỳ này: +N sao" và huy hiệu mới (nếu có) kèm "Điều con học được".
- Thua (Thử thách): Hạng chỉ huy, tổng sao ván, huy hiệu mới, kỷ lục (cycle + sao).
- Màn mới **Bộ sưu tập** (nút ở màn mở đầu và màn thua): lưới 12 huy hiệu, đã có = tên + điều học; chưa có = "?" + gợi ý cách đạt; tổng sao tích lũy; nút xóa dữ liệu. Là `<dialog>`/modal giống `guideModal` đang có (đóng bằng Esc, trả focus).
- Tiếp cận: vùng chạm ≥ 48 px; huy hiệu có tên văn bản và `aria-label`; không dùng màu làm tín hiệu duy nhất; không âm thanh bắt buộc.
- README: một đoạn ngắn về sao và huy hiệu.

## Kiểm thử và mô phỏng

1. Test Node: ba mức sao (1/2/3) và 0 khi thua; mỗi huy hiệu có kịch bản dựng sẵn (tạo trạng thái trực tiếp) cho trường hợp đạt và không đạt; huy hiệu đã có không trả lại; `thorough` cộng dồn qua `profile`; hồ sơ phiên bản lạ/hỏng được bỏ qua.
2. Hồi quy: các test cũ vẫn qua; `tools/sim_n1.mjs 500 1` y hệt (ghi hai bảng so sánh).
3. `tools/sim_stars.mjs`: phân bố sao/thử thách và tỉ lệ nhận từng huy hiệu cho bot ngẫu nhiên và tham lam (500 ván). Mục tiêu khởi điểm: bot tham lam đạt ≥ 2 sao ở ≥ 40% thử thách; bot ngẫu nhiên đạt 3 sao ≤ 10%; ghi số thực tế và, nếu lệch, đề xuất chỉnh `safeLine` (không tự đổi cân bằng game).
4. Báo cáo ngắn `docs/du-an/releases/stars/sim-report.md`.
