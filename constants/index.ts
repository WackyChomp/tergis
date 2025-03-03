
export const GenderOptions = ['Male', 'Female', 'Other', 'Prefer not to say']

export const MemberFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

/* ---- All pictures are found though Google / The names are made up ---- */
export const Experts = [
  {
    image: 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528',
    name: 'Steven Mackerel',
  },
  {
    image: 'https://images.generated.photos/dgXYHNWCZml9uYj1EPBY-5fsdMyInnAT6rzLGh_Wyc8/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92Ml8w/NzczNDUzLmpwZw.jpg',
    name: 'Joseph Braun',
  },
  {
    image: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/9d103008-6013-47f1-86f1-809898024f8e/e9bff17b-a1d7-42df-b24f-6c67d6afda9f.png',
    name: 'Murphy Simmons',
  },
  {
    image: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHV2NXNmNnh2b2o1eHR2N3RrZnJkMmRyZ3VuYWRjYTF4enlsamRscyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5bxqA1maRFlvCTQ37L/giphy.gif',
    name: 'Mister Hans',
  },
  {
    image: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg',
    name: 'Mike Stalone',
  },
  {
    image: 'https://www.forbesindia.com/lists/digital-stars/videos/Sarah_Sarosh_IMG_5833_BG.jpg',
    name: 'Sarah Mustard',
  },
  {
    image: 'https://i.pinimg.com/originals/b6/3b/58/b63b58844ea67873a87bbdd6014db8d5.jpg',
    name: 'Stephanie Mendes',
  },
  {
    image: 'https://www.piclumen.com/wp-content/uploads/2024/11/ai-face-generator-european-women.webp',
    name: 'Katie Faroah',
  },
  {
    image: 'https://miro.medium.com/v2/resize:fit:1400/0*wuGb-cGr81F8Ekzi',
    name: 'Christine Stein',
  },
  {
    image: 'https://pleated-jeans.com/wp-content/uploads/2023/07/midjourney-ai-average-women-without-makeup-from-different-countries-4.jpg',
    name: 'Sammy Su',
  },
  {
    image: 'https://lovo.ai/_next/image?url=%2Fimage%2FChloe.jpg&w=2048&q=75',
    name: 'Margret Thyme',
  },
]

export const IdentificationTypes = [
  'Birth Certificate',
  "Driver's License",
  'Medical Insurance Card/Policy',
  'Military ID Card',
  'National ID Card',
  'Passport',
  'Residental Green Card',
  'Social Security Card',
  'State ID Card',
  'Student ID Card',
  'Voter ID Card',
];