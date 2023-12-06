import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmoCRMService } from './amoCRM/amoCRM.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AmoCRMService],
})
export class AppModule {}