"use client";
import React, { useState } from "react";

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
  };

  const plans = [
    {
      name: "Free",
      price: "$0/month",
      description: "Access to basic features",
      benefits: ["Unlimited access to basic content", "Limited support", "Ad-supported"],
      buttonText: "Choose Free",
      buttonColor: "bg-gray-700 hover:bg-gray-600",
    },
    {
      name: "Legendary",
      price: "$19.99/month",
      description: "Unlock exclusive features",
      benefits: ["Ad-free experience", "Priority support", "Advanced analytics"],
      buttonText: "Choose Legendary",
      buttonColor: "bg-blue-600 hover:bg-blue-500",
    },
    {
      name: "Supreme",
      price: "$49.99/month",
      description: "All-inclusive, premium access",
      benefits: ["Everything in Legendary", "Personalized support", "Premium content", "Exclusive updates"],
      buttonText: "Choose Supreme",
      buttonColor: "bg-purple-600 hover:bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white">Choose Your Plan</h1>
          <p className="text-gray-400 mt-4 text-lg">Select the plan that suits you best. Upgrade anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform ${
                selectedPlan === plan.name ? "scale-105" : ""
              } hover:scale-105`}
            >
              <h3 className="text-2xl font-semibold text-center text-white">{plan.name}</h3>
              <p className="text-center text-gray-400 mt-2">{plan.price}</p>
              <p className="text-center text-gray-400 mt-2">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-gray-300">
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 text-green-500 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button
                  onClick={() => handlePlanSelection(plan.name)}
                  className={`${plan.buttonColor} text-white py-3 px-6 rounded-full w-full transition duration-300`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          {selectedPlan && (
            <p className="text-xl font-semibold text-gray-200">
              You have selected the <span className="text-blue-400">{selectedPlan}</span> plan!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
