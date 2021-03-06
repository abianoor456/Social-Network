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
  imports: [  EventsModule, UserModule, AuthModule,PostModule,  ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@nestjs-demo.kowsp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)],
  controllers: [AppController],
  providers: [AppService],
})  
export class AppModule {}


