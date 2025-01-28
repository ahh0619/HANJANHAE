import OptimizedImage from '../common/OptimizedImage';

const Footer = () => {
  return (
    <footer className="z-50 hidden w-full bg-grayscale-100 p-10 text-grayscale-700 xl:block">
      <div className="mx-auto flex h-[142px] w-[1200px] flex-col justify-between">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-3 text-caption-mm leading-relaxed">
            <p>(주) 한잔해</p>
            <p>만든이 : 안현희 김현지 김호준 박가나 조혜빈 유지연</p>
            <p>주소 : 서울특별시 강남구 한잔로 21, 6층(약주동, 한잔타워)</p>
            <div className="flex gap-5">
              <p>Tel : 02-000-0000</p>
              <p>이메일 : hanjanhae@hanjanhae.com</p>
            </div>
          </div>

          <div className="flex items-center gap-11 text-caption-lm">
            <p>개인정보 처리방침</p>
            <p>이용약관</p>
            <p>about us</p>
            <p>전체서비스</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-[10px] text-caption-mm">
          <p>Copyright © Hanjanhae. All Rights Reserved.</p>
          <a
            href="https://github.com/ahh0619/HANJANHAE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <OptimizedImage src="/assets/icons/github.svg" alt="GitHub" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
