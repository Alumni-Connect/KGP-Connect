"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface props {
  user: any;
  scholarship: scholarship;
}
enum SchFormQuestion {
  RADIO = "RADIO",
  MULTIPLERADIO = "MULTIPLERADIO",
  BOOLEAN = "BOOLEAN",
  TEXT = "TEXT",
}

type schQuestionType = "RADIO" | "MULTIPLERADIO" | "BOOLEAN" | "TEXT";
type scholarship =
  | {
      msg: string;
      scholarship?: undefined;
    }
  | {
      msg: string;
      scholarship: {
        formQuestions: {
          id: string;
          type: schQuestionType;
          options: string[];
          description: string;
          required: boolean;
          scholarShipId: string;
        }[];
      };
    };

type response = {
  linkedFormId: string;
  answer: string[];
};
const ApplicationForm = ({ user, scholarship }: props) => {
  const [scholarshipResponse, setResponse] = useState<response[]>([
    {
      linkedFormId: "",
      answer: [""],
    },
  ]);
  const [file, setFile] = useState<File>();

  const router = useRouter();

  useEffect(() => {
    const response = scholarship.scholarship?.formQuestions.map(
      (question, index) => {
        return { linkedFormId: question.id, answer: [""] };
      },
    );
    if (response) {
      setResponse(response);
    }
  }, []);

  const handleChange = (
    inx: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    questionIndex: number,
  ) => {
    let { name, value } = e.target;
    console.log(e.target, name, value);
    if (inx !== 0) {
      if (scholarshipResponse[questionIndex].answer[0] === "") {
        console.log("done");
        inx = 0;
      } else {
        inx = scholarshipResponse[questionIndex].answer.length;
      }
    }

    if (name.includes("option")) {
      name = name.split("-")[2];
      console.log(name);
    }
    const transformedResponse = [...scholarshipResponse];
    console.log(questionIndex);
    transformedResponse[questionIndex].linkedFormId = name;
    transformedResponse[questionIndex].answer[inx] = value;
    setResponse(transformedResponse);
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    setFile(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("hello");
      console.log(scholarshipResponse);
      const responses = scholarshipResponse.map((prev, index) => {
        return { linkedFormId: prev.linkedFormId, answer: prev.answer };
      });
      const formData = new FormData();
      if (!file) {
        console.log("no file provided");
        return;
      }

      const data = {
        name: user.name,
        email: user.email,
        hall: user.hall ?? "",
        rollNumber: user.rollNumber ?? "",
        curriculumVitae: "",
        YearOfGraduation: user.YearOfGraduation,
        Department: user.Department,
        ScholarshipId: scholarship.scholarship?.formQuestions[0].scholarShipId,
        studentId: user.id,
        formResponses: [...responses],
      };
      formData.set("file-cv", file);
      const response = await fetch("/api/scholarships/applicationForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      });

      if (response.ok) {
        const res = await response.json();
        formData.set("id", res.id);
        const fileResponse = await fetch(
          "/api/scholarships/applicationForm/upload-cv",
          {
            method: "POST",
            body: formData,
          },
        );
        if (fileResponse.ok) {
          console.log("done");
          router.push("/scholarships");
        }
      } else {
        const { msg } = await response.json();
        alert(`Error: ${msg}`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Scholarship Application
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Please fill out the form below to apply for the scholarship.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-xl font-medium text-white">
              Personal Information
            </h2>
          </div>

          {/* Form Fields */}
          <div className="p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* ID Field */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ID
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    These things will be automatically generated
                  </p>
                </div>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <div className="mt-1">
                    <input
                      readOnly={true}
                      value={user.name ?? ""}
                      type="text"
                      name="name"
                      id="name"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      readOnly={true}
                      value={user.email ?? ""}
                      type="email"
                      name="email"
                      id="email"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Hall and Roll Number */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="hall"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hall/Dormitory
                  </label>
                  <div className="mt-1">
                    <input
                      readOnly={true}
                      value={user.hall ?? ""}
                      type="text"
                      name="hall"
                      id="hall"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="rollNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Roll Number
                  </label>
                  <div className="mt-1">
                    <input
                      readOnly={true}
                      value={user.rollNumber ?? ""}
                      type="text"
                      name="rollNumber"
                      id="rollNumber"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Department and Year of Graduation */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <input
                    readOnly={true}
                    value={user.Department ?? ""}
                    type="text"
                    name="rollNumber"
                    id="rollNumber"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="graduationYear"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Year of Graduation
                  </label>
                  <div className="mt-1">
                    <input
                      readOnly={true}
                      value={
                        user.YearOfGraduation
                          ? user.YearOfGraduation.toISOString().split("T")[0]
                          : ""
                      }
                      type="date"
                      name="graduationYear"
                      id="graduationYear"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label
                  htmlFor="cv"
                  className="block text-sm font-medium text-gray-700"
                >
                  Curriculum Vitae (CV)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          required={true}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="application/pdf"
                          multiple={false}
                          onChange={fileHandler}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Questions Section */}
              <div className="bg-indigo-600 px-6 py-4">
                <h2 className="text-xl font-medium text-white">
                  Scholarship Questions
                </h2>
              </div>

              <div className="p-6 space-y-8">
                {/* Multiple Choice Question */}
                {scholarship.scholarship &&
                  scholarship.scholarship.formQuestions.map(
                    (question: any, questionIndex: any) => (
                      <div key={question.id}>
                        {question.type === "TEXT" && (
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {question.description}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Be specific and provide examples. (150 words
                              maximum)
                            </p>
                            <div className="mt-4">
                              <textarea
                                required={question.required}
                                id="essay"
                                name={question.id}
                                rows={8}
                                onChange={(e) => {
                                  handleChange(0, e, questionIndex);
                                }}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Write your answer here..."
                              ></textarea>
                              <p className="mt-2 text-sm text-gray-500">
                                0/150 words
                              </p>
                            </div>
                          </div>
                        )}
                        {question.type === "RADIO" && (
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {question.description}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Select the option that best suits you.
                            </p>

                            <div className="mt-4 space-y-4">
                              {question.options.map(
                                (option: string[], index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <input
                                      id="option1"
                                      name={question.id}
                                      value={option ?? ""}
                                      onChange={(e) => {
                                        handleChange(0, e, questionIndex);
                                      }}
                                      type="radio"
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label
                                      htmlFor="option1"
                                      className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                      {option}
                                    </label>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {question.type === "BOOLEAN" && (
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {question.description}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Select the option that best suits you.
                            </p>

                            <div className="mt-4 space-y-4">
                              {question.options.map(
                                (option: string[], index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <input
                                      id="option1"
                                      value={option}
                                      name={question.id}
                                      onChange={(e) => {
                                        handleChange(0, e, questionIndex);
                                      }}
                                      type="radio"
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label
                                      htmlFor="option1"
                                      className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                      {option}
                                    </label>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {question.type === "MULTIPLERADIO" && (
                          <div>
                            <h3 className="text-lg font-medium">
                              {question.description}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Select the options that best suit you.
                            </p>

                            <div className="mt-4 space-y-2">
                              {question.options.map(
                                (option: string[], index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`option-${index}`}
                                      name={`option-${index}-` + question.id}
                                      value={option}
                                      type="checkbox"
                                      onChange={(e) => {
                                        handleChange(index, e, questionIndex);
                                      }}
                                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <label
                                      htmlFor={`option-${index}`}
                                      className="ml-3 text-sm text-gray-700"
                                    >
                                      {option}
                                    </label>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ),
                  )}
              </div>

              <div className="pt-5 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  <p>
                    Application Date:{" "}
                    <span className="font-medium">
                      {new Date().toISOString().split("T")[0]}
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      router.push("/scholarships");
                    }}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
