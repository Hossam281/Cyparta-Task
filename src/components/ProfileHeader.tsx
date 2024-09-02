import Breadcrumbs from "./Breadcrumbs";
import Job from "@/assests/job.svg";
import Email from "@/assests/mail.svg";
import UpdateDialog from "./UpdateDialog";
interface ProfileHeaderProps {
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
  userData: {
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    phone?: string;
  }
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  email,
  avatarUrl,
  userData
}) => {
  return (
    <div className="flex flex-col mt-16 justify-center gap-4 w-full p-4 border-b-gray-100 border-b">
      <Breadcrumbs />
      <div className="w-full flex justify-between ">
        <div className="flex">
          <img
            src={avatarUrl}
            alt={`${name} avatar`}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <div className="flex gap-2 items-center">
              <Job className="w-4 h-4 stroke-black" />
              <p className="text-sm text-gray-600">{role}</p>
            </div>
            <div className="flex gap-2 items-center">
              <Email className="w-4 h-4" />
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </div>
        </div>
        
        <UpdateDialog userData={userData}/>
      </div>
    </div>
  );
};

export default ProfileHeader;
