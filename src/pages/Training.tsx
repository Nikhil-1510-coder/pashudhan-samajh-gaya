import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";  
import { 
  Play, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Award, 
  Users, 
  FileText,
  Video,
  HelpCircle
} from "lucide-react";
import { useState } from "react";

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  type: "video" | "quiz" | "document";
  completed: boolean;
  progress: number;
}

const trainingModules: Module[] = [
  {
    id: 1,
    title: "Introduction to Indian Cattle Breeds",
    description: "Overview of major indigenous cattle breeds and their characteristics",
    duration: "15 min",
    difficulty: "Beginner",
    type: "video",
    completed: true,
    progress: 100,
  },
  {
    id: 2,
    title: "Buffalo Breed Identification", 
    description: "Key features and regional distribution of buffalo breeds",
    duration: "20 min",
    difficulty: "Beginner",
    type: "video",
    completed: true,
    progress: 100,
  },
  {
    id: 3,
    title: "Physical Characteristics Assessment",
    description: "Learn to identify breeds by body structure, color patterns, and horn shapes",
    duration: "25 min",
    difficulty: "Intermediate",
    type: "document",
    completed: false,
    progress: 65,
  },
  {
    id: 4,
    title: "Regional Breed Distribution Quiz",
    description: "Test your knowledge of breed origins and geographic distribution",
    duration: "10 min", 
    difficulty: "Intermediate",
    type: "quiz",
    completed: false,
    progress: 0,
  },
  {
    id: 5,
    title: "Advanced Breed Classification",
    description: "Distinguish between similar breeds and handle mixed breeds",
    duration: "30 min",
    difficulty: "Advanced",
    type: "video",
    completed: false,
    progress: 0,
  },
  {
    id: 6,
    title: "Data Collection Best Practices",
    description: "Proper techniques for recording breed information and measurements",
    duration: "18 min",
    difficulty: "Intermediate", 
    type: "document",
    completed: false,
    progress: 25,
  },
];

const Training = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  
  const completedModules = trainingModules.filter(m => m.completed).length;
  const totalProgress = Math.round((trainingModules.reduce((sum, m) => sum + m.progress, 0) / trainingModules.length));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success/10 text-success";
      case "Intermediate": return "bg-warning/10 text-warning";
      case "Advanced": return "bg-destructive/10 text-destructive";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "quiz": return HelpCircle;
      case "document": return FileText;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Header Section */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Training & Learning Center
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Comprehensive training modules to master livestock breed identification. 
            Learn through interactive videos, quizzes, and detailed documentation.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {completedModules}/{trainingModules.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Modules Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {totalProgress}%
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {Math.round(trainingModules.reduce((sum, m) => sum + parseInt(m.duration), 0) / 60)}h
                  </div>
                  <div className="text-sm text-muted-foreground">Learning Time</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{totalProgress}%</span>
                </div>
                <Progress value={totalProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Training Modules List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Training Modules</h2>
              <Badge variant="outline">
                {trainingModules.length} modules
              </Badge>
            </div>

            <div className="space-y-4">
              {trainingModules.map((module) => {
                const TypeIcon = getTypeIcon(module.type);
                return (
                  <Card 
                    key={module.id} 
                    className={`cursor-pointer transition-smooth hover:shadow-medium ${
                      selectedModule?.id === module.id ? 'border-primary shadow-medium' : 'shadow-soft'
                    }`}
                    onClick={() => setSelectedModule(module)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {module.completed ? (
                              <CheckCircle className="h-5 w-5 text-success" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-muted" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <CardTitle className="text-base leading-tight">
                              {module.title}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <TypeIcon className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {module.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getDifficultyColor(module.difficulty)}`}
                        >
                          {module.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm mb-3">
                        {module.description}
                      </CardDescription>
                      
                      {module.progress > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-muted-foreground">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-1" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Module Details/Player */}
          <div className="space-y-6">
            {selectedModule ? (
              <Card className="shadow-medium">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedModule.title}</CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge 
                          variant="outline"
                          className={getDifficultyColor(selectedModule.difficulty)}
                        >
                          {selectedModule.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {selectedModule.duration}
                        </span>
                      </div>
                    </div>
                    {selectedModule.completed && (
                      <CheckCircle className="h-6 w-6 text-success" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Content Area */}
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <Play className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Ready to Start Learning</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedModule.type === 'video' ? 'Click play to start the video' :
                           selectedModule.type === 'quiz' ? 'Begin the interactive quiz' :
                           'Start reading the learning material'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-medium mb-2">About this module</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedModule.description}
                    </p>
                  </div>

                  {/* Progress */}
                  {selectedModule.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{selectedModule.progress}%</span>
                      </div>
                      <Progress value={selectedModule.progress} className="h-2" />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1 gradient-primary text-primary-foreground">
                      {selectedModule.completed ? 'Review' : selectedModule.progress > 0 ? 'Continue' : 'Start'}
                    </Button>
                    {selectedModule.progress > 0 && !selectedModule.completed && (
                      <Button variant="outline">
                        Reset Progress
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-soft border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">Select a Training Module</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a module from the list to start learning
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Learning Stats */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Learning Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">2,547</div>
                    <div className="text-xs text-muted-foreground">Active Learners</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">15,832</div>
                    <div className="text-xs text-muted-foreground">Modules Completed</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Join Discussion Forum
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Training;