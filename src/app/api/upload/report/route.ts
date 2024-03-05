import { NextResponse } from "next/server";
import { parseTransactions } from "@/app/api/upload/report/parse-transactions";
export const config = {
  api: {
    bodyParser: false, // Disable the default Next.js bodyParser
  },
};

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
    console.log(parsedInfo, parsedInfo.length, "parsedInfo");
    return NextResponse.json({ success: true, data: buffer.toString("base64") });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "fail", data: e });
  }
}
