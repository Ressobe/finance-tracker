import { BasicPlan } from "@/components/pricing/basic-plan";
import { ProPlan } from "@/components/pricing/pro-plan";

export function Pricing() {
  const benefitsBasic = [
    "Basic cost of living analysis",
    "Access to expense history for the last 6 months",
    "Setting one savings goal",
    "Basic savings projections (up to 5 years)",
  ];

  const missingBasic = [
    "No bank account synchronization",
    "No exported raports",
  ];

  const benefitsPro = [
    "Advanced cost of living analysis with detailed reports",
    "Full monitoring of savings with automatic updates",
    "Unlimited access to expense history",
    "Setting and managing unlimited savings goals",
    "Advanced savings projections with 'what-if' scenarios",
    "Bank account synchronization",
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center px-20 py-10 ">
      <div className="relative bg-lime-500 -z-50">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-lime-500 rounded-full  blur-[11rem]"></div>
        <div className="absolute top-0 -right-20 w-96 h-96 bg-green-500 rounded-full  blur-[11rem]"></div>
      </div>
      <div className="grid grid-cols-2 gap-x-6">
        <BasicPlan price={0} benefits={benefitsBasic} missing={missingBasic} />
        <ProPlan price={5} benefits={benefitsPro} missing={undefined} />
      </div>
    </section>
  );
}
