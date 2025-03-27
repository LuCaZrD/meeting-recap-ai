"use client";

import { useState } from 'react';
import { Clipboard, FileType, Download } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

// Định nghĩa interface cho props
interface RecapResultProps {
  recap: string;
}

export function RecapResult({ recap }: RecapResultProps) {
  // States cho việc tạo PDF và Word
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingWord, setIsGeneratingWord] = useState(false);
  
  // Hàm sao chép vào clipboard
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(recap);
      toast.success('Đã sao chép', {
        description: 'Tóm tắt đã được sao chép vào clipboard'
      });
    } catch (err) {
      toast.error('Không thể sao chép', {
        description: 'Đã xảy ra lỗi khi sao chép vào clipboard'
      });
    }
  };
  
  // Hàm mô phỏng tạo và tải xuống PDF
  const handleDownloadPDF = () => {
    setIsGeneratingPDF(true);
    
    // Mô phỏng tạo PDF - sẽ thay bằng thư viện thực tế sau
    setTimeout(() => {
      setIsGeneratingPDF(false);
      
      // Thông báo thành công và bước tiếp theo để tích hợp với API thực
      toast.success('Tải xuống PDF', {
        description: 'Tính năng này sẽ được tích hợp với API thực trong phiên bản tiếp theo'
      });
    }, 1500);
  };
  
  // Hàm mô phỏng tạo và tải xuống Word
  const handleDownloadWord = () => {
    setIsGeneratingWord(true);
    
    // Mô phỏng tạo Word - sẽ thay bằng thư viện thực tế sau
    setTimeout(() => {
      setIsGeneratingWord(false);
      
      // Thông báo thành công và bước tiếp theo để tích hợp với API thực
      toast.success('Tải xuống Word', {
        description: 'Tính năng này sẽ được tích hợp với API thực trong phiên bản tiếp theo'
      });
    }, 1500);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tóm tắt cuộc họp</CardTitle>
        <CardDescription>
          Đây là tóm tắt cuộc họp được tạo bởi AI dựa trên ghi âm và thông tin bạn cung cấp.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 rounded-lg p-4 overflow-auto max-h-[400px] mb-4">
          <ReactMarkdown className="prose dark:prose-invert max-w-none">
            {recap}
          </ReactMarkdown>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleCopyToClipboard}
        >
          <Clipboard className="h-4 w-4" />
          <span>Sao chép</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? (
            <>
              <div className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <span>Đang tạo PDF...</span>
            </>
          ) : (
            <>
              <FileType className="h-4 w-4" />
              <span>Tải PDF</span>
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleDownloadWord}
          disabled={isGeneratingWord}
        >
          {isGeneratingWord ? (
            <>
              <div className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <span>Đang tạo Word...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Tải Word</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
} 