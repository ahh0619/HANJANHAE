import { Clock4, MapPin, Phone } from 'lucide-react';

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
    <div className="flex flex-col gap-8 px-2">
      <div className="flex items-center gap-2">
        <MapPin />
        <p>{address}</p>
      </div>
      <div className="flex items-center gap-2">
        <Clock4 />
        <p>{opening_hours}</p>
      </div>
      <div className="flex items-center gap-2">
        <Phone />
        <p>{phone_number}</p>
      </div>
    </div>
  );
};

export default Information;
