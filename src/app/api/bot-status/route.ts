import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { readFile } from 'fs/promises';

const execAsync = promisify(exec);

export const dynamic = 'force-dynamic';

async function getSkills(configPath: string): Promise<string[]> {
  try {
    const skillsDir = configPath.replace('clawdbot.json', '') + '../clawd/skills';
    const { stdout } = await execAsync(`ls ${skillsDir} 2>/dev/null || echo ""`);
    return stdout.trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const service = request.nextUrl.searchParams.get('service');
  
  if (!service) {
    return NextResponse.json({ error: 'Service name required' }, { status: 400 });
  }

  try {
    const { stdout } = await execAsync(`systemctl status ${service} --no-pager 2>&1 || true`);
    
    const isActive = stdout.includes('Active: active (running)');
    
    let memory = '-';
    let cpu = '-';
    let uptime = '-';
    
    if (isActive) {
      // Parse memory
      const memMatch = stdout.match(/Memory:\s+([\d.]+[KMGTP]?)/i);
      if (memMatch) {
        memory = memMatch[1];
      }
      
      // Parse CPU
      const cpuMatch = stdout.match(/CPU:\s+([\d.]+[ms]+)/i);
      if (cpuMatch) {
        cpu = cpuMatch[1];
      }
      
      // Parse uptime
      const uptimeMatch = stdout.match(/Active:.*;\s+(.+)\s+ago/);
      if (uptimeMatch) {
        uptime = uptimeMatch[1].replace(/\s+/g, ' ').trim();
      }
    }

    // Get skills based on service
    let skills: string[] = [];
    if (service === 'clawdbot-bernard') {
      const { stdout: skillsOut } = await execAsync(`ls /home/ankyr/clawd/skills 2>/dev/null || echo ""`);
      skills = skillsOut.trim().split('\n').filter(Boolean);
    }

    return NextResponse.json({
      active: isActive,
      memory,
      cpu,
      uptime,
      skills,
    });
  } catch (error) {
    console.error('Failed to get bot status:', error);
    return NextResponse.json({ active: false, error: 'Failed to get status' });
  }
}
