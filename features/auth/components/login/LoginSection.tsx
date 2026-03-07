'use client';
// Next
import { useRouter } from "next/navigation";
// Hooks
import { useSignIn } from "@/features/auth/hooks/useSignIn";
// ShadCn UI
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"
import { ThemeToggle } from "@/shared/components/ui/theme-toggle"
// Icon
import { CheckCircle2Icon } from "lucide-react"

export default function LoginSection() {
  /// Router
  const router = useRouter();

  /// Sign In Form
  const { onSubmit, loading, error } = useSignIn({
    onSuccess: () => router.push("/pos"),
  });
  
  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-row w-full items-start justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </div>
          <ThemeToggle />
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} id="login-form">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="pos@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" form="login-form" disabled={loading}>
            Login
          </Button>
        </CardFooter>
      </Card>
      {error && (
        <div className="absolute bottom-5 right-5 w-sm">
          <Alert>
            <CheckCircle2Icon/>
            <AlertTitle>Error Message</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
