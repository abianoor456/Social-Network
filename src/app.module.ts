import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{MongooseModule} from '@nestjs/mongoose'
import { UserModule } from './users/users.module';
import { PostModule } from './posts/posts.module';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [  EventsModule, UserModule, AuthModule,PostModule,  ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`)],
  controllers: [AppController],
  providers: [AppService],
})  
export class AppModule {}
