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
          revision: '64b93514afabdf2823c95439b7be53e1',
        },
        {
          url: '/_next/static/B3F_saODLI-G0nW57BFER/_buildManifest.js',
          revision: 'b7e952a6aba48c0d670ac94c53af85b0',
        },
        {
          url: '/_next/static/B3F_saODLI-G0nW57BFER/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/1472-a60a3a914eea43a6.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/1472-a60a3a914eea43a6.js.map',
          revision: '18a911c2ec0847af725136550e593e41',
        },
        {
          url: '/_next/static/chunks/191-69005ca22f96989c.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/191-69005ca22f96989c.js.map',
          revision: 'a5e4ac9716a9833b8ce745aa5bb2e4e7',
        },
        {
          url: '/_next/static/chunks/2476-25c70f75af708568.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/2476-25c70f75af708568.js.map',
          revision: '5ba7fca4e95a63016ca1056f00cd3bcf',
        },
        {
          url: '/_next/static/chunks/2957-313dc0b4c615b684.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/2957-313dc0b4c615b684.js.map',
          revision: '37466fcf8fccdbb46ca7cbac5ef5e97a',
        },
        {
          url: '/_next/static/chunks/3670-8e4f3161f8550107.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/3670-8e4f3161f8550107.js.map',
          revision: '2011144dd493b8042fea402004b7f9bf',
        },
        {
          url: '/_next/static/chunks/3868-273b4325ad5b583b.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/3868-273b4325ad5b583b.js.map',
          revision: '10a38db8553f2cbc92ead00a997b7160',
        },
        {
          url: '/_next/static/chunks/4194-74a51200424abc6e.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/4194-74a51200424abc6e.js.map',
          revision: '7cd559b3904be04de5b5579d9510e220',
        },
        {
          url: '/_next/static/chunks/5024-27bf0ded736c6d7c.js',
          revision: 'B3F_saODLI-G0nW57BFER',
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
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/52774a7f-fd944d571ef2b1ea.js.map',
          revision: 'fd423a9242961d2af68168aa0c12e20a',
        },
        {
          url: '/_next/static/chunks/5822-8cb595aff9573293.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/5822-8cb595aff9573293.js.map',
          revision: '09183a2aa2d7cd4c5272e2d50d235ee5',
        },
        {
          url: '/_next/static/chunks/6536-704affe6bbe9351e.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/6536-704affe6bbe9351e.js.map',
          revision: 'f8ea23031ee0e5bc2ab745c1febfad2b',
        },
        {
          url: '/_next/static/chunks/6553-16c99a6327ebd5d2.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/6553-16c99a6327ebd5d2.js.map',
          revision: '3b72c30f91c4847c70568afd346430a2',
        },
        {
          url: '/_next/static/chunks/6663-a8e121f7ff0b27b7.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/6663-a8e121f7ff0b27b7.js.map',
          revision: '6d22789aa93e1869756deaeab1f86ebc',
        },
        {
          url: '/_next/static/chunks/7501-99d0cfd9921808de.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/7501-99d0cfd9921808de.js.map',
          revision: '4f0e842703cd1cb0363040c3b7c4198f',
        },
        {
          url: '/_next/static/chunks/7714-fe12719bcd81fa46.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/7714-fe12719bcd81fa46.js.map',
          revision: '2902cd7bd634e6ba6fbda9df845243f6',
        },
        {
          url: '/_next/static/chunks/785-6e7236a687d3b96b.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/785-6e7236a687d3b96b.js.map',
          revision: '747f5c03d52a5044bdce9b3e67d0e616',
        },
        {
          url: '/_next/static/chunks/8536-07fba6c7a654ace9.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/8536-07fba6c7a654ace9.js.map',
          revision: 'a7e495505a11e168959f948f120df898',
        },
        {
          url: '/_next/static/chunks/9185-52ac4601bf8a14b1.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/9185-52ac4601bf8a14b1.js.map',
          revision: '3c435212f91ebee13e4db8ff1e651dbb',
        },
        {
          url: '/_next/static/chunks/9267-848d1b6a8592e81f.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/9267-848d1b6a8592e81f.js.map',
          revision: 'ae7bcb52ed159cee0bf391d50f5d3cdb',
        },
        {
          url: '/_next/static/chunks/937-1351e31b28ecfc92.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/937-1351e31b28ecfc92.js.map',
          revision: '88587ab8382a7b6487df4e66d637d230',
        },
        {
          url: '/_next/static/chunks/9967-fbdbe2ff7b237903.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/9967-fbdbe2ff7b237903.js.map',
          revision: 'c9e24d3e9acb787e5409118e284703ca',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-ff66aadc14283fae.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/drink/%5Bid%5D/error-878b585ace287556.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/drink/%5Bid%5D/error-878b585ace287556.js.map',
          revision: 'ec7bb6472007cf2f640af2077e3dcdab',
        },
        {
          url: '/_next/static/chunks/app/drink/%5Bid%5D/page-f18cf4f53f0bfd73.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/drink/%5Bid%5D/page-f18cf4f53f0bfd73.js.map',
          revision: '25dc03aa7302dcf40144474c3aa32e39',
        },
        {
          url: '/_next/static/chunks/app/global-error-33822dbcc9c83aa6.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/global-error-33822dbcc9c83aa6.js.map',
          revision: '9308995f7c07cb6368721ef2434bbe83',
        },
        {
          url: '/_next/static/chunks/app/layout-94156003f9dd11b4.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/layout-94156003f9dd11b4.js.map',
          revision: '508e1e23f053cc5adf1189005799877d',
        },
        {
          url: '/_next/static/chunks/app/like/page-8e929893b3dea348.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/like/page-8e929893b3dea348.js.map',
          revision: '85caec9dab2c97a5bda2b267a443fe0c',
        },
        {
          url: '/_next/static/chunks/app/mypage/error-6334c6aed2b63f91.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/mypage/error-6334c6aed2b63f91.js.map',
          revision: '45c6013d588b62b019a6aef7795da0ba',
        },
        {
          url: '/_next/static/chunks/app/mypage/page-afcf06081fc25b7a.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/mypage/page-afcf06081fc25b7a.js.map',
          revision: 'dda5bf6a18e7535fc2023301da711c57',
        },
        {
          url: '/_next/static/chunks/app/not-found-b0ca8aa221139122.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/not-found-b0ca8aa221139122.js.map',
          revision: '473921c4efb37f92911a0f3847714242',
        },
        {
          url: '/_next/static/chunks/app/page-bdea184f1e78eeab.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/page-bdea184f1e78eeab.js.map',
          revision: '3ffa612a540fcf2af2eb246b2e485229',
        },
        {
          url: '/_next/static/chunks/app/password/check/page-cc0de437cd985c7c.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/password/check/page-cc0de437cd985c7c.js.map',
          revision: '87528bc98a4d036af5974bb7c6a3328b',
        },
        {
          url: '/_next/static/chunks/app/password/reset/page-de38c8ad65a239d2.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/password/reset/page-de38c8ad65a239d2.js.map',
          revision: 'e2ad1e38602e792b0604b262f577e74e',
        },
        {
          url: '/_next/static/chunks/app/place/%5Bid%5D/error-ea5d51c9ae7725b3.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/place/%5Bid%5D/error-ea5d51c9ae7725b3.js.map',
          revision: 'f792ec89e0c757032c23b1ea1327ac46',
        },
        {
          url: '/_next/static/chunks/app/place/%5Bid%5D/page-713230f33a9a36f5.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/place/%5Bid%5D/page-713230f33a9a36f5.js.map',
          revision: '12a1a3b5eb4c7633972d8d14f57dbc5d',
        },
        {
          url: '/_next/static/chunks/app/preferences/customization/error-406a885e111d0f52.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/preferences/customization/error-406a885e111d0f52.js.map',
          revision: '5ac24e093f99ecef1c595903815f0b37',
        },
        {
          url: '/_next/static/chunks/app/preferences/customization/page-346319055a480dcb.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/preferences/customization/page-346319055a480dcb.js.map',
          revision: '41a537fa522a4d95702f3c44febf6d60',
        },
        {
          url: '/_next/static/chunks/app/preferences/result/error-2d95b7e2065ea306.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/preferences/result/error-2d95b7e2065ea306.js.map',
          revision: 'eb19b7d61d8282fe19400f05b1446e9b',
        },
        {
          url: '/_next/static/chunks/app/preferences/result/page-1c6222fdc0c15f98.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/preferences/result/page-1c6222fdc0c15f98.js.map',
          revision: '9633f23e19609747fa9f7d4ac2626fd5',
        },
        {
          url: '/_next/static/chunks/app/search/error-83ff21b07672c964.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/search/error-83ff21b07672c964.js.map',
          revision: '659af2f7d6cab15c7abd21191b330248',
        },
        {
          url: '/_next/static/chunks/app/search/page-53a89bacd12a2760.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/search/page-53a89bacd12a2760.js.map',
          revision: '7e6341e6b204b21dc4b370e1783a3385',
        },
        {
          url: '/_next/static/chunks/app/sentry-example-page/page-6d710027fcb777da.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/sentry-example-page/page-6d710027fcb777da.js.map',
          revision: '6db744349de431b9c765b4c1a6056e45',
        },
        {
          url: '/_next/static/chunks/app/signin/page-e7b187ad4cbaef60.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/signin/page-e7b187ad4cbaef60.js.map',
          revision: '8a8d70d52170a6b98a1f0c6705072f66',
        },
        {
          url: '/_next/static/chunks/app/signup/page-f4e53e31bd1127e0.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/signup/page-f4e53e31bd1127e0.js.map',
          revision: '46a7003bc29181d49df403468207e123',
        },
        {
          url: '/_next/static/chunks/app/survey/error-54b55f7af85849eb.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/survey/error-54b55f7af85849eb.js.map',
          revision: 'd5cd80570d13ea0f0a78b42fecda90d0',
        },
        {
          url: '/_next/static/chunks/app/survey/page-d0990310e31caa6a.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/app/survey/page-d0990310e31caa6a.js.map',
          revision: 'cdcd2d10d2172229431af6c77d51bfc1',
        },
        {
          url: '/_next/static/chunks/dc112a36-75d0d71acd6d3366.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/dc112a36-75d0d71acd6d3366.js.map',
          revision: '48f643c56a893dc4b5c562e3303e18d6',
        },
        {
          url: '/_next/static/chunks/fd9d1056-18dcc0447450cb83.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/fd9d1056-18dcc0447450cb83.js.map',
          revision: 'c9bb4225e52d1615321d1ddf31883fd1',
        },
        {
          url: '/_next/static/chunks/framework-1158e7decabd1757.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/framework-1158e7decabd1757.js.map',
          revision: '50207c24082c391c8975de3c7747d9cc',
        },
        {
          url: '/_next/static/chunks/main-39e0f77924f7496b.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/main-39e0f77924f7496b.js.map',
          revision: 'acc7a6bf1c71d5ca78cd81dd5141077e',
        },
        {
          url: '/_next/static/chunks/main-app-c51c092cb45cbd17.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/main-app-c51c092cb45cbd17.js.map',
          revision: '38f12cf2e56b131c9c8320d2cfd0a7a8',
        },
        {
          url: '/_next/static/chunks/pages/_app-d2e6096a26e1ad37.js',
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/pages/_app-d2e6096a26e1ad37.js.map',
          revision: '8578459e9d4db62caf5b601a4bc7d3df',
        },
        {
          url: '/_next/static/chunks/pages/_error-daa80f5b4d0fe27d.js',
          revision: 'B3F_saODLI-G0nW57BFER',
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
          revision: 'B3F_saODLI-G0nW57BFER',
        },
        {
          url: '/_next/static/chunks/webpack-81faffe56707896b.js.map',
          revision: 'ee6b733af8640c09246f460ce25c4b36',
        },
        {
          url: '/_next/static/css/242d6b5ab2ca06e0.css',
          revision: '242d6b5ab2ca06e0',
        },
        {
          url: '/_next/static/css/242d6b5ab2ca06e0.css.map',
          revision: 'dc0bfd4e5070466985bf3e0ada73b147',
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
          revision: 'a0082159db597c20005860b1de5bf322',
        },
        {
          url: '/fi_alert-circle.svg',
          revision: '48cb5053de0ab8575ac05397de767a7c',
        },
        {
          url: '/firebase-messaging-sw.js',
          revision: '1ee08f1956042626290d9ba664259f76',
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
          revision: '20287f9596b3b11593f6585167846246',
        },
        {
          url: '/_next/static/chunks/191-69005ca22f96989c.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/191-69005ca22f96989c.js.map',
          revision: 'a5e4ac9716a9833b8ce745aa5bb2e4e7',
        },
        {
          url: '/_next/static/chunks/2476-25c70f75af708568.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/2476-25c70f75af708568.js.map',
          revision: '5ba7fca4e95a63016ca1056f00cd3bcf',
        },
        {
          url: '/_next/static/chunks/2957-313dc0b4c615b684.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/2957-313dc0b4c615b684.js.map',
          revision: '37466fcf8fccdbb46ca7cbac5ef5e97a',
        },
        {
          url: '/_next/static/chunks/3670-8e4f3161f8550107.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/3670-8e4f3161f8550107.js.map',
          revision: '2011144dd493b8042fea402004b7f9bf',
        },
        {
          url: '/_next/static/chunks/3868-273b4325ad5b583b.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/3868-273b4325ad5b583b.js.map',
          revision: '10a38db8553f2cbc92ead00a997b7160',
        },
        {
          url: '/_next/static/chunks/4194-74a51200424abc6e.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/4194-74a51200424abc6e.js.map',
          revision: '7cd559b3904be04de5b5579d9510e220',
        },
        {
          url: '/_next/static/chunks/4606-e85b535feda83044.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/4606-e85b535feda83044.js.map',
          revision: '7705d5d639ab588c53fe9cec2410224e',
        },
        {
          url: '/_next/static/chunks/5024-27bf0ded736c6d7c.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
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
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/52774a7f-fd944d571ef2b1ea.js.map',
          revision: 'fd423a9242961d2af68168aa0c12e20a',
        },
        {
          url: '/_next/static/chunks/5822-8cb595aff9573293.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/5822-8cb595aff9573293.js.map',
          revision: '09183a2aa2d7cd4c5272e2d50d235ee5',
        },
        {
          url: '/_next/static/chunks/6536-704affe6bbe9351e.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/6536-704affe6bbe9351e.js.map',
          revision: 'f8ea23031ee0e5bc2ab745c1febfad2b',
        },
        {
          url: '/_next/static/chunks/6553-16c99a6327ebd5d2.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/6553-16c99a6327ebd5d2.js.map',
          revision: '3b72c30f91c4847c70568afd346430a2',
        },
        {
          url: '/_next/static/chunks/6663-a8e121f7ff0b27b7.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/6663-a8e121f7ff0b27b7.js.map',
          revision: '6d22789aa93e1869756deaeab1f86ebc',
        },
        {
          url: '/_next/static/chunks/7501-99d0cfd9921808de.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/7501-99d0cfd9921808de.js.map',
          revision: '4f0e842703cd1cb0363040c3b7c4198f',
        },
        {
          url: '/_next/static/chunks/7714-fe12719bcd81fa46.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/7714-fe12719bcd81fa46.js.map',
          revision: '2902cd7bd634e6ba6fbda9df845243f6',
        },
        {
          url: '/_next/static/chunks/785-6e7236a687d3b96b.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/785-6e7236a687d3b96b.js.map',
          revision: '747f5c03d52a5044bdce9b3e67d0e616',
        },
        {
          url: '/_next/static/chunks/8536-07fba6c7a654ace9.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/8536-07fba6c7a654ace9.js.map',
          revision: 'a7e495505a11e168959f948f120df898',
        },
        {
          url: '/_next/static/chunks/9185-52ac4601bf8a14b1.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/9185-52ac4601bf8a14b1.js.map',
          revision: '3c435212f91ebee13e4db8ff1e651dbb',
        },
        {
          url: '/_next/static/chunks/9267-848d1b6a8592e81f.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/9267-848d1b6a8592e81f.js.map',
          revision: 'ae7bcb52ed159cee0bf391d50f5d3cdb',
        },
        {
          url: '/_next/static/chunks/937-1351e31b28ecfc92.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/937-1351e31b28ecfc92.js.map',
          revision: '88587ab8382a7b6487df4e66d637d230',
        },
        {
          url: '/_next/static/chunks/9967-fbdbe2ff7b237903.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/9967-fbdbe2ff7b237903.js.map',
          revision: 'c9e24d3e9acb787e5409118e284703ca',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-ff66aadc14283fae.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/drink/%5Bid%5D/error-878b585ace287556.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/drink/%5Bid%5D/error-878b585ace287556.js.map',
          revision: 'ec7bb6472007cf2f640af2077e3dcdab',
        },
        {
          url: '/_next/static/chunks/app/drink/%5Bid%5D/page-f18cf4f53f0bfd73.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/drink/%5Bid%5D/page-f18cf4f53f0bfd73.js.map',
          revision: '25dc03aa7302dcf40144474c3aa32e39',
        },
        {
          url: '/_next/static/chunks/app/global-error-33822dbcc9c83aa6.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/global-error-33822dbcc9c83aa6.js.map',
          revision: '9308995f7c07cb6368721ef2434bbe83',
        },
        {
          url: '/_next/static/chunks/app/layout-ea2f6c6c810de23a.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/layout-ea2f6c6c810de23a.js.map',
          revision: '761fea2d2e0f127b6343db77f2685dd2',
        },
        {
          url: '/_next/static/chunks/app/like/page-8e929893b3dea348.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/like/page-8e929893b3dea348.js.map',
          revision: '85caec9dab2c97a5bda2b267a443fe0c',
        },
        {
          url: '/_next/static/chunks/app/mypage/error-6334c6aed2b63f91.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/mypage/error-6334c6aed2b63f91.js.map',
          revision: '45c6013d588b62b019a6aef7795da0ba',
        },
        {
          url: '/_next/static/chunks/app/mypage/page-afcf06081fc25b7a.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/mypage/page-afcf06081fc25b7a.js.map',
          revision: 'dda5bf6a18e7535fc2023301da711c57',
        },
        {
          url: '/_next/static/chunks/app/not-found-b0ca8aa221139122.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/not-found-b0ca8aa221139122.js.map',
          revision: '473921c4efb37f92911a0f3847714242',
        },
        {
          url: '/_next/static/chunks/app/page-bdea184f1e78eeab.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/page-bdea184f1e78eeab.js.map',
          revision: '3ffa612a540fcf2af2eb246b2e485229',
        },
        {
          url: '/_next/static/chunks/app/password/check/page-cc0de437cd985c7c.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/password/check/page-cc0de437cd985c7c.js.map',
          revision: '87528bc98a4d036af5974bb7c6a3328b',
        },
        {
          url: '/_next/static/chunks/app/password/reset/page-de38c8ad65a239d2.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/password/reset/page-de38c8ad65a239d2.js.map',
          revision: 'e2ad1e38602e792b0604b262f577e74e',
        },
        {
          url: '/_next/static/chunks/app/place/%5Bid%5D/error-ea5d51c9ae7725b3.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/place/%5Bid%5D/error-ea5d51c9ae7725b3.js.map',
          revision: 'f792ec89e0c757032c23b1ea1327ac46',
        },
        {
          url: '/_next/static/chunks/app/place/%5Bid%5D/page-713230f33a9a36f5.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/place/%5Bid%5D/page-713230f33a9a36f5.js.map',
          revision: '12a1a3b5eb4c7633972d8d14f57dbc5d',
        },
        {
          url: '/_next/static/chunks/app/preferences/customization/error-406a885e111d0f52.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/preferences/customization/error-406a885e111d0f52.js.map',
          revision: '5ac24e093f99ecef1c595903815f0b37',
        },
        {
          url: '/_next/static/chunks/app/preferences/customization/page-346319055a480dcb.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/preferences/customization/page-346319055a480dcb.js.map',
          revision: '41a537fa522a4d95702f3c44febf6d60',
        },
        {
          url: '/_next/static/chunks/app/preferences/result/error-2d95b7e2065ea306.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/preferences/result/error-2d95b7e2065ea306.js.map',
          revision: 'eb19b7d61d8282fe19400f05b1446e9b',
        },
        {
          url: '/_next/static/chunks/app/preferences/result/page-1c6222fdc0c15f98.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/preferences/result/page-1c6222fdc0c15f98.js.map',
          revision: '9633f23e19609747fa9f7d4ac2626fd5',
        },
        {
          url: '/_next/static/chunks/app/search/error-83ff21b07672c964.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/search/error-83ff21b07672c964.js.map',
          revision: '659af2f7d6cab15c7abd21191b330248',
        },
        {
          url: '/_next/static/chunks/app/search/page-53a89bacd12a2760.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/search/page-53a89bacd12a2760.js.map',
          revision: '7e6341e6b204b21dc4b370e1783a3385',
        },
        {
          url: '/_next/static/chunks/app/sentry-example-page/page-6d710027fcb777da.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/sentry-example-page/page-6d710027fcb777da.js.map',
          revision: '6db744349de431b9c765b4c1a6056e45',
        },
        {
          url: '/_next/static/chunks/app/signin/page-e7b187ad4cbaef60.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/signin/page-e7b187ad4cbaef60.js.map',
          revision: '8a8d70d52170a6b98a1f0c6705072f66',
        },
        {
          url: '/_next/static/chunks/app/signup/page-f4e53e31bd1127e0.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/signup/page-f4e53e31bd1127e0.js.map',
          revision: '46a7003bc29181d49df403468207e123',
        },
        {
          url: '/_next/static/chunks/app/survey/error-54b55f7af85849eb.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/survey/error-54b55f7af85849eb.js.map',
          revision: 'd5cd80570d13ea0f0a78b42fecda90d0',
        },
        {
          url: '/_next/static/chunks/app/survey/page-d0990310e31caa6a.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/app/survey/page-d0990310e31caa6a.js.map',
          revision: 'cdcd2d10d2172229431af6c77d51bfc1',
        },
        {
          url: '/_next/static/chunks/dc112a36-75d0d71acd6d3366.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/dc112a36-75d0d71acd6d3366.js.map',
          revision: '48f643c56a893dc4b5c562e3303e18d6',
        },
        {
          url: '/_next/static/chunks/fd9d1056-18dcc0447450cb83.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/fd9d1056-18dcc0447450cb83.js.map',
          revision: 'c9bb4225e52d1615321d1ddf31883fd1',
        },
        {
          url: '/_next/static/chunks/framework-1158e7decabd1757.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/framework-1158e7decabd1757.js.map',
          revision: '50207c24082c391c8975de3c7747d9cc',
        },
        {
          url: '/_next/static/chunks/main-39e0f77924f7496b.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/main-39e0f77924f7496b.js.map',
          revision: 'acc7a6bf1c71d5ca78cd81dd5141077e',
        },
        {
          url: '/_next/static/chunks/main-app-7b46522f3d03b96a.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/main-app-7b46522f3d03b96a.js.map',
          revision: '886f4423098f99d1e6eaff42113e433c',
        },
        {
          url: '/_next/static/chunks/pages/_app-bdece957f14fef07.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/pages/_app-bdece957f14fef07.js.map',
          revision: 'a8cd0923569d75283c552910b5a60a11',
        },
        {
          url: '/_next/static/chunks/pages/_error-daa80f5b4d0fe27d.js',
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
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
          revision: 'xbu4_jOJr-DX9XVvkNyjO',
        },
        {
          url: '/_next/static/chunks/webpack-81faffe56707896b.js.map',
          revision: 'ee6b733af8640c09246f460ce25c4b36',
        },
        {
          url: '/_next/static/css/242d6b5ab2ca06e0.css',
          revision: '242d6b5ab2ca06e0',
        },
        {
          url: '/_next/static/css/242d6b5ab2ca06e0.css.map',
          revision: 'd3bfaa8c4bca81152a795aac40729112',
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
          url: '/_next/static/media/ff840cfebfb63b0c-s.p.woff2',
          revision: '302ec55f5b4320354ec6b35a53dead87',
        },
        {
          url: '/_next/static/xbu4_jOJr-DX9XVvkNyjO/_buildManifest.js',
          revision: 'b7e952a6aba48c0d670ac94c53af85b0',
        },
        {
          url: '/_next/static/xbu4_jOJr-DX9XVvkNyjO/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
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
          revision: 'a0082159db597c20005860b1de5bf322',
        },
        {
          url: '/fi_alert-circle.svg',
          revision: '48cb5053de0ab8575ac05397de767a7c',
        },
        {
          url: '/firebase-messaging-sw.js',
          revision: 'd4ecf0778b070bdc5e35138fd92888e0',
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
