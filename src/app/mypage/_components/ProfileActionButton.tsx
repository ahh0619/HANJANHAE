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
    className={`rounded-lg py-2 text-sm font-medium ${className}`}
  >
    {children}
  </button>
);

export default ProfileActionButton;
