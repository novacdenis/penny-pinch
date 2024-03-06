import { NextResponse } from "next/server";
import { parseTransactions } from "@/app/api/upload/report/parse-transactions";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    // Use the correct key to retrieve the file
    const file: File | null = data.get("media") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const html = buffer.toString("utf-8");
    const parsedInfo = parseTransactions(html);

    return NextResponse.json({ data: parsedInfo });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "fail", data: e });
  }
}
