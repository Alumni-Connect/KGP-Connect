"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
// Verification page component
const VerificationPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState(
    "Your account is pending verification.",
  );
  const [isVerified, setVerified] = useState(false);
  const { data: session, update } = useSession();

  const handleSubmit = (e: any) => {
    fetch("/api/user/getUser", { method: "POST" })
      .then(async (res) => {
        if (res.status === 200) {
          const response = await res.json();
          setVerified(response.isVerified);
          console.log("hello", isVerified, session);

          if (response.isVerified) {
            update((prev: any) => ({ ...prev, isVerified: true })).then(() => {
              console.log("value updated");
              router.push("/admin/home");
            });
          }
        }
        console.log("hello");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg m-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <svg
            className="w-20 h-20 text-purple-800"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-purple-900 mb-6">
          KGPAdda
        </h1>

        {/* Status message */}
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-purple-800 mb-3 text-center">
            Verification in Progress
          </h2>
          <p className="text-center text-gray-700 mb-4">
            Your account credentials are currently being verified. This process
            may take up to{" "}
            <span className="font-bold text-purple-700">72 hours</span> to
            complete.
          </p>
          <p className="text-center text-gray-700">
            Our team is working to ensure your information is properly validated
            in our system.
          </p>
        </div>

        {/* Progress bar */}

        {/* Status indicator */}

        {/* Additional message */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Please try refreshing this page or close this page while we verify
            your credentials.
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            You can try again once your account has been fully verified.
          </p>
          <button
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 animate-fade-in-up animation-delay-600"
            onClick={handleSubmit}
          >
            Sync{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
