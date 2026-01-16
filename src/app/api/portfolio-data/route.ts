
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/lib/portfolio-data.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return new NextResponse('Error reading portfolio data', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newData = await req.json();
    await fs.writeFile(dataPath, JSON.stringify(newData, null, 2));
    return new NextResponse('Portfolio data updated successfully', { status: 200 });
  } catch (error) {
    return new NextResponse('Error writing portfolio data', { status: 500 });
  }
}
