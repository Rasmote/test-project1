import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudContentDto } from 'src/dto/crud.post.req.dto';
import { PostEntity } from 'src/entity/crud.post.entity';

@Controller('crud')
export class CrudController {
    private readonly crudService: CrudService
    constructor(__crudService: CrudService) {
        this.crudService = __crudService;
    }

    @Post('create')
    async createPost(@Body() body: CrudContentDto): Promise<PostEntity> {
        console.log(body);
        return await this.crudService.createPost(body);
    }

    @Get('read')
    async readPost(@Param('id') id: number) {
        return await this.crudService.readPost(id);
    }

    @Post('update')
    async updatePost(
        @Param('id') id: number,
        @Body() body: CrudContentDto
    ): Promise<PostEntity> {
        return await this.crudService.updatePost(id, body);
    }

    // 글 삭제 (Delete)
    @Get('delete')
    async deletePost(@Query('id') id: number): Promise<void> {
        return await this.crudService.deletePost(id);
    }
}