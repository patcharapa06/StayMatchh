export type Region = 
  | 'ภาคเหนือ' 
  | 'ภาคตะวันออกเฉียงเหนือ' 
  | 'ภาคกลาง' 
  | 'ภาคตะวันออก' 
  | 'ภาคตะวันตก' 
  | 'ภาคใต้';

export interface RoomImage {
  url: string;
  title: string;
  caption: string;
  type: 'bedroom' | 'pet_zone' | 'bathroom' | 'outdoor' | 'facility';
}

export interface HotelRoom {
  roomType: string;
  bedType: string;
  sizeSqM: number;
  maxGuests: number;
  maxPets: number;
  pricePerNight: number;
  images: RoomImage[];
  petAmenities: string[];
  roomAmenities: string[];
}

export interface Hotel {
  hotelId: string;
  hotelName: string;
  hotelType: 'Hotel' | 'Resort' | 'Villa' | 'Boutique' | 'Homestay';
  province: string;
  district: string;
  price: number;
  capacity: number;
  rating: number;
  reviewCount: number;
  petFriendly: boolean;
  petTypesAllowed: ('dog' | 'cat' | 'all_pets')[];
  petWeightLimitKg?: number;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pool: boolean;
  latitude: number;
  longitude: number;
  primaryImage: string;
  rooms: HotelRoom[];
  popularAttractionNearby: string;
  distanceToAttractionKm: number;
  suitableScoreAvg: number; // 0 - 100%
  description: string;
  nonPetReason?: string; // Reason when pets are not allowed (e.g. strict hypoallergenic, business luxury policy)
}

export interface HotelReview {
  id: string;
  hotelId: string;
  hotelName: string;
  province: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  petBrought: boolean;
  petType?: string;
  title: string;
  comment: string;
  roomType: string;
  tags: string[];
  helpfulCount: number;
}

export interface WebsiteReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  category: 'ระบบจับคู่ AI' | 'ความสะดวกในการจอง' | 'ภาพถ่ายห้องพัก' | 'การแสดงผลและข้อมูล' | 'ข้อเสนอแนะทั่วไป';
  title: string;
  comment: string;
  helpfulCount: number;
  device: string;
}

export interface BookingRecord {
  id: string;
  bookingCode: string;
  hotelId: string;
  hotelName: string;
  hotelType: string;
  province: string;
  district: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guestsCount: number;
  hasPet: boolean;
  petCount: number;
  petType?: string;
  pricePerNight: number;
  totalPrice: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface Attraction {
  attractionId: string;
  attractionName: string;
  attractionType: 'ธรรมชาติ' | 'วัฒนธรรม' | 'ชุมชน/ตลาด' | 'สวนสาธารณะ/กิจกรรม' | 'ชายหาด';
  province: string;
  district: string;
  petAllowed: boolean;
  latitude: number;
  longitude: number;
}

export interface CustomerProfile {
  customerId: string;
  budget: number;
  guests: number;
  pet: boolean;
  petCount: number;
  preferredHotelType: string;
  province: string;
  wifiNeed: boolean;
  parkingNeed: boolean;
  breakfastNeed: boolean;
  poolNeed: boolean;
  matchedHotelId?: string;
  searchDate: string;
}

export interface ModelMetric {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  description: string;
  recommended: boolean;
}

export interface ProvinceSummary {
  name: string;
  nameEn: string;
  region: Region;
  hotelCount: number;
  petFriendlyCount: number;
  avgPrice: number;
  searchDemandIndex: number;
  topAttraction: string;
}

export interface SharedSearchCriteria {
  originProvince: string;
  targetProvince: string;
  includeCorridorHotels: boolean;
  selectedCorridorProvinceFilter: string;
  pointAId: string;
  selectedAttractionId: string;
  minBudget: number;
  maxBudget: number;
  strictBudgetFilter: boolean;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  pet: boolean;
  petCount: number;
  petType: 'dog' | 'cat' | 'all';
  includeNonPetHotels: boolean;
  preferredType: string;
  strictTypeOnly: boolean;
  wifiNeed: boolean;
  parkingNeed: boolean;
  breakfastNeed: boolean;
  poolNeed: boolean;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
}

