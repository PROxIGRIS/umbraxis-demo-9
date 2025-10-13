import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BannerContent {
  id: string;
  title: string;
  description: string;
  button_text: string | null;
  button_link: string | null;
  button_enabled: boolean;
  countdown_enabled: boolean;
  countdown_end_at: string | null;
  is_active: boolean;
  lottie_url: string;
}

const AdminPanel = () => {
  const { isAdmin, loading: authLoading, signOut, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [banner, setBanner] = useState<BannerContent | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/auth");
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchBanner();
    }
  }, [isAdmin]);

  const fetchBanner = async () => {
    const { data, error } = await supabase
      .from("banner_content")
      .select("*")
      .eq("is_active", true)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load banner content",
        variant: "destructive",
      });
    } else {
      setBanner(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!banner) return;

    setSaving(true);

    const { error } = await supabase
      .from("banner_content")
      .update({
        title: banner.title,
        description: banner.description,
        button_text: banner.button_text,
        button_link: banner.button_link,
        button_enabled: banner.button_enabled,
        countdown_enabled: banner.countdown_enabled,
        countdown_end_at: banner.countdown_end_at,
        lottie_url: banner.lottie_url,
      })
      .eq("id", banner.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Banner updated successfully!",
      });
    }

    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your urgency banner</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {banner && (
          <Card>
            <CardHeader>
              <CardTitle>Banner Content</CardTitle>
              <CardDescription>Customize the urgency banner displayed to visitors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={banner.title}
                  onChange={(e) => setBanner({ ...banner, title: e.target.value })}
                  placeholder="Banner title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={banner.description}
                  onChange={(e) => setBanner({ ...banner, description: e.target.value })}
                  placeholder="Banner description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lottie">Lottie Animation URL</Label>
                <Input
                  id="lottie"
                  value={banner.lottie_url}
                  onChange={(e) => setBanner({ ...banner, lottie_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="button-enabled"
                  checked={banner.button_enabled}
                  onCheckedChange={(checked) => setBanner({ ...banner, button_enabled: checked })}
                />
                <Label htmlFor="button-enabled">Show Button</Label>
              </div>

              {banner.button_enabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="button-text">Button Text</Label>
                    <Input
                      id="button-text"
                      value={banner.button_text || ""}
                      onChange={(e) => setBanner({ ...banner, button_text: e.target.value })}
                      placeholder="Click here"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="button-link">Button Link</Label>
                    <Input
                      id="button-link"
                      value={banner.button_link || ""}
                      onChange={(e) => setBanner({ ...banner, button_link: e.target.value })}
                      placeholder="#pricing or https://..."
                    />
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="countdown-enabled"
                  checked={banner.countdown_enabled}
                  onCheckedChange={(checked) => setBanner({ ...banner, countdown_enabled: checked })}
                />
                <Label htmlFor="countdown-enabled">Show Countdown Timer</Label>
              </div>

              {banner.countdown_enabled && (
                <div className="space-y-2">
                  <Label>Countdown End Date & Time</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !banner.countdown_end_at && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {banner.countdown_end_at 
                          ? format(new Date(banner.countdown_end_at), "PPP 'at' HH:mm")
                          : "Pick a date and time"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={banner.countdown_end_at ? new Date(banner.countdown_end_at) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            // Set time to end of day if no time is set
                            const currentTime = banner.countdown_end_at 
                              ? new Date(banner.countdown_end_at)
                              : new Date();
                            date.setHours(currentTime.getHours());
                            date.setMinutes(currentTime.getMinutes());
                            setBanner({ ...banner, countdown_end_at: date.toISOString() });
                          }
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                      <div className="p-3 border-t">
                        <Label className="text-sm">Time</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            type="number"
                            min="0"
                            max="23"
                            placeholder="HH"
                            value={banner.countdown_end_at ? new Date(banner.countdown_end_at).getHours() : ""}
                            onChange={(e) => {
                              const date = banner.countdown_end_at ? new Date(banner.countdown_end_at) : new Date();
                              date.setHours(parseInt(e.target.value) || 0);
                              setBanner({ ...banner, countdown_end_at: date.toISOString() });
                            }}
                            className="w-20"
                          />
                          <span className="flex items-center">:</span>
                          <Input
                            type="number"
                            min="0"
                            max="59"
                            placeholder="MM"
                            value={banner.countdown_end_at ? new Date(banner.countdown_end_at).getMinutes() : ""}
                            onChange={(e) => {
                              const date = banner.countdown_end_at ? new Date(banner.countdown_end_at) : new Date();
                              date.setMinutes(parseInt(e.target.value) || 0);
                              setBanner({ ...banner, countdown_end_at: date.toISOString() });
                            }}
                            className="w-20"
                          />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
