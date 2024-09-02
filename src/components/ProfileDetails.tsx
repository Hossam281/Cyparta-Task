"use client";
import { useState } from "react";
import ProfileTabs from "@/components/ProfileTabs";
import PersonalInformation from "@/components/PersonalInformation";

interface ProfileDetailsProps {
  userData: {
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    phone?: string | null;
  };
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState("Personal Information");

  const tabs = [
    "Personal Information",
    "Professional Information",
    "Documents",
    "Account Access",
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full mt-4 p-4">
      <ProfileTabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />

      {activeTab === "Personal Information" && <PersonalInformation userData={userData} />}
      
    </div>
  );
};

export default ProfileDetails;
