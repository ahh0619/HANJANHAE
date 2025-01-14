import BackButton from '@/components/common/BackButton';

import PreferencesForm from './_components/PreferencesForm';

const Page = () => {
  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="relative mb-5 flex w-full items-center">
        <div className="absolute left-0">
          <BackButton />
        </div>
        <h1 className="mx-auto text-xl font-bold">내 취향 조사</h1>
      </div>

      <PreferencesForm />
    </div>
  );
};

export default Page;
