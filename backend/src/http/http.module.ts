import { DatabaseModule } from '@/database/database.module'
import { Module } from '@nestjs/common'
import { RegisterUserController } from './controllers/register-user.controller'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { CreateCategoryController } from './controllers/create-category.controller'
import { FetchCategoriesController } from './controllers/fetch-categories.controller'
import { RegisterIncidentController } from './controllers/register-incident.controller'
import { DeleteIncidentController } from './controllers/delete-incident.controller'
import { FetchAllIncidentsController } from './controllers/fetch-all-incidents.controller'
import { FetchAuthorIncidentsController } from './controllers/fetch-author-incidents.controller'
import { FetchLastIncidentsController } from './controllers/fetch-last-incidents.controller'
import { GetUserProfileController } from './controllers/get-user-profile.controller'
import { UpdateUserProfileController } from './controllers/update-user-profile.controller'
import { UploadAttachmentsController } from './controllers/upload-attachments.controller'
import { GetIncidentController } from './controllers/get-incident.controller'
import { RegisterApiKeyController } from './controllers/register-api-key.controller'
import { FetchApiKeysController } from './controllers/fetch-api-keys.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    RegisterUserController,
    AuthenticateUserController,
    CreateCategoryController,
    FetchCategoriesController,
    RegisterIncidentController,
    DeleteIncidentController,
    FetchAllIncidentsController,
    FetchAuthorIncidentsController,
    FetchLastIncidentsController,
    GetUserProfileController,
    UpdateUserProfileController,
    UploadAttachmentsController,
    GetIncidentController,
    RegisterApiKeyController,
    FetchApiKeysController,
  ],
})
export class HttpModule {}
