import { SkeletonFactory } from '@smart-home/mobile/shared/skeleton/util-skeleton-factory';

export const roomCardSkeleton = new SkeletonFactory(
  { height: '20rem', width: '15rem' },
  [
    {
      height: '25%',
      width: '90%',
      horizontalOffset: '5%',
      verticalOffset: '5%',
      verticalOrigin: 'bottom',
    },
  ]
);

export const roomCardsSkeleton = (length: number): SkeletonFactory[] =>
  SkeletonFactory.multiple(length, roomCardSkeleton);
