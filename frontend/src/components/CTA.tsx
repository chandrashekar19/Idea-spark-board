import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Share Your Next Big Idea?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of innovators who are shaping the future, one idea at a time.
          </p>
        </div>

        <Button 
          size="lg"
          onClick={() => navigate("/app")}
          className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all group"
        >
          Get Started Now
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="text-sm text-muted-foreground">
          No signup required • Free forever • Share instantly
        </p>
      </div>
    </section>
  );
};
