import { CommonUtils } from '../../libs/utils/src';
import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import {
    SearchQueryDto,
    SearchResponseInterface,
} from './models/search.models';
import { JaknotService } from './jaknot.service';
import { BranchCity } from './enums/search.enum';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DetailParamDto } from './models/detail-product.models';

@Controller('jaknot')
@ApiTags('jakartanotebook')
export class JaknotController {
    constructor(private readonly jaknotService: JaknotService) {}

    @Get('/')
    @ApiOkResponse({
        description: 'Welcome Response',
    })
    home() {
        return 'Welcome to Jakarta Notebook Scraper';
    }

    @Get('v1/search')
    @ApiOkResponse({
        description: 'Search Endpoint for Jakarta Notebook',
    })
    async search(
        @Query() querySring: SearchQueryDto,
        @Res() response,
    ): Promise<SearchResponseInterface> {
        try {
            if (
                querySring.branch &&
                !CommonUtils.enumValueToArray(BranchCity).includes(
                    querySring.branch,
                )
            ) {
                return response
                    .status(404)
                    .json(
                        CommonUtils.responseApi(
                            404,
                            `Branch ${querySring.branch} tidak ditemukan`,
                            [],
                        ),
                    );
            }

            const seaerchResult = await this.jaknotService.searchV1(querySring);
            return response
                .status(200)
                .json(CommonUtils.responseApi(200, 'success', seaerchResult));
        } catch (error) {
            const message = error.message
                ? `${error.message}`
                : `Unexpected Error, ${error}`;
            return response
                .status(500)
                .json(CommonUtils.responseApi('error', message, []));
        }
    }

    @Get('v1/detail/:slug')
    async detail(@Param() params: DetailParamDto) {
        return this.jaknotService.detailV1(params);
    }
}
