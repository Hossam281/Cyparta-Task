import React from "react";

interface ProfileDetailsProps {
  userData: {
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    phone?: string | null;
  };
}
const PersonalInformation: React.FC<ProfileDetailsProps> = ({ userData }) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <label className="block text-sm font-medium text-gray-500">
            First Name
          </label>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {userData.first_name}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Last Name
          </label>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {userData.last_name}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Mobile Number
          </label>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {userData?.phone}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Email Address
          </label>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {userData.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
