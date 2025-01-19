import Image from 'next/image';

type InformationProps = {
  address: string;
  opening_hours: string;
  phone_number: string;
};

const Information = ({
  address,
  opening_hours,
  phone_number,
}: InformationProps) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-start gap-3">
        <Image
          width={24}
          height={24}
          src="/assets/icons/place_address.svg"
          alt="place_address"
        />
        <p className="w-[86px] shrink-0 text-body-mm font-bold text-grayscale-900">
          업체 주소
        </p>
        <p className="text-body-mm text-grayscale-900">{address}</p>
      </div>
      <div className="flex gap-3">
        <Image
          width={24}
          height={24}
          src="/assets/icons/place_time.svg"
          alt="place_time"
        />
        <p className="w-[86px] shrink-0 text-body-mm font-bold text-grayscale-900">
          영업 시간
        </p>
        <p className="text-body-mm text-grayscale-900">{opening_hours}</p>
      </div>
      <div className="flex gap-3">
        <Image
          width={24}
          height={24}
          src="/assets/icons/place_phone.svg"
          alt="place_phone"
        />
        <p className="w-[86px] shrink-0 text-body-mm font-bold text-grayscale-900">
          업체 연락처
        </p>
        <p className="text-body-mm text-grayscale-900">{phone_number}</p>
      </div>
    </div>
  );
};

export default Information;
