import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "../../data/schemas/product.schema";
import { Attribute } from "../../data/schemas/attribute.schema";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>) {
  }

  async fetch(id?: string) {
    if (id == null) {
      return this.model.find().populate("master_category")
        .populate("main_category").populate("sub_category")
        .exec();
    }
    return this.model.findOne({ _id: id })
      .populate("master_category")
      .populate("main_category")
      .populate("sub_category")
      .exec();
  }

  async search(name: string) {
    return this.model.find({ $or: [{ name: { $regex: name } },{ description: { $regex: name } }] })
      .populate("master_category")
      .populate("main_category")
      .populate("sub_category").exec();

  }


  async create(data: any) {
    return this.model.create(data);
  }

  update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data, { new: true })
      .populate("master_category")
      .populate("main_category")
      .populate("sub_category")
      .exec();
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
