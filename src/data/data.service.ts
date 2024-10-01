import { Injectable } from '@nestjs/common';
import { DataCreateReqDto } from '../dto/data.create.req.dto';



@Injectable()
export class DataService {
    private arr: number[];

    constructor() {
        this.arr = new Array(1000).fill(-1);    //데이터 값이 -1일시 비어있는 인덱스
    }

    create(body: DataCreateReqDto) {
        //들어온 데이터가 음수인지 확인.
        if (body.data < 0) {
            return `데이터가 음수입니다!!`;
        }
        else if (this.arr[body.index] != -1) {
            return `해당 인덱스는 비어있지 않습니다.`;
        }
        else {
            this.arr[body.index] = body.data;
            return `${body.index}번째 인덱스에 ${body.data}추가가 완료되었습니다.`
        }
    }
}
