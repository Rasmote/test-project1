import { Injectable, Query } from '@nestjs/common';
import { BoardContentDto } from 'src/dto/board.content.req.dto';
import { BoardContentToResponseDto } from 'src/dto/board.content.res.dto';


@Injectable()
export class BoardService {
    private NumBoard: BoardContentDto[];
    private index: number;
    private BoardResponse: BoardContentToResponseDto;

    constructor() {
        this.NumBoard = new Array(1000).fill(null);
        this.index = 1;
    }

    post(body: BoardContentDto) {
        if (this.NumBoard[this.index] === null) {
            this.NumBoard[this.index] = new BoardContentDto();
        }
        this.NumBoard[this.index].title = body.title;
        this.NumBoard[this.index].content = body.content;
        this.index++;
        return `해당 게시글이 ${this.index - 1}번으로 작성되었습니다.`
    }

    read(query: number) {
        this.BoardResponse = new BoardContentToResponseDto();
        if (this.NumBoard[query] != null) {
            this.BoardResponse.title = this.NumBoard[query].title;
            this.BoardResponse.content = this.NumBoard[query].content;
        }
        else {
            return `해당 번호의 게시글은 존재하지 않습니다.`;
        }

        return `게시글 제목 : ${this.BoardResponse.title}\n
                게시글 내용 : ${this.BoardResponse.content}`;

    }
}
