import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const dynamic = 'force-dynamic';

// All known OpenClaw services
const ALL_SERVICES = ['openclaw-bernard', 'openclaw-moni', 'clawdbot-bogi'];

export async function POST(request: NextRequest) {
  const service = request.nextUrl.searchParams.get('service');
  const action = request.nextUrl.searchParams.get('action');
  
  if (!action) {
    return NextResponse.json({ error: 'Action required' }, { status: 400 });
  }

  // Handle special actions
  if (action === 'restart-all') {
    try {
      const results = [];
      for (const svc of ALL_SERVICES) {
        try {
          await execAsync(`sudo systemctl restart ${svc} 2>&1`);
          results.push({ service: svc, status: 'restarted' });
        } catch (e) {
          results.push({ service: svc, status: 'failed' });
        }
      }
      return NextResponse.json({ ok: true, action, results });
    } catch (error) {
      return NextResponse.json({ ok: false, error: 'Restart all failed' }, { status: 500 });
    }
  }

  if (action === 'update-openclaw') {
    try {
      // Run openclaw update
      const { stdout, stderr } = await execAsync('openclaw update 2>&1', { timeout: 120000 });
      return NextResponse.json({ 
        ok: true, 
        action, 
        output: stdout || stderr,
        message: 'OpenClaw update completed'
      });
    } catch (error: any) {
      return NextResponse.json({ 
        ok: false, 
        error: error.message || 'Update failed',
        output: error.stdout || error.stderr
      }, { status: 500 });
    }
  }

  // Regular service actions
  if (!service) {
    return NextResponse.json({ error: 'Service required for this action' }, { status: 400 });
  }

  if (!['start', 'stop', 'restart'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  // Only allow known services
  if (!ALL_SERVICES.includes(service)) {
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
