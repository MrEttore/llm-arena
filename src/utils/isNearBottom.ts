const AUTO_SCROLL_THRESHOLD = 48;

export const isNearBottom = (element: HTMLElement, threshold = AUTO_SCROLL_THRESHOLD) => {
  const { scrollTop, clientHeight, scrollHeight } = element;
  return scrollHeight - (scrollTop + clientHeight) <= threshold;
};
