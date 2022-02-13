import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MasterCategories } from "./master.categories";
import { MainCategories } from "./main.catergory.schema";
import { SubCategories } from "./sub.category.schema";
import { FileSchema } from "./file.schema";
import { Attribute } from "./attribute.schema";


export type ProductDocument = Product & Document;

@Schema({ timestamps: false })
export class Variant {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Attribute.name })
  attribute: string;

  @Prop()
  selected_values: [string];

}

//
// @Schema({ timestamps: false })
// export class SelectedValues {
//
//   @Prop()
//   name: string;
//
//   @Prop()
//   price: number;
//
// }


@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MasterCategories.name })
  master_category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MainCategories.name })
  main_category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: SubCategories.name })
  sub_category: string;

  @Prop()
  description: string;

  @Prop()
  items_in_stock: number;

  @Prop()
  minimum_stock: number;

  @Prop()
  warranty_months: number;

  @Prop()
  price: number;

  @Prop()
  admin_commission: number;

  @Prop()
  image: [FileSchema];

  @Prop()
  video: FileSchema;

  //booleans
  @Prop()
  active: boolean;

  @Prop()
  hide_warranty: boolean;

  @Prop()
  featured: boolean;

  @Prop()
  gift_deals: boolean;

  @Prop()
  out_of_stock: boolean;

  @Prop()
  variant: [Variant];

  @Prop()
  variant_stock: [VariantStock];

}

export const ProductSchema = SchemaFactory.createForClass(Product);


@Schema({ timestamps: false })
export class VariantStock {
  @Prop()
  stock: number;

  @Prop()
  min_stock: number;

  @Prop()
  images: [FileSchema];

  @Prop()
  selected_stock_attributes: [SelectedStockAttributes];

}

@Schema({ timestamps: false })
export class SelectedStockAttributes {
  @Prop()
  name: string;

  @Prop()
  value: string;
}
