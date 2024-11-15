
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/entity/crud.post.entity';
import { PostContentDto } from 'src/dto/crud.post.req.dto';
import { UserContentDto } from 'src/dto/crud.user.req.dto';
import { promises } from 'dns';
import { UserEntity } from 'src/entity/crud.user.entity';

@Injectable()
export class CrudService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postEntity: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>,
    ) { }

    async createPost(body: PostContentDto) {
        const newPost = new PostEntity();
        //newPost.insert(body);
        newPost.content = body.content;
        newPost.title = body.title;
        const tempUserEntity = new UserEntity;
        tempUserEntity.id = body.userid;
        newPost.user = tempUserEntity;
        console.log(newPost);
        return await this.postEntity.save(newPost);
    }

    async crateUser(body: UserContentDto) {
        const newUser = new UserEntity();
        newUser.email = body.email;
        newUser.nickname = body.nickname;
        console.log(newUser);
        return await this.userEntity.save(newUser);
    }

    async showAll() {
        const data = await this.postEntity
            .createQueryBuilder('b')
            .select()
            .innerJoinAndSelect('b.user', 'u')
            .getMany();
        return data;
    }

    async readPost(id: number): Promise<PostEntity> {
        const post = await this.postEntity.findOneBy({ id });
        if (!post) {
            throw new NotFoundException(`${id}번째 글은 존재하지 않습니다.`);
        }
        return post;
    }

    async updatePost(id: number, body: PostContentDto): Promise<PostEntity> {
        const post = await this.postEntity.findOneBy({ id });
        if (!post) {
            throw new NotFoundException(`${id}번째 글은 존재하지 않습니다.`);
        }
        post.title = body.title;
        post.content = body.content;
        //post.author = body.author;
        return await this.postEntity.save(post);
    }

    async deletePost(id: number): Promise<void> {
        const post = await this.postEntity.findOneBy({ id });
        if (!post) {
            throw new NotFoundException(`${id}번째 글은 존재하지 않습니다.`);
        }
        await this.postEntity.delete(id);
    }
}
