"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "@/assests/logo.png";
import Eye from "@/assests/eye.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/components/ToastProvider";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    let valid = true;
    let errors = { email: "", password: "" };

    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validate()) {
      const urlencoded = new URLSearchParams();
      urlencoded.append("email", email);
      urlencoded.append("password", password);

      const requestOptions: RequestInit = {
        method: "POST",
        body: urlencoded,
        redirect: "follow" as RequestRedirect,
      };

      try {
        const response = await fetch(
          "https://cyparta-backend-gf7qm.ondigitalocean.app/api/login/",
          requestOptions
        );

        const result = await response.json();
        

        if (result.access && result.refresh) {
          Cookies.set('token', result.access, {
            expires: 1, 
            path: '/', 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict', 
          });

          toast.success("Login successful!");
          router.push("/employees/profile");
        } else {
          toast.error(result.detail);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <ToastProvider>
      <div className="h-[100dvh] w-full gap-[31px] flex flex-col items-center justify-center">
        <Image priority src={Logo} width={225} height={102} alt="Logo"></Image>
        <div className="w-[40%] h-[55%] border flex flex-col justify-center border-gray-200 rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="p-8 flex flex-col justify-center gap-4"
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <Eye
                  onClick={handleShowPassword}
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-[70%] mt-10 mx-auto py-2 px-4 bg-black text-white rounded-md hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </ToastProvider>
  );
};

export default Login;
