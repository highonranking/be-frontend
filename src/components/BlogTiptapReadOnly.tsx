"use client";
import dynamic from "next/dynamic";

const TiptapReadOnly = dynamic(() => import("@/components/TiptapReadOnly"), { ssr: false });

export default function BlogTiptapReadOnly({ content }: { content: any }) {
  return <TiptapReadOnly content={content} />;
}
