"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PERSONAL as defaultPersonal,
  PROJECTS as defaultProjects,
  EXPERIENCES as defaultExperiences,
  SKILL_GROUPS as defaultSkillGroups,
  EDUCATION as defaultEducation,
  CERTIFICATIONS as defaultCertifications,
  Project,
  ExperienceItem,
} from "@/data/portfolioData";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  status: "new" | "replied" | "archived";
  replyText?: string;
  repliedAt?: string;
}

export interface PortfolioData {
  personal: typeof defaultPersonal;
  projects: Project[];
  experiences: ExperienceItem[];
  skillGroups: typeof defaultSkillGroups;
  education: typeof defaultEducation;
  certifications: typeof defaultCertifications;
}

interface PortfolioContextType {
  data: PortfolioData;
  updatePersonal: (personal: Partial<typeof defaultPersonal>) => void;
  updateProjects: (projects: Project[]) => void;
  updateExperiences: (experiences: ExperienceItem[]) => void;
  updateSkillGroups: (groups: typeof defaultSkillGroups) => void;
  updateEducation: (education: typeof defaultEducation) => void;
  updateCertifications: (certifications: typeof defaultCertifications) => void;
  resetToDefault: () => void;

  // Inquiries & Messages
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, "id" | "createdAt" | "status">) => void;
  replyToMessage: (id: string, replyText: string) => void;
  markMessageStatus: (id: string, status: "new" | "replied" | "archived") => void;
  deleteMessage: (id: string) => void;

  // Auth / Editor mode
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const initialMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Dr. K. Ramanathan",
    email: "k.ramanathan@cdac.in",
    subject: "ML Traineeship Milestone Review",
    message: "Hi Anirudh, excellent work on the Bayesian optimization benchmarks with Optuna. Let's schedule a review meeting this Thursday at 3 PM to inspect the SHAP summary results.",
    createdAt: "2026-10-24T14:30:00.000Z",
    status: "new",
  },
  {
    id: "msg-2",
    name: "Arjun Mehta",
    email: "arjun.m@techscale.io",
    subject: "Adaptive Study Twin Project Discussion",
    message: "Saw your repository for the Adaptive Study Twin. We are building personalized AI diagnostics for edtech and would love to discuss your FastAPI architecture and latency optimizations.",
    createdAt: "2026-10-22T09:15:00.000Z",
    status: "replied",
    replyText: "Thanks Arjun! Would be glad to walk you through the inference pipeline and classification benchmarks.",
    repliedAt: "2026-10-22T11:45:00.000Z",
  },
];

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>({
    personal: defaultPersonal,
    projects: defaultProjects,
    experiences: defaultExperiences,
    skillGroups: defaultSkillGroups,
    education: defaultEducation,
    certifications: defaultCertifications,
  });

  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted portfolio data and messages on client mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("as_portfolio_cms_data");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        const hasUnifiedMentor = parsed.experiences?.some((e: any) =>
          e.organization?.toLowerCase().includes("unified mentor")
        );
        if (!hasUnifiedMentor) {
          parsed.experiences = defaultExperiences;
          localStorage.setItem("as_portfolio_cms_data", JSON.stringify(parsed));
        }
        setData(parsed);
      }

      const savedMessages = localStorage.getItem("as_portfolio_cms_messages");
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }

      const savedAdmin = localStorage.getItem("as_portfolio_cms_admin");
      if (savedAdmin === "true") {
        setIsAdmin(true);
      }
    } catch (e) {
      console.warn("Storage access notice:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage whenever data changes
  const savePortfolioData = (updated: PortfolioData) => {
    setData(updated);
    try {
      localStorage.setItem("as_portfolio_cms_data", JSON.stringify(updated));
    } catch {}
  };

  const saveMessages = (msgs: ContactMessage[]) => {
    setMessages(msgs);
    try {
      localStorage.setItem("as_portfolio_cms_messages", JSON.stringify(msgs));
    } catch {}
  };

  const updatePersonal = (personal: Partial<typeof defaultPersonal>) => {
    savePortfolioData({
      ...data,
      personal: { ...data.personal, ...personal },
    });
  };

  const updateProjects = (projects: Project[]) => {
    savePortfolioData({ ...data, projects });
  };

  const updateExperiences = (experiences: ExperienceItem[]) => {
    savePortfolioData({ ...data, experiences });
  };

  const updateSkillGroups = (skillGroups: typeof defaultSkillGroups) => {
    savePortfolioData({ ...data, skillGroups });
  };

  const updateEducation = (education: typeof defaultEducation) => {
    savePortfolioData({ ...data, education });
  };

  const updateCertifications = (certifications: typeof defaultCertifications) => {
    savePortfolioData({ ...data, certifications });
  };

  const resetToDefault = () => {
    const defaultData: PortfolioData = {
      personal: defaultPersonal,
      projects: defaultProjects,
      experiences: defaultExperiences,
      skillGroups: defaultSkillGroups,
      education: defaultEducation,
      certifications: defaultCertifications,
    };
    savePortfolioData(defaultData);
    saveMessages(initialMessages);
  };

  const addMessage = (msg: Omit<ContactMessage, "id" | "createdAt" | "status">) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: "msg-" + Date.now(),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    const updated = [newMsg, ...messages];
    saveMessages(updated);
  };

  const replyToMessage = (id: string, replyText: string) => {
    const updated = messages.map((m) =>
      m.id === id
        ? {
            ...m,
            status: "replied" as const,
            replyText,
            repliedAt: new Date().toISOString(),
          }
        : m
    );
    saveMessages(updated);
  };

  const markMessageStatus = (id: string, status: "new" | "replied" | "archived") => {
    const updated = messages.map((m) => (m.id === id ? { ...m, status } : m));
    saveMessages(updated);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    saveMessages(updated);
  };

  const handleSetIsAdmin = (val: boolean) => {
    setIsAdmin(val);
    try {
      localStorage.setItem("as_portfolio_cms_admin", val ? "true" : "false");
    } catch {}
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updatePersonal,
        updateProjects,
        updateExperiences,
        updateSkillGroups,
        updateEducation,
        updateCertifications,
        resetToDefault,
        messages,
        addMessage,
        replyToMessage,
        markMessageStatus,
        deleteMessage,
        isAdmin,
        setIsAdmin: handleSetIsAdmin,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
