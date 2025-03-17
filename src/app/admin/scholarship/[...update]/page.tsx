"use client";
import { useEffect, useState } from "react";
import { ScholarshipCreation } from "@/components/admin/adminScholarship/DescriptionForm";
import QuestionForm from "@/components/admin/adminScholarship/QuestionForm";
import ProgressBar from "@/components/admin/adminScholarship/ProgressBar";
import { CirclePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

enum SchFormQuestion {
  RADIO = "RADIO",
  MULTIPLERADIO = "MULTIPLERADIO",
  BOOLEAN = "BOOLEAN",
  TEXT = "TEXT",
}

type formQuestion = {
  type: SchFormQuestion;
  question: string;
  required: boolean;
  options: { id: number; text: string }[];
  isDropDown: boolean;
};

export default function Home() {
  const startingQuestion: formQuestion = {
    type: SchFormQuestion.MULTIPLERADIO,
    question: "",
    required: false,
    options: [{ id: 1, text: "Option 1" }],
    isDropDown: false,
  };
  const session = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [scholarshipId, setScholarshipId] = useState("");
  const [formData, setFormData] = useState({
    // Work Experience form data
    title: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    description: "",
    criteria: [""],

    // Profile form data
    formQuestions: [startingQuestion],
  });
  const [question, setQuestion] = useState<formQuestion[]>([startingQuestion]);
  const router = useRouter();

  const addQuestionBar = () => {
    setQuestion([...question, startingQuestion]);
  };

  const removeQuestionBar = (indexToRemove: number) => {
    setQuestion(question.filter((_, index) => index !== indexToRemove));
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    console.log(data);

    setFormData((prev) => ({ ...prev, ...data }));
  };

  const updateFormQuestionData = (data: typeof formData) => {
    console.log(data.formQuestions);
    setFormData((prev) => ({ ...prev, formQuestions: data.formQuestions }));
  };

  const updateQuestionData = (data: Partial<formQuestion>, index: number) => {
    console.log(data);
    setQuestion((prev: formQuestion[]) => {
      return prev.map((q: formQuestion, i) =>
        i === index ? { ...q, ...data } : q,
      );
    });
  };

  //criterion
  const addCriterion = () => {
    setFormData((prev) => {
      return { ...prev, criteria: [...prev.criteria, ""] };
    });
  };

  const removeCriterion = (indexToRemove: number) => {
    setFormData({
      ...formData,
      criteria: formData.criteria.filter((_, index) => index !== indexToRemove),
    });
  };

  const updateCriterion = (index: number, value: string) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        criteria: prevData.criteria.map((item, i) =>
          i === index ? value : item,
        ),
      };
    });
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    console.log("sjodj");
    setCurrentStep((prev) => prev - 1);
  };

  //check if the search params consist of any unique id
  const params = useParams();

  useEffect(() => {
    if (params.update !== undefined && params.update[1] !== undefined) {
      fetch(
        `/api/scholarships/adminsOperation?scholarshipId=${params.update[1]}`,
      )
        .then(async (res) => {
          if (res.status === 200) {
            const response = await res.json();
            const scholarship = response.scholarship;
            setFormData(() => {
              return {
                title: scholarship.title,
                startDate: scholarship.createdAt,
                endDate: scholarship.lastDate.split("T")[0],
                description: scholarship.description,
                criteria: scholarship.criteria,
                formQuestions: scholarship.formQuestions,
              };
            });

            const formQuestion = scholarship.formQuestions.map(
              (formQuestion: any) => {
                return {
                  type: formQuestion.type,
                  question: formQuestion.description,
                  required: formQuestion.required,
                  options: formQuestion.options.map(
                    (option: string, index: number) => {
                      return { id: index, text: option };
                    },
                  ),
                  isDropDown: false,
                };
              },
            );
            console.log(formQuestion);
            setQuestion(formQuestion);
            setScholarshipId(scholarship.id);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-12">
      <div className="flex justify-center items-end">
        <div className="w-3/4  px-4">
          <ProgressBar currentStep={currentStep} totalSteps={2} />

          <div
            className={`bg-white rounded-lg shadow-md mt-6 p-6 ${currentStep === 1 ? null : `flex items-center justify-center`}`}
          >
            {currentStep === 1 && (
              <ScholarshipCreation
                updateCriterion={updateCriterion}
                removeCriterion={removeCriterion}
                addCriterion={addCriterion}
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
              />
            )}

            {currentStep === 2 && (
              <>
                <QuestionForm
                  formData={formData}
                  updateFormQuestionData={updateFormQuestionData}
                  updateQuestionData={updateQuestionData}
                  prevStep={prevStep}
                  question={question}
                  setQuestion={setQuestion}
                  removeQuestionBar={removeQuestionBar}
                  onSubmit={async () => {
                    // Handle final form submission here
                    function convertToDateTime(dateStr: string): Date {
                      const [year, month, day] = dateStr.split("-").map(Number);
                      // Adjust year based on assumption
                      return new Date(year, month - 1, day); // Months are 0-based
                    }
                    try {
                      console.log(formData);
                      const queryFormQuestion = question.map((question) => {
                        return {
                          description: question.question,
                          type: question.type,
                          required: question.required,
                          options: question.options.map((option) => {
                            console.log(option);
                            return option.text.includes("Option")
                              ? ""
                              : option.text;
                          }),
                        };
                      });
                      const query = {
                        title: formData.title,
                        description: formData.description,
                        criteria: formData.criteria,
                        createdBy: session.data?.user.id,
                        lastDate: convertToDateTime(formData.endDate),
                        formQuestions: queryFormQuestion,
                      };
                      console.log(query);
                      let response;
                      if (
                        params.update !== undefined &&
                        params.update[1] !== undefined
                      ) {
                        response = await fetch(
                          "/api/scholarships/adminsOperation",
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              id: scholarshipId,
                              ...query,
                            }),
                          },
                        );
                      } else {
                        response = await fetch(
                          "/api/scholarships/adminsOperation",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              ...query,
                            }),
                          },
                        );
                      }
                      if (response.ok) {
                        console.log("done");
                        router.push("/admin");
                      } else {
                        const error = await response.json();
                        alert(`Error: ${error.message}`);
                      }
                    } catch (error) {
                      console.error("Error submitting form:", error);
                      alert("Failed to submit form. Please try again.");
                    }
                  }}
                />
              </>
            )}
          </div>
        </div>
        {currentStep === 2 && (
          <button
            onClick={addQuestionBar}
            className="h-10 w-10 bg-indigo-600 text-white rounded-lg flex flex-col items-center justify-center"
          >
            <CirclePlus></CirclePlus>
          </button>
        )}
      </div>
    </div>
  );
}
