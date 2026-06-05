import React, { Suspense } from "react";
import ArtifactsClient from "@/components/ArtifactsClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-8">Loading Suite...</div>}>
      <ArtifactsClient />
    </Suspense>
  );
}
