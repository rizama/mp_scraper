import { ApiProperty } from '@nestjs/swagger';
import { branch } from './search.models';

export class DetailParamDto {
    @ApiProperty({
        type: String,
        description: 'Product Slug',
        required: true,
    })
    slug: string;
}

export class DetailQueryStringDto {
    branch: string;
}

export interface DetailResponseInterface {
    status?: string;
    message?: string;
    data?: ResultDetailProduct[];
}

export interface ResultDetailProduct {
    detailInfo: detailInfoInterface;
    detailGallery: detailGalleryInterface[];
    detailPrice: detailPriceInterface;
}

export interface detailInfoInterface {
    title: string; 
    rating: number;
    sku: string;
    weight: string;
    warranty: string;
    colors: color[];
    branchs: branch[]; 
}

export interface color {
    name: string;
    otherProducts: string;
    colorCode: string;
}

export interface detailGalleryInterface {
    name: string;
    link: string;
}

export interface detailPriceInterface {
    normalPrice: number;
    discountPrice: number;
    discountPercent: number;
    price: number;
}