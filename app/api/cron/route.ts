import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {

  fs.writeFileSync('cron.txt', 'cron job success to this day');
  
  console.log('cron job success to this day')
  return NextResponse.json({ ok: true });
}