'use client';

import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from 'firebase/messaging';
import { useEffect, useState } from 'react';

import { firebaseApp } from '@/firebase';
import { useAuthStore } from '@/store/authStore';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export default function PushTokenProvider() {
  const { user } = useAuthStore();
  const userId = user?.id || '';

  const [fcmToken, setFcmToken] = useState<string>('');

  // 1) DB에 토큰을 저장(upsert)하는 함수
  const handleTokenSave = async (token: string) => {
    if (!userId) {
      console.log('No user found; cannot save token.');
      return;
    }

    const { error } = await supabase
      .from('user_fcm_tokens')
      .upsert({ user_id: userId, fcm_token: token });

    if (error) {
      console.error('Failed to store token in DB:', error);
    } else {
      console.log('FCM token stored/updated in DB');
    }
  };

  // 2) 알림 권한 요청 & FCM 토큰 발급
  const requestPermissionAndGetToken = async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
      return;
    }

    // 알림 권한이 'default'인 상태면, 권한 요청
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    if (Notification.permission !== 'granted') {
      console.log('Notification permission not granted.');
      return;
    }

    // 브라우저 FCM 지원 여부 체크
    const canUseMessaging = await isSupported();
    if (!canUseMessaging) {
      console.log('FCM is not supported in this browser.');
      return;
    }

    try {
      const messaging = getMessaging(firebaseApp);
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      });
      if (currentToken) {
        setFcmToken(currentToken);
        await handleTokenSave(currentToken); // DB 저장
      } else {
        console.log('No registration token available.');
      }
    } catch (err) {
      console.error('Error retrieving token:', err);
    }
  };

  // 3) 포그라운드 메시지 수신
  const handleForegroundMessages = async () => {
    const canUseMessaging = await isSupported();
    if (!canUseMessaging) return;

    const messaging = getMessaging(firebaseApp);
    onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      if (!('Notification' in window)) return;

      if (Notification.permission === 'granted') {
        const title = payload.data?.title || '';
        const body = payload.data?.body || '';
        const icon = '/icons/icon-192.png';

        const notification = new Notification(title, {
          body,
          icon,
        });

        // 예: 알림 클릭 시 특정 URL로 이동
        notification.onclick = () => {
          window.open('/', '_blank')?.focus();
        };
      }
    });
  };

  useEffect(() => {
    // (A) 로그인했을 때만 권한/토큰 로직 실행
    if (userId) {
      requestPermissionAndGetToken();
      handleForegroundMessages();
    } else {
      console.log('No user logged in; skipping notification setup.');
    }
  }, [userId]);

  return (
    <div style={{ display: 'none' }}>
      {/* 실제 화면에 보이지 않아도 됨 */}
      {fcmToken && <p>FCM Token: {fcmToken}</p>}
    </div>
  );
}
