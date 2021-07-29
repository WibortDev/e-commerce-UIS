export interface ProductModel {
    _id: string;
    active?: boolean;
    title: string;
    description: string;
    imgUrl: string;
    price: number | null;
}
