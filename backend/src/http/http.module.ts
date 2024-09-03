import { DatabaseModule } from '@/database/database.module'
import { Module } from '@nestjs/common'
import { RegisterUserController } from './controllers/register-user.controller'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { CreateCategoryController } from './controllers/create-category.controller'
import { FetchCategoriesController } from './controllers/fetch-categories.controller'
import { RegisterIncidentController } from './controllers/register-incident.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    RegisterUserController,
    AuthenticateUserController,
    CreateCategoryController,
    FetchCategoriesController,
    RegisterIncidentController,
  ],
})
export class HttpModule {}
