"use client";
import { Undo2 } from "lucide-react";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import { useRouter } from "next/navigation";

const OTPInputWithTimer = ({
  changeForm,
  email,
  password,
}: {
  changeForm: () => void;
  email: any;
  password: any;
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  // Handle timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timer]);

  // Format time to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP input change
  const handleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value;

    // Only accept numeric inputs
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    // Take only the last character if multiple characters are pasted
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input if current input is filled
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key press
  const handleKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>,
  ): void => {
    // Move to previous input on backspace
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    // Check if pasted content is numeric
    if (!/^\d+$/.test(pastedData)) return;

    const pastedOtp = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];

    pastedOtp.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });

    setOtp(newOtp);

    // Focus on the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((val) => val === "");
    if (nextEmptyIndex !== -1 && inputRefs.current[nextEmptyIndex]) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else if (pastedOtp.length < 6 && inputRefs.current[pastedOtp.length]) {
      inputRefs.current[pastedOtp.length]?.focus();
    } else if (inputRefs.current[5]) {
      inputRefs.current[5]?.focus();
    }
  };

  // Resend OTP
  const resendOTP = async () => {
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
      setTimer(60);
      setIsActive(true);
      if (inputRefs.current[0]) {
        inputRefs.current[0]?.focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <div className="w-full text-center mb-6">
        <button
          className="flex items-center justify-center"
          onClick={changeForm}
        >
          <Undo2></Undo2>
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
        <p className="text-gray-600">
          Enter the 6-digit code sent to your device
        </p>
      </div>

      {/* OTP Input Fields */}
      <div className="flex justify-center gap-2 mb-6 w-full">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="w-12 h-14 text-center text-xl font-bold text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            maxLength={1}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center w-full mb-4">
        <div
          className={`text-xl font-medium ${timer <= 10 ? "text-red-500" : "text-gray-700"}`}
        >
          {formatTime(timer)}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timer / 60) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row w-full gap-3 justify-center mt-4">
        <button
          onClick={resendOTP}
          disabled={isActive}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
          }`}
          aria-label="Resend OTP"
        >
          {isActive ? `Resend in ${timer}s` : "Resend OTP"}
        </button>

        <button
          className={`px-6 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
            otp.join("").length === 6
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-400 cursor-not-allowed"
          }`}
          disabled={otp.join("").length !== 6}
          aria-label="Verify OTP"
          onClick={async () => {
            console.log(email, password);
            const response = await fetch(
              "http://localhost:3000/api/user/change-credentials",
              {
                method: "PUT",
                body: JSON.stringify({ email, otp: otp.join(""), password }),
              },
            );

            if (response.status == 200) {
              console.log(response);
              const ans = await response.json();
              console.log(ans);

              router.push("/home");
            }
          }}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OTPInputWithTimer;
