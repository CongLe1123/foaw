"use client";

import React, { createContext, useContext, useState } from "react";

// Types matching the schema
export interface Profile {
  name: string;
  tagline: string;
  photoUrl: string;
  email: string;
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
  email: "25oanh.nlt@vinuni.edu.vn",
  otherLinks: [
    { label: "Facebook", url: "https://www.facebook.com/tu.oanh.490611" }
  ]
};

const INITIAL_SOP: Sop = {
  content: `**REFLECTION SOP**  
I am a freshman medical doctor university student; to be completely honest, when I first started university, I did not focus much on academic or professional writing courses. I used to think that writing academically did not really match my future career path as a medical doctor. Previously, whenever I wanted to cite my sources, I would just go to scopus or pubmed with the title and copy the citation without any check or change. However, going through this course has changed my perspective alot. I learned that having solid medical knowledge is undoutedly neccessary but knowing academic writing skills like how to communicate and prepare documents for my research, job seeking and futher study program is also crucial for my background as a future medical doctor. Now, I can do my reference list with both APA 7 structure and format.  
I have chosen a study exchange package because this one is the most copatible one for my nearest goal as seeking a global clinical environment. My aim now is securing an international exchange slot at Sechenov University to gain actual exposure to a global healthcare environment. While my current study journey at VinUniversity provides a great environment, I know that when I start my clinical years in the hospital here, the work will still mostly be with Vietnamese doctors and local patients. My portfolio is built to show my aim that I want to expand my horizons beyond this local zone. By highlighting my high school biology background, my German exchange trip, and my field research, I want to prove to the admissions committee that I am ready to handle a highly diverse, international patient environment in a global hub like Moscow.  
There are 5 distinct artifacts in my study exchange package that show my preparation. The first artifact in my package is my Letter of Recommendation (LOR), which formally highlights my research journey and character from a professor's perspective. My second artifact is an exchange Statement of Purpose (SOP) prepared for Sechenov University. In the SOP, I explain directly why I need an international area like Moscow to learn how to treat diverse, global populations with different backgrounds, religions and mindset. My third artifact is my Cultural Adaptation Essay, where I focus on my previous experiences, like my Goethe-Institut exchange trip to Germany to try their food, wear their traditional clothes which I had bought one for myself, and talk with the locals to prove I can adapt to a European university environment smoothly. The fourth artifact is my CV, which shows my actual education, my language skills, and my extracurricular roles like organizing national medical competitions and volunteering for marine conservation. The fifth and final artifact is my Study Plan where I talk about the exact four courses I want to take which are Medical Emergencies, Bioethics, Epidemiology, and Medical Psychology and how they connect to my long-term goals.
`
};

const INITIAL_ARTIFACTS: Artifact[] = [
  {
    key: "exchange-sop",
    title: "Exchange Statement of Purpose",
    documentBody: `Dear Admissions Committee,  
I am writing to express my strong interest in the medical exchange program at Sechenov University. My journey into medicine is driven by a huge fascination with health science and a desire to understand global healthcare systems. As a first-year student  who is studying  medical doctor program at VinUniversity, I dedicate myself to both natural and clinical sciences. I believe that participating in this exchange program at Sechenov University is the next crucial step to broaden my medical perspective.  
My desire to join the Sechenov community was solidified when I watched a youtube vlog by Thao Trinh, who is studying at your university. I was deeply moved by Sechenov’s supportive, rich history and international environment. These factors align perfectly with my personal aspiration. I believe that Sechenov University’s academic environment will provide the ideal platform for me to develop my medical knowledge and bring valuable global insights back to Vietnam.  
My academic record reflects a consistent dedication to the sciences. Throughout my three years of high school, I have maintained a GPA of 9.5 or higher, with a focus on excelling in Biology, Chemistry, and Physics. At VinUniversity, these subjects, along with my medical coursework, have provided me with the necessary basic foundation for further medical journey. However, I believe that true learning occurs when theory is applied to the field.  
While VinUniversity has a great international campus, the clinical work at the hospitals here is still mostly with Vietnamese doctors and patients. That is why I want to have a study exchange chance at Sechenov University. Moscow is the center of Russia, and many hospitals and institutes of your university are central level in Russia and other surrounding countries so I can work with diverse patient groups and many rare cases. For example, the recent 2025 case of a 10 months old baby had a dual genetic mutation of familial dilated cardiomyopathy and arterial calcification. Furthermore, I am deeply attracted by Sechenov’s traditional mentorship model, where professors directly guide students, helping me to actively assist in these complex clinical decisions rather than just observing from a distance. This will give me the real international hospital experience I cannot get at my university. I want to bring these specialized skills back to help our medical community in Vietnam.  
Living and studying at VinUniversity, where English is the primary language and I collaborate with international faculty daily, has prepared me well for this step. I am confident that my strong medical foundation at VinUniversity, hands-on research experience, and alignment with Sechenov University’s values make me a prepared and adaptable exchange candidate. I look forward to the possibility of contributing to your vibrant scientific community and utilizing this international experience to make a meaningful impact on global health.  
Thank you for your time and consideration.  
Sincerely,  
Oanh Nguyen  
`,
    reviewer1Name: "An Nguyen",
    reviewer1Date: "2026-05-15",
    reviewer1Feedback: "The structuring is logical, but consider expanding on the specific examples of cultural shocks.",
    reviewer2Name: "Dr. Elizabeth",
    reviewer2Date: "2026-05-18",
    reviewer2Feedback: "Excellent reflective tone. The analysis is deeply connected to VinUni academic standards.",
    revisionNarrative: "This narrative explains how peer and instructor feedback was integrated to improve the depth and flow of the exchange state of purpose."
  },
  {
    key: "letter-of-recommendation",
    title: "Letter of Recommendation",
    documentBody: `To Whom It May Concern,

I am pleased to introduce Nguyen Le Tu Oanh for your Sechenov University exchange program. I have known her for about four years, and as her research instructor and biology teacher in high school, I have had the opportunity to witness her remarkable growth and achievements. Tu Oanh is an intelligent, thoughtful, and responsible student who has impressed me with her talents.

When I first met her in the 10th grade biology class, I was impressed by her skills in this subject. After starting 10th grade at our specialized biology school, she engaged in school activities with enthusiasm and passion. When I became her research instructor, I gradually got to know Tu Oanh better. I realized that she is very well-rounded. Whenever she encounters complex problems in science or life, even when facing difficulties in using laboratory equipment or field research, she always finds a way to overcome them. I am especially impressed by her willingness to wholeheartedly help her friends overcome both physical and mental injury.

Oanh consistently ranks among the top students in her class. She actively contributes to lessons and helps her classmates who may not fully understand the material. When I organize biology experiments in the laboratory, Oanh is always the most enthusiastic and responsible participant. She loves exploring biological phenomena and works very carefully during practical hours. She completes her homework quickly, allowing her free time to spend on her research project : "Survey on the food composition of Asian Toad (Duttaphrynus melanostictus) at Parks in Ho Chi Minh City” and fieldtrip. Additionally, she is a responsible student, who adheres to rules and takes the initiative to clean her living space and lab desk when necessary.

Oanh has significant potential for leadership and organizing class activities. In our classes that required group presentations related to the biology lessons, I observed her leadership during her talks. She often spoke confidently, making it easy for everyone in the class to follow the content. She has a great mindset of critical inquiry, always wanting to understand the the way behind what she learns. She also showcases various creative talents, including floral design, singing, craft things which always bring positive energy to our community.

Given Oanh's strong moral qualities, scientific abilities, and excellent presentation skills, she has the potential to become an outstanding student and make significant contributions to the community. I believe your school can offer her a perfect place in the study program, helping her to develop into the best version of herself.

Sincerely,

Tran Thi Anh Dao

Vice Head of the Department of Ecology and Evolutionary Biology

VNUHCM - University of Science

ttadao@hcmus.edu.vn`,
    reviewer1Name: "Duy Pham",
    reviewer1Date: "2026-05-17",
    reviewer1Feedback: "Nice drafting. Ensures all key recommendation categories are covered.",
    reviewer2Name: "Professor Smith",
    reviewer2Date: "2026-05-24",
    reviewer2Feedback: "Clearly outlines the student's academic strengths and potential for success on exchange.",
    revisionNarrative: "Refined the recommendation focus areas to emphasize active learning and leadership in group discussions."
  },
  {
    key: "cv",
    title: "Curriculum Vitae",
    documentBody: `# **Nguyen Le Tu Oanh**

**Address:** Ha Noi City, Vietnam   
**Phone:** \+84 908 121 068 | **Email:** 25oanh.nlt@Vinuni.edu.vn

## **Summary**

I am a first-year medical student at VinUniversity who wants to broaden my horizons about clinical work in a more diverse environment. I combine basic medical knowledge with hands-on experience in biological research, experience as a national-level academic event organizer, and environmental volunteering. Proven ability to deal with complex, new environments from laboratory to the real ecological field trip. I am eager to contribute to and expand academic horizons through the exchange program at Sechenov University.

## **Education**

**VinUniversity (VinUni)** | *2025 – Present*

* **Degree:** Bachelor of Medical Doctor Program  
* **Current Status:** First-Year Student   
* **Relevant Coursework:** Medical Biology, Medical Chemistry, Medical Biochemistry, Medical Biophysic, Introduction to Healthcare Communication.

**High School for the Gifted – VNU-HCM** | *Graduated*

* **Major:** Specialized in Biology. GPA: 9.7

## **Research**

**University Research | Public Health & Urban Epidemiology** | *2026*

* **Project:** The impact of building design features on mosquito distribution and abundance in high-rise residential complexes.  
* **Focus:** Investigated how modern building designs affect mosquito breeding habits and dengue transmission, aiming to propose structural interventions for urban disease control.

**Highschool Laboratory Research | Ecology** | *2024*

* **Project:** Survey on the food composition of Asian Toad (*Duttaphrynus*  
* *melanostictus)* at Parks in Ho Chi Minh city  
* **Methodology:** Do field surveys and dietary analysis of urban toad populations to assess food composition and ecological roles in urban green spaces. This research provided foundational insights into natural control. 

## **Extra-curricular  & Volunteer Experiences**

**National Medical Academic Competition (NMAC 2025\)**  
*Organizing Committee Member – Design Team* | *2025*

* Collaborated in branding and creating visual social media posts, merches and backdrop to promote a national level competition.

**TUMORACE 2026: RUN WITH EMPATHY**  
*Active Participant / Runner* | *2026*

* Engaged in a running challenge focused on cancer, problem-solving, and understanding patients' emotions.

**Con Dao National Park Conservation Program**  
*Marine Conservation Volunteer* | *2024*

* Participated in hands-on field activities dedicated to marine ecosystem preservation, sea turtle nesting protection, and coastal biodiversity monitoring, trash picking.

**High School for the Gifted German Club (PTNK Deutschklub)**  
*Club Advisor* | *Present*

* Provide strategic guidance, event planning mentorship, and cultural exchange support for the club's executive board.

## **Language & Skill**

**Languages:**

* **Vietnamese:** Native  
* **English:** Proficient (**IELTS Overall 7.5**)  
* **German:** Intermediate (**B1 Level**)  
  **Skills:**  
* **Digital drawing & Canva design**   
* Handicraft stuff & Floral Arrangement  
  **Soft Skills:** Public speaking, bilingual MC, small business management, english tutoring, flower arranging`,
    reviewer1Name: "Binh Tran",
    reviewer1Date: "2026-05-14",
    reviewer1Feedback: "Make sure to list your key technical skills clearly. The layout looks clean and easy to scan.",
    reviewer2Name: "Career Advisor",
    reviewer2Date: "2026-05-20",
    reviewer2Feedback: "Good structure. Emphasize your academic projects and collaborations.",
    revisionNarrative: "Refined the CV by highlighting collaborative class projects and styling the skills section for visual clarity."
  },
  {
    key: "cultural-adaptation",
    title: "Cultural Adaptation",
    documentBody: `As a medical student who is preparing for a study exchange program, I have trained myself to be quickly adaptable to new environments. My ability to fit into different cultural and academic settings comes from my journey of learning and exposing myself to new challenges. From my specialized ecological and cultural activity background in high school to my current international university environment, each step has helped me build the resilience and adaptability I need to apply for the exchange program at Sechenov University.

My journey started during my very first year in my High School where I first joined my Deutschklub and learnt German to study medicine abroad in Germany in the future. Fortunately, I reached B2 level in my German which led me to a memorible cultural exchange trip to Heidelberg University organized by the Goethe institute. Living and studying with many global friends, trying local cuisine and even buying myself German traditional clothes in a European university town for the first time taught me how to adapt to a new culture and communicate with people from different backgrounds. Moreover, based on cultural difficulties I had in Germany, I have already begun researching Russian social etiquette and cultural norms to ensure a smooth transition into life in Moscow.

I also tested my adaptability through outdoor voluntary activities and field research. When I did my ecological survey on the toads in Ho Chi Minh City parks and volunteering for ocean conservation at Con Dao National Park really pushed me out of my comfort zone. As someone who had a fear of insects, sticky organisms and had never traveled to rugged, unpredictable environments before, these projects initially felt overwhelming. However, these experiences taught me to be proactive when entering new environments, which is very important for an exchange program. Just as I learned to step out of my comfort zone in those strange environments combined with several experiences in international settings, I am confident to adapt to Moscow’s harsh winter and the fast-paced life. 

Currently, as a medical student at VinUniversity, cultural adaptation is part of my daily life. Studying in an all-English environment has improved my communication skills. Plus, working and living in the same dorm with international classmates and faculty members every day has sharpened my teamwork and empathy. This multicultural setting makes me highly comfortable working in global teams, which will help me understand the lectures and involve my global peers better.

Lastly, my first year in an international campus life at VinUniversity, which proves that I am ready for Sechenov University. I have the language tools, the scientific curiosity, and the daily experience of studying in an English-dominant environment. These skills will allow me to fit right into the academic culture at Sechenov University, where I am excited to experience Russia’s rich medical heritage and collaborate with my future Russian classmates and mentors.`,
    reviewer1Name: "An Nguyen",
    reviewer1Date: "2026-05-15",
    reviewer1Feedback: "The structuring is logical, but consider expanding on the specific examples of cultural adaptation in global teams.",
    reviewer2Name: "Dr. Elizabeth",
    reviewer2Date: "2026-05-18",
    reviewer2Feedback: "Excellent reflective tone. The analysis is deeply connected to VinUni academic standards.",
    revisionNarrative: "This narrative explains how peer and instructor feedback was integrated to improve the depth and flow of the cultural adaptation analysis."
  },
  {
    key: "program-material",
    title: "Program Material",
    documentBody: `# **Study Plan**

## **The Reason for Choosing Sechenov University**

I chose Sechenov University because I want a real international hospital experience that I cannot get at my university. Right now, VinUniversity gives me a great academic environment, but when I go to the hospital for clinical work in Vietnam, I still work almost with local doctors and patients. On the othe hand, Sechenov University is located in a global hub like Moscow, which consists of a diverse mix of patients from all over the world. Studying there is the perfect opportunity for me to see how an international healthcare system works in real life. 

## **Proposed Course of Study at Sechenov University**

To really understand how international hospitals work and how to care for global patients, I plan to take these four subjects from the curriculum of basic professional educational program of general medicine at Sechenov University:

* **Medical Emergencies**  
  International major hospitals are always on the frontlines during weather disasters and health crises. I want to take this course to learn how medical teams actually coordinate under pressure and what safety standards they use to handle chaotic situations.  
* **Bioethics**  
  Treating international patients means meeting people with completely different cultures, religions, and legal backgrounds. Studying bioethics will give me the practical tools to navigate sensitive cultural insights and provide respectful care to patients from any background.  
* **Epidemiology**  
  This subject connects my natural curiosity about biology with public health. It will teach me how to look at a diverse city like Moscow and track disease patterns, analyze health data, and manage health risks across different populations.  
* **Psychology and Pedagogy**  
  To be effective in an international environment, I need to train both of my understanding and empathy in medicine. Psychology will help me understand different mindsets and ease patient anxiety across cultures, while Pedagogy will teach me how to explain complicated treatments and health instructions clearly to patients who do not speak my language fluently.

## **Future Outlook**

When I return to Vietnam, I plan to bring these global standards back to VinUniversity and our local environment. The valuable experience I gain at Sechenov University in emergency situations, cross-cultural communication, and public health data will help me become a more adaptable doctor who can improve patient care and help our local healthcare system handle diverse needs.`,
    reviewer1Name: "Chi Le",
    reviewer1Date: "2026-05-16",
    reviewer1Feedback: "The timeline is clear. Consider adding specific course codes if available.",
    reviewer2Name: "Advisor",
    reviewer2Date: "2026-05-22",
    reviewer2Feedback: "Solid academic roadmap. Aligns perfectly with the graduation requirements.",
    revisionNarrative: "Incorporated academic timeline milestones and mapped course expectations to match the study abroad prerequisites."
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
