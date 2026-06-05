"use client";

import React, { createContext, useContext, useState } from "react";

// Types matching the schema
export interface Profile {
  name: string;
  tagline: string;
  photoUrl: string;
  email: string;
  linkedin: string;
  otherLinks: { label: string; url: string }[];
}

export interface Sop {
  content: string;
}

export interface Artifact {
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

// Initial Static Data
const INITIAL_PROFILE: Profile = {
  name: "Nguyễn Lê Tú Oanh",
  tagline: "VinUniversity ENGL1030 Course Portfolio. Prepare for exchange and explore academic artifacts.",
  photoUrl: "/Avatar.jpg",
  email: "oanh.nlt@vinuni.edu.vn",
  linkedin: "https://linkedin.com",
  otherLinks: [
    { label: "Facebook", url: "https://www.facebook.com/tu.oanh.490611" }
  ]
};

const INITIAL_SOP: Sop = {
  content: `# Statement of Purpose

My primary academic objective is to prepare for the global study exchange program, deepening my knowledge and perspective on global communication.

Through English 1030, I have engaged in writing, analyzing, and revising academic works that strengthen my critical thinking and adaptability.

You can edit this content directly inside the code at \`lib/db.tsx\`.`
};

const INITIAL_ARTIFACTS: Artifact[] = [
  {
    key: "cultural-adaptation",
    title: "Cultural Adaptation",
    documentBody: `# Cultural Adaptation Essay

Entering a new academic environment presents unique challenges. This artifact explores the steps, reflections, and strategies involved in adapting to different teaching and communication styles.

## Key Insights
- Staying open-minded is crucial for cross-cultural communication.
- Peer feedback is valuable for refining academic papers.
- Continuous revision improves overall essay flow.`,
    reviewer1Name: "An Nguyen",
    reviewer1Date: "2026-05-15",
    reviewer1Feedback: "The structuring is logical, but consider expanding on the specific examples of cultural shocks.",
    reviewer2Name: "Dr. Elizabeth",
    reviewer2Date: "2026-05-18",
    reviewer2Feedback: "Excellent reflective tone. The analysis is deeply connected to VinUni academic standards.",
    revisionNarrative: "This narrative explains how peer and instructor feedback was integrated to improve the depth and flow of the cultural adaptation analysis."
  },
  {
    key: "cv",
    title: "Curriculum Vitae",
    documentBody: `# Curriculum Vitae

## Education
- **VinUniversity** — Bachelor of Science / Arts (Expected Graduation: 2028)

## Projects
- **Interactive Course Portfolio**: Built with Next.js and Tailwind CSS.
- **Academic Writing Projects**: Developed critical essays on cultural adaptation and exchange planning.

## Skills
- Python, React, Next.js, CSS, HTML
- Creative writing, Peer-review collaboration`,
    reviewer1Name: "Binh Tran",
    reviewer1Date: "2026-05-14",
    reviewer1Feedback: "Make sure to list your key technical skills clearly. The layout looks clean and easy to scan.",
    reviewer2Name: "Career Advisor",
    reviewer2Date: "2026-05-20",
    reviewer2Feedback: "Good structure. Emphasize your academic projects and collaborations.",
    revisionNarrative: "Refined the CV by highlighting collaborative class projects and styling the skills section for visual clarity."
  },
  {
    key: "student-plan",
    title: "Student Plan",
    documentBody: `# Student Study Plan

An structured plan outlining courses, learning objectives, and exchange expectations.

## Planned Semesters
- **Fall Semester**: Focus on advanced writing and core major classes.
- **Exchange Semester**: Enroll in global communication and cultural exchange electives.`,
    reviewer1Name: "Chi Le",
    reviewer1Date: "2026-05-16",
    reviewer1Feedback: "The timeline is clear. Consider adding specific course codes if available.",
    reviewer2Name: "Advisor",
    reviewer2Date: "2026-05-22",
    reviewer2Feedback: "Solid academic roadmap. Aligns perfectly with the graduation requirements.",
    revisionNarrative: "Incorporated academic timeline milestones and mapped course expectations to match the study abroad prerequisites."
  },
  {
    key: "letter-of-recommendation",
    title: "Letter of Recommendation",
    documentBody: `# Letter of Recommendation

A supporting document highlighting academic dedication, collaboration, and class contributions.

## Key Themes
- Proactive participation in peer workshops.
- Consistently high quality of essay drafts and revisions.`,
    reviewer1Name: "Duy Pham",
    reviewer1Date: "2026-05-17",
    reviewer1Feedback: "Nice drafting. Ensures all key recommendation categories are covered.",
    reviewer2Name: "Professor Smith",
    reviewer2Date: "2026-05-24",
    reviewer2Feedback: "Clearly outlines the student's academic strengths and potential for success on exchange.",
    revisionNarrative: "Refined the recommendation focus areas to emphasize active learning and leadership in group discussions."
  }
];

// Context structure
interface DbContextType {
  profile: Profile;
  sop: Sop;
  artifacts: Artifact[];
  updateProfile: (data: Profile) => void;
  updateSop: (content: string) => void;
  updateArtifact: (key: string, data: Partial<Artifact>) => void;
  loading: boolean;
}

const DbContext = createContext<DbContextType | undefined>(undefined);

export const ReactiveDbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [sop, setSop] = useState<Sop>(INITIAL_SOP);
  const [artifacts, setArtifacts] = useState<Artifact[]>(INITIAL_ARTIFACTS);

  const updateProfile = (data: Profile) => {
    setProfile(data);
  };

  const updateSop = (content: string) => {
    setSop({ content });
  };

  const updateArtifact = (key: string, data: Partial<Artifact>) => {
    setArtifacts((prev) =>
      prev.map((art) => (art.key === key ? { ...art, ...data } : art))
    );
  };

  return (
    <DbContext.Provider
      value={{
        profile,
        sop,
        artifacts,
        updateProfile,
        updateSop,
        updateArtifact,
        loading: false
      }}
    >
      {children}
    </DbContext.Provider>
  );
};

export const useReactiveDb = () => {
  const context = useContext(DbContext);
  if (!context) {
    throw new Error("useReactiveDb must be used within a ReactiveDbProvider");
  }
  return context;
};
