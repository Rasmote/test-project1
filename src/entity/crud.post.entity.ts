import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CrudContentDto } from 'src/dto/crud.post.req.dto';

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    author: string;

    insert(body: CrudContentDto) {
        this.title = body.title;
        this.author = body.author;
        this.content = body.content;
    }
}
