
import { Download, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ResultsSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Migration Strategy</CardTitle>
        <CardDescription>
          Summary based on your profile and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Analysis Overview</h3>
          <p className="text-sm text-muted-foreground">
            Based on your education, work experience, and financial situation, we've identified viable migration paths that match your goals and timeline.
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="font-medium">Next Steps</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-visa-blue font-bold text-xs mt-1">1.</span>
              <span>Review both recommended visa options in detail</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-visa-blue font-bold text-xs mt-1">2.</span>
              <span>Start gathering the required documents for your preferred option</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-visa-blue font-bold text-xs mt-1">3.</span>
              <span>Consult official government sources for the most current requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-visa-blue font-bold text-xs mt-1">4.</span>
              <span>Consider seeking professional advice for complex situations</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button className="w-full gap-2">
            <Download className="h-4 w-4" />
            <span>Export Results as PDF</span>
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Share2 className="h-4 w-4" />
            <span>Share Results</span>
          </Button>
          <Button variant="ghost" className="w-full gap-2">
            <FileText className="h-4 w-4" />
            <span>Detailed Report</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
