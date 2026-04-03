import { connectDB } from "@/app/lib/models/mogodb";
import Admission from "@/app/lib/models/Admission";

export async function POST(req: Request) {
  await connectDB();

  const { admissionId } = await req.json();

  const admission = await Admission.findById(admissionId);

  if (!admission) {
    return Response.json(
      { error: "Admission not found" },
      { status: 404 }
    );
  }

  // ✅ Update fee
  admission.feeStatus = "Paid";
  await admission.save();

  return Response.json(admission);
}