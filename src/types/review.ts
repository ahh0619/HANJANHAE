import { RefObject } from 'react';

import { Database } from './supabase';

export type Review = Database['public']['Tables']['comments']['Row'];

export type User = {
  id?: string;
  nickname: string;
  profileImage?: string;
};

export type EditableFieldProps = {
  textareaRef: RefObject<HTMLTextAreaElement>;
  onEditCommentChange: (value: string) => void;
};

export type ReviewReadOnlyProps = {
  comment: string;
  isEdited: boolean;
};

export type ReviewEditingProps = EditableFieldProps & {
  editComment: string;
  errorMessage: string | null;
  onSave: () => void;
  onCancel: () => void;
};

export type ReviewContentProps = {
  review: Review;
  nickname: string;
  profile_image: string;
  editing: boolean;
  editComment: string;
  errorMessage: string;
  textareaRef: RefObject<HTMLTextAreaElement>;
  onEditCommentChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  updatedRating: number;
  onRatingChange: (newRating: number) => void;
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export type ReviewListProps = {
  reviews: Review[];
  user: User | null;
  onUpdate: (id: string, updatedComment: string, updatedRating: number) => void;
  onDelete: (id: string) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isLoading: boolean;
};

export type ReviewInfoProps = {
  nickname: string | null;
  createdAt: string | null;
  rating: number;
  profile_image: string | null;
  editable?: boolean;
  onRatingChange?: (newRating: number) => void;
  canEdit?: boolean;
};

export type ReviewSubmitData = {
  rating: number;
  comment: string;
};

export type InfiniteQueryData<T> = {
  pages: T[];
  pageParams: unknown[];
};
