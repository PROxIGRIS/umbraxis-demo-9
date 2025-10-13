import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Mail, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ShareResultsProps {
  studentName?: string;
  subject: string;
  overallScore: number;
  proficiency: string;
}

export const ShareResults = ({ studentName, subject, overallScore, proficiency }: ShareResultsProps) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareUrl = window.location.href;
  const shareText = `${studentName || 'Your student'} scored ${overallScore}% (${proficiency}) in ${subject}! View the detailed results and personalized roadmap.`;

  const handleEmailShare = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    try {
      const { error } = await supabase.functions.invoke('share-results', {
        body: { 
          email, 
          studentName: studentName || 'Your student',
          subject,
          overallScore,
          proficiency,
          resultsUrl: shareUrl
        }
      });

      if (error) throw error;

      toast({
        title: "Results Shared!",
        description: `Quiz results sent to ${email}`,
      });
      setEmail("");
    } catch (error) {
      console.error('Share error:', error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Share link copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share Results
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Quiz Results</DialogTitle>
          <DialogDescription>
            Share these results with parents, teachers, or mentors
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Results Summary:</p>
            <p className="font-medium">{shareText}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="parent@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEmailShare()}
              />
              <Button 
                onClick={handleEmailShare} 
                disabled={isSending}
                className="gap-2"
              >
                <Mail className="w-4 h-4" />
                {isSending ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full gap-2"
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Link Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Share Link
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
