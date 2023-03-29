import { SkeletonFactory } from '@smart-home/mobile/shared/skeleton/util-skeleton-factory';

export const roomCardSkeleton = new SkeletonFactory(
  { height: '20rem', width: '15rem' },
  [
    {
      height: '5rem',
      width: '13rem',
      horizontalOffset: '1rem',
      verticalOffset: '1rem',
      verticalOrigin: 'bottom',
    },
  ]
);

export const roomCardsSkeleton = (length: number): SkeletonFactory[] =>
  SkeletonFactory.multiple(length, roomCardSkeleton);
