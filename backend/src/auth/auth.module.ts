import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { DatabaseModule } from '../database/database.module'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'
import { JwtStrategy } from './jwt.strategy'

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
          signOptions: {
            algorithm: 'HS256',
            expiresIn: '1d',
          },
          secret,
        }
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
