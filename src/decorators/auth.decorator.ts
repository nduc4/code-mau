import { SetMetadata } from '@nestjs/common';
import { UseAuthKey } from '@shared/metadata';

export const UseAuth = () => SetMetadata(UseAuthKey, true);
