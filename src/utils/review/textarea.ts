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

export const validateComment = (
  textarea: HTMLTextAreaElement,
  value: string,
) => {
  if (value.length > 100) {
    textarea.setCustomValidity('100글자까지만 작성할 수 있습니다.');
  } else {
    textarea.setCustomValidity('');
  }
};

