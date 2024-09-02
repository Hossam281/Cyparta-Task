"use client";
import React, { useState } from "react";
import Edit from "@/assests/edit.svg";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import ToastProvider from "./ToastProvider";
import { useRouter } from "next/navigation";
interface ProfileDetailsProps {
  userData: {
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    phone?: string | null;
  };
}

const UpdateDialog: React.FC<ProfileDetailsProps> = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    image: userData.image,
    phone: userData.phone || "",
  });

  const router = useRouter();

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.phone
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const token = Cookies.get("token");

    if (!token) {
      toast.error("Token not found. Please log in again.");
      return;
    }

    try {
      toast.info("Submitting form...");
      const response = await fetch(
        "https://cyparta-backend-gf7qm.ondigitalocean.app/api/profile/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (response.ok) {
        toast.success("Profile updated successfully!");
        router.refresh();
      } else {
        toast.error(`Error: ${responseData.message || response.statusText}`);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
      console.error("Submit Error:", error);
    } finally {
      closeDialog();
    }
  };

  return (
    <div className="w-[15%]">
      <ToastProvider>
        <button
          className="w-full mb-2 group flex justify-center gap-3 h-10 mt-auto font-semibold py-2 px-4 bg-black text-white rounded-md hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-300"
          onClick={openDialog}
        >
          <Edit className="w-4 mt-1 fill-none stroke-white group-hover:stroke-black h-4" />
          <span>Edit Profile</span>
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-[90%] max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300"
                    onClick={closeDialog}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-black text-white rounded-md hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-300"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </ToastProvider>
    </div>
  );
};

export default UpdateDialog;
