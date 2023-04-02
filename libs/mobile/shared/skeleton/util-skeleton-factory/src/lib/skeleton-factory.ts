import { SkeletonContainer } from './skeleton-container.interface';
import { SkeletonItem } from './skeleton-item.interface';

export class SkeletonFactory {
  constructor(
    public readonly container: SkeletonContainer,
    public readonly items: SkeletonItem[]
  ) {}

  static multiple(length: number, factory: SkeletonFactory): SkeletonFactory[] {
    return Array.from({ length }, () => ({ ...factory }));
  }
}
