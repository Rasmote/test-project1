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

    @Post('createPost')
    async createPost(@Body() body: PostContentDto): Promise<PostEntity> {
        console.log(body);
        return await this.crudService.createPost(body);
    }

    @Post('createUser')
    async createUser(@Body() body: UserContentDto) {
        return await this.crudService.crateUser(body);
    }

    @Get('all')
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
    async deletePost(@Query('id') id: number): Promise<void> {
        return await this.crudService.deletePost(id);
    }
}