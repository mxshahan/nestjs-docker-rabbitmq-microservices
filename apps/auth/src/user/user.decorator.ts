import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './schemas/user.schema';

// const getCurrentUserByContext = (context: ExecutionContext): User => {
//   return context.switchToHttp().getRequest().user;
// };

// export const CurrentUser = createParamDecorator(
//   (_data: undefined, contenxt: ExecutionContext) =>
//     getCurrentUserByContext(contenxt),
// );

export const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
