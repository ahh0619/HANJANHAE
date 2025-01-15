export const adjustTextarea = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto';
  textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
};

export const setCursorAndScrollToEnd = (textarea: HTMLTextAreaElement) => {
  textarea.selectionStart = textarea.value.length;
  textarea.selectionEnd = textarea.value.length;
  textarea.scrollTop = textarea.scrollHeight;
  textarea.focus();
};

export const validateComment = (comment: string, rating: number) => {
  if (comment.trim().length === 0) {
    return '리뷰는 최소 2자 이상 입력해야 합니다.';
  }
  if (comment.trim().length < 2) {
    return '리뷰는 최소 2자 이상 입력해야 합니다.';
  }
  if (comment.length > 100) {
    return '100글자까지만 작성할 수 있습니다.';
  }
  if (rating === 0) {
    return '별점을 입력해주세요.';
  }
  return null;
};
