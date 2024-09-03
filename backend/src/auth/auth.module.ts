import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { DatabaseModule } from '../database/database.module'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'
import { JwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { AuthorizationGuard } from './guard/authorization.guard'

@Module({
  imports: [
    EnvModule,
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      imports: [EnvModule],
      inject: [EnvService],
      async useFactory(envService: EnvService) {
        const secret = envService.get('JWT_SECRET')

        return {
          secret,
          signOptions: {
            algorithm: 'HS256',
            expiresIn: '10d',
          },
        }
      },
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AuthModule {}
