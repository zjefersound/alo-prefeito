import { DatabaseModule } from '@/database/database.module'
import { Module } from '@nestjs/common'
import { RegisterUserController } from './controllers/register-user.controller'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { CreateCategoryController } from './controllers/create-category.controller'
import { FetchCategoriesController } from './controllers/fetch-categories.controller'
import { RegisterIncidentController } from './controllers/register-incident.controller'
import { DeleteIncidenController } from './controllers/delete-incident.controller'
import { FetchAllIncidentsController } from './controllers/fetch-all-incidents.controller'
import { FetchAuthorIncidentsController } from './controllers/fetch-author-incidents.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    RegisterUserController,
    AuthenticateUserController,
    CreateCategoryController,
    FetchCategoriesController,
    RegisterIncidentController,
    DeleteIncidenController,
    FetchAllIncidentsController,
    FetchAuthorIncidentsController,
  ],
})
export class HttpModule {}
