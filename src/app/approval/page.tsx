"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";

// Types for our approval data
type Competitor = {
  company: string;
  brand: string;
};

type ApprovalData = {
  basics: {
    firstName: string;
    lastName: string;
    title: string;
    companyName: string;
    brandName: string;
    email: string;
    phone: string;
  };
  financials: {
    companyRevenues: string;
    brandRevenues: string;
  };
  competitors: Competitor[];
  history: {
    brandFoundingDate: string;
    historicalTidbits: string;
  };
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
};

// Initial sample data
const initialApprovalData: ApprovalData = {
  basics: {
    firstName: "John",
    lastName: "Doe",
    title: "CEO",
    companyName: "ACME Inc.",
    brandName: "ACME Brand",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
  },
  financials: {
    companyRevenues: "$1M",
    brandRevenues: "$500K",
  },
  competitors: [
    { company: "Competitor One Inc.", brand: "Competitor Brand One" },
    { company: "Competitor Two Inc.", brand: "Competitor Brand Two" },
    { company: "Competitor Three Inc.", brand: "Competitor Brand Three" },
  ],
  history: {
    brandFoundingDate: "January 1, 2000",
    historicalTidbits:
      "Brand X was the only brand in the category until 2021 when several competitors entered.",
  },
  socialMedia: {
    facebook: "https://facebook.com/acme",
    twitter: "https://twitter.com/acme",
    instagram: "https://instagram.com/acme",
  },
};

// We'll refer to each section by a key
type SectionKey = keyof ApprovalData;

// Each data point needs to be confirmed with a checkbox.
type ConfirmState = {
  basics: { [K in keyof ApprovalData["basics"]]: boolean };
  financials: { [K in keyof ApprovalData["financials"]]: boolean };
  competitors: Array<{ company: boolean; brand: boolean }>;
  history: { [K in keyof ApprovalData["history"]]: boolean };
  socialMedia: { [K in keyof ApprovalData["socialMedia"]]: boolean };
};

const initialConfirmState: ConfirmState = {
  basics: {
    firstName: false,
    lastName: false,
    title: false,
    companyName: false,
    brandName: false,
    email: false,
    phone: false,
  },
  financials: {
    companyRevenues: false,
    brandRevenues: false,
  },
  competitors: [
    { company: false, brand: false },
    { company: false, brand: false },
    { company: false, brand: false },
  ],
  history: {
    brandFoundingDate: false,
    historicalTidbits: false,
  },
  socialMedia: {
    facebook: false,
    twitter: false,
    instagram: false,
  },
};

// For editing, we track whether a field is in edit mode.
// (In this version, the input is always rendered, so this state may be repurposed if needed.)
type EditingState = {
  basics: { [K in keyof ApprovalData["basics"]]: boolean };
  financials: { [K in keyof ApprovalData["financials"]]: boolean };
  competitors: Array<{ company: boolean; brand: boolean }>;
  history: { [K in keyof ApprovalData["history"]]: boolean };
  socialMedia: { [K in keyof ApprovalData["socialMedia"]]: boolean };
};

const initialEditingState: EditingState = {
  basics: {
    firstName: false,
    lastName: false,
    title: false,
    companyName: false,
    brandName: false,
    email: false,
    phone: false,
  },
  financials: {
    companyRevenues: false,
    brandRevenues: false,
  },
  competitors: [
    { company: false, brand: false },
    { company: false, brand: false },
    { company: false, brand: false },
  ],
  history: {
    brandFoundingDate: false,
    historicalTidbits: false,
  },
  socialMedia: {
    facebook: false,
    twitter: false,
    instagram: false,
  },
};

export default function ApprovalPage() {
  // Manage which section is currently displayed.
  const [currentSection, setCurrentSection] = useState<SectionKey>("basics");
  const [approvalData, setApprovalData] = useState<ApprovalData>(initialApprovalData);
  const [confirmState, setConfirmState] = useState<ConfirmState>(initialConfirmState);
  const [editingState] = useState<EditingState>(initialEditingState);

  // Define the order of sections.
  const sectionOrder: SectionKey[] = ["basics", "financials", "competitors", "history", "socialMedia"];

  // Check if all fields in the current section are confirmed.
  const isSectionConfirmed = (section: SectionKey): boolean => {
    if (section === "competitors") {
      return confirmState.competitors.every(comp => comp.company && comp.brand);
    } else {
      return Object.values(confirmState[section] as any).every(Boolean);
    }
  };

  // Handler for checkbox changes.
  const handleCheckboxChange = (section: SectionKey, field: string, index?: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (section === "competitors" && typeof index === "number") {
      const newCompetitors = [...confirmState.competitors];
      newCompetitors[index] = { ...newCompetitors[index], [field]: e.target.checked };
      setConfirmState(prev => ({ ...prev, competitors: newCompetitors }));
    } else {
      setConfirmState(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: e.target.checked,
        },
      }));
    }
  };

  // Always-rendered input: its value is editable at all times with the consistent styling.
  const handleInputChange = (section: SectionKey, field: string, value: string, index?: number) => {
    if (section === "competitors" && typeof index === "number") {
      const newCompetitors = [...approvalData.competitors];
      newCompetitors[index] = { ...newCompetitors[index], [field]: value };
      setApprovalData(prev => ({ ...prev, competitors: newCompetitors }));
    } else {
      setApprovalData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  // When the user clicks "Next" (or "Submit" on the final step)
  const handleSectionSubmit = () => {
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex < sectionOrder.length - 1) {
      setCurrentSection(sectionOrder[currentIndex + 1]);
    } else {
      // Final submission logic here.
      alert("All sections confirmed! Submitting approval...");
    }
  };

  // Back button handler.
  const handleBack = () => {
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sectionOrder[currentIndex - 1]);
    }
  };

  // Renders a field with its label, always as an input with the provided style,
  // along with a checkbox for confirmation and a pencil icon.
  const renderField = (section: SectionKey, fieldKey: string, label: string, index?: number) => {
    let value: string;
    if (section === "competitors" && typeof index === "number") {
      value = approvalData.competitors[index][fieldKey as keyof Competitor];
    } else {
      value = (approvalData[section] as any)[fieldKey];
    }
    return (
      <div key={fieldKey} className="flex items-center justify-between py-1">
        <div className="flex items-center w-full">
          <input
            type="checkbox"
            className="mr-2 accent-blue-500"
            checked={
              section === "competitors" && typeof index === "number"
                ? confirmState.competitors[index][fieldKey as keyof Competitor]
                : (confirmState[section] as any)[fieldKey]
            }
            onChange={handleCheckboxChange(section, fieldKey, index)}
          />
       
          <div className="relative w-full">
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(section, fieldKey, e.target.value, index)}
              className="peer block w-full px-4 py-2 border border-gray-800 bg-gray-100 text-black rounded-full focus:outline-none"
              placeholder=" "
            />
            <label
              className="absolute left-4 transition-all duration-300 ease-in-out
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-blue-500
                peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-blue-500"
            >
              {label}
            </label>
          </div>
        </div>
        <button className="text-blue-500 text-sm ml-2">
          <FiEdit className="w-5 h-5" />
        </button>
      </div>
    );
  };

  // Render the current section based on its key.
  const renderSection = () => {
    switch (currentSection) {
      case "basics":
        return (
          <div>
            {renderField("basics", "firstName", "First Name")}
            {renderField("basics", "lastName", "Last Name")}
            {renderField("basics", "title", "Title")}
            {renderField("basics", "companyName", "Company Name")}
            {renderField("basics", "brandName", "Brand Name")}
            {renderField("basics", "email", "Email")}
            {renderField("basics", "phone", "Phone")}
          </div>
        );
      case "financials":
        return (
          <div>
            {renderField("financials", "companyRevenues", "Company Revenues")}
            {renderField("financials", "brandRevenues", "Brand Revenues")}
          </div>
        );
      case "competitors":
        return (
          <div>
            {approvalData.competitors.map((_, idx) => (
              <div key={idx} className="border p-2 mb-2">
                <h4 className="font-semibold">Competitor {idx + 1}</h4>
                {renderField("competitors", "company", "Company", idx)}
                {renderField("competitors", "brand", "Brand", idx)}
              </div>
            ))}
          </div>
        );
      case "history":
        return (
          <div>
            {renderField("history", "brandFoundingDate", "Brand Founding Date")}
            {renderField("history", "historicalTidbits", "Historical Tidbits")}
          </div>
        );
      case "socialMedia":
        return (
          <div>
            {renderField("socialMedia", "facebook", "Facebook")}
            {renderField("socialMedia", "twitter", "Twitter")}
            {renderField("socialMedia", "instagram", "Instagram")}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
      <div className="text-center">
        <Image src="/staticLogo.png" alt="Logo" width={150} height={150} />
      </div>
      <h2 className="mb-8 mt-6 font-bold text-lg">Hi John, Welcome back to QUSAIQ</h2>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-2">{currentSection.toUpperCase()}</h2>
            {renderSection()}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-4">
          {currentSection !== "basics" && (
            <button onClick={handleBack} className="btn bg-gray-400 text-white rounded px-4 py-2">
              Back
            </button>
          )}
          <button
            onClick={handleSectionSubmit}
            className={`btn rounded px-4 py-2 ${
              isSectionConfirmed(currentSection)
                ? "bg-[#7030A0] text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!isSectionConfirmed(currentSection)}
          >
            {currentSection === sectionOrder[sectionOrder.length - 1] ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

