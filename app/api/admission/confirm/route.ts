import { connectDB } from "@/app/lib/models/mogodb";
import Admission from "@/app/lib/models/Admission";
import Program from "@/app/lib/models/Program";

export async function POST(req: Request) {
  await connectDB();

  const { admissionId } = await req.json();

  const admission = await Admission.findById(admissionId);

  if (!admission) {
    return Response.json({ error: "Admission not found" }, { status: 404 });
  }

  if (admission.feeStatus !== "Paid") {
    return Response.json({ error: "Fee not paid" }, { status: 400 });
  }

  if (admission.admissionNumber) {
    return Response.json({ error: "Already confirmed" }, { status: 400 });
  }

  const program = await Program.findById(admission.programId);

  const count = await Admission.countDocuments({
    admissionNumber: { $exists: true }
  });

  const admissionNumber = `INST/2026/UG/${program.name}/${admission.quotaType}/${String(count + 1).padStart(4, "0")}`;

  admission.admissionNumber = admissionNumber;
  admission.status = "Confirmed";

  await admission.save();

  return Response.json(admission);
}