
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { PersonalInfo } from "./steps/PersonalInfo";
import { EducationWork } from "./steps/EducationWork";
import { Goals } from "./steps/Goals";
import { Financial } from "./steps/Financial";

export function AssessmentForm() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [formData, setFormData] = useState({
    personalInfo: {
      nationality: "",
      age: "",
      maritalStatus: "",
      familyMembers: 0,
    },
    educationWork: {
      highestEducation: "",
      field: "",
      yearsExperience: 0,
      occupation: "",
      languages: [],
    },
    financial: {
      annualIncome: 0,
      savings: 0,
      assets: 0,
    },
    goals: {
      destinationCountries: [],
      timeline: "",
      purposeOfMigration: "",
      priorities: [],
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    setProgress(step * 25);
  }, [step]);

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // TODO: Implement actual form submission logic here (e.g., save to backend)
      console.log("Assessment Data:", formData); 
      // Navigate to the homepage with state to indicate scrolling to pricing
      navigate("/", { state: { scrollToPricing: true } }); 
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const updateFormData = (section, data) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        ...data,
      },
    });
  };

  return (
    <div className="container max-w-3xl px-4 py-8">
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Visa Assessment</h2>
            <p className="text-muted-foreground mb-4">
              Step {step} of 4: {step === 1 ? "Personal Information" : step === 2 ? "Education & Work" : step === 3 ? "Financial Information" : "Goals & Priorities"}
            </p>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="py-4">
            {step === 1 && (
              <PersonalInfo 
                data={formData.personalInfo}
                updateData={(data) => updateFormData("personalInfo", data)}
              />
            )}
            {step === 2 && (
              <EducationWork
                data={formData.educationWork}
                updateData={(data) => updateFormData("educationWork", data)}
              />
            )}
            {step === 3 && (
              <Financial
                data={formData.financial}
                updateData={(data) => updateFormData("financial", data)}
              />
            )}
            {step === 4 && (
              <Goals
                data={formData.goals}
                updateData={(data) => updateFormData("goals", data)}
              />
            )}
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              Back
            </Button>
            <Button onClick={nextStep}>
              {step < 4 ? "Next" : "Submit Assessment"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
