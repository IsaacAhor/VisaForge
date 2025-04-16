
import {
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  MapPin,
  Shield,
  ThumbsUp,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type VisaResultProps = {
  isPrimary?: boolean;
  data: {
    title: string;
    country: string;
    type: string;
    confidence: number;
    timeframe: string;
    cost: string;
    documents: string[];
    description: string;
    requirements: string[];
  };
};

export function VisaResult({ isPrimary = false, data }: VisaResultProps) {
  return (
    <Card className={`border-2 ${isPrimary ? "border-visa-blue" : "border-muted"}`}>
      {isPrimary && (
        <div className="bg-visa-blue text-white py-1 px-4 text-center text-sm font-medium">
          Primary Recommendation
        </div>
      )}
      <CardHeader className={`${!isPrimary && "pt-6"}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-visa-blue" />
              <span className="text-sm font-medium">{data.country}</span>
            </div>
            <CardTitle className="mt-2 text-2xl">{data.title}</CardTitle>
            <CardDescription className="mt-1">{data.type}</CardDescription>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm font-medium">Confidence</span>
              <ThumbsUp className={`h-4 w-4 ${data.confidence >= 70 ? "text-primary" : data.confidence >= 40 ? "text-amber-500" : "text-red-500"}`} /> {/* Changed text-green-500 to text-primary */}
            </div>
            <div className="mt-2">
              <Progress value={data.confidence} className="h-2 w-24" />
            </div>
            <div className="mt-1 text-xs">{data.confidence}%</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{data.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-primary mt-0.5" /> {/* Changed text-visa-teal to text-primary */}
            <div>
              <div className="text-sm font-medium">Timeframe</div>
              <div className="text-sm text-muted-foreground">{data.timeframe}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CreditCard className="h-5 w-5 text-primary mt-0.5" /> {/* Changed text-visa-teal to text-primary */}
            <div>
              <div className="text-sm font-medium">Estimated Cost</div>
              <div className="text-sm text-muted-foreground">{data.cost}</div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileCheck className="h-5 w-5 text-visa-blue" />
            <h4 className="font-medium">Key Requirements</h4>
          </div>
          <ul className="space-y-1 text-sm">
            {data.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-visa-blue font-bold text-xs mt-1">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-visa-blue" />
            <h4 className="font-medium">Required Documents</h4>
          </div>
          <ul className="space-y-1 text-sm">
            {data.documents.map((doc, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-visa-blue font-bold text-xs mt-1">•</span>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2">
          <Button className="w-full">
            View Full Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
