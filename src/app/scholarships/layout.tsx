
import ScholarshipLayout from "@/components/scholarships/layout.scholarships";

export default function JobSearch({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ScholarshipLayout children={children}></ScholarshipLayout>   
  );
}