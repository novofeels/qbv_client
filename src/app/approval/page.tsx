"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRobot, FaPlus, FaTrash } from "react-icons/fa";

// Import the modals
import AddSocial from "@/components/modals/AddSocial";
import DeleteSocial from "@/components/modals/DeleteSocial";

// Updated types
type Competitor = {
  brand: string;
  URL: string;
};

// Updated social media type to be dynamic
type SocialMediaItem = {
  platform: string;
  link: string;
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
    profitMargin: string;
    brandRevenues: string;
    
  };
  competitors: Competitor[];
  history: {
    brandFoundingDate: string;
    historicalTidbits: string;
  };
  socialMedia: SocialMediaItem[];
};

// Initial sample data with updated socialMedia structure
const initialApprovalData: ApprovalData = {
  basics: {
    firstName: "John",
    lastName: "Doe",
    title: "CEO",
    companyName: "Pinnacle Financial Partners",
    brandName: "Pinnacle",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
  },
  financials: {
    companyRevenues: "$10,200,000",
    profitMargin: "20%",  
    brandRevenues: "$2,000,000",
    
  },
  competitors: [
    { brand: "Competitor Brand One", URL: "www.fake.com" },
    { brand: "Competitor Brand two", URL: "www.fake.com" },
    { brand: "Competitor Brand three", URL: "www.fake.com" },
  ],
  history: {
    brandFoundingDate: "January 1, 2000",
    historicalTidbits:
      "Brand X was the only brand in the category until 2021 when several competitors entered.",
  },
  socialMedia: [
    { platform: "Facebook", link: "https://facebook.com/pinnacle" },
    { platform: "Twitter", link: "https://twitter.com/pinnacle" },
    { platform: "Instagram", link: "https://instagram.com/pinnacle" },
  ],
};

// We'll refer to each section by a key
type SectionKey = keyof ApprovalData;

// Updated confirm state to work with new social media structure
type ConfirmState = {
  basics: { [K in keyof ApprovalData["basics"]]: boolean };
  financials: { [K in keyof ApprovalData["financials"]]: boolean };
  competitors: Array<{ brand: boolean; URL: boolean }>;
  history: { [K in keyof ApprovalData["history"]]: boolean };
  socialMedia: Array<{ platform: boolean; link: boolean }>;
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
    profitMargin: false, 
    brandRevenues: false,
   
  },
  competitors: [
    { brand: false, URL: false },
    { brand: false, URL: false },
    { brand: false, URL: false },
  ],
  history: {
    brandFoundingDate: false,
    historicalTidbits: false,
  },
  socialMedia: [
    { platform: false, link: false },
    { platform: false, link: false },
    { platform: false, link: false },
  ],
};

// A simple ProgressBar component
type ProgressBarProps = {
  currentIndex: number;
  total: number;
  sectionOrder: SectionKey[];
};

function ProgressBar({ currentIndex, sectionOrder }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-4">
      {sectionOrder.map((section, idx) => {
        let circleClasses = "w-6 h-6 rounded-full border border-gray-300";
        if (idx < currentIndex) {
          circleClasses = "w-6 h-6 rounded-full bg-[#7030A0]";
        } else if (idx === currentIndex) {
          circleClasses = "w-6 h-6 rounded-full bg-[#7030A0] border-2 border-black";
        } else {
          circleClasses = "w-6 h-6 rounded-full bg-gray-300";
        }
        return (
          <div key={section} className="flex flex-col items-center">
            <div className={circleClasses}></div>
            <span className="text-xs capitalize text-black">{section}</span>
          </div>
        );
      })}
    </div>
  );
}

// Final submission screen.
const FinalScreen = () => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <h2 className="font-bold text-3xl text-black">Thanks!</h2>
    <p className="mt-4 text-lg text-gray-800">
      Our robot is hard at work crunching the numbers...
    </p>
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      className="flex justify-center mt-8"
    >
      <FaRobot className="w-16 h-16 text-[#7030A0]" />
    </motion.div>
    <p className="mt-4 text-lg text-gray-800">
      We&apos;ll be in touch with the results soon!
    </p>
  </motion.div>
);

export default function ApprovalPage() {
  // Intro state
  const [showIntro, setShowIntro] = useState(true);
  // Manage which section is currently displayed.
  const [currentSection, setCurrentSection] = useState<SectionKey>("basics");
  const [approvalData, setApprovalData] = useState<ApprovalData>(initialApprovalData);
  const [confirmState, setConfirmState] = useState<ConfirmState>(initialConfirmState);
  // For the modals
  const [isAddSocialModalOpen, setIsAddSocialModalOpen] = useState(false);
  const [isDeleteSocialModalOpen, setIsDeleteSocialModalOpen] = useState(false);
  const [socialToDelete, setSocialToDelete] = useState<{index: number, platform: string} | null>(null);

  const [logoRotation, setLogoRotation] = useState(0);
  // New state for direction: 1 for next, -1 for back.
  const [direction, setDirection] = useState(1);
  // New state for final submission.
  const [submitted, setSubmitted] = useState(false);

  // Define the order of sections.
  const sectionOrder: SectionKey[] = ["basics", "financials", "competitors", "history", "socialMedia"];
  const router = useRouter();
  // Check if all fields in the current section are confirmed.
  const isSectionConfirmed = (section: SectionKey): boolean => {
    if (section === "competitors") {
      return confirmState.competitors.every(comp => comp.brand && comp.URL);
    } else if (section === "socialMedia") {
      return confirmState.socialMedia.every(item => item.platform && item.link);
    } else {
      return Object.values(confirmState[section] as Record<string, boolean>).every(Boolean);
    }
  };

  // Variants for the section transition.
  const variants = {
    initial: { opacity: 0, x: direction > 0 ? 50 : -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: direction > 0 ? -50 : 50 },
  };

  // Handler for checkbox changes.
  const handleCheckboxChange = (section: SectionKey, field: string, index?: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (section === "competitors" && typeof index === "number") {
      const newCompetitors = [...confirmState.competitors];
      newCompetitors[index] = { ...newCompetitors[index], [field]: e.target.checked };
      setConfirmState(prev => ({ ...prev, competitors: newCompetitors }));
    } else if (section === "socialMedia" && typeof index === "number") {
      const newSocialMedia = [...confirmState.socialMedia];
      newSocialMedia[index] = { ...newSocialMedia[index], [field]: e.target.checked };
      setConfirmState(prev => ({ ...prev, socialMedia: newSocialMedia }));
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

  // Always-rendered input: its value is editable at all times.
  const handleInputChange = (section: SectionKey, field: string, value: string, index?: number) => {
    if (section === "competitors" && typeof index === "number") {
      const newCompetitors = [...approvalData.competitors];
      newCompetitors[index] = { ...newCompetitors[index], [field]: value };
      setApprovalData(prev => ({ ...prev, competitors: newCompetitors }));
    } else if (section === "socialMedia" && typeof index === "number") {
      const newSocialMedia = [...approvalData.socialMedia];
      newSocialMedia[index] = { ...newSocialMedia[index], [field]: value };
      setApprovalData(prev => ({ ...prev, socialMedia: newSocialMedia }));
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

  // Function to add a new social media item
  const handleAddSocialMedia = (newSocial: { platform: string; link: string }) => {
    // Add to approval data
    const newSocialMedia = [...approvalData.socialMedia, newSocial];
    setApprovalData(prev => ({ ...prev, socialMedia: newSocialMedia }));
    
    // Add to confirm state (default unconfirmed)
    const newSocialMediaConfirm = [...confirmState.socialMedia, { platform: false, link: false }];
    setConfirmState(prev => ({ ...prev, socialMedia: newSocialMediaConfirm }));
  };
  
  // Function to open delete confirmation modal
  const confirmDeleteSocialMedia = (index: number) => {
    setSocialToDelete({
      index,
      platform: approvalData.socialMedia[index].platform
    });
    setIsDeleteSocialModalOpen(true);
  };
  
  // Function to delete a social media item
  const handleDeleteSocialMedia = () => {
    if (socialToDelete === null) return;
    
    const index = socialToDelete.index;
    
    // Remove from approval data
    const newSocialMedia = [...approvalData.socialMedia];
    newSocialMedia.splice(index, 1);
    setApprovalData(prev => ({ ...prev, socialMedia: newSocialMedia }));
    
    // Remove from confirm state
    const newSocialMediaConfirm = [...confirmState.socialMedia];
    newSocialMediaConfirm.splice(index, 1);
    setConfirmState(prev => ({ ...prev, socialMedia: newSocialMediaConfirm }));
    
    // Reset
    setSocialToDelete(null);
  };

  // When the user clicks "Next"
  const handleSectionSubmit = () => {
    setDirection(1);
    setLogoRotation(prev => prev + 360);
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex < sectionOrder.length - 1) {
      setCurrentSection(sectionOrder[currentIndex + 1]);
    } else {
      // Final submission: extra rotation and set submitted true.
      setTimeout(() => {
        setLogoRotation(prev => prev + 360);
        setSubmitted(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 5000);
      }, 600);
    }
  };

  // When the user clicks "Back"
  const handleBack = () => {
    setDirection(-1);
    setLogoRotation(prev => prev - 360);
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sectionOrder[currentIndex - 1]);
    }
  };

  // Renders a field with its label, always as an input with the provided style,
  // along with a checkbox for confirmation.
  const renderField = (section: SectionKey, fieldKey: string, label: string, index?: number) => {
    let value: string;
    if (section === "competitors" && typeof index === "number") {
      value = approvalData.competitors[index][fieldKey as keyof Competitor];
    } else if (section === "socialMedia" && typeof index === "number") {
      value = approvalData.socialMedia[index][fieldKey as keyof SocialMediaItem];
    } else {
      value = (approvalData[section] as Record<string, string>)[fieldKey];
    }
    return (
      <div key={fieldKey} className="flex items-center justify-between py-3">
        <div className="flex items-center w-full">
          <input
            type="checkbox"
            className="checkbox checkbox-sm checkbox-secondary accent-[#7030A0] mr-1"
            checked={
              (section === "competitors" && typeof index === "number")
                ? confirmState.competitors[index][fieldKey as keyof Competitor]
                : (section === "socialMedia" && typeof index === "number")
                  ? confirmState.socialMedia[index][fieldKey as keyof SocialMediaItem]
                  : (confirmState[section] as Record<string, boolean>)[fieldKey]
            }
            onChange={handleCheckboxChange(section, fieldKey, index)}
          />
          <div className="relative w-full">
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(section, fieldKey, e.target.value, index)}
              className="peer block w-full px-4 py-2 border border-gray-800 bg-white text-black rounded-full focus:outline-[#6f30a0] focus:ring-2 focus:ring-[#7030A0] focus:border-[#7030A0] focus:ring-opacity-50"
              placeholder=" "
            />
            <label
              className="absolute left-4 transition-all duration-300 ease-in-out
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#7030A0]
                peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-[#7030A0]"
            >
              {label}
            </label>
          </div>
        </div>
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
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center w-full">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-secondary accent-[#7030A0] mr-1"
                    checked={confirmState.financials.profitMargin}
                    onChange={handleCheckboxChange("financials", "profitMargin")}
                  />
                  <div className="relative w-full">
                    <select
                      value={approvalData.financials.profitMargin}
                      onChange={(e) => handleInputChange("financials", "profitMargin", e.target.value)}
                      className="peer block w-full px-4 py-2 border border-gray-800 bg-white text-black rounded-full focus:outline-[#7030A0] focus:ring-2 focus:ring-[#7030A0] focus:border-[#7030A0] focus:ring-opacity-50"
                    >
                      <option value="">Select profit margin range</option>
                      <option value="0-10%">0-10%</option>
                      <option value="10-20%">10-20%</option>
                      <option value="20-30%">20-30%</option>
                      <option value="30-40%">30-40%</option>
                      <option value="40-50%">40-50%</option>
                      <option value="50-60%">50-60%</option>
                      <option value="60-70%">60-70%</option>
                      <option value="70-80%">70-80%</option>
                      <option value="80-90%">80-90%</option>
                      <option value="90-100%">90-100%</option>
                    </select>
                    <label
                      className="absolute left-4 transition-all duration-300 ease-in-out
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
                        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#7030A0]
                        peer-valid:top-0 peer-valid:-translate-y-4 peer-valid:text-xs peer-valid:text-[#7030A0]"
                    >
                      Company Profit Margin Percentage Range
                    </label>
                  </div>
                </div>
              </div>
              {renderField("financials", "brandRevenues", "Revenues Directly From Brand")}
            </div>
          );
      case "competitors":
        return (
          <div>
            {approvalData.competitors.map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.3, duration: 0.5 }}
                className="border p-2 mb-2 shadow-sm rounded-xl hover:shadow-md hover:border-2 bg-gray-50"
              >
                <h4 className="font-semibold text-center mb-2 text-gray-800">Competitor {idx + 1}</h4>
                {renderField("competitors", "brand", "Brand", idx)}
                {renderField("competitors", "URL", "Website", idx)}
              </motion.div>
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
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-black">Social Media</h2>
              <button
                onClick={() => setIsAddSocialModalOpen(true)}
                className="btn btn-circle btn-sm btn-primary bg-[#7030A0] text-white hover:bg-[#8040B0]"
                aria-label="Add social media"
              >
                <FaPlus />
              </button>
            </div>
            {approvalData.socialMedia.map((social, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-secondary accent-[#7030A0] mr-2"
                    checked={confirmState.socialMedia[idx].platform && confirmState.socialMedia[idx].link}
                    onChange={(e) => {
                      const newSocialMedia = [...confirmState.socialMedia];
                      newSocialMedia[idx].platform = e.target.checked;
                      newSocialMedia[idx].link = e.target.checked;
                      setConfirmState(prev => ({ ...prev, socialMedia: newSocialMedia }));
                    }}
                  />
                  <div className="text-purple-900 font-medium">{social.platform}</div>
                  <button
                    onClick={() => confirmDeleteSocialMedia(idx)}
                    className="ml-auto text-red-500 hover:text-red-700 p-1"
                    aria-label={`Delete ${social.platform}`}
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
                <div className="relative ml-6">
                  <input
                    type="text"
                    value={social.link}
                    onChange={(e) => handleInputChange("socialMedia", "link", e.target.value, idx)}
                    className="peer block w-full px-4 py-2 border border-gray-800 bg-white text-black rounded-full focus:outline-[#6f30a0] focus:ring-2 focus:ring-[#7030A0] focus:border-[#7030A0] focus:ring-opacity-50 mt-1"
                  />
                </div>
              </div>
            ))}
            {approvalData.socialMedia.length === 0 && (
              <p className="text-center text-gray-500 py-4">No social media links added yet</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Logo with animated rotation */}
      <motion.div
        animate={{ rotate: logoRotation }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-center mt-8 mb-6"
      >
        <Image
          src="/staticLogo.png"
          alt="Qusaiq Logo"
          width={150}
          height={150}
          className="spinIn"
        />
      </motion.div>
      {showIntro ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mt-4"
          >
            <h2 className="font-bold text-3xl text-gray-800">Hi Jon, Welcome back to Qusaiq</h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="max-w-lg mt-8 text-gray-800"
            >
              Here&apos;s what we found about{" "} 
              <span className="font-bold text-lg text-black">ACME Corporation,</span> please review each data point, feel free to edit any field, and confirm each section.
            </motion.div>
            <motion.button
              onClick={() => {
                setLogoRotation((prev) => prev + 360);
                setShowIntro(false);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="btn mt-4 bg-[#7030A0] text-white rounded px-4 py-2"
            >
              Proceed
            </motion.button>
          </motion.div>
        </AnimatePresence>
      ) : submitted ? (
        // Final screen; not wrapped in AnimatePresence so it remains.
        <div className="w-full max-w-md p-6">
          <FinalScreen />
        </div>
      ) : (
        <>
          <ProgressBar
            currentIndex={sectionOrder.indexOf(currentSection)}
            total={sectionOrder.length}
            sectionOrder={sectionOrder}
          />
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl text-center font-semibold mb-2 text-black">
                  {currentSection === "socialMedia" ? "SOCIAL MEDIA" : currentSection.toUpperCase()}
                </h2>
                {renderSection()}
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-between mt-4">
              {currentSection !== "basics" && (
                <button
                  onClick={handleBack}
                  className="btn bg-gray-400 text-white rounded px-4 py-2"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleSectionSubmit}
                className={`btn rounded px-4 py-2 ${
                  isSectionConfirmed(currentSection)
                    ? "bg-[#7030A0] text-white"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                } ${currentSection === "basics" ? "ml-auto" : ""}`}
                disabled={!isSectionConfirmed(currentSection)}
              >
                {currentSection === sectionOrder[sectionOrder.length - 1]
                  ? "Submit"
                  : "Next"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add Social Media Modal */}
      <AddSocial
        isOpen={isAddSocialModalOpen}
        onClose={() => setIsAddSocialModalOpen(false)}
        onAdd={handleAddSocialMedia}
      />
      
      {/* Delete Social Media Confirmation Modal */}
      <DeleteSocial
        isOpen={isDeleteSocialModalOpen}
        onClose={() => setIsDeleteSocialModalOpen(false)}
        onConfirm={handleDeleteSocialMedia}
        platformName={socialToDelete?.platform || ''}
      />
    </div>
  );
}