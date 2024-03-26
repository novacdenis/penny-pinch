import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { importReportAction } from "@/features/import/action";

const acceptedFileTypes = ".html";

const upload = async (formData: FormData) => {
  "use server";
  const rest = await importReportAction(formData);
  if (rest) {
    console.log("Report uploaded successfully");
  } else {
    console.log("Error uploading report");
  }
};

export default function UploadData() {
  return (
    <form action={upload}>
      <Label htmlFor="report">Upload report</Label>
      <Input id="report" type="file" accept={acceptedFileTypes} name="report" />
      <Button type="submit" className="mt-2">
        Upload
      </Button>
    </form>
  );
}
