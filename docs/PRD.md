# Product Requirements Document - Meeting Recap AI

## Tổng quan sản phẩm

### Mục đích và tầm nhìn
Meeting Recap AI là ứng dụng web giúp người dùng tạo tóm tắt tự động từ các file ghi âm cuộc họp bằng cách sử dụng trí tuệ nhân tạo. Ứng dụng nhằm giải quyết vấn đề tốn thời gian và công sức cho việc tạo biên bản cuộc họp, giúp người dùng lưu trữ và chia sẻ thông tin quan trọng từ các cuộc họp một cách hiệu quả.

### Đối tượng người dùng
- Quản lý dự án và nhóm làm việc cần tạo biên bản cuộc họp
- Nhân viên văn phòng tham gia nhiều cuộc họp
- Giáo viên, giảng viên cần ghi chép nội dung buổi học
- Nhà nghiên cứu thực hiện phỏng vấn và cần tổng hợp nội dung

### Giá trị cung cấp
- Tiết kiệm thời gian viết biên bản cuộc họp
- Nắm bắt thông tin chính xác từ cuộc họp
- Tạo tài liệu có cấu trúc tốt với những điểm quan trọng
- Dễ dàng chia sẻ kết quả với những người tham gia

## Tính năng sản phẩm

### Tính năng chính
1. **Tải lên file âm thanh**
   - Tải lên file ghi âm cuộc họp từ máy tính
   - Hỗ trợ các định dạng phổ biến (MP3, WAV, M4A)
   - Giới hạn kích thước file 100MB
   - Lấy file từ Google Drive (URL)

2. **Nhập thông tin cuộc họp**
   - Tiêu đề cuộc họp
   - Ngày tổ chức
   - Danh sách người tham gia
   - Mục đích cuộc họp
   - Ghi chú bổ sung (không bắt buộc)

3. **Tùy chỉnh prompt cho AI**
   - Sử dụng prompt mặc định
   - Tùy chỉnh prompt theo nhu cầu
   - Khôi phục prompt mặc định

4. **Xử lý âm thanh và tạo tóm tắt**
   - Tối ưu hóa âm thanh (loại bỏ khoảng lặng)
   - Chuyển đổi âm thanh thành văn bản (speech-to-text)
   - Tạo tóm tắt có cấu trúc từ transcript

5. **Xuất kết quả**
   - Hiển thị tóm tắt dạng Markdown
   - Sao chép tóm tắt vào clipboard
   - Tải xuống dưới dạng PDF (dự kiến)
   - Tải xuống dưới dạng Word (dự kiến)

### Tính năng phụ
1. **Giao diện**
   - Giao diện trực quan, dễ sử dụng
   - Hiển thị các bước xử lý
   - Chế độ sáng/tối
   - Responsive trên các thiết bị

2. **Thông báo**
   - Thông báo thành công/lỗi khi tải file
   - Hiển thị tiến trình xử lý
   - Thông báo hoàn thành tóm tắt

## Luồng người dùng

1. **Bước 1: Tải lên file âm thanh**
   - Người dùng truy cập trang chủ
   - Chọn tải file từ máy tính hoặc nhập URL Google Drive
   - Hệ thống kiểm tra định dạng và kích thước file

2. **Bước 2: Nhập thông tin cuộc họp**
   - Người dùng điền thông tin cuộc họp
   - Thêm danh sách người tham gia
   - Hệ thống xác nhận thông tin đầy đủ

3. **Bước 3: Tùy chỉnh prompt**
   - Người dùng xem và tùy chỉnh prompt (nếu cần)
   - Bắt đầu quá trình xử lý

4. **Bước 4: Xử lý và chờ đợi**
   - Hệ thống tối ưu hóa file âm thanh
   - Chuyển đổi âm thanh thành văn bản
   - Phân tích và tạo tóm tắt
   - Hiển thị trạng thái xử lý

5. **Bước 5: Xem và sử dụng kết quả**
   - Người dùng xem tóm tắt được tạo
   - Sao chép hoặc tải xuống kết quả
   - Có thể bắt đầu lại với file khác

## Yêu cầu kỹ thuật

### Yêu cầu front-end
- Sử dụng Next.js và React 
- Giao diện sử dụng Tailwind CSS và shadcn/ui
- Responsive trên các thiết bị
- Xử lý âm thanh client-side với FFmpeg WASM
- Hiển thị Markdown với react-markdown

### Yêu cầu back-end
- API cho xử lý âm thanh (tương lai)
- Tích hợp với AI service (Gemini API)
- Xử lý file từ Google Drive API (tương lai)
- Tạo và xuất file (PDF, Word)

### Yêu cầu AI/ML
- Sử dụng AI để chuyển văn bản thành tóm tắt có cấu trúc
- Sử dụng prompt engineering để cải thiện kết quả
- Đảm bảo tóm tắt nắm bắt các điểm quan trọng

## Phiên bản và lộ trình

### Phiên bản 1.0 (hiện tại)
- Giao diện cơ bản
- Xử lý âm thanh client-side
- Xử lý tóm tắt dưới dạng mô phỏng
- Hỗ trợ tiếng Việt
- Hỗ trợ sao chép kết quả

### Phiên bản 1.1 (ngắn hạn)
- Tích hợp Gemini API thực tế
- Cải thiện xử lý âm thanh
- Hỗ trợ tải xuống PDF và Word

### Phiên bản 2.0 (trung hạn)
- Hỗ trợ nhiều ngôn ngữ
- Lưu trữ lịch sử tóm tắt
- Tạo tài khoản và đăng nhập
- Cải thiện độ chính xác của tóm tắt

### Phiên bản 3.0 (dài hạn)
- Nhận dạng người nói
- Phân tích cảm xúc trong cuộc họp
- Tích hợp với các nền tảng họp trực tuyến
- API cho phép tích hợp với các ứng dụng khác

## Đo lường thành công

### Chỉ số hiệu suất
- Tỷ lệ thành công trong việc xử lý file âm thanh
- Thời gian trung bình để tạo tóm tắt
- Độ chính xác của tóm tắt so với nội dung thực tế
- Đánh giá của người dùng về chất lượng tóm tắt

### Phương pháp thu thập phản hồi
- Form đánh giá trong ứng dụng
- Phỏng vấn người dùng trực tiếp
- Phân tích dữ liệu sử dụng
- A/B testing với các prompt khác nhau

## Yêu cầu phi chức năng

### Hiệu suất
- Thời gian tải trang < 2 giây
- Xử lý file âm thanh 1 giờ trong < 5 phút
- Tạo tóm tắt trong < 30 giây sau khi chuyển văn bản

### Bảo mật
- Bảo vệ dữ liệu người dùng
- Không lưu trữ file âm thanh sau khi xử lý
- Tuân thủ GDPR và các quy định về dữ liệu

### Khả năng mở rộng
- Hỗ trợ xử lý nhiều file cùng lúc
- Khả năng mở rộng để hỗ trợ nhiều người dùng
- Tương thích với các nền tảng cloud khác nhau

## Phụ lục
- Các thuật ngữ và định nghĩa
- Câu hỏi thường gặp
- Tài liệu tham khảo và công nghệ sử dụng 