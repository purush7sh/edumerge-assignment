import { connectDB } from "@/app/lib/models/mogodb";
import Applicant from "@/app/lib/models/Applicant";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const applicant = await Applicant.create(body);

  return Response.json(applicant);
}  

export async function GET() {
  await connectDB();
  const applicants = await Applicant.find();
  return Response.json(applicants);
}