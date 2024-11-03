import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [DataModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
