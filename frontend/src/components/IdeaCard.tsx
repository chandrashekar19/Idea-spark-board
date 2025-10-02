import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ArrowUp } from "lucide-react";

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
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
