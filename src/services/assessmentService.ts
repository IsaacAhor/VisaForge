import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import type { Inputs as AssessmentFormData } from '@/components/assessment/AssessmentForm'; // Assuming Inputs type is exported

// Define the type for the data to be inserted, mapping form data to table columns
type MigrationPlanInsert = Database['public']['Tables']['migration_plans']['Insert'];

// Function to save assessment data to the migration_plans table
export const saveAssessmentData = async (
  userId: string,
  formData: AssessmentFormData
): Promise<{ success: boolean; error?: Error | null; planId?: string }> => {
  
  // Map form data to the migration_plans structure
  // Store most fields in the 'data' JSONB column
  const planData: Omit<MigrationPlanInsert, 'user_id' | 'id' | 'created_at' | 'updated_at' | 'status' | 'fallback_countries' | 'primary_country' | 'title'> = {
    // Map specific fields if needed, otherwise rely on JSON 'data' field
    // Example: primary_country: formData.preferredCountry || 'Default Country', 
  };

  // Construct the JSON data blob
  const jsonData = {
    fullName: formData.fullName,
    dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toISOString() : null,
    nationality: formData.nationality,
    currentResidence: formData.currentResidence,
    highestEducation: formData.highestEducation,
    fieldOfStudy: formData.fieldOfStudy,
    yearsExperience: formData.yearsExperience,
    industry: formData.industry,
    currentJobTitle: formData.currentJobTitle,
    takenLanguageTest: formData.takenLanguageTest,
    languageTestType: formData.languageTestType,
    languageTestScore: formData.languageTestScore,
    migrationGoals: formData.migrationGoals,
    // preferredCountry is mapped to primary_country column
    annualIncome: formData.annualIncome,
    affordability: formData.affordability,
    livedAbroad: formData.livedAbroad,
    livedAbroadCountry: formData.livedAbroadCountry,
    livedAbroadDuration: formData.livedAbroadDuration,
    documents: formData.documents,
    specialConsiderations: formData.specialConsiderations,
    moveTimeline: formData.moveTimeline,
    urgency: formData.urgency[0], // Assuming single value from slider
    userEmail: formData.userEmail, // Store email submitted in form
    downloadPdf: formData.downloadPdf,
  };


  const insertPayload: MigrationPlanInsert = {
    user_id: userId,
    title: `${formData.fullName}'s Plan` || 'Untitled Migration Plan', // Use full name for title
    primary_country: formData.preferredCountry || 'Not Specified', // Use preferred country
    // fallback_countries: [], // Not collected in form yet
    status: 'draft', // Default status
    data: jsonData, // Store the rest of the form data
    ...planData // Include any other directly mapped fields if defined above
  };

  try {
    const { data: insertedData, error } = await supabase
      .from('migration_plans')
      .insert(insertPayload)
      .select('id') // Select the ID of the newly created plan
      .single(); // Expecting a single record back

    if (error) {
      console.error('Error saving assessment data:', error);
      return { success: false, error };
    }

    console.log('Assessment data saved successfully:', insertedData);
    return { success: true, planId: insertedData?.id };

  } catch (err) {
    console.error('Unexpected error saving assessment:', err);
    const error = err instanceof Error ? err : new Error('An unexpected error occurred');
    return { success: false, error };
  }
};
