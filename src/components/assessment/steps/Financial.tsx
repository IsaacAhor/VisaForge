
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function Financial({ data, updateData }) {
  const [formValues, setFormValues] = useState(data);
  const [currency, setCurrency] = useState("usd");

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
        <h3 className="text-xl font-medium">Financial Information</h3>
        <p className="text-sm text-muted-foreground">
          Your financial status is an important factor in many visa applications.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD ($)</SelectItem>
              <SelectItem value="eur">EUR (€)</SelectItem>
              <SelectItem value="gbp">GBP (£)</SelectItem>
              <SelectItem value="cad">CAD ($)</SelectItem>
              <SelectItem value="aud">AUD ($)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="annualIncome">Annual Income</Label>
            <span className="text-muted-foreground">{currency.toUpperCase()}: {formValues.annualIncome.toLocaleString()}</span>
          </div>
          <Slider
            id="annualIncome"
            defaultValue={[formValues.annualIncome]}
            max={200000}
            step={1000}
            onValueChange={(values) => handleChange("annualIncome", values[0])}
            className="py-4"
          />
          <Input
            type="number"
            value={formValues.annualIncome}
            onChange={(e) => handleChange("annualIncome", parseInt(e.target.value) || 0)}
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="savings">Liquid Savings</Label>
            <span className="text-muted-foreground">{currency.toUpperCase()}: {formValues.savings.toLocaleString()}</span>
          </div>
          <Slider
            id="savings"
            defaultValue={[formValues.savings]}
            max={500000}
            step={5000}
            onValueChange={(values) => handleChange("savings", values[0])}
            className="py-4"
          />
          <Input
            type="number"
            value={formValues.savings}
            onChange={(e) => handleChange("savings", parseInt(e.target.value) || 0)}
            className="mt-2"
          />
          <p className="text-sm text-muted-foreground">
            Cash or easily liquidated investments available for your migration.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="assets">Total Assets</Label>
            <span className="text-muted-foreground">{currency.toUpperCase()}: {formValues.assets.toLocaleString()}</span>
          </div>
          <Slider
            id="assets"
            defaultValue={[formValues.assets]}
            max={2000000}
            step={10000}
            onValueChange={(values) => handleChange("assets", values[0])}
            className="py-4"
          />
          <Input
            type="number"
            value={formValues.assets}
            onChange={(e) => handleChange("assets", parseInt(e.target.value) || 0)}
            className="mt-2"
          />
          <p className="text-sm text-muted-foreground">
            Include property, investments, and other significant assets.
          </p>
        </div>
      </div>
    </div>
  );
}
