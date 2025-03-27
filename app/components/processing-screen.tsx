import { useEffect, useState } from 'react';

interface ProcessingScreenProps {
  onComplete: (result: string) => void;
}

const MOCK_RESULT = `# BIÊN BẢN CUỘC HỌP

## THÔNG TIN CHUNG

**Tiêu đề:** Họp Kế hoạch Marketing Quý 2/2025

**Thời gian:** 27/03/2025, 14:00 - 15:30

**Địa điểm:** Phòng họp chính, tầng 4

**Chủ trì:** Nguyễn Văn A, Giám đốc Marketing

**Người ghi biên bản:** Phạm Thị D, Phụ trách Truyền thông

**Tham dự:**
- Nguyễn Văn A (Giám đốc Marketing)
- Trần Thị B (Trưởng nhóm Nội dung)
- Lê Văn C (Trưởng nhóm Thiết kế)
- Phạm Thị D (Phụ trách Truyền thông)

**Mục đích cuộc họp:** Thảo luận chiến lược marketing cho quý 2/2025

## TÓM TẮT NỘI DUNG

Cuộc họp đã tập trung vào đánh giá hiệu quả chiến dịch marketing Q1/2025 và xây dựng kế hoạch chi tiết cho Q2/2025. Đội marketing đã hoàn thành 80% mục tiêu Q1, với thành tích nổi bật là tăng trưởng 15% lượng người dùng mới qua các kênh social media. Các chiến dịch quảng cáo trên Facebook và TikTok đã mang lại hiệu quả cao nhất so với các kênh khác. Kế hoạch Q2 sẽ tập trung vào phát triển nội dung video ngắn, cải thiện trải nghiệm người dùng trên ứng dụng di động và chuẩn bị cho sự kiện ra mắt sản phẩm dự kiến diễn ra vào tháng 6/2025.

## NỘI DUNG CHI TIẾT

### 1. Đánh giá kết quả Marketing Q1/2025
- Hoàn thành 80% các chỉ tiêu KPI tổng thể
- Tăng trưởng 15% người dùng mới thông qua kênh social media
- Tỷ lệ nhấp chuột (CTR) quảng cáo Facebook tăng 7% so với quý trước
- Chiến dịch TikTok thu hút được 3,000 người dùng mới
- Phân tích chi tiết cho thấy độ tương tác cao nhất là vào các ngày cuối tuần, đặc biệt là Chủ Nhật

### 2. Kế hoạch Marketing Q2/2025
- Phát triển chiến lược nội dung video ngắn xuyên suốt quý
- Tối ưu hóa ứng dụng di động để cải thiện trải nghiệm người dùng
- Lên kế hoạch chi tiết cho sự kiện ra mắt sản phẩm mới vào tháng 6
- Phối hợp chặt chẽ với đội phát triển sản phẩm để đảm bảo tính nhất quán trong thông điệp

### 3. Phân bổ ngân sách Marketing Q2/2025
- 40% cho quảng cáo kỹ thuật số (digital advertising)
- 30% cho tổ chức sự kiện ra mắt sản phẩm
- 20% cho phát triển nội dung (content marketing)
- 10% cho hoạt động quan hệ công chúng (PR)

## QUYẾT ĐỊNH ĐÃ ĐƯỢC THÔNG QUA

1. Tăng 20% ngân sách quảng cáo cho các nền tảng TikTok và Instagram
2. Ký hợp đồng với agency mới để tổ chức sự kiện ra mắt sản phẩm
3. Sản xuất tối thiểu 10 video ngắn mỗi tháng cho các nền tảng social media
4. Triển khai phát triển tính năng mới cho ứng dụng di động, hoàn thành trước 15/5/2025

## PHÂN CÔNG CÔNG VIỆC

| Người phụ trách | Công việc | Thời hạn |
|:----------------|:----------|:---------|
| Trần Thị B | Xây dựng kế hoạch nội dung video ngắn | 05/04/2025 |
| Lê Văn C | Thiết kế bộ banner quảng cáo mới cho chiến dịch Q2 | 10/04/2025 |
| Phạm Thị D | Liên hệ và đánh giá 3 agency tổ chức sự kiện | 15/04/2025 |
| Nguyễn Văn A | Phê duyệt ngân sách và kế hoạch chi tiết Q2 | 20/04/2025 |

## CÂU HỎI VÀ VẤN ĐỀ CẦN GIẢI QUYẾT TIẾP THEO

1. Làm thế nào để tối ưu chi phí quảng cáo trên các nền tảng kỹ thuật số?
2. Nên ưu tiên phát triển tính năng nào của ứng dụng di động để cải thiện trải nghiệm người dùng?
3. Quy mô và định dạng phù hợp cho sự kiện ra mắt sản phẩm?

## THỜI GIAN HỌP TIẾP THEO

Cuộc họp tiếp theo được lên lịch vào Thứ Sáu, ngày 20/04/2025, từ 14:00 đến 15:30 tại cùng địa điểm.

---

*Biên bản này được ghi lại và phê duyệt bởi Nguyễn Văn A, Giám đốc Marketing.*`;

export function ProcessingScreen({ onComplete }: ProcessingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<string>('Chuẩn bị xử lý âm thanh...');

  // Mô phỏng quá trình xử lý với tiến trình và các bước
  useEffect(() => {
    const steps = [
      { progress: 10, text: 'Tối ưu hóa file âm thanh...' },
      { progress: 30, text: 'Chuyển đổi âm thanh thành văn bản...' },
      { progress: 60, text: 'Phân tích nội dung văn bản...' },
      { progress: 80, text: 'Tạo tóm tắt cuộc họp...' },
      { progress: 95, text: 'Hoàn thiện kết quả...' },
      { progress: 100, text: 'Hoàn tất!' },
    ];

    let stepIndex = 0;
    
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        const { progress, text } = steps[stepIndex];
        setProgress(progress);
        setCurrentStep(text);
        stepIndex++;
      } else {
        clearInterval(interval);
        // Mô phỏng API call thành công sau 1 giây
        setTimeout(() => onComplete(MOCK_RESULT), 1000);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="bg-paper border border-border rounded-lg p-6 shadow-sm text-center">
      <h2 className="text-xl font-bold mb-8">Đang xử lý</h2>
      
      <div className="max-w-md mx-auto mb-8">
        <div className="h-2 w-full bg-content/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-content transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-content/70">{progress}%</p>
      </div>
      
      <div className="space-y-4">
        <p className="text-lg font-medium">{currentStep}</p>
        <p className="text-content/70 text-sm">
          Quá trình này có thể mất vài phút tùy theo độ dài của file âm thanh.
          <br />Vui lòng không đóng trình duyệt.
        </p>
      </div>
    </div>
  );
} 