import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    return 'Hello World!';
  }
}
