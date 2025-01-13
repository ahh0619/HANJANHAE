import { RefObject } from 'react';

export type ReviewContentProps = {
  editing: boolean;
  comment: string;
  editComment: string;
  errorMessage: string | null;
  textareaRef: RefObject<HTMLTextAreaElement>;
  onEditCommentChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
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
  onUpdate: (id: string, updatedComment: string) => void;
  onDelete: (id: string) => void;
};
