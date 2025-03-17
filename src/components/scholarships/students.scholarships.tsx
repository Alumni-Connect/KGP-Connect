"use client";
import Button from "@/components/Btn";
import { Award, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Scholarship({
  description,
  title,
  eligibility,
  createdAt,
  createdBy,
  scholarshipId,
  applied,
  responseId,
  lastDate,
}: {
  lastDate: Date;
  description: string;
  title: string;
  eligibility: string[];
  createdBy: string;
  createdAt: Date;
  scholarshipId: string;
  applied: boolean;
  responseId: string | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="flex flex-col w-full px-8 py-3  bg-gray-50 rounded-lg  border-2 ">
      <div className="flex w-full gap-6 items-center ">
        <Award className="w-10 h-10" />
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="font-bold text-xl text-gray-800">{title}</h1>
            <p className="text-sm text-gray-700">
              {createdAt.getDate() +
                "-" +
                createdAt.getMonth() +
                "-" +
                createdAt.getFullYear()}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-1 items-center cursor-pointer">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="secondary"
                size="lg"
                text="Details"
              />
            </div>
            {!applied ? (
              <Button
                variant="primary"
                size="lg"
                text="Apply"
                onClick={() => {
                  router.push(`/scholarships/apply/${scholarshipId}`);
                }}
              />
            ) : (
              <Button
                variant="tertiary"
                size="lg"
                text="Delete"
                onClick={async () => {
                  const deleteScholarship = await fetch(
                    "/api/scholarships/applicationForm",
                    {
                      method: "DELETE",
                      body: JSON.stringify({ scholarshipFormId: responseId }),
                    },
                  );
                  if (deleteScholarship.status === 200) {
                    setIsOpen(false);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 border-t-2 py-2 animate-floatY">
          <h1 className="font-semibold text-lg">Description</h1>
          <ol className="list-disc pl-6 flex flex-col gap-1">{description}</ol>
          <h1 className="font-semibold text-lg">Eligibility</h1>
          <ol className="list-disc pl-6 flex flex-col gap-1">
            {eligibility.map((el, index) => {
              return (
                <li key={index} className="text-gray-700">
                  {el}
                </li>
              );
            })}
          </ol>
          <h1 className="font-semibold text-lg">Last Date</h1>
          <ol className="list-disc pl-6 flex flex-col gap-1">
            {lastDate.toISOString().split("T")[0]}
          </ol>
        </div>
      )}
    </div>
  );
}
