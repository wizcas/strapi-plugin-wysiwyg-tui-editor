const BREAKPOINT = 1440;

export function getPreferredPreviewStyle(width) {
  return width >= BREAKPOINT ? 'vertical' : 'tab';
}
