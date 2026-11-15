# Tài liệu dự án "Sứ mệnh vô hạn"

Bộ tài liệu phân tích, thiết kế, phát triển và quản lý cho chế độ chơi vô hạn của Trạm Mặt Trăng Nhí.

## Bản hiện hành

| Mã | Tài liệu | Phiên bản | Ngày | File |
|---|---|---|---|---|
| PRJ-INF-01 | Phân tích, thiết kế và phát triển | v0.4 | 15/11/2026 | `PRJ-INF-01_phan-tich-thiet-ke-phat-trien_2026-11-15.md` |
| PRJ-INF-02 | Quản lý tiến độ và nội dung | v0.3 | 15/11/2026 | `PRJ-INF-02_quan-ly-tien-do-noi-dung_2026-11-15.md` |

## Quy ước đặt tên và phiên bản

- Tên file: `<MÃ>_<slug>_<YYYY-MM-DD>.md` — ngày là ngày phát hành bản đó. Phiên bản `vMAJOR.MINOR` ghi trong bảng đầu file và bảng "Lịch sử phiên bản".
- Khi cập nhật sang ngày mới: tạo file mới với ngày mới; chuyển file cũ vào `archive/` đổi tên thành `<MÃ>_<ngày cũ>_vX.Y.md`.
- Cập nhật trong cùng một ngày: sửa tại chỗ, tăng MINOR, ghi vào lịch sử phiên bản; nếu thay đổi lớn thì lưu bản trước vào `archive/` trước khi sửa.
- Rà soát độc lập: `reviews/RV-NN_<chủ đề>_<tài liệu>-<phiên bản>_<ngày>.md`.
- Báo cáo tuần: `status/TT_<ngày>.md` (mẫu ở PRJ-INF-02 mục 7.2).

## Lịch sử các thư mục

| Thư mục | Nội dung hiện có |
|---|---|
| `archive/` | `PRJ-INF-01_2026-11-15_v0.1.md` (đề xuất đầu), `..._v0.2.md`; `PRJ-INF-02_2026-11-15_v0.1.md` (v0.2 của INF-01 và v0.1 của INF-02 được dựng lại từ bản trước khi sửa) |
| `reviews/` | `RV-01_ra-soat-ky-thuat_PRJ-INF-01-v0.1_2026-11-15.md` (FAIL, xử lý trong v0.2) |
| `reviews/` | `RV-02_ra-soat-vong-2_PRJ-INF-01-v0.2_2026-11-15.md` (FAIL; xử lý ở INF-01 mục 12.4) |
| `reviews/` | `RV-03_ra-soat-vong-3_PRJ-INF-01-v0.3_2026-11-15.md` (FAIL; xử lý ở INF-01 mục 12.5; còn lại là chứng minh cân bằng bằng engine thật) |

## Công cụ liên quan

- `../../tools/proto_balance.py` — mô hình cân bằng nháp (500 ván/seed). Không phải engine; thay bằng `tools/sim.mjs` ở Sprint 1.
- `../de-xuat-gameplay-chien-thuat-vo-han.md` — bản ý tưởng ban đầu (giữ làm lịch sử).
- `../chien-luoc-gameplay.md` — 6 level theo roadmap NASA (tóm tắt).
