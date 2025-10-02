import { useEffect, useState } from "react";
import { IdeaForm } from "@/components/IdeaForm";
import { IdeaCard } from "@/components/IdeaCard";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Idea {
  id: string;
  text: string;
  upvotes: number;
  created_at: string;
}

const App = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchIdeas = async () => {
    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching ideas:", error);
    } else {
      setIdeas(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">Idea Board</h1>
          <div className="w-[100px]" />
        </div>

        <IdeaForm onIdeaSubmitted={fetchIdeas} />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            All Ideas ({ideas.length})
          </h2>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading ideas...
            </div>
          ) : ideas.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No ideas yet. Be the first to share!
            </div>
          ) : (
            <div className="grid gap-4">
              {ideas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  id={idea.id}
                  text={idea.text}
                  upvotes={idea.upvotes}
                  createdAt={idea.created_at}
                  onUpvoted={fetchIdeas}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
