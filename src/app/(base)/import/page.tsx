"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ImportPage() {
  return (
    <section className="container">
      <Card>
        <CardHeader>
          <CardTitle>Import report</CardTitle>
          <CardDescription>
            <span>Import your monthly report from VB (HTML format only)</span>
            <span className="block text-xs text-orange-300 opacity-40">
              later MAIB will be available
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReportImport />
        </CardContent>
      </Card>
    </section>
  );
}

export type FileOrNull = File | null;
const ReportImport = () => {
  // const acceptedFileTypes = ".html";
  const acceptedFileTypes = "*";
  const [file, setFile] = useState<FileOrNull>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const processReport = async () => {
    if (!file) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("media", file);
      console.log(formData);
      const res = await fetch("/api/upload/report", {
        method: "POST",
        body: formData,
      });

      const {
        data,
        error,
      }: {
        data: {
          url: string | string[];
        } | null;
        error: string | null;
      } = await res.json();

      if (error || !data) {
        // alert(error || "Sorry! something went wrong.");
        console.log(error || "Sorry! something went wrong.");
        return;
      }

      console.log("File was uploaded successfylly:", data);
    } catch (error) {
      console.error(error);
      console.log("Sorry! something went wrong.");
    }
  };

  return (
    <section>
      <Label htmlFor="report">Picture</Label>
      <Input id="report" type="file" accept={acceptedFileTypes} onChange={handleFileChange} />
      <Button onClick={processReport}>Process</Button>
    </section>
  );
};
