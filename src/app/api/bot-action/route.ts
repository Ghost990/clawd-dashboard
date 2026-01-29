import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const service = request.nextUrl.searchParams.get('service');
  const action = request.nextUrl.searchParams.get('action');
  
  if (!service || !action) {
    return NextResponse.json({ error: 'Service and action required' }, { status: 400 });
  }

  if (!['start', 'stop', 'restart'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  // Only allow known services
  const allowedServices = ['clawdbot-bernard', 'clawdbot-moni'];
  if (!allowedServices.includes(service)) {
    return NextResponse.json({ error: 'Unknown service' }, { status: 400 });
  }

  try {
    const { stdout, stderr } = await execAsync(`sudo systemctl ${action} ${service} 2>&1`);
    
    return NextResponse.json({
      ok: true,
      action,
      service,
      output: stdout || stderr,
    });
  } catch (error) {
    console.error('Failed to execute action:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Action failed - may require sudo privileges',
    }, { status: 500 });
  }
}
