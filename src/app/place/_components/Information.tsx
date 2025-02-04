import OptimizedImage from '@/components/common/OptimizedImage';

type InformationProps = {
  address: string;
  opening_hours: string;
  phone_number: string;
  isSelected: boolean;
};

const Information = ({
  address,
  opening_hours,
  phone_number,
  isSelected,
}: InformationProps) => {
  return (
    <div
      id="information"
      className={`w-full flex-col gap-6 ${isSelected ? 'flex' : 'hidden'} xl:flex xl:gap-5 xl:pb-[60px]`}
    >
      <p className="-mb-1 hidden text-title-lb text-grayscale-900 xl:inline">
        정보
      </p>
      <div className="flex flex-col gap-6 xl:gap-4">
        <div className="flex items-start gap-3">
          <OptimizedImage
            src="/assets/icons/place_address.svg"
            alt="place_address"
          />
          <p className="w-[86px] shrink-0 text-body-mm font-bold text-grayscale-900">
            업체 주소
          </p>
          <p className="text-body-mm text-grayscale-900">{address}</p>
        </div>
        <div className="flex gap-3">
          <OptimizedImage src="/assets/icons/place_time.svg" alt="place_time" />
          <p className="w-[86px] shrink-0 text-body-mm font-bold text-grayscale-900">
            영업 시간
          </p>
          <p className="text-body-mm text-grayscale-900">{opening_hours}</p>
        </div>
        <div className="flex gap-3">
          <OptimizedImage
            src="/assets/icons/place_phone.svg"
            alt="place_phone"
          />
          <p className="w-[86px] shrink-0 text-body-mm font-bold text-grayscale-900">
            업체 연락처
          </p>
          <p className="text-body-mm text-grayscale-900">{phone_number}</p>
        </div>
      </div>
    </div>
  );
};

export default Information;
