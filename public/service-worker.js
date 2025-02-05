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
  self.define = (c, n) => {
    const i =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[i]) return;
    let r = {};
    const t = (e) => a(e, i),
      d = { module: { uri: i }, exports: r, require: t };
    s[i] = Promise.all(c.map((e) => d[e] || t(e))).then((e) => (n(...e), r));
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
          revision: '336da94779221e499fc63221695a7eac',
        },
        {
          url: '/_next/static/KJXaLPqxoU0X_YnTlAxdT/_buildManifest.js',
          revision: 'b7e952a6aba48c0d670ac94c53af85b0',
        },
        {
          url: '/_next/static/KJXaLPqxoU0X_YnTlAxdT/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/191-e00972f966e2d64e.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/191-e00972f966e2d64e.js.map',
          revision: 'afc1db4fd19a8890bb2cf1f984150005',
        },
        {
          url: '/_next/static/chunks/2156-44def099626d5712.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/2156-44def099626d5712.js.map',
          revision: '7ebb01e0f62c3544c0271b2150af73b6',
        },
        {
          url: '/_next/static/chunks/2957-313dc0b4c615b684.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/2957-313dc0b4c615b684.js.map',
          revision: '37466fcf8fccdbb46ca7cbac5ef5e97a',
        },
        {
          url: '/_next/static/chunks/3670-8e4f3161f8550107.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/3670-8e4f3161f8550107.js.map',
          revision: '2011144dd493b8042fea402004b7f9bf',
        },
        {
          url: '/_next/static/chunks/3868-273b4325ad5b583b.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/3868-273b4325ad5b583b.js.map',
          revision: 'f1a9829494f8e6d224a0e186a3a669a4',
        },
        {
          url: '/_next/static/chunks/4010-444483852332c367.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/4010-444483852332c367.js.map',
          revision: '4eda4811a4b1f2a35d29fa9fb20638d7',
        },
        {
          url: '/_next/static/chunks/4194-a14539e16a8bb665.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/4194-a14539e16a8bb665.js.map',
          revision: '6c236e8e407dcc64a7b7e482dd443162',
        },
        {
          url: '/_next/static/chunks/5024-7d5b3a30b864304b.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/5024-7d5b3a30b864304b.js.map',
          revision: '5004a7639ddea22c91a9bf20ffb893fd',
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
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/52774a7f-fd944d571ef2b1ea.js.map',
          revision: '2e886efcb3d452729741ddc5ca6a4ae2',
        },
        {
          url: '/_next/static/chunks/5450-7146f6ba0d9f4562.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/5450-7146f6ba0d9f4562.js.map',
          revision: '14e250d120fb6cb41de92f3fbb31ee02',
        },
        {
          url: '/_next/static/chunks/5822-11d6cf845ea3222c.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/5822-11d6cf845ea3222c.js.map',
          revision: 'c847a53fcbcc425335746f1a90b19152',
        },
        {
          url: '/_next/static/chunks/6536-a0f9d35b5b68480e.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/6536-a0f9d35b5b68480e.js.map',
          revision: '510e0beebe2f4a33eedd2781f01b9c22',
        },
        {
          url: '/_next/static/chunks/6553-3e9e23d7d952673b.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/6553-3e9e23d7d952673b.js.map',
          revision: '0bca8d07f7e4f06922241490fb16167a',
        },
        {
          url: '/_next/static/chunks/6663-a8e121f7ff0b27b7.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/6663-a8e121f7ff0b27b7.js.map',
          revision: '6d22789aa93e1869756deaeab1f86ebc',
        },
        {
          url: '/_next/static/chunks/7420-c207ccee18e631d3.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/7420-c207ccee18e631d3.js.map',
          revision: 'df108fbb298af295cae4eb0a73327bfd',
        },
        {
          url: '/_next/static/chunks/7714-fe12719bcd81fa46.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/7714-fe12719bcd81fa46.js.map',
          revision: '2902cd7bd634e6ba6fbda9df845243f6',
        },
        {
          url: '/_next/static/chunks/785-6e7236a687d3b96b.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/785-6e7236a687d3b96b.js.map',
          revision: '747f5c03d52a5044bdce9b3e67d0e616',
        },
        {
          url: '/_next/static/chunks/8536-07fba6c7a654ace9.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/8536-07fba6c7a654ace9.js.map',
          revision: 'b47f860d2d45b12e162246bc2d3d5c88',
        },
        {
          url: '/_next/static/chunks/9185-52ac4601bf8a14b1.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/9185-52ac4601bf8a14b1.js.map',
          revision: '3c435212f91ebee13e4db8ff1e651dbb',
        },
        {
          url: '/_next/static/chunks/9267-848d1b6a8592e81f.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/9267-848d1b6a8592e81f.js.map',
          revision: '56b5d1b2c15e195c2dc1da57f646f0f6',
        },
        {
          url: '/_next/static/chunks/937-1351e31b28ecfc92.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/937-1351e31b28ecfc92.js.map',
          revision: '88587ab8382a7b6487df4e66d637d230',
        },
        {
          url: '/_next/static/chunks/9967-fbdbe2ff7b237903.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/9967-fbdbe2ff7b237903.js.map',
          revision: 'c9e24d3e9acb787e5409118e284703ca',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-ff66aadc14283fae.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/drink/%5Bid%5D/error-d72df9ed77d63186.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/drink/%5Bid%5D/error-d72df9ed77d63186.js.map',
          revision: '80329cd3720d2ca5caa6c18de8bf173e',
        },
        {
          url: '/_next/static/chunks/app/drink/%5Bid%5D/page-c1e06d7161b0b881.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/drink/%5Bid%5D/page-c1e06d7161b0b881.js.map',
          revision: 'f93f26b6f1f62b9ccb249aba593cdfe4',
        },
        {
          url: '/_next/static/chunks/app/global-error-86809b37180c365e.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/global-error-86809b37180c365e.js.map',
          revision: 'fdeeb2b8179bdb7c0c1f07a4e8e762ce',
        },
        {
          url: '/_next/static/chunks/app/layout-382530dcb474c904.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/layout-382530dcb474c904.js.map',
          revision: '49d309a2be00dadd01ca847ee5e89997',
        },
        {
          url: '/_next/static/chunks/app/like/page-a181fed1975fb59d.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/like/page-a181fed1975fb59d.js.map',
          revision: '4cc168c98665f7918ed3d602aa02f749',
        },
        {
          url: '/_next/static/chunks/app/mypage/error-af94c2ab20a615d1.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/mypage/error-af94c2ab20a615d1.js.map',
          revision: 'a89415dba267f79bfb88f80a392ec321',
        },
        {
          url: '/_next/static/chunks/app/mypage/page-df2979be7c529b3b.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/mypage/page-df2979be7c529b3b.js.map',
          revision: '59f1c8b71700b72f02019af539b9dcab',
        },
        {
          url: '/_next/static/chunks/app/not-found-c57426cc788f46c2.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/not-found-c57426cc788f46c2.js.map',
          revision: 'bac57042b2972cb7c6052b5ae33809e3',
        },
        {
          url: '/_next/static/chunks/app/page-faad37d9fee557a0.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/page-faad37d9fee557a0.js.map',
          revision: 'fea1bda40141caf03cedf75e591360fe',
        },
        {
          url: '/_next/static/chunks/app/password/check/page-82386560ba8311a7.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/password/check/page-82386560ba8311a7.js.map',
          revision: '2d8e8914577fc00e5f6b2df39ba62e59',
        },
        {
          url: '/_next/static/chunks/app/password/reset/page-9bd6836c6a53a37f.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/password/reset/page-9bd6836c6a53a37f.js.map',
          revision: '284f7bfa14da3c6d5a45d650a19430d0',
        },
        {
          url: '/_next/static/chunks/app/place/%5Bid%5D/error-ce01540c8efffc26.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/place/%5Bid%5D/error-ce01540c8efffc26.js.map',
          revision: 'bc60fa62ff3b78568f316494ba46ec04',
        },
        {
          url: '/_next/static/chunks/app/place/%5Bid%5D/page-e8412ea780a985a4.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/place/%5Bid%5D/page-e8412ea780a985a4.js.map',
          revision: '20a87ca08f0378cba19a04ff0322db49',
        },
        {
          url: '/_next/static/chunks/app/preferences/customization/error-eea9eca358a9e128.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/preferences/customization/error-eea9eca358a9e128.js.map',
          revision: '36b82dfa180913be322bb3fd159dd328',
        },
        {
          url: '/_next/static/chunks/app/preferences/customization/page-5446dea1e3829f3d.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/preferences/customization/page-5446dea1e3829f3d.js.map',
          revision: '3e53d056533720b40c4c6776494bc465',
        },
        {
          url: '/_next/static/chunks/app/preferences/result/error-66f5f6705868e75e.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/preferences/result/error-66f5f6705868e75e.js.map',
          revision: '5152abfb6049a55e28010ee387b0e5ce',
        },
        {
          url: '/_next/static/chunks/app/preferences/result/page-3fff05b30079a652.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/preferences/result/page-3fff05b30079a652.js.map',
          revision: '4b79b5ad3539cd235e246af9cc64ed9c',
        },
        {
          url: '/_next/static/chunks/app/push/page-802f07a8dd61f966.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/push/page-802f07a8dd61f966.js.map',
          revision: 'd55b7e254c4923f0d3ab3e2b949c341c',
        },
        {
          url: '/_next/static/chunks/app/search/error-7a8a644bbe594faf.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/search/error-7a8a644bbe594faf.js.map',
          revision: '90aa1c218bc12e2279af9c33f18f564d',
        },
        {
          url: '/_next/static/chunks/app/search/page-c309718d97e64a0b.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/search/page-c309718d97e64a0b.js.map',
          revision: '7c19e12bf617443ace89364727a303de',
        },
        {
          url: '/_next/static/chunks/app/sentry-example-page/page-00cad2627193646d.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/sentry-example-page/page-00cad2627193646d.js.map',
          revision: 'c43658ce6db035993c9651eaefa6a4a2',
        },
        {
          url: '/_next/static/chunks/app/signin/page-7b24ada25d7dddaf.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/signin/page-7b24ada25d7dddaf.js.map',
          revision: '642edee1371ace9384502111a37f9395',
        },
        {
          url: '/_next/static/chunks/app/signup/page-dc07159ea057f3ff.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/signup/page-dc07159ea057f3ff.js.map',
          revision: '55e69140b2197d3a06c10c301846a054',
        },
        {
          url: '/_next/static/chunks/app/survey/error-32d5d5b17b3e66e6.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/survey/error-32d5d5b17b3e66e6.js.map',
          revision: '2cd19a74076686bd36e3009b659f6377',
        },
        {
          url: '/_next/static/chunks/app/survey/page-f43750381ec0982c.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/app/survey/page-f43750381ec0982c.js.map',
          revision: 'cfff2f68dc6dee90042e782c248feb14',
        },
        {
          url: '/_next/static/chunks/dc112a36-75d0d71acd6d3366.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/dc112a36-75d0d71acd6d3366.js.map',
          revision: '48f643c56a893dc4b5c562e3303e18d6',
        },
        {
          url: '/_next/static/chunks/fd9d1056-18dcc0447450cb83.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/fd9d1056-18dcc0447450cb83.js.map',
          revision: 'c9bb4225e52d1615321d1ddf31883fd1',
        },
        {
          url: '/_next/static/chunks/framework-1158e7decabd1757.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/framework-1158e7decabd1757.js.map',
          revision: '50207c24082c391c8975de3c7747d9cc',
        },
        {
          url: '/_next/static/chunks/main-326a10f6e88ea667.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/main-326a10f6e88ea667.js.map',
          revision: '20b16375ff7c3b86ea6cb8c2d0ab65ef',
        },
        {
          url: '/_next/static/chunks/main-app-ffcbc032dcc51455.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/main-app-ffcbc032dcc51455.js.map',
          revision: 'e61350ba29a54517cb7afd3115cd9d1a',
        },
        {
          url: '/_next/static/chunks/pages/_app-9d62b7e0923a21ea.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/pages/_app-9d62b7e0923a21ea.js.map',
          revision: '47323a7da5940f66eda403070a2b12e3',
        },
        {
          url: '/_next/static/chunks/pages/_error-daa80f5b4d0fe27d.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
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
          url: '/_next/static/chunks/webpack-0cf9712735786a8b.js',
          revision: 'KJXaLPqxoU0X_YnTlAxdT',
        },
        {
          url: '/_next/static/chunks/webpack-0cf9712735786a8b.js.map',
          revision: 'df41e68f8ecda4da4cd6ddec59655319',
        },
        {
          url: '/_next/static/css/3bd283fcddad227c.css',
          revision: '3bd283fcddad227c',
        },
        {
          url: '/_next/static/css/3bd283fcddad227c.css.map',
          revision: 'b33d00a96143bdb16381b72a7d3c865c',
        },
        {
          url: '/_next/static/css/a95d16b6083d8317.css',
          revision: 'a95d16b6083d8317',
        },
        {
          url: '/_next/static/css/a95d16b6083d8317.css.map',
          revision: '68d03e975e1afa92b72004e0fde3818f',
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
          revision: '29ab9fbc0926c38e51d55bc53f0e54e6',
        },
        {
          url: '/assets/icons/Character_search.svg',
          revision: '04ddce15538243b88aa37136c789ec7f',
        },
        {
          url: '/assets/icons/Radio-Button-clicked.svg',
          revision: '62503bc574e48f51bf44559a2aa88995',
        },
        {
          url: '/assets/icons/Radio-Button.svg',
          revision: '1de51c84d60857ee56957d6bc4c7646e',
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
          revision: '72f83282ba19a4aa336542d617566ab3',
        },
        {
          url: '/assets/icons/cancel.svg',
          revision: '6db4baf0289254a9a8e974546fd0c5ec',
        },
        {
          url: '/assets/icons/cancelDark.svg',
          revision: 'e7baedae1c870d40e8fd1e90a3199113',
        },
        {
          url: '/assets/icons/cancelGray.svg',
          revision: 'f608ecc05db0f6ccc76f64f011f1b1f5',
        },
        {
          url: '/assets/icons/check.svg',
          revision: '7d4d9399b87645e16a4c995dce2d6c68',
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
          revision: 'e9188fa293127f9c6db856e21ccf35f4',
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
          revision: '4ac9cb23e6779dd157d4adf47f47b3f5',
        },
        {
          url: '/assets/icons/sliders-v-alt.svg',
          revision: '6ebd168aad5a20c751303f1bbf205031',
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
