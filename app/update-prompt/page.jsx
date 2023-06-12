"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { useRouter, useSearchParams } from "next/navigation";
import Forms from "@components/Forms";
const EditPrompt = () => {
  const [submitting, setsubmitting] = useState(false);
  const router = useRouter();
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });
  const params = useSearchParams();
  const promptId = params.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setpost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);
  const updatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    if (!promptId) return alert("Prompt not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "POST",
        body: JSON.stringify({
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
      type="Edit"
      post={post}
      setpost={setpost}
      submitting={submitting}
      handlesubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
