"use client";

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

// Định nghĩa interface cho thông tin cuộc họp
export interface MeetingInfo {
  title: string;
  date: string;
  participants: string[];
  purpose: string;
  additionalNotes?: string;
}

// Định nghĩa props cho component
interface MeetingInfoFormProps {
  onSubmit: (info: MeetingInfo) => void;
}

export function MeetingInfoForm({ onSubmit }: MeetingInfoFormProps) {
  // State cho thông tin cuộc họp
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo>({
    title: '',
    date: new Date().toISOString().split('T')[0], // Mặc định là ngày hôm nay
    participants: [],
    purpose: '',
    additionalNotes: '',
  });
  
  // State cho input người tham gia
  const [participantInput, setParticipantInput] = useState('');
  
  // Xử lý khi thông tin cuộc họp thay đổi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMeetingInfo({
      ...meetingInfo,
      [name]: value,
    });
  };
  
  // Xử lý khi người dùng thêm người tham gia
  const handleAddParticipant = () => {
    if (participantInput.trim() && !meetingInfo.participants.includes(participantInput.trim())) {
      setMeetingInfo({
        ...meetingInfo,
        participants: [...meetingInfo.participants, participantInput.trim()],
      });
      setParticipantInput('');
    }
  };
  
  // Xử lý khi người dùng xóa người tham gia
  const handleRemoveParticipant = (participant: string) => {
    setMeetingInfo({
      ...meetingInfo,
      participants: meetingInfo.participants.filter(p => p !== participant),
    });
  };
  
  // Xử lý khi người dùng nhấn phím Enter trong input người tham gia
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddParticipant();
    }
  };
  
  // Xử lý khi người dùng submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra các trường bắt buộc
    if (!meetingInfo.title || !meetingInfo.date || meetingInfo.participants.length === 0) {
      return;
    }
    
    onSubmit(meetingInfo);
  };
  
  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Thông tin cuộc họp</CardTitle>
          <CardDescription>
            Cung cấp thông tin về cuộc họp để giúp AI tạo tóm tắt chính xác hơn.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề cuộc họp <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              name="title"
              placeholder="Ví dụ: Cuộc họp nhóm dự án XYZ hàng tuần"
              value={meetingInfo.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Ngày họp <span className="text-red-500">*</span></Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={meetingInfo.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="participants">Người tham gia <span className="text-red-500">*</span></Label>
            <div className="flex gap-2">
              <Input
                id="participants"
                placeholder="Nhập tên và nhấn Enter hoặc nút Thêm"
                value={participantInput}
                onChange={(e) => setParticipantInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button type="button" onClick={handleAddParticipant} variant="secondary">
                Thêm
              </Button>
            </div>
            
            {meetingInfo.participants.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {meetingInfo.participants.map((participant, index) => (
                  <div
                    key={index}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <span>{participant}</span>
                    <button
                      type="button"
                      className="w-4 h-4 rounded-full bg-secondary-foreground/20 text-secondary-foreground flex items-center justify-center hover:bg-secondary-foreground/50 transition-colors"
                      onClick={() => handleRemoveParticipant(participant)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="purpose">Mục đích cuộc họp <span className="text-red-500">*</span></Label>
            <Textarea
              id="purpose"
              name="purpose"
              placeholder="Mô tả ngắn gọn mục đích của cuộc họp"
              value={meetingInfo.purpose}
              onChange={handleChange}
              required
              className="resize-none"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Ghi chú thêm</Label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              placeholder="Các thông tin bổ sung khác về cuộc họp (không bắt buộc)"
              value={meetingInfo.additionalNotes}
              onChange={handleChange}
              className="resize-none"
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Tiếp tục</Button>
        </CardFooter>
      </form>
    </Card>
  );
} 