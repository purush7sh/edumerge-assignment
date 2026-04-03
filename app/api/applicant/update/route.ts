import { connectDB } from "@/app/lib/models/mogodb";
import Applicant from "@/app/lib/models/Applicant";

export async function PATCH(req: Request) {
  await connectDB();
  const { id, status } = await req.json();

  const applicant = await Applicant.findById(id);

  applicant.documentsStatus = status;
  await applicant.save();

  return Response.json(applicant);
}