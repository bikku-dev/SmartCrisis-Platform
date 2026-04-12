import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mail, Lock, Smartphone, AlertCircle, Chrome } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';

export function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

const KEYCLOAK_URL = "http://localhost:8080";
const REALM = "Crises-app";
const CLIENT_ID = "spring-client";
const REDIRECT_URI = "http://localhost:5173/dashboard";

// 🔐 generate PKCE
const generateCodeVerifier = () => {
  return [...Array(64)]
    .map(() => Math.random().toString(36)[2])
    .join("");
};

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

// ✅ LOGIN (Keycloak redirect)
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(
      "http://localhost:8080/realms/Crises-app/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "password",
          client_id: "spring-client",
          client_secret: "YOUR_CLIENT_SECRET", // 🔥 important
          username: email,
          password: password,
          scope: "openid profile email"
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error_description || "Login failed");
    }

    // ✅ SAVE TOKENS
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);

    console.log("✅ LOGIN SUCCESS", data);

    navigate("/dashboard");

  } catch (err: any) {
    console.error(err);
    toast.error(err.message);
  }
};

// ✅ GOOGLE LOGIN
const handleGoogleLogin = async () => {

  const codeVerifier = generateCodeVerifier();
  localStorage.setItem("pkce_verifier", codeVerifier);

  const codeChallenge = await sha256(codeVerifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    scope: "openid",
    redirect_uri: REDIRECT_URI,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    kc_idp_hint: "google"
  });

  window.location.href =
    `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/auth?${params}`;
};
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left side - Branding */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 p-12 flex-col justify-center items-center text-white"
      >
        <div className="max-w-md">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 inline-block mb-8">
            <AlertCircle className="w-16 h-16" strokeWidth={2} />
          </div>
          <h1 className="text-5xl mb-6">CrisisAI</h1>
          <p className="text-xl text-white/90 mb-8">
            Advanced AI-powered emergency response system connecting people with life-saving help in seconds.
          </p>
          <div className="space-y-4">
            {[
              'AI-Powered Triage & Classification',
              'Real-time Emergency Tracking',
              'Predictive Analytics Dashboard',
              'Multi-language Support'
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white/80">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-block bg-primary/10 rounded-full p-4 mb-4">
              <AlertCircle className="w-12 h-12 text-primary" strokeWidth={2} />
            </div>
            <h1 className="text-3xl text-primary mb-2">CrisisAI</h1>
            <p className="text-muted-foreground">Emergency Response Platform</p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-muted-foreground">
                {isLogin 
                  ? 'Sign in to access emergency services' 
                  : 'Register for instant emergency help'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Phone</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="Enter email or phone number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-secondary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg">
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="my-6">
              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={handleGoogleLogin}
                type="button"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                type="button"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Phone Number (OTP)
              </Button>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <span className="text-secondary">Sign up</span>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <span className="text-secondary">Sign in</span>
                  </>
                )}
              </button>
            </div>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}
