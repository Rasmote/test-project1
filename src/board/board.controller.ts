import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardContentDto } from 'src/dto/board.content.req.dto';
import { BoardContentToResponseDto } from 'src/dto/board.content.res.dto';

@Controller('board')
export class BoardController {
    private readonly boardService: BoardService;
    constructor(_boardService: BoardService) {
        this.boardService = _boardService;
    }

    @Post('post')
    post(@Body() body: BoardContentDto) {
        return this.boardService.post(body);
    }

    @Get('read')
    read(@Query('index') index: number) {
        return this.boardService.read(index);
    }
}
