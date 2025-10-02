import { Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "Instant Inspiration",
    description: "Share your brilliant ideas in 280 characters or less. Quick, simple, and powerful.",
  },
  {
    icon: TrendingUp,
    title: "Community Voting",
    description: "Let the best ideas rise to the top through community upvotes. Democracy in action.",
  },
  {
    icon: Users,
    title: "Collaborative Spirit",
    description: "Join a community of innovators, creators, and dreamers pushing boundaries together.",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Watch ideas flow in real-time. The freshest thoughts, delivered instantly.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Share Your Ideas Here?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A platform designed to amplify creativity and foster meaningful connections
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 space-y-4 hover:shadow-lg transition-all border-2 hover:border-primary/20 bg-card"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
