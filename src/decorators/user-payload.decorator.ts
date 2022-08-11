import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';

export const UserPayload = createParamDecorator((data: unknown, ctx: ExecutionContext): UserPayloadDto => {
  const request = ctx.switchToHttp().getRequest() as Request & { user: UserPayloadDto };
  return request.user;
});
