
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function EducationWork({ data, updateData }) {
  const [formValues, setFormValues] = useState(data);

  useEffect(() => {
    updateData(formValues);
  }, [formValues, updateData]);

  const handleChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleLanguageChange = (language) => {
    const updatedLanguages = formValues.languages.includes(language)
      ? formValues.languages.filter((lang) => lang !== language)
      : [...formValues.languages, language];
    
    handleChange("languages", updatedLanguages);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-medium">Education & Work Experience</h3>
        <p className="text-sm text-muted-foreground">
          Your qualifications and work experience are crucial factors in visa eligibility.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="highestEducation">Highest Level of Education</Label>
          <Select
            value={formValues.highestEducation}
            onValueChange={(value) => handleChange("highestEducation", value)}
          >
            <SelectTrigger id="highestEducation">
              <SelectValue placeholder="Select your highest education" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="associate">Associate's Degree</SelectItem>
              <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
              <SelectItem value="master">Master's Degree</SelectItem>
              <SelectItem value="doctorate">PhD/Doctorate</SelectItem>
              <SelectItem value="professional">Professional Degree (MD, JD, etc.)</SelectItem>
              <SelectItem value="certification">Professional Certification</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="field">Field of Study/Specialization</Label>
          <Input
            id="field"
            placeholder="E.g. Computer Science, Medicine, Business"
            value={formValues.field}
            onChange={(e) => handleChange("field", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation">Current Occupation</Label>
          <Input
            id="occupation"
            placeholder="E.g. Software Engineer, Nurse, Teacher"
            value={formValues.occupation}
            onChange={(e) => handleChange("occupation", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearsExperience">Years of Work Experience</Label>
          <Input
            id="yearsExperience"
            type="number"
            placeholder="Enter years of experience"
            value={formValues.yearsExperience}
            onChange={(e) => handleChange("yearsExperience", parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-2">
          <Label>Languages Spoken</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="english" 
                checked={formValues.languages.includes("english")}
                onCheckedChange={() => handleLanguageChange("english")}
              />
              <Label htmlFor="english" className="font-normal">English</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="french" 
                checked={formValues.languages.includes("french")}
                onCheckedChange={() => handleLanguageChange("french")}
              />
              <Label htmlFor="french" className="font-normal">French</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="spanish" 
                checked={formValues.languages.includes("spanish")}
                onCheckedChange={() => handleLanguageChange("spanish")}
              />
              <Label htmlFor="spanish" className="font-normal">Spanish</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="german" 
                checked={formValues.languages.includes("german")}
                onCheckedChange={() => handleLanguageChange("german")}
              />
              <Label htmlFor="german" className="font-normal">German</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mandarin" 
                checked={formValues.languages.includes("mandarin")}
                onCheckedChange={() => handleLanguageChange("mandarin")}
              />
              <Label htmlFor="mandarin" className="font-normal">Mandarin</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="other-lang" 
                checked={formValues.languages.includes("other")}
                onCheckedChange={() => handleLanguageChange("other")}
              />
              <Label htmlFor="other-lang" className="font-normal">Other</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
