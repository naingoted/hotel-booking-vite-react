export interface Cabin {
  id: number;
  created_at: Date;
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: string;
}

export interface Booking {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  is_paid: boolean;
  num_guests: number;
  cabin_price: number;
  obsersvations: string;
  status: string;
  has_breakfast: boolean;
  total_price: number;
  cabins: Partial<Cabin>;
  guests: Partial<Guest>;
}

export interface Guest {
  id: number;
  full_name: string;
  created_at: string;
  email: string;
  national_id: string;
  nationality: string;
  country_flag: string;
}

export interface AuthUser {
  user: User;
  session: Session;
}

export interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: User;
  expires_at: number;
}

export interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: Date;
  phone: string;
  confirmation_sent_at: Date;
  confirmed_at: Date;
  last_sign_in_at: Date;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
  created_at: Date;
  updated_at: Date;
}

export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface Identity {
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface IdentityData {
  email: string;
  sub: string;
}

export interface UserMetadata {
  avatar: string;
  full_name: string;
}
