import mongoose from "mongoose";

const QuotaSchema = new mongoose.Schema({
  type: String,
  seats: Number,
  filled: { type: Number, default: 0 }
});

const ProgramSchema = new mongoose.Schema({
  name: String,
  intake: Number,

  // ✅ Added fields (Master Setup covered here)
  courseType: { type: String, default: "UG" },
  academicYear: { type: String, default: "2026" },
  department: { type: String, default: "CSE" },
  admissionMode: { type: String, default: "Government" },
  entryType: { type: String, default: "Regular" },

  quotas: [QuotaSchema]
});

export default mongoose.models.Program ||
  mongoose.model("Program", ProgramSchema);