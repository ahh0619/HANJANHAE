import { NextResponse } from 'next/server';

import { filterSortedDrinks } from '@/app/actions/filter'; // 서버 액션

export async function POST(req: Request) {
  try {
    // 1) 클라이언트에서 보낸 body 파싱
    const body = await req.json();

    // 2) 서버 액션을 이용해 필터링
    const data = await filterSortedDrinks({
      types: body.types || [],
      alcoholStrength: body.alcoholStrength || [0, 100],
      tastePreferences: body.tastePreferences || {},
      page: body.page || 1,
      pageSize: body.pageSize || 10,
      sortBy: body.sortBy || 'name',
      sortOrder: body.sortOrder || 'asc',
    });
    // 3) 결과를 JSON 형태로 응답
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
