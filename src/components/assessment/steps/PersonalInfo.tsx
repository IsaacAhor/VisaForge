
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function PersonalInfo({ data, updateData }) {
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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-medium">Personal Information</h3>
        <p className="text-sm text-muted-foreground">
          Please provide your basic personal details to help us assess your eligibility.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality/Passport</Label>
            <Select
              value={formValues.nationality}
              onValueChange={(value) => handleChange("nationality", value)}
            >
              <SelectTrigger id="nationality">
                <SelectValue placeholder="Select your nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="ng">Nigeria</SelectItem>
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={formValues.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Marital Status</Label>
          <RadioGroup
            value={formValues.maritalStatus}
            onValueChange={(value) => handleChange("maritalStatus", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" />
              <Label htmlFor="single">Single</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="married" id="married" />
              <Label htmlFor="married">Married</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="divorced" id="divorced" />
              <Label htmlFor="divorced">Divorced</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="widowed" id="widowed" />
              <Label htmlFor="widowed">Widowed</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="familyMembers">Number of Dependents</Label>
            <Input
              id="familyMembers"
              type="number"
              placeholder="Enter number of dependents"
              value={formValues.familyMembers}
              onChange={(e) => handleChange("familyMembers", parseInt(e.target.value) || 0)}
            />
            <p className="text-sm text-muted-foreground">
              Include spouse and children who would migrate with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
