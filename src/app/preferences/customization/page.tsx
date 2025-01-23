import BackButton from '@/components/common/BackButton';

import PreferencesForm from './_components/PreferencesForm';

const Page = () => {
  return (
    <div className="mx-auto max-w-[600px]">
      <div className="relative mb-[32px] flex h-[44px] w-full items-center">
        <div className="absolute left-[4px]">
          <BackButton />
        </div>
        <h1 className="mx-auto text-title-xl text-grayscale-900">
          내 취향 조사
        </h1>
      </div>

      <PreferencesForm />
    </div>
  );
};

export default Page;
