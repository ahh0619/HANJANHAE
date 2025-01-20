import { useEffect, useRef, useState } from 'react';

import { adjustTextarea, setCursorAndScrollToEnd } from '@/utils/review/textarea';

export const useReviewEditing = (
  onUpdate: (id: string, comment: string, rating: number) => void,
) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState<string>('');
  const [editRating, setEditRating] = useState<number>(0);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleReviewEditClick = (
    id: string,
    currentComment: string,
    currentRating: number,
  ) => {
    setEditingId(id);
    setEditComment(currentComment);
    setEditRating(currentRating);
  };

  const isEditValid = editComment.trim().length >= 2;

  // 수정 완료 클릭 시
  const handleReviewSaveClick = (id: string) => {
    if (!isEditValid) return;

    onUpdate(id, editComment, editRating);
    resetEditingState();
  };

  const handleCommentChange = (value: string) => {
    setEditComment(value);
  };

  const handleRatingChange = (rating: number) => {
    setEditRating(rating);
  };

  const resetEditingState = () => {
    setEditingId(null);
    setEditComment('');
    setEditRating(0);
  };

  useEffect(() => {
    if (editingId && textareaRef.current) {
      adjustTextarea(textareaRef.current);
      setCursorAndScrollToEnd(textareaRef.current);
    }
  }, [editingId]);

  return {
    editingId,
    editComment,
    editRating,
    textareaRef,
    isEditValid,
    handleReviewEditClick,
    handleReviewSaveClick,
    handleCommentChange,
    handleRatingChange,
    resetEditingState,
  };
};
