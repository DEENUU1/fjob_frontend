type Offer = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  company?: string;
  addresses: Address[];
  is_remote: boolean;
  is_hybrid: boolean;
  apply_form?: string;
  skills: string;
  salary: Salary[];
  experience: Experience[];
  work_type?: string[];
  employment_type?: string[];
  createdAt: Date;
  status: string;
  company_logo: string;
  url: string;
  company_name?: string;
  days_until_expiration_str: string;
  is_expired?: boolean;
  is_new?: boolean;
  is_scraped: boolean;
  created_at: string;
};

type Country = {
  id: number
  name: string
}

type Region = {
  id: number
  name: string
  country?: Country
}

type Address = {
  id: number;
  country: Country;
  city: City;
  region: Region;
  street?: string;
};

type City = {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  region?: string;
  country?: string;
};

type Salary = {
  id: number;
  salary_from?: number;
  salary_to?: number;
  currency?: string;
  schedule?: string;
};

type Experience = {
  id: number;
  name: string;
};

type OfferResult = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Offer[];
}

type Employment = {
  id: number;
  name: string;
}

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

type CompanyCategory = {
  id: number,
  name: string
}

type Company = {
  id: number;
  name: string;
  category: CompanyCategory | null;
  logo: string | null;
  slug: string;
  description?: string | null;
  linkedin_url?: string | null;
  facebook_url?: string | null;
  twitter_url?: string | null;
  youtube_url?: string | null;
  instagram_url?: string | null;
  website_url?: string | null;
  is_active: boolean;
  company_size: number;
  user: User;
  addresses?: Address[] | null;
  num_of_offers_to_add: number;
}

type WorkType = {
  id: number;
  name: string;
}

type EmploymentType = {
  id: number;
  name: string;
}

type OfferHelper = {
  id: number;
  slug: string;
  title: string;
}

type UserAppliedOffer = {
  id: number;
  created_at: string;
  user: number;
  status: string;
  job_offer: OfferHelper;
  message?: string | null;
  future_recruitment: boolean;
}

type TimelineData = {
  created_at__date: string;
  num_candidates: number
}