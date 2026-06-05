import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Global Profile elements for Home and Contact sections
  profile: defineTable({
    name: v.string(),
    tagline: v.string(),
    photoUrl: v.string(), // Recommended element
    email: v.string(),    // Mandatory Contact element
    linkedin: v.string(), // Mandatory Contact element
    otherLinks: v.array(v.object({ label: v.string(), url: v.string() })),
  }),

  // Artifact 1 text container
  sop: defineTable({
    content: v.string(), // 400-500 words strict text block
  }),

  // Package 1 Core Artifacts (Artifacts 2-5)
  artifacts: defineTable({
    key: v.string(),         // 'cv', 'cover-letter', 'linkedin-opt', 'email-templates'
    title: v.string(),       // UI label for the artifact
    documentBody: v.string(),// Polished markdown or structured copy
    
    // Peer Review Evidence Matrix
    reviewer1Name: v.string(),
    reviewer1Date: v.string(),
    reviewer1Feedback: v.string(),
    
    reviewer2Name: v.string(),
    reviewer2Date: v.string(),
    reviewer2Feedback: v.string(),
    
    // Bottom-of-page analysis requirements
    revisionNarrative: v.string(), // 100-300 words post-mortem text
  }),
});
