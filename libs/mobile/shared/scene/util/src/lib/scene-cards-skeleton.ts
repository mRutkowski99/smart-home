import { SkeletonFactory } from '@smart-home/mobile/shared/skeleton/util-skeleton-factory';

export const sceneCardSkeleton = new SkeletonFactory(
  {
    height: '12rem',
    width: '21rem',
  },
  [
    {
      height: '1.6rem',
      width: '90%',
      horizontalOffset: '5%',
      verticalOffset: '5%',
    },
    {
      height: '1.6rem',
      width: '90%',
      horizontalOffset: '5%',
      verticalOffset: '20%',
    },
    {
      height: '2rem',
      width: '50%',
      horizontalOffset: '25%',
      verticalOffset: '10%',
      verticalOrigin: 'bottom',
    },
  ]
);

export const sceneCardsSkeleton = (length: number): SkeletonFactory[] =>
  SkeletonFactory.multiple(length, sceneCardSkeleton);
