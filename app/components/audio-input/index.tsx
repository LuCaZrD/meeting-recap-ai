"use client";

import { useState, useRef } from 'react';
import { Upload, Link } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { toast } from 'sonner';

// Định nghĩa props cho component
interface AudioInputProps {
  onFileSelect: (result: { type: 'local' | 'drive'; data: any }) => void;
}

export function AudioInput({ onFileSelect }: AudioInputProps) {
  // State cho tệp âm thanh và URL của Google Drive
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [driveUrl, setDriveUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // Xử lý khi người dùng chọn file từ máy tính
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Kiểm tra loại file
      const acceptedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/m4a', 'audio/x-m4a'];
      if (!acceptedTypes.includes(file.type)) {
        toast.error('Định dạng file không hỗ trợ', {
          description: 'Vui lòng tải lên file âm thanh định dạng MP3, WAV hoặc M4A.'
        });
        return;
      }
      
      // Kiểm tra kích thước file (giới hạn 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast.error('File quá lớn', {
          description: 'Vui lòng tải lên file nhỏ hơn 100MB.'
        });
        return;
      }
      
      setAudioFile(file);
      toast.success('Đã tải file thành công', {
        description: file.name
      });
    }
  };
  
  // Xử lý khi người dùng nhấn nút tải lên
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Xử lý khi người dùng tiếp tục với file đã chọn
  const handleLocalContinue = () => {
    if (audioFile) {
      onFileSelect({ type: 'local', data: audioFile });
    } else {
      toast.error('Chưa chọn file', {
        description: 'Vui lòng chọn một file âm thanh để tiếp tục.'
      });
    }
  };
  
  // Xử lý khi người dùng tiếp tục với URL Google Drive
  const handleDriveContinue = () => {
    if (!driveUrl) {
      toast.error('URL không hợp lệ', {
        description: 'Vui lòng nhập URL Google Drive hợp lệ.'
      });
      return;
    }
    
    // Kiểm tra định dạng URL Google Drive cơ bản
    if (!driveUrl.includes('drive.google.com')) {
      toast.error('URL không hợp lệ', {
        description: 'Vui lòng nhập URL Google Drive hợp lệ.'
      });
      return;
    }
    
    onFileSelect({ type: 'drive', data: driveUrl });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tải lên file ghi âm cuộc họp</CardTitle>
        <CardDescription>
          Tải lên file ghi âm cuộc họp để AI tạo tóm tắt. Hỗ trợ định dạng MP3, WAV, và M4A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="local" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="local">Tải từ máy tính</TabsTrigger>
            <TabsTrigger value="drive">Từ Google Drive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="local" className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 cursor-pointer hover:bg-muted/50 transition-colors" onClick={handleUploadClick}>
              <input
                type="file"
                accept="audio/mpeg,audio/wav,audio/mp4,audio/m4a,audio/x-m4a"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-1">
                Nhấp để tải lên hoặc kéo thả file âm thanh vào đây
              </p>
              <p className="text-xs text-muted-foreground">
                MP3, WAV hoặc M4A. Tối đa 100MB.
              </p>
            </div>
            
            {audioFile && (
              <div className="flex items-center justify-between p-3 border rounded-lg mt-4">
                <div className="truncate">
                  <p className="text-sm font-medium truncate">{audioFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="default"
                  onClick={handleLocalContinue}
                >
                  Tiếp tục
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="drive" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="drive-url">URL Google Drive</Label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Link className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="drive-url"
                      placeholder="https://drive.google.com/file/d/..."
                      className="pl-8"
                      value={driveUrl}
                      onChange={(e) => setDriveUrl(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="default"
                    onClick={handleDriveContinue}
                  >
                    Tiếp tục
                  </Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>Lưu ý:</p>
                <ul className="list-disc list-inside pl-2 space-y-1 mt-1">
                  <li>File nên được chia sẻ công khai hoặc "Ai có đường link đều xem được"</li>
                  <li>Chỉ hỗ trợ file âm thanh có định dạng MP3, WAV, M4A</li>
                  <li>Kích thước file tối đa 100MB</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 