import BackButton from '@/components/common/BackButton';

import PreferencesForm from './PreferencesForm';

type PreferencesSectionProps = {
  title: string;
  mode: 'edit' | 'create';
};

const PreferencesSection = ({ title, mode }: PreferencesSectionProps) => {
  return (
    <div className="mx-auto max-w-[387px] xl:mt-[18px] xl:max-w-[450px]">
      <div className="relative mb-[32px] flex h-[44px] w-full items-center xl:mb-[64px] xl:h-[32px]">
        <div className="absolute left-[4px] xl:hidden">
          <BackButton />
        </div>
        <h1 className="mx-auto w-full text-center text-title-xl text-grayscale-900">
          {title}
        </h1>
      </div>

      <PreferencesForm mode={mode} />
    </div>
  );
};

export default PreferencesSection;
