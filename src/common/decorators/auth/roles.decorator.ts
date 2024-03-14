import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: number[]) => SetMetadata('roles', roles);

export const AdminRoles = (...roles: string[]) => SetMetadata('roles', roles);
