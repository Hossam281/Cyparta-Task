import Profile from "@/assests/tabs/profile.svg";
import Docs from "@/assests/tabs/docs.svg";
import Access from "@/assests/tabs/access.svg";
import Job from "@/assests/job.svg";
interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const ProfileTabs: React.FC<TabProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`py-2 px-4 flex items-center gap-2 ${
            activeTab === tab
              ? "border-red-500 text-red-500"
              : "border-transparent text-gray-500"
          } border-b-2 font-medium`}
          onClick={() => onTabClick(tab)}
        >
        {tab === "Personal Information" && <Profile className={`w-6 h-6 ${activeTab === tab ? "fill-red-500" : "fill-gray-500"}`}/>}
        {tab === "Professional Information" && <Job className={`w-6 h-6  ${activeTab === tab ? "stroke-red-500" : "stroke-gray-500"}`}/>}
        {tab === "Documents" && <Docs className={`w-6 h-6  ${activeTab === tab ? "stroke-red-500" : "stroke-gray-500"}`}/>}
        {tab === "Account Access" && <Access className={`w-6 h-6  ${activeTab === tab ? "stroke-red-500" : "stroke-gray-500"}`}/>}
          <span>{tab}</span>
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
