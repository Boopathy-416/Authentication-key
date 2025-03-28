import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { signup } from "../services/api";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const data = await signup(form);
      alert("Signup Successful! 🎉");
      console.log("User Data:", data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative font-['Dosis']  transition-all tracking-widest backdrop-blur-xl bg-black/20 border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.3)] overflow-hidden"style={{
      transform:"ease-in 2s"
    }}>
      <h2 className="text-2xl font-bold text-[#808080] mb-6" style={{
         fontFamily: "Permanent Marker",
         fontWeight: 400,
         letterSpacing:"0.4em"
      }}>Sign Up</h2>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'email', 'phone', 'password', 'confirmPassword'].map((field) => (
          <div key={field} className="space-y-2">
            <label htmlFor={field} className="text-white block">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
            <input
              id={field}
              name={field}
              type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
              placeholder={field.replace(/([A-Z])/g, ' $1')}
              className="w-full bg-white/10 border border-white/20 text-white p-2 rounded-md placeholder:text-white/50 focus:border-violet-500"
              onChange={handleChange}
              required
            />
          </div>
        ))}
        
        <button type="submit" className="w-full bg-violet-600 hover:tracking-wider transition-all  hover:bg-violet-700 text-white py-2 rounded-md flex items-center justify-center" disabled={isLoading} style={{
          transform:"ease-in 2s"
        }}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
