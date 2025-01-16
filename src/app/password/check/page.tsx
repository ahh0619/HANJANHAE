import EmailForm from '../_components/EmailForm';

const CheckEmail = () => {
  return (
    <div className="mx-auto w-11/12 max-w-96 py-4">
      <h1 className="mb-8 text-center text-3xl font-bold">비밀번호 재설정</h1>
      <EmailForm />
    </div>
  );
};

export default CheckEmail;
