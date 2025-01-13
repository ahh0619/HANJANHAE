import SignInForm from './_components/SignInForm';
import Social from './_components/Social';

const SignIn = () => {
  return (
    <div className="mx-auto w-11/12 max-w-96 py-4">
      <h1 className="mb-8 text-center text-3xl font-bold">로그인</h1>
      <SignInForm />
      <Social />
    </div>
  );
};

export default SignIn;
