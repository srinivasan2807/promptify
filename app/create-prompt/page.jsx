"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import Forms from "@components/Forms";
const CreatePrompt = () => {
  const [submitting, setsubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });
  const createprompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(`error in posting prompt ${error}`);
    } finally {
      setsubmitting(false);
    }
  };
  return (
    <Forms
      type="Create"
      post={post}
      setpost={setpost}
      submitting={submitting}
      handlesubmit={createprompt}
    />
  );
};

export default CreatePrompt;
