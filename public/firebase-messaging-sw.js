importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

const firebaseConfig = {
  apiKey: 'AIzaSyA0NXjBM4Xx8Kil7WLEmrIcidw7-LGbaDs',
  authDomain: 'hanjanhae-8eb99.firebaseapp.com',
  projectId: 'hanjanhae-8eb99',
  storageBucket: 'hanjanhae-8eb99.firebasestorage.app',
  messagingSenderId: '592077681910',
  appId: '1:592077681910:web:b062f6351fc5926a8028d7',
  measurementId: 'G-WB9DWKB5Z7',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.data?.title ?? '백그라운드 알림';
  const body = payload.data?.body ?? '';
  const icon = '/icons/icon-192.png';

  self.registration.showNotification(title, {
    body,
    icon,
  });
});
