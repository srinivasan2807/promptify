"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";
const MyProfile = () => {
  const [profile, setprofile] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchprofile = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setprofile(data);
    };
    if (session?.user.id) fetchprofile();
  }, [session]);
  const handleEdit = (profile) => {
    router.push(`/update-prompt?id=${profile._id}`);
  };
  const handleDelete = async (profile) => {
    const hasConfirmed = confirm(`Are you sure you want to delete this post?`);

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${profile._id}`, {
          method: "DELETE",
        });
        const filtered = profile.filter((p) => p._id !== profile._id);
        setprofile(filtered);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name={session?.user.name ? `${session?.user.name}'s` : ""}
      desc={"welcome to your personalised profile"}
      data={profile}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
