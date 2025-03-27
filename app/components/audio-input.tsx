import { useState, useRef } from 'react';
import { Upload, Link } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface AudioInputProps {
  onFileSelect: (result: { type: 'local' | 'drive'; data: any }) => void;
}

export function AudioInput({ onFileSelect }: AudioInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [driveUrl, setDriveUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    
    // Validate file type
    if (!isAudioFile(file)) {
      toast.error('File không hợp lệ', {
        description: 'Chỉ chấp nhận file MP3, WAV hoặc M4A'
      });
      return;
    }
    
    // Validate file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      toast.error('File quá lớn', {
        description: 'Kích thước file tối đa là 100MB'
      });
      return;
    }
    
    // Trigger file select handler
    onFileSelect({ type: 'local', data: file });
  };

  const handleClickSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!driveUrl.trim()) {
      toast.error('Vui lòng nhập URL Google Drive', {
        description: 'Vui lòng nhập URL Google Drive hợp lệ'
      });
      return;
    }
    
    if (!isGoogleDriveUrl(driveUrl)) {
      toast.error('URL không hợp lệ', {
        description: 'Vui lòng nhập URL Google Drive hợp lệ'
      });
      return;
    }
    
    // Trigger file select handler with drive URL
    onFileSelect({ type: 'drive', data: driveUrl });
  };

  const isAudioFile = (file: File): boolean => {
    const validTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/m4a', 'audio/x-m4a'];
    return validTypes.includes(file.type);
  };

  const isGoogleDriveUrl = (url: string): boolean => {
    return url.includes('drive.google.com');
  };

  return (
    <div className="space-y-8">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickSelectFile}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
          ${isDragging ? 'border-content bg-content/5' : 'border-border hover:border-content/50 hover:bg-content/5'}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="audio/mp3,audio/mpeg,audio/wav,audio/x-wav,audio/m4a,audio/x-m4a"
          className="hidden"
        />
        
        <Upload className="w-12 h-12 mx-auto mb-4 text-content/60" />
        <h3 className="text-xl font-medium mb-2">Kéo thả file âm thanh vào đây</h3>
        <p className="text-content/70 mb-4">hoặc</p>
        <button
          type="button"
          className="px-4 py-2 bg-content text-paper rounded hover:bg-content/90"
          onClick={(e) => {
            e.stopPropagation();
            handleClickSelectFile();
          }}
        >
          Chọn file từ máy tính
        </button>
        
        <p className="mt-4 text-sm text-content/60">
          Hỗ trợ MP3, WAV, M4A (tối đa 100MB)
        </p>
      </div>
      
      <div className="border-t border-border pt-6">
        <h3 className="text-center text-lg font-medium mb-6">HOẶC</h3>
        
        <div className="bg-paper border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Link className="w-5 h-5 text-content/70" />
            <h4 className="font-medium">Google Drive URL</h4>
          </div>
          
          <form onSubmit={handleDriveSubmit} className="flex gap-2">
            <input
              type="url"
              value={driveUrl}
              onChange={(e) => setDriveUrl(e.target.value)}
              placeholder="https://drive.google.com/drive/u/0/folders/..."
              className="flex-1 p-2 border border-border rounded bg-paper"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-content text-paper rounded hover:bg-content/90 whitespace-nowrap"
            >
              Tải lên
            </button>
          </form>
          
          <p className="mt-2 text-sm text-content/60">
            Nhập URL của file âm thanh từ Google Drive
          </p>
        </div>
      </div>
    </div>
  );
} 