import type { Park } from "@/lib/types";

// DEMO DATA — fictional science & technology parks, invented for this prototype.
export const parks: Park[] = [
  {
    id: "park-harborview",
    name: "Harborview Innovation Quarter",
    region: "North America",
    country: "Canada",
    description:
      "A waterfront innovation district focused on climate tech and advanced manufacturing, run in partnership with three regional universities.",
    focusIndustries: ["Climate & Energy", "Advanced Manufacturing"],
    residentStartups: 86,
    programs: ["Pre-seed residency", "Manufacturing pilot line", "Corporate pairing"],
    founded: 2011,
  },
  {
    id: "park-lindenau",
    name: "Lindenau Science Campus",
    region: "Western Europe",
    country: "Germany",
    description:
      "A research-park spinout of a technical university, specializing in industrial AI and robotics with a shared fabrication lab.",
    focusIndustries: ["AI & Data Infrastructure", "Advanced Manufacturing"],
    residentStartups: 64,
    programs: ["Deep-tech incubation", "IP-to-startup fast track"],
    founded: 2005,
  },
  {
    id: "park-suncoast",
    name: "Suncoast BioPark",
    region: "North America",
    country: "United States",
    description:
      "A life-sciences park with wet-lab space and a shared instrumentation core for early-stage biotech and diagnostics companies.",
    focusIndustries: ["Health & Biotech"],
    residentStartups: 52,
    programs: ["Wet-lab residency", "Clinical pilot network", "SBIR grant clinic"],
    founded: 1998,
  },
  {
    id: "park-meridiana",
    name: "Meridiana Digital Park",
    region: "Southeast Asia",
    country: "Singapore",
    description:
      "A fintech and data-infrastructure hub serving as a regional bridge between Southeast Asian founders and global capital.",
    focusIndustries: ["Fintech", "AI & Data Infrastructure", "Cybersecurity"],
    residentStartups: 110,
    programs: ["Cross-border expansion desk", "RegTech sandbox access"],
    founded: 2014,
  },
  {
    id: "park-altiplano",
    name: "Altiplano Agritech Hub",
    region: "Latin America",
    country: "Chile",
    description:
      "A field-adjacent innovation park supporting agri- and food-tech startups with test farm access and export-market introductions.",
    focusIndustries: ["Agri & Foodtech", "Climate & Energy"],
    residentStartups: 38,
    programs: ["Test-farm partnership", "Export market desk"],
    founded: 2016,
  },
  {
    id: "park-nordkai",
    name: "Nordkai Maritime & Mobility Park",
    region: "Nordics",
    country: "Norway",
    description:
      "A mobility and logistics-focused park adjacent to a major shipping port, supporting autonomous systems and green-fleet startups.",
    focusIndustries: ["Mobility & Logistics", "Climate & Energy"],
    residentStartups: 29,
    programs: ["Port pilot program", "Fleet electrification testbed"],
    founded: 2019,
  },
];
