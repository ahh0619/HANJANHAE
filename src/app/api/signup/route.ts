import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();

  const { email, password, nickname, birth } = await request.json();

  try {
    // auth user 데이터 생성
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname, birth },
      },
    });

    if (authError) {
      return NextResponse.json({ errorMessage: authError.message });
    }

    // user 데이터 생성
    const { error: userError } = await supabase.from('users').insert({
      id: authData.user?.id,
      nickname,
      birth,
    });

    if (userError) {
      return NextResponse.json({ errorMessage: userError.message });
    }

    // 자동 로그인 제거
    await supabase.auth.signOut();

    return NextResponse.json({ successMessage: '회원가입 성공' });
  } catch (error: any) {
    return NextResponse.json({ errorMessage: 'server error' });
  }
}
