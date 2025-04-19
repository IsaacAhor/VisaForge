import { useState } from "react"; // Import useState for Calendar
import { useForm, Controller, SubmitHandler } from "react-hook-form"; // Import Controller
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // Import date-fns for formatting
import { CalendarIcon } from "lucide-react"; // Import icon
import { cn } from "@/lib/utils"; // Import cn utility
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"; // Import Input
import { Label } from "@/components/ui/label"; // Import Label
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Import Popover components
import { Calendar } from "@/components/ui/calendar"; // Import Calendar
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Import RadioGroup components
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox
import { Slider } from "@/components/ui/slider"; // Import Slider
import { Switch } from "@/components/ui/switch"; // Import Switch

// Define the type for your form data based on the specification
type Inputs = {
  // Section 1
  fullName: string;
  dateOfBirth?: Date; 
  nationality: string;
  currentResidence: string;
  // Section 2
  highestEducation: string;
  fieldOfStudy: string;
  // Section 3
  yearsExperience: string;
  industry: string;
  currentJobTitle: string;
  // Section 4
  takenLanguageTest: "yes" | "no";
  languageTestType?: string; 
  languageTestScore?: string; 
  // Section 5
  migrationGoals: string[]; 
  preferredCountry?: string; 
  // Section 6
  annualIncome: string;
  affordability: string;
  // Section 7
  livedAbroad: "yes" | "no";
  livedAbroadCountry?: string;
  livedAbroadDuration?: string;
  // Section 8
  documents: string[];
  // Section 9
  specialConsiderations: string[];
  // Section 10
  moveTimeline: string;
  urgency: number[]; 
  // Final Step
  userEmail: string; 
  downloadPdf: boolean; 
};

export function AssessmentForm() {
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<Inputs>({
    defaultValues: { 
      takenLanguageTest: "no",
      migrationGoals: [], 
      livedAbroad: "no", 
      documents: [], 
      specialConsiderations: [], 
      urgency: [5], 
      downloadPdf: false, 
    }
  }); 
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const processedData = { ...data, urgency: data.urgency[0] }; 
    console.log("Assessment Data:", processedData); 
    navigate("/pricing"); 
  };

  // Watch conditional fields
  const watchTakenLanguageTest = watch("takenLanguageTest");
  const watchLivedAbroad = watch("livedAbroad");

  // TODO: Populate these with actual lists
  const countryOptions = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "Other"]; 
  const educationLevels = ["High School", "Diploma / Vocational", "Bachelor’s Degree", "Master’s Degree", "PhD", "Other"];
  const experienceOptions = ["None", "0–1 year", "2–4 years", "5–9 years", "10+ years"];
  const industryOptions = ["Technology", "Healthcare", "Finance", "Education", "Manufacturing", "Retail", "Other"]; 
  const languageTestTypes = ["IELTS", "TOEFL", "Duolingo", "PTE Academic", "Other"]; 
  const goalOptions = [
    "Study", "Work", "Permanent Residency", "Business/Startup", 
    "Family Reunification", "Escape insecurity", "Better healthcare", 
    "Education for children"
  ];
  const incomeOptions = ["<$10k", "$10k–$25k", "$25k–$50k", "$50k–$100k", "$100k+"];
  const affordabilityOptions = ["<$2,000", "$2,000–$5,000", "$5,000–$10,000", "$10,000+"];
  const durationOptions = ["Less than 6 months", "6-12 months", "1-2 years", "2-5 years", "5+ years"]; 
  const documentOptions = [
    "International Passport", "Proof of Funds", "Bank Statement", "Transcripts", 
    "Degree Certificate", "IELTS/TOEFL Results", "Letter of Recommendation", 
    "Work Reference", "Police Clearance", "Resume/CV"
  ];
  const considerationOptions = [
    "Criminal record", "Visa denials", "Medical condition needing support", 
    "Disability", "Dependent children", "Spouse/partner to migrate with"
  ];
  const timelineOptions = ["As soon as possible", "Within 6 months", "6–12 months", "1–2 years", "No fixed timeline"];

  return (
    <div className="container max-w-3xl px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="border-border">
          <CardHeader> 
            <CardTitle className="text-2xl font-bold">VisaForge Assessment Form</CardTitle>
            <CardDescription>
              Discover your optimal path to living abroad — including visa eligibility, 
              costs, timeline, and fallback routes.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-8"> 
            
            {/* SECTION 1: Personal Background */}
            <div>
              <h2 className="text-xl font-semibold mb-6">🧭 SECTION 1: Personal Background</h2>
              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" {...register("fullName", { required: "Full name is required" })} />
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            captionLayout="dropdown-buttons" 
                            fromYear={1920} 
                            toYear={new Date().getFullYear()} 
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                   {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>}
                </div>

                {/* Nationality */}
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                   <Controller
                    name="nationality"
                    control={control}
                    rules={{ required: "Nationality is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="nationality">
                          <SelectValue placeholder="Select your nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.nationality && <p className="text-sm text-destructive">{errors.nationality.message}</p>}
                </div>

                 {/* Current Country of Residence */}
                 <div className="space-y-2">
                  <Label htmlFor="currentResidence">Current Country of Residence</Label>
                   <Controller
                    name="currentResidence"
                    control={control}
                    rules={{ required: "Current residence is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="currentResidence">
                          <SelectValue placeholder="Select your country of residence" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.currentResidence && <p className="text-sm text-destructive">{errors.currentResidence.message}</p>}
                </div>
              </div>
              <Separator className="my-6" /> 
            </div>

            {/* SECTION 2: Education */}
            <div>
              <h2 className="text-xl font-semibold mb-6">🎓 SECTION 2: Education</h2>
              <div className="space-y-4">
                 {/* Highest Level of Education */}
                 <div className="space-y-2">
                  <Label htmlFor="highestEducation">Highest Level of Education</Label>
                   <Controller
                    name="highestEducation"
                    control={control}
                    rules={{ required: "Education level is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="highestEducation">
                          <SelectValue placeholder="Select your highest education level" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationLevels.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.highestEducation && <p className="text-sm text-destructive">{errors.highestEducation.message}</p>}
                </div>

                {/* Field of Study */}
                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy">Field of Study</Label>
                  <Input id="fieldOfStudy" {...register("fieldOfStudy", { required: "Field of study is required" })} placeholder="e.g., Computer Science, Engineering, Arts" />
                  {errors.fieldOfStudy && <p className="text-sm text-destructive">{errors.fieldOfStudy.message}</p>}
                </div>
              </div>
              <Separator className="my-6" />
            </div>

            {/* SECTION 3: Work Experience */}
            <div>
              <h2 className="text-xl font-semibold mb-6">💼 SECTION 3: Work Experience</h2>
              <div className="space-y-4">
                {/* Years of Full-Time Work Experience */}
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience">Years of Full-Time Work Experience</Label>
                   <Controller
                    name="yearsExperience"
                    control={control}
                    rules={{ required: "Work experience is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="yearsExperience">
                          <SelectValue placeholder="Select your years of experience" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.yearsExperience && <p className="text-sm text-destructive">{errors.yearsExperience.message}</p>}
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                   <Controller
                    name="industry"
                    control={control}
                    rules={{ required: "Industry is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.industry && <p className="text-sm text-destructive">{errors.industry.message}</p>}
                </div>

                {/* Current Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="currentJobTitle">Current Job Title</Label>
                  <Input id="currentJobTitle" {...register("currentJobTitle", { required: "Job title is required" })} placeholder="e.g., Software Engineer, Teacher, Manager" />
                  {errors.currentJobTitle && <p className="text-sm text-destructive">{errors.currentJobTitle.message}</p>}
                </div>
              </div>
              <Separator className="my-6" />
            </div>

            {/* SECTION 4: Language & Tests */}
            <div>
              <h2 className="text-xl font-semibold mb-6">🗣️ SECTION 4: Language & Tests</h2>
              <div className="space-y-4">
                {/* Taken Language Test Radio */}
                <div className="space-y-2">
                   <Label>Have you taken any language proficiency tests?</Label>
                   <Controller
                    name="takenLanguageTest"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4 pt-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="langTestYes" />
                          <Label htmlFor="langTestYes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="langTestNo" />
                          <Label htmlFor="langTestNo">No</Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                </div>

                {/* Conditional Fields */}
                {watchTakenLanguageTest === "yes" && (
                  <>
                    {/* Test Type */}
                    <div className="space-y-2">
                      <Label htmlFor="languageTestType">Test Type</Label>
                      <Controller
                        name="languageTestType"
                        control={control}
                        rules={{ required: watchTakenLanguageTest === "yes" ? "Test type is required" : false }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger id="languageTestType">
                              <SelectValue placeholder="Select test type" />
                            </SelectTrigger>
                            <SelectContent>
                              {languageTestTypes.map(option => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.languageTestType && <p className="text-sm text-destructive">{errors.languageTestType.message}</p>}
                    </div>

                    {/* Score */}
                    <div className="space-y-2">
                      <Label htmlFor="languageTestScore">Score</Label>
                      <Input 
                        id="languageTestScore" 
                        {...register("languageTestScore", { required: watchTakenLanguageTest === "yes" ? "Score is required" : false })} 
                        placeholder="e.g., IELTS 7.5, TOEFL 100" 
                      />
                      {errors.languageTestScore && <p className="text-sm text-destructive">{errors.languageTestScore.message}</p>}
                    </div>
                  </>
                )}
              </div>
              <Separator className="my-6" />
            </div>

            {/* SECTION 5: Migration Intent & Goals */}
            <div>
              <h2 className="text-xl font-semibold mb-6">🎯 SECTION 5: Migration Intent & Goals</h2>
              <div className="space-y-4">
                {/* Main Goal */}
                <div className="space-y-2">
                  <Label>What is your main goal for moving abroad?</Label>
                  <Controller
                    name="migrationGoals"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                        {goalOptions.map((goal) => (
                          <div key={goal} className="flex items-center space-x-2">
                            <Checkbox
                              id={`goal-${goal}`}
                              checked={field.value?.includes(goal)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), goal])
                                  : field.onChange(field.value?.filter((value) => value !== goal));
                              }}
                            />
                            <Label htmlFor={`goal-${goal}`} className="font-normal">{goal}</Label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                   {errors.migrationGoals && <p className="text-sm text-destructive">{errors.migrationGoals.message}</p>}
                </div>

                {/* Preferred Countries (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="preferredCountry">Preferred Countries (Optional)</Label>
                   <Controller
                    name="preferredCountry" // Using single select for now
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="preferredCountry">
                          <SelectValue placeholder="Select a preferred country (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {/* No error message as it's optional */}
                </div>
              </div>
              <Separator className="my-6" />
            </div>

            {/* SECTION 6: Financials */}
            <div>
              <h2 className="text-xl font-semibold mb-6">💸 SECTION 6: Financials</h2>
               <div className="space-y-4">
                 {/* Approximate Annual Income */}
                 <div className="space-y-2">
                  <Label htmlFor="annualIncome">Approximate Annual Income (USD)</Label>
                   <Controller
                    name="annualIncome"
                    control={control}
                    rules={{ required: "Annual income is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="annualIncome">
                          <SelectValue placeholder="Select your income range" />
                        </SelectTrigger>
                        <SelectContent>
                          {incomeOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.annualIncome && <p className="text-sm text-destructive">{errors.annualIncome.message}</p>}
                </div>

                {/* Affordability */}
                <div className="space-y-2">
                  <Label htmlFor="affordability">How much can you afford for the process? (USD)</Label>
                   <Controller
                    name="affordability"
                    control={control}
                    rules={{ required: "Affordability is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="affordability">
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {affordabilityOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.affordability && <p className="text-sm text-destructive">{errors.affordability.message}</p>}
                </div>
              </div>
              <Separator className="my-6" />
            </div>

            {/* SECTION 7: Travel History */}
            <div>
              <h2 className="text-xl font-semibold mb-6">🏠 SECTION 7: Travel History</h2>
              <div className="space-y-4">
                {/* Lived Abroad Radio */}
                <div className="space-y-2">
                   <Label>Have you ever lived outside your home country?</Label>
                   <Controller
                    name="livedAbroad"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4 pt-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="livedAbroadYes" />
                          <Label htmlFor="livedAbroadYes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="livedAbroadNo" />
                          <Label htmlFor="livedAbroadNo">No</Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                </div>

                {/* Conditional Fields */}
                {watchLivedAbroad === "yes" && (
                  <>
                    {/* Country */}
                    <div className="space-y-2">
                      <Label htmlFor="livedAbroadCountry">Country</Label>
                      <Input 
                        id="livedAbroadCountry" 
                        {...register("livedAbroadCountry", { required: watchLivedAbroad === "yes" ? "Country is required" : false })} 
                        placeholder="Enter country name" 
                      />
                      {errors.livedAbroadCountry && <p className="text-sm text-destructive">{errors.livedAbroadCountry.message}</p>}
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                      <Label htmlFor="livedAbroadDuration">Duration</Label>
                      <Controller
                        name="livedAbroadDuration"
                        control={control}
                        rules={{ required: watchLivedAbroad === "yes" ? "Duration is required" : false }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger id="livedAbroadDuration">
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              {durationOptions.map(option => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.livedAbroadDuration && <p className="text-sm text-destructive">{errors.livedAbroadDuration.message}</p>}
                    </div>
                  </>
                )}
              </div>
              <Separator className="my-6" />
            </div>

            {/* SECTION 8: Documents You Already Have */}
            <div>
              <h2 className="text-xl font-semibold mb-6">🧾 SECTION 8: Documents You Already Have</h2>
              <div className="space-y-2">
                 <Label>Pick the documents you currently have:</Label>
                 <Controller
                    name="documents"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                        {documentOptions.map((doc) => (
                          <div key={doc} className="flex items-center space-x-2">
                            <Checkbox
                              id={`doc-${doc}`}
                              checked={field.value?.includes(doc)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), doc])
                                  : field.onChange(field.value?.filter((value) => value !== doc));
                              }}
                            />
                            <Label htmlFor={`doc-${doc}`} className="font-normal">{doc}</Label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  {errors.documents && <p className="text-sm text-destructive">{errors.documents.message}</p>}
              </div>
              <Separator className="my-6" />
            </div>

            {/* SECTION 9: Special Considerations */}
            <div>
              <h2 className="text-xl font-semibold mb-6">🚨 SECTION 9: Special Considerations</h2>
               <div className="space-y-2">
                 <Label>Do you have any of the following:</Label>
                 <Controller
                    name="specialConsiderations"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                        {considerationOptions.map((item) => (
                          <div key={item} className="flex items-center space-x-2">
                            <Checkbox
                              id={`consideration-${item}`}
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item])
                                  : field.onChange(field.value?.filter((value) => value !== item));
                              }}
                            />
                            <Label htmlFor={`consideration-${item}`} className="font-normal">{item}</Label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  {errors.specialConsiderations && <p className="text-sm text-destructive">{errors.specialConsiderations.message}</p>}
              </div>
              <Separator className="my-6" />
            </div>

            {/* SECTION 10: Timing & Urgency */}
            <div>
              <h2 className="text-xl font-semibold mb-6">🧠 SECTION 10: Timing & Urgency</h2>
              <div className="space-y-4">
                 {/* When do you plan to move? */}
                 <div className="space-y-2">
                  <Label htmlFor="moveTimeline">When do you plan to move?</Label>
                   <Controller
                    name="moveTimeline"
                    control={control}
                    rules={{ required: "Timeline is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="moveTimeline">
                          <SelectValue placeholder="Select your planned timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.moveTimeline && <p className="text-sm text-destructive">{errors.moveTimeline.message}</p>}
                </div>

                {/* How urgent is your migration plan? */}
                <div className="space-y-2">
                  <Label htmlFor="urgency">How urgent is your migration plan? (Low to High)</Label>
                  <Controller
                    name="urgency"
                    control={control}
                    render={({ field }) => (
                      <Slider
                        id="urgency"
                        min={1}
                        max={10}
                        step={1}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        className="pt-2"
                      />
                    )}
                  />
                  {/* Display current value? Maybe add later */}
                </div>
              </div>
              <Separator className="my-6" />
            </div>

             {/* Final Step */}
             <div>
              <h2 className="text-xl font-semibold mb-6">✅ Final Step</h2>
               <div className="space-y-4">
                 {/* Enter Your Email */}
                 <div className="space-y-2">
                  <Label htmlFor="userEmail">Enter Your Email</Label>
                  <Input 
                    id="userEmail" 
                    type="email" 
                    {...register("userEmail", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      } 
                    })} 
                    placeholder="your.email@example.com" 
                  />
                  {errors.userEmail && <p className="text-sm text-destructive">{errors.userEmail.message}</p>}
                </div>

                {/* Download PDF Toggle */}
                <div className="flex items-center space-x-2 pt-2">
                   <Controller
                    name="downloadPdf"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="downloadPdf"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="downloadPdf">Would you like a downloadable PDF of your plan?</Label>
                </div>
              </div>
              {/* No separator after the final step */}
            </div>

            {/* Submission Button */}
            <div className="flex justify-end mt-8">
              <Button type="submit">
                Submit Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
