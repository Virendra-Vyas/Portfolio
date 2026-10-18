import type { Fact, Profile } from "./schema";

export const profile: Profile = {
  hero: {
    headline:
      "Senior full-stack .NET engineer and founder of Yug Solutions. I lead engineering teams and build production systems for fintech, UK government APIs and connected devices.",
    summary:
      "About nine years of commercial C# and .NET, with React on the front end. I lead a team of five as Lead Software Engineer at Datascope Systems, and in November 2024 I founded Yug Solutions Ltd, a bootstrapped UK software company building products that solve real problems.",
  },
  photo: {
    src: "/images/virendra-vyas",
    alt: "Virendra Vyas, in a dark green shirt and grey coat, photographed outdoors.",
    widths: [160, 320, 480, 640, 960],
    fallbackWidth: 640,
    aspect: { width: 4, height: 5 },
  },
  location: "Eastbourne, East Sussex, UK",
  rightToWork: "UK settled status (ILR). No sponsorship needed.",
  availability: "Open to select contract and permanent roles.",
  workingArrangements: [
    "Contract work through Yug Solutions Ltd, outside IR35.",
    "Fully remote, or hybrid in London.",
  ],
  factLabels: { location: "Based in", rightToWork: "Right to work", availability: "Availability" },
  proofPoints: [
    {
      title: "Zero-incident .NET 7 to .NET 10 migration",
      detail:
        "Led a team of five through a staged, test-driven migration of a live platform. Test coverage went from roughly 40 to 85 percent in two sprints, and releases moved from weekly to daily.",
      link: { label: "DeviceHub case study", href: "/work/devicehub/" },
    },
    {
      title: "40+ UK government API endpoints behind one contract",
      detail:
        "GovBridge UK puts HMRC Making Tax Digital, Companies House, DVLA, Land Registry and FHRS behind one gateway. Corporation Tax submission works end to end and was accepted by HMRC's real Transaction Engine.",
      link: { label: "GovBridge case study", href: "/work/govbridge/" },
    },
    {
      title: "Two engineers mentored from mid-level to senior",
      detail:
        "At Datascope Systems I lead a team of five, run code review and set the team's engineering standards, and I have mentored two engineers from mid-level to senior level.",
      link: { label: "DeviceHub case study", href: "/work/devicehub/" },
    },
  ],
  about: [
    "I'm a senior full-stack engineer based in Eastbourne. I've spent about nine years writing C# and .NET commercially, across enterprise SaaS, fintech, government API integrations and IoT access control, with React on the front end for most of that time.",
    "Since August 2022 I've been Lead Software Engineer at Datascope Systems, where I lead five engineers and own delivery of DeviceHub end to end. That covers architecture, code review, release coordination and working directly with business stakeholders, while staying hands-on in the code.",
    "In November 2024 I founded Yug Solutions Ltd, a bootstrapped UK software company building products that solve real problems. Through it I build GovBridge UK and take on contract work. Before Datascope I worked at Mondaq and Goodmaysys Software Technologies, after an MSc in Computing at De Montfort University.",
    "I lead by staying close to the code. I run code review, set my team's engineering standards and have mentored two engineers from mid-level to senior level. Most of my work sits where details matter: HMRC tax submissions, money transfer, payments, and access control for devices in the field.",
  ],
  education: [
    {
      title: "MSc Computing",
      institution: "De Montfort University, Leicester",
      period: "2018 to 2019",
    },
    {
      title: "BE Computer Engineering",
      institution: "Gujarat Technological University",
      period: "2012 to 2016",
    },
    {
      title: "Diploma in Computer Engineering",
      institution: "Gujarat Technological University",
      period: "2009 to 2012",
    },
  ],
  certifications: [
    { title: "Microsoft Azure Developer Associate (AZ-204)", note: "In progress" },
    { title: "AWS Serverless Architecture" },
    { title: "OWASP Application Security Verification Standard (ASVS)" },
    { title: "TestDome JavaScript", note: "August 2021" },
  ],
  languages: ["English", "Gujarati", "Hindi"],
};

/** Location, right to work and availability as label/value pairs. */
export const profileFacts: Fact[] = [
  { term: profile.factLabels.location, detail: profile.location, icon: "map-pin" },
  { term: profile.factLabels.rightToWork, detail: profile.rightToWork, icon: "badge-check" },
  { term: profile.factLabels.availability, detail: profile.availability, icon: "calendar-clock" },
];
