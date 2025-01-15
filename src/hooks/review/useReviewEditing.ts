import { useEffect, useRef, useState } from 'react';

import {
  adjustTextarea,
  setCursorAndScrollToEnd,
  validateComment,
} from '@/utils/review/textarea';

export const useReviewEditing = (
  onUpdate: (id: string, comment: string, rating: number) => void,
) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState<string>('');
  const [editRating, setEditRating] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleReviewEditClick = (
    id: string,
    currentComment: string,
    currentRating: number,
  ) => {
    setEditingId(id);
    setEditComment(currentComment);
    setEditRating(currentRating);
    setErrorMessage(null);
  };

  const handleReviewSaveClick = (id: string) => {
    const error = validateComment(editComment, editRating);
    if (error) {
      setErrorMessage(error);
      return;
    }
    onUpdate(id, editComment, editRating);
    resetEditingState();
  };

  const handleCommentChange = (value: string) => {
    setEditComment(value);
    const error = validateComment(value, editRating);
    setErrorMessage(error);
  };

  const handleRatingChange = (rating: number) => {
    setEditRating(rating);
    const error = validateComment(editComment, rating);
    setErrorMessage(error);
  };

  const resetEditingState = () => {
    setEditingId(null);
    setEditComment('');
    setEditRating(0);
    setErrorMessage(null);
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
    errorMessage,
    textareaRef,
    handleReviewEditClick,
    handleReviewSaveClick,
    handleCommentChange,
    handleRatingChange,
    resetEditingState,
  };
};
