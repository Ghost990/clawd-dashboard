import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function POST() {
  return new Promise((resolve) => {
    // RustDesk needs DISPLAY for GUI
    const env = { ...process.env, DISPLAY: ':0' };
    
    exec('flatpak run com.rustdesk.RustDesk', { env }, (error) => {
      if (error) {
        console.error('RustDesk launch error:', error);
        resolve(NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        ));
        return;
      }
      
      resolve(NextResponse.json({ success: true, message: 'RustDesk started' }));
    });
  });
}

export async function GET() {
  return new Promise((resolve) => {
    exec('pgrep -f "rustdesk"', (error, stdout) => {
      const running = !error && stdout.trim().length > 0;
      resolve(NextResponse.json({ running }));
    });
  });
}
