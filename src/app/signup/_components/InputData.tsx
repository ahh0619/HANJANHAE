const InputData = () => {
  return (
    <>
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

      {/* 비밀번호 확인 */}
      <div className="flex flex-col gap-1">
        <label className="font-bold" htmlFor="passwordConfirm">
          비밀번호 확인
        </label>
        <input
          className="border border-black p-2"
          type="password"
          id="passwordConfirm"
          placeholder="비밀번호를 한 번 더 입력해 주세요."
        />
        {/* <p className="text-sm text-red-500">Error Message</p> */}
      </div>

      {/* 닉네임 */}
      <div className="flex flex-col gap-1">
        <label className="font-bold" htmlFor="nickname">
          닉네임
        </label>
        <input
          className="border border-black p-2"
          type="text"
          id="nickname"
          placeholder="닉네임을 입력해 주세요."
          autoComplete="off"
        />
        {/* <p className="text-sm text-red-500">Error Message</p> */}
      </div>

      {/* 생년월일 */}
      <div className="flex flex-col gap-1">
        <label className="font-bold" htmlFor="birth">
          생년월일
        </label>
        <input
          className="border border-black p-2"
          type="text"
          id="birth"
          placeholder="생년월일을 입력해 주세요."
          autoComplete="off"
        />
        {/* <p className="text-sm text-red-500">Error Message</p> */}
      </div>

      <button className="w-full bg-black p-2 font-bold text-white">
        회원가입
      </button>
    </>
  );
};

export default InputData;
