"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function RegisterPage() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Passwords must match
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  // Format phone: (###) ###-####
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, "");
    if (digits.length <= 3) {
      digits = digits;
    } else if (digits.length <= 6) {
      digits = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      digits = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
    setMobile(digits);
  };

  // Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordsMatch) {
      alert("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);

    // After anim finishes, show success
    setTimeout(() => {
      setShowMessage(true);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-base px-4">
      {/* Using motion.div with layout around everything that can shift */}

      {!showMessage && (
        <>
    <Image
      src="/staticLogo.png"
      alt="Qusaiq Logo"
      width={150}
      height={150}
      className={
        " " + (isSubmitting ? "spinOut" : "spinIn")
      }
    />

        {/* If we haven't shown the success message yet, show heading + form */}
      
          <motion.div
            layout  // also track layout changes for headings + form
            transition={{ layout: { duration: 0.6, ease: "easeInOut" } }}
            className={
              "flex flex-col items-center text-center mt-2 w-full max-w-md " +
              (isSubmitting ? "sendToCyberspace" : "")
            }
          >
            <h1 className="text-3xl font-bold">Qusaiq</h1>
            <p className="mt-1 text-lg">The easiest way to find your brand value</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6 w-full">
              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    required
                    placeholder=" "
                    className="peer block w-full px-4 py-2 border border-gray-800 bg-gray-100 text-black rounded-full focus:outline-none"
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-4 transition-all duration-300 ease-in-out
                      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                      peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-blue-500
                      peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-blue-500"
                  >
                    First Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    required
                    placeholder=" "
                    className="peer block w-full px-4 py-2 border border-gray-800 bg-gray-100 text-black rounded-full focus:outline-none"
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute left-4 transition-all duration-300 ease-in-out
                      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                      peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-blue-500
                      peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-blue-500"
                  >
                    Last Name
                  </label>
                </div>
              </div>

              {/* Company */}
              <div className="relative">
                <input
                  type="text"
                  id="companyName"
                  required
                  placeholder=" "
                  className="peer block w-full px-4 py-2 border border-gray-800 bg-gray-100 text-black rounded-full focus:outline-none"
                />
                <label
                  htmlFor="companyName"
                  className="absolute left-4 transition-all duration-300 ease-in-out
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-blue-500
                    peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-blue-500"
                >
                  Company Name
                </label>
              </div>

              {/* Brand */}
              <div className="relative">
                <input
                  type="text"
                  id="brandName"
                  required
                  placeholder=" "
                  className="peer block w-full px-4 py-2 border border-gray-800 bg-gray-100 text-black rounded-full focus:outline-none"
                />
                <label
                  htmlFor="brandName"
                  className="absolute left-4 transition-all duration-300 ease-in-out
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-blue-500
                    peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-blue-500"
                >
                  Brand Name
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  required
                  placeholder=" "
                  className="peer block w-full px-4 py-2 border border-gray-800 bg-gray-100 text-black rounded-full focus:outline-none"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 transition-all duration-300 ease-in-out
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-blue-500
                    peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-blue-500"
                >
                  Email Address
                </label>
              </div>

              {/* Mobile */}
              <div className="relative">
                <input
                  type="tel"
                  id="mobile"
                  required
                  placeholder=" "
                  value={mobile}
                  onChange={handlePhoneChange}
                  className="peer block w-full px-4 py-2 border border-gray-800 bg-gray-100 text-black rounded-full focus:outline-none"
                />
                <label
                  htmlFor="mobile"
                  className="absolute left-4 transition-all duration-300 ease-in-out
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-blue-500
                    peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-blue-500"
                >
                  Mobile Number
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  required
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer block w-full px-4 py-2 border border-gray-800 bg-gray-100 text-black rounded-full focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 transition-all duration-300 ease-in-out
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-blue-500
                    peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-blue-500"
                >
                  Password
                </label>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="peer block w-full px-4 py-2 border border-gray-800 bg-gray-100 text-black rounded-full focus:outline-none"
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-4 transition-all duration-300 ease-in-out
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-blue-500
                    peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-blue-500"
                >
                  Confirm Password
                </label>
              </div>

              {!passwordsMatch && confirmPassword.length > 0 && (
                <p className="text-red-500 text-sm">Passwords do not match.</p>
              )}
<button
  type="submit"
  className="btn bg-[#7030A0] w-full rounded-full disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
  disabled={!passwordsMatch}
>
  Register
</button>

            </form>
          </motion.div>
          </>
        )}

        {/* SUCCESS MESSAGE */}
        {showMessage && (
          <>
                  <motion.div
                  initial={{ scaleX: 0, scaleY: 0.3, originX: 0.5, rotate: -180, opacity: 0 }}
                  animate={{ scaleX: 0.8, scaleY: 0.8, rotate: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <Image
                    src="/staticLogo.png"
                    alt="Qusaiq Logo"
                    width={200}
                    height={200}
                    className="mb-2"
                  />
                </motion.div>
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="flex flex-col items-center text-center mt-4 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold">That&apos;s it!</h2>
            <p className="mt-1 text-lg">
              We&apos;ll email you when your brand profile is ready
            </p>
          </motion.div>
          </>
        )}
     
    </div>
  );
}
