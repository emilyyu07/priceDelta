import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model ProductListing
 *
 */
export type ProductListingModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductListingPayload>;
export type AggregateProductListing = {
    _count: ProductListingCountAggregateOutputType | null;
    _min: ProductListingMinAggregateOutputType | null;
    _max: ProductListingMaxAggregateOutputType | null;
};
export type ProductListingMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    retailerId: string | null;
    url: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductListingMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    retailerId: string | null;
    url: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductListingCountAggregateOutputType = {
    id: number;
    productId: number;
    retailerId: number;
    url: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProductListingMinAggregateInputType = {
    id?: true;
    productId?: true;
    retailerId?: true;
    url?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductListingMaxAggregateInputType = {
    id?: true;
    productId?: true;
    retailerId?: true;
    url?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductListingCountAggregateInputType = {
    id?: true;
    productId?: true;
    retailerId?: true;
    url?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProductListingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProductListing to aggregate.
     */
    where?: Prisma.ProductListingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductListings to fetch.
     */
    orderBy?: Prisma.ProductListingOrderByWithRelationInput | Prisma.ProductListingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ProductListingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductListings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductListings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ProductListings
    **/
    _count?: true | ProductListingCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ProductListingMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ProductListingMaxAggregateInputType;
};
export type GetProductListingAggregateType<T extends ProductListingAggregateArgs> = {
    [P in keyof T & keyof AggregateProductListing]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductListing[P]> : Prisma.GetScalarType<T[P], AggregateProductListing[P]>;
};
export type ProductListingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductListingWhereInput;
    orderBy?: Prisma.ProductListingOrderByWithAggregationInput | Prisma.ProductListingOrderByWithAggregationInput[];
    by: Prisma.ProductListingScalarFieldEnum[] | Prisma.ProductListingScalarFieldEnum;
    having?: Prisma.ProductListingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductListingCountAggregateInputType | true;
    _min?: ProductListingMinAggregateInputType;
    _max?: ProductListingMaxAggregateInputType;
};
export type ProductListingGroupByOutputType = {
    id: string;
    productId: string;
    retailerId: string;
    url: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductListingCountAggregateOutputType | null;
    _min: ProductListingMinAggregateOutputType | null;
    _max: ProductListingMaxAggregateOutputType | null;
};
type GetProductListingGroupByPayload<T extends ProductListingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductListingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductListingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductListingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductListingGroupByOutputType[P]>;
}>>;
export type ProductListingWhereInput = {
    AND?: Prisma.ProductListingWhereInput | Prisma.ProductListingWhereInput[];
    OR?: Prisma.ProductListingWhereInput[];
    NOT?: Prisma.ProductListingWhereInput | Prisma.ProductListingWhereInput[];
    id?: Prisma.StringFilter<"ProductListing"> | string;
    productId?: Prisma.StringFilter<"ProductListing"> | string;
    retailerId?: Prisma.StringFilter<"ProductListing"> | string;
    url?: Prisma.StringNullableFilter<"ProductListing"> | string | null;
    isActive?: Prisma.BoolFilter<"ProductListing"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ProductListing"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductListing"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    retailer?: Prisma.XOR<Prisma.RetailerScalarRelationFilter, Prisma.RetailerWhereInput>;
    priceHistory?: Prisma.PriceHistoryListRelationFilter;
};
export type ProductListingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    retailerId?: Prisma.SortOrder;
    url?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    retailer?: Prisma.RetailerOrderByWithRelationInput;
    priceHistory?: Prisma.PriceHistoryOrderByRelationAggregateInput;
};
export type ProductListingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    productId_retailerId?: Prisma.ProductListingProductIdRetailerIdCompoundUniqueInput;
    AND?: Prisma.ProductListingWhereInput | Prisma.ProductListingWhereInput[];
    OR?: Prisma.ProductListingWhereInput[];
    NOT?: Prisma.ProductListingWhereInput | Prisma.ProductListingWhereInput[];
    productId?: Prisma.StringFilter<"ProductListing"> | string;
    retailerId?: Prisma.StringFilter<"ProductListing"> | string;
    url?: Prisma.StringNullableFilter<"ProductListing"> | string | null;
    isActive?: Prisma.BoolFilter<"ProductListing"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ProductListing"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductListing"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    retailer?: Prisma.XOR<Prisma.RetailerScalarRelationFilter, Prisma.RetailerWhereInput>;
    priceHistory?: Prisma.PriceHistoryListRelationFilter;
}, "id" | "productId_retailerId">;
export type ProductListingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    retailerId?: Prisma.SortOrder;
    url?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProductListingCountOrderByAggregateInput;
    _max?: Prisma.ProductListingMaxOrderByAggregateInput;
    _min?: Prisma.ProductListingMinOrderByAggregateInput;
};
export type ProductListingScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductListingScalarWhereWithAggregatesInput | Prisma.ProductListingScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductListingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductListingScalarWhereWithAggregatesInput | Prisma.ProductListingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProductListing"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"ProductListing"> | string;
    retailerId?: Prisma.StringWithAggregatesFilter<"ProductListing"> | string;
    url?: Prisma.StringNullableWithAggregatesFilter<"ProductListing"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"ProductListing"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProductListing"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ProductListing"> | Date | string;
};
export type ProductListingCreateInput = {
    id?: string;
    url?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutListingsInput;
    retailer: Prisma.RetailerCreateNestedOneWithoutProductListingsInput;
    priceHistory?: Prisma.PriceHistoryCreateNestedManyWithoutListingInput;
};
export type ProductListingUncheckedCreateInput = {
    id?: string;
    productId: string;
    retailerId: string;
    url?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    priceHistory?: Prisma.PriceHistoryUncheckedCreateNestedManyWithoutListingInput;
};
export type ProductListingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutListingsNestedInput;
    retailer?: Prisma.RetailerUpdateOneRequiredWithoutProductListingsNestedInput;
    priceHistory?: Prisma.PriceHistoryUpdateManyWithoutListingNestedInput;
};
export type ProductListingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    retailerId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    priceHistory?: Prisma.PriceHistoryUncheckedUpdateManyWithoutListingNestedInput;
};
export type ProductListingCreateManyInput = {
    id?: string;
    productId: string;
    retailerId: string;
    url?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductListingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductListingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    retailerId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductListingListRelationFilter = {
    every?: Prisma.ProductListingWhereInput;
    some?: Prisma.ProductListingWhereInput;
    none?: Prisma.ProductListingWhereInput;
};
export type ProductListingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductListingProductIdRetailerIdCompoundUniqueInput = {
    productId: string;
    retailerId: string;
};
export type ProductListingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    retailerId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductListingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    retailerId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductListingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    retailerId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductListingScalarRelationFilter = {
    is?: Prisma.ProductListingWhereInput;
    isNot?: Prisma.ProductListingWhereInput;
};
export type ProductListingCreateNestedManyWithoutRetailerInput = {
    create?: Prisma.XOR<Prisma.ProductListingCreateWithoutRetailerInput, Prisma.ProductListingUncheckedCreateWithoutRetailerInput> | Prisma.ProductListingCreateWithoutRetailerInput[] | Prisma.ProductListingUncheckedCreateWithoutRetailerInput[];
    connectOrCreate?: Prisma.ProductListingCreateOrConnectWithoutRetailerInput | Prisma.ProductListingCreateOrConnectWithoutRetailerInput[];
    createMany?: Prisma.ProductListingCreateManyRetailerInputEnvelope;
    connect?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
};
export type ProductListingUncheckedCreateNestedManyWithoutRetailerInput = {
    create?: Prisma.XOR<Prisma.ProductListingCreateWithoutRetailerInput, Prisma.ProductListingUncheckedCreateWithoutRetailerInput> | Prisma.ProductListingCreateWithoutRetailerInput[] | Prisma.ProductListingUncheckedCreateWithoutRetailerInput[];
    connectOrCreate?: Prisma.ProductListingCreateOrConnectWithoutRetailerInput | Prisma.ProductListingCreateOrConnectWithoutRetailerInput[];
    createMany?: Prisma.ProductListingCreateManyRetailerInputEnvelope;
    connect?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
};
export type ProductListingUpdateManyWithoutRetailerNestedInput = {
    create?: Prisma.XOR<Prisma.ProductListingCreateWithoutRetailerInput, Prisma.ProductListingUncheckedCreateWithoutRetailerInput> | Prisma.ProductListingCreateWithoutRetailerInput[] | Prisma.ProductListingUncheckedCreateWithoutRetailerInput[];
    connectOrCreate?: Prisma.ProductListingCreateOrConnectWithoutRetailerInput | Prisma.ProductListingCreateOrConnectWithoutRetailerInput[];
    upsert?: Prisma.ProductListingUpsertWithWhereUniqueWithoutRetailerInput | Prisma.ProductListingUpsertWithWhereUniqueWithoutRetailerInput[];
    createMany?: Prisma.ProductListingCreateManyRetailerInputEnvelope;
    set?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    disconnect?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    delete?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    connect?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    update?: Prisma.ProductListingUpdateWithWhereUniqueWithoutRetailerInput | Prisma.ProductListingUpdateWithWhereUniqueWithoutRetailerInput[];
    updateMany?: Prisma.ProductListingUpdateManyWithWhereWithoutRetailerInput | Prisma.ProductListingUpdateManyWithWhereWithoutRetailerInput[];
    deleteMany?: Prisma.ProductListingScalarWhereInput | Prisma.ProductListingScalarWhereInput[];
};
export type ProductListingUncheckedUpdateManyWithoutRetailerNestedInput = {
    create?: Prisma.XOR<Prisma.ProductListingCreateWithoutRetailerInput, Prisma.ProductListingUncheckedCreateWithoutRetailerInput> | Prisma.ProductListingCreateWithoutRetailerInput[] | Prisma.ProductListingUncheckedCreateWithoutRetailerInput[];
    connectOrCreate?: Prisma.ProductListingCreateOrConnectWithoutRetailerInput | Prisma.ProductListingCreateOrConnectWithoutRetailerInput[];
    upsert?: Prisma.ProductListingUpsertWithWhereUniqueWithoutRetailerInput | Prisma.ProductListingUpsertWithWhereUniqueWithoutRetailerInput[];
    createMany?: Prisma.ProductListingCreateManyRetailerInputEnvelope;
    set?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    disconnect?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    delete?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    connect?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    update?: Prisma.ProductListingUpdateWithWhereUniqueWithoutRetailerInput | Prisma.ProductListingUpdateWithWhereUniqueWithoutRetailerInput[];
    updateMany?: Prisma.ProductListingUpdateManyWithWhereWithoutRetailerInput | Prisma.ProductListingUpdateManyWithWhereWithoutRetailerInput[];
    deleteMany?: Prisma.ProductListingScalarWhereInput | Prisma.ProductListingScalarWhereInput[];
};
export type ProductListingCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductListingCreateWithoutProductInput, Prisma.ProductListingUncheckedCreateWithoutProductInput> | Prisma.ProductListingCreateWithoutProductInput[] | Prisma.ProductListingUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductListingCreateOrConnectWithoutProductInput | Prisma.ProductListingCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductListingCreateManyProductInputEnvelope;
    connect?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
};
export type ProductListingUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductListingCreateWithoutProductInput, Prisma.ProductListingUncheckedCreateWithoutProductInput> | Prisma.ProductListingCreateWithoutProductInput[] | Prisma.ProductListingUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductListingCreateOrConnectWithoutProductInput | Prisma.ProductListingCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductListingCreateManyProductInputEnvelope;
    connect?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
};
export type ProductListingUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductListingCreateWithoutProductInput, Prisma.ProductListingUncheckedCreateWithoutProductInput> | Prisma.ProductListingCreateWithoutProductInput[] | Prisma.ProductListingUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductListingCreateOrConnectWithoutProductInput | Prisma.ProductListingCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductListingUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductListingUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductListingCreateManyProductInputEnvelope;
    set?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    disconnect?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    delete?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    connect?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    update?: Prisma.ProductListingUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductListingUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductListingUpdateManyWithWhereWithoutProductInput | Prisma.ProductListingUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductListingScalarWhereInput | Prisma.ProductListingScalarWhereInput[];
};
export type ProductListingUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductListingCreateWithoutProductInput, Prisma.ProductListingUncheckedCreateWithoutProductInput> | Prisma.ProductListingCreateWithoutProductInput[] | Prisma.ProductListingUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductListingCreateOrConnectWithoutProductInput | Prisma.ProductListingCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductListingUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductListingUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductListingCreateManyProductInputEnvelope;
    set?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    disconnect?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    delete?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    connect?: Prisma.ProductListingWhereUniqueInput | Prisma.ProductListingWhereUniqueInput[];
    update?: Prisma.ProductListingUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductListingUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductListingUpdateManyWithWhereWithoutProductInput | Prisma.ProductListingUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductListingScalarWhereInput | Prisma.ProductListingScalarWhereInput[];
};
export type ProductListingCreateNestedOneWithoutPriceHistoryInput = {
    create?: Prisma.XOR<Prisma.ProductListingCreateWithoutPriceHistoryInput, Prisma.ProductListingUncheckedCreateWithoutPriceHistoryInput>;
    connectOrCreate?: Prisma.ProductListingCreateOrConnectWithoutPriceHistoryInput;
    connect?: Prisma.ProductListingWhereUniqueInput;
};
export type ProductListingUpdateOneRequiredWithoutPriceHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProductListingCreateWithoutPriceHistoryInput, Prisma.ProductListingUncheckedCreateWithoutPriceHistoryInput>;
    connectOrCreate?: Prisma.ProductListingCreateOrConnectWithoutPriceHistoryInput;
    upsert?: Prisma.ProductListingUpsertWithoutPriceHistoryInput;
    connect?: Prisma.ProductListingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductListingUpdateToOneWithWhereWithoutPriceHistoryInput, Prisma.ProductListingUpdateWithoutPriceHistoryInput>, Prisma.ProductListingUncheckedUpdateWithoutPriceHistoryInput>;
};
export type ProductListingCreateWithoutRetailerInput = {
    id?: string;
    url?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutListingsInput;
    priceHistory?: Prisma.PriceHistoryCreateNestedManyWithoutListingInput;
};
export type ProductListingUncheckedCreateWithoutRetailerInput = {
    id?: string;
    productId: string;
    url?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    priceHistory?: Prisma.PriceHistoryUncheckedCreateNestedManyWithoutListingInput;
};
export type ProductListingCreateOrConnectWithoutRetailerInput = {
    where: Prisma.ProductListingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductListingCreateWithoutRetailerInput, Prisma.ProductListingUncheckedCreateWithoutRetailerInput>;
};
export type ProductListingCreateManyRetailerInputEnvelope = {
    data: Prisma.ProductListingCreateManyRetailerInput | Prisma.ProductListingCreateManyRetailerInput[];
    skipDuplicates?: boolean;
};
export type ProductListingUpsertWithWhereUniqueWithoutRetailerInput = {
    where: Prisma.ProductListingWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductListingUpdateWithoutRetailerInput, Prisma.ProductListingUncheckedUpdateWithoutRetailerInput>;
    create: Prisma.XOR<Prisma.ProductListingCreateWithoutRetailerInput, Prisma.ProductListingUncheckedCreateWithoutRetailerInput>;
};
export type ProductListingUpdateWithWhereUniqueWithoutRetailerInput = {
    where: Prisma.ProductListingWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductListingUpdateWithoutRetailerInput, Prisma.ProductListingUncheckedUpdateWithoutRetailerInput>;
};
export type ProductListingUpdateManyWithWhereWithoutRetailerInput = {
    where: Prisma.ProductListingScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductListingUpdateManyMutationInput, Prisma.ProductListingUncheckedUpdateManyWithoutRetailerInput>;
};
export type ProductListingScalarWhereInput = {
    AND?: Prisma.ProductListingScalarWhereInput | Prisma.ProductListingScalarWhereInput[];
    OR?: Prisma.ProductListingScalarWhereInput[];
    NOT?: Prisma.ProductListingScalarWhereInput | Prisma.ProductListingScalarWhereInput[];
    id?: Prisma.StringFilter<"ProductListing"> | string;
    productId?: Prisma.StringFilter<"ProductListing"> | string;
    retailerId?: Prisma.StringFilter<"ProductListing"> | string;
    url?: Prisma.StringNullableFilter<"ProductListing"> | string | null;
    isActive?: Prisma.BoolFilter<"ProductListing"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ProductListing"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductListing"> | Date | string;
};
export type ProductListingCreateWithoutProductInput = {
    id?: string;
    url?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    retailer: Prisma.RetailerCreateNestedOneWithoutProductListingsInput;
    priceHistory?: Prisma.PriceHistoryCreateNestedManyWithoutListingInput;
};
export type ProductListingUncheckedCreateWithoutProductInput = {
    id?: string;
    retailerId: string;
    url?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    priceHistory?: Prisma.PriceHistoryUncheckedCreateNestedManyWithoutListingInput;
};
export type ProductListingCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductListingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductListingCreateWithoutProductInput, Prisma.ProductListingUncheckedCreateWithoutProductInput>;
};
export type ProductListingCreateManyProductInputEnvelope = {
    data: Prisma.ProductListingCreateManyProductInput | Prisma.ProductListingCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductListingUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductListingWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductListingUpdateWithoutProductInput, Prisma.ProductListingUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductListingCreateWithoutProductInput, Prisma.ProductListingUncheckedCreateWithoutProductInput>;
};
export type ProductListingUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductListingWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductListingUpdateWithoutProductInput, Prisma.ProductListingUncheckedUpdateWithoutProductInput>;
};
export type ProductListingUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductListingScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductListingUpdateManyMutationInput, Prisma.ProductListingUncheckedUpdateManyWithoutProductInput>;
};
export type ProductListingCreateWithoutPriceHistoryInput = {
    id?: string;
    url?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutListingsInput;
    retailer: Prisma.RetailerCreateNestedOneWithoutProductListingsInput;
};
export type ProductListingUncheckedCreateWithoutPriceHistoryInput = {
    id?: string;
    productId: string;
    retailerId: string;
    url?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductListingCreateOrConnectWithoutPriceHistoryInput = {
    where: Prisma.ProductListingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductListingCreateWithoutPriceHistoryInput, Prisma.ProductListingUncheckedCreateWithoutPriceHistoryInput>;
};
export type ProductListingUpsertWithoutPriceHistoryInput = {
    update: Prisma.XOR<Prisma.ProductListingUpdateWithoutPriceHistoryInput, Prisma.ProductListingUncheckedUpdateWithoutPriceHistoryInput>;
    create: Prisma.XOR<Prisma.ProductListingCreateWithoutPriceHistoryInput, Prisma.ProductListingUncheckedCreateWithoutPriceHistoryInput>;
    where?: Prisma.ProductListingWhereInput;
};
export type ProductListingUpdateToOneWithWhereWithoutPriceHistoryInput = {
    where?: Prisma.ProductListingWhereInput;
    data: Prisma.XOR<Prisma.ProductListingUpdateWithoutPriceHistoryInput, Prisma.ProductListingUncheckedUpdateWithoutPriceHistoryInput>;
};
export type ProductListingUpdateWithoutPriceHistoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutListingsNestedInput;
    retailer?: Prisma.RetailerUpdateOneRequiredWithoutProductListingsNestedInput;
};
export type ProductListingUncheckedUpdateWithoutPriceHistoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    retailerId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductListingCreateManyRetailerInput = {
    id?: string;
    productId: string;
    url?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductListingUpdateWithoutRetailerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutListingsNestedInput;
    priceHistory?: Prisma.PriceHistoryUpdateManyWithoutListingNestedInput;
};
export type ProductListingUncheckedUpdateWithoutRetailerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    priceHistory?: Prisma.PriceHistoryUncheckedUpdateManyWithoutListingNestedInput;
};
export type ProductListingUncheckedUpdateManyWithoutRetailerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductListingCreateManyProductInput = {
    id?: string;
    retailerId: string;
    url?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductListingUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    retailer?: Prisma.RetailerUpdateOneRequiredWithoutProductListingsNestedInput;
    priceHistory?: Prisma.PriceHistoryUpdateManyWithoutListingNestedInput;
};
export type ProductListingUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    retailerId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    priceHistory?: Prisma.PriceHistoryUncheckedUpdateManyWithoutListingNestedInput;
};
export type ProductListingUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    retailerId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type ProductListingCountOutputType
 */
export type ProductListingCountOutputType = {
    priceHistory: number;
};
export type ProductListingCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    priceHistory?: boolean | ProductListingCountOutputTypeCountPriceHistoryArgs;
};
/**
 * ProductListingCountOutputType without action
 */
export type ProductListingCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListingCountOutputType
     */
    select?: Prisma.ProductListingCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ProductListingCountOutputType without action
 */
export type ProductListingCountOutputTypeCountPriceHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PriceHistoryWhereInput;
};
export type ProductListingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    retailerId?: boolean;
    url?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    retailer?: boolean | Prisma.RetailerDefaultArgs<ExtArgs>;
    priceHistory?: boolean | Prisma.ProductListing$priceHistoryArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductListingCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productListing"]>;
export type ProductListingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    retailerId?: boolean;
    url?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    retailer?: boolean | Prisma.RetailerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productListing"]>;
export type ProductListingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    retailerId?: boolean;
    url?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    retailer?: boolean | Prisma.RetailerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productListing"]>;
export type ProductListingSelectScalar = {
    id?: boolean;
    productId?: boolean;
    retailerId?: boolean;
    url?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProductListingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "retailerId" | "url" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["productListing"]>;
export type ProductListingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    retailer?: boolean | Prisma.RetailerDefaultArgs<ExtArgs>;
    priceHistory?: boolean | Prisma.ProductListing$priceHistoryArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductListingCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductListingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    retailer?: boolean | Prisma.RetailerDefaultArgs<ExtArgs>;
};
export type ProductListingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    retailer?: boolean | Prisma.RetailerDefaultArgs<ExtArgs>;
};
export type $ProductListingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductListing";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        retailer: Prisma.$RetailerPayload<ExtArgs>;
        priceHistory: Prisma.$PriceHistoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        retailerId: string;
        url: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["productListing"]>;
    composites: {};
};
export type ProductListingGetPayload<S extends boolean | null | undefined | ProductListingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductListingPayload, S>;
export type ProductListingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductListingCountAggregateInputType | true;
};
export interface ProductListingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductListing'];
        meta: {
            name: 'ProductListing';
        };
    };
    /**
     * Find zero or one ProductListing that matches the filter.
     * @param {ProductListingFindUniqueArgs} args - Arguments to find a ProductListing
     * @example
     * // Get one ProductListing
     * const productListing = await prisma.productListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductListingFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductListingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductListingClient<runtime.Types.Result.GetResult<Prisma.$ProductListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ProductListing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductListingFindUniqueOrThrowArgs} args - Arguments to find a ProductListing
     * @example
     * // Get one ProductListing
     * const productListing = await prisma.productListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductListingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductListingClient<runtime.Types.Result.GetResult<Prisma.$ProductListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ProductListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductListingFindFirstArgs} args - Arguments to find a ProductListing
     * @example
     * // Get one ProductListing
     * const productListing = await prisma.productListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductListingFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductListingFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductListingClient<runtime.Types.Result.GetResult<Prisma.$ProductListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ProductListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductListingFindFirstOrThrowArgs} args - Arguments to find a ProductListing
     * @example
     * // Get one ProductListing
     * const productListing = await prisma.productListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductListingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductListingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductListingClient<runtime.Types.Result.GetResult<Prisma.$ProductListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ProductListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductListings
     * const productListings = await prisma.productListing.findMany()
     *
     * // Get first 10 ProductListings
     * const productListings = await prisma.productListing.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const productListingWithIdOnly = await prisma.productListing.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProductListingFindManyArgs>(args?: Prisma.SelectSubset<T, ProductListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ProductListing.
     * @param {ProductListingCreateArgs} args - Arguments to create a ProductListing.
     * @example
     * // Create one ProductListing
     * const ProductListing = await prisma.productListing.create({
     *   data: {
     *     // ... data to create a ProductListing
     *   }
     * })
     *
     */
    create<T extends ProductListingCreateArgs>(args: Prisma.SelectSubset<T, ProductListingCreateArgs<ExtArgs>>): Prisma.Prisma__ProductListingClient<runtime.Types.Result.GetResult<Prisma.$ProductListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ProductListings.
     * @param {ProductListingCreateManyArgs} args - Arguments to create many ProductListings.
     * @example
     * // Create many ProductListings
     * const productListing = await prisma.productListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductListingCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ProductListings and returns the data saved in the database.
     * @param {ProductListingCreateManyAndReturnArgs} args - Arguments to create many ProductListings.
     * @example
     * // Create many ProductListings
     * const productListing = await prisma.productListing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ProductListings and only return the `id`
     * const productListingWithIdOnly = await prisma.productListing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductListingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ProductListing.
     * @param {ProductListingDeleteArgs} args - Arguments to delete one ProductListing.
     * @example
     * // Delete one ProductListing
     * const ProductListing = await prisma.productListing.delete({
     *   where: {
     *     // ... filter to delete one ProductListing
     *   }
     * })
     *
     */
    delete<T extends ProductListingDeleteArgs>(args: Prisma.SelectSubset<T, ProductListingDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductListingClient<runtime.Types.Result.GetResult<Prisma.$ProductListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ProductListing.
     * @param {ProductListingUpdateArgs} args - Arguments to update one ProductListing.
     * @example
     * // Update one ProductListing
     * const productListing = await prisma.productListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductListingUpdateArgs>(args: Prisma.SelectSubset<T, ProductListingUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductListingClient<runtime.Types.Result.GetResult<Prisma.$ProductListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ProductListings.
     * @param {ProductListingDeleteManyArgs} args - Arguments to filter ProductListings to delete.
     * @example
     * // Delete a few ProductListings
     * const { count } = await prisma.productListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductListingDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ProductListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductListings
     * const productListing = await prisma.productListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductListingUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ProductListings and returns the data updated in the database.
     * @param {ProductListingUpdateManyAndReturnArgs} args - Arguments to update many ProductListings.
     * @example
     * // Update many ProductListings
     * const productListing = await prisma.productListing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ProductListings and only return the `id`
     * const productListingWithIdOnly = await prisma.productListing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ProductListingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ProductListing.
     * @param {ProductListingUpsertArgs} args - Arguments to update or create a ProductListing.
     * @example
     * // Update or create a ProductListing
     * const productListing = await prisma.productListing.upsert({
     *   create: {
     *     // ... data to create a ProductListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductListing we want to update
     *   }
     * })
     */
    upsert<T extends ProductListingUpsertArgs>(args: Prisma.SelectSubset<T, ProductListingUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductListingClient<runtime.Types.Result.GetResult<Prisma.$ProductListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ProductListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductListingCountArgs} args - Arguments to filter ProductListings to count.
     * @example
     * // Count the number of ProductListings
     * const count = await prisma.productListing.count({
     *   where: {
     *     // ... the filter for the ProductListings we want to count
     *   }
     * })
    **/
    count<T extends ProductListingCountArgs>(args?: Prisma.Subset<T, ProductListingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductListingCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ProductListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductListingAggregateArgs>(args: Prisma.Subset<T, ProductListingAggregateArgs>): Prisma.PrismaPromise<GetProductListingAggregateType<T>>;
    /**
     * Group by ProductListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends ProductListingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductListingGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductListingGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ProductListing model
     */
    readonly fields: ProductListingFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ProductListing.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ProductListingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    retailer<T extends Prisma.RetailerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RetailerDefaultArgs<ExtArgs>>): Prisma.Prisma__RetailerClient<runtime.Types.Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    priceHistory<T extends Prisma.ProductListing$priceHistoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductListing$priceHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the ProductListing model
 */
export interface ProductListingFieldRefs {
    readonly id: Prisma.FieldRef<"ProductListing", 'String'>;
    readonly productId: Prisma.FieldRef<"ProductListing", 'String'>;
    readonly retailerId: Prisma.FieldRef<"ProductListing", 'String'>;
    readonly url: Prisma.FieldRef<"ProductListing", 'String'>;
    readonly isActive: Prisma.FieldRef<"ProductListing", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"ProductListing", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ProductListing", 'DateTime'>;
}
/**
 * ProductListing findUnique
 */
export type ProductListingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListing
     */
    select?: Prisma.ProductListingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductListing
     */
    omit?: Prisma.ProductListingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductListingInclude<ExtArgs> | null;
    /**
     * Filter, which ProductListing to fetch.
     */
    where: Prisma.ProductListingWhereUniqueInput;
};
/**
 * ProductListing findUniqueOrThrow
 */
export type ProductListingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListing
     */
    select?: Prisma.ProductListingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductListing
     */
    omit?: Prisma.ProductListingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductListingInclude<ExtArgs> | null;
    /**
     * Filter, which ProductListing to fetch.
     */
    where: Prisma.ProductListingWhereUniqueInput;
};
/**
 * ProductListing findFirst
 */
export type ProductListingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListing
     */
    select?: Prisma.ProductListingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductListing
     */
    omit?: Prisma.ProductListingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductListingInclude<ExtArgs> | null;
    /**
     * Filter, which ProductListing to fetch.
     */
    where?: Prisma.ProductListingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductListings to fetch.
     */
    orderBy?: Prisma.ProductListingOrderByWithRelationInput | Prisma.ProductListingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductListings.
     */
    cursor?: Prisma.ProductListingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductListings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductListings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductListings.
     */
    distinct?: Prisma.ProductListingScalarFieldEnum | Prisma.ProductListingScalarFieldEnum[];
};
/**
 * ProductListing findFirstOrThrow
 */
export type ProductListingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListing
     */
    select?: Prisma.ProductListingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductListing
     */
    omit?: Prisma.ProductListingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductListingInclude<ExtArgs> | null;
    /**
     * Filter, which ProductListing to fetch.
     */
    where?: Prisma.ProductListingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductListings to fetch.
     */
    orderBy?: Prisma.ProductListingOrderByWithRelationInput | Prisma.ProductListingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductListings.
     */
    cursor?: Prisma.ProductListingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductListings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductListings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductListings.
     */
    distinct?: Prisma.ProductListingScalarFieldEnum | Prisma.ProductListingScalarFieldEnum[];
};
/**
 * ProductListing findMany
 */
export type ProductListingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListing
     */
    select?: Prisma.ProductListingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductListing
     */
    omit?: Prisma.ProductListingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductListingInclude<ExtArgs> | null;
    /**
     * Filter, which ProductListings to fetch.
     */
    where?: Prisma.ProductListingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductListings to fetch.
     */
    orderBy?: Prisma.ProductListingOrderByWithRelationInput | Prisma.ProductListingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ProductListings.
     */
    cursor?: Prisma.ProductListingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductListings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductListings.
     */
    skip?: number;
    distinct?: Prisma.ProductListingScalarFieldEnum | Prisma.ProductListingScalarFieldEnum[];
};
/**
 * ProductListing create
 */
export type ProductListingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListing
     */
    select?: Prisma.ProductListingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductListing
     */
    omit?: Prisma.ProductListingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductListingInclude<ExtArgs> | null;
    /**
     * The data needed to create a ProductListing.
     */
    data: Prisma.XOR<Prisma.ProductListingCreateInput, Prisma.ProductListingUncheckedCreateInput>;
};
/**
 * ProductListing createMany
 */
export type ProductListingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductListings.
     */
    data: Prisma.ProductListingCreateManyInput | Prisma.ProductListingCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ProductListing createManyAndReturn
 */
export type ProductListingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListing
     */
    select?: Prisma.ProductListingSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductListing
     */
    omit?: Prisma.ProductListingOmit<ExtArgs> | null;
    /**
     * The data used to create many ProductListings.
     */
    data: Prisma.ProductListingCreateManyInput | Prisma.ProductListingCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductListingIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ProductListing update
 */
export type ProductListingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListing
     */
    select?: Prisma.ProductListingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductListing
     */
    omit?: Prisma.ProductListingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductListingInclude<ExtArgs> | null;
    /**
     * The data needed to update a ProductListing.
     */
    data: Prisma.XOR<Prisma.ProductListingUpdateInput, Prisma.ProductListingUncheckedUpdateInput>;
    /**
     * Choose, which ProductListing to update.
     */
    where: Prisma.ProductListingWhereUniqueInput;
};
/**
 * ProductListing updateMany
 */
export type ProductListingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductListings.
     */
    data: Prisma.XOR<Prisma.ProductListingUpdateManyMutationInput, Prisma.ProductListingUncheckedUpdateManyInput>;
    /**
     * Filter which ProductListings to update
     */
    where?: Prisma.ProductListingWhereInput;
    /**
     * Limit how many ProductListings to update.
     */
    limit?: number;
};
/**
 * ProductListing updateManyAndReturn
 */
export type ProductListingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListing
     */
    select?: Prisma.ProductListingSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductListing
     */
    omit?: Prisma.ProductListingOmit<ExtArgs> | null;
    /**
     * The data used to update ProductListings.
     */
    data: Prisma.XOR<Prisma.ProductListingUpdateManyMutationInput, Prisma.ProductListingUncheckedUpdateManyInput>;
    /**
     * Filter which ProductListings to update
     */
    where?: Prisma.ProductListingWhereInput;
    /**
     * Limit how many ProductListings to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductListingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ProductListing upsert
 */
export type ProductListingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListing
     */
    select?: Prisma.ProductListingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductListing
     */
    omit?: Prisma.ProductListingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductListingInclude<ExtArgs> | null;
    /**
     * The filter to search for the ProductListing to update in case it exists.
     */
    where: Prisma.ProductListingWhereUniqueInput;
    /**
     * In case the ProductListing found by the `where` argument doesn't exist, create a new ProductListing with this data.
     */
    create: Prisma.XOR<Prisma.ProductListingCreateInput, Prisma.ProductListingUncheckedCreateInput>;
    /**
     * In case the ProductListing was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ProductListingUpdateInput, Prisma.ProductListingUncheckedUpdateInput>;
};
/**
 * ProductListing delete
 */
export type ProductListingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListing
     */
    select?: Prisma.ProductListingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductListing
     */
    omit?: Prisma.ProductListingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductListingInclude<ExtArgs> | null;
    /**
     * Filter which ProductListing to delete.
     */
    where: Prisma.ProductListingWhereUniqueInput;
};
/**
 * ProductListing deleteMany
 */
export type ProductListingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProductListings to delete
     */
    where?: Prisma.ProductListingWhereInput;
    /**
     * Limit how many ProductListings to delete.
     */
    limit?: number;
};
/**
 * ProductListing.priceHistory
 */
export type ProductListing$priceHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: Prisma.PriceHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: Prisma.PriceHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PriceHistoryInclude<ExtArgs> | null;
    where?: Prisma.PriceHistoryWhereInput;
    orderBy?: Prisma.PriceHistoryOrderByWithRelationInput | Prisma.PriceHistoryOrderByWithRelationInput[];
    cursor?: Prisma.PriceHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PriceHistoryScalarFieldEnum | Prisma.PriceHistoryScalarFieldEnum[];
};
/**
 * ProductListing without action
 */
export type ProductListingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductListing
     */
    select?: Prisma.ProductListingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductListing
     */
    omit?: Prisma.ProductListingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductListingInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=ProductListing.d.ts.map