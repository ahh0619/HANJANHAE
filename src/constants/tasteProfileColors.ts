export const TASTE_PROFILE_COLORS = [
  'bg-secondary-200',
  'bg-secondary-300',
  'bg-primary-100',
  'bg-primary-200',
  'bg-primary-300',
] as const;

export type TASTE_PROFILE_COLOR = (typeof TASTE_PROFILE_COLORS)[number];
