
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define a more comprehensive list of nationalities
const nationalities = [
  { value: "af", label: "Afghan" }, { value: "al", label: "Albanian" }, { value: "dz", label: "Algerian" },
  { value: "ad", label: "Andorran" }, { value: "ao", label: "Angolan" }, { value: "ag", label: "Antiguan and Barbudan" },
  { value: "ar", label: "Argentine" }, { value: "am", label: "Armenian" }, { value: "au", label: "Australian" },
  { value: "at", label: "Austrian" }, { value: "az", label: "Azerbaijani" }, { value: "bs", label: "Bahamian" },
  { value: "bh", label: "Bahraini" }, { value: "bd", label: "Bangladeshi" }, { value: "bb", label: "Barbadian" },
  { value: "by", label: "Belarusian" }, { value: "be", label: "Belgian" }, { value: "bz", label: "Belizean" },
  { value: "bj", label: "Beninese" }, { value: "bt", label: "Bhutanese" }, { value: "bo", label: "Bolivian" },
  { value: "ba", label: "Bosnian and Herzegovinian" }, { value: "bw", label: "Botswanan" }, { value: "br", label: "Brazilian" },
  { value: "bn", label: "Bruneian" }, { value: "bg", label: "Bulgarian" }, { value: "bf", label: "Burkinabe" },
  { value: "bi", label: "Burundian" }, { value: "kh", label: "Cambodian" }, { value: "cm", label: "Cameroonian" },
  { value: "ca", label: "Canadian" }, { value: "cv", label: "Cape Verdean" }, { value: "cf", label: "Central African" },
  { value: "td", label: "Chadian" }, { value: "cl", label: "Chilean" }, { value: "cn", label: "Chinese" },
  { value: "co", label: "Colombian" }, { value: "km", label: "Comoran" }, { value: "cg", label: "Congolese (Congo-Brazzaville)" },
  { value: "cd", label: "Congolese (DRC)" }, { value: "cr", label: "Costa Rican" }, { value: "hr", label: "Croatian" },
  { value: "cu", label: "Cuban" }, { value: "cy", label: "Cypriot" }, { value: "cz", label: "Czech" },
  { value: "dk", label: "Danish" }, { value: "dj", label: "Djiboutian" }, { value: "dm", label: "Dominican (Commonwealth)" },
  { value: "do", label: "Dominican (Republic)" }, { value: "ec", label: "Ecuadorian" }, { value: "eg", label: "Egyptian" },
  { value: "sv", label: "Salvadoran" }, { value: "gq", label: "Equatorial Guinean" }, { value: "er", label: "Eritrean" },
  { value: "ee", label: "Estonian" }, { value: "sz", label: "Eswatini / Swazi" }, { value: "et", label: "Ethiopian" },
  { value: "fj", label: "Fijian" }, { value: "fi", label: "Finnish" }, { value: "fr", label: "French" },
  { value: "ga", label: "Gabonese" }, { value: "gm", label: "Gambian" }, { value: "ge", label: "Georgian" },
  { value: "de", label: "German" }, { value: "gh", label: "Ghanaian" }, { value: "gr", label: "Greek" },
  { value: "gd", label: "Grenadian" }, { value: "gt", label: "Guatemalan" }, { value: "gn", label: "Guinean" },
  { value: "gw", label: "Guinea-Bissauan" }, { value: "gy", label: "Guyanese" }, { value: "ht", label: "Haitian" },
  { value: "hn", label: "Honduran" }, { value: "hu", label: "Hungarian" }, { value: "is", label: "Icelander" },
  { value: "in", label: "Indian" }, { value: "id", label: "Indonesian" }, { value: "ir", label: "Iranian" },
  { value: "iq", label: "Iraqi" }, { value: "ie", label: "Irish" }, { value: "il", label: "Israeli" },
  { value: "it", label: "Italian" }, { value: "ci", label: "Ivorian" }, { value: "jm", label: "Jamaican" },
  { value: "jp", label: "Japanese" }, { value: "jo", label: "Jordanian" }, { value: "kz", label: "Kazakhstani" },
  { value: "ke", label: "Kenyan" }, { value: "ki", label: "Kiribati" }, { value: "kw", label: "Kuwaiti" },
  { value: "kg", label: "Kyrgyz" }, { value: "la", label: "Laotian" }, { value: "lv", label: "Latvian" },
  { value: "lb", label: "Lebanese" }, { value: "ls", label: "Lesotho" }, { value: "lr", label: "Liberian" },
  { value: "ly", label: "Libyan" }, { value: "li", label: "Liechtensteiner" }, { value: "lt", label: "Lithuanian" },
  { value: "lu", label: "Luxembourger" }, { value: "mg", label: "Malagasy" }, { value: "mw", label: "Malawian" },
  { value: "my", label: "Malaysian" }, { value: "mv", label: "Maldivian" }, { value: "ml", label: "Malian" },
  { value: "mt", label: "Maltese" }, { value: "mh", label: "Marshallese" }, { value: "mr", label: "Mauritanian" },
  { value: "mu", label: "Mauritian" }, { value: "mx", label: "Mexican" }, { value: "fm", label: "Micronesian" },
  { value: "md", label: "Moldovan" }, { value: "mc", label: "Monacan" }, { value: "mn", label: "Mongolian" },
  { value: "me", label: "Montenegrin" }, { value: "ma", label: "Moroccan" }, { value: "mz", label: "Mozambican" },
  { value: "mm", label: "Myanmar (Burmese)" }, { value: "na", label: "Namibian" }, { value: "nr", label: "Nauruan" },
  { value: "np", label: "Nepalese" }, { value: "nl", label: "Dutch" }, { value: "nz", label: "New Zealander" },
  { value: "ni", label: "Nicaraguan" }, { value: "ne", label: "Nigerien" }, { value: "ng", label: "Nigerian" },
  { value: "kp", label: "North Korean" }, { value: "mk", label: "North Macedonian" }, { value: "no", label: "Norwegian" },
  { value: "om", label: "Omani" }, { value: "pk", label: "Pakistani" }, { value: "pw", label: "Palauan" },
  { value: "ps", label: "Palestinian" }, { value: "pa", label: "Panamanian" }, { value: "pg", label: "Papua New Guinean" },
  { value: "py", label: "Paraguayan" }, { value: "pe", label: "Peruvian" }, { value: "ph", label: "Filipino" },
  { value: "pl", label: "Polish" }, { value: "pt", label: "Portuguese" }, { value: "qa", label: "Qatari" },
  { value: "ro", label: "Romanian" }, { value: "ru", label: "Russian" }, { value: "rw", label: "Rwandan" },
  { value: "kn", label: "Saint Kitts and Nevis" }, { value: "lc", label: "Saint Lucian" }, { value: "vc", label: "Saint Vincent and the Grenadines" },
  { value: "ws", label: "Samoan" }, { value: "sm", label: "San Marinese" }, { value: "st", label: "Sao Tomean" },
  { value: "sa", label: "Saudi Arabian" }, { value: "sn", label: "Senegalese" }, { value: "rs", label: "Serbian" },
  { value: "sc", label: "Seychellois" }, { value: "sl", label: "Sierra Leonean" }, { value: "sg", label: "Singaporean" },
  { value: "sk", label: "Slovak" }, { value: "si", label: "Slovenian" }, { value: "sb", label: "Solomon Islander" },
  { value: "so", label: "Somali" }, { value: "za", label: "South African" }, { value: "kr", label: "South Korean" },
  { value: "ss", label: "South Sudanese" }, { value: "es", label: "Spanish" }, { value: "lk", label: "Sri Lankan" },
  { value: "sd", label: "Sudanese" }, { value: "sr", label: "Surinamer" }, { value: "se", label: "Swedish" },
  { value: "ch", label: "Swiss" }, { value: "sy", label: "Syrian" }, { value: "tw", label: "Taiwanese" },
  { value: "tj", label: "Tadzhik" }, { value: "tz", label: "Tanzanian" }, { value: "th", label: "Thai" },
  { value: "tl", label: "Timorese" }, { value: "tg", label: "Togolese" }, { value: "to", label: "Tongan" },
  { value: "tt", label: "Trinidadian or Tobagonian" }, { value: "tn", label: "Tunisian" }, { value: "tr", label: "Turkish" },
  { value: "tm", label: "Turkmen" }, { value: "tv", label: "Tuvaluan" }, { value: "ug", label: "Ugandan" },
  { value: "ua", label: "Ukrainian" }, { value: "ae", label: "Emirati" }, { value: "gb", label: "British" },
  { value: "us", label: "American" }, { value: "uy", label: "Uruguayan" }, { value: "uz", label: "Uzbekistani" },
  { value: "vu", label: "Vanuatuan" }, { value: "ve", label: "Venezuelan" }, { value: "vn", label: "Vietnamese" },
  { value: "ye", label: "Yemenite" }, { value: "zm", label: "Zambian" }, { value: "zw", label: "Zimbabwean" },
  { value: "other", label: "Other" },
];

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
                {/* Map over the nationalities array to create SelectItem components */}
                {nationalities.map((nat) => (
                  <SelectItem key={nat.value} value={nat.value}>
                    {nat.label}
                  </SelectItem>
                ))}
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
