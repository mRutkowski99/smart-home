interface SkeletonContainerProps {
  width: string;
  height: string;
}

interface SkeletonItemProps {
  width: string;
  height: string;
  verticalOffset: string;
  verticalOrigin?: 'top' | 'bottom';
  horizontalOffset: string;
  horizontalOrigin?: 'left' | 'rigth';
  transformOrigin?: string;
  rounded?: boolean;
}

export class SkeletonFactory {
  constructor(
    public readonly container: SkeletonContainerProps,
    public readonly items: SkeletonItemProps[]
  ) {}
}
