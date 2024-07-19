export interface ScrappingRecord {
  id: string;
  company: {
    name: string;
    logo: string;
  };
  socialProfiles: {
    facebook: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  description: string;
  address: string;
  phone: string;
  email: string;
  url: string
}
