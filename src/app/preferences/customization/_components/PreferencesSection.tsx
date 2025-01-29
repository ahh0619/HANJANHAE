import BackButton from '@/components/common/BackButton';

import PreferencesForm from './PreferencesForm';

interface PreferencesSectionProps {
  title: string;
  mode: 'edit' | 'create';
}

const PreferencesSection: React.FC<PreferencesSectionProps> = ({
  title,
  mode,
}) => {
  return (
    <div className="mx-auto max-w-[400px]">
      <div className="relative mb-[32px] flex h-[44px] w-full items-center">
        <div className="absolute left-[4px] xl:hidden">
          <BackButton />
        </div>
        <h1 className="mx-auto text-title-xl text-grayscale-900">{title}</h1>
      </div>

      <PreferencesForm mode={mode} />
    </div>
  );
};

export default PreferencesSection;
