import { Schema, model, models, Document } from "mongoose";
import type { Scheme } from "../types/index";

type IScheme = Scheme & Document;

const schemeSchema = new Schema<IScheme>(
  {
    name: String,
    description: String,
    category: String,
    eligibility: [String],
    documents: [String],
    benefits: String,
    applicationDeadline: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Scheme = models.Scheme || model<IScheme>("Scheme", schemeSchema);
export default Scheme;
