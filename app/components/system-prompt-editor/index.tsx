"use client";

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Textarea } from "@/app/components/ui/textarea";
import { toast } from 'sonner';

// Định nghĩa interface cho cấu hình system prompt
export interface SystemPromptConfig {
  prompt: string;
}

// Định nghĩa props cho component
interface SystemPromptEditorProps {
  onSubmit: (config: SystemPromptConfig) => void;
}

export function SystemPromptEditor({ onSubmit }: SystemPromptEditorProps) {
  // System prompt mặc định
  const defaultPrompt = `Tóm tắt cuộc họp này một cách ngắn gọn, rõ ràng và có cấu trúc. Bao gồm các phần sau:

1. Tổng quan: Tóm tắt ngắn gọn về cuộc họp.
2. Các điểm thảo luận chính: Liệt kê những vấn đề quan trọng đã được thảo luận.
3. Quyết định đã đưa ra: Các quyết định chính thức được đưa ra trong cuộc họp.
4. Hành động tiếp theo: Các nhiệm vụ cần thực hiện, người phụ trách và thời hạn (nếu có).

Sử dụng ngôn ngữ chuyên nghiệp, tập trung vào thông tin quan trọng, và bỏ qua các cuộc trò chuyện không liên quan.`;

  // State cho system prompt
  const [promptConfig, setPromptConfig] = useState<SystemPromptConfig>({
    prompt: defaultPrompt,
  });
  
  // Xử lý khi người dùng thay đổi prompt
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptConfig({
      ...promptConfig,
      prompt: e.target.value,
    });
  };
  
  // Xử lý khi người dùng khôi phục prompt mặc định
  const handleRestoreDefault = () => {
    setPromptConfig({
      prompt: defaultPrompt,
    });
    toast.info('Đã khôi phục prompt mặc định');
  };
  
  // Xử lý khi người dùng submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra prompt không được để trống
    if (!promptConfig.prompt.trim()) {
      toast.error('Prompt không được để trống', {
        description: 'Vui lòng nhập system prompt hoặc sử dụng mặc định.',
      });
      return;
    }
    
    onSubmit(promptConfig);
  };
  
  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Tùy chỉnh System Prompt</CardTitle>
          <CardDescription>
            Tùy chỉnh hướng dẫn cho AI khi tạo tóm tắt cuộc họp. Nếu không chắc chắn, hãy sử dụng mặc định.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">System Prompt</div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleRestoreDefault}
                >
                  Khôi phục mặc định
                </Button>
              </div>
              <Textarea
                value={promptConfig.prompt}
                onChange={handlePromptChange}
                placeholder="Nhập hướng dẫn cho AI khi tạo tóm tắt..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Hướng dẫn:</p>
              <ul className="list-disc list-inside pl-2 space-y-1 mt-1">
                <li>System prompt định hướng AI cách tạo tóm tắt cuộc họp</li>
                <li>Thêm những yêu cầu cụ thể về nội dung, định dạng, độ dài...</li>
                <li>Có thể yêu cầu tập trung vào các chủ đề nhất định</li>
                <li>Nếu không chắc chắn, hãy sử dụng mặc định</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Bắt đầu xử lý</Button>
        </CardFooter>
      </form>
    </Card>
  );
} 