import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Lightbulb } from "lucide-react";

interface IdeaFormProps {
  onIdeaSubmitted: () => void;
}

export const IdeaForm = ({ onIdeaSubmitted }: IdeaFormProps) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Empty idea",
        description: "Please enter an idea before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (text.length > 280) {
      toast({
        title: "Too long",
        description: "Ideas must be 280 characters or less.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from("ideas")
      .insert([{ text: text.trim() }]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit your idea. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Your idea has been shared with the community.",
      });
      setText("");
      onIdeaSubmitted();
    }

    setIsSubmitting(false);
  };

  const remainingChars = 280 - text.length;

  return (
    <Card className="p-6 border-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Share Your Idea</h2>
        </div>
        
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's your brilliant idea? (max 280 characters)"
          className="min-h-[120px] resize-none text-base"
          maxLength={280}
        />
        
        <div className="flex items-center justify-between">
          <span className={`text-sm ${remainingChars < 20 ? 'text-destructive' : 'text-muted-foreground'}`}>
            {remainingChars} characters remaining
          </span>
          <Button 
            type="submit" 
            disabled={isSubmitting || !text.trim()}
            className="px-6"
          >
            {isSubmitting ? "Sharing..." : "Share Idea"}
          </Button>
        </div>
      </form>
    </Card>
  );
};
