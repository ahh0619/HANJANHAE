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
