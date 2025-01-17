import { RefObject } from 'react';

export type ReviewContentProps = {
  editing: boolean;
  comment: string;
  editComment: string;
  errorMessage: string;
  textareaRef: React.MutableRefObject<HTMLTextAreaElement>;
  onEditCommentChange: (value: string) => void;
  updatedRating: number;
  onRatingChange: (newRating: number) => void;
  nickname: string;
  createdAt: string;
  profileImage: string;
  canEdit: boolean;
  updatedAt: string;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export type ReviewEditingContentProps = {
  editComment: string;
  errorMessage: string | null;
  textareaRef: RefObject<HTMLTextAreaElement>;
  onEditCommentChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export type ReviewReadOnlyContentProps = {
  comment: string;
  isEdited: boolean;
};

export type Review = {
  id: string;
  user_id: string | null;
  nickname: string | null;
  comment: string;
  rating: number;
  created_at: string | null;
  profile_image: string | null;
};

export type ReviewListProps = {
  reviews: Review[];
  user: { id?: string; nickname: string } | null;
  onUpdate: (id: string, updatedComment: string, updatedRating: number) => void;
  onDelete: (id: string) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isLoading: boolean;
};
