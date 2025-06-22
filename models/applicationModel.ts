import { Schema, model, models, Document } from "mongoose";
import type { Application } from "@/types/index"; 

type IApplication = Application & Document;

const applicationSchema = new Schema<IApplication>(
  {
    userId: { type: String, required: true },
    schemeId: { type: String, required: true },
    schemeName: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "under-review", "approved", "rejected"],
      default: "pending",
    },
    submittedAt: { type: String, default: () => new Date().toISOString() },
    lastUpdated: { type: String, default: () => new Date().toISOString() },
    formData: {
      age: String,
      gender: String,
      income: String,
      caste: String,
      location: String,
      occupation: String,
      name: String,
      email: String,
      phone: String,
      address: String,
    },
  },
  { timestamps: true }
);

const Application =
  models.Application || model<IApplication>("Application", applicationSchema);

export default Application;
