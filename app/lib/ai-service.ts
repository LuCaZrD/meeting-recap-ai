"use client";

// Mô phỏng API Gemini (sẽ thay thế bằng API thực khi có key)
// Trong triển khai thực tế, việc gọi API nên được thực hiện từ server

import { MeetingInfo } from '@/app/components/meeting-info-form';
import { SystemPromptConfig } from '@/app/components/system-prompt-editor';
import { optimizeAudio } from '@/app/lib/audio-processor';

/**
 * Hàm mô phỏng chuyển đổi âm thanh thành văn bản
 * @param audioBlob - File âm thanh dạng Blob
 * @returns Transcript của file âm thanh
 */
function mockTranscribe(audioBlob: Blob): Promise<string> {
  return new Promise((resolve) => {
    // Mô phỏng thời gian xử lý
    setTimeout(() => {
      // Trả về một transcript mô phỏng
      resolve(`
Chủ tọa: Xin chào tất cả mọi người. Cảm ơn các bạn đã tham gia cuộc họp dự án hôm nay. Hôm nay chúng ta sẽ thảo luận về tiến độ phát triển ứng dụng di động và lên kế hoạch cho giai đoạn tiếp theo.

Thành viên 1: Tôi xin báo cáo về phần front-end. Chúng tôi đã hoàn thành khoảng 70% giao diện người dùng theo thiết kế đã được phê duyệt. Có một số thách thức về hiệu suất trên thiết bị cũ mà chúng tôi đang khắc phục.

Chủ tọa: Cảm ơn báo cáo. Khi nào chúng ta có thể kỳ vọng hoàn thành phần giao diện?

Thành viên 1: Dự kiến là trong vòng 2 tuần nữa, trước ngày 15/4.

Thành viên 2: Về phần back-end, chúng tôi đã xây dựng được 85% các API cần thiết. Hệ thống xác thực đã hoạt động tốt, tuy nhiên chúng tôi đang gặp một số vấn đề với việc tối ưu hóa truy vấn cơ sở dữ liệu cho các tính năng tìm kiếm.

Chủ tọa: Vậy là chúng ta đang gặp chậm trễ so với kế hoạch ban đầu?

Thành viên 2: Đúng vậy, khoảng 1 tuần so với kế hoạch. Chúng tôi cần thêm người để giải quyết các vấn đề hiệu suất.

Thành viên 3: Tôi có thể điều một số thành viên từ team QA sang hỗ trợ, nhưng điều đó có thể ảnh hưởng đến kế hoạch kiểm thử.

Chủ tọa: Tôi nghĩ chúng ta nên ưu tiên hoàn thiện các tính năng cốt lõi trước, sau đó mới đến những tính năng bổ sung. Các bạn thấy sao?

Thành viên 1: Tôi đồng ý. Chúng tôi có thể tạm hoãn một số tính năng ít quan trọng hơn để đảm bảo các tính năng chính hoạt động tốt.

Thành viên 2: Vậy tôi sẽ tập trung team vào các API cốt lõi và tối ưu hóa chúng trước.

Chủ tọa: Tốt. Bây giờ chúng ta cần quyết định về ngày phát hành beta. Với tình hình hiện tại, tôi đề xuất dời ngày phát hành beta từ 30/4 đến 15/5. Mọi người nghĩ sao?

Thành viên 3: Tôi nghĩ đó là hợp lý. Điều này cho chúng ta thêm thời gian để test kỹ lưỡng.

Chủ tọa: Vậy chúng ta thống nhất dời ngày phát hành beta đến 15/5. Bây giờ, tôi muốn phân công các nhiệm vụ cụ thể cho tuần tới...

[Cuộc họp tiếp tục với việc phân công nhiệm vụ và thảo luận chi tiết]
      `);
    }, 2000); // Mô phỏng delay 2 giây
  });
}

/**
 * Hàm mô phỏng tạo tóm tắt cuộc họp từ transcript
 * @param transcript - Nội dung văn bản của cuộc họp
 * @param meetingInfo - Thông tin về cuộc họp
 * @param promptConfig - Cấu hình system prompt
 * @returns Tóm tắt cuộc họp ở định dạng Markdown
 */
function mockGenerateRecap(
  transcript: string,
  meetingInfo: MeetingInfo,
  promptConfig: SystemPromptConfig
): Promise<string> {
  return new Promise((resolve) => {
    // Mô phỏng thời gian xử lý
    setTimeout(() => {
      // Tạo tóm tắt mô phỏng với thông tin từ meetingInfo
      const recap = `# Tóm tắt cuộc họp: ${meetingInfo.title}

**Ngày:** ${meetingInfo.date}
**Người tham gia:** ${meetingInfo.participants.join(', ')}

## Tổng quan

Cuộc họp tập trung vào việc đánh giá tiến độ phát triển ứng dụng di động và lên kế hoạch cho giai đoạn tiếp theo. Các chủ đề chính bao gồm tiến độ phát triển front-end và back-end, các thách thức hiện tại, và điều chỉnh lịch trình phát hành.

## Các điểm thảo luận chính

1. **Tiến độ Front-end**
   - Đã hoàn thành khoảng 70% giao diện người dùng
   - Đang gặp thách thức về hiệu suất trên thiết bị cũ
   - Dự kiến hoàn thành vào ngày 15/4

2. **Tiến độ Back-end**
   - Đã hoàn thành 85% các API cần thiết
   - Hệ thống xác thực đã hoạt động tốt
   - Đang gặp vấn đề với việc tối ưu hóa truy vấn cơ sở dữ liệu
   - Chậm trễ khoảng 1 tuần so với kế hoạch

3. **Vấn đề nhân sự**
   - Team back-end cần thêm người để giải quyết vấn đề hiệu suất
   - Đề xuất điều một số nhân sự từ team QA sang hỗ trợ

## Quyết định đã đưa ra

1. Ưu tiên phát triển và tối ưu hóa các tính năng cốt lõi trước
2. Tạm hoãn một số tính năng ít quan trọng hơn
3. Dời ngày phát hành phiên bản beta từ 30/4 đến 15/5

## Hành động tiếp theo

1. **Team Front-end:** Tiếp tục hoàn thiện giao diện, tập trung vào các tính năng cốt lõi (Deadline: 15/4)
2. **Team Back-end:** Tập trung tối ưu hóa các API cốt lõi (Người phụ trách: Thành viên 2)
3. **Team QA:** Điều chỉnh kế hoạch kiểm thử, hỗ trợ team Back-end (Người phụ trách: Thành viên 3)
4. **Tất cả các team:** Chuẩn bị cho việc phát hành phiên bản beta vào ngày 15/5

${meetingInfo.additionalNotes ? `\n## Ghi chú bổ sung\n\n${meetingInfo.additionalNotes}` : ''}`;

      resolve(recap);
    }, 3000); // Mô phỏng delay 3 giây
  });
}

/**
 * Xử lý file âm thanh từ local và tạo tóm tắt
 * @param file - File âm thanh
 * @param meetingInfo - Thông tin về cuộc họp
 * @param promptConfig - Cấu hình system prompt
 * @returns Tóm tắt cuộc họp
 */
export async function processLocalAudio(
  file: File,
  meetingInfo: MeetingInfo,
  promptConfig: SystemPromptConfig
): Promise<string> {
  try {
    // 1. Tối ưu hóa âm thanh (xóa khoảng lặng, giảm nhiễu)
    const optimizedAudio = await optimizeAudio(file);
    
    // 2. Chuyển âm thanh thành văn bản
    const transcript = await mockTranscribe(optimizedAudio);
    
    // 3. Tạo tóm tắt từ văn bản và thông tin cuộc họp
    const recap = await mockGenerateRecap(transcript, meetingInfo, promptConfig);
    
    return recap;
  } catch (error) {
    console.error('Error processing audio:', error);
    throw new Error('Đã xảy ra lỗi khi xử lý file âm thanh');
  }
}

/**
 * Xử lý file âm thanh từ Google Drive và tạo tóm tắt
 * @param driveUrl - URL của file âm thanh trên Google Drive
 * @param meetingInfo - Thông tin về cuộc họp
 * @param promptConfig - Cấu hình system prompt
 * @returns Tóm tắt cuộc họp
 */
export async function processGoogleDriveAudio(
  driveUrl: string,
  meetingInfo: MeetingInfo,
  promptConfig: SystemPromptConfig
): Promise<string> {
  try {
    // Mô phỏng xử lý file từ Google Drive
    // Trong triển khai thực tế, cần tải file từ Google Drive API
    
    // Mô phỏng chờ tải file
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mô phỏng tạo transcript
    const transcript = await mockTranscribe(new Blob([]));
    
    // Tạo tóm tắt từ transcript
    const recap = await mockGenerateRecap(transcript, meetingInfo, promptConfig);
    
    return recap;
  } catch (error) {
    console.error('Error processing Google Drive audio:', error);
    throw new Error('Đã xảy ra lỗi khi xử lý file âm thanh từ Google Drive');
  }
} 