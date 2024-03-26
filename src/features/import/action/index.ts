"use server";
import { createHash } from "crypto";
import { auth } from "@/features/auth";
import { createClient } from "../../../../supabase/server";
import { ITransaction, parseTransactions } from "../utils";

const supabase = createClient();

export const importReportAction = async (formData: FormData) => {
  const session = await auth();
  const user_id = session?.user?.id as string;
  const file: File | null = formData.get("report") as unknown as File;

  if (!file) {
    console.error("No file provided.");
    return;
  }
  const bytes = await file.arrayBuffer();
  const fileBuffer = Buffer.from(bytes);

  const hex = getFileHash(fileBuffer);
  const exists = await checkIfFileExists(hex);

  if (exists) {
    console.error("File already exists.");
    return;
  }
  let uploadedReportId;
  try {
    const parsedInfo = await parseTransactions(fileBuffer, user_id);
    if (!parsedInfo || parsedInfo.length === 0) {
      console.error("No transactions parsed.");
      return;
    }
    const reportRes = await insertReport(hex, file);
    uploadedReportId = reportRes?.id;
    await uploadTransactions(parsedInfo);
  } catch (e) {
    console.error(e, " | Error parsing transactions.");
    if (uploadedReportId) {
      await deleteInsertedReport(uploadedReportId);
    }
    return;
  }

  return true;
};

export const uploadTransactions = async (preparedData: ITransaction[]) => {
  const { error } = await supabase.from("transactions").insert(preparedData);
  if (error) {
    console.error(error);
    throw new Error(error + " | Error inserting transactions.");
  }
  return true;
};

const getFileHash = (fileBuffer: Buffer) => {
  const hashSum = createHash("sha256");
  hashSum.update(fileBuffer);
  return hashSum.digest("hex");
};

const checkIfFileExists = async (hex: string) => {
  const res = await supabase.from("reports").select().eq("file_hex", hex);
  if (Number(res.data?.length) > 0) {
    return true;
  }
  return false;
};
const deleteInsertedReport = async (id: string) => {
  const response = await supabase.from("reports").delete().eq("id", id);
  if (response.error) {
    console.error(response.error, " | Error deleting report.");
  }
  console.log(response.error ? "Error deleting report" : "Report deleted successfully");
  return !response.error;
};
const insertReport = async (hex: string, file: File) => {
  const res = await supabase
    .from("reports")
    .insert([{ file_hex: hex, file_name: file.name }])
    .select()
    .single();

  if (res.error) {
    console.error(res.error, " | Error inserting report.");
    return;
  }
  return res.data;
};
