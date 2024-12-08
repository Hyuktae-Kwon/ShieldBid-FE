import { ProductDto } from "./ProductDto"

export type AuctionDto = {
    id: string,
    title: string
    product: ProductDto,
    minPrice: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}