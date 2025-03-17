"use client";
import { useState } from "react";
import { Undo2 } from "lucide-react";
import OTPInputWithTimer from "@/components/otp";

export default function ChangeCredentials() {
  const [token, setToken] = useState(false);
  const [currPage, setCurrPage] = useState(false);
  const [Email, setEmail] = useState<FormDataEntryValue | null>();
  const [Password, setPassword] = useState<FormDataEntryValue | null>();
  const changeForm = () => {
    setCurrPage(!currPage);
  };

  const passwordForm = (
    <form
      action={async (formdata) => {
        const email = formdata.get("email");
        const password = formdata.get("password");
        const changePassword = formdata.get("changePassword");

        if (password !== changePassword) {
          return;
        }

        if (!email && !password && !changePassword) {
          return;
        }
        setEmail(email);
        setPassword(password);
        const response = await fetch(
          "http://localhost:3000/api/user/change-credentials",
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
          },
        );
        if (response.status == 200) {
          console.log(response);
          const ans = await response.json();
          console.log(ans);

          changeForm();
        }
      }}
      className="space-y-6 w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
    >
      <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          required={true}
          name="email"
          type="email"
          className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Password</label>
        <input
          required={true}
          name="password"
          type="password"
          className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
          placeholder="Enter your password"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Change Password
        </label>
        <input
          required={true}
          name="changePassword"
          type="password"
          className="w-full px-4 py-3 rounded-xl text-gray-900 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
          placeholder="Enter your new password"
        />
      </div>
      <div className="flex item-center justify-end">
        <button
          type="submit"
          className="w-1/3 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200"
        >
          Verify
        </button>
      </div>
    </form>
  );

  const otpForm = (
    <div>
      <OTPInputWithTimer
        changeForm={changeForm}
        email={Email}
        password={Password}
      ></OTPInputWithTimer>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      {!currPage ? passwordForm : otpForm}
    </div>
  );
}
