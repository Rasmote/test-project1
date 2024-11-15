import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/crud.post.entity';
import { CrudModule } from './crud/crud.module';
import { BoardModule } from './board/board.module';
import { UserEntity } from './entity/crud.user.entity';

@Module({
  imports: [
    DataModule,
    BoardModule,
    CrudModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'boardDB',
      entities: [PostEntity, UserEntity],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
