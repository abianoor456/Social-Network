import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{MongooseModule} from '@nestjs/mongoose'
import { UserModule } from './users/users.module';
import { PostModule } from './posts/posts.module';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [   UserModule, AuthModule,PostModule,  ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot('mongodb://localhost:27017/nestjs-demo')],
  controllers: [AppController],
  providers: [AppService],
})  
export class AppModule {}
