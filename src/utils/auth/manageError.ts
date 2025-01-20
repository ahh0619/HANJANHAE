/* 회원가입 오류 메시지 */
export const manageSignUpError = (message: string) => {
  switch (message) {
    case 'User already registered':
      return '이미 존재하는 아이디입니다.';
    default:
      return '회원가입에 실패했습니다.';
  }
};

/* 로그인 오류 메시지 */
export const manageSignInError = (message: string) => {
  switch (message) {
    case 'Invalid login credentials':
      return '일치하는 계정 정보가 없습니다.';
    default:
      return '로그인에 실패했습니다.';
  }
};
