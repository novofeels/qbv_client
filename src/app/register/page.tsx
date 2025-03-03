"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import {
  setFirstName,
  setLastName,
  setCompanyName,
  setBrandName,
  setEmail,
  setMobile,
  setPassword,
  setConfirmPassword,
} from "@/features/register/registerSlice";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    companyName,
    brandName,
    email,
    mobile,
    password,
    confirmPassword,
  } = useSelector((state: RootState) => state.register);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Track whether each field has been touched (lost focus)
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    companyName: false,
    brandName: false,
    email: false,
    mobile: false,
    password: false,
    confirmPassword: false,
  });

  // Simple email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = email ? emailRegex.test(email) : false;

  // Validate mobile: count digits (must be exactly 10)
  const isMobileValid = mobile ? mobile.replace(/\D/g, "").length === 10 : false;

  // Check that all fields are filled
  const allFieldsFilled =
    firstName &&
    lastName &&
    companyName &&
    brandName &&
    email &&
    mobile &&
    password &&
    confirmPassword;

  // Check that passwords match
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  // Overall form validity
  const isFormValid = allFieldsFilled && isEmailValid && isMobileValid && passwordsMatch;

  const router = useRouter();
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
    dispatch(setMobile(digits));
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched so errors are shown if any
    setTouched({
      firstName: true,
      lastName: true,
      companyName: true,
      brandName: true,
      email: true,
      mobile: true,
      password: true,
      confirmPassword: true,
    });

    if (!isFormValid) {
      alert("Please fill in all fields correctly.");
      return;
    }
    setIsSubmitting(true);
    // After animation finishes, show success message
    setTimeout(() => {
      setShowMessage(true);
      setTimeout(() => {
        router.push("/approval");
      }, 5000);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-base px-4">
      {!showMessage && (
        <>
          <Image
            src="/staticLogo.png"
            alt="Qusaiq Logo"
            width={150}
            height={150}
            className={isSubmitting ? "spinOut" : "spinIn"}
          />

          <motion.div
            layout
            transition={{ layout: { duration: 0.6, ease: "easeInOut" } }}
            className={
              "flex flex-col items-center text-center mt-2 w-full max-w-md " +
              (isSubmitting ? "sendToCyberspace" : "")
            }
          >
            <h1 className="text-3xl font-bold text-gray-800">Qusaiq</h1>
            <p className="mt-1 text-lg text-gray-800">The easiest way to find your brand value</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6 w-full">
              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    required
                    placeholder=" "
                    value={firstName}
                    onChange={(e) => dispatch(setFirstName(e.target.value))}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, firstName: true }))
                    }
                    className="peer block w-full px-4 py-2 border border-gray-800 bg-white text-black rounded-full focus:outline-none"
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-4 transition-all duration-300 ease-in-out
                      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                      peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#7030A0]

                      peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-[#7030A0]"
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
                    value={lastName}
                    onChange={(e) => dispatch(setLastName(e.target.value))}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, lastName: true }))
                    }
                    className="peer block w-full px-4 py-2 border border-gray-800 bg-white text-black rounded-full focus:outline-none"
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute left-4 transition-all duration-300 ease-in-out
                      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                      peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#7030A0]

                      peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-[#7030A0]
"
                  >
                    Last Name
                  </label>
                </div>
              </div>

              {/* Company Name */}
              <div className="relative">
                <input
                  type="text"
                  id="companyName"
                  required
                  placeholder=" "
                  value={companyName}
                  onChange={(e) => dispatch(setCompanyName(e.target.value))}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, companyName: true }))
                  }
                  className="peer block w-full px-4 py-2 border border-gray-800 bg-white text-black rounded-full focus:outline-none"
                />
                <label
                  htmlFor="companyName"
                  className="absolute left-4 transition-all duration-300 ease-in-out
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#7030A0]

                    peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-[#7030A0]"
                >
                  Company Name
                </label>
              </div>

              {/* Brand Name */}
              <div className="relative">
                <input
                  type="text"
                  id="brandName"
                  required
                  placeholder=" "
                  value={brandName}
                  onChange={(e) => dispatch(setBrandName(e.target.value))}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, brandName: true }))
                  }
                  className="peer block w-full px-4 py-2 border border-gray-800 bg-white text-black rounded-full focus:outline-none"
                />
                <label
                  htmlFor="brandName"
                  className="absolute left-4 transition-all duration-300 ease-in-out
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#7030A0]

                    peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-[#7030A0]"
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
                  value={email}
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, email: true }))
                  }
                  className="peer block w-full px-4 py-2 border border-gray-800 bg-white text-black rounded-full focus:outline-none"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 transition-all duration-300 ease-in-out
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#7030A0]

                    peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-[#7030A0]"
                >
                  Email Address
                </label>
              </div>
              {/* Email error message (only after blur) */}
              {touched.email && email && !isEmailValid && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid email address.
                </p>
              )}

              {/* Mobile */}
              <div className="relative">
                <input
                  type="tel"
                  id="mobile"
                  required
                  placeholder=" "
                  value={mobile}
                  onChange={handlePhoneChange}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, mobile: true }))
                  }
                  className="peer block w-full px-4 py-2 border border-gray-800 bg-white text-black rounded-full focus:outline-none"
                />
                <label
                  htmlFor="mobile"
                  className="absolute left-4 transition-all duration-300 ease-in-out
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#7030A0]

                    peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-[#7030A0]"
                >
                  Mobile Number
                </label>
              </div>
              {/* Mobile error message */}
              {touched.mobile && mobile && !isMobileValid && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid mobile number.
                </p>
              )}

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  required
                  placeholder=" "
                  value={password}
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, password: true }))
                  }
                  className="peer block w-full px-4 py-2 border border-gray-800 bg-white text-black rounded-full focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 transition-all duration-300 ease-in-out
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#7030A0]

                    peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-[#7030A0]"
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
                  onChange={(e) =>
                    dispatch(setConfirmPassword(e.target.value))
                  }
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, confirmPassword: true }))
                  }
                  className="peer block w-full px-4 py-2 border border-gray-800 bg-white text-black rounded-full focus:outline-none"
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-4 transition-all duration-300 ease-in-out
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#7030A0]

                    peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-[#7030A0]"
                >
                  Confirm Password
                </label>
              </div>
              {/* Password match error */}
              {touched.confirmPassword && confirmPassword && !passwordsMatch && (
                <p className="text-red-500 text-sm">
                  Passwords do not match.
                </p>
              )}

              <button
                type="submit"
                className="btn bg-[#7030A0] w-full rounded-full"
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
