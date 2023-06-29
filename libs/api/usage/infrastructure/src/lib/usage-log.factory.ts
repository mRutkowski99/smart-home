import { UsageLogSchema } from '@prisma/client';
import { UsageLog } from '@smart-home/api/usage/domain';
import { Uuid } from '@smart-home/api/shared/domain';

export const usageLogFactory = (schema: UsageLogSchema): UsageLog =>
  new UsageLog(
    new Uuid(schema.id),
    new Uuid(schema.homeId),
    schema.date,
    schema.value
  );
