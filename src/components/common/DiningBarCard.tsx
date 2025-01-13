import React from 'react';

type DiningBarCardProps = {
  name: string;
  imageUrl: string;
};

const DiningBarCard: React.FC<DiningBarCardProps> = ({ name, imageUrl }) => {
  return (
    <div className="relative flex w-72 flex-col rounded-lg border p-2">
      {/* 이미지 */}
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      {/* 이름 */}
      <div className="mt-2 w-full text-left text-xs">{name}</div>
    </div>
  );
};

export default DiningBarCard;
