import { NextResponse } from 'next/server';
import { generateBirthChart } from '@/lib/astrology';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const dateStr = searchParams.get('date');
  const timeStr = searchParams.get('time');
  const latStr = searchParams.get('lat');
  const lngStr = searchParams.get('lng');

  if (!dateStr || !timeStr || !latStr || !lngStr) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 });
  }

  try {
    const chartData = generateBirthChart(dateStr, timeStr, lat, lng);
    return NextResponse.json(chartData);
  } catch (error) {
    console.error('Error generating chart:', error);
    return NextResponse.json({ error: 'Failed to generate birth chart' }, { status: 500 });
  }
}
