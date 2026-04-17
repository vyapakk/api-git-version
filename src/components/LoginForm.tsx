import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser, clearError } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowRight, Loader2, Info } from "lucide-react";
import { toast } from "sonner";


const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    // Check if we were redirected from AuthGuard
    const params = new URLSearchParams(location.search);
    if (params.get("open_login") === "true") {
      setRedirectMessage("Please sign in to access that page.");
    } else if (params.get("expired") === "true") {
      setRedirectMessage("Session expired. Please sign in again.");
    }

    // Clear auth errors when component mounts/location changes
    dispatch(clearError());
  }, [location, dispatch]);

  /**
   * BACKEND INTEGRATION POINT: Login Handler
   * 
   * Replace the simulated delay with your actual authentication API call.
   * Expected payload: { email: string, password: string, rememberMe: boolean }
   * 
   * Example integration:
   * const response = await fetch('/api/auth/login', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ email, password, rememberMe })
   * });
   * 
   * On success: redirect to dashboard or set auth token
   * On error: display error message to user
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Dispatch the Redux login thunk
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        // Handle successful login
        toast.success("Welcome back!", {
          description: "You have successfully signed in.",
        });
        navigate('/dashboard');
      } else {
        // Error is handled by Redux state, but we can catch it here if we want to do something specific
        console.error('Login failed:', resultAction.payload);
        toast.error("Login Failed", {
          description: resultAction.payload as string || "Invalid email or password. Please try again.",
        });
      }
    } catch (err) {
      console.error('Login exception:', err);
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {redirectMessage && !error && (
        <div className="p-3 rounded-md bg-secondary/10 text-secondary text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <Info className="h-4 w-4" />
          {redirectMessage}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 bg-background border-border focus:border-secondary focus:ring-secondary/20 transition-all duration-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-foreground">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 bg-background border-border focus:border-secondary focus:ring-secondary/20 transition-all duration-200 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="border-border data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
          />
          <Label
            htmlFor="remember"
            className="text-sm font-normal text-muted-foreground cursor-pointer"
          >
            Remember me
          </Label>
        </div>
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-secondary hover:text-stratview-mint transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 gradient-primary hover:opacity-90 text-primary-foreground font-semibold text-base transition-all duration-200 group"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            Sign In
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-secondary hover:text-stratview-mint transition-colors">
          Sign up now
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
