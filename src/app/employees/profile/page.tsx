import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileDetails from '@/components/ProfileDetails';

export async function generateMetadata() {
  return {
    title: 'Profile Page',
  };
}

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/');
    return;
  }

  try {
    const res = await fetch('https://cyparta-backend-gf7qm.ondigitalocean.app/api/profile/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    
    const profileData : {first_name: string, last_name: string, email: string, image: string, phone?: string} = await res.json();


    

    return (
      <div className="w-full ml-[22%]  p-4">
        <ProfileHeader
          name={`${profileData.first_name} ${profileData.last_name}`}
          role="UI/UX Designer"
          email={profileData.email}
          avatarUrl={profileData.image}
          userData={profileData}
        />
        
        <ProfileDetails userData={profileData} />


      </div>
    );
  } catch (error :any) {
    return <p className="text-red-500 text-4xl text-center mt-[20%] w-full font-semibold">{error.message}</p>;
  }
    
}
