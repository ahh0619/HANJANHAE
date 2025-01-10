import { NextResponse } from 'next/server';

import { toggleLike } from '@/utils/like/action';

export async function POST(request: Request) {
  try {
    const { drinkId, userId } = await request.json();

    if (!drinkId || !userId) {
      return NextResponse.json(
        { error: 'Missing parameters' },
        { status: 400 },
      );
    }

    const result = await toggleLike({ drinkId, userId });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('Error in /api/togglelike:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
