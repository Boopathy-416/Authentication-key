

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";

// Import audio files (Ensure these exist in /public/audio/)
const successAudio = new Audio("/mp3/vadivelu.mp3");
const errorAudio = new Audio("/mp3/final try.mp3");
// const retryAudio = new Audio("/mp3/first try.mp3");

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        errorAudio.play();
        throw new Error(result.message || "Login failed");
      }

      successAudio.play();
      localStorage.setItem("token", result.token);
      alert("Login Successful");
      window.location.href = "/dashboard"; // Redirect after login
    } catch (err) {
      retryAudio.play();
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative backdrop-blur-xl bg-black/20 border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.3)] overflow-hidden">
      <h2 className="text-2xl md:text-center font-bold text-[#808080] mb-6" style={{
         fontFamily: "Permanent Marker",
         fontWeight: 400,
         letterSpacing:"0.1em"
      }}>Login</h2>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-[#b9ff38] block" style={{
         fontFamily: "Permanent Marker",
         fontWeight: 400,
         letterSpacing:"0.4em"
      }}>Email</label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="w-full font-['Dosis'] tracking-widest bg-white/10 border   border-white/20 text-white p-2 rounded-md placeholder:text-white/50 focus:border-violet-500"
            {...register("email")}
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password Input with Toggle */}
        <div className="space-y-2 relative">
          <label htmlFor="password" className="text-[#f30000da] block" style={{
         fontFamily: "Permanent Marker",
         fontWeight: 400,
         letterSpacing:"0.4em"
      }}>Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full font-['Dosis'] tracking-widest bg-white/10 border border-white/20 text-white p-2 rounded-md placeholder:text-white/50 focus:border-violet-500"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-violet-600 font-['Dosis'] tracking-widest hover:bg-violet-700 text-white py-2 rounded-md flex items-center justify-center"
          disabled={isLoading}
          style={{
            transform:"ease-in 2s"
          }}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
        </button>

        {/* Forgot Password */}
        <div className="text-center">
          <a href="#" className=" font-['Dosis']  hover:tracking-wider transition-all text-violet-400 hover:text-violet-300 text-sm">Forgot your password?</a>
        </div>
      </form>
    </div>
  );
}
