export type ProductsFilterOption = {
    minPrice: number;
    maxPrice: number;
    productCategory: string | null;
    productTypes: string[] | null;
    level: string[] | null;
}
