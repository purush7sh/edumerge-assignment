import { connectDB } from "@/app/lib/models/mogodb";
import Program from "@/app/lib/models/Program";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();


  const totalSeats = body.quotas.reduce(
    (sum: number, q: any) => sum + q.seats,
    0
  );

  if (totalSeats !== body.intake) {
    return Response.json(
      { error: "Quota seats must equal intake" },
      { status: 400 }
    );
  }
  const program = await Program.create(body);

  return Response.json(program);
}  


export async function GET() {
  await connectDB();
  const programs = await Program.find();
  return Response.json(programs);
}  

