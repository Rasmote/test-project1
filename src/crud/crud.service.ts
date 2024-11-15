
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/entity/crud.post.entity';
import { CrudContentDto } from 'src/dto/crud.post.req.dto';

@Injectable()
export class CrudService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly PostEntity: Repository<PostEntity>,
    ) { }

    async createPost(body: CrudContentDto): Promise<PostEntity> {
        const newPost = new PostEntity();
        newPost.insert(body);
        console.log(newPost);
        return await this.PostEntity.save(newPost);
    }

    async readPost(id: number): Promise<PostEntity> {
        const post = await this.PostEntity.findOneBy({ id });
        if (!post) {
            throw new NotFoundException(`${id}번째 글은 존재하지 않습니다.`);
        }
        return post;
    }

    async updatePost(id: number, body: CrudContentDto): Promise<PostEntity> {
        const post = await this.PostEntity.findOneBy({ id });
        if (!post) {
            throw new NotFoundException(`${id}번째 글은 존재하지 않습니다.`);
        }
        post.title = body.title;
        post.content = body.content;
        post.author = body.author;
        return await this.PostEntity.save(post);
    }

    async deletePost(id: number): Promise<void> {
        const post = await this.PostEntity.findOneBy({ id });
        if (!post) {
            throw new NotFoundException(`${id}번째 글은 존재하지 않습니다.`);
        }
        await this.PostEntity.delete(id);
    }
}
