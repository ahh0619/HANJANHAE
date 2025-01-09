import SignUpForm from './_components/SignUpForm';

const SignUp = () => {
  return (
    <div className="relative mx-auto w-11/12 max-w-96 py-4">
      <h1 className="mb-8 text-center text-3xl font-bold">회원가입</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
