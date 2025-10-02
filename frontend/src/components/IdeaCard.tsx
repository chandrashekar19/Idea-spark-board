import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ArrowUp } from "lucide-react";
// using it from actual backend 
// import { getIdeas, createIdea, upvoteIdea } from '@/lib/api';
import { formatDate } from "@/lib/format-date";

//  currently using the supabase backend .

interface IdeaCardProps {
  id: string;
  text: string;
  upvotes: number;
  createdAt: string;
  onUpvoted: () => void;
}

export const IdeaCard = ({ id, text, upvotes, createdAt, onUpvoted }: IdeaCardProps) => {
  const [isUpvoting, setIsUpvoting] = useState(false);

  const handleUpvote = async () => {


    setIsUpvoting(true);

    
      //  const ideas = await getIdeas();
      //  creation
      //  await createIdea("my idea");
     //   upvote
     // await upvoteIdea(id);

    const { error } = await supabase
      .from("ideas")
      .update({ upvotes: upvotes + 1 })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to upvote. Please try again.",
        variant: "destructive",
      });
    } else {
      onUpvoted();
    }

    setIsUpvoting(false);
  };

  

  return (
    <Card className="p-6 space-y-4 hover:shadow-md transition-all border-2 hover:border-primary/20">
      <p className="text-lg leading-relaxed">{text}</p>
      
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-muted-foreground">
          {formatDate(createdAt)}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleUpvote}
          disabled={isUpvoting}
          className="gap-2"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="font-semibold">{upvotes}</span>
        </Button>
      </div>
    </Card>
  );
};
