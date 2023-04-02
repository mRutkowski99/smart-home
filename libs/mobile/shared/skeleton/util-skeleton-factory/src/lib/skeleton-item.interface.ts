export interface SkeletonItem {
  width: string;
  height: string;
  verticalOffset: string;
  verticalOrigin?: 'top' | 'bottom';
  horizontalOffset: string;
  horizontalOrigin?: 'left' | 'right';
  transformOrigin?: string;
  rounded?: boolean;
}
