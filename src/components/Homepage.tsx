import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, CheckSquare, Search, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-livestock.jpg";
import aiImage from "@/assets/ai-identification.jpg";
import trainingImage from "@/assets/training-section.jpg";

const features = [
  {
    title: "Breed Identification Guide",
    description: "Comprehensive database with pictures, traits, and regional distribution of recognized cattle and buffalo breeds.",
    icon: BookOpen,
    href: "/breeds",
    image: heroImage,
  },
  {
    title: "AI-Powered Classifier",
    description: "Upload animal photos and get instant breed suggestions using advanced machine learning algorithms.",
    icon: Brain,
    href: "/classifier",
    image: aiImage,
  },
  {
    title: "Training & Learning",
    description: "Interactive tutorials, videos, and quizzes to train FLWs on correct breed recognition techniques.",
    icon: CheckSquare,
    href: "/training",
    image: trainingImage,
  },
  {
    title: "Data Validation Tools",
    description: "Cross-check entered breed data against common traits before submission to ensure accuracy.",
    icon: Search,
    href: "/validation",
    image: heroImage,
  },
];

const stats = [
  { label: "Recognized Breeds", value: "200+" },
  { label: "Active FLWs", value: "10,000+" },
  { label: "Accurate Classifications", value: "95%" },
  { label: "Languages Supported", value: "12" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container relative">
        <div className="flex flex-col items-center text-center space-y-8 py-16 md:py-24">
          {/* Hero Content */}
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Advanced{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Livestock Breed
              </span>{" "}
              Identification
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Empowering Field Level Workers with AI-powered breed classification, 
              comprehensive training modules, and accurate data validation tools for 
              the Bharat Pashudhan initiative.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-medium transition-smooth hover:shadow-strong">
              <Link to="/classifier">
                <Brain className="mr-2 h-5 w-5" />
                Try AI Classifier
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-soft transition-smooth hover:shadow-medium">
              <Link to="/breeds">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Breeds
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 pt-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Comprehensive Tools for{" "}
            <span className="text-primary">Breed Management</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Everything you need to accurately identify, register, and manage livestock breeds 
            with confidence and precision.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="group overflow-hidden shadow-soft hover:shadow-medium transition-smooth">
              <div className="aspect-video overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="outline" className="w-full transition-smooth hover:bg-primary hover:text-primary-foreground">
                  <Link to={feature.href}>
                    Explore Feature
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CallToActionSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Transform{" "}
            <span className="text-primary">Livestock Management</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of Field Level Workers who are already using our platform 
            to improve breed identification accuracy and livestock registration.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gradient-primary text-primary-foreground shadow-medium">
              <Users className="mr-2 h-5 w-5" />
              Get Started Today
            </Button>
            <Button variant="outline" size="lg" className="shadow-soft">
              <Globe className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}