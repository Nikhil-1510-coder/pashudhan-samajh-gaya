import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Camera, Brain, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

interface ClassificationResult {
  breed: string;
  confidence: number;
  type: string;
  characteristics: string[];
  region: string;
}

const AIClassifier = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ClassificationResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError("File size must be less than 10MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError("Please upload a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setError(null);
        setResults([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateClassification = async () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock classification results
    const mockResults: ClassificationResult[] = [
      {
        breed: "Gir",
        confidence: 87.5,
        type: "Cattle",
        characteristics: ["White with red patches", "Lyre-shaped horns", "Prominent forehead"],
        region: "Gujarat",
      },
      {
        breed: "Sahiwal", 
        confidence: 72.3,
        type: "Cattle",
        characteristics: ["Red-brown color", "Loose skin", "Drooping ears"],
        region: "Punjab",
      },
      {
        breed: "Red Sindhi",
        confidence: 45.8,
        type: "Cattle", 
        characteristics: ["Deep red color", "Compact body", "Small to medium size"],
        region: "Sindh",
      },
    ];
    
    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-success";
    if (confidence >= 60) return "text-warning";
    return "text-muted-foreground";
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 80) return "default";
    if (confidence >= 60) return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Header Section */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            AI-Powered Breed Classifier
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Upload a photo of cattle or buffalo and get instant breed identification 
            using advanced machine learning algorithms. Get confidence scores and 
            detailed breed information.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Upload Animal Photo
                </CardTitle>
                <CardDescription>
                  Upload a clear, well-lit photo of the animal for best results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload Area */}
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded animal"
                        className="max-h-64 mx-auto rounded-lg shadow-soft"
                      />
                      <p className="text-sm text-muted-foreground">
                        Click to upload a different image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Click to upload image</p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                {error && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={simulateClassification}
                    disabled={!uploadedImage || isAnalyzing}
                    className="flex-1 gradient-primary text-primary-foreground"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Classify Breed
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setUploadedImage(null);
                      setResults([]);
                      setError(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    disabled={isAnalyzing}
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines Card */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Photo Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Clear, well-lit photos</p>
                    <p className="text-xs text-muted-foreground">Natural lighting works best</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Full body or side profile</p>
                    <p className="text-xs text-muted-foreground">Show important breed characteristics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Single animal focus</p>
                    <p className="text-xs text-muted-foreground">Avoid multiple animals in one photo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {isAnalyzing && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    Analyzing Image...
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing image...</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Our AI is analyzing the image and comparing it with thousands of breed samples...
                  </p>
                </CardContent>
              </Card>
            )}

            {results.length > 0 && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Classification Results
                  </CardTitle>
                  <CardDescription>
                    Top breed matches ranked by confidence score
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.map((result, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{result.breed}</h3>
                          <p className="text-sm text-muted-foreground">{result.type} • {result.region}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={getConfidenceBadge(result.confidence)}>
                            {result.confidence}% match
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Progress value={result.confidence} className="h-2" />
                        <div className="flex flex-wrap gap-1">
                          {result.characteristics.map((char, charIndex) => (
                            <Badge key={charIndex} variant="outline" className="text-xs">
                              {char}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {index === 0 && result.confidence >= 80 && (
                        <div className="flex items-center gap-2 text-success text-sm">
                          <CheckCircle className="h-4 w-4" />
                          High confidence match
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      View Detailed Breed Information
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {!isAnalyzing && results.length === 0 && uploadedImage && (
              <Card className="shadow-soft border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">Ready to Analyze</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click "Classify Breed" to start the AI analysis
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIClassifier;