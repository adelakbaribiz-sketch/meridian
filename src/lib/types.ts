export type Industry =
  | "Climate & Energy"
  | "Health & Biotech"
  | "Fintech"
  | "AI & Data Infrastructure"
  | "Advanced Manufacturing"
  | "Agri & Foodtech"
  | "Mobility & Logistics"
  | "Cybersecurity";

export type Stage =
  | "Pre-Seed"
  | "Seed"
  | "Series A"
  | "Series B"
  | "Growth";

export type Region =
  | "North America"
  | "Western Europe"
  | "Nordics"
  | "Southeast Asia"
  | "MENA"
  | "Latin America"
  | "East Asia"
  | "Oceania";

export type Role =
  | "park_manager"
  | "vc_manager"
  | "startup_founder"
  | "event_organizer"
  | "admin";

export interface DemoUser {
  id: string;
  name: string;
  role: Role;
  orgName: string;
  title: string;
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  industries: Industry[];
  stage: Stage;
  region: Region;
  founded: number;
  teamSize: number;
  parkId: string | null;
  raisedToDate: number;
  seeking: number;
  arr: number;
  momGrowth: number;
  tags: string[];
  website: string;
  profileCompleteness: number;
}

export type FirmType = "Venture Fund" | "Angel Syndicate" | "Corporate VC" | "Accelerator Fund";

export interface Investor {
  id: string;
  name: string;
  firmType: FirmType;
  tagline: string;
  description: string;
  focusIndustries: Industry[];
  focusStages: Stage[];
  focusRegions: Region[];
  checkSizeMin: number;
  checkSizeMax: number;
  aum: number;
  portfolioCount: number;
  tags: string[];
  activeSince: number;
}

export interface Park {
  id: string;
  name: string;
  region: Region;
  country: string;
  description: string;
  focusIndustries: Industry[];
  residentStartups: number;
  programs: string[];
  founded: number;
}

export type EventFormat = "In-person" | "Virtual" | "Hybrid";
export type EventType = "Demo Day" | "Summit" | "Pitch Night" | "Workshop" | "Delegation Visit";

export interface EcosystemEvent {
  id: string;
  name: string;
  type: EventType;
  format: EventFormat;
  date: string;
  location: string;
  parkId: string | null;
  description: string;
  capacity: number;
  registered: number;
  participantStartupIds: string[];
  participantInvestorIds: string[];
  status: "upcoming" | "open" | "closed" | "completed";
}

export type DealStage =
  | "Prospect"
  | "Contacted"
  | "Meeting"
  | "Due Diligence"
  | "Term Sheet"
  | "Closed"
  | "Passed";

export interface DealDocument {
  id: string;
  name: string;
  type: "NDA" | "Pitch Deck" | "Cap Table" | "Financials" | "Term Sheet" | "Data Room Index";
  status: "pending" | "shared" | "signed" | "expired";
  updatedAt: string;
}

export interface Deal {
  id: string;
  startupId: string;
  investorId: string;
  stage: DealStage;
  amount: number;
  createdAt: string;
  lastActivity: string;
  nextStep: string;
  documents: DealDocument[];
  ndaSigned: boolean;
}

export interface MatchBreakdown {
  industry: number;
  stage: number;
  geo: number;
  signal: number;
}

export interface Match {
  startupId: string;
  investorId: string;
  score: number;
  breakdown: MatchBreakdown;
  reasons: string[];
}
