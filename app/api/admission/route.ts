import { connectDB } from "@/app/lib/models/mogodb";
import Admission from "@/app/lib/models/Admission";

export async function GET() {
  await connectDB();
  const admissions = await Admission.find();
  return Response.json(admissions);
}