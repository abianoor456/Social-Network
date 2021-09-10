import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{MongooseModule} from '@nestjs/mongoose'
import { UserModule } from './users/users.module';
import { PostModule } from './posts/posts.module';

@Module({
  imports: [ UserModule,PostModule, MongooseModule.forRoot('mongodb://localhost:27017/nestjs-demo')],
  controllers: [AppController],
  providers: [AppService],
})  
export class AppModule {}
