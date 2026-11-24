export interface HospitalInfo {
  name: string;
  tagline: string;
  emergencyNumber: string;
  ambulanceNumber: string;
  generalEnquiry: string;
  email: string;
  opdEmail: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    landmark: string;
  };
  generalVisitingHours: string;
  opdHours: string;
  emergencyHours: string;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  headOfDepartment: string;
  location: string;
  phoneExtension: string;
  opdTimings: string;
  commonProcedures: string[];
  bedsCount: number;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  qualifications: string;
  experienceYears: number;
  languages: string[];
  roomNumber: string;
  availableDays: string[];
  opdTimings: string;
  consultationFee: string;
  rating: number;
  reviewsCount: number;
  bio: string;
}

export interface VisitingWard {
  wardName: string;
  hours: string;
  rules: string;
  visitorLimit: string;
}

export interface InsurancePartner {
  id: string;
  name: string;
  category: "Private Insurance" | "TPA Partner" | "Government Scheme";
  claimType: "Cashless" | "Reimbursement";
  contact: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Appointments" | "Visiting" | "Billing & Insurance" | "Emergency";
}

export interface ChatbotPrompt {
  id: string;
  prompt: string;
  response: string;
  suggestedAction?: {
    label: string;
    href: string;
  };
}

export interface HospitalData {
  hospitalInfo: HospitalInfo;
  departments: Department[];
  doctors: Doctor[];
  visitingWards: VisitingWard[];
  visitorGuidelines: string[];
  amenities: { name: string; description: string; timing: string; icon: string }[];
  insurancePartners: InsurancePartner[];
  cashlessProcessSteps: { step: number; title: string; description: string }[];
  faqs: FAQItem[];
  chatbotQuickPrompts: ChatbotPrompt[];
}
