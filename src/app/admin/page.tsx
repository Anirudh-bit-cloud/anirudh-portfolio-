"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  User,
  Layers,
  Briefcase,
  Wrench,
  GraduationCap,
  Save,
  RotateCcw,
  ExternalLink,
  Trash2,
  Reply,
  CheckCircle2,
  Mail,
  Plus,
  Lock,
  Unlock,
  Eye,
  LogOut,
  Clock,
  Search,
  Filter,
  Check,
  AlertCircle,
} from "lucide-react";
import { usePortfolio, ContactMessage } from "@/context/PortfolioContext";
import { Project, ExperienceItem, CertificationItem } from "@/data/portfolioData";

export default function AdminPage() {
  const {
    data,
    updatePersonal,
    updateProjects,
    updateExperiences,
    updateSkillGroups,
    updateEducation,
    updateCertifications,
    resetToDefault,
    messages,
    replyToMessage,
    markMessageStatus,
    deleteMessage,
    isAdmin,
    setIsAdmin,
  } = usePortfolio();

  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "inbox" | "personal" | "projects" | "experience" | "skills" | "academics"
  >("inbox");

  // Local draft states for edits
  const [personalForm, setPersonalForm] = useState(data.personal);
  const [projectsList, setProjectsList] = useState<Project[]>(data.projects);
  const [experienceList, setExperienceList] = useState<ExperienceItem[]>(data.experiences);
  const [skillGroupsList, setSkillGroupsList] = useState(data.skillGroups);
  const [educationList, setEducationList] = useState(data.education);
  const [certificationsList, setCertificationsList] = useState(data.certifications);

  // Message reply modal state
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [messageFilter, setMessageFilter] = useState<"all" | "new" | "replied" | "archived">("all");

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "anirudh2026" || pinInput === "admin123" || pinInput === "1234") {
      setIsAdmin(true);
      setPinError("");
      showNotification("Welcome back, Anirudh! Dashboard unlocked.");
    } else {
      setPinError("Invalid Passcode. Access denied.");
    }
  };

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonal(personalForm);
    showNotification("Personal details updated live on public view!");
  };

  const handleSaveProjects = () => {
    updateProjects(projectsList);
    showNotification("Projects portfolio saved and updated live!");
  };

  const handleSaveExperiences = () => {
    updateExperiences(experienceList);
    showNotification("Experience timeline updated live!");
  };

  const handleSaveSkills = () => {
    updateSkillGroups(skillGroupsList);
    showNotification("Skills and toolchain updated live!");
  };

  const handleSaveAcademics = () => {
    updateEducation(educationList);
    updateCertifications(certificationsList);
    showNotification("Academics and credentials updated live!");
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyBody.trim()) return;

    replyToMessage(selectedMessage.id, replyBody);
    showNotification(`Reply dispatched and recorded for ${selectedMessage.name}!`);
    setSelectedMessage(null);
    setReplyBody("");
  };

  const filteredMessages = messages
    .filter((m) => {
      if (messageFilter === "all") return true;
      return m.status === messageFilter;
    })
    .filter((m) => {
      if (!messageSearch.trim()) return true;
      const q = messageSearch.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q) ||
        (m.subject && m.subject.toLowerCase().includes(q))
      );
    });

  const unreadCount = messages.filter((m) => m.status === "new").length;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-bg text-fg flex items-center justify-center p-6">
        <div className="w-full max-w-md p-8 rounded-2xl bg-bg-card hairline shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent mx-auto flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-fg">
              Portfolio CMS &amp; Desk
            </h1>
            <p className="font-mono text-xs text-fg-muted">
              Security Gate &bull; Restricted to Anirudh Saini
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 font-mono text-xs">
              <label className="text-fg-faint uppercase text-[10px]">Passcode / PIN</label>
              <input
                type="password"
                placeholder="Enter passcode"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded bg-bg hairline text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent text-sm"
              />
              {pinError && <p className="text-rose-500 text-[11px]">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded bg-accent text-accent-contrast font-mono text-xs uppercase font-bold tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="pt-4 hairline-t flex flex-col gap-2 font-mono text-xs">
            <Link
              href="/"
              className="text-center text-fg-faint hover:text-fg transition-colors py-1"
            >
              &larr; Return to Public Portfolio View
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-fg font-sans flex flex-col">
      {/* Toast Notification Alert */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-accent text-accent-contrast font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Top Navbar */}
      <header className="px-6 sm:px-10 py-4 hairline-b bg-bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
          <h1 className="font-display font-bold text-sm tracking-tight text-fg uppercase">
            Anirudh Saini &bull; Control Center &amp; CMS
          </h1>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-subtle hairline text-accent">
            Live Editor Active
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded hairline bg-bg hover:border-accent hover:text-accent transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Open Public Site</span>
            <ExternalLink className="w-3 h-3 text-fg-faint" />
          </Link>

          <button
            onClick={() => {
              if (confirm("Reset all portfolio text and data back to factory defaults?")) {
                resetToDefault();
                setPersonalForm(data.personal);
                setProjectsList(data.projects);
                setExperienceList(data.experiences);
                showNotification("Portfolio reset to original state.");
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded hairline text-fg-muted hover:text-rose-400 hover:border-rose-400/40 transition-colors"
            title="Reset to default content"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={() => setIsAdmin(false)}
            className="p-1.5 rounded hairline text-fg-muted hover:text-fg hover:bg-bg transition-colors"
            title="Log out of CMS"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-1 font-mono text-xs">
          <button
            onClick={() => setActiveTab("inbox")}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
              activeTab === "inbox"
                ? "bg-accent text-accent-contrast font-bold"
                : "text-fg hover:bg-bg-card hairline"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" />
              <span>Queries &amp; Inbox</span>
            </div>
            {unreadCount > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  activeTab === "inbox"
                    ? "bg-[#0b0c0e] text-[#d4ff3f]"
                    : "bg-accent text-accent-contrast"
                }`}
              >
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("personal")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-lg text-left transition-colors ${
              activeTab === "personal"
                ? "bg-accent text-accent-contrast font-bold"
                : "text-fg hover:bg-bg-card hairline"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile &amp; Hero Info</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-lg text-left transition-colors ${
              activeTab === "projects"
                ? "bg-accent text-accent-contrast font-bold"
                : "text-fg hover:bg-bg-card hairline"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Projects Showcase</span>
          </button>

          <button
            onClick={() => setActiveTab("experience")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-lg text-left transition-colors ${
              activeTab === "experience"
                ? "bg-accent text-accent-contrast font-bold"
                : "text-fg hover:bg-bg-card hairline"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Work &amp; Traineeships</span>
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-lg text-left transition-colors ${
              activeTab === "skills"
                ? "bg-accent text-accent-contrast font-bold"
                : "text-fg hover:bg-bg-card hairline"
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Skills &amp; Toolchain</span>
          </button>

          <button
            onClick={() => setActiveTab("academics")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-lg text-left transition-colors ${
              activeTab === "academics"
                ? "bg-accent text-accent-contrast font-bold"
                : "text-fg hover:bg-bg-card hairline"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Education &amp; DSA</span>
          </button>
        </aside>

        {/* Right Content Work Area */}
        <main className="lg:col-span-9 bg-bg-card p-6 sm:p-10 rounded-xl hairline shadow-xl min-h-[600px]">
          {/* TAB 1: INBOX & QUERIES */}
          {activeTab === "inbox" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 hairline-b">
                <div>
                  <h2 className="font-display text-xl font-bold uppercase tracking-tight text-fg">
                    Client Queries &amp; Messages ({messages.length})
                  </h2>
                  <p className="font-mono text-xs text-fg-muted mt-0.5">
                    Messages transmitted from the public portfolio contact form.
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  {(["all", "new", "replied", "archived"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setMessageFilter(filter)}
                      className={`px-2.5 py-1 rounded capitalize transition-colors ${
                        messageFilter === filter
                          ? "bg-accent text-accent-contrast font-bold"
                          : "bg-bg-subtle hairline text-fg-muted hover:text-fg"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative font-mono text-xs">
                <Search className="w-4 h-4 text-fg-faint absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter queries by name, email, or message..."
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded bg-bg hairline text-fg focus:outline-none focus:border-accent"
                />
              </div>

              {/* Messages List */}
              <div className="space-y-4">
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-16 font-mono text-xs text-fg-faint hairline rounded-lg">
                    No queries found under this filter.
                  </div>
                ) : (
                  filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-5 rounded-lg bg-bg hairline space-y-3 hover:border-fg transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-fg text-sm">{msg.name}</span>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-accent hover:underline flex items-center gap-1"
                          >
                            <span>{msg.email}</span>
                          </a>
                        </div>
                        <div className="flex items-center gap-3 text-fg-faint text-[11px]">
                          <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                          <span
                            className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] ${
                              msg.status === "new"
                                ? "bg-accent/20 text-accent border border-accent/40"
                                : msg.status === "replied"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                : "bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            {msg.status}
                          </span>
                        </div>
                      </div>

                      {msg.subject && (
                        <div className="text-xs font-mono font-semibold text-fg">
                          Topic: {msg.subject}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-fg-muted leading-relaxed font-sans bg-bg-card p-3.5 rounded hairline">
                        {msg.message}
                      </p>

                      {msg.replyText && (
                        <div className="p-3.5 rounded bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono text-emerald-400 space-y-1">
                          <span className="font-bold block text-[10px] uppercase">
                            Your Sent Reply ({msg.repliedAt ? new Date(msg.repliedAt).toLocaleDateString() : "Saved"}):
                          </span>
                          <p className="text-fg">{msg.replyText}</p>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between pt-2 hairline-t font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedMessage(msg);
                              setReplyBody(msg.replyText || "");
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent text-accent-contrast font-bold hover:brightness-110 transition-all"
                          >
                            <Reply className="w-3.5 h-3.5" />
                            <span>{msg.replyText ? "Edit Reply" : "Compose Reply"}</span>
                          </button>

                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                              msg.subject || "Your Inquiry"
                            )}&body=Hi ${encodeURIComponent(msg.name)},\n\nThank you for reaching out.`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded hairline bg-bg-subtle text-fg hover:border-fg transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-fg-muted" />
                            <span>Open Mail Client</span>
                          </a>
                        </div>

                        <div className="flex items-center gap-2 text-[11px]">
                          {msg.status !== "archived" ? (
                            <button
                              onClick={() => markMessageStatus(msg.id, "archived")}
                              className="text-fg-faint hover:text-fg"
                            >
                              Archive
                            </button>
                          ) : (
                            <button
                              onClick={() => markMessageStatus(msg.id, "new")}
                              className="text-fg-faint hover:text-accent"
                            >
                              Mark as New
                            </button>
                          )}
                          <span className="text-fg-faint">&bull;</span>
                          <button
                            onClick={() => {
                              if (confirm("Delete this message?")) {
                                deleteMessage(msg.id);
                                showNotification("Message deleted.");
                              }
                            }}
                            className="text-rose-500 hover:text-rose-400"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & HERO INFO */}
          {activeTab === "personal" && (
            <form onSubmit={handleSavePersonal} className="space-y-6">
              <div className="flex items-center justify-between pb-4 hairline-b">
                <div>
                  <h2 className="font-display text-xl font-bold uppercase tracking-tight text-fg">
                    Personal Identity &amp; Hero Details
                  </h2>
                  <p className="font-mono text-xs text-fg-muted mt-0.5">
                    Modifying these values immediately updates the public portfolio hero.
                  </p>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-accent text-accent-contrast font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Live</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-fg-faint uppercase text-[10px]">Full Name</label>
                  <input
                    type="text"
                    value={personalForm.name}
                    onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-bg hairline text-fg focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-fg-faint uppercase text-[10px]">Professional Role</label>
                  <input
                    type="text"
                    value={personalForm.role}
                    onChange={(e) => setPersonalForm({ ...personalForm, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-bg hairline text-fg focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-fg-faint uppercase text-[10px]">Main Headline Tagline</label>
                  <input
                    type="text"
                    value={personalForm.tagline}
                    onChange={(e) => setPersonalForm({ ...personalForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-bg hairline text-fg focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-fg-faint uppercase text-[10px] text-accent font-bold">
                    [CURRENTLY] Status Indicator Text
                  </label>
                  <input
                    type="text"
                    value={personalForm.currently}
                    onChange={(e) => setPersonalForm({ ...personalForm, currently: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-bg hairline text-fg focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-fg-faint uppercase text-[10px]">Direct Email</label>
                  <input
                    type="email"
                    value={personalForm.email}
                    onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-bg hairline text-fg focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-fg-faint uppercase text-[10px]">Phone Number</label>
                  <input
                    type="text"
                    value={personalForm.phone}
                    onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-bg hairline text-fg focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-fg-faint uppercase text-[10px]">Location</label>
                  <input
                    type="text"
                    value={personalForm.location}
                    onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-bg hairline text-fg focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-fg-faint uppercase text-[10px]">GPS Coordinates</label>
                  <input
                    type="text"
                    value={personalForm.coordinates}
                    onChange={(e) => setPersonalForm({ ...personalForm, coordinates: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-bg hairline text-fg focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-fg-faint uppercase text-[10px]">GitHub URL</label>
                  <input
                    type="text"
                    value={personalForm.socials.github}
                    onChange={(e) =>
                      setPersonalForm({
                        ...personalForm,
                        socials: { ...personalForm.socials, github: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded bg-bg hairline text-fg focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-fg-faint uppercase text-[10px]">LinkedIn URL</label>
                  <input
                    type="text"
                    value={personalForm.socials.linkedin}
                    onChange={(e) =>
                      setPersonalForm({
                        ...personalForm,
                        socials: { ...personalForm.socials, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded bg-bg hairline text-fg focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-fg-faint uppercase text-[10px]">LeetCode Profile Handle</label>
                  <input
                    type="text"
                    value={personalForm.socials.leetcodeHandle}
                    onChange={(e) =>
                      setPersonalForm({
                        ...personalForm,
                        socials: { ...personalForm.socials, leetcodeHandle: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded bg-bg hairline text-fg focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded bg-accent text-accent-contrast font-mono text-xs uppercase font-bold tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save All Profile Changes Live</span>
              </button>
            </form>
          )}

          {/* TAB 3: PROJECTS SHOWCASE */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 hairline-b">
                <div>
                  <h2 className="font-display text-xl font-bold uppercase tracking-tight text-fg">
                    Featured Projects Manager
                  </h2>
                  <p className="font-mono text-xs text-fg-muted mt-0.5">
                    Configure titles, architecture details, stack tags, and metric badges.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newProj: Project = {
                        number: "0" + (projectsList.length + 1),
                        id: "proj-" + Date.now(),
                        title: "New Machine Learning Project",
                        year: "2026",
                        tagline: "Short architecture tagline describing the system.",
                        problem: "The problem this engineering project addresses.",
                        built: "What was engineered and how.",
                        outcome: "Quantified metric outcome.",
                        metricBadge: "90% Benchmark Accuracy",
                        category: "Machine Learning",
                        stack: ["Python", "FastAPI", "React"],
                        githubUrl: "https://github.com/Anirudh-bit-cloud",
                        architecture: {
                          model: "Supervised Classifier",
                          backend: "FastAPI REST microservice",
                        },
                      };
                      setProjectsList([...projectsList, newProj]);
                      showNotification("New project added to draft. Click Save to publish.");
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded hairline bg-bg-subtle font-mono text-xs text-fg hover:border-fg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                  <button
                    onClick={handleSaveProjects}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-accent text-accent-contrast font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish Changes</span>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {projectsList.map((proj, idx) => (
                  <div key={proj.id} className="p-5 rounded-lg bg-bg hairline space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs hairline-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-accent">/{proj.number}</span>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx].title = e.target.value;
                            setProjectsList(updated);
                          }}
                          className="font-bold text-fg bg-transparent border-b border-transparent hover:border-line focus:border-accent focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Remove project "${proj.title}"?`)) {
                            const updated = projectsList.filter((_, i) => i !== idx);
                            setProjectsList(updated);
                          }
                        }}
                        className="text-rose-500 hover:text-rose-400 p-1"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                      <div>
                        <label className="text-[10px] text-fg-faint uppercase block">Metric Badge</label>
                        <input
                          type="text"
                          value={proj.metricBadge}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx].metricBadge = e.target.value;
                            setProjectsList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-fg-faint uppercase block">Year</label>
                        <input
                          type="text"
                          value={proj.year}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx].year = e.target.value;
                            setProjectsList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-fg-faint uppercase block">GitHub Link</label>
                        <input
                          type="text"
                          value={proj.githubUrl}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx].githubUrl = e.target.value;
                            setProjectsList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 font-mono text-xs">
                      <label className="text-[10px] text-fg-faint uppercase block">Tagline</label>
                      <input
                        type="text"
                        value={proj.tagline}
                        onChange={(e) => {
                          const updated = [...projectsList];
                          updated[idx].tagline = e.target.value;
                          setProjectsList(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                      <div>
                        <label className="text-[10px] text-fg-faint uppercase block">The Problem</label>
                        <textarea
                          rows={2}
                          value={proj.problem}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx].problem = e.target.value;
                            setProjectsList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-fg-faint uppercase block">What I Built</label>
                        <textarea
                          rows={2}
                          value={proj.built}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx].built = e.target.value;
                            setProjectsList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent resize-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 font-mono text-xs">
                      <label className="text-[10px] text-accent uppercase font-bold block">
                        Real Outcome / Quantified Metric
                      </label>
                      <input
                        type="text"
                        value={proj.outcome}
                        onChange={(e) => {
                          const updated = [...projectsList];
                          updated[idx].outcome = e.target.value;
                          setProjectsList(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="space-y-1 font-mono text-xs">
                      <label className="text-[10px] text-fg-faint uppercase block">
                        Stack (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={proj.stack.join(", ")}
                        onChange={(e) => {
                          const updated = [...projectsList];
                          updated[idx].stack = e.target.value.split(",").map((s) => s.trim());
                          setProjectsList(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXPERIENCE & ROLES */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 hairline-b">
                <div>
                  <h2 className="font-display text-xl font-bold uppercase tracking-tight text-fg">
                    Work Experience &amp; Traineeships
                  </h2>
                  <p className="font-mono text-xs text-fg-muted mt-0.5">
                    Manage C-DAC MEPZ specialization, leadership duties, and dates.
                  </p>
                </div>
                <button
                  onClick={handleSaveExperiences}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-accent text-accent-contrast font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Changes</span>
                </button>
              </div>

              <div className="space-y-6">
                {experienceList.map((exp, idx) => (
                  <div key={exp.number} className="p-5 rounded-lg bg-bg hairline space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                      <div>
                        <label className="text-[10px] text-fg-faint uppercase block">Role Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const updated = [...experienceList];
                            updated[idx].role = e.target.value;
                            setExperienceList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg font-bold focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-fg-faint uppercase block">Organization</label>
                        <input
                          type="text"
                          value={exp.organization}
                          onChange={(e) => {
                            const updated = [...experienceList];
                            updated[idx].organization = e.target.value;
                            setExperienceList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-fg-faint uppercase block">Period / Dates</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => {
                            const updated = [...experienceList];
                            updated[idx].period = e.target.value;
                            setExperienceList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-fg-faint uppercase block">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => {
                            const updated = [...experienceList];
                            updated[idx].location = e.target.value;
                            setExperienceList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 font-mono text-xs">
                      <label className="text-[10px] text-fg-faint uppercase block">Role Summary</label>
                      <input
                        type="text"
                        value={exp.summary}
                        onChange={(e) => {
                          const updated = [...experienceList];
                          updated[idx].summary = e.target.value;
                          setExperienceList(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="space-y-1 font-mono text-xs">
                      <label className="text-[10px] text-fg-faint uppercase block">
                        Responsibilities (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={exp.responsibilities.join("\n")}
                        onChange={(e) => {
                          const updated = [...experienceList];
                          updated[idx].responsibilities = e.target.value.split("\n");
                          setExperienceList(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SKILLS & TOOLCHAIN */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 hairline-b">
                <div>
                  <h2 className="font-display text-xl font-bold uppercase tracking-tight text-fg">
                    Skills &amp; Capabilities Stack
                  </h2>
                  <p className="font-mono text-xs text-fg-muted mt-0.5">
                    Edit categorized capabilities and tools.
                  </p>
                </div>
                <button
                  onClick={handleSaveSkills}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-accent text-accent-contrast font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Changes</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                {skillGroupsList.map((group, gIdx) => (
                  <div key={group.index} className="p-4 rounded-lg bg-bg hairline space-y-3">
                    <div className="flex items-center justify-between hairline-b pb-2">
                      <span className="text-accent font-bold">/{group.index}</span>
                      <input
                        type="text"
                        value={group.name}
                        onChange={(e) => {
                          const updated = [...skillGroupsList];
                          updated[gIdx].name = e.target.value;
                          setSkillGroupsList(updated);
                        }}
                        className="text-fg font-bold bg-transparent focus:outline-none text-right"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-fg-faint uppercase block">
                        Technologies (comma-separated)
                      </label>
                      <textarea
                        rows={3}
                        value={group.items.join(", ")}
                        onChange={(e) => {
                          const updated = [...skillGroupsList];
                          updated[gIdx].items = e.target.value.split(",").map((s) => s.trim());
                          setSkillGroupsList(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ACADEMICS & DSA */}
          {activeTab === "academics" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 hairline-b">
                <div>
                  <h2 className="font-display text-xl font-bold uppercase tracking-tight text-fg">
                    Education &amp; Credentials
                  </h2>
                  <p className="font-mono text-xs text-fg-muted mt-0.5">
                    Update CGPA, degree programs, and competitive milestones.
                  </p>
                </div>
                <button
                  onClick={handleSaveAcademics}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-accent text-accent-contrast font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Changes</span>
                </button>
              </div>

              {/* Education List */}
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold block">
                  Education Entries
                </span>
                {educationList.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-bg hairline space-y-2 font-mono text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].degree = e.target.value;
                          setEducationList(updated);
                        }}
                        className="font-bold text-fg bg-transparent border-b border-line focus:outline-none"
                      />
                      <input
                        type="text"
                        value={edu.grade}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].grade = e.target.value;
                          setEducationList(updated);
                        }}
                        className="text-accent font-bold bg-transparent border-b border-line focus:outline-none text-right"
                      />
                    </div>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => {
                        const updated = [...educationList];
                        updated[idx].school = e.target.value;
                        setEducationList(updated);
                      }}
                      className="w-full text-fg-muted bg-transparent focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Certifications & Credentials List */}
              <div className="space-y-4 pt-6 hairline-t">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold block">
                    Accredited Certifications &amp; Credentials ({certificationsList.length})
                  </span>
                  <button
                    onClick={() => {
                      const newCert: CertificationItem = {
                        id: "cert-" + Date.now(),
                        title: "New Professional Certification",
                        issuer: "Accredited Body / University",
                        tag: "Specialization",
                        issueDate: "2026",
                        credentialId: "CERT-" + Math.floor(100000 + Math.random() * 900000),
                        verificationUrl: "https://example.com/verify",
                        description: "Coursework, laboratory hours, and proctored examination details.",
                        skills: ["Core Competence", "Verification"],
                      };
                      setCertificationsList([...certificationsList, newCert]);
                      showNotification("New certification draft added. Click Publish Changes to save.");
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded hairline bg-bg-subtle font-mono text-xs text-fg hover:border-fg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certificate</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {certificationsList.map((cert, cIdx) => (
                    <div key={cert.id || cIdx} className="p-5 rounded-lg bg-bg hairline space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between hairline-b pb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            value={cert.title}
                            onChange={(e) => {
                              const updated = [...certificationsList];
                              updated[cIdx].title = e.target.value;
                              setCertificationsList(updated);
                            }}
                            placeholder="Certificate Title"
                            className="font-bold text-fg bg-transparent border-b border-transparent hover:border-line focus:border-accent focus:outline-none flex-1 text-sm"
                          />
                        </div>
                        <button
                          onClick={() => {
                            if (confirm(`Delete certificate "${cert.title}"?`)) {
                              const updated = certificationsList.filter((_, i) => i !== cIdx);
                              setCertificationsList(updated);
                            }
                          }}
                          className="text-rose-500 hover:text-rose-400 p-1 ml-2"
                          title="Delete certificate"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] text-fg-faint uppercase block">Issuing Organization</label>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => {
                              const updated = [...certificationsList];
                              updated[cIdx].issuer = e.target.value;
                              setCertificationsList(updated);
                            }}
                            className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-fg-faint uppercase block">Credential Category / Tag</label>
                          <input
                            type="text"
                            value={cert.tag}
                            onChange={(e) => {
                              const updated = [...certificationsList];
                              updated[cIdx].tag = e.target.value;
                              setCertificationsList(updated);
                            }}
                            className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-fg-faint uppercase block">Issue Date</label>
                          <input
                            type="text"
                            value={cert.issueDate || ""}
                            onChange={(e) => {
                              const updated = [...certificationsList];
                              updated[cIdx].issueDate = e.target.value;
                              setCertificationsList(updated);
                            }}
                            className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-fg-faint uppercase block">Credential ID / Hash</label>
                          <input
                            type="text"
                            value={cert.credentialId || ""}
                            onChange={(e) => {
                              const updated = [...certificationsList];
                              updated[cIdx].credentialId = e.target.value;
                              setCertificationsList(updated);
                            }}
                            className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-fg-faint uppercase block">Verification URL</label>
                          <input
                            type="text"
                            value={cert.verificationUrl || ""}
                            onChange={(e) => {
                              const updated = [...certificationsList];
                              updated[cIdx].verificationUrl = e.target.value;
                              setCertificationsList(updated);
                            }}
                            className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-fg-faint uppercase block">Coursework &amp; Exam Description</label>
                        <textarea
                          rows={2}
                          value={cert.description}
                          onChange={(e) => {
                            const updated = [...certificationsList];
                            updated[cIdx].description = e.target.value;
                            setCertificationsList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent resize-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-fg-faint uppercase block">Skills Covered (comma-separated)</label>
                        <input
                          type="text"
                          value={cert.skills ? cert.skills.join(", ") : ""}
                          onChange={(e) => {
                            const updated = [...certificationsList];
                            updated[cIdx].skills = e.target.value.split(",").map((s) => s.trim());
                            setCertificationsList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Reply Composer Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg p-6 rounded-xl bg-bg text-fg hairline shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between hairline-b pb-3">
              <h3 className="font-bold text-sm text-fg">
                Reply to {selectedMessage.name}
              </h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-fg-muted hover:text-fg"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-1 bg-bg-card p-3 rounded hairline">
              <span className="text-[10px] uppercase text-fg-faint block">Original Message</span>
              <p className="text-fg-muted italic">&ldquo;{selectedMessage.message}&rdquo;</p>
            </div>

            <form onSubmit={handleSendReply} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-fg-faint">Your Response</label>
                <textarea
                  rows={4}
                  placeholder="Hello, thank you for reaching out..."
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-bg-card hairline text-fg focus:outline-none focus:border-accent resize-none text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject || "Your Inquiry"
                  )}&body=${encodeURIComponent(replyBody)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Open in Mail Client</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-accent text-accent-contrast font-bold hover:brightness-110 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save &amp; Mark Replied</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
