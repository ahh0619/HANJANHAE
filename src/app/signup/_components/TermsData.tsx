const TermsData = () => {
  return (
    <>
      <p className="text-sm text-gray-500">
        마주하다를 이용하시려면 이용약관에 동의해주세요.
      </p>

      <p className="mt-8 text-xl font-bold">홈페이지 이용약관 (필수)</p>

      {/* 모두 동의 */}
      <div className="flex items-center gap-1">
        <input type="checkbox" id="all" />
        <label className="cursor-pointer" htmlFor="all">
          모두 동의하기
        </label>
      </div>

      <hr />

      {/* 만 19세 이상 성인 */}
      <div className="flex items-center gap-1">
        <input type="checkbox" id="adult" />
        <label className="cursor-pointer" htmlFor="adult">
          만 19세 이상 성인
        </label>
      </div>

      {/* 홈페이지 이용약관 */}
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <input type="checkbox" id="term" />
          <label className="cursor-pointer" htmlFor="term">
            홈페이지 이용약관
          </label>
        </div>
        <p className="cursor-pointer">자세히보기 &#62;</p>
      </div>

      {/* 개인정보 수집 및 이용 동의 */}
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <input type="checkbox" id="personal" />
          <label className="cursor-pointer" htmlFor="personal">
            개인정보수집 및 이용동의
          </label>
        </div>
        <p className="cursor-pointer">자세히보기 &#62;</p>
      </div>

      {/* 회원가입 방법 */}
      <p className="mt-10 text-center text-xl font-bold">회원가입 방법 선택</p>

      <div className="flex justify-center gap-4">
        <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-sm">
          구글
        </div>
        <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-sm">
          카카오
        </div>
        <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-sm">
          자사
        </div>
      </div>
    </>
  );
};

export default TermsData;
