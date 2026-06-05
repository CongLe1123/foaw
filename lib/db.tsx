"use client";

import React, { createContext, useContext } from "react";
import { ConvexProvider, ConvexReactClient, useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Initialize Convex Client dynamically
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://dummy-url.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

// Types matching the Convex schemas
export interface Profile {
  _id?: string;
  name: string;
  tagline: string;
  photoUrl: string;
  email: string;
  linkedin: string;
  otherLinks: { label: string; url: string }[];
}

export interface Sop {
  _id?: string;
  content: string;
}

export interface Artifact {
  _id?: string;
  key: string;
  title: string;
  documentBody: string;
  reviewer1Name: string;
  reviewer1Date: string;
  reviewer1Feedback: string;
  reviewer2Name: string;
  reviewer2Date: string;
  reviewer2Feedback: string;
  revisionNarrative: string;
}

// Client wrapper maintaining layout name compatibility
export const ReactiveDbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};

// Interface matching the page views
export const useReactiveDb = () => {
  const profile = useQuery(api.profile.get);
  const sop = useQuery(api.sop.get);
  const artifacts = useQuery(api.artifacts.list);

  const updateProfileMutation = useMutation(api.profile.update);
  const updateSopMutation = useMutation(api.sop.update);
  const updateArtifactMutation = useMutation(api.artifacts.updateArtifact);

  // Return clean empty layouts if database is currently loading or unpopulated
  const activeProfile: Profile = profile || {
    name: "Unconfigured Profile",
    tagline: "Define name and professional tagline inside the CMS Editor.",
    photoUrl: "/sophia_avatar.png",
    email: "notset@vinuni.edu.vn",
    linkedin: "https://linkedin.com",
    otherLinks: []
  };

  const activeSop: Sop = sop || {
    content: "Statement of Purpose currently unconfigured. Navigate to `/editor` to perform the initial write mutation."
  };

  const activeArtifacts: Artifact[] = (artifacts && artifacts.length > 0) ? artifacts : [
    {
      key: "cv",
      title: "Professional CV / Resume",
      documentBody: "# CV Unconfigured\n\nNavigate to `/editor` to initialize.",
      reviewer1Name: "",
      reviewer1Date: "",
      reviewer1Feedback: "",
      reviewer2Name: "",
      reviewer2Date: "",
      reviewer2Feedback: "",
      revisionNarrative: "Narrative pending."
    },
    {
      key: "cover-letter",
      title: "Tailored Cover Letters",
      documentBody: "# Cover Letters Unconfigured\n\nNavigate to `/editor` to initialize.",
      reviewer1Name: "",
      reviewer1Date: "",
      reviewer1Feedback: "",
      reviewer2Name: "",
      reviewer2Date: "",
      reviewer2Feedback: "",
      revisionNarrative: "Narrative pending."
    },
    {
      key: "linkedin-opt",
      title: "LinkedIn Profile Optimization",
      documentBody: "# LinkedIn Optimization Unconfigured\n\nNavigate to `/editor` to initialize.",
      reviewer1Name: "",
      reviewer1Date: "",
      reviewer1Feedback: "",
      reviewer2Name: "",
      reviewer2Date: "",
      reviewer2Feedback: "",
      revisionNarrative: "Narrative pending."
    },
    {
      key: "email-templates",
      title: "Professional Email Templates",
      documentBody: "# Email Templates Unconfigured\n\nNavigate to `/editor` to initialize.",
      reviewer1Name: "",
      reviewer1Date: "",
      reviewer1Feedback: "",
      reviewer2Name: "",
      reviewer2Date: "",
      reviewer2Feedback: "",
      revisionNarrative: "Narrative pending."
    }
  ];

  return {
    profile: activeProfile,
    sop: activeSop,
    artifacts: activeArtifacts,
    updateProfile: (data: Profile) => {
      const { _id, _creationTime, ...allowed } = data as any;
      return updateProfileMutation(allowed);
    },
    updateSop: (content: string) => updateSopMutation({ content }),
    updateArtifact: (key: string, data: Partial<Artifact>) => {
      // Find current or use defaults
      const current = activeArtifacts.find((art) => art.key === key);
      const merged = {
        key,
        title: data.title ?? current?.title ?? "",
        documentBody: data.documentBody ?? current?.documentBody ?? "",
        reviewer1Name: data.reviewer1Name ?? current?.reviewer1Name ?? "",
        reviewer1Date: data.reviewer1Date ?? current?.reviewer1Date ?? "",
        reviewer1Feedback: data.reviewer1Feedback ?? current?.reviewer1Feedback ?? "",
        reviewer2Name: data.reviewer2Name ?? current?.reviewer2Name ?? "",
        reviewer2Date: data.reviewer2Date ?? current?.reviewer2Date ?? "",
        reviewer2Feedback: data.reviewer2Feedback ?? current?.reviewer2Feedback ?? "",
        revisionNarrative: data.revisionNarrative ?? current?.revisionNarrative ?? ""
      };
      updateArtifactMutation(merged);
    },
    loading: profile === undefined || sop === undefined || artifacts === undefined
  };
};
