import React from 'react';

type ProfileActionButtonProps = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};

const ProfileActionButton: React.FC<ProfileActionButtonProps> = ({
  onClick,
  className,
  children,
}) => (
  <button
    onClick={onClick}
    className={`h-auto max-h-[46px] w-full rounded-lg px-10 py-3 text-title-mb ${className}`}
  >
    {children}
  </button>
);

export default ProfileActionButton;
