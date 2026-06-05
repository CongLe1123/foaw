# Product Requirement Document (PRD)

## Project: ENGL1030 Interactive React/Convex Developer Portfolio

---

## 1. Overview & Project Goals

The goal is to build a highly interactive, animated, full-stack digital portfolio using Next.js and Convex to satisfy the explicit assignment requirements for VinUniversity's ENGL1030 course.

As a senior front-end engineer tracking an additional diploma, this site balances a highly tailored "soft tech/girly" UI aesthetic with advanced layout practices. The platform utilizes **Convex** as an instant reactive real-time datastore, **shadcn/ui** for core accessible layout elements, and **Framer Motion** for polished, fluid UI transitions. It features an integrated web-based content editor (`/editor`) allowing for frictionless database writes without needing to deploy commits or open local development files.

---

## 2. Core Architecture & Tech Stack

### Frontend & Animation Layers

* **Framework:** Next.js (App Router, optimized client-side state handling).
* **Component Architecture:** Pre-built, accessible UI primitives from **shadcn/ui**.
* **Animation Library:** **Framer Motion** for structural layout animations, entry fades, and micro-interactions.
* **Styling Engine:** Tailwind CSS.

### Reactive Backend (Convex)

* **Database Engine:** Convex Cloud Infrastructure (Real-time reactive document store).
* **Sync Strategy:** Active `useQuery` subscriptions stream updates globally to clients instantly. Form inputs inside the editor route use `useMutation` transactions to rewrite active states without page refreshes or Vercel rebuild pipelines.

---

## 3. Theme & Visual Design System

The interface features a personalized layout pairing a high-contrast dark palette with bright accent tones, completely diverging from generic corporate web baselines.

* **Design Aesthetic:** Minimalist technical structures softened with clean rounded corners, smooth interactive transitions, and stylized component borders.
* **Color Palette (Girly / Tech Theme):**
* *Primary Blue:* Deep slate or midnight navy (`#0f172a` or `#1e3a8a`) anchoring layout containers, backgrounds, and headers.


* *Accent Pink:* Soft pastel blush, hot pink, or magenta tones (`#f43f5e` or `#ec4899`) applied cleanly to borders, tabs, call-to-action hover triggers, and active focus rings.


* **Typography:** Accessible sans-serif scales (e.g., Geist Sans or Inter) locking all paragraph body copy to a minimum layout scale of 11-12pt to fulfill accessibility rules.



---

## 4. Animation Specifications (Framer Motion)

To achieve a high-end feel while maintaining professional stability, animations must enhance structural storytelling rather than degrade clarity.

### Core Motion Guidelines

* **Page Transitions:** Smooth entry cascades when shifting routes. Tabs or sections slide into place with a subtle scale modifier (`scale: 0.98 -> 1.0`) using physics-based spring curves (`stiffness: 100, damping: 15`).
* **Layout Animations:** Utilizing Framer Motion’s `layoutId` attribute on active element highlights (like shadcn navigation selections or active sub-page tabs) to smoothly morph selection states.
* **Micro-interactions:** Interactive hover targets (buttons, links, image cards) use subtle lift behavior (`y: -2px`) and color interpolations mapping to the theme's Accent Pink.

---

## 5. Database Schema Specification (`convex/schema.ts`)

Convex schemas are strictly designed using explicit TypeScript primitives to structure the information required by the **Package 1 (Job Seeking)** parameters.

```typescript
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

```

---

## 6. Route Architecture & Page Blueprints

```text
📁 Next.js Application Route Layout
│
├── 📂 (Public Portfolio Pages)
│    ├── 📄 /             -> Home / Landing View
│    ├── 📄 /sop          -> Statement of Purpose (Artifact 1)
│    ├── 📄 /artifacts    -> Package 1 Suite (Artifacts 2-5 Layout Tabs)
│    └── 📄 /contact      -> About / Professional Contact Page
│
└── 📂 (Private Management Routing)
     └── 📄 /editor       -> Real-Time Split-Pane CMS Workspace

```

### Page Blueprints & Content Matrix

#### 1. Home / Landing Page (`/`)

* **Mandatory Elements:** Displays your Name, a brief professional tagline/introduction, clear routing navigation, and a professional photo.


* **UI Layout:** Full-height viewport. Elements gently fade and move upward sequentially on load to reveal the text blocks.

#### 2. Statement of Purpose Page (`/sop`)

* **Mandatory Elements:** Explicitly featured as your **first artifact/section**, positioned in a layout context that is highly visible and easy to locate.


* **Academic Content:** Hosts a **400-500 word** reflective text addressing:


1. *Your Goals:* Short/long-term professional and academic objectives.


2. *Artifact Overview:* Structural breakdown of your chosen 4 documents and the reason for selecting them.


3. *Growth Statement:* Introspective analysis of personal development as a writer over the semester.


4. *Future Connection:* Explicit linkages detailing how these documents support upcoming real-world milestones.





#### 3. Professional Document Pages (`/artifacts`)

An interactive tabbed workspace leveraging a single shared layout component. Selecting tabs triggers a fluid horizontal slide animation. The content displays the **4 chosen elements of Package 1 (Job Seeking)**:

1. **Professional CV/Resume**.


2. **Cover Letter Template** (including 2 tailored variations configured for specific positions).


3. **LinkedIn Profile Optimization Documentation** (explicitly structured as a "before/after" view with explanatory copy).


4. **Professional Email Templates** (comprising structured layouts for networking, inquiry, and post-event follow-up scenarios).



Each artifact sub-view enforces a strict 3-block structural hierarchy:

* **Block A (The Final Deliverable):** High-fidelity canvas container rendering your final, polished, non-generic document text.


* **Block B (Peer Feedback Documentation):** Framer Motion accordion blocks displaying clear visual proof of **two peer reviews**, showing names, date signatures, and the exact constructive text comments received.


* **Block C (Revision Narrative):** Placed **firmly at the bottom of the page**. Renders a **100-300 word** overview mapping what you changed, why you changed it (referencing peer advice or personal critique), and the resulting impact of those edits.



#### 4. Contact / About Section (`/contact`)

* **Mandatory Elements:** A dedicated section displaying a professional email address, an active LinkedIn profile link, and any secondary professional project repositories.



---

## 7. Web Content Management Interface (`/editor`)

A decoupled route built strictly for inline content changes directly into the Convex database.

* **Mechanic:** Uses Convex client mutations to stream updates without local IDE file commits or Vercel rebuild workflows.
* **UI Layout:** Two-column split-pane layout using a shadcn grid container. The left panel houses functional text input fields and `textarea` components categorized by page target (`Home`, `SOP`, `Artifacts 1-4`). The right panel embeds a scaled down live-preview window displaying real-time UI layouts and layout transitions as text is entered.

---

## 8. Specifications Grading Compliance Guardrails

To secure a definitive "Meets Expectations" grade on initial project evaluation, the implementation architecture enforces these strict constraints:

* [ ] **Completeness Checklist:** Exactly 5 total artifacts (1 SOP + 4 specific Job-Seeking documents) natively active with zero placeholder strings.


* [ ] **Double Review Tracking:** Every single package artifact page embeds distinct data parameters tracking two separate peer review validation events.


* [ ] **Narrative Anchor:** Every single package artifact page strictly ends with its own dedicated 100-300 word narrative breakdown block.


* [ ] **Ethical Authorship:** Absolutely zero AI-generated drafts inside the Statement of Purpose or job artifacts; writing components must showcase an authentic personal voice.


* [ ] **Accessibility & Infrastructure:** Complete absence of broken interface links or page script exceptions; high contrast text rendering; accessible layout dimensions; and an open public access setting ready for external Canvas evaluation.