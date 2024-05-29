"use client";
import Header from "@/components/header";
import { useMyProfile, useLogout } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const ProfileHeader = () => {
	const { profile } = useMyProfile();
	const { handleLogout } = useLogout();
	const router = useRouter();

	return (
		<Header
			avatarUrl={profile?.profile_picture}
			handleLogoutClick={handleLogout}
			handleEditClick={() => {
				router.push("/dashboard/my-profile/edit");
			}}
		/>
	);
};

export default ProfileHeader;
