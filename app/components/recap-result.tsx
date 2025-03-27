import { useState } from 'react';
import { Copy, Download, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface RecapResultProps {
  result: string;
  onReset: () => void;
}

export function RecapResult({ result, onReset }: RecapResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-recap-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-paper border border-border rounded-lg shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-border bg-content/5">
        <h2 className="text-xl font-bold">Tóm tắt cuộc họp</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center px-3 py-1.5 bg-content/10 hover:bg-content/20 rounded text-sm"
            title="Sao chép vào clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                Đã sao chép
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                Sao chép
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center px-3 py-1.5 bg-content/10 hover:bg-content/20 rounded text-sm"
            title="Tải xuống dạng Markdown"
          >
            <Download className="w-4 h-4 mr-1" />
            Tải xuống
          </button>
        </div>
      </div>
      
      <div className="p-6 overflow-auto max-h-[70vh] bg-white rounded-md m-4 shadow-sm">
        <div className="prose prose-stone max-w-none font-serif leading-relaxed">
          <style jsx global>{`
            .markdown-content h1 {
              font-size: 24px;
              margin-top: 24px;
              margin-bottom: 16px;
              font-weight: 600;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 8px;
            }
            .markdown-content h2 {
              font-size: 20px;
              margin-top: 20px;
              margin-bottom: 12px;
              font-weight: 600;
              color: #1a1a1a;
            }
            .markdown-content p {
              margin-bottom: 16px;
              line-height: 1.6;
            }
            .markdown-content ul {
              list-style-type: disc;
              margin-left: 16px;
              margin-bottom: 16px;
            }
            .markdown-content li {
              margin-bottom: 6px;
            }
            .markdown-content strong {
              font-weight: 600;
            }
            .markdown-content table {
              border-collapse: collapse;
              width: 100%;
              margin: 20px 0;
              font-size: 16px;
            }
            .markdown-content table th {
              background-color: #f8f5f0;
              border: 1px solid #e0dcd7;
              padding: 12px;
              text-align: left;
              font-weight: 600;
            }
            .markdown-content table td {
              border: 1px solid #e0dcd7;
              padding: 12px;
              text-align: left;
            }
            .markdown-content table tr:nth-child(even) {
              background-color: #fafaf8;
            }
            .markdown-content table tr:hover {
              background-color: #f5f2ed;
            }
            .markdown-content hr {
              margin: 24px 0;
              border: 0;
              border-top: 1px solid #e5e7eb;
            }
            .markdown-content em {
              font-style: italic;
              color: #555;
            }
          `}</style>
          <div className="markdown-content">
            <ReactMarkdown
              components={{
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto">
                    <table {...props} className="min-w-full" />
                  </div>
                ),
              }}
            >
              {result}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-border">
        <button
          onClick={onReset}
          className="w-full py-2 bg-content text-paper rounded hover:bg-content/90 font-medium"
        >
          Tạo tóm tắt mới
        </button>
      </div>
    </div>
  );
} 