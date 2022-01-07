import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchPayloadDto } from './dto/search.dto';
import { JaknotService } from './jaknot.service';

@Controller('jaknot')
export class JaknotController {
    constructor(private readonly jaknotService: JaknotService) {}

    @Get('/')
    home() {
        return this.jaknotService.home();
    }

    @Get('search')
    search(@Query() querySring: SearchPayloadDto) {
        return this.jaknotService.search(querySring);
    }
}
