import { createClient } from '@supabase/supabase-js';
import admin from 'firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(
        /\\n/g,
        '\n',
      ),
    }),
  });
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
  try {
    const newDrink = await request.json();

    const { data: tokens, error } = await supabase
      .from('user_fcm_tokens')
      .select('fcm_token');

    if (error || !tokens) {
      console.error('Error fetching tokens:', error);
      return NextResponse.json({ error: error?.message }, { status: 500 });
    }

    const registrationTokens = tokens.map((row) => row.fcm_token);

    const messaging = admin.messaging();
    const message = {
      data: {
        title: '새 전통주가 등록되었습니다!',
        body: newDrink.name
          ? `"${newDrink.name}" 가 새로 등록되었어요!`
          : '새 음료가 등록되었어요!',
        click_action: `https://hanjanhae.vercel.app/drink/${newDrink.id}`,
      },
    };

    const response = await messaging.sendEachForMulticast({
      tokens: registrationTokens,
      ...message,
    });

    const invalidTokens: string[] = [];
    response.responses.forEach((res, idx) => {
      if (!res.success) {
        const errorInfo = res.error;
        if (
          errorInfo?.code === 'messaging/invalid-registration-token' ||
          errorInfo?.code === 'messaging/registration-token-not-registered'
        ) {
          invalidTokens.push(registrationTokens[idx]);
        }
      }
    });

    if (invalidTokens.length > 0) {
      const { error: deleteError } = await supabase
        .from('user_fcm_tokens')
        .delete()
        .in('fcm_token', invalidTokens);

      if (deleteError) {
        console.error('Error deleting invalid tokens:', deleteError);
      }
    }

    return NextResponse.json({ success: true, response });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
