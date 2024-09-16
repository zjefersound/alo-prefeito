import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const ApiKey = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    const apiKey = request.headers.authorization.split(' ')[1]

    return apiKey
  },
)
