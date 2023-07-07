import { SetMetadata } from '@nestjs/common';
import { ResMsgKey } from '@shared/metadata';

export const ResponseMessage = (message: string) =>
  SetMetadata(ResMsgKey, message);
