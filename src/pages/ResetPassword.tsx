import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Loader2, Lock, CheckCircle, Eye, EyeOff, AlertCircle } from "lucide-react";
import BackgroundPattern from "@/components/BackgroundPattern";
import stratviewLogoWhite from "@/assets/stratview-logo-white.png";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetPassword, clearError } from "@/store/slices/authSlice";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid Request", {
        description: "Reset token is missing. Please use the link sent to your email.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please make sure both passwords are the same.",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Password too short", {
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    try {
      const resultAction = await dispatch(resetPassword({ token, password }));
      
      if (resetPassword.fulfilled.match(resultAction)) {
        setIsSuccess(true);
        toast.success("Password reset successful!", {
          description: "You can now sign in with your new password.",
        });
      } else {
        toast.error("Reset Failed", {
          description: resultAction.payload as string || "We couldn't reset your password. The link may have expired.",
        });
      }
    } catch (err) {
      console.error('Password reset failed:', err);
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-background overflow-hidden">
        <BackgroundPattern />
        <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-card border border-border rounded-2xl shadow-xl animate-fade-in-up">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="h-20 w-20 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground font-display">Success!</h1>
              <p className="text-muted-foreground leading-relaxed">
                Your password has been reset successfully. You can now access your account with your new credentials.
              </p>
            </div>
            <Button asChild className="w-full h-12 gradient-primary group shadow-lg shadow-primary/20">
              <Link to="/">
                Sign In Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative text-white">
        <BackgroundPattern />
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full h-full">
          <div className="space-y-12">
            <div className="animate-fade-in-up">
              <img src={stratviewLogoWhite} alt="Stratview" className="h-16 xl:h-20 w-auto" />
            </div>
            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="space-y-4">
                <h1 className="text-4xl xl:text-5xl font-bold leading-tight font-display">
                  Secure Your
                  <span className="block text-stratview-mint">Account</span>
                </h1>
                <p className="text-lg xl:text-xl text-white/80 max-w-lg leading-relaxed">
                  Choose a strong password to ensure your market intelligence data stays protected and accessible only to you.
                </p>
              </div>
            </div>
          </div>
          <div className="animate-fade-in-up mt-auto" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Stratview Research. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 bg-background relative">
        <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
          {!token && (
            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 mb-6 group">
                <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                    <p className="text-sm text-destructive font-medium leading-relaxed">
                        Invalid or missing reset token. Please check your email link or request a new one.
                    </p>
                </div>
            </div>
          )}

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground font-display">Set New Password</h2>
            <p className="text-muted-foreground">
              Please enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-12 pr-12 bg-background border-border focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 pl-12 bg-background border-border focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl"
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !token}
              className="w-full h-12 gradient-primary hover:opacity-95 text-white font-semibold text-lg transition-all rounded-xl shadow-lg shadow-primary/20 group"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center justify-center">
                  Reset Password
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="pt-6 border-t border-border mt-8">
            <Link
              to="/"
              className="flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
