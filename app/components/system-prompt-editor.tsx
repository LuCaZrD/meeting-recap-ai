import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface SystemPromptEditorProps {
  onSubmit: (prompt: string) => void;
  meetingInfo: {
    title: string;
    purpose: string;
  };
}

const DEFAULT_PROMPT = `Bạn là trợ lý AI tổng hợp và tóm tắt cuộc họp. Dựa vào bản ghi âm được chuyển thành văn bản, hãy tạo một bản tóm tắt cuộc họp có cấu trúc rõ ràng.

Bản tóm tắt nên bao gồm:

1. Thông tin cơ bản:
   - Tiêu đề: {title}
   - Mục đích: {purpose} 
   - Thời gian: {date}
   - Người tham gia: {participants}

2. Tóm tắt chính (5-7 câu tổng hợp nội dung quan trọng nhất)

3. Các điểm chính được thảo luận (dạng bullet points)

4. Quyết định đã đưa ra (nếu có)

5. Hành động cần thực hiện (các công việc, nhiệm vụ được giao)

6. Câu hỏi cần giải đáp tiếp theo (nếu có)

7. Thời gian cho cuộc họp tiếp theo (nếu được đề cập)

Hãy viết bằng giọng điệu chuyên nghiệp nhưng dễ hiểu. Tập trung vào những thông tin quan trọng và bỏ qua các phần tán gẫu không liên quan. Sử dụng định dạng Markdown để tổ chức nội dung.`;

export function SystemPromptEditor({ onSubmit, meetingInfo }: SystemPromptEditorProps) {
  const formattedDefaultPrompt = DEFAULT_PROMPT
    .replace('{title}', meetingInfo.title)
    .replace('{purpose}', meetingInfo.purpose);

  const [prompt, setPrompt] = useState(formattedDefaultPrompt);

  const handleResetPrompt = () => {
    setPrompt(formattedDefaultPrompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="bg-paper border border-border rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tùy chỉnh yêu cầu AI</h2>
        <button
          type="button"
          onClick={handleResetPrompt}
          className="flex items-center text-sm text-content/70 hover:text-content"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Khôi phục mặc định
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block mb-1 font-medium">
            Yêu cầu cho AI <span className="text-red-500">*</span>
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={15}
            className="w-full p-3 border border-border rounded bg-paper font-mono text-sm"
            placeholder="Nhập yêu cầu chi tiết cho AI để tạo tóm tắt cuộc họp..."
            required
          />
          <p className="mt-1 text-xs text-content/70">
            Sử dụng các biến như {'{title}'}, {'{purpose}'}, {'{date}'}, {'{participants}'} để đưa thông tin cuộc họp vào prompt.
          </p>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2 bg-content text-paper rounded hover:bg-content/90 font-medium"
          >
            Bắt đầu xử lý
          </button>
        </div>
      </form>
    </div>
  );
} 