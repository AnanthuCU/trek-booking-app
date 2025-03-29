type CommunityData = {
  id: string;
  channel_name: string;
  whatsapp_link: null | string;
  telegram_link: null | string;
  subcriber_count: null | number;
};

type LinkData = {
  id: string;
  title: string;
  link: string;
  isOpened: boolean;
  event_start: null | string;
  event_end: null | string;
  createdAt: string;
  updatedAt: string;
};

type OtherLinkData = {
  id: string;
  title: string;
  link: string;
  tag: string;
  isOpened: boolean;
  event_start: null | string;
  event_end: null | string;
  createdAt: string;
  updatedAt: string;
};

export type StateData = {
  id: string;
  name: string;
};

export type SampleCourse = {
  id: string;
  name: string;
};

export const communityResponseData: CommunityData[] = [
  {
    id: "06b4ec1d-c7b9-4fef-895a-2d09d510d167",
    channel_name: "Karnataka",
    whatsapp_link: "https://chat.whatsapp/karnataka",
    telegram_link: "https://api.telegram/karnataka",
    subcriber_count: 10045,
  },
  {
    id: "2e726af6-ebcf-47ff-a9c1-809dd3e70de9",
    channel_name: "Tamil Nadu",
    whatsapp_link: "https://chat.whatsapp/karnataka",
    telegram_link: "https://api.telegram/karnataka",
    subcriber_count: 12000,
  },
  {
    id: "31647caa-b2ae-47d6-966b-ef190a1c6cb7",
    channel_name: "MCC",
    whatsapp_link: "https://chat.whatsapp/karnataka",
    telegram_link: "https://api.telegram/karnataka",
    subcriber_count: 28000,
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    channel_name: "Kerala",
    whatsapp_link: "https://chat.whatsapp/karnataka",
    telegram_link: "https://api.telegram/karnataka",
    subcriber_count: 7000,
  },
];

// News & Updates, Application Links, Couselling Links will follow the same response structure
// use updatedAt property to render the orange icon
export const linkResponseData: LinkData[] = [
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title:
      "MBBS Management Quota Seat Available in Karnataka | Negotiated Fee Package | Medical Mentor",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: false,
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title:
      "Candidates whose nationality has already been converted to NRI in earlier rounds NEED NOT send their documents again.",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: true,
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title:
      "KEA Mock Results Analysis | KEA Counselling 2023 | UG NEET 2023 | Medical Mentor",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: true,
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title:
      "Haryana Registration & Choice Filling | Haryana State Counselling 2023 | Medical Mentor",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: false,
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
];

export const otherLinkResponseData: OtherLinkData[] = [
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title:
      "MBBS Management Quota Seat Available in Karnataka | Negotiated Fee Package | Medical Mentor",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: false,
    tag: "Resources",
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title: "MCC Seat Matrix Analysis",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: true,
    tag: "Resources",
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title: "MBBS Management Quota Seat Available in Karnataka Analysis",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: true,
    tag: "Resources",
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title: "Conversion of Nationality Indian to NRI Analysis",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: false,
    tag: "Resources",
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title: "KEA Mock Results Analysis",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: false,
    tag: "Resources",
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title: "MBBS Management Quota Seat Available in Karnataka",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: false,
    tag: "Essential Links",
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title:
      "MBBS Management Quota Seat Available in Karnataka | Negotiated Fee Package",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: false,
    tag: "Essential Links",
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title: "MBBS Management Quota Seat Available in Karnataka Analysis",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: false,
    tag: "Essential Links",
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title:
      "MBBS & Medical PG Seat Increment Analysis in the last 4 years, according to NMC Analysis",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: false,
    tag: "Essential Links",
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
  {
    id: "33148ebc-08ac-4a80-babe-43ab6d12043b",
    title: "MCC Seat Matrix Analysis",
    link: "https://nic.karnataka.gov.in/mbbs-management-quota/",
    isOpened: false,
    tag: "Essential Links",
    event_start: "2023-12-04 10:50:25.212+05:30",
    event_end: "2023-12-08 10:50:25.212+05:30",
    createdAt: "2023-12-01T13:13:05.101Z",
    updatedAt: "2023-12-01T13:13:05.101Z",
  },
];

export const stateData: StateData[] = [
  {
    id: "1234",
    name: "Tamil Nadu",
  },
  {
    id: "12",
    name: "Karnataka",
  },
  {
    id: "1",
    name: "Kerala",
  },
  {
    id: "34",
    name: "Maharastra",
  },
  {
    id: "23",
    name: "Andra Pradesh",
  },
];

export const yearData: StateData[] = [
  {
    id: "1",
    name: "2023",
  },
];

export const sampleCourseData: SampleCourse[] = [
  {
    id: "123",
    name: "MBBS",
  },
  {
    id: "122",
    name: "Diploma in Ayush",
  },
  {
    id: "121",
    name: "BDS",
  },
  {
    id: "111",
    name: "Diploma in PCH",
  },
  {
    id: "100",
    name: "MCH",
  },
  {
    id: "144",
    name: "DNB",
  },
];

export const sampleCategoryData: SampleCourse[] = [
  {
    id: "1",
    name: "1GH",
  },
  {
    id: "2",
    name: "1H",
  },
  {
    id: "3",
    name: "BC",
  },
  {
    id: "4",
    name: "FC",
  },
  {
    id: "5",
    name: "MC",
  },
  {
    id: "6",
    name: "1G",
  },
];

export const institutesDropDownResponse = [
  {
    id: "14648830-0013-4195-999c-871378088bc1",
    name: "A J Institute of Medical Sciences & Research Centre, Mangalore",
  },
  {
    id: "c385301f-c8ae-4aa9-8b21-50ffc61e6239",
    name: "Adichunchanagiri Institute of Medical Sciences Bellur",
  },
  {
    id: "ad47f0d5-be53-4e1a-9c74-6ddba0d4b6df",
    name: "Akash Institute of Medical Sciences & Research Centre, Devanhalli, Bangalore, Karnataka",
  },
  {
    id: "86b5eba3-8549-49b3-bc47-41915ea201ad",
    name: "Al-Ameen Medical College, Bijapur",
  },
  {
    id: "79ecfd23-c526-4b6d-858a-be7bf7568c54",
    name: "Aralaguppe Mallegowda District Hospital, Chikkamagaluru, Karnataka-577101",
  },
  {
    id: "12d8fa33-c7ed-4e92-a9a4-e3eb5b7ce6d1",
    name: "Bangalore Medical College and Research Institute, Bangalore",
  },
  {
    id: "71fe8dcd-32a9-4f71-9057-a948c556769a",
    name: "Basaveswara Medical College and Hospital, Chitradurga",
  },
  {
    id: "cc5e9f37-a7c2-4edd-ac4a-a8b4f23c7741",
    name: "Belagavi Institute of Medical Sciences, Belagavi",
  },
  {
    id: "1234134f-4a18-44a3-93e8-afadc08159ff",
    name: "BGS Global Institute of Medical Sciences, Bangalore",
  },
  {
    id: "e4154e6d-e07a-4829-af00-ae9c72ce56cb",
    name: "Bidar Institute of Medical Sciences, Bidar",
  },
  {
    id: "ec76b664-043f-4137-a6ad-1f6ed97ec419",
    name: "Chamrajanagar Institute of Medical Sciences, Karnataka",
  },
  {
    id: "db109b17-b8af-4bc5-8f3f-33235ed53c06",
    name: "Dharwad Institute of Mental Health and Neuro Sciences, Dharwad",
  },
  {
    id: "60b26a72-a6e9-4ea8-9305-9a6785ae870a",
    name: "District Hospital, Bagalkot",
  },
  {
    id: "e6fcff41-2367-4c6d-9c3e-da4782b367a6",
    name: "District Hospital, Ballari, Karnataka-583101",
  },
  {
    id: "dee93b7d-0b53-44aa-93a9-4b488fbdc2ed",
    name: "District Hospital, Dharwad, Karnataka-580008",
  },
  {
    id: "5ebce163-20d8-44b5-9315-39c32937e68f",
    name: "District Hospital, Haveri, Karnataka-581110",
  },
  {
    id: "4de91d1c-2c39-4762-b7bc-a47b0d36e411",
    name: "District Hospital, Vijayapura, Karnataka-586103",
  },
  {
    id: "09c3f670-e571-458c-aa81-233872fe464f",
    name: "Dr BR Ambedkar Medical College, Bangalore",
  },
  {
    id: "1ba1c334-24c8-4b5b-b73f-51599674451f",
    name: "East Point College of Medical Sciences & Research Centre, Bangalore",
  },
  {
    id: "72ddf664-9964-444c-9b20-7cd0e657e775",
    name: "Employees State Insurance Corporation Medical College, Bangalore",
  },
  {
    id: "b6f327d2-199c-4a9f-a2fd-4ca297e59c79",
    name: "Employees State Insurance Corporation Medical College, Gulbarga",
  },
  {
    id: "43d19687-4728-4c59-a7b4-efdf8bc158fe",
    name: "Father Mullers Medical College, Mangalore",
  },
  {
    id: "28ee6ce3-26d2-494a-8282-0f919124281e",
    name: "Gadag Institute of Medical Sciences, Mallasamudra, Mulgund Road, Gadag",
  },
  {
    id: "e87eb941-3480-4c3d-9ba4-33af05cfbc55",
    name: "General Hospital, Jayanagar, Bengaluru, Karnataka-560041",
  },
  {
    id: "86c6810f-11fe-4a84-92fd-d6cea0d8cb8e",
    name: "General Hospital, Shikaripura",
  },
  {
    id: "edcc0d14-74a3-4a29-8078-a1e2475a31ce",
    name: "Gulbarga Institute of Medical Sciences, Gulbarga",
  },
  {
    id: "0d93c90c-3ce7-420e-87f5-3463fd8d9fe2",
    name: "Hassan Institute of Medical Sciences, Hassan",
  },
  {
    id: "7d2af727-29ff-46e2-9af7-ec270bb6886c",
    name: "Indira Gandhi Institute of Child Health, Bangalore",
  },
  {
    id: "f1637fa3-2113-40d6-9479-5e2987aecd77",
    name: "JJM Medical College, Davangere",
  },
  {
    id: "d2ff03f3-25f2-4f9f-90ce-b7e466c275b2",
    name: "JSS Medical College, Mysore",
  },
  {
    id: "8b61b107-140b-4cb8-8565-5f3807ec636f",
    name: "K S Hegde Medical Academy, Mangalore",
  },
  {
    id: "c75d5245-b895-40a0-b96a-1192192e9f93",
    name: "K V G Medical College, Sullia",
  },
  {
    id: "b0e0ec1c-fd08-4fe9-9d8c-a0fcb9a3063d",
    name: "Kanachur Institute of Medical Sciences, Mangalore",
  },
  {
    id: "41626aa8-6fc4-4504-92eb-22780f4a011a",
    name: "Karnataka Institute of Medical Sciences, Hubballi",
  },
  {
    id: "8a5ac0bf-7e98-45ba-a665-327b7491befc",
    name: "Karwar Institute of Medical Sciences, Karwar",
  },
  {
    id: "19fd4272-1283-4e91-a217-0350846b6ebe",
    name: "Kasturba Medical College, Mangalore",
  },
  {
    id: "92e8d933-6240-4703-b250-b7106d0243bb",
    name: "Kasturba Medical College, Manipal",
  },
  {
    id: "727b915f-70e6-49c0-a72d-d29f48335a31",
    name: "Kempegowda Institute of Medical Sciences, Bangalore",
  },
  {
    id: "c3743156-ec60-4426-b98b-c4156dbcd697",
    name: "Khaja Bandanawaz University - Faculty of Medical Sciences, Gulbarga",
  },
  {
    id: "8d4832fc-fe23-44cb-98d3-ea63c069fdfe",
    name: "Kidwai Memorial Institute of Oncology, Bangalore",
  },
  {
    id: "0f8ea681-3065-463a-a987-bb0bd340dfbe",
    name: "Kodagu Institute of Medical Sciences, Kodagu",
  },
  {
    id: "75d0856d-a54e-44f3-8e4e-c9a067f5c535",
    name: "Koppal Institute of Medical Sciences Koppal, Karnataka",
  },
  {
    id: "2b3aabf5-6a14-42d9-b6c5-a8597cba101a",
    name: "M S Ramaiah Medical College, Bangalore",
  },
  {
    id: "fb8b0ccb-4e6e-4bbd-ab9c-92a40b1404f1",
    name: "Mahadevappa Rampure Medical College, Gulbarga",
  },
  {
    id: "d971107c-c510-481a-92bf-b82f1c25a849",
    name: "Mandya Institute of Medical Sciences, Mandya",
  },
  {
    id: "a1842b58-306a-4be4-af68-10225730ecc9",
    name: "MVJ Medical College and Research Hospital, Bangalore",
  },
  {
    id: "a0744626-0676-4293-bee9-b13c5d6a728c",
    name: "Mysore Medical College and Research Instt. (Prev.name Government Medical College), Mysore",
  },
  {
    id: "d7f6186a-48de-4176-87d2-6002f268a8e3",
    name: "Navodaya Medical College, Raichur",
  },
  {
    id: "11dee5bf-78eb-4ed8-9e36-9195a8e192bf",
    name: "Raichur Institute of Medical Sciences, Raichur",
  },
  {
    id: "90633b69-8837-470e-9066-aeb8871af598",
    name: "S S Institute of Medical Sciences & Research Centre, Davangere",
  },
  {
    id: "744a0af6-644b-4bf1-9bb4-763850644011",
    name: "S. Nijalingappa Medical College & HSK Hospital & Research Centre, Bagalkot",
  },
  {
    id: "b46d235e-303d-4432-8115-db25e4db94fc",
    name: "Sanjay Gandhi Institute of Trauma and Orthopaedics, Bangalore",
  },
  {
    id: "34677cfa-100c-4790-b7c3-d3eabce7c315",
    name: "Sapthagiri Institute of Medical Sciences & Research Centre, Bangalore",
  },
  {
    id: "87d8397c-0969-4604-b251-81e329556a41",
    name: "SDM College of Medical Sciences & Hospital, Sattur, Dharwad",
  },
  {
    id: "382749e0-23f2-41f0-aea8-c3a7291437a2",
    name: "SDS Tuberculosis Research Centre and Rajiv Gandhi Institute of Chest Diseases, Bangalore",
  },
  {
    id: "96e72ba7-47f4-4045-9e71-8f924906bc0a",
    name: "Shimoga Institute of Medical Sciences, Shimoga",
  },
  {
    id: "63caa7c2-1114-495a-af60-057e4f6981c6",
    name: "Shri Atal Bihari Vajpayee Medical College & Research Institute, Bengaluru",
  },
  {
    id: "65d4c802-da89-4ab8-b8da-aa4ad45eca72",
    name: "Shridevi Institute of Medical Sciences & Research Hospital, Tumkur",
  },
  {
    id: "b6a78a2f-1ddf-44b0-b764-4a0dda1c7d20",
    name: "Srinivas Institute of Medical Research Centre, Srinivasnagar",
  },
  {
    id: "0d240249-e653-4058-b8b2-dd184b531afd",
    name: "St. Johns Medical College, Bangalore",
  },
  {
    id: "d69db392-0446-4e57-8e30-c2c01f2c51d5",
    name: "Sub Division Hospital, Gangavathi, Karnataka-583227",
  },
  {
    id: "abe34531-33b8-422d-bcd1-b93305b032b0",
    name: "Subbaiah Institute of Medical Sciences, Shimoga",
  },
  {
    id: "dde76298-4a94-43a3-ab31-c713c9a3d269",
    name: "The Oxford Medical College, Hospital & Research Centre, Bangalore",
  },
  {
    id: "167c503d-c5f4-400d-a8a3-d5c3dd474732",
    name: "Vijaynagar Institute of Medical Sciences, Bellary",
  },
  {
    id: "fc30d6d3-b4c9-4dd7-81c8-f9b0befed315",
    name: "Vydehi Institute Of Medical Sciences & Research Centre, Bangalore",
  },
  {
    id: "4e169170-75e1-4f89-b27b-9e49e11d78e9",
    name: "Yenepoya Medical College, Mangalore",
  },
];
