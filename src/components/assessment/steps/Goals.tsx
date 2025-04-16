
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Goals({ data, updateData }) {
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

  const handleCountryChange = (country) => {
    const updatedCountries = formValues.destinationCountries.includes(country)
      ? formValues.destinationCountries.filter((c) => c !== country)
      : [...formValues.destinationCountries, country];
    
    handleChange("destinationCountries", updatedCountries);
  };

  const handlePriorityChange = (priority) => {
    const updatedPriorities = formValues.priorities.includes(priority)
      ? formValues.priorities.filter((p) => p !== priority)
      : [...formValues.priorities, priority];
    
    handleChange("priorities", updatedPriorities);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-medium">Migration Goals & Priorities</h3>
        <p className="text-sm text-muted-foreground">
          Help us understand your migration objectives to provide the most relevant recommendations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Preferred Destination Countries</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Select up to 3 countries you're most interested in.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="canada" 
                checked={formValues.destinationCountries.includes("canada")}
                onCheckedChange={() => handleCountryChange("canada")}
                disabled={formValues.destinationCountries.length >= 3 && !formValues.destinationCountries.includes("canada")}
              />
              <Label htmlFor="canada" className="font-normal">Canada</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="australia" 
                checked={formValues.destinationCountries.includes("australia")}
                onCheckedChange={() => handleCountryChange("australia")}
                disabled={formValues.destinationCountries.length >= 3 && !formValues.destinationCountries.includes("australia")}
              />
              <Label htmlFor="australia" className="font-normal">Australia</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="uk" 
                checked={formValues.destinationCountries.includes("uk")}
                onCheckedChange={() => handleCountryChange("uk")}
                disabled={formValues.destinationCountries.length >= 3 && !formValues.destinationCountries.includes("uk")}
              />
              <Label htmlFor="uk" className="font-normal">United Kingdom</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="usa" 
                checked={formValues.destinationCountries.includes("usa")}
                onCheckedChange={() => handleCountryChange("usa")}
                disabled={formValues.destinationCountries.length >= 3 && !formValues.destinationCountries.includes("usa")}
              />
              <Label htmlFor="usa" className="font-normal">United States</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="germany" 
                checked={formValues.destinationCountries.includes("germany")}
                onCheckedChange={() => handleCountryChange("germany")}
                disabled={formValues.destinationCountries.length >= 3 && !formValues.destinationCountries.includes("germany")}
              />
              <Label htmlFor="germany" className="font-normal">Germany</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="newzealand" 
                checked={formValues.destinationCountries.includes("newzealand")}
                onCheckedChange={() => handleCountryChange("newzealand")}
                disabled={formValues.destinationCountries.length >= 3 && !formValues.destinationCountries.includes("newzealand")}
              />
              <Label htmlFor="newzealand" className="font-normal">New Zealand</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="singapore" 
                checked={formValues.destinationCountries.includes("singapore")}
                onCheckedChange={() => handleCountryChange("singapore")}
                disabled={formValues.destinationCountries.length >= 3 && !formValues.destinationCountries.includes("singapore")}
              />
              <Label htmlFor="singapore" className="font-normal">Singapore</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="other-country" 
                checked={formValues.destinationCountries.includes("other")}
                onCheckedChange={() => handleCountryChange("other")}
                disabled={formValues.destinationCountries.length >= 3 && !formValues.destinationCountries.includes("other")}
              />
              <Label htmlFor="other-country" className="font-normal">Other</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline for Migration</Label>
          <Select
            value={formValues.timeline}
            onValueChange={(value) => handleChange("timeline", value)}
          >
            <SelectTrigger id="timeline">
              <SelectValue placeholder="Select your timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">As soon as possible</SelectItem>
              <SelectItem value="6months">Within 6 months</SelectItem>
              <SelectItem value="1year">Within 1 year</SelectItem>
              <SelectItem value="2years">Within 2 years</SelectItem>
              <SelectItem value="flexible">Flexible / No specific timeline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Purpose of Migration</Label>
          <RadioGroup
            value={formValues.purposeOfMigration}
            onValueChange={(value) => handleChange("purposeOfMigration", value)}
            className="flex flex-col space-y-2 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="work" id="work" />
              <Label htmlFor="work" className="font-normal">Work Opportunity</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="education" id="education" />
              <Label htmlFor="education" className="font-normal">Education</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="family" id="family" />
              <Label htmlFor="family" className="font-normal">Family Reunification</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="investment" id="investment" />
              <Label htmlFor="investment" className="font-normal">Investment/Business</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="retirement" id="retirement" />
              <Label htmlFor="retirement" className="font-normal">Retirement</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lifestyle" id="lifestyle" />
              <Label htmlFor="lifestyle" className="font-normal">Lifestyle Change</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Top Priorities</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Select what matters most to you in your migration journey.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="speed" 
                checked={formValues.priorities.includes("speed")}
                onCheckedChange={() => handlePriorityChange("speed")}
              />
              <Label htmlFor="speed" className="font-normal">Processing Speed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="cost" 
                checked={formValues.priorities.includes("cost")}
                onCheckedChange={() => handlePriorityChange("cost")}
              />
              <Label htmlFor="cost" className="font-normal">Low Cost</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="simplicity" 
                checked={formValues.priorities.includes("simplicity")}
                onCheckedChange={() => handlePriorityChange("simplicity")}
              />
              <Label htmlFor="simplicity" className="font-normal">Simplicity</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="permanence" 
                checked={formValues.priorities.includes("permanence")}
                onCheckedChange={() => handlePriorityChange("permanence")}
              />
              <Label htmlFor="permanence" className="font-normal">Path to Permanence</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="family" 
                checked={formValues.priorities.includes("family")}
                onCheckedChange={() => handlePriorityChange("family")}
              />
              <Label htmlFor="family" className="font-normal">Family Friendly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="highApproval" 
                checked={formValues.priorities.includes("highApproval")}
                onCheckedChange={() => handlePriorityChange("highApproval")}
              />
              <Label htmlFor="highApproval" className="font-normal">High Approval Rate</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
