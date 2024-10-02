import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { DataCreateReqDto } from '../dto/data.create.req.dto';
import { DataUpdateReqDto } from 'src/dto/data.update.req.dto';

@Controller('data')
export class DataController {
    private readonly dataService: DataService;
    constructor(_dataService: DataService) {
        this.dataService = _dataService;
    }
    //Post로 데이터를 받아 create 데이터 생성
    @Post('create')
    create(@Body() body: DataCreateReqDto) {
        return this.dataService.create(body);
    }

    //Get으로 파라미터를 받아 read 읽어올 데이터 가져오기
    @Get('read')
    read(@Query('index') index: number) {
        return this.dataService.read(index);
    }

    //Post로 데이터를 받아 update 데이터 수정
    @Post('update')
    update(@Body() body: DataUpdateReqDto) {
        return this.dataService.update(body);
    }

    //Get으로 파라미터를 받아 delete 삭제할 데이터 가져오기
    @Get('delete')
    delete(@Query('index') index: number) {
        return this.dataService.delete(index);
    }
}