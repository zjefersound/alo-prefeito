import { DatabaseModule } from '@/database/database.module'
import { Module } from '@nestjs/common'
import { RegisterUserController } from './controllers/register-user.controller'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterUserController, AuthenticateUserController],
})
export class HttpModule {}
