# Trạm Mặt Trăng Nhí — Junior Astronaut Mission Trainer

Game huấn luyện phi hành gia nhí: điều hành một trạm Mặt Trăng, cân bằng
**Không khí, Nước, Thức ăn, Năng lượng** qua từng ngày — để học sinh tiểu học
trải nghiệm trực tiếp những quyết định làm nên thành bại của một sứ mệnh vũ trụ.

Sản phẩm dự thi **NASA Space Apps Challenge 2026 — Challenge 3:
Build a Junior Astronaut Mission Trainer** (Hà Nội, 14–15/11/2026).

## Chơi ngay

- Bản chơi trực tuyến: bật GitHub Pages cho repo này (xem mục Triển khai),
  hoặc mở trực tiếp file `index.html` bằng trình duyệt.
- Không cần đăng nhập, không thu thập dữ liệu, không quảng cáo.
  Toàn bộ game chạy trong trình duyệt; dữ liệu thật của NASA được nhúng sẵn.

## Cách chơi (tóm tắt)

1. **Chọn vị trí trạm** ở cực Nam Mặt Trăng.
2. **Mỗi ngày chọn 1 thẻ quyết định** trong 3 thẻ được rút — mỗi thẻ là một
   đánh đổi thật (ví dụ: bật khiên chắn bức xạ tốn Năng lượng nhưng bảo vệ phi
   hành đoàn).
3. **Ứng phó sự kiện bất ngờ**: bão Mặt Trời, thiên thạch nhỏ, mất điện đêm...
4. **Sống sót 5 ngày** với 4 thanh tài nguyên không chạm 0.
5. Xem màn hình kết thúc: số sao (1–3) và 2 điều con học được về vũ trụ thật.

Khung **“Dữ liệu NASA hôm nay”** trong game cho biết % nắng, nhiệt độ bề mặt
và ngày Mặt Trăng tương ứng của từng ngày chơi; Năng lượng cuối ngày được
cộng/trừ theo nắng và nhiệt độ thật.

## Dữ liệu NASA dùng trong game

| Dữ liệu | Nguồn | Cách dùng trong game |
|---|---|---|
| Chu kỳ ngày Mặt Trăng 29,5 ngày; ~14 ngày nắng rồi ~14 ngày đêm | NASA Science, Moon facts | Khung dự báo từng ngày; năng lượng Mặt Trời chỉ có khi có nắng |
| Nhiệt độ bề mặt: +127°C ban ngày, −173°C ban đêm (xích đạo) | LRO / Diviner Lunar Radiometer (từ 2009) | Hiệu ứng Năng lượng cuối ngày: −4, +4, +6, +3, −5 |
| Hố tối vĩnh viễn ở cực có băng nước; vành miệng hố gần như luôn có nắng | LRO / LCROSS | Lựa chọn vị trí trạm ở cực Nam |
| Kế hoạch trạm Mặt Trăng 3 giai đoạn (tới 2028; 2029–2032; 2033–2036) | NASA Moon Base plan, công bố 03/2026 | Khung roadmap cho các level tiếp theo |

Các số liệu trên được đơn giản hóa cho học sinh tiểu học và ghi rõ nguồn
ngay trong game. Số liệu gốc đầy đủ: NASA Science (science.nasa.gov/moon),
LRO Diviner.

## Cấu trúc repo

```text
index.html                  Game hoàn chỉnh trong 1 file (HTML + CSS + JS, tài nguyên đã nhúng)
README.md                   Tài liệu này
LICENSE                     Giấy phép MIT
.github/workflows/pages.yml Triển khai GitHub Pages tự động
docs/
  chien-luoc-gameplay.md    Chiến lược gameplay: 6 level theo roadmap (bản tóm tắt)
```

## Roadmap

| Phiên bản | Level | Nội dung |
|---|---|---|
| MVP (đã có) | L1 | Dựng trạm, sống sót 5 ngày |
| v1.1 | L2 | Đêm Mặt Trăng dài: tích pin trước khi đêm xuống |
| v1.2 | L3 | Săn băng ở cực Nam |
| v2.0 | L4 | Mở rộng trạm + ISRU (lấy oxy từ đất Mặt Trăng) |
| v2.5 | L5 | Trạm tự túc, vòng khép kín |
| v3.0 | L6 | Chuẩn bị lên Sao Hỏa |

Chi tiết từng level, mẹo chơi và kịch bản tiết học 20–30 phút: xem
`docs/chien-luoc-gameplay.md` (tóm tắt từ tài liệu chiến lược đầy đủ).

## Triển khai (GitHub Pages)

1. Vào **Settings → Pages** của repo.
2. **Build and deployment → Source: GitHub Actions**.
3. Workflow `.github/workflows/pages.yml` sẽ tự chạy mỗi lần push lên `main`
   và xuất bản `index.html` thành trang web công khai.

Chạy local không cần build gì thêm: mở `index.html`, hoặc
`python3 -m http.server` trong thư mục repo rồi mở `http://localhost:8000`.

## Đóng góp

Repo mở cho giáo viên, phụ huynh và học sinh góp ý: mở Issue để báo lỗi
cân bằng game, gợi ý thẻ quyết định mới, hoặc đề xuất sự kiện mới.
Mọi đóng góp về nội dung khoa học cần kèm nguồn NASA.

## Giấy phép

Mã nguồn game theo giấy phép **MIT** (xem `LICENSE`).
Nội dung giáo dục và tài liệu đặc tả đi kèm thuộc dự án Trạm Mặt Trăng Nhí.

## Ghi nhận

- NASA Space Apps Challenge 2026, Challenge 3 — đề bài và dữ liệu mở NASA.
- Thiết kế và phát triển: Hoàng Quang Huy (iBME Lab, Đại học Bách Khoa Hà Nội)
  cùng trợ lý AI Muse.
- Bộ tài liệu đặc tả 7 tài liệu (SRS/SAD/SDD/UX/kiểm thử/triển khai/hướng dẫn
  sửa đổi) và tài liệu đánh giá theo bảng chấm BTC được lưu riêng trong quá
  trình phát triển.
