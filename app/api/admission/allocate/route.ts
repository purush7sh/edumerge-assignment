import { connectDB } from "@/app/lib/models/mogodb";
import Program from "@/app/lib/models/Program";
import Admission from "@/app/lib/models/Admission";

export async function POST(req: Request) {
  await connectDB();

  const { applicantId, programId, quotaType } = await req.json();

  const program = await Program.findById(programId);
  if (!program) {
    return Response.json({ error: "Program not found" }, { status: 404 });
  }

  const quota = program.quotas.find((q: any) => q.type === quotaType);
  if (!quota) {
    return Response.json({ error: "Quota not found" }, { status: 400 });
  }

  const existing = await Admission.findOne({ applicantId });
  if (existing) {
    return Response.json(
      { error: "Admission already exists for this applicant" },
      { status: 400 }
    );
  }

  // ✅ ATOMIC UPDATE ONLY
  const updateResult = await Program.updateOne(
    {
      _id: programId,
      "quotas.type": quotaType,
      "quotas.filled": { $lt: quota.seats }
    },
    {
      $inc: { "quotas.$.filled": 1 }
    }
  );

  if (updateResult.modifiedCount === 0) {
    return Response.json(
      { error: "Quota Full" },
      { status: 400 }
    );
  }

  const admission = await Admission.create({
    applicantId,
    programId,
    quotaType,
    feeStatus: "Pending",
    status: "Allocated"
  });

  return Response.json(admission);
}