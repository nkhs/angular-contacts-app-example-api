import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { ContactsModule } from './contacts/contacts.module';
@Module({
  imports: [TypeOrmModule.forRoot(config.database), ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
