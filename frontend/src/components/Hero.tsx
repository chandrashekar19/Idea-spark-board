import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Lightbulb } from "lucide-react";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10" />
      <div className="max-w-4xl mx-auto text-center space-y-8 py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
          <Lightbulb className="w-4 h-4" />
          <span>Share your brilliance with the world</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Turn Your Ideas Into
          <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mt-2">
            Collective Brilliance
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A vibrant space where innovation meets community. Share your ideas, discover inspiration, and help great thoughts rise to the top.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            size="lg" 
            onClick={() => navigate("/app")}
            className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
          >
            Start Sharing Ideas
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate("/app")}
            className="text-lg px-8 py-6"
          >
            Explore Ideas
          </Button>
        </div>
      </div>
    </section>
  );
};
