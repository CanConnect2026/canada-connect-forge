import { useParams, Link } from "react-router-dom";
import { MapPin, Train, Home, Briefcase, GraduationCap, Heart, Users } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";

import torontoLandmark from "@/assets/landmarks/toronto.jpg";
import ottawaLandmark from "@/assets/landmarks/ottawa.jpg";
import hamiltonLandmark from "@/assets/landmarks/hamilton.jpg";
import bramptonLandmark from "@/assets/landmarks/brampton.jpg";
import mississaugaLandmark from "@/assets/landmarks/mississauga.jpg";
import londonLandmark from "@/assets/landmarks/london.jpg";
import windsorLandmark from "@/assets/landmarks/windsor.jpg";
import kitchenerLandmark from "@/assets/landmarks/kitchener.jpg";
import markhamLandmark from "@/assets/landmarks/markham.jpg";
import vaughanLandmark from "@/assets/landmarks/vaughan.jpg";
import barrieLandmark from "@/assets/landmarks/barrie.jpg";
import guelphLandmark from "@/assets/landmarks/guelph.jpg";
import oshawaLandmark from "@/assets/landmarks/oshawa.jpg";
import scarboroughLandmark from "@/assets/landmarks/scarborough.jpg";
import waterlooLandmark from "@/assets/landmarks/waterloo.jpg";

const CITY_LANDMARKS: Record<string, { url: string; alt: string }> = {
  toronto: { url: torontoLandmark, alt: "CN Tower, Toronto" },
  ottawa: { url: ottawaLandmark, alt: "Parliament Hill, Ottawa" },
  hamilton: { url: hamiltonLandmark, alt: "Dundas Peak, Hamilton" },
  brampton: { url: bramptonLandmark, alt: "Brampton cityscape" },
  mississauga: { url: mississaugaLandmark, alt: "Absolute Towers, Mississauga" },
  london: { url: londonLandmark, alt: "London, Ontario" },
  windsor: { url: windsorLandmark, alt: "Ambassador Bridge, Windsor" },
  kitchener: { url: kitchenerLandmark, alt: "Kitchener downtown" },
  markham: { url: markhamLandmark, alt: "Markham cityscape" },
  vaughan: { url: vaughanLandmark, alt: "Vaughan Metropolitan Centre" },
  barrie: { url: barrieLandmark, alt: "Kempenfelt Bay, Barrie" },
  guelph: { url: guelphLandmark, alt: "University of Guelph" },
  oshawa: { url: oshawaLandmark, alt: "Oshawa cityscape" },
  scarborough: { url: scarboroughLandmark, alt: "Scarborough Bluffs" },
  waterloo: { url: waterlooLandmark, alt: "University of Waterloo" },
};

interface CitySection {
  icon: React.ElementType;
  title: string;
  content: string;
  tips?: string[];
}

interface CityData {
  name: string;
  tagline: string;
  population: string;
  overview: string;
  sections: CitySection[];
  quickFacts: { label: string; value: string }[];
}

const cityData: Record<string, CityData> = {
  toronto: {
    name: "Toronto",
    tagline: "Canada's largest city — diverse, fast-paced, and full of opportunity.",
    population: "2.9 million",
    overview:
      "Toronto is one of the most multicultural cities in the world. Over half of its residents were born outside Canada, making it a natural landing spot for newcomers. From world-class transit to vibrant ethnic neighbourhoods, Toronto offers endless resources — but it helps to know where to look.",
    quickFacts: [
      { label: "Region", value: "Greater Toronto Area (GTA)" },
      { label: "Average Rent (1BR)", value: "$2,300/month" },
      { label: "Transit System", value: "TTC (subway, bus, streetcar)" },
      { label: "Major Employers", value: "Finance, Tech, Healthcare" },
      { label: "Languages Spoken", value: "200+" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content:
          "Toronto's neighbourhoods each have a unique character. Scarborough and North York are popular with newcomers for their affordability and cultural communities. Downtown is walkable but pricey. Consider areas along subway lines for easier commutes.",
        tips: [
          "Use Kijiji, Rentals.ca, or Facebook groups to find listings",
          "Avoid paying deposits before seeing a unit in person",
          "Tenant rights are strong in Ontario — know your rights under the RTA",
        ],
      },
      {
        icon: Train,
        title: "Getting Around",
        content:
          "The TTC is Toronto's public transit system, with subways, buses, and streetcars. A PRESTO card is used for all transit. GO Transit connects to suburbs. Cycling infrastructure is growing, especially downtown.",
        tips: [
          "Get a PRESTO card at any subway station or Shoppers Drug Mart",
          "Monthly passes save money if you commute daily",
          "Bike Share Toronto offers affordable short-term cycling",
        ],
      },
      {
        icon: Briefcase,
        title: "Jobs & Employment",
        content:
          "Toronto's economy is driven by finance, technology, healthcare, and creative industries. The city has numerous employment centres that offer free resume workshops, interview prep, and job placement support for newcomers.",
        tips: [
          "Register with ACCES Employment or JVS Toronto for free support",
          "LinkedIn is widely used — build your profile early",
          "Networking events happen weekly; check Eventbrite and Meetup",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content:
          "Free English and French classes (LINC) are available across the city. Toronto is home to major universities (U of T, TMU, York) and community colleges (George Brown, Seneca, Humber) with bridging programs for internationally trained professionals.",
        tips: [
          "LINC classes are free for permanent residents",
          "School boards offer settlement workers in schools (SWIS)",
          "Library cards give free access to language learning tools",
        ],
      },
      {
        icon: Heart,
        title: "Healthcare",
        content:
          "Ontario's OHIP covers most medical services. Apply for your health card as soon as you arrive — there's a 3-month waiting period for new residents. Community Health Centres offer services regardless of insurance status.",
        tips: [
          "Apply for OHIP at a ServiceOntario location",
          "Get interim private health insurance for the 3-month wait",
          "Walk-in clinics are available without a family doctor",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content:
          "Toronto's cultural scene is unmatched. From Chinatown and Little India to Greektown and Little Italy, you'll find communities from around the world. Free festivals, community centres, and faith-based groups provide social connections.",
        tips: [
          "Visit your local community centre for free programs",
          "Toronto Public Library hosts newcomer-specific events",
          "Neighbourhood Facebook groups are great for local tips",
        ],
      },
    ],
  },
  ottawa: {
    name: "Ottawa",
    tagline: "Canada's capital — bilingual, multicultural, and rich in government resources.",
    population: "1.0 million",
    overview:
      "Ottawa is a bilingual city with a strong public sector presence. It offers a high quality of life, excellent schools, and a growing tech industry. Newcomers benefit from extensive government-funded settlement services and a welcoming, mid-sized city atmosphere.",
    quickFacts: [
      { label: "Region", value: "National Capital Region" },
      { label: "Average Rent (1BR)", value: "$1,800/month" },
      { label: "Transit System", value: "OC Transpo (LRT & bus)" },
      { label: "Major Employers", value: "Government, Tech, Education" },
      { label: "Official Languages", value: "English & French" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content:
          "Ottawa offers more affordable housing than Toronto. Popular newcomer areas include Centretown, Vanier, South Keys, and Barrhaven. The city is spread out, so choosing a home near transit or your workplace matters.",
        tips: [
          "Rent is significantly lower than Toronto — compare before deciding",
          "Consider proximity to the O-Train (Confederation Line)",
          "Co-op housing and subsidized options are available through Ottawa Community Housing",
        ],
      },
      {
        icon: Train,
        title: "Getting Around",
        content:
          "OC Transpo runs buses and the Confederation Line (LRT). A PRESTO card works here too. Ottawa is very bike-friendly with extensive pathways along the Rideau Canal and Ottawa River.",
        tips: [
          "The LRT connects key neighbourhoods — live near a station if possible",
          "Ottawa's multi-use pathways are great for commuting by bike",
          "Winter cycling is possible with studded tires and maintained paths",
        ],
      },
      {
        icon: Briefcase,
        title: "Jobs & Employment",
        content:
          "The federal government is Ottawa's largest employer. The tech sector (Kanata North) is booming. Bilingualism (English/French) is a significant asset for government and customer-facing roles.",
        tips: [
          "Create a GC Jobs profile for federal government positions",
          "LASI World Skills and OCISO offer newcomer employment programs",
          "French proficiency opens many doors — consider free classes",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content:
          "Ottawa has excellent schools and universities (Carleton, uOttawa, Algonquin College). Free LINC classes are available, and being in a bilingual city makes it a great place to learn French.",
        tips: [
          "CLIC (French equivalent of LINC) classes are free for PRs",
          "Ottawa Public Library offers conversation circles",
          "Catholic and public school boards both serve newcomer families well",
        ],
      },
      {
        icon: Heart,
        title: "Healthcare",
        content:
          "OHIP covers most services. Ottawa has several community health centres that serve newcomers, including those without OHIP. The Somerset West CHC and Centretown CHC are popular options.",
        tips: [
          "CHCs often have multilingual staff and social workers",
          "Ottawa has strong mental health resources through the Royal Ottawa",
          "Pharmacies can provide some vaccinations and health advice",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content:
          "Ottawa's cultural life revolves around national museums, Winterlude, Canada Day celebrations, and a growing food scene. Multicultural associations and faith communities provide strong newcomer networks.",
        tips: [
          "Winterlude in February is a must-experience Ottawa tradition",
          "The Ottawa Newcomer Community group on Facebook is very active",
          "Local mosques, temples, and churches often offer settlement help",
        ],
      },
    ],
  },
  hamilton: {
    name: "Hamilton",
    tagline: "Affordable, artsy, and rapidly growing — a hidden gem for newcomers.",
    population: "580,000",
    overview:
      "Hamilton is experiencing a renaissance. Once known as 'Steel City,' it now blends industrial heritage with a thriving arts scene, waterfalls, and growing newcomer communities. Its affordability and GO Transit connections to Toronto make it increasingly popular.",
    quickFacts: [
      { label: "Region", value: "Golden Horseshoe" },
      { label: "Average Rent (1BR)", value: "$1,600/month" },
      { label: "Transit System", value: "HSR (bus) + GO Transit" },
      { label: "Major Employers", value: "Healthcare, Manufacturing, Education" },
      { label: "Known For", value: "100+ waterfalls" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "Hamilton is divided into the lower city and the 'Mountain' (upper city). The lower city has more walkable, urban neighbourhoods, while the Mountain is more suburban and family-oriented. Rent is significantly more affordable than Toronto.",
        tips: [
          "Downtown Hamilton is revitalizing — lots of new businesses opening",
          "The Mountain offers more space for families at lower prices",
          "Check CityHousing Hamilton for subsidized housing options",
        ],
      },
      {
        icon: Train,
        title: "Getting Around",
        content: "Hamilton Street Railway (HSR) runs buses across the city. GO Transit connects Hamilton to Toronto (about 1 hour by train). The city is working on a new LRT line. Cycling is growing, especially on the lower city's flat streets.",
        tips: [
          "GO Transit is great for commuting to Toronto for work",
          "HSR monthly passes are affordable compared to TTC",
          "Hamilton's bike share (SoBi) is popular in the lower city",
        ],
      },
      {
        icon: Briefcase,
        title: "Jobs & Employment",
        content: "Hamilton's economy is diversifying from its manufacturing roots. Healthcare (Hamilton Health Sciences, St. Joseph's) is a major employer. The city's growing tech and creative sectors offer new opportunities.",
        tips: [
          "Hamilton is home to McMaster University — check their job postings",
          "YMCA Hamilton offers newcomer employment programs",
          "The local economy is growing — more remote workers are moving here",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content: "McMaster University and Mohawk College are Hamilton's major post-secondary institutions. LINC classes are available, and the Hamilton Public Library system offers excellent free learning resources.",
        tips: [
          "Mohawk College has strong trades and bridging programs",
          "Hamilton Public Library cards are free for residents",
          "Settlement.org has a Hamilton-specific resource page",
        ],
      },
      {
        icon: Heart,
        title: "Healthcare",
        content: "Hamilton is a major healthcare hub with McMaster Children's Hospital and Hamilton Health Sciences. Community health centres serve newcomers, and the city has strong mental health support networks.",
        tips: [
          "Hamilton has some of Ontario's best hospitals",
          "De dwa da dehs nye>s Aboriginal Health Centre serves Indigenous newcomers",
          "Access to family doctors is better here than in many Ontario cities",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "Hamilton has a thriving arts scene with galleries on James Street North, monthly art crawls, and a growing food scene. The city's multicultural festivals and community gardens bring neighbours together.",
        tips: [
          "James Street North Art Crawl happens the second Friday of each month",
          "Explore Hamilton's 100+ waterfalls — they're free to visit",
          "The Hamilton Newcomers Group organizes regular meetups",
        ],
      },
    ],
  },
  brampton: {
    name: "Brampton",
    tagline: "One of Canada's most diverse cities — a cultural mosaic with growing services.",
    population: "660,000",
    overview:
      "Brampton is one of the fastest-growing and most diverse cities in Canada. With a large South Asian community and growing populations from around the world, it offers cultural familiarity for many newcomers alongside expanding settlement and community services.",
    quickFacts: [
      { label: "Region", value: "Peel Region (GTA)" },
      { label: "Average Rent (1BR)", value: "$1,900/month" },
      { label: "Transit System", value: "Brampton Transit + GO" },
      { label: "Major Employers", value: "Logistics, Manufacturing, Retail" },
      { label: "Diversity", value: "73% visible minorities" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "Brampton is largely suburban with newer developments in the north and west. Basements suites are common and affordable. The city centre area is developing more urban amenities.",
        tips: [
          "Basement apartments are popular — ensure they have legal second suites",
          "Brampton is car-dependent in many areas — consider this when choosing a home",
          "New developments in Mount Pleasant and Heritage Heights offer modern housing",
        ],
      },
      {
        icon: Train,
        title: "Getting Around",
        content: "Brampton Transit connects within the city, and GO Transit provides service to Toronto. The Züm rapid transit buses run along major corridors. Having a car is beneficial in many parts of the city.",
        tips: [
          "Züm buses are faster than local routes — use them for major corridors",
          "GO Train from Brampton to Union Station takes about 45 minutes",
          "Getting a G1 license early helps — driving is important in Brampton",
        ],
      },
      {
        icon: Briefcase,
        title: "Jobs & Employment",
        content: "Brampton's economy centers on logistics, warehousing, and manufacturing, with major employers along Highway 410. The city is also growing in tech and healthcare. Peel Region offers strong newcomer employment programs.",
        tips: [
          "Amazon, Loblaw, and Maple Lodge Farms are major local employers",
          "Indus Community Services offers culturally-sensitive employment help",
          "Peel Newcomer Strategy Group connects you to local resources",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content: "Sheridan College's Davis Campus is in Brampton, offering diplomas, degrees, and bridging programs. LINC classes are available at multiple locations. Schools in Brampton are well-equipped for ESL students.",
        tips: [
          "Sheridan College has excellent practical programs for newcomers",
          "Peel District School Board provides strong ESL/ELD support",
          "Brampton Library hosts free homework help and language programs",
        ],
      },
      {
        icon: Heart,
        title: "Healthcare",
        content: "Brampton Civic Hospital serves the area, though the city is advocating for more healthcare capacity. Community health services and walk-in clinics are available throughout. Culturally-specific health services are growing.",
        tips: [
          "Brampton is building a new hospital — healthcare access is improving",
          "Many clinics in Brampton offer multilingual services",
          "Peel Public Health provides free immunization and prenatal programs",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "Brampton celebrates its diversity with events like Carabram and vibrant cultural shopping centres. Gurdwaras, mosques, temples, and churches serve as community hubs. The city has a strong tradition of multicultural festivals.",
        tips: [
          "Carabram multicultural festival showcases the city's diversity",
          "Brampton's cultural centres often offer free community programs",
          "Gage Park hosts events throughout the summer months",
        ],
      },
    ],
  },
  mississauga: {
    name: "Mississauga",
    tagline: "Family-friendly, well-connected, and full of newcomer programs.",
    population: "720,000",
    overview:
      "Mississauga is a large, diverse suburban city in the GTA. It's home to Pearson International Airport and offers excellent schools, parks, and community programs. Strong transit connections and a growing downtown core make it ideal for families.",
    quickFacts: [
      { label: "Region", value: "Peel Region (GTA)" },
      { label: "Average Rent (1BR)", value: "$2,100/month" },
      { label: "Transit System", value: "MiWay + GO Transit" },
      { label: "Major Employers", value: "Aerospace, Pharma, Finance" },
      { label: "Notable", value: "Home to Pearson Airport" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "Mississauga ranges from high-rise condos in City Centre to suburban family homes in Meadowvale and Erin Mills. The Square One area is becoming more urban and walkable, while other areas remain car-dependent.",
        tips: [
          "City Centre/Square One has the most walkable, urban living",
          "Malton and Meadowvale are more affordable family-friendly areas",
          "Mississauga has good co-op housing options — apply early",
        ],
      },
      {
        icon: Train,
        title: "Getting Around",
        content: "MiWay buses connect across the city, with express routes to major hubs. GO Transit provides rail and bus service to Toronto. The Hurontario LRT (under construction) will transform north-south transit.",
        tips: [
          "MiWay connects to Islington and Kipling subway stations",
          "The upcoming Hurontario LRT will improve transit significantly",
          "PRESTO cards work on MiWay, GO, and TTC",
        ],
      },
      {
        icon: Briefcase,
        title: "Jobs & Employment",
        content: "Mississauga is a major business hub with corporate headquarters for many companies. The airport area has logistics and aerospace jobs. The city's employment centres offer specialized newcomer programs.",
        tips: [
          "Many Fortune 500 companies have Canadian HQs in Mississauga",
          "Airport-adjacent jobs in logistics are accessible entry points",
          "Achēv (formerly ACCES & Costi) has offices in Mississauga",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content: "University of Toronto Mississauga (UTM) and Sheridan College provide post-secondary options. The Peel District School Board is one of Ontario's largest. LINC and literacy programs are widely available.",
        tips: [
          "UTM offers continuing education and bridging programs",
          "Peel schools have dedicated newcomer reception centres",
          "Mississauga Library hosts free digital literacy programs",
        ],
      },
      {
        icon: Heart,
        title: "Healthcare",
        content: "Trillium Health Partners operates two hospitals in Mississauga. The city has numerous community health centres and walk-in clinics. Peel Public Health offers newcomer-specific programs.",
        tips: [
          "Credit Valley Hospital and Mississauga Hospital serve the city",
          "Peel Public Health offers free health screenings for newcomers",
          "Many family doctors in Mississauga accept new patients",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "Mississauga's Celebration Square hosts free events year-round. The city has over 500 parks and strong community programming. Cultural communities are well-established with active associations and gathering spaces.",
        tips: [
          "Celebration Square has free movie nights, concerts, and cultural events",
          "Community centres offer subsidized programs for low-income families",
          "The Living Arts Centre hosts performances and art classes",
        ],
      },
    ],
  },
  london: {
    name: "London",
    tagline: "University town with a growing newcomer community and affordable living.",
    population: "420,000",
    overview:
      "London is a mid-sized city in southwestern Ontario known for its universities, healthcare sector, and increasingly diverse population. It offers a lower cost of living than the GTA, a growing job market, and strong community support for newcomers.",
    quickFacts: [
      { label: "Region", value: "Southwestern Ontario" },
      { label: "Average Rent (1BR)", value: "$1,500/month" },
      { label: "Transit System", value: "London Transit (bus)" },
      { label: "Major Employers", value: "Healthcare, Education, Insurance" },
      { label: "Universities", value: "Western, Fanshawe" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "London offers some of the most affordable housing in Ontario's larger cities. Popular newcomer areas include the downtown core, Kipps Lane, and Hamilton Road. The city has a mix of older homes and new developments.",
        tips: [
          "Rent is significantly lower than GTA — a major draw for newcomers",
          "Downtown London is walkable and close to services",
          "London & Middlesex Community Housing offers subsidized options",
        ],
      },
      {
        icon: Train,
        title: "Getting Around",
        content: "London Transit runs buses across the city. VIA Rail connects London to Toronto (about 2 hours). The city is car-friendly with ample parking, and cycling infrastructure is expanding.",
        tips: [
          "London Transit is affordable — monthly passes available",
          "VIA Rail offers student and advance-purchase discounts",
          "The city is flat and increasingly bike-friendly",
        ],
      },
      {
        icon: Briefcase,
        title: "Jobs & Employment",
        content: "London's economy is anchored by healthcare (London Health Sciences Centre), education (Western University, Fanshawe), and insurance. The tech sector is growing, and manufacturing remains significant.",
        tips: [
          "London Health Sciences Centre is one of the city's largest employers",
          "LUSO Community Services offers newcomer employment programs",
          "The London Economic Development Corporation posts local opportunities",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content: "Western University and Fanshawe College are the city's major post-secondary institutions. LINC classes are available, and the London Public Library offers excellent free resources for newcomers.",
        tips: [
          "Fanshawe has strong trades and bridging programs",
          "Western offers world-class research and graduate programs",
          "Library settlement partnerships provide in-library newcomer support",
        ],
      },
      {
        icon: Heart,
        title: "Healthcare",
        content: "London Health Sciences Centre is one of Ontario's largest hospital networks. The city has community health centres and strong mental health support through CMHA Middlesex.",
        tips: [
          "London has better family doctor availability than the GTA",
          "Cross-Cultural Learner Centre offers health navigation support",
          "Middlesex-London Health Unit provides free immunizations",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "London has a growing cultural scene with festivals, farmers' markets, and community events. The Cross-Cultural Learner Centre is the city's main newcomer hub. Community gardens and multicultural events help build connections.",
        tips: [
          "London Ribfest and Sunfest are beloved annual events",
          "The Cross-Cultural Learner Centre should be your first stop",
          "London has a welcoming, small-city feel with big-city amenities",
        ],
      },
    ],
  },
  kitchener: {
    name: "Kitchener",
    tagline: "Canada's tech triangle — innovative, affordable, and newcomer-friendly.",
    population: "270,000",
    overview:
      "Kitchener, part of the Waterloo Region tech corridor, has transformed from a manufacturing town into a tech innovation hub. With the University of Waterloo nearby, a growing startup scene, and strong settlement services, it's an increasingly popular destination for newcomers.",
    quickFacts: [
      { label: "Region", value: "Waterloo Region" },
      { label: "Average Rent (1BR)", value: "$1,600/month" },
      { label: "Transit System", value: "GRT (bus + ION LRT)" },
      { label: "Major Employers", value: "Tech, Insurance, Manufacturing" },
      { label: "Known For", value: "Oktoberfest & tech startups" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "Kitchener offers affordable housing compared to the GTA. Downtown Kitchener is revitalizing rapidly with new condos and mixed-use developments. Areas along the ION LRT corridor are increasingly popular.",
        tips: [
          "Downtown Kitchener is becoming a vibrant urban centre",
          "Forest Heights and Stanley Park are affordable family areas",
          "The ION LRT has increased property values along its route — plan accordingly",
        ],
      },
      {
        icon: Train,
        title: "Getting Around",
        content: "Grand River Transit (GRT) operates buses and the ION light rail connecting Kitchener to Waterloo. GO Transit provides bus and expanding rail service to Toronto. The region is bike-friendly with growing trail networks.",
        tips: [
          "The ION LRT connects Kitchener to Waterloo in minutes",
          "GO Transit expansion will bring direct rail to Toronto soon",
          "The Iron Horse Trail is great for cycling commutes",
        ],
      },
      {
        icon: Briefcase,
        title: "Jobs & Employment",
        content: "The Waterloo Region is home to over 1,000 tech companies, from startups to global firms like Google and OpenText. Insurance, manufacturing, and healthcare also provide strong employment. Newcomer employment programs are well-established.",
        tips: [
          "Communitech is the region's tech hub — attend their events",
          "KW Multicultural Centre offers employment programs for newcomers",
          "The region has lower unemployment than the provincial average",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content: "The University of Waterloo and Wilfrid Laurier University are nearby, along with Conestoga College. LINC classes are available through multiple providers. The region has excellent school boards for newcomer families.",
        tips: [
          "Conestoga College offers practical trades and bridging programs",
          "Waterloo Region District School Board has strong ESL support",
          "KPL (Kitchener Public Library) offers free newcomer programs",
        ],
      },
      {
        icon: Heart,
        title: "Healthcare",
        content: "Grand River Hospital and St. Mary's General Hospital serve the region. Community health centres provide multilingual services, and the region has growing mental health support networks.",
        tips: [
          "The Kitchener Downtown Community Health Centre serves newcomers",
          "Region of Waterloo Public Health offers free immunization clinics",
          "Access to family doctors is better than in many larger Ontario cities",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "Kitchener hosts the largest Oktoberfest outside of Germany and has a vibrant arts district. The multicultural community is growing, with active cultural associations and faith-based organizations supporting newcomers.",
        tips: [
          "Kitchener-Waterloo Oktoberfest is a world-famous fall tradition",
          "The KW Multicultural Centre is your first stop for settlement help",
          "Community centres in every neighbourhood offer free programming",
        ],
      },
    ],
  },
  windsor: {
    name: "Windsor",
    tagline: "Border city with cross-border opportunities and a strong manufacturing base.",
    population: "230,000",
    overview:
      "Windsor sits on the US-Canada border across from Detroit, offering a unique cross-border lifestyle. Known for its automotive industry, the city is diversifying its economy and welcoming growing newcomer communities with affordable living and expanding settlement services.",
    quickFacts: [
      { label: "Region", value: "Southwestern Ontario" },
      { label: "Average Rent (1BR)", value: "$1,300/month" },
      { label: "Transit System", value: "Transit Windsor (bus)" },
      { label: "Major Employers", value: "Automotive, Manufacturing, Healthcare" },
      { label: "Notable", value: "Borders Detroit, Michigan" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "Windsor offers some of Ontario's most affordable housing. The downtown core, Walkerville, and South Windsor are popular areas. The city has a mix of heritage homes and newer developments.",
        tips: [
          "Windsor has some of the lowest rents in Ontario — great for starting out",
          "Walkerville is a trendy, walkable neighbourhood with character",
          "Home ownership is more accessible here than in the GTA",
        ],
      },
      {
        icon: Train,
        title: "Getting Around",
        content: "Transit Windsor operates buses across the city. The city is car-friendly and relatively compact. Cross-border transit to Detroit is available via the Ambassador Bridge and the Windsor-Detroit Tunnel.",
        tips: [
          "Having a car is beneficial but not essential in central areas",
          "The Gordie Howe International Bridge (new) will improve cross-border travel",
          "Cycling is feasible — Windsor is flat with growing bike infrastructure",
        ],
      },
      {
        icon: Briefcase,
        title: "Jobs & Employment",
        content: "Windsor's economy is anchored by automotive manufacturing (Stellantis), with growing sectors in healthcare, agriculture, and logistics. The new EV battery plant is creating thousands of jobs.",
        tips: [
          "The NextStar Energy battery plant is a major new employer",
          "Unemployed Help Centre and WEST offer newcomer employment programs",
          "Cross-border work is possible with proper documentation",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content: "The University of Windsor and St. Clair College provide post-secondary education. LINC classes and settlement programs are available. The city's proximity to the US also opens up educational options.",
        tips: [
          "St. Clair College has strong trades and apprenticeship programs",
          "University of Windsor offers competitive tuition rates",
          "Multicultural Council of Windsor offers LINC and settlement support",
        ],
      },
      {
        icon: Heart,
        title: "Healthcare",
        content: "Windsor Regional Hospital serves the city. Community health centres provide multilingual services. The city has been investing in expanding healthcare capacity to serve its growing population.",
        tips: [
          "Windsor Regional Hospital is undergoing a major expansion",
          "The Teen Health Centre serves youth regardless of OHIP status",
          "Windsor-Essex County Health Unit offers free health programs",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "Windsor has a rich cultural scene influenced by its border-city identity. The riverfront is a gathering place, and multicultural festivals celebrate the city's diversity. The Multicultural Council of Windsor is a key resource.",
        tips: [
          "The Windsor riverfront offers beautiful views of the Detroit skyline",
          "Carrousel of the Nations celebrates the city's multicultural heritage",
          "The Multicultural Council of Windsor should be your first stop",
        ],
      },
    ],
  },
  markham: {
    name: "Markham",
    tagline: "High-tech suburb with strong Chinese and South Asian communities.",
    population: "340,000",
    overview:
      "Markham is one of Canada's most diverse and tech-driven cities. Located in York Region, it's home to over 1,500 tech and life sciences companies. With a large Chinese and South Asian population, many newcomers find cultural familiarity and strong community networks.",
    quickFacts: [
      { label: "Region", value: "York Region (GTA)" },
      { label: "Average Rent (1BR)", value: "$2,000/month" },
      { label: "Transit System", value: "YRT/Viva + TTC connection" },
      { label: "Major Employers", value: "Tech, Finance, Life Sciences" },
      { label: "Diversity", value: "78% visible minorities" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "Markham offers a suburban lifestyle with modern developments. Unionville is charming with heritage character, while newer areas like Cornell and Berczy offer family-friendly homes. Housing is pricier than many Ontario cities but competitive within the GTA.",
        tips: [
          "Unionville Main Street is a beautiful, walkable heritage village",
          "Markham Centre is developing into a more urban, transit-oriented area",
          "York Region has affordable housing programs worth exploring",
        ],
      },
      {
        icon: Briefcase,
        title: "Jobs & Employment",
        content: "Markham's tech corridor is one of Canada's largest, with companies like AMD, IBM, and Huawei. The city also has strong financial services and healthcare sectors.",
        tips: [
          "Markham Board of Trade hosts networking events",
          "ACCES Employment has York Region offices for newcomer support",
          "Many tech roles don't require Canadian experience — start applying early",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content: "York University's Markham Campus opened recently, and Seneca College has a presence in the region. York Region schools are highly rated. LINC classes and language programs are available through local agencies.",
        tips: [
          "York University Markham Campus is a new, modern facility",
          "York Region schools consistently rank among Ontario's best",
          "Markham Public Library offers extensive free programs",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "Markham's cultural life is vibrant, with Pacific Mall, Markville Mall, and numerous Asian restaurants and grocery stores. Community centres and cultural associations host events year-round.",
        tips: [
          "Pacific Mall is one of the largest indoor Asian malls in North America",
          "Markham Museum and heritage sites offer community events",
          "Cultural associations provide a sense of home for newcomers",
        ],
      },
    ],
  },
  vaughan: {
    name: "Vaughan",
    tagline: "Growing suburban city with expanding transit and family amenities.",
    population: "320,000",
    overview:
      "Vaughan is one of the fastest-growing cities in Canada, located in York Region. With the new TTC subway extension reaching Vaughan Metropolitan Centre, the city is becoming more accessible. It offers a suburban lifestyle with growing urban cores and strong community programs.",
    quickFacts: [
      { label: "Region", value: "York Region (GTA)" },
      { label: "Average Rent (1BR)", value: "$2,000/month" },
      { label: "Transit System", value: "YRT/Viva + TTC Line 1" },
      { label: "Major Employers", value: "Construction, Retail, Manufacturing" },
      { label: "Notable", value: "Canada's Wonderland" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "Vaughan offers a mix of established communities (Woodbridge, Thornhill) and new developments (Vaughan Metropolitan Centre). The city is primarily suburban with single-family homes, though condo development is growing near transit.",
        tips: [
          "Vaughan Metropolitan Centre is the city's new downtown — modern and transit-connected",
          "Woodbridge and Kleinburg have established Italian-Canadian communities",
          "New housing developments offer modern amenities but check transit access",
        ],
      },
      {
        icon: Train,
        title: "Getting Around",
        content: "The TTC's Line 1 extension reaches Vaughan Metropolitan Centre, connecting directly to downtown Toronto. YRT/Viva buses serve the broader city. A car is still important for many areas.",
        tips: [
          "The subway extension makes Vaughan much more accessible to Toronto",
          "Viva Orange and Purple routes are express options for York Region travel",
          "Highway 400 and 407 provide quick car access to the GTA",
        ],
      },
      {
        icon: Briefcase,
        title: "Jobs & Employment",
        content: "Vaughan has a strong economy in construction, retail, and manufacturing. The city's business parks and the Vaughan Mills area provide diverse employment opportunities.",
        tips: [
          "COSTI Immigrant Services has Vaughan locations for job help",
          "The Vaughan Chamber of Commerce hosts business networking events",
          "Many logistics and warehouse positions are available in the area",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "Vaughan's community life centers around its diverse neighbourhoods, recreational facilities, and cultural events. The city has excellent parks, libraries, and community centres with programming for all ages.",
        tips: [
          "Vaughan Public Libraries offer settlement and language programs",
          "Community centres in every neighbourhood have subsidized programs",
          "Canada's Wonderland offers discounted community days",
        ],
      },
    ],
  },
  "richmond-hill": {
    name: "Richmond Hill",
    tagline: "Multicultural suburb with excellent schools and community programs.",
    population: "210,000",
    overview:
      "Richmond Hill is a diverse York Region suburb known for excellent schools, safe neighbourhoods, and a growing cultural scene. It offers a quieter pace than Toronto while maintaining good transit connections and a variety of settlement services for newcomers.",
    quickFacts: [
      { label: "Region", value: "York Region (GTA)" },
      { label: "Average Rent (1BR)", value: "$1,900/month" },
      { label: "Transit System", value: "YRT/Viva + GO Transit" },
      { label: "Major Employers", value: "Tech, Healthcare, Retail" },
      { label: "Known For", value: "Top-rated schools" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "Richmond Hill offers a range of housing from townhomes to single-family homes. The Yonge Street corridor is seeing more condo development. Oak Ridges and South Richvale are popular family areas.",
        tips: [
          "Areas along Yonge Street have the best transit access",
          "Oak Ridges offers nature trails and a more rural feel",
          "Renting a basement apartment is common and more affordable",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content: "Richmond Hill schools consistently rank among Ontario's best. The area is served by York Region District School Board and York Catholic. LINC classes are available through local settlement agencies.",
        tips: [
          "York Region schools are among the top-performing in Ontario",
          "Richmond Hill Public Library offers free ESL programs",
          "Seneca College's King Campus is nearby for post-secondary options",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "Richmond Hill has a growing arts and cultural scene. The Richmond Hill Centre for the Performing Arts hosts shows year-round. Community centres and parks provide gathering spaces for diverse communities.",
        tips: [
          "The Mill Pond area hosts seasonal community events",
          "Richmond Hill has a growing number of ethnic restaurants and shops",
          "Community centres offer programs in multiple languages",
        ],
      },
    ],
  },
  oakville: {
    name: "Oakville",
    tagline: "Upscale lakeside town with strong schools and family-oriented living.",
    population: "210,000",
    overview:
      "Oakville is an affluent lakeside town in Halton Region, known for its excellent schools, safe streets, and high quality of life. While it's pricier than many Ontario cities, it offers a welcoming community with growing diversity and newcomer support programs.",
    quickFacts: [
      { label: "Region", value: "Halton Region (GTA)" },
      { label: "Average Rent (1BR)", value: "$2,100/month" },
      { label: "Transit System", value: "Oakville Transit + GO" },
      { label: "Major Employers", value: "Pharma, Automotive, Finance" },
      { label: "Known For", value: "Lakefront, top schools" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "Oakville ranges from the charming downtown harbour area to newer suburban developments in North Oakville. Housing costs are above average but the quality of life is high. Rental apartments are available along major corridors.",
        tips: [
          "Downtown Oakville is walkable with boutique shops and restaurants",
          "North Oakville (Preserve, Joshua Creek) is popular with young families",
          "GO Train makes Toronto commuting feasible from Oakville",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content: "Oakville's schools rank among Ontario's best. Sheridan College's Trafalgar Campus is located here, offering diplomas, degrees, and renowned animation and arts programs.",
        tips: [
          "Halton District School Board is one of the top-performing in Ontario",
          "Sheridan College is known worldwide for its animation program",
          "Oakville Public Library offers free settlement and language programs",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "Oakville has a vibrant waterfront culture, art galleries, and a thriving farmers' market. The town hosts cultural festivals and community events that bring residents together.",
        tips: [
          "The Oakville waterfront trail is perfect for walking and cycling",
          "Downtown festivals and street events run throughout summer",
          "Halton Multicultural Council provides settlement services",
        ],
      },
    ],
  },
  burlington: {
    name: "Burlington",
    tagline: "Scenic waterfront city with a balanced lifestyle and growing diversity.",
    population: "190,000",
    overview:
      "Burlington offers a scenic waterfront, excellent community services, and a balanced lifestyle between urban and suburban. Part of Halton Region, it's well-connected to both Toronto and Hamilton via GO Transit, making it attractive for commuters and families alike.",
    quickFacts: [
      { label: "Region", value: "Halton Region" },
      { label: "Average Rent (1BR)", value: "$1,900/month" },
      { label: "Transit System", value: "Burlington Transit + GO" },
      { label: "Major Employers", value: "Healthcare, Manufacturing, Tech" },
      { label: "Known For", value: "Royal Botanical Gardens" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "Burlington offers diverse housing from waterfront condos downtown to family homes in Alton Village and Orchard. The downtown area is walkable and vibrant. Housing is moderately priced compared to Toronto.",
        tips: [
          "Downtown Burlington is one of the most walkable areas in the region",
          "Alton Village and Millcroft are popular family-oriented areas",
          "Burlington Housing is available for those needing subsidized options",
        ],
      },
      {
        icon: Train,
        title: "Getting Around",
        content: "Burlington Transit serves the city, with GO Transit providing fast connections to Toronto (Burlington GO station) and Hamilton. The city has excellent cycling infrastructure and waterfront trails.",
        tips: [
          "GO Train to Toronto Union Station takes about 50 minutes",
          "Burlington's waterfront trail system is excellent for cycling",
          "The city is compact enough that many errands can be done by bike",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "Burlington has a strong community spirit with farmers' markets, art galleries, and the Royal Botanical Gardens. The Sound of Music Festival and other events bring the community together. Settlement services are available through Halton agencies.",
        tips: [
          "The Royal Botanical Gardens is free for Burlington residents on select days",
          "Sound of Music Festival is one of Ontario's largest free music events",
          "Halton Multicultural Council provides newcomer settlement support",
        ],
      },
    ],
  },
  scarborough: {
    name: "Scarborough",
    tagline: "Toronto's most diverse district — affordable, transit-connected, and community-rich.",
    population: "630,000",
    overview:
      "Scarborough is a district within Toronto and one of the most culturally diverse places in the world. It's home to vibrant South Asian, Chinese, Caribbean, and African communities. With more affordable housing than downtown, growing transit, and strong settlement services, it's a top destination for newcomers.",
    quickFacts: [
      { label: "Region", value: "City of Toronto (East)" },
      { label: "Average Rent (1BR)", value: "$1,800/month" },
      { label: "Transit System", value: "TTC (subway, bus, SRT)" },
      { label: "Major Employers", value: "Healthcare, Retail, Education" },
      { label: "Diversity", value: "One of the most diverse places in the world" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "Scarborough has a wide range of neighbourhoods from Agincourt's Chinese community to Malvern's Caribbean and African communities. Apartment towers along major roads offer affordable rental options. The Scarborough Town Centre area is becoming denser.",
        tips: [
          "Scarborough offers much more affordable rent than downtown Toronto",
          "Apartment buildings along Lawrence, Eglinton, and Ellesmere are popular",
          "Consider areas near Line 2 (Bloor-Danforth) subway for best transit",
        ],
      },
      {
        icon: Train,
        title: "Getting Around",
        content: "The TTC's Line 2 reaches into Scarborough, and the Scarborough RT (being replaced by Line 2 extension) connects key areas. Express buses run frequently. The Eglinton Crosstown LRT will improve east-west transit.",
        tips: [
          "Line 2 extension to Scarborough Town Centre is under construction",
          "Express buses (900-series) are much faster than local routes",
          "The Eglinton Crosstown LRT will be a game-changer for east Scarborough",
        ],
      },
      {
        icon: Briefcase,
        title: "Jobs & Employment",
        content: "Scarborough has a diverse economy with retail, healthcare, and manufacturing. The Scarborough Health Network is a major employer. Employment centres specifically serve newcomer communities.",
        tips: [
          "ACCES Employment and COSTI have Scarborough locations",
          "Scarborough Health Network regularly hires healthcare workers",
          "Retail and food service positions are widely available as entry points",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content: "University of Toronto Scarborough Campus (UTSC) and Centennial College provide post-secondary options. LINC classes are available at numerous locations. Scarborough schools are well-equipped for newcomer students.",
        tips: [
          "UTSC offers co-op programs that help newcomers gain Canadian experience",
          "Centennial College has strong practical and bridging programs",
          "Toronto Public Library Scarborough branches offer free newcomer programs",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "Scarborough's cultural diversity is reflected in its incredible food scene, from dim sum to jerk chicken to biryani. Cultural festivals, places of worship, and community organizations create strong support networks for newcomers.",
        tips: [
          "Scarborough's food scene is legendary — explore every neighbourhood",
          "The Scarborough Museum and Bluffs are local treasures",
          "Cultural associations and religious centres are key community hubs",
        ],
      },
    ],
  },
  waterloo: {
    name: "Waterloo",
    tagline: "Innovation capital with world-class universities and a tight-knit community.",
    population: "150,000",
    overview:
      "Waterloo is the heart of Canada's tech triangle, home to the University of Waterloo and Wilfrid Laurier University. The city punches well above its weight in tech innovation and startup culture. For newcomers, it offers a welcoming small-city feel with big opportunities, excellent schools, and a growing multicultural community.",
    quickFacts: [
      { label: "Region", value: "Waterloo Region" },
      { label: "Average Rent (1BR)", value: "$1,550/month" },
      { label: "Transit System", value: "GRT (bus + ION LRT)" },
      { label: "Major Employers", value: "Tech, Education, Insurance" },
      { label: "Known For", value: "UWaterloo, BlackBerry origins" },
    ],
    sections: [
      {
        icon: Home,
        title: "Neighbourhoods & Housing",
        content: "Waterloo is compact and walkable, especially near the universities. Uptown Waterloo is a vibrant core with shops and restaurants. The Beechwood and Lakeshore areas are popular with families. Housing is more affordable than the GTA.",
        tips: [
          "Uptown Waterloo is walkable and close to the ION LRT",
          "Student housing turnover in spring creates rental opportunities",
          "The region has a housing stability program for those in need",
        ],
      },
      {
        icon: Train,
        title: "Getting Around",
        content: "The ION LRT connects Waterloo to Kitchener seamlessly. Grand River Transit buses cover the region. Cycling is extremely popular with dedicated trails and bike lanes throughout the city.",
        tips: [
          "The ION LRT is the fastest way to travel between Waterloo and Kitchener",
          "The Laurel Trail and Iron Horse Trail are excellent cycling routes",
          "GO Transit bus service connects to Toronto's Square One and Bramalea",
        ],
      },
      {
        icon: Briefcase,
        title: "Jobs & Employment",
        content: "Waterloo is a global tech hub with companies like Google, SAP, and hundreds of startups. The university's co-op program creates a strong pipeline of talent and opportunity. Insurance and financial services are also major employers.",
        tips: [
          "Communitech Hub is the centre of the tech ecosystem — attend events",
          "The Accelerator Centre supports newcomer entrepreneurs",
          "Waterloo Region has lower unemployment than the provincial average",
        ],
      },
      {
        icon: GraduationCap,
        title: "Education & Language",
        content: "The University of Waterloo is one of Canada's top universities, known for engineering and computer science. Wilfrid Laurier University offers strong business and arts programs. Conestoga College provides practical trades training. LINC classes are available.",
        tips: [
          "UWaterloo's co-op program is one of the largest in the world",
          "Laurier's Lazaridis School of Business is highly ranked",
          "Waterloo Public Library offers free newcomer settlement programs",
        ],
      },
      {
        icon: Heart,
        title: "Healthcare",
        content: "Grand River Hospital serves the region. The city has community health centres with multilingual services. Mental health support is available through CMHA Waterloo Wellington and local counselling services.",
        tips: [
          "The Langs Community Health Centre serves newcomers in multiple languages",
          "Region of Waterloo Public Health offers free immunizations and screenings",
          "Telehealth Ontario provides free 24/7 health advice by phone",
        ],
      },
      {
        icon: Users,
        title: "Community & Culture",
        content: "Waterloo has a strong sense of community with farmers' markets, the Uptown arts scene, and multicultural events. The KW Multicultural Centre and local faith communities provide excellent newcomer support networks.",
        tips: [
          "The Waterloo Uptown Jazz Festival and Busker Carnival are summer highlights",
          "KW Multicultural Centre is your go-to for settlement services",
          "Community gardens and maker spaces help newcomers connect",
        ],
      },
    ],
  },
};

export default function CityGuide() {
  const { city } = useParams<{ city: string }>();
  const data = city ? cityData[city.toLowerCase()] : null;

  if (!data) {
    return (
      <div className="bg-background min-h-screen">
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-display font-bold text-foreground mb-4">City not found</h1>
            <p className="text-muted-foreground mb-6">We don't have a guide for this city yet.</p>
            <Button asChild variant="outline">
              <Link to="/guides">
                ← Back to City Guides
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary py-10">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "City Guides", to: "/guides" },
              { label: data.name },
            ]}
            className="mb-6 [&_a]:text-primary-foreground/70 [&_a:hover]:text-primary-foreground [&_svg]:text-primary-foreground/40 [&>a]:text-primary-foreground/70 [&_span.text-foreground]:text-primary-foreground"
          />
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <MapPin size={22} className="text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-primary-foreground">{data.name}</h1>
          </div>
          <p className="text-primary-foreground/70 text-lg">{data.tagline}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Overview */}
        <div className="max-w-4xl mx-auto mb-10">
          <p className="text-foreground/80 leading-relaxed text-lg">{data.overview}</p>
        </div>

        {/* Quick Facts */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-card rounded-2xl p-6 border">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">Quick Facts</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {data.quickFacts.map((fact) => (
                <div key={fact.label}>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{fact.label}</p>
                  <p className="font-semibold text-foreground text-sm">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sections with landmark imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            {data.sections.map((section) => (
              <div key={section.title} className="bg-card rounded-2xl p-6 md:p-8 border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <section.icon size={20} className="text-primary" />
                  </div>
                  <h2 className="font-display font-semibold text-xl text-foreground">{section.title}</h2>
                </div>
                <p className="text-foreground/80 leading-relaxed mb-4 ml-14">{section.content}</p>
                {section.tips && (
                  <div className="ml-14 bg-secondary/50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Tips for Newcomers</p>
                    <ul className="space-y-2">
                      {section.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="text-primary mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Landmark imagery sidebar */}
          {city && CITY_LANDMARKS[city.toLowerCase()] && (
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <img
                  src={CITY_LANDMARKS[city.toLowerCase()].url}
                  alt={CITY_LANDMARKS[city.toLowerCase()].alt}
                  className="w-full h-80 object-cover rounded-2xl border"
                />
                <p className="text-xs text-muted-foreground text-center">{CITY_LANDMARKS[city.toLowerCase()].alt}</p>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="bg-primary/5 rounded-2xl p-8">
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">Need help settling in {data.name}?</h3>
            <p className="text-muted-foreground mb-4">Find local services, organizations, and support tailored to newcomers.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild>
                <Link to={`/directory?city=${encodeURIComponent(data.name)}`}>Find Services</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/map">View Map</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
