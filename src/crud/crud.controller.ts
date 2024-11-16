import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { CrudService } from './crud.service';
import { PostContentDto } from 'src/dto/crud.post.req.dto';
import { PostEntity } from 'src/entity/crud.post.entity';
import { UserContentDto } from 'src/dto/crud.user.req.dto';

@Controller('crud')
export class CrudController {
    private readonly crudService: CrudService
    constructor(__crudService: CrudService) {
        this.crudService = __crudService;
    }

    @Post('createPost') //글 생성
    async createPost(@Body() body: PostContentDto): Promise<PostEntity> {
        console.log(body);
        return await this.crudService.createPost(body);
    }

    @Post('createUser') //유저 생성
    async createUser(@Body() body: UserContentDto) {
        return await this.crudService.crateUser(body);
    }

    @Get('all') //모든 게시판 엔티티 표시
    async showAll() {
        return this.crudService.showAll();
    }

    @Get('read')
    async readPost(@Param('id') id: number) {
        return await this.crudService.readPost(id);
    }

    @Post('update')
    async updatePost(
        @Param('id') id: number,
        @Body() body: PostContentDto
    ): Promise<PostEntity> {
        return await this.crudService.updatePost(id, body);
    }

    @Get('delete')
    async deletePost(@Query('id') id: number): Promise<string> {
        return await this.crudService.deletePost(id);
    }
}