import { NextResponse } from 'next/server';

import { checkLikeStatus } from '@/utils/like/action';

export async function POST(request: Request) {
  try {
    const { drinkId, userId } = await request.json();

    if (!drinkId || !userId) {
      return NextResponse.json(
        { error: 'Missing parameters' },
        { status: 400 },
      );
    }

    const result = await checkLikeStatus({ drinkId, userId });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('Error in /api/likestatus:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
