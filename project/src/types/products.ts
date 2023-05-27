import { ProductCategory, ProductLevel, ProductType } from '../consts';

export type Product = {
id: number;
name: string;
vendorCode: string;
type: ProductType;
category: ProductCategory;
description: string;
level: ProductLevel;
price: number;
reviewCount: number;
previewImg: string;
previewImg2x: string;
previewImgWebp: string;
previewImgWebp2x: string;
}

export type Products = Product[];
