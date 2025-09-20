import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Upload,
  FileCheck,
  Search,
  Eye
} from "lucide-react";
import { useState } from "react";

interface ValidationResult {
  field: string;
  status: "valid" | "warning" | "error";
  message: string;
}

interface FormData {
  animalId: string;
  breedName: string;
  animalType: string;
  age: string;
  weight: string;
  milkYield: string;
  region: string;
  color: string;
  hornShape: string;
  bodySize: string;
}

const Validation = () => {
  const [formData, setFormData] = useState<FormData>({
    animalId: "",
    breedName: "",
    animalType: "",
    age: "",
    weight: "",
    milkYield: "",
    region: "",
    color: "",
    hornShape: "",
    bodySize: "",
  });

  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = async () => {
    setIsValidating(true);
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const results: ValidationResult[] = [];
    
    // Animal ID validation
    if (!formData.animalId) {
      results.push({
        field: "Animal ID",
        status: "error",
        message: "Animal ID is required for registration"
      });
    } else if (formData.animalId.length < 6) {
      results.push({
        field: "Animal ID", 
        status: "warning",
        message: "Animal ID should be at least 6 characters"
      });
    } else {
      results.push({
        field: "Animal ID",
        status: "valid",
        message: "Valid animal identification format"
      });
    }

    // Breed validation
    if (!formData.breedName) {
      results.push({
        field: "Breed Name",
        status: "error", 
        message: "Breed name is required"
      });
    } else {
      // Check against common breeds
      const commonBreeds = ["Gir", "Sahiwal", "Red Sindhi", "Kankrej", "Murrah", "Nili-Ravi"];
      if (commonBreeds.includes(formData.breedName)) {
        results.push({
          field: "Breed Name",
          status: "valid",
          message: "Recognized breed in database"
        });
      } else {
        results.push({
          field: "Breed Name", 
          status: "warning",
          message: "Breed not found in common breeds database. Please verify."
        });
      }
    }

    // Age validation
    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) > 20)) {
      results.push({
        field: "Age",
        status: "warning",
        message: "Please verify age - seems unusually high for livestock"
      });
    } else if (formData.age) {
      results.push({
        field: "Age",
        status: "valid",
        message: "Age within expected range"
      });
    }

    // Weight validation
    if (formData.weight && formData.animalType) {
      const weight = Number(formData.weight);
      if (formData.animalType === "Cattle" && (weight < 200 || weight > 800)) {
        results.push({
          field: "Weight",
          status: "warning", 
          message: "Weight outside typical range for cattle (200-800 kg)"
        });
      } else if (formData.animalType === "Buffalo" && (weight < 300 || weight > 1000)) {
        results.push({
          field: "Weight",
          status: "warning",
          message: "Weight outside typical range for buffalo (300-1000 kg)"
        });
      } else if (weight > 0) {
        results.push({
          field: "Weight",
          status: "valid",
          message: "Weight within expected range"
        });
      }
    }

    // Milk yield validation
    if (formData.milkYield) {
      const milkYieldValue = Number(formData.milkYield);
      if (milkYieldValue > 50) {
        results.push({
          field: "Milk Yield",
          status: "warning",
          message: "Milk yield seems exceptionally high. Please verify."
        });
      } else if (milkYieldValue > 0) {
        results.push({
          field: "Milk Yield",
          status: "valid", 
          message: "Milk yield within normal range"
        });
      }
    }

    // Region cross-check
    if (formData.region && formData.breedName) {
      const breedRegions: { [key: string]: string[] } = {
        "Gir": ["Gujarat", "Rajasthan"],
        "Sahiwal": ["Punjab", "Haryana"],
        "Red Sindhi": ["Sindh", "Rajasthan"],
        "Kankrej": ["Gujarat", "Rajasthan"],
        "Murrah": ["Haryana", "Punjab"],
        "Nili-Ravi": ["Punjab"]
      };
      
      const expectedRegions = breedRegions[formData.breedName];
      if (expectedRegions && !expectedRegions.includes(formData.region)) {
        results.push({
          field: "Region",
          status: "warning",
          message: `${formData.breedName} is typically found in ${expectedRegions.join(", ")}. Please verify location.`
        });
      } else if (expectedRegions) {
        results.push({
          field: "Region",
          status: "valid", 
          message: "Region matches breed's typical distribution"
        });
      }
    }

    setValidationResults(results);
    setIsValidating(false);
    
    // Check if form is valid (no errors)
    const hasErrors = results.some(r => r.status === "error");
    setIsFormValid(!hasErrors && results.length > 0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid": return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "error": return <XCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "border-success/20 bg-success/5";
      case "warning": return "border-warning/20 bg-warning/5";
      case "error": return "border-destructive/20 bg-destructive/5";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Header Section */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Data Validation Tools
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Cross-check entered breed data against common traits and characteristics 
            before submission to ensure accuracy and consistency.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  Animal Registration Data
                </CardTitle>
                <CardDescription>
                  Enter the animal details to validate against breed standards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="animalId">Animal ID *</Label>
                    <Input
                      id="animalId"
                      placeholder="e.g., BP2024001"
                      value={formData.animalId}
                      onChange={(e) => handleInputChange("animalId", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="breedName">Breed Name *</Label>
                    <Input
                      id="breedName"
                      placeholder="e.g., Gir"
                      value={formData.breedName}
                      onChange={(e) => handleInputChange("breedName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="animalType">Animal Type</Label>
                    <select
                      id="animalType"
                      value={formData.animalType}
                      onChange={(e) => handleInputChange("animalType", e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                    >
                      <option value="">Select type</option>
                      <option value="Cattle">Cattle</option>
                      <option value="Buffalo">Buffalo</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 3"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 450"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="milkYield">Milk Yield (L/day)</Label>
                    <Input
                      id="milkYield"
                      type="number"
                      placeholder="e.g., 12"
                      value={formData.milkYield}
                      onChange={(e) => handleInputChange("milkYield", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    placeholder="e.g., Gujarat"
                    value={formData.region}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="color">Color Pattern</Label>
                    <Input
                      id="color"
                      placeholder="e.g., White with red patches"
                      value={formData.color}
                      onChange={(e) => handleInputChange("color", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hornShape">Horn Shape</Label>
                    <Input
                      id="hornShape"
                      placeholder="e.g., Lyre-shaped"
                      value={formData.hornShape}
                      onChange={(e) => handleInputChange("hornShape", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bodySize">Body Size</Label>
                    <select
                      id="bodySize"
                      value={formData.bodySize}
                      onChange={(e) => handleInputChange("bodySize", e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                    >
                      <option value="">Select size</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>
                </div>

                <Button
                  onClick={validateForm}
                  disabled={isValidating}
                  className="w-full gradient-primary text-primary-foreground"
                >
                  {isValidating ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Validate Data
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Validation Results */}
          <div className="space-y-6">
            {validationResults.length > 0 && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Validation Results
                  </CardTitle>
                  <CardDescription>
                    Data verification against breed standards and common patterns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {validationResults.map((result, index) => (
                    <Alert key={index} className={`${getStatusColor(result.status)} border`}>
                      <div className="flex items-start gap-3">
                        {getStatusIcon(result.status)}
                        <div className="flex-1">
                          <div className="font-medium text-sm">{result.field}</div>
                          <AlertDescription className="text-xs mt-1">
                            {result.message}
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  ))}
                  
                  {isFormValid && (
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-success">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Data validation passed</span>
                        </div>
                        <Badge variant="outline" className="text-success border-success">
                          Ready for submission
                        </Badge>
                      </div>
                      <Button className="w-full mt-4 gradient-primary text-primary-foreground">
                        Submit Registration Data
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {!isValidating && validationResults.length === 0 && (
              <Card className="shadow-soft border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">Ready to Validate</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill in the animal details and click "Validate Data" to check for accuracy
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Tips */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Validation Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Complete required fields</p>
                    <p className="text-xs text-muted-foreground">Animal ID and Breed Name are mandatory</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Verify breed characteristics</p>
                    <p className="text-xs text-muted-foreground">Cross-check physical traits with breed standards</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Check regional distribution</p>
                    <p className="text-xs text-muted-foreground">Ensure breed matches typical geographic origins</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Validation;