import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema({
  name: String,
  category: String,
  marks: Number,

  // ✅ Added fields
  entryType: { type: String, default: "Regular" },
  quotaType: { type: String, default: "KCET" },

  documentsStatus: {
    type: String,
    enum: ["Pending", "Submitted", "Verified"],
    default: "Pending"
  }
});

export default mongoose.models.Applicant ||
  mongoose.model("Applicant", ApplicantSchema);