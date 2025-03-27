"use client";

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { FFMPEG_CORE_URL, FFMPEG_WASM_URL } from './ffmpeg-config';

// Khởi tạo đối tượng FFmpeg
const initFFmpeg = async (): Promise<FFmpeg> => {
  const ffmpeg = new FFmpeg();
  
  // Log tiến trình tải
  ffmpeg.on('log', ({ message }) => {
    console.log(`FFmpeg Log: ${message}`);
  });
  
  // Tải core và wasm từ CDN
  await ffmpeg.load({
    coreURL: await toBlobURL(FFMPEG_CORE_URL, 'text/javascript'),
    wasmURL: await toBlobURL(FFMPEG_WASM_URL, 'application/wasm'),
  });
  
  console.log('FFmpeg đã sẵn sàng!');
  return ffmpeg;
};

/**
 * Tối ưu hóa file âm thanh bằng cách loại bỏ khoảng lặng
 * @param audioFile - File âm thanh đầu vào
 * @returns Blob của file âm thanh đã được tối ưu
 */
export async function optimizeAudio(audioFile: File): Promise<Blob> {
  try {
    console.log('Bắt đầu xử lý âm thanh...');
    
    // Khởi tạo FFmpeg
    const ffmpeg = await initFFmpeg();
    
    // Tên file đầu vào và đầu ra
    const inputFileName = 'input' + audioFile.name.substring(audioFile.name.lastIndexOf('.'));
    const outputFileName = 'output.mp3';
    
    // Ghi file vào bộ nhớ của FFmpeg
    console.log('Đang tải file âm thanh...');
    ffmpeg.writeFile(inputFileName, await fetchFile(audioFile));
    
    // Chạy lệnh xử lý âm thanh để loại bỏ khoảng lặng
    // -af "silenceremove" loại bỏ khoảng lặng khi âm thanh dưới -30dB trong 0.5 giây
    console.log('Đang xử lý âm thanh...');
    await ffmpeg.exec([
      '-i', inputFileName,
      '-af', 'silenceremove=1:0:-30dB:1:0.5:-30dB',
      '-b:a', '128k',
      outputFileName
    ]);
    
    // Đọc file đã xử lý
    console.log('Đang đọc file đã xử lý...');
    const data = await ffmpeg.readFile(outputFileName);
    
    // Chuyển đổi dữ liệu sang dạng Blob
    const blob = new Blob([data], { type: 'audio/mpeg' });
    console.log('Xử lý âm thanh hoàn tất!');
    
    return blob;
  } catch (error) {
    console.error('Lỗi khi xử lý âm thanh:', error);
    throw new Error('Không thể xử lý file âm thanh');
  }
}

/**
 * Lấy thời lượng của file âm thanh
 * @param audioFile - File âm thanh
 * @returns Thời lượng tính bằng giây
 */
export function getAudioDuration(audioFile: File): Promise<number> {
  return new Promise((resolve, reject) => {
    // Tạo URL tạm thời cho file âm thanh
    const audioUrl = URL.createObjectURL(audioFile);
    const audio = new Audio(audioUrl);
    
    // Lắng nghe sự kiện metadata được tải
    audio.addEventListener('loadedmetadata', () => {
      // Giải phóng URL tạm thời
      URL.revokeObjectURL(audioUrl);
      resolve(audio.duration);
    });
    
    // Lắng nghe sự kiện lỗi
    audio.addEventListener('error', () => {
      URL.revokeObjectURL(audioUrl);
      reject(new Error('Không thể lấy thời lượng của file âm thanh'));
    });
  });
} 