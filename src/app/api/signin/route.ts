import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();

  const { email, password } = await request.json();

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ errorMessage: error.message });
    }

    return NextResponse.json({ successMessage: '로그인 성공' });
  } catch (error: any) {
    return NextResponse.json({ errorMessage: 'server error' });
  }
}
