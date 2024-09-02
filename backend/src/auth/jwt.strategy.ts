import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'
import { EnvService } from '../env/env.service'

const UserPayloadSchema = z.object({
  sub: z.string(),
})

export type UserPayload = z.infer<typeof UserPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(envService: EnvService) {
    const secret = envService.get('JWT_SECRET')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      algorithms: ['RS256'],
    })
  }

  async validate(payload: UserPayload) {
    return UserPayloadSchema.parse(payload)
  }
}
