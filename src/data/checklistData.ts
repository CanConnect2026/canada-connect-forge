export type ChecklistItem = {
  id: string;
  label: string;
  description?: string;
  directoryCategory?: string;
  externalUrl?: string;
};

export type ChecklistPhase = {
  id: string;
  title: string;
  subtitle: string;
  items: ChecklistItem[];
};

export type ChecklistStream = {
  slug: string;
  emoji: string;
  icon: string;
  label: string;
  description: string;
  phases: ChecklistPhase[];
};

const commonPreArrival: ChecklistItem[] = [
  { id: "gather-docs", label: "Gather important documents", description: "Passport, visa, COPR, education credentials, medical records, and birth certificates." },
  { id: "research-city", label: "Research your destination city", directoryCategory: "Settlement & Newcomer Services", description: "Learn about housing costs, transit, weather, and community resources." },
  { id: "arrange-housing", label: "Arrange temporary housing", directoryCategory: "Housing & Shelter", description: "Book a short-term rental, hotel, or connect with a settlement agency for shelter options." },
  { id: "exchange-currency", label: "Exchange currency & set up finances", directoryCategory: "Financial Services & Support", description: "Bring some Canadian dollars and research how to open a bank account on arrival." },
  { id: "connect-settlement", label: "Connect with a settlement agency", directoryCategory: "Settlement & Newcomer Services", description: "Pre-register for free newcomer services before you arrive." },
];

const commonFirst30: ChecklistItem[] = [
  { id: "get-sin", label: "Apply for your SIN (Social Insurance Number)", externalUrl: "https://www.canada.ca/en/employment-social-development/services/sin.html", description: "Required for working, taxes, and government benefits. Apply at a Service Canada centre." },
  { id: "open-bank", label: "Open a Canadian bank account", directoryCategory: "Financial Services & Support", description: "Most major banks offer newcomer packages with no monthly fees for the first year." },
  { id: "apply-ohip", label: "Apply for OHIP (Ontario health insurance)", externalUrl: "https://www.ontario.ca/page/apply-ohip-and-get-health-card", description: "Visit a ServiceOntario location with your documents. There may be a 3-month waiting period." },
  { id: "get-phone", label: "Get a Canadian phone number", description: "Compare plans from major carriers and MVNOs. A phone number is essential for job applications." },
  { id: "register-kids", label: "Register children for school", directoryCategory: "Language & Education", description: "Contact your local school board to enroll children. Bring immunization records." },
  { id: "visit-settlement", label: "Visit a local settlement agency", directoryCategory: "Settlement & Newcomer Services", description: "Get a needs assessment, language testing, and referrals to other services." },
  { id: "apply-ccb", label: "Apply for Canada Child Benefit (if applicable)", externalUrl: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview.html", description: "Tax-free monthly payments for families with children under 18." },
];

const commonOneToSix: ChecklistItem[] = [
  { id: "find-housing", label: "Find permanent housing", directoryCategory: "Housing & Shelter", description: "Research rental markets, understand tenant rights, and consider subsidized housing options." },
  { id: "language-classes", label: "Enroll in language classes (LINC/ESL)", directoryCategory: "Language & Education", description: "Free language classes funded by the government. Childcare may be available." },
  { id: "update-resume", label: "Build a Canadian-style resume", directoryCategory: "Employment & Career Support", description: "Adapt your resume to Canadian format. Many settlement agencies offer free resume workshops." },
  { id: "start-networking", label: "Start professional networking", directoryCategory: "Employment & Career Support", description: "Attend job fairs, join LinkedIn, and connect with mentorship programs." },
  { id: "learn-transit", label: "Get a Presto card & learn local transit", description: "Load a Presto card for public transit in the GTA. Learn routes for your commute." },
  { id: "community-events", label: "Attend community events", directoryCategory: "Community & Cultural Organizations", description: "Meet other newcomers, learn about local culture, and build your support network." },
];

const commonSixToTwelve: ChecklistItem[] = [
  { id: "build-credit", label: "Start building your credit history", directoryCategory: "Financial Services & Support", description: "Get a secured credit card, pay bills on time, and monitor your credit score." },
  { id: "drivers-licence", label: "Get an Ontario driver's licence (if needed)", externalUrl: "https://www.ontario.ca/page/get-g-drivers-licence-new-drivers", description: "Some countries have licence exchange agreements. Otherwise, start the graduated licensing process." },
  { id: "file-taxes", label: "File your first Canadian tax return", directoryCategory: "Financial Services & Support", description: "Even with little income, filing taxes qualifies you for benefits like GST/HST credit and CCB." },
  { id: "join-community", label: "Join a cultural or community group", directoryCategory: "Community & Cultural Organizations", description: "Find organizations that connect you with people from your background or shared interests." },
  { id: "healthcare-checkup", label: "Schedule health checkups", directoryCategory: "Health & Wellness", description: "Find a family doctor, dentist, and get any necessary vaccinations for your family." },
];

const commonOneToTwoYears: ChecklistItem[] = [
  { id: "career-advancement", label: "Pursue career advancement or retraining", directoryCategory: "Employment & Career Support", description: "Look into bridging programs, professional certifications, or further education." },
  { id: "credential-recognition", label: "Start credential recognition process", directoryCategory: "Employment & Career Support", description: "Get your international qualifications assessed by WES or relevant regulatory bodies." },
  { id: "expand-network", label: "Expand your professional network", directoryCategory: "Employment & Career Support", description: "Join industry associations, volunteer for professional organizations, attend conferences." },
  { id: "financial-planning", label: "Start long-term financial planning", directoryCategory: "Financial Services & Support", description: "Open an RRSP or TFSA, consider home ownership, and plan for retirement." },
];

const commonTwoToFiveYears: ChecklistItem[] = [
  { id: "citizenship-eligibility", label: "Check citizenship eligibility", externalUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/eligibility.html", description: "You may be eligible after 3 years of permanent residence. Review the requirements." },
  { id: "citizenship-test", label: "Prepare for the citizenship test", externalUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test.html", description: "Study Canadian history, values, institutions, and symbols using the Discover Canada guide." },
  { id: "apply-citizenship", label: "Apply for Canadian citizenship", externalUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen.html", description: "Submit your application, pass the test, and attend the citizenship ceremony." },
  { id: "give-back", label: "Give back — mentor new newcomers", directoryCategory: "Community & Cultural Organizations", description: "Share your experience with recent arrivals. Volunteer with settlement agencies." },
];

export const checklistStreams: ChecklistStream[] = [
  {
    slug: "permanent-resident",
    emoji: "🍁",
    icon: "Leaf",
    label: "Permanent Resident",
    description: "For newcomers arriving through Express Entry, Provincial Nominee Programs (PNP), or Family Sponsorship. Your PR card is your key to building a life in Canada.",
    phases: [
      { id: "pre-arrival", title: "Pre-Arrival", subtitle: "Prepare before you land", items: commonPreArrival },
      { id: "first-30", title: "First 30 Days", subtitle: "SIN, OHIP, phone, bank", items: commonFirst30 },
      { id: "1-6-months", title: "1–6 Months", subtitle: "Housing, language, resume", items: commonOneToSix },
      { id: "6-12-months", title: "6–12 Months", subtitle: "Credit, licence, community", items: commonSixToTwelve },
      { id: "1-2-years", title: "1–2 Years", subtitle: "Career, education, network", items: commonOneToTwoYears },
      { id: "2-5-years", title: "2–5 Years", subtitle: "Citizenship & long-term goals", items: commonTwoToFiveYears },
    ],
  },
  {
    slug: "refugee",
    emoji: "🛡️",
    icon: "Shield",
    label: "Refugee / Asylum",
    description: "For refugee claimants and protected persons. You have unique supports available — from shelter to legal aid. This checklist helps you navigate the system step by step.",
    phases: [
      {
        id: "pre-arrival", title: "Pre-Arrival / Arrival", subtitle: "Immediate steps on arrival", items: [
          { id: "ref-claim", label: "Make your refugee claim", directoryCategory: "Immigration & Legal Support", description: "File your claim at a port of entry or an inland IRCC office." },
          { id: "ref-legal", label: "Find a refugee lawyer or legal aid", directoryCategory: "Immigration & Legal Support", description: "Legal Aid Ontario provides free legal representation for eligible refugee claimants." },
          { id: "ref-shelter", label: "Find emergency shelter", directoryCategory: "Housing & Shelter", description: "Contact a shelter or settlement agency for immediate housing support." },
          { id: "ref-settlement", label: "Connect with a settlement agency", directoryCategory: "Settlement & Newcomer Services", description: "Get immediate support with food, clothing, orientation, and referrals." },
        ],
      },
      {
        id: "first-30", title: "First 30 Days", subtitle: "Essential setup & services", items: [
          ...commonFirst30.filter(i => !["apply-ccb"].includes(i.id)),
          { id: "ref-ifh", label: "Apply for Interim Federal Health Program (IFH)", externalUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees/help-within-canada/health-care/interim-federal-health-program.html", description: "Provides temporary health coverage for refugee claimants before OHIP eligibility." },
          { id: "ref-food", label: "Access food banks & clothing support", directoryCategory: "Food & Clothing Support", description: "Many communities have free food banks and clothing donation centres for newcomers." },
        ],
      },
      { id: "1-6-months", title: "1–6 Months", subtitle: "Stability & learning", items: commonOneToSix },
      { id: "6-12-months", title: "6–12 Months", subtitle: "Building your new life", items: commonSixToTwelve },
      { id: "1-2-years", title: "1–2 Years", subtitle: "Career & growth", items: commonOneToTwoYears },
      { id: "2-5-years", title: "2–5 Years", subtitle: "Long-term goals", items: commonTwoToFiveYears },
    ],
  },
  {
    slug: "international-student",
    emoji: "🎓",
    icon: "GraduationCap",
    label: "International Student",
    description: "For study permit holders and recent graduates. From campus life to post-graduation work permits — this checklist covers your unique journey.",
    phases: [
      {
        id: "pre-arrival", title: "Pre-Arrival", subtitle: "Before classes start", items: [
          ...commonPreArrival,
          { id: "stu-acceptance", label: "Confirm your letter of acceptance", description: "Ensure your Designated Learning Institution (DLI) has confirmed your enrollment." },
          { id: "stu-housing", label: "Arrange on-campus or student housing", directoryCategory: "Housing & Shelter", description: "Apply for residence early. Off-campus housing near your school is also an option." },
        ],
      },
      {
        id: "first-30", title: "First 30 Days", subtitle: "Campus & essentials", items: [
          ...commonFirst30.filter(i => !["register-kids", "apply-ccb"].includes(i.id)),
          { id: "stu-campus", label: "Attend orientation & campus events", description: "Meet other students, learn about campus resources, and join student clubs." },
          { id: "stu-health-insurance", label: "Enroll in UHIP or student health plan", description: "International students need University Health Insurance Plan coverage during the OHIP waiting period." },
        ],
      },
      {
        id: "1-6-months", title: "1–6 Months", subtitle: "Settling into student life", items: [
          ...commonOneToSix.filter(i => !["update-resume"].includes(i.id)),
          { id: "stu-part-time", label: "Look for part-time or on-campus work", directoryCategory: "Employment & Career Support", description: "You can work up to 20 hours/week off-campus during school terms with a valid study permit." },
        ],
      },
      { id: "6-12-months", title: "6–12 Months", subtitle: "Building foundations", items: commonSixToTwelve },
      {
        id: "1-2-years", title: "1–2 Years", subtitle: "Co-ops, internships & PGWP", items: [
          ...commonOneToTwoYears,
          { id: "stu-pgwp", label: "Apply for Post-Graduation Work Permit (PGWP)", externalUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/apply.html", description: "Apply within 180 days of getting your final marks. This is your path to PR." },
          { id: "stu-pr-pathway", label: "Research PR pathways (CEC, PNP)", directoryCategory: "Immigration & Legal Support", description: "Canadian Experience Class and Provincial Nominee Programs are common student-to-PR pathways." },
        ],
      },
      { id: "2-5-years", title: "2–5 Years", subtitle: "PR & citizenship", items: commonTwoToFiveYears },
    ],
  },
  {
    slug: "temporary-worker",
    emoji: "💼",
    icon: "Briefcase",
    label: "Temporary Worker",
    description: "For work permit holders including LMIA-based workers, open work permits, and IEC participants. Navigate your rights, settle in, and plan your path to permanence.",
    phases: [
      {
        id: "pre-arrival", title: "Pre-Arrival", subtitle: "Before you start work", items: [
          ...commonPreArrival,
          { id: "tw-employer", label: "Confirm employer details & work conditions", description: "Review your employment contract, workplace address, and start date." },
          { id: "tw-rights", label: "Know your workplace rights", externalUrl: "https://www.ontario.ca/document/your-guide-employment-standards-act-0", description: "Understand Ontario Employment Standards — minimum wage, hours, overtime, and protections." },
        ],
      },
      { id: "first-30", title: "First 30 Days", subtitle: "SIN, bank, essentials", items: commonFirst30.filter(i => !["register-kids", "apply-ccb"].includes(i.id)) },
      { id: "1-6-months", title: "1–6 Months", subtitle: "Settling & networking", items: commonOneToSix },
      {
        id: "6-12-months", title: "6–12 Months", subtitle: "Building stability", items: [
          ...commonSixToTwelve,
          { id: "tw-renewal", label: "Check work permit renewal timelines", directoryCategory: "Immigration & Legal Support", description: "Apply to renew your work permit well before it expires. Implied status keeps you legal while waiting." },
        ],
      },
      {
        id: "1-2-years", title: "1–2 Years", subtitle: "PR pathways & career", items: [
          ...commonOneToTwoYears,
          { id: "tw-pr-pathway", label: "Explore PR immigration pathways", directoryCategory: "Immigration & Legal Support", description: "CEC, PNP, or LMIA-based PR streams may be available based on your work experience." },
        ],
      },
      { id: "2-5-years", title: "2–5 Years", subtitle: "Citizenship & long-term goals", items: commonTwoToFiveYears },
    ],
  },
];
