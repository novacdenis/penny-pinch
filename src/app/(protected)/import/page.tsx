import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UploadData from "./upload-data";

export default function ImportPage() {
  return (
    <section className="container">
      <Card className="max-w-md">
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
          <UploadData />
        </CardContent>
      </Card>
    </section>
  );
}
