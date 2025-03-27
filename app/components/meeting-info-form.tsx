import { useState } from 'react';
import { Calendar } from 'lucide-react';

interface MeetingInfoFormProps {
  onSubmit: (data: MeetingInfo) => void;
}

export interface MeetingInfo {
  title: string;
  date: string;
  participants: string[];
  purpose: string;
  notes?: string;
}

export function MeetingInfoForm({ onSubmit }: MeetingInfoFormProps) {
  const [formData, setFormData] = useState<MeetingInfo>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    participants: [],
    purpose: '',
    notes: ''
  });
  
  const [participantInput, setParticipantInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddParticipant = () => {
    if (participantInput.trim()) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, participantInput.trim()]
      }));
      setParticipantInput('');
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.date && formData.purpose) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-paper border border-border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Thông tin cuộc họp</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Tiêu đề cuộc họp <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-border rounded bg-paper"
            placeholder="Nhập tiêu đề cuộc họp"
          />
        </div>
        
        <div>
          <label htmlFor="date" className="block mb-1 font-medium">
            Ngày tổ chức <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-border rounded bg-paper"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-content/60 w-5 h-5" />
          </div>
        </div>
        
        <div>
          <label htmlFor="participants" className="block mb-1 font-medium">
            Người tham gia
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="participants"
              value={participantInput}
              onChange={(e) => setParticipantInput(e.target.value)}
              className="flex-1 p-2 border border-border rounded bg-paper"
              placeholder="Thêm người tham gia"
            />
            <button
              type="button"
              onClick={handleAddParticipant}
              className="px-4 py-2 bg-content text-paper rounded hover:bg-content/90"
            >
              Thêm
            </button>
          </div>
          
          {formData.participants.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.participants.map((participant, index) => (
                <div key={index} className="flex items-center bg-content/10 rounded px-3 py-1">
                  <span>{participant}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveParticipant(index)}
                    className="ml-2 text-content/60 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="purpose" className="block mb-1 font-medium">
            Mục đích cuộc họp <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="w-full p-2 border border-border rounded bg-paper"
            placeholder="Nhập mục đích cuộc họp"
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block mb-1 font-medium">
            Ghi chú bổ sung
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-border rounded bg-paper resize-none"
            placeholder="Thông tin thêm về cuộc họp (không bắt buộc)"
          />
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2 bg-content text-paper rounded hover:bg-content/90 font-medium"
          >
            Tiếp tục
          </button>
        </div>
      </form>
    </div>
  );
} 