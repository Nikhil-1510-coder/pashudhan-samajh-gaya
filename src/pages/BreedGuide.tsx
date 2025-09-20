import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Eye } from "lucide-react";
import { useState } from "react";

// Sample breed data - in a real app, this would come from an API
const breedData = [
  {
    id: 1,
    name: "Gir",
    type: "Cattle",
    origin: "Gujarat",
    characteristics: ["White with red/brown patches", "Lyre-shaped horns", "Medium to large size"],
    milkYield: "10-12 liters/day",
    image: "/api/placeholder/300/200",
    description: "One of the most popular indigenous cattle breeds known for high milk production.",
  },
  {
    id: 2,
    name: "Sahiwal",
    type: "Cattle", 
    origin: "Punjab",
    characteristics: ["Red-brown color", "Loose skin", "Drooping ears"],
    milkYield: "8-12 liters/day",
    image: "/api/placeholder/300/200",
    description: "Hardy breed well-adapted to hot climate conditions.",
  },
  {
    id: 3,
    name: "Murrah",
    type: "Buffalo",
    origin: "Haryana",
    characteristics: ["Black color", "Curved horns", "Heavy body"],
    milkYield: "12-18 liters/day",
    image: "/api/placeholder/300/200",
    description: "World-famous buffalo breed known for highest milk production.",
  },
  {
    id: 4,
    name: "Red Sindhi",
    type: "Cattle",
    origin: "Sindh",
    characteristics: ["Deep red color", "Compact body", "Heat tolerant"],
    milkYield: "6-10 liters/day", 
    image: "/api/placeholder/300/200",
    description: "Excellent dual-purpose breed suitable for tropical conditions.",
  },
  {
    id: 5,
    name: "Nili-Ravi",
    type: "Buffalo",
    origin: "Punjab/Pakistan",
    characteristics: ["Dark grey/black", "White markings", "Large size"],
    milkYield: "10-15 liters/day",
    image: "/api/placeholder/300/200",
    description: "Premium buffalo breed known for rich milk quality.",
  },
  {
    id: 6,
    name: "Kankrej",
    type: "Cattle",
    origin: "Gujarat/Rajasthan",
    characteristics: ["Silver-grey color", "Lyre-shaped horns", "Drought resistant"],
    milkYield: "8-10 liters/day",
    image: "/api/placeholder/300/200",
    description: "Hardy dual-purpose breed excellent for arid regions.",
  },
];

const BreedGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const filteredBreeds = breedData.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breed.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || breed.type === selectedType;
    const matchesRegion = selectedRegion === "All" || breed.origin.includes(selectedRegion);
    
    return matchesSearch && matchesType && matchesRegion;
  });

  const uniqueTypes = ["All", ...Array.from(new Set(breedData.map(breed => breed.type)))];
  const uniqueRegions = ["All", "Gujarat", "Punjab", "Haryana", "Rajasthan"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Header Section */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Breed Identification Guide
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Comprehensive database of recognized cattle and buffalo breeds with detailed 
            characteristics, regional distribution, and identification guidelines.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search breeds by name or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-input rounded-md text-sm bg-background"
              >
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 border border-input rounded-md text-sm bg-background"
              >
                {uniqueRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredBreeds.length} of {breedData.length} breeds
          </p>
        </div>

        {/* Breed Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBreeds.map((breed) => (
            <Card key={breed.id} className="group overflow-hidden shadow-soft hover:shadow-medium transition-smooth">
              <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
                <Eye className="h-8 w-8" />
                <span className="ml-2">Image placeholder</span>
              </div>
              
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                    {breed.name}
                  </CardTitle>
                  <Badge variant="secondary">{breed.type}</Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {breed.origin}
                </div>
                
                <CardDescription className="text-sm">
                  {breed.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Milk Yield */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Milk Yield:</span>
                  <span className="font-medium text-primary">{breed.milkYield}</span>
                </div>

                {/* Key Characteristics */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Characteristics:</h4>
                  <div className="flex flex-wrap gap-1">
                    {breed.characteristics.slice(0, 2).map((char, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {char}
                      </Badge>
                    ))}
                    {breed.characteristics.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{breed.characteristics.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full transition-smooth hover:bg-primary hover:text-primary-foreground"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredBreeds.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No breeds found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BreedGuide;