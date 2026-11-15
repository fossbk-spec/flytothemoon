# Review mockup “Sứ mệnh vô hạn” — phiên bản mới của Trạm Mặt Trăng Nhí

- **Ngày review:** 15/11/2026 (buổi tối)
- **Đối tượng:** Claude artifact https://claude.ai/artifact/RbvZj3h8oMQiSEpdTZyvoJ — canvas “Sứ mệnh vô hạn — Mockup review”, 1 trang, 6 artboard, chỉ đọc. Link hash `#artboard-15dd8cd198dd` mở ra Artboard 1 (tài liệu tổng hợp, không phải màn hình game).
- **Cách xem:** mở bằng trình duyệt, không cần đăng nhập (có qua một lần kiểm tra Cloudflare “Verify you are human”, tự hết sau ~30 giây). Export bị tắt nên không tải được file gốc.
- **Đối chiếu:** game đã giao (MVP 5 ngày, 4 tài nguyên, 15 thẻ, 8 sự kiện, bảng dữ liệu NASA, ngưỡng sao mới sửa tối 15/11: 3 sao trung bình ≥40 và không thanh nào dưới 20, 2 sao ≥33) và tài liệu “vô hạn” trong repo (`docs/du-an/PRJ-INF-01/02`, `docs/de-xuat-gameplay-chien-thuat-vo-han.md`, `tools/proto_balance.py`).

## 1. Kết luận (verdict)

**Hướng đi đúng, mockup tốt để bàn tiếp — nhưng chưa phải bản thiết kế để chốt xây.** Ý tưởng cốt lõi (biến ván 5 ngày thành chu kỳ lặp vô hạn, thêm thử thách báo trước + thưởng chọn 1 trong 3 + luật khó cộng dồn) là bước tiếp nối hợp lý của MVP và khớp với tài liệu PRJ-INF. Màn “Ngày chơi” tương tác được và có một cải tiến UX thật sự tốt so với bản đã giao: xem trước hiệu ứng (“Nếu chọn: −3 → 59”) ngay trên thanh tài nguyên.

Nhưng có 3 điểm phải sửa trước khi chốt thiết kế:

1. **Bảng dữ liệu NASA biến mất khỏi cả 5 màn hình game.** Đây chính là điểm đã vá cho tiêu chí yếu nhất (Relevance 5/10) và là điều kiện Global Nominee (“dùng ≥1 nguồn dữ liệu NASA”). Mockup chỉ nhắc NASA trong tài liệu tổng hợp (L1–L6 thành “Chương” sau v2.0, đề xuất “Thẻ khoa học NASA”) chứ không vẽ nó vào game. Nếu xây theo mockup này, game sẽ mất đúng điểm mạnh vừa mới sửa tối nay.
2. **Màn thưởng (S-10) không có nút tiếp tục** — chọn xong không có đường đi tiếp, là ngõ cụt.
3. **Màn lưới trạm (S-13) tự mâu thuẫn** — tiêu đề ghi “4 phòng” nhưng vẽ 5 phòng, hàng 3 thiếu ô, không hề hiện “phòng kề nhau giúp nhau” dù tiêu đề hứa vậy.

Ngoài ra bản thân tài liệu tổng hợp cũng thẳng thắn ghi: 3 vòng review độc lập đều FAIL, số cân bằng “≈ 8,7 chu kỳ” chỉ là mô hình nháp (“chưa là bằng chứng”), “còn chờ engine thật”. Và quy mô không nhỏ: ≈ 73 ngày công cho v1.1 (2 người toàn thời gian → ~10/1/2027; 1 người → ~1/3/2027, chưa tính nghỉ Tết).

## 2. Từng màn hình

### Artboard 1 — “Tổng hợp & phương án xây game” (tài liệu, không phải màn game)

Nền xanh nhạt, hero xanh navy đậm. Eyebrow: “TRẠM MẶT TRĂNG NHÍ · DỰ ÁN SỨ MỆNH VÔ HẠN”. Tiêu đề: “Tổng hợp tài liệu và phương án xây game”. Mở đầu: “Từ game 5 ngày thành chuỗi chu kỳ vô hạn: giữ vòng chơi 4 tài nguyên + 1 thẻ/ngày, thêm thử thách báo trước, phần thưởng 1 trong 3 và luật khó cộng dồn. Bản review ngày 15/11/2026 (PRJ-INF-01 v0.4, PRJ-INF-02 v0.3).”

Bốn thẻ số liệu: “5 → ∞ — ngày chơi → chu kỳ 5 ngày, không có chu kỳ cuối”; “≈ 73 — ngày công cho v1.1 (29 việc: 8 S, 16 M, 5 L); bản rút gọn ≈ 51”; “≈ 8,7 — chu kỳ trung vị của bot tham lam (mô hình nháp, chưa là bằng chứng)”; “3 vòng — review độc lập đều FAIL; lỗi tài liệu đã sửa, còn chờ engine thật”.

- §1 “Vòng chơi đề xuất”: Ngày 1–4 → Dự báo 3 ngày → Chọn 1 thẻ / 3 → Sự kiện (xác suất) → Tiêu thụ cuối ngày; Ngày 5 → Thử thách (báo trước từ ngày 2) → Hết chu kỳ → Thưởng 1 trong 3 → Luật khó mới cộng dồn → Chu kỳ n+1. Ghi chú: “độ khó tăng 12%/chu kỳ rồi chậm dần đến trần; người chơi chủ động sống lâu hơn nhưng không bất tử. Kỷ lục là số chu kỳ. Chế độ Khám phá không thua; chế độ Cổ điển giữ nguyên MVP.”
- §2 “Bộ tài liệu đã có”: 7 file .docx (SRS, SAD, SDD, UX-04, test/deployment/fix guides) — “cần CR-01…03 để thêm yêu cầu vô hạn”; chiến lược 6 level L1–L6 — “chuyển thành ‘Chương’ sau v2.0”; PRJ-INF-01 v0.4 — “Draft, chờ 7 quyết định”; PRJ-INF-02 v0.3 — “Draft”; RV-01/02/03 — “FAIL × 3; đã xử lý, còn chứng minh cân bằng”; tools/proto_balance.py — “Thay bằng sim.mjs ở Sprint 1”.
- §3 “Ba phương án xây”: A. “Nâng cấp tại chỗ” (được khuyên) — giữ một file index.html, tách code thành src/ (engine thuần, nội dung, UI), script build nhỏ, node --test; “Giữ lời hứa: một file, offline, không tài khoản”; “Kích thước tăng ít, dễ giữ ≤ +150 KB”; “Công: ≈ 73 ngày công (v1.1) · Rủi ro: thấp”. B. “Vite + TypeScript” — “≈ 80–85 ngày công · Rủi ro: trung bình”, “Không khuyến nghị”. C. “Engine game (Phaser/canvas)” — “≈ 100+ ngày công · Rủi ro: cao”. Bảng so sánh: một file/offline (NFR-INF-03) A Đạt / B “Đạt (cần plugin)” / C “Đạt, nặng”; kích thước ≤ +150 KB A Đạt / B Đạt / C “Không đạt”; tiếp cận A/B “DOM, dễ đạt”, C “Khó”; kiểm thử engine không DOM A “Có (Node)”, B “Có, tốt hơn”, C “Khó tách”. “Đề xuất: chọn A ngay; nếu nhóm lớn hơn hoặc engine vượt ~3.000 dòng thì chuyển sang B ở v2.0…”
- §4 “Lộ trình (kịch bản 2 người toàn thời gian)”: v1.1 “Chu kỳ vô hạn, thử thách, thưởng, luật #1–#4, Khám phá, Cổ điển, kỷ lục, mô phỏng, CI” ~10/1/2027; v1.2 “Lưới 3×3 + module, dự báo 3 ngày, bảng luật #5–#8, pilot 10 em” ~7/2/2027; v1.3 “Đội + chuyên gia, kề nhau, luật #9–#12, lưới 4×4” ~21/3/2027; v2.0+ “Chương Cực Nam/ISRU, checkpoint, Sao Hỏa, chế độ Chuyên gia” — “Lên kế hoạch sau v1.3”. “Một người toàn thời gian: v1.1 lùi tới ~1/3/2027 (chưa tính nghỉ Tết); nên làm bản rút gọn.”
- §5 “Quyết định cần chốt”: D-01 “Phạm vi bản đầu” — “Chỉ v1.1 (chưa lưới)”; D-02 “L2–L6 thành ‘Chương’ rồi vào vô hạn” — Có; D-03 “Chế độ Khám phá (không thua) ngay bản đầu” — Có; D-04 “Một nguồn HTML, xóa bản trùng” — “Giữ index.html”; D-05 “Kỷ lục chỉ lưu trên máy (localStorage)” — Có; D-06 “Nhúng font để chạy hoàn toàn offline” — “Có, nếu kích thước cho phép”; D-07 “Năng lực (ngày công/tuần): kịch bản A, B hay C” — “Mặc định B + bản rút gọn”.
- §6 “Cách review mockup” đặt 5 câu hỏi (trả lời ở §4 dưới đây).
- Lệch nhỏ: canvas ghi màn hình 1280×720, §6 ghi “5 màn hình tablet 1024×768”.

### Artboard 2 — “S-04 Ngày chơi (tương tác)” — màn duy nhất bấm được, và bấm được thật

Nền navy rất đậm (#0b1226), thẻ trắng, thanh tài nguyên xanh lá, nút chính vàng/cam, icon emoji (💨💧🍎⚡🌙) thay vì hình vẽ riêng, chữ tiếng Việt lớn, bo tròn.

- Header: “🌙 Trạm Mặt Trăng Nhí”, pill “Chu kỳ 1”, “🏆 Kỷ lục: 0 chu kỳ”.
- “Ngày 2 của 5” (lớn) + “Chu kỳ 1 · Thứ 2”, bên phải “🪙 12 xu”.
- 4 thanh tài nguyên (nhãn, số, thanh xanh, chi phí đỏ): “💨 Không khí 62” “−3 mỗi ngày”; “💧 Nước 48” “−4 mỗi ngày”; “🍎 Thức ăn 70” “−5 mỗi ngày”; “⚡ Năng lượng 55” “−2 mỗi ngày”.
- “🔮 Dự báo 3 ngày tới” — 3 ô: “Mai 100% Trưa 96% Mốt 88%” (chỉ chữ, không có icon thời tiết; nhãn Mai/Trưa/Mốt trộn lẫn ngày và buổi trong ngày).
- Banner cam: “⚠ Thử thách sắp tới — Ngày 5 sẽ có thử thách lớn. Chuẩn bị trước nhé!”
- “Hôm nay bạn sẽ làm gì? Chọn 1 trong 3 thẻ:” — Thẻ 1 (vàng, đã chọn khi thử): “☀️ Lau sạch tấm pin — Ra ngoài lau lớp bụi mịn khỏi các tấm pin Mặt Trời để điện mạnh trở lại. ⚡ Năng lượng +10 · 💨 Không khí −3”. Thẻ 2: “🌱 Trồng rau trong nhà kính — Gieo hạt rau mới trong nhà kính ấm áp. 🍎 Thức ăn +12 · 💧 Nước −4”. Thẻ 3: “🔧 Sửa máy lọc nước — Thay bộ lọc cũ để nước sạch hơn. 💧 Nước +15 · ⚡ Năng lượng −5”.
- Thanh dưới: “Đã chọn 1 / 3 thẻ” + nút vàng “Chọn thẻ này”.
- Đã kiểm chứng tương tác: bấm thẻ 1 → viền vàng, nút “Chọn thẻ này” bật lên, thanh tài nguyên hiện xem trước trực tiếp (“Nếu chọn: −3 → 59” ở Không khí, “+10 → 65” ở Năng lượng); bấm “Chọn thẻ này” → áp dụng thật (Không khí 62→59, Năng lượng 55→65), nút đổi thành “Đã chọn — bấm để chọn lại”, trạng thái giữ nguyên khi quay lại canvas.
- Footer nhỏ giữa dưới: “🌙 Trạm Mặt Trăng Nhí · Chu kỳ 1 · Ngày 2/5”.

### Artboard 3 — “S-11 Báo thử thách (ngày 4)”

Nền tối, đầu trang cảnh báo màu hổ phách. “🌙 Trạm Mặt Trăng Nhí”, “Chu kỳ 1 · Ngày 4 / 5” + pill “Ngày mai sẽ có thử thách”. Tiêu đề: “⚠ Báo động! Thử thách đang đến” / “Ngày mai, một cơn bão bụi lớn sẽ ập tới trạm của bạn.” Chip ngày: “Ngày 1 ✓ Đã qua · Ngày 2 ✓ Đã qua · Ngày 3 ✓ Đã qua · Ngày 4 Bạn đang ở đây · Ngày 5 ⚠ Thử thách”.

Hai panel: trái (hổ phách) “🌪 Bão bụi lớn — Trong 3 ngày, mỗi ngày sẽ tốn thêm 7 Nước để rửa sạch bụi trên các tấm pin.” Phải: “🛡 Cách chuẩn bị — ✅ Tích trữ Nước trên 30 · ✅ Chọn thẻ tiết kiệm Nước · ✅ Dùng Thẻ Khiên nếu có”. Ba thẻ mẹo: “💧 Tiết kiệm Nước — Hôm nay, hãy chọn thẻ nào tốn ít Nước nhất.” / “🔋 Sạc đầy Năng lượng — Năng lượng cao giúp máy lọc hoạt động tốt hơn.” / “🛡 Dùng Thẻ Khiên — Thẻ Khiên sẽ chặn một nửa thiệt hại của bão bụi.” Thanh dưới: “Chỉ giảm một nửa: khoảng 4 mỗi ngày” + nút xanh “Tôi đã hiểu, quay lại chơi”.

Mâu thuẫn: “Trong 3 ngày” trong khi thử thách chỉ là ngày 5 (1 ngày); một nửa của 7 là 3,5, làm tròn thành “khoảng 4” là cẩu thả với game trẻ em (nên viết 3–4 hoặc đổi số gốc thành 8/4); màn hình không nói gì về “sau thử thách còn 1 ngày trong chu kỳ” — thực ra thử thách là ngày 5, ngày cuối, nên sau đó không còn ngày nào.

### Artboard 4 — “S-10 Chọn phần thưởng”

Header “🌙 Trạm Mặt Trăng Nhí”, pill “🎉 Hết chu kỳ 1!”, “Thưởng: 1 thẻ”. Tiêu đề: “🎁 Chọn 1 phần thưởng” / “Bạn đã hoàn thành chu kỳ 1. Hãy chọn 1 thẻ để mang sang chu kỳ sau!” Ba thẻ thưởng: “🧊 Tủ lạnh mini — Giữ thức ăn tươi lâu hơn. 🍎 Thức ăn −2 mỗi ngày thay vì −5” (mờ đi, “Đã có”); “💧 Bình nước lớn — Chứa thêm nước dự trữ. 💧 Nước +25”; “🛡 Thẻ Khiên — Chặn một nửa thiệt hại của bão bụi. 🛡 Dùng 1 lần mỗi chu kỳ” (viền vàng, đang chọn, nút “Đang chọn”). Hai thẻ còn lại ghi “Chọn”. Thanh quy tắc dưới: “📏 Quy tắc thưởng: · Mỗi chu kỳ chỉ được 1 thẻ · Thẻ đã có sẽ bị mờ đi · Tiếp tế thưa:thẻ hiếm chỉ xuất hiện 1 lần” — lỗi chính tả thiếu dấu cách sau dấu hai chấm (“thưa:thẻ”).

Vấn đề: **không có nút xác nhận/tiếp tục nào trên màn hình** — chọn xong không có đường đi tiếp. Ngoài ra “Nước lên một nấc” (mơ hồ) trộn với “+25 Nước” (số cụ thể); màn hình không hề nói độ khó chu kỳ sau tăng bao nhiêu.

### Artboard 5 — “S-09 Kết thúc ván”

Nền tối, căn giữa. “🌙 Trạm Mặt Trăng Nhí”, pill “Chu kỳ 5, ngày 3 · Nước về 0”. “💧 Hết nước rồi!” / “Trạm của bạn đã hết nước. Đừng buồn — bạn đã làm rất tốt!” Hai sao tô, một sao rỗng: “★★☆” — **không có chú thích sao đo cái gì** (trong khi bản đã giao vừa sửa ngưỡng sao thành trung bình ≥40 kèm sàn từng thanh ≥20 — mockup không nhắc tới tiêu chí nào). “📊 Kết quả của bạn”: “⏳ Đã chơi: 4 chu kỳ và 2 ngày” (khớp với thua ở ngày 3 chu kỳ 5); “💧 Nước cuối: 0”; “🏆 Kỷ lục trước: 3 chu kỳ”; “🎖 Kỷ lục mới: 4 chu kỳ!”. Thanh tài nguyên cuối: “💨 Không khí 42 · 💧 Nước 0 · 🍎 Thức ăn 35 · ⚡ Năng lượng 20”. Hai nút: vàng “🔄 Chơi lại từ chu kỳ 1” và xanh “📈 Xem kỷ lục của bạn”. Câu khích lệ: “💡 Mẹo nhỏ: Lần sau, hãy tích trữ nhiều Nước hơn trước ngày 5 nhé!”

Lưu ý: chơi lại từ chu kỳ 1 sẽ mất hết phần thưởng đã chọn, nhưng màn hình không cảnh báo; kỷ lục chỉ lưu trên máy (theo D-05).

### Artboard 6 — “S-13 Lưới trạm (v1.2)”

Header “🌙 Trạm Mặt Trăng Nhí”, pill “Chu kỳ 2, ngày 1 · Trạm có 4 phòng · 2 ô trống”, nút “Lưới trạm (v1.2)”. Tiêu đề: “🏠 Lưới trạm của bạn” / “Xếp các phòng vào lưới 3×3. Phòng kề nhau sẽ giúp nhau mạnh hơn!” Lưới 3×3: “🌱 Nhà kính · Cấp 2 · 🍎 +6 mỗi ngày” (xanh), “☀️ Trạm năng lượng · Cấp 1 · ⚡ +4 mỗi ngày” (vàng), “⬜ Ô trống · Bấm để xây phòng mới”; “🛏 Phòng ngủ · Cấp 1 · 💨 +3 mỗi ngày”, “💧 Kho nước · Cấp 2 · 💧 +5 mỗi ngày”, “⬜ Ô trống · Bấm để xây phòng mới”; “🎮 Khu vui chơi · Cấp 1 · 😊 Vui vẻ +2 mỗi ngày” — hàng 3 chỉ hiện một ô, các ô còn lại trống/không hiện trong bản render. Thanh dưới: “🪙 12 xu · 🔓 Mở khóa ở chu kỳ 2 · 👆 Bấm vào một phòng để xem chi tiết” + nút xanh “Xong, quay lại chơi”.

Mâu thuẫn: tiêu đề ghi “4 phòng” nhưng vẽ 5 phòng (Nhà kính, Trạm năng lượng, Phòng ngủ, Kho nước, Khu vui chơi); lưới ghi v1.2 nhưng lại nói “Mở khóa ở chu kỳ 2” trong khi §6 hỏi về việc xem trước ở chu kỳ 1; **không ô nào hiện bonus kề nhau**, dù tiêu đề hứa “phòng kề nhau sẽ giúp nhau mạnh hơn”.

## 3. Có gì mới so với bản đã giao

- Ván 5 ngày không còn là điểm kết — nó thành một “chu kỳ” 5 ngày lặp lại vô hạn (5 → ∞), độ khó +12%/chu kỳ rồi chậm dần đến trần, có kỷ lục (“Kỷ lục: N chu kỳ”), thêm 2 chế độ: “Khám phá” (không thua) và “Cổ điển” (giữ nguyên MVP).
- Hệ thống mới: dải dự báo 3 ngày trên màn ngày chơi; thử thách báo trước từ ngày 2, báo lại ngày 4, đánh vào ngày 5 (ví dụ bão bụi tốn thêm 7 Nước/ngày); thưởng chọn 1 trong 3 cuối mỗi chu kỳ (tủ lạnh mini, bình nước lớn, Thẻ Khiên); luật khó cộng dồn (#1–#4 ở v1.1, #5–#8 ở v1.2, #9–#12 ở v1.3); lưới trạm 3×3 (v1.2) với phòng, cấp độ, bonus kề nhau; xu (“12 xu”) xuất hiện ở màn ngày chơi và màn lưới nhưng không giải thích; sao ở màn kết thúc.
- **Bảng dữ liệu NASA của bản đã giao KHÔNG xuất hiện ở bất kỳ màn game nào** — NASA chỉ còn trong tài liệu tổng hợp: level L1–L6 thành “Chương” sau v2.0, đề xuất “Thẻ khoa học NASA” (hiện panel “Dữ liệu thật từ NASA” khi chọn thẻ), v2.0+ liệt kê “Chương Cực Nam/ISRU, checkpoint, Sao Hỏa”.
- Giữ nguyên so với bản đã giao: 4 tài nguyên (Không khí/Nước/Thức ăn/Năng lượng), 3 thẻ/ngày chọn 1, tiêu thụ cuối ngày, chữ tiếng Việt cho tuổi 6–8.
- Khác về số liệu: màn ngày chơi trong mockup dùng số khác bản đã giao (tài nguyên 62/48/70/55, chi phí −3/−4/−5/−2, thẻ mới như “Lau sạch tấm pin” +10/−3) — đây là thiết kế lại, không phải đổi vỏ; các con số cần mô phỏng lại từ đầu, số liệu cân bằng của bản MVP không chuyển sang được nguyên vẹn.
- Khác về phong cách: nền navy đậm + icon emoji, trong khi bản đã giao sáng hơn và có hình minh họa riêng. Emoji ở mức mockup thì được, không phải art cuối.

## 4. Trả lời 5 câu hỏi trong §6 của mockup

1. **Trẻ 6–8 tuổi có hiểu “dự báo”, “thử thách”, “thưởng” chỉ nhìn màn hình không?** “Thưởng” là rõ nhất (🎁 + “Chọn 1 phần thưởng” + 3 thẻ cụ thể). “Thử thách” hiểu được ở mức cảnh báo (⚠ + “Ngày 5 sẽ có thử thách lớn”), nhưng màn S-11 tự mâu thuẫn (“Trong 3 ngày” vs thử thách 1 ngày) sẽ làm trẻ rối. “Dự báo” là yếu nhất: nhãn “Mai / Trưa / Mốt” trộn ngày với buổi, không có icon thời tiết, chỉ có % nắng — trẻ khó đoán % đó nghĩa là gì. Đề xuất: đổi nhãn thành “Ngày mai / Ngày kia / Ngày kìa” kèm icon nắng/mưa/bão, và ghi chú một dòng “% là độ nắng”.
2. **Khối “Thử thách sắp tới” nên ở trên thanh tài nguyên hay ở dải dự báo?** Nên ở **trên thanh tài nguyên**, ngay dưới tiêu đề ngày — vì nó quyết định thẻ hôm nay nên chọn gì (tiết kiệm Nước). Dải dự báo là bối cảnh phụ, để dưới mới đúng thứ tự ưu tiên quyết định.
3. **Màn thưởng: xem trước hiệu ứng bằng số hay bằng biểu tượng?** **Bằng số** — vì trẻ (và giáo viên) cần so sánh 3 thẻ với nhau. Mockup đã tự chứng minh: “+25 Nước” rõ ràng, còn “Nước lên một nấc” thì mơ hồ. Giữ icon làm trang trí, hiệu ứng luôn ghi bằng số (“Thức ăn −2 mỗi ngày”, “Nước +25”).
4. **Lưới trạm (v1.2) có làm quá tải ở chu kỳ 2 không, hay nên mở sau?** Có nguy cơ quá tải: đến chu kỳ 2 người chơi vừa học xong chu kỳ/thưởng/thử thách, lại thêm lưới 3×3 + phòng + cấp độ + bonus kề nhau + xu. Đề xuất: giữ lưới ở v1.2 nhưng **mở khóa sau khi hoàn thành chu kỳ 2** (không phải ngay đầu chu kỳ 2), và lần đầu chỉ cho “xem trước” (không xây), kèm một nhiệm vụ hướng dẫn duy nhất (“xây 1 phòng”). Bản thân màn lưới trong mockup cũng chưa đủ chín để chốt (hàng 3 thiếu ô, đếm phòng sai, chưa hiện bonus kề nhau).
5. **Màn kết thúc: câu chữ có đủ khích lệ không?** Cơ bản đủ: “Đừng buồn — bạn đã làm rất tốt!” + mẹo cụ thể theo tài nguyên đã cạn là đúng kiểu khích lệ trẻ. Còn thiếu 2 thứ: (a) chú thích sao đo cái gì (★★☆ hiện không giải thích — nên ghi tiêu chí sao ngay dưới sao, khớp với ngưỡng sao đã sửa của bản đã giao); (b) cảnh báo “Chơi lại từ chu kỳ 1” sẽ mất hết phần thưởng đã chọn.

## 5. Phát hiện xếp theo mức độ

### Blocker (chặn việc chốt thiết kế)
- **B1 — Mất bảng dữ liệu NASA trong game.** Xem §1 điểm 1. Phải đưa panel “Dữ liệu thật từ NASA” trở lại màn ngày chơi (đề xuất của chính mockup về “Thẻ khoa học NASA” là hướng đúng, nhưng cần vẽ vào màn hình, không để trong tài liệu).
- **B2 — Màn thưởng không có nút tiếp tục.** Chọn xong không đi tiếp được. Cần nút “Mang sang chu kỳ sau” (hoặc “Tiếp tục”) và ghi rõ độ khó chu kỳ sau tăng bao nhiêu.

### Should-fix (nên sửa trong vòng mockup này)
- **S1 — Màn lưới tự mâu thuẫn:** “4 phòng” vs 5 phòng vẽ ra; hàng 3 thiếu ô; không hiện bonus kề nhau. Sửa số liệu và vẽ đủ 9 ô, mỗi phòng kề nhau hiện bonus cụ thể (ví dụ “+2 vì kề Nhà kính”).
- **S2 — Màn thử thách:** “Trong 3 ngày” → sửa thành đúng 1 ngày (ngày 5) hoặc sửa thiết kế thành thử thách kéo dài 3 ngày (ngày 5 chu kỳ này + ngày 1–2 chu kỳ sau) cho khớp câu chữ; “khoảng 4” → viết “3–4” hoặc đổi số gốc thành 8/4.
- **S3 — Dải dự báo:** nhãn “Mai / Trưa / Mốt” → “Ngày mai / Ngày kia / Ngày kìa” + icon thời tiết + chú thích “% là độ nắng”.
- **S4 — Xu và sao chưa giải thích:** “12 xu” xuất hiện 2 màn mà không nói kiếm/xài ra sao; sao ở màn kết thúc không có tiêu chí. Hoặc bỏ xu khỏi mockup v1.1 (chưa có cơ chế), hoặc thêm một dòng giải thích. Sao thì ghi tiêu chí ngay dưới sao.
- **S5 — Trộn đơn vị hiệu ứng:** “Nước lên một nấc” vs “+25 Nước” — thống nhất ghi bằng số ở mọi thẻ thưởng.
- **S6 — Lỗi chính tả:** “Tiếp tế thưa:thẻ” → “Tiếp tế thưa: thẻ”.

### Nice-to-have
- **N1 — Số liệu màn ngày chơi cần mô phỏng lại** (tài nguyên 62/48/70/55, chi phí −3/−4/−5/−2, thẻ mới) trước khi chốt — không dùng số cân bằng của MVP.
- **N2 — Thống nhất kích thước màn hình:** canvas 1280×720 vs §6 ghi 1024×768.
- **N3 — Icon emoji là placeholder:** ổn cho mockup, nhưng cần ghi rõ art cuối sẽ vẽ riêng (đặc biệt vì bản đã giao đã có hình minh họa riêng).
- **N4 — Banner “Sign in to see this artifact's data”** che phần dưới khi xem toàn màn hình — chỉ là vấn đề khi xem, không phải lỗi thiết kế.

## 6. Checklist trước khi chốt thiết kế v1.1

- [ ] Đưa panel dữ liệu NASA trở lại màn ngày chơi (B1).
- [ ] Thêm nút tiếp tục ở màn thưởng + ghi độ khó chu kỳ sau (B2).
- [ ] Sửa màn lưới: đếm phòng đúng, vẽ đủ 9 ô, hiện bonus kề nhau (S1).
- [ ] Sửa màn thử thách: “Trong 3 ngày” và “khoảng 4” (S2).
- [ ] Sửa dải dự báo: nhãn ngày + icon + chú thích % (S3).
- [ ] Giải thích xu và tiêu chí sao, hoặc bỏ xu khỏi v1.1 (S4); thống nhất hiệu ứng bằng số (S5); sửa typo (S6).
- [ ] Chốt 7 quyết định D-01…D-07 trong §5 của Artboard 1 (đặc biệt D-07 về năng lực, vì nó quyết định lộ trình v1.1 là ~10/1/2027 với 2 người hay ~1/3/2027 với 1 người).
- [ ] Mô phỏng lại cân bằng với số liệu mới trước khi chốt tham số (N1).

## 7. Phụ lục — phương pháp, giới hạn

- Xem bằng trình duyệt (cloud browser), không đăng nhập; artifact tải được sau khi kiểm tra Cloudflare tự hết (~30 giây). Tất cả 6 artboard đã xem ở chế độ toàn màn hình; màn S-04 đã bấm thử thật (chọn thẻ 1, bấm “Chọn thẻ này”, kiểm chứng số liệu đổi đúng 62→59 và 55→65).
- Không tải được file gốc của artifact (export bị tắt), nên review dựa trên những gì hiển thị — không đọc được code của mockup, không kiểm chứng được logic ẩn (ví dụ công thức tăng khó 12%/chu kỳ).
- Số liệu “≈ 73 ngày công”, “≈ 8,7 chu kỳ”, “3 vòng FAIL” là số do chính tài liệu trong mockup ghi, không phải do review này đo lại.
- Không sửa gì trong artifact; lần bấm thử duy nhất trên màn S-04 chỉ đổi trạng thái hiển thị cục bộ trong mockup.

## Ghi chú về nội dung bên ngoài

Review này tóm tắt và bình luận một artifact công khai trên claude.ai mà người dùng đã gửi link. Các đoạn trích dẫn ngắn (tên màn hình, nhãn nút, câu chữ trong mockup) được dùng để mô tả và đánh giá thiết kế, không sao chép toàn bộ nội dung.
