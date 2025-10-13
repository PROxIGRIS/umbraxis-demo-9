import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/online-classes");
      }
    }
  }, [user, isAdmin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in or create an account (coming soon!)
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Under Development</AlertTitle>
            <AlertDescription>
              Login and signup features are currently being developed. They will be available soon!
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin" disabled>
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" disabled>
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <div className="text-center py-6 text-muted-foreground">
                Sign In feature coming soon!
              </div>
              <Button className="w-full mt-2" disabled>
                Sign In
              </Button>
            </TabsContent>

            <TabsContent value="signup">
              <div className="text-center py-6 text-muted-foreground">
                Sign Up feature coming soon!
              </div>
              <Button className="w-full mt-2" disabled>
                Sign Up
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
