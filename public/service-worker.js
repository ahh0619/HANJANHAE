if (!self.define) {
    let e,
      s = {};
    const a = (a, c) => (
      (a = new URL(a + '.js', c).href),
      s[a] ||
        new Promise((s) => {
          if ('document' in self) {
            const e = document.createElement('script');
            (e.src = a), (e.onload = s), document.head.appendChild(e);
          } else (e = a), importScripts(a), s();
        }).then(() => {
          let e = s[a];
          if (!e) throw new Error(`Module ${a} didn’t register its module`);
          return e;
        })
    );
    self.define = (c, i) => {
      const n =
        e ||
        ('document' in self ? document.currentScript.src : '') ||
        location.href;
      if (s[n]) return;
      let r = {};
      const t = (e) => a(e, n),
        b = { module: { uri: n }, exports: r, require: t };
      s[n] = Promise.all(c.map((e) => b[e] || t(e))).then((e) => (i(...e), r));
    };
  }
  define(['./workbox-1bb06f5e'], function (e) {
    'use strict';
    importScripts(),
      self.skipWaiting(),
      e.clientsClaim(),
      e.precacheAndRoute(
        [
          { url: '/Character.svg', revision: 'bbd7fdc1f68d90e42a23ced7ba974310' },
          {
            url: '/_next/app-build-manifest.json',
            revision: 'aec5b602ea9b8a87c9eab1d877d3f536',
          },
          {
            url: '/_next/static/UMjHbBPmoU_xvxwJDKm7j/_buildManifest.js',
            revision: 'b7e952a6aba48c0d670ac94c53af85b0',
          },
          {
            url: '/_next/static/UMjHbBPmoU_xvxwJDKm7j/_ssgManifest.js',
            revision: 'b6652df95db52feb4daf4eca35380933',
          },
          {
            url: '/_next/static/chunks/191-e00972f966e2d64e.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/191-e00972f966e2d64e.js.map',
            revision: '481deb1a6228697f617701855df06b95',
          },
          {
            url: '/_next/static/chunks/2476-25c70f75af708568.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/2476-25c70f75af708568.js.map',
            revision: '5ba7fca4e95a63016ca1056f00cd3bcf',
          },
          {
            url: '/_next/static/chunks/2957-313dc0b4c615b684.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/2957-313dc0b4c615b684.js.map',
            revision: '37466fcf8fccdbb46ca7cbac5ef5e97a',
          },
          {
            url: '/_next/static/chunks/3670-8e4f3161f8550107.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/3670-8e4f3161f8550107.js.map',
            revision: '2011144dd493b8042fea402004b7f9bf',
          },
          {
            url: '/_next/static/chunks/3868-273b4325ad5b583b.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/3868-273b4325ad5b583b.js.map',
            revision: '10a38db8553f2cbc92ead00a997b7160',
          },
          {
            url: '/_next/static/chunks/4010-444483852332c367.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/4010-444483852332c367.js.map',
            revision: '725b54c288793277ef30015a8aaa11c2',
          },
          {
            url: '/_next/static/chunks/4194-74a51200424abc6e.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/4194-74a51200424abc6e.js.map',
            revision: '7cd559b3904be04de5b5579d9510e220',
          },
          {
            url: '/_next/static/chunks/5024-27bf0ded736c6d7c.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/5024-27bf0ded736c6d7c.js.map',
            revision: '7fb2dcd58b1c37bb9c61b9a9d7596c18',
          },
          {
            url: '/_next/static/chunks/5223.1b937055e6ae8468.js',
            revision: '1b937055e6ae8468',
          },
          {
            url: '/_next/static/chunks/5223.1b937055e6ae8468.js.map',
            revision: 'bf5ffc282400f8e5befd4770ec0f4414',
          },
          {
            url: '/_next/static/chunks/52774a7f-fd944d571ef2b1ea.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/52774a7f-fd944d571ef2b1ea.js.map',
            revision: 'fd423a9242961d2af68168aa0c12e20a',
          },
          {
            url: '/_next/static/chunks/5822-32b43e4d96ed422b.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/5822-32b43e4d96ed422b.js.map',
            revision: '4cc95260c026e819367999c86bcb3a44',
          },
          {
            url: '/_next/static/chunks/6536-79fcb5f48b2dcd43.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/6536-79fcb5f48b2dcd43.js.map',
            revision: '97e313730f81f0ac2c6bf32b3044d207',
          },
          {
            url: '/_next/static/chunks/6553-16c99a6327ebd5d2.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/6553-16c99a6327ebd5d2.js.map',
            revision: '3b72c30f91c4847c70568afd346430a2',
          },
          {
            url: '/_next/static/chunks/6663-a8e121f7ff0b27b7.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/6663-a8e121f7ff0b27b7.js.map',
            revision: '6d22789aa93e1869756deaeab1f86ebc',
          },
          {
            url: '/_next/static/chunks/7420-c207ccee18e631d3.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/7420-c207ccee18e631d3.js.map',
            revision: 'df108fbb298af295cae4eb0a73327bfd',
          },
          {
            url: '/_next/static/chunks/7501-d8c2d43203f37bb1.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/7501-d8c2d43203f37bb1.js.map',
            revision: '7cb21c4019cea35df6b6bd2e5e4d0fcb',
          },
          {
            url: '/_next/static/chunks/7714-fe12719bcd81fa46.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/7714-fe12719bcd81fa46.js.map',
            revision: '2902cd7bd634e6ba6fbda9df845243f6',
          },
          {
            url: '/_next/static/chunks/785-6e7236a687d3b96b.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/785-6e7236a687d3b96b.js.map',
            revision: '747f5c03d52a5044bdce9b3e67d0e616',
          },
          {
            url: '/_next/static/chunks/8536-07fba6c7a654ace9.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/8536-07fba6c7a654ace9.js.map',
            revision: 'a7e495505a11e168959f948f120df898',
          },
          {
            url: '/_next/static/chunks/9185-52ac4601bf8a14b1.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/9185-52ac4601bf8a14b1.js.map',
            revision: '3c435212f91ebee13e4db8ff1e651dbb',
          },
          {
            url: '/_next/static/chunks/9267-848d1b6a8592e81f.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/9267-848d1b6a8592e81f.js.map',
            revision: 'ae7bcb52ed159cee0bf391d50f5d3cdb',
          },
          {
            url: '/_next/static/chunks/937-1351e31b28ecfc92.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/937-1351e31b28ecfc92.js.map',
            revision: '88587ab8382a7b6487df4e66d637d230',
          },
          {
            url: '/_next/static/chunks/9967-fbdbe2ff7b237903.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/9967-fbdbe2ff7b237903.js.map',
            revision: 'c9e24d3e9acb787e5409118e284703ca',
          },
          {
            url: '/_next/static/chunks/app/_not-found/page-ff66aadc14283fae.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/drink/%5Bid%5D/error-7d40cbbbf0c21802.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/drink/%5Bid%5D/error-7d40cbbbf0c21802.js.map',
            revision: 'e3193fb2addfc533692f149df736c888',
          },
          {
            url: '/_next/static/chunks/app/drink/%5Bid%5D/page-efcbdcba054b0a90.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/drink/%5Bid%5D/page-efcbdcba054b0a90.js.map',
            revision: '0c4e1630ff5ee6868deb497290aaf30e',
          },
          {
            url: '/_next/static/chunks/app/global-error-7baf82e04acae13f.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/global-error-7baf82e04acae13f.js.map',
            revision: '4466571f8be8733196a0a297332a5af4',
          },
          {
            url: '/_next/static/chunks/app/layout-68e0f00cfcecca85.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/layout-68e0f00cfcecca85.js.map',
            revision: 'dbd3ece6cbf0330ca3a3cdb8e9c49e18',
          },
          {
            url: '/_next/static/chunks/app/like/page-d7df482b0ed948b1.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/like/page-d7df482b0ed948b1.js.map',
            revision: '83cf43c322fa701b09554725002215ff',
          },
          {
            url: '/_next/static/chunks/app/mypage/error-e14c5447f63d14ec.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/mypage/error-e14c5447f63d14ec.js.map',
            revision: '8a8231d9fcf6a65992bb5153c1c9a696',
          },
          {
            url: '/_next/static/chunks/app/mypage/page-afcf06081fc25b7a.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/mypage/page-afcf06081fc25b7a.js.map',
            revision: 'dda5bf6a18e7535fc2023301da711c57',
          },
          {
            url: '/_next/static/chunks/app/not-found-6922219b02c6dc9e.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/not-found-6922219b02c6dc9e.js.map',
            revision: 'e04c4f182e2bea859133af215e6a22b9',
          },
          {
            url: '/_next/static/chunks/app/page-43beccbb17b097de.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/page-43beccbb17b097de.js.map',
            revision: 'd1f049fcc10a83b15846cae1457cf7de',
          },
          {
            url: '/_next/static/chunks/app/password/check/page-cc0de437cd985c7c.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/password/check/page-cc0de437cd985c7c.js.map',
            revision: '87528bc98a4d036af5974bb7c6a3328b',
          },
          {
            url: '/_next/static/chunks/app/password/reset/page-de38c8ad65a239d2.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/password/reset/page-de38c8ad65a239d2.js.map',
            revision: 'e2ad1e38602e792b0604b262f577e74e',
          },
          {
            url: '/_next/static/chunks/app/place/%5Bid%5D/error-61eedda5d7271532.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/place/%5Bid%5D/error-61eedda5d7271532.js.map',
            revision: 'a9115b7c91676eeb3ef736cc778081ca',
          },
          {
            url: '/_next/static/chunks/app/place/%5Bid%5D/page-713230f33a9a36f5.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/place/%5Bid%5D/page-713230f33a9a36f5.js.map',
            revision: '12a1a3b5eb4c7633972d8d14f57dbc5d',
          },
          {
            url: '/_next/static/chunks/app/preferences/customization/error-2b0922fe22095ae7.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/preferences/customization/error-2b0922fe22095ae7.js.map',
            revision: 'a2bb8808f735f090963a69a2be9c44e4',
          },
          {
            url: '/_next/static/chunks/app/preferences/customization/page-346319055a480dcb.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/preferences/customization/page-346319055a480dcb.js.map',
            revision: '41a537fa522a4d95702f3c44febf6d60',
          },
          {
            url: '/_next/static/chunks/app/preferences/result/error-308ffcf4b847da6c.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/preferences/result/error-308ffcf4b847da6c.js.map',
            revision: 'cf54f51d64e3ff7b38f0ad01ba4b6f14',
          },
          {
            url: '/_next/static/chunks/app/preferences/result/page-b10ea07d63cada0e.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/preferences/result/page-b10ea07d63cada0e.js.map',
            revision: 'ebc1d731dba3c634156141d79b0609f3',
          },
          {
            url: '/_next/static/chunks/app/push/page-180d8990ba454cb9.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/push/page-180d8990ba454cb9.js.map',
            revision: 'cbbce9ec532c1ece569c84db8c84fb91',
          },
          {
            url: '/_next/static/chunks/app/search/error-dba4fd266de53b93.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/search/error-dba4fd266de53b93.js.map',
            revision: '85b87e5f604fe71cc76cfef0242bab5d',
          },
          {
            url: '/_next/static/chunks/app/search/page-22d80d265f20b2fa.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/search/page-22d80d265f20b2fa.js.map',
            revision: '209e3cbdbbbc92d9835bf1b2b38b0ca6',
          },
          {
            url: '/_next/static/chunks/app/sentry-example-page/page-6d710027fcb777da.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/sentry-example-page/page-6d710027fcb777da.js.map',
            revision: '6db744349de431b9c765b4c1a6056e45',
          },
          {
            url: '/_next/static/chunks/app/signin/page-e7b187ad4cbaef60.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/signin/page-e7b187ad4cbaef60.js.map',
            revision: '8a8d70d52170a6b98a1f0c6705072f66',
          },
          {
            url: '/_next/static/chunks/app/signup/page-f4e53e31bd1127e0.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/signup/page-f4e53e31bd1127e0.js.map',
            revision: '46a7003bc29181d49df403468207e123',
          },
          {
            url: '/_next/static/chunks/app/survey/error-efad9ec9b72d5605.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/survey/error-efad9ec9b72d5605.js.map',
            revision: 'a4ab3b6c0e75c4f4de1ff1e1d499c7b6',
          },
          {
            url: '/_next/static/chunks/app/survey/page-0c936adb02a317c5.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/app/survey/page-0c936adb02a317c5.js.map',
            revision: '96e46ff2f634cc3b6d1db1fc609827e1',
          },
          {
            url: '/_next/static/chunks/dc112a36-75d0d71acd6d3366.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/dc112a36-75d0d71acd6d3366.js.map',
            revision: '48f643c56a893dc4b5c562e3303e18d6',
          },
          {
            url: '/_next/static/chunks/fd9d1056-18dcc0447450cb83.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/fd9d1056-18dcc0447450cb83.js.map',
            revision: 'c9bb4225e52d1615321d1ddf31883fd1',
          },
          {
            url: '/_next/static/chunks/framework-1158e7decabd1757.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/framework-1158e7decabd1757.js.map',
            revision: '50207c24082c391c8975de3c7747d9cc',
          },
          {
            url: '/_next/static/chunks/main-326a10f6e88ea667.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/main-326a10f6e88ea667.js.map',
            revision: 'e63f5c5e827274e356ddaa006dcee7e1',
          },
          {
            url: '/_next/static/chunks/main-app-110c853c852313df.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/main-app-110c853c852313df.js.map',
            revision: '346ad07403eb8c2213600c858b9dde47',
          },
          {
            url: '/_next/static/chunks/pages/_app-36e9a17a16fd90a4.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/pages/_app-36e9a17a16fd90a4.js.map',
            revision: '2aea94a6c0da5b92b1a8be144fbd0a88',
          },
          {
            url: '/_next/static/chunks/pages/_error-daa80f5b4d0fe27d.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/pages/_error-daa80f5b4d0fe27d.js.map',
            revision: '88eeb0ddf011b30bb3659da9534196af',
          },
          {
            url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
            revision: '79330112775102f91e1010318bae2bd3',
          },
          {
            url: '/_next/static/chunks/webpack-81faffe56707896b.js',
            revision: 'UMjHbBPmoU_xvxwJDKm7j',
          },
          {
            url: '/_next/static/chunks/webpack-81faffe56707896b.js.map',
            revision: 'ee6b733af8640c09246f460ce25c4b36',
          },
          {
            url: '/_next/static/css/c0a66d975328abec.css',
            revision: 'c0a66d975328abec',
          },
          {
            url: '/_next/static/css/c0a66d975328abec.css.map',
            revision: '6ea6d82fd20d0a0a84a2b5fbcc170d1c',
          },
          {
            url: '/_next/static/css/c91c7aadea0f730c.css',
            revision: 'c91c7aadea0f730c',
          },
          {
            url: '/_next/static/css/c91c7aadea0f730c.css.map',
            revision: 'd6cf8c8a8f19700464602f78e5af41b4',
          },
          {
            url: '/_next/static/media/ff840cfebfb63b0c-s.p.woff2',
            revision: '302ec55f5b4320354ec6b35a53dead87',
          },
          {
            url: '/assets/Banner_after image.svg',
            revision: '07652b6270b1cbba3779275c9660e9c9',
          },
          {
            url: '/assets/Banner_before image.svg',
            revision: 'f4c69c340fdcdf519c2e15cce86acf18',
          },
          {
            url: '/assets/Desktop_banner_image_after.svg',
            revision: 'ec91c6ce7813f385477dfbc9d855d5e3',
          },
          {
            url: '/assets/Desktop_banner_image_before.svg',
            revision: '435585d4abd2c30e49867051be044ae5',
          },
          {
            url: '/assets/Error_Image.svg',
            revision: '7accc7c8b2f16e1a89daf986c161bd6d',
          },
          {
            url: '/assets/Subcharacter.svg',
            revision: '9155801396a267c4f35d9ad6a7e102ce',
          },
          {
            url: '/assets/icons/Character_search.svg',
            revision: '8ef922d21a2f571be9685e388c22e317',
          },
          {
            url: '/assets/icons/Radio-Button-clicked.svg',
            revision: 'a513c9aef97db72b554f26f6252946c5',
          },
          {
            url: '/assets/icons/Radio-Button.svg',
            revision: '52a4fcafb9d8df0ae4be3c143220d2d0',
          },
          {
            url: '/assets/icons/arrow-up.svg',
            revision: 'a16536ab147795a9f7d96cc8ab3527b5',
          },
          {
            url: '/assets/icons/auth_email.svg',
            revision: 'b9df5645201e9ee62d827385f5a1202f',
          },
          {
            url: '/assets/icons/auth_google.svg',
            revision: '12541449bd4935158d66d37c011c27ba',
          },
          {
            url: '/assets/icons/auth_kakao.svg',
            revision: '038340600651d543a9bcf79aeba2b745',
          },
          {
            url: '/assets/icons/back.svg',
            revision: '95397be569195b78b3c914993e027584',
          },
          {
            url: '/assets/icons/back_place.svg',
            revision: '8c0cab86b32d325f0dfb037ed0610eff',
          },
          {
            url: '/assets/icons/camera.svg',
            revision: '70c3f5cad5da868779fcb35c85878294',
          },
          {
            url: '/assets/icons/cancel-primary.svg',
            revision: '7c89db49e668a66c4e02a13cfb1611dc',
          },
          {
            url: '/assets/icons/cancel.svg',
            revision: '6db4baf0289254a9a8e974546fd0c5ec',
          },
          {
            url: '/assets/icons/cancelDark.svg',
            revision: '99c677cef49b22012beb2ae985756748',
          },
          {
            url: '/assets/icons/cancelGray.svg',
            revision: 'f19b392991d5df6e0d98de3f88855124',
          },
          {
            url: '/assets/icons/check.svg',
            revision: '6b4fa6acd6d2f71fd25adef77945c351',
          },
          {
            url: '/assets/icons/checkbox_checked.svg',
            revision: 'af78045a973651ddcd16c532f91a315d',
          },
          {
            url: '/assets/icons/checkbox_unchecked.svg',
            revision: 'd44fff8ab9533ccdd11654bf0b629156',
          },
          {
            url: '/assets/icons/chevron-left.svg',
            revision: 'f5673dd81403527b3a3450e36e11f343',
          },
          {
            url: '/assets/icons/chevron-right.svg',
            revision: '681d46e7454e03da20e9a6b3b28efd95',
          },
          {
            url: '/assets/icons/chevron_right.svg',
            revision: 'e7c18a46ed089cbf9f4529812769e69d',
          },
          {
            url: '/assets/icons/default_profile_image.svg',
            revision: 'b7f541c5011bee14b5d7a2d692ddbc01',
          },
          {
            url: '/assets/icons/desktop_chevron-right.svg',
            revision: 'b34408acb217a7167ed96c32eb906697',
          },
          {
            url: '/assets/icons/favicon.svg',
            revision: 'e4f4ec424112852e71aef2385d3decf0',
          },
          {
            url: '/assets/icons/github.svg',
            revision: '2ee90526ae86fd2c94db6ba699ea1b1e',
          },
          {
            url: '/assets/icons/header-heart.svg',
            revision: '0fa160c083daddc339dc5c81f4376144',
          },
          {
            url: '/assets/icons/header-login.svg',
            revision: '03d1a523426e47f6ff2cf2ae78a5c002',
          },
          {
            url: '/assets/icons/header-user.svg',
            revision: '721e4e67dd1a5d5e5c15bfabeb69f11b',
          },
          {
            url: '/assets/icons/heart.svg',
            revision: '43b53fc03488703a4748abef09bf3646',
          },
          {
            url: '/assets/icons/heart_filled.svg',
            revision: '1eb784c9451a8b75a545222e0b89c196',
          },
          {
            url: '/assets/icons/heart_pressed.svg',
            revision: '623dd57583d3e06465208d8f4b2a136b',
          },
          {
            url: '/assets/icons/home.svg',
            revision: 'ee2a525b06dd99f903ab2a5284ef7f81',
          },
          {
            url: '/assets/icons/home_pressed.svg',
            revision: '99554ef5dd24e79efe0ea270b7421b17',
          },
          {
            url: '/assets/icons/hotpinkHeart.svg',
            revision: 'f624f425985dbc382648fc519d37381f',
          },
          {
            url: '/assets/icons/key.svg',
            revision: 'd3be9436ac7a7770af2418891972d09a',
          },
          {
            url: '/assets/icons/login.svg',
            revision: '12faca64b62cb08f6c1b914b43d0c9f2',
          },
          {
            url: '/assets/icons/logo.svg',
            revision: '07cd16ca6378d506fa346476d8f247b4',
          },
          {
            url: '/assets/icons/logout.svg',
            revision: '83a422164eb291f8e82f617b74f9512a',
          },
          {
            url: '/assets/icons/my_preference_button.svg',
            revision: '0874c8ac847aa5cdb50e62b9fde1fadf',
          },
          {
            url: '/assets/icons/my_preference_button_image1.svg',
            revision: '320758cffa6c046ad657a4e8ed5235a0',
          },
          {
            url: '/assets/icons/my_preference_button_image2.svg',
            revision: 'c43c344ac2b78825550e002ec5ca857b',
          },
          {
            url: '/assets/icons/no-reviews.svg',
            revision: 'fb8b996b19279d1b8bcc3bc959dd3d1b',
          },
          {
            url: '/assets/icons/password_invisible.svg',
            revision: 'd2ee452d8d4ff9c4d4d2bb4c64debe12',
          },
          {
            url: '/assets/icons/password_visible.svg',
            revision: '1fdfca0250f6e41ee9546a60c268e137',
          },
          {
            url: '/assets/icons/pinkHeart.svg',
            revision: 'ee5b420568081fd5c6c91ed5bbb7f31d',
          },
          {
            url: '/assets/icons/place_address.svg',
            revision: '372ecc4fff76075b180e82ff74bb39bb',
          },
          {
            url: '/assets/icons/place_phone.svg',
            revision: '4b5b2bbe1552dd637fcca9c40d489976',
          },
          {
            url: '/assets/icons/place_time.svg',
            revision: '4db93659ff96d474ea16314947d2393d',
          },
          {
            url: '/assets/icons/search-gray.svg',
            revision: 'ab4a5aeb29b2c586a1e41d0dab197d4b',
          },
          {
            url: '/assets/icons/search.svg',
            revision: '46abbb304fbc4604a71da97a497e0974',
          },
          {
            url: '/assets/icons/search_pressed.svg',
            revision: '55bf15024e6a2a685480bdd656b06e27',
          },
          {
            url: '/assets/icons/share_button_Kakao.svg',
            revision: 'f297dde8f6f018c39c47d0444515811c',
          },
          {
            url: '/assets/icons/share_button_Link.svg',
            revision: '9cce20437f1011ebe24c12387c748761',
          },
          {
            url: '/assets/icons/share_button_X.svg',
            revision: '8a89be2b983cfd90eca7172ca5d4c7a1',
          },
          {
            url: '/assets/icons/sliders-v-alt-white.svg',
            revision: 'f94a257f539429a77281b62f2b4e85ca',
          },
          {
            url: '/assets/icons/sliders-v-alt.svg',
            revision: '9b4f0e26273a5f8431d1f8b8a5594e7d',
          },
          {
            url: '/assets/icons/star.svg',
            revision: 'd2777910b2fdd54deb78776747bed436',
          },
          {
            url: '/assets/icons/star_pressed.svg',
            revision: '6e5fae985095ba83deb9ac8799482da7',
          },
          {
            url: '/assets/icons/user.svg',
            revision: '2001ad8c5a96b529b78370ed282e3c94',
          },
          {
            url: '/assets/icons/user_pressed.svg',
            revision: '7e6d40a398a151bce0f0fef7abd7a5d1',
          },
          {
            url: '/assets/loading-animation.json',
            revision: '8ded1fab478dd39045a3f7c2c9aaea89',
          },
          {
            url: '/assets/thumbnail.png',
            revision: 'dd007c9ec5ea406795094526a25c8253',
          },
          {
            url: '/fi_alert-circle.svg',
            revision: '48cb5053de0ab8575ac05397de767a7c',
          },
          {
            url: '/firebase-messaging-sw.js',
            revision: 'a22d2db96be59100ecb8e888cb81713c',
          },
          {
            url: '/icons/icon-192.png',
            revision: '5949a64cc99453c07589c38c9278662a',
          },
          {
            url: '/icons/icon-512.png',
            revision: '0e0ffec71d4487dc20ff9197d6ed562f',
          },
        ],
        { ignoreURLParametersMatching: [] },
      ),
      e.cleanupOutdatedCaches(),
      e.registerRoute(
        '/',
        new e.NetworkFirst({
          cacheName: 'start-url',
          plugins: [
            {
              cacheWillUpdate: async ({
                request: e,
                response: s,
                event: a,
                state: c,
              }) =>
                s && 'opaqueredirect' === s.type
                  ? new Response(s.body, {
                      status: 200,
                      statusText: 'OK',
                      headers: s.headers,
                    })
                  : s,
            },
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
        new e.CacheFirst({
          cacheName: 'google-fonts-webfonts',
          plugins: [
            new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
        new e.StaleWhileRevalidate({
          cacheName: 'google-fonts-stylesheets',
          plugins: [
            new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
        new e.StaleWhileRevalidate({
          cacheName: 'static-font-assets',
          plugins: [
            new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        new e.StaleWhileRevalidate({
          cacheName: 'static-image-assets',
          plugins: [
            new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        /\/_next\/image\?url=.+$/i,
        new e.StaleWhileRevalidate({
          cacheName: 'next-image',
          plugins: [
            new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        /\.(?:mp3|wav|ogg)$/i,
        new e.CacheFirst({
          cacheName: 'static-audio-assets',
          plugins: [
            new e.RangeRequestsPlugin(),
            new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        /\.(?:mp4)$/i,
        new e.CacheFirst({
          cacheName: 'static-video-assets',
          plugins: [
            new e.RangeRequestsPlugin(),
            new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        /\.(?:js)$/i,
        new e.StaleWhileRevalidate({
          cacheName: 'static-js-assets',
          plugins: [
            new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        /\.(?:css|less)$/i,
        new e.StaleWhileRevalidate({
          cacheName: 'static-style-assets',
          plugins: [
            new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        /\/_next\/data\/.+\/.+\.json$/i,
        new e.StaleWhileRevalidate({
          cacheName: 'next-data',
          plugins: [
            new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        /\.(?:json|xml|csv)$/i,
        new e.NetworkFirst({
          cacheName: 'static-data-assets',
          plugins: [
            new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        ({ url: e }) => {
          if (!(self.origin === e.origin)) return !1;
          const s = e.pathname;
          return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
        },
        new e.NetworkFirst({
          cacheName: 'apis',
          networkTimeoutSeconds: 10,
          plugins: [
            new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        ({ url: e }) => {
          if (!(self.origin === e.origin)) return !1;
          return !e.pathname.startsWith('/api/');
        },
        new e.NetworkFirst({
          cacheName: 'others',
          networkTimeoutSeconds: 10,
          plugins: [
            new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          ],
        }),
        'GET',
      ),
      e.registerRoute(
        ({ url: e }) => !(self.origin === e.origin),
        new e.NetworkFirst({
          cacheName: 'cross-origin',
          networkTimeoutSeconds: 10,
          plugins: [
            new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          ],
        }),
        'GET',
      );
  });
  //# sourceMappingURL=service-worker.js.map