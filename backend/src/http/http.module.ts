import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { RegisterUserController } from "./controllers/register-user.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterUserController]
})
export class HttpModule {}