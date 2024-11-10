import { Module } from '@nestjs/common';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entity/crud.post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [CrudController],
  providers: [CrudService]
})
export class CrudModule { }
