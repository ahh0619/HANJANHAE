const SignInForm = () => {
  return (
    <form className="flex flex-col gap-4">
      {/* 아이디 */}
      <div className="flex flex-col gap-1">
        <label className="font-bold" htmlFor="email">
          아이디
        </label>
        <input
          className="border border-black p-2"
          type="text"
          id="email"
          placeholder="아이디를 입력해 주세요."
          autoComplete="off"
        />
        {/* <p className="text-sm text-red-500">Error Message</p> */}
      </div>

      {/* 비밀번호 */}
      <div className="flex flex-col gap-1">
        <label className="font-bold" htmlFor="password">
          비밀번호
        </label>
        <input
          className="border border-black p-2"
          type="password"
          id="password"
          placeholder="비밀번호를 입력해 주세요."
        />
        {/* <p className="text-sm text-red-500">Error Message</p> */}
      </div>

      {/* 아이디 저장 */}
      <div className="flex items-center justify-end gap-1">
        <input type="checkbox" id="save" />
        <label className="text-sm" htmlFor="password">
          아이디 저장
        </label>
      </div>

      <button className="w-full bg-black p-2 font-bold text-white">
        로그인
      </button>

      <div className="flex justify-center gap-2">
        <p className="cursor-pointer text-sm text-gray-500">비밀번호 찾기</p>
        <p className="cursor-pointer text-sm text-gray-500">|</p>
        <p className="cursor-pointer text-sm text-gray-500">회원가입</p>
      </div>
    </form>
  );
};

export default SignInForm;
