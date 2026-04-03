import mongoose from "mongoose";

const AdmissionSchema = new mongoose.Schema({
  applicantId: mongoose.Schema.Types.ObjectId,
  programId: mongoose.Schema.Types.ObjectId,
  quotaType: String,

  admissionNumber: {
    type: String,
    unique: true,
    sparse: true
  },

  feeStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending"
  },

  status: {
    type: String,
    enum: ["Allocated", "Confirmed"],
    default: "Allocated"
  }
});

export default mongoose.models.Admission ||
  mongoose.model("Admission", AdmissionSchema);