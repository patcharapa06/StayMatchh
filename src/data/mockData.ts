import { Hotel, Attraction, CustomerProfile, ModelMetric, HotelReview, WebsiteReview, BookingRecord } from '../types';
import { ALL_77_PROVINCES } from './provinces';
import hotelKkuExterior from '../assets/images/hotel_kku_exterior_1790268248743.jpg';
import hotelPetRoom from '../assets/images/hotel_pet_room_1790268261336.jpg';
import hotelResortPool from '../assets/images/hotel_resort_pool_1790268273757.jpg';
import hotelLuxurySuite from '../assets/images/hotel_luxury_suite_1790268285958.jpg';
import hotelPetGarden from '../assets/images/hotel_pet_garden_1790268297558.jpg';

// Curated verified room & hotel photos (Real photographed accommodation assets)
const SAMPLE_ROOM_IMAGES = {
  masterBedroom: hotelPetRoom,
  deluxeSuite: hotelLuxurySuite,
  cozyStudio: hotelPetRoom,
  poolVilla: hotelResortPool,
  petCorner: hotelPetRoom,
  petPlayArea: hotelPetGarden,
  modernBathroom: hotelLuxurySuite,
  hotelExterior: hotelKkuExterior,
  balconyView: hotelResortPool,
  dogBedZone: hotelPetRoom,
};

// Seeded detailed hotels including KKU Hotel from user's document
export const SEED_HOTELS: Hotel[] = [
  {
    hotelId: 'H00001',
    hotelName: 'KKU Hotel & Pet Paradise (โรงแรม มข.)',
    hotelType: 'Hotel',
    province: 'ขอนแก่น',
    district: 'เมือง',
    price: 1200,
    capacity: 4,
    rating: 4.5,
    reviewCount: 342,
    petFriendly: true,
    petTypesAllowed: ['dog', 'cat', 'all_pets'],
    petWeightLimitKg: 18,
    wifi: true,
    parking: true,
    breakfast: true,
    pool: false,
    latitude: 16.4321,
    longitude: 102.8236,
    popularAttractionNearby: 'บึงแก่นนคร',
    distanceToAttractionKm: 2.5,
    suitableScoreAvg: 94,
    description: 'โรงแรมใจกลางเมืองขอนแก่น ใกล้มหาวิทยาลัยขอนแก่นและบึงแก่นนคร ต้อนรับสัตว์เลี้ยงพร้อมเบาะนอนและชามอาหาร มีสนามหญ้าเดินเล่นสำหรับสุนัข',
    primaryImage: hotelKkuExterior,
    rooms: [
      {
        roomType: 'Deluxe Pet Garden Room',
        bedType: '1 King Bed หรือ 2 Single Beds',
        sizeSqM: 38,
        maxGuests: 2,
        maxPets: 2,
        pricePerNight: 1200,
        petAmenities: ['เบาะนอนสัตว์เลี้ยงขนาดนุ่มพิเศษ', 'ชามน้ำและอาหารสแตนเลส', 'แผ่นรองซับและถุงเก็บมูล', 'ทางเชื่อมต่อสวนวิ่งเล่น'],
        roomAmenities: ['High-speed Wi-Fi 1Gbps', 'Smart TV 50"', 'ตู้เย็น & มินิบาร์', 'เครื่องปรับอากาศ Inverter', 'ฝักบัว Rain Shower'],
        images: [
          { url: hotelPetRoom, title: 'ห้องนอนจริง Deluxe Pet Room', caption: 'เตียงคิงไซส์และเบาะนอนสัตว์เลี้ยง พร้อมน้องหมาพักผ่อนจริง', type: 'bedroom' },
          { url: hotelPetRoom, title: 'โซนเบาะนอนสัตว์เลี้ยงจริง', caption: 'มุมนอนส่วนตัวของน้องหมา-น้องแมว พร้อมถาดอาหาร', type: 'pet_zone' },
          { url: hotelLuxurySuite, title: 'ห้องน้ำแยกโซนเปียก-แห้ง', caption: 'มีจุดอาบน้ำและไดร์เป่าขนสัตว์เลี้ยง', type: 'bathroom' },
          { url: hotelPetGarden, title: 'สนามหญ้า Pet Run วิ่งเล่นจริง', caption: 'สวนหญ้าธรรมชาติแบบปิด ล้อมรั้วมิดชิด ปล่อยวิ่งเล่นอิสระ', type: 'outdoor' }
        ]
      },
      {
        roomType: 'Family Pet Suite with Balcony',
        bedType: '2 Queen Beds',
        sizeSqM: 54,
        maxGuests: 4,
        maxPets: 3,
        pricePerNight: 1850,
        petAmenities: ['คอนโดแมว 3 ชั้น', 'เบาะนอนสุนัขไซส์ L 2 ชิ้น', 'ของเล่นต้อนรับ Welcome Toy', 'ชามน้ำระบบน้ำวนกรอง'],
        roomAmenities: ['Wi-Fi ฟรี', 'ระเบียงกว้างวิวสวน', 'ไมโครเวฟ', 'โซฟาเบด', 'อ่างอาบน้ำ'],
        images: [
          { url: hotelLuxurySuite, title: 'ห้องพัก Family Suite จริง', caption: 'กว้างขวาง ปลอดโปร่ง ตกแต่งด้วยไม้จริงและหินอ่อน', type: 'bedroom' },
          { url: hotelPetRoom, title: 'มุมสัตว์เลี้ยง & ของเล่น', caption: 'พื้นที่เพลิดเพลินสำหรับน้องแมวพร้อมเสาลับเล็บ', type: 'pet_zone' },
          { url: hotelPetGarden, title: 'วิวระเบียงชมสวนธรรมชาติ', caption: 'พื้นที่สีเขียวร่มรื่น ปลอดภัยสำหรับสัตว์เลี้ยง', type: 'outdoor' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00002',
    hotelName: 'Kaen Nakhon Lakeview Resort',
    hotelType: 'Resort',
    province: 'ขอนแก่น',
    district: 'เมือง',
    price: 1650,
    capacity: 4,
    rating: 4.7,
    reviewCount: 489,
    petFriendly: true,
    petTypesAllowed: ['dog', 'cat'],
    petWeightLimitKg: 25,
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 16.4215,
    longitude: 102.8390,
    popularAttractionNearby: 'วัดหนองแวง พระอารามหลวง',
    distanceToAttractionKm: 1.2,
    suitableScoreAvg: 96,
    description: 'รีสอร์ทติดริมบึงแก่นนคร สระว่ายน้ำระบบเกลือพร้อมสระแยกสำหรับสัตว์เลี้ยง บรรยากาศร่มรื่น วิวพระมหาธาตุแก่นนคร',
    primaryImage: hotelResortPool,
    rooms: [
      {
        roomType: 'Lakeside Pool Villa (Pet Allowed)',
        bedType: '1 King Size',
        sizeSqM: 65,
        maxGuests: 2,
        maxPets: 2,
        pricePerNight: 2400,
        petAmenities: ['สระว่ายน้ำส่วนตัวพร้อมเสื้อชูชีพสุนัข', 'เบาะนอนริมน้ำ', 'บริการ Room Service เมนูอาหารสัตว์เลี้ยง'],
        roomAmenities: ['สระว่ายน้ำส่วนตัว', 'วิวบึง 180 องศา', 'Nespresso Coffee Machine', 'Wi-Fi 6', 'ฟรีอาหารเช้าบุฟเฟต์'],
        images: [
          { url: hotelResortPool, title: 'วิลล่าสระว่ายน้ำส่วนตัวจริง', caption: 'สระว่ายน้ำสีฟ้าใส บรรยากาศรีสอร์ทเขตร้อนริมน้ำ', type: 'bedroom' },
          { url: hotelPetGarden, title: 'ลานสนามหญ้าริมบึงจริง', caption: 'เดินเล่นยามเย็นรับลมสบายริมน้ำ พร้อมลานวิ่งเล่น', type: 'outdoor' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00003',
    hotelName: 'Nimman Paw Haven Boutique',
    hotelType: 'Boutique',
    province: 'เชียงใหม่',
    district: 'เมืองเชียงใหม่',
    price: 1800,
    capacity: 2,
    rating: 4.8,
    reviewCount: 620,
    petFriendly: true,
    petTypesAllowed: ['dog', 'cat', 'all_pets'],
    petWeightLimitKg: 15,
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 18.7961,
    longitude: 98.9686,
    popularAttractionNearby: 'ดอยสุเทพ',
    distanceToAttractionKm: 4.8,
    suitableScoreAvg: 95,
    description: 'บูทีคโฮเทลยอดฮิตย่านนิมมานเหมินทร์ ตกแต่งสไตล์มินิมอลญี่ปุ่น อบอุ่น ต้อนรับน้องหมาน้องแมว มีคาเฟ่สัตว์เลี้ยงในตัว',
    primaryImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      {
        roomType: 'Tatami Zen Pet Suite',
        bedType: 'Japanese Futon King',
        sizeSqM: 42,
        maxGuests: 2,
        maxPets: 2,
        pricePerNight: 1800,
        petAmenities: ['เบาะนอนสไตล์มูจิ', 'ชามเซรามิกสลักชื่อ', 'คอกสัตว์เลี้ยงไม้สัก', 'ขนมฟรีทุกวัน'],
        roomAmenities: ['สมาร์ททีวี 55 นิ้ว', 'อ่างแช่น้ำร้อน', 'เครื่องฟอกอากาศดักขนสัตว์เกรด HEPA 13', 'Wi-Fi ความเร็วสูง'],
        images: [
          { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', title: 'ห้องทาทามิสไตล์ญี่ปุ่น', caption: 'เตียงต่ำ สะดวกสำหรับสัตว์เลี้ยงขึ้นลง ไม่เจ็บข้อต่อ', type: 'bedroom' },
          { url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80', title: 'เบาะนอนมินิมอล', caption: 'ผ้าใยไผ่ระบายอากาศ ทำความสะอาดฆ่าเชื้อด้วย UV ก่อนเข้าพัก', type: 'pet_zone' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00004',
    hotelName: 'Sukhumvit Tails Executive Hotel',
    hotelType: 'Hotel',
    province: 'กรุงเทพมหานคร',
    district: 'คลองเตย',
    price: 2400,
    capacity: 3,
    rating: 4.6,
    reviewCount: 890,
    petFriendly: true,
    petTypesAllowed: ['dog', 'cat', 'all_pets'],
    petWeightLimitKg: 20,
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 13.7307,
    longitude: 100.5700,
    popularAttractionNearby: 'สวนเบญจกิติ (Dog Park)',
    distanceToAttractionKm: 1.5,
    suitableScoreAvg: 93,
    description: 'โรงแรมระดับพรีเมียมใจกลางสุขุมวิท พร้อมบริการพี่เลี้ยงสัตว์เลี้ยง (Pet Sitting) มีสวนลอยฟ้า Sky Dog Park รับวิวพาโนรามากรุงเทพฯ',
    primaryImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      {
        roomType: 'Skyline Deluxe Room',
        bedType: 'King Bed',
        sizeSqM: 45,
        maxGuests: 2,
        maxPets: 1,
        pricePerNight: 2400,
        petAmenities: ['เบาะหนังออร์แกนิก', 'กล้องวงจรปิด Pet Cam ดูสัตว์เลี้ยงผ่านแอป', 'บริการพาวอล์คเกอร์'],
        roomAmenities: ['วิวเมืองสุขุมวิท', 'เครื่องทำกาแฟสด', 'โต๊ะทำงานพร้อม Ergonomic Chair', 'ระบบสั่งอาหารในห้อง'],
        images: [
          { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80', title: 'ห้องนอนวิวสกายไลน์', caption: 'กระจกตัดแสงเก็บเสียง 100% สัตว์เลี้ยงไม่ตกใจเสียงจราจร', type: 'bedroom' },
          { url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80', title: 'Sky Dog Playground ชั้น 12', caption: 'สวนลอยฟ้าพื้นหญ้าเทียมแอนตี้แบคทีเรีย', type: 'outdoor' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00005',
    hotelName: 'Hua Hin Beachfront Pet Haven',
    hotelType: 'Resort',
    province: 'ประจวบคีรีขันธ์',
    district: 'หัวหิน',
    price: 2900,
    capacity: 4,
    rating: 4.9,
    reviewCount: 512,
    petFriendly: true,
    petTypesAllowed: ['dog', 'cat', 'all_pets'],
    petWeightLimitKg: 40,
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 12.5684,
    longitude: 99.9577,
    popularAttractionNearby: 'ชายหาดหัวหิน',
    distanceToAttractionKm: 0.2,
    suitableScoreAvg: 98,
    description: 'ติดหาดทรายขาวหัวหิน สามารถพาสุนัขลงวิ่งเล่นหาดทรายได้ทั้งวัน ไม่จำกัดน้ำหนัก มีสระว่ายน้ำระบบเกลือสำหรับสุนัขโดยเฉพาะ',
    primaryImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      {
        roomType: 'Beach Access Pool Villa',
        bedType: 'Super King Bed + Daybed',
        sizeSqM: 80,
        maxGuests: 4,
        maxPets: 3,
        pricePerNight: 3500,
        petAmenities: ['สระน้ำสัตว์เลี้ยงลึก 40 ซม.', 'เสื้อชูชีพสุนัขครบทุกไซส์', 'สถานีล้างทรายและเป่าลมร้อน', 'ไอศกรีมสัตว์เลี้ยงฟรี'],
        roomAmenities: ['เดินลงหาดได้โดยตรง', 'Private Pool', 'Bathtub วิวทะเล', 'บริการบาร์บีคิวส่วนตัว'],
        images: [
          { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', title: 'พูลวิลล่าติดหาด', caption: 'ทางเดินเปิดโล่งสู่หาดทรายขาว', type: 'bedroom' },
          { url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80', title: 'มุมสัตว์เลี้ยงริมทะเล', caption: 'เตียงผ้าใบชายหาดสำหรับน้องหมา', type: 'pet_zone' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00006',
    hotelName: 'Khao Yai Whispering Pines Pet Resort',
    hotelType: 'Resort',
    province: 'นครราชสีมา',
    district: 'ปากช่อง',
    price: 2100,
    capacity: 4,
    rating: 4.8,
    reviewCount: 420,
    petFriendly: true,
    petTypesAllowed: ['dog', 'cat'],
    petWeightLimitKg: 30,
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 14.5320,
    longitude: 101.4010,
    popularAttractionNearby: 'อุทยานแห่งชาติเขาใหญ่',
    distanceToAttractionKm: 3.8,
    suitableScoreAvg: 95,
    description: 'โอเอซิสกลางหุบเขาและป่าสน ลาน Agility ฝึกทักษะสุนัข อากาศบริสุทธิ์ตลอดปี บรรยากาศเงียบสงบเหมาะแก่การพักผ่อนของทั้งครอบครัว',
    primaryImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      {
        roomType: 'Mountain View Log Cabin',
        bedType: '2 Queen Beds',
        sizeSqM: 52,
        maxGuests: 4,
        maxPets: 2,
        pricePerNight: 2100,
        petAmenities: ['ดาดฟ้าชมดาวพร้อมเต็นท์สัตว์เลี้ยง', 'แผ่นเจลเย็นปรับอุณหภูมิ', 'ลานวิ่ง Agility แบบมีเครื่องเล่น'],
        roomAmenities: ['ระเบียงไม้วิวทิวเขา', 'เตาผิงไฟฟ้า', 'เครื่องฟอกอากาศ', 'ลำโพงบลูทูธ'],
        images: [
          { url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80', title: 'บ้านพักกระท่อมไม้', caption: 'กลิ่นอายธรรมชาติ อากาศเย็นสบาย', type: 'bedroom' },
          { url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80', title: 'ลานวิ่งในป่าสน', caption: 'กว้างขวางกว่า 2 ไร่ ล้อมรั้วปลอดภัย 100%', type: 'outdoor' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00007',
    hotelName: 'Phuket Emerald Oceanfront Suites',
    hotelType: 'Resort',
    province: 'ภูเก็ต',
    district: 'กะทู้',
    price: 3200,
    capacity: 3,
    rating: 4.7,
    reviewCount: 710,
    petFriendly: true,
    petTypesAllowed: ['dog', 'cat'],
    petWeightLimitKg: 15,
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 7.8967,
    longitude: 98.2965,
    popularAttractionNearby: 'หาดป่าตอง',
    distanceToAttractionKm: 2.1,
    suitableScoreAvg: 91,
    description: 'รีสอร์ทวิวทะเลอันดามัน มีสระว่ายน้ำอินฟินิตี้พร้อมโซนสัตว์เลี้ยง แพ็คเกจสปาและกรูมมิ่งสำหรับสัตว์เลี้ยงระดับมืออาชีพ',
    primaryImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      {
        roomType: 'Ocean Vista Pet Suite',
        bedType: 'King Size Bed',
        sizeSqM: 58,
        maxGuests: 2,
        maxPets: 1,
        pricePerNight: 3200,
        petAmenities: ['เบาะนอนกันน้ำนำเข้า', 'บริการสปาอาบน้ำตัดแต่งขนในรีสอร์ท', 'แพ็คเกจขนมเพื่อสุขภาพ'],
        roomAmenities: ['วิวทะเลเต็มตา', 'ระเบียงจากุซซี่', 'มินิบาร์พรีเมียม', 'อาหารเช้าลอยน้ำ (Floating Breakfast)'],
        images: [
          { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', title: 'ห้องนอนวิวทะเล', caption: 'ชมพระอาทิตย์ตกจากเตียงนอน', type: 'bedroom' },
          { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', title: 'อ่างจากุซซี่ระเบียง', caption: 'ผ่อนคลายพร้อมชมวิวทะเลสีมรกต', type: 'bathroom' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00008',
    hotelName: 'Pattaya Bark & Beachfront Hotel',
    hotelType: 'Hotel',
    province: 'ชลบุรี',
    district: 'บางละมุง',
    price: 1950,
    capacity: 4,
    rating: 4.6,
    reviewCount: 540,
    petFriendly: true,
    petTypesAllowed: ['dog', 'cat', 'all_pets'],
    petWeightLimitKg: 20,
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 12.9236,
    longitude: 100.8824,
    popularAttractionNearby: 'หาดจอมเทียน',
    distanceToAttractionKm: 0.8,
    suitableScoreAvg: 92,
    description: 'โรงแรมทันสมัยใจกลางหาดจอมเทียน มีสระว่ายน้ำสำหรับสุนัขแยกต่างหาก พร้อมลานอาบแดดสัตว์เลี้ยงและบริการอาหารคลีนสำหรับสุนัขและแมว',
    primaryImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      {
        roomType: 'Junior Pet Suite Sea View',
        bedType: 'King Bed + Sofa Bed',
        sizeSqM: 44,
        maxGuests: 3,
        maxPets: 2,
        pricePerNight: 1950,
        petAmenities: ['เบาะนอนนุ่มขนาดใหญ่', 'น้ำพุแมวอัตโนมัติ', 'ชามอาหารอัจฉริยะ', 'ของเล่นยางกัดแทะ'],
        roomAmenities: ['สมาร์ททีวี', 'ระเบียงรับลมทะเล', 'ตู้เซฟดิจิทัล', 'Wi-Fi ฟรี'],
        images: [
          { url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80', title: 'ห้องพักวิวทะเลพัทยา', caption: 'โทนสีสบายตา เหมาะกับการพักผ่อน', type: 'bedroom' },
          { url: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=80', title: 'โซนนอนสัตว์เลี้ยง', caption: 'มีแผ่นกันลื่นรอบบริเวณ ปลอดภัย', type: 'pet_zone' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00009',
    hotelName: 'Ton Tann Boutique & Pet Space (ขอนแก่น)',
    hotelType: 'Boutique',
    province: 'ขอนแก่น',
    district: 'เมือง',
    price: 1450,
    capacity: 2,
    rating: 4.8,
    reviewCount: 310,
    petFriendly: true,
    petTypesAllowed: ['dog', 'cat', 'all_pets'],
    petWeightLimitKg: 15,
    wifi: true,
    parking: true,
    breakfast: true,
    pool: false,
    latitude: 16.4290,
    longitude: 102.8150,
    popularAttractionNearby: 'ตลาดต้นตาล ขอนแก่น',
    distanceToAttractionKm: 0.5,
    suitableScoreAvg: 95,
    description: 'บูทีคโฮเทลสุดชิคใกล้ตลาดต้นตาล ขอนแก่น ดีไซน์ศิลปะร่วมสมัย ตกแต่งด้วยมุมถ่ายรูปสัตว์เลี้ยง มีบริการ Pet Cafe & Bakery',
    primaryImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      {
        roomType: 'Artist Boutique Pet Room',
        bedType: '1 Queen Bed',
        sizeSqM: 35,
        maxGuests: 2,
        maxPets: 2,
        pricePerNight: 1450,
        petAmenities: ['เบาะนอนงานคราฟท์ผ้าฝ้ายอีสาน', 'ชามเซรามิกทำมือ', 'ชุดของเล่นต้อนรับ', 'น้ำพุกรองสะอาด'],
        roomAmenities: ['Wi-Fi 1Gbps', 'สมาร์ททีวี', 'เครื่องฟอกอากาศดักขนสัตว์', 'ระเบียงชมพระอาทิตย์ตก'],
        images: [
          { url: SAMPLE_ROOM_IMAGES.cozyStudio, title: 'ห้องพักบูทีคดีไซน์อบอุ่น', caption: 'โทนสีเอิร์ธโทน พื้นไม่ลื่น', type: 'bedroom' },
          { url: SAMPLE_ROOM_IMAGES.petCorner, title: 'มุมสัตว์เลี้ยงบูทีค', caption: 'เบาะผ้าฝ้ายทอมือนุ่มสบาย', type: 'pet_zone' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00010',
    hotelName: 'Phu Wiang Pool Villa & Dog Camp (ขอนแก่น)',
    hotelType: 'Villa',
    province: 'ขอนแก่น',
    district: 'อุบลรัตน์',
    price: 2800,
    capacity: 5,
    rating: 4.9,
    reviewCount: 220,
    petFriendly: true,
    petTypesAllowed: ['dog', 'cat', 'all_pets'],
    petWeightLimitKg: 45,
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 16.7800,
    longitude: 102.6200,
    popularAttractionNearby: 'อุทยานแห่งชาติภูเก้า-ภูพานคำ',
    distanceToAttractionKm: 4.1,
    suitableScoreAvg: 97,
    description: 'พูลวิลล่าส่วนตัวพร้อมสระว่ายน้ำระบบเกลือสำหรับสุนัขและผู้เข้าพัก ลานวิ่งหญ้าธรรมชาติขนาดใหญ่กว่า 1 ไร่ ล้อมรั้วมิดชิด ปลอดภัย 100%',
    primaryImage: SAMPLE_ROOM_IMAGES.poolVilla,
    rooms: [
      {
        roomType: 'Private Pool Villa 2-Bedroom',
        bedType: '2 King Beds + 1 Sofa Bed',
        sizeSqM: 95,
        maxGuests: 5,
        maxPets: 4,
        pricePerNight: 2800,
        petAmenities: ['สระว่ายน้ำส่วนตัวพร้อมบันไดทางลาดสุนัข', 'ชูชีพสัตว์เลี้ยงครบไซส์', 'พื้นที่สวนวิ่งเล่นส่วนตัวล้อมรั้วสูง 1.8 ม.', 'สถานีอาบน้ำและเป่าขน'],
        roomAmenities: ['สระว่ายน้ำส่วนตัว', 'เตาบาร์บีคิวกลางแจ้ง', 'ครัวพร้อมอุปกรณ์ทำอาหาร', 'เครื่องชงกาแฟ'],
        images: [
          { url: SAMPLE_ROOM_IMAGES.poolVilla, title: 'พูลวิลล่าส่วนตัว', caption: 'สระว่ายน้ำระบบเกลือ ปลอดภัยต่อผิวสัตว์เลี้ยง', type: 'bedroom' },
          { url: SAMPLE_ROOM_IMAGES.petPlayArea, title: 'สวนวิ่งเล่นขนาดใหญ่', caption: 'สนามหญ้ากว้าง ปล่อยวิ่งเล่นอิสระ', type: 'outdoor' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00011',
    hotelName: 'Ban Kaen Green Homestay & Farm',
    hotelType: 'Homestay',
    province: 'ขอนแก่น',
    district: 'เมือง',
    price: 850,
    capacity: 3,
    rating: 4.6,
    reviewCount: 165,
    petFriendly: true,
    petTypesAllowed: ['dog', 'cat', 'all_pets'],
    petWeightLimitKg: 30,
    wifi: true,
    parking: true,
    breakfast: true,
    pool: false,
    latitude: 16.4150,
    longitude: 102.8368,
    popularAttractionNearby: 'วัดหนองแวง พระอารามหลวง',
    distanceToAttractionKm: 1.8,
    suitableScoreAvg: 90,
    description: 'โฮมสเตย์เรือนไม้บรรยากาศสวนผลไม้ ร่มรื่น อบอุ่น เป็นกันเอง สัตว์เลี้ยงอยู่ร่วมกับธรรมชาติได้อย่างมีความสุข เจ้าของรักสัตว์เป็นอย่างดี',
    primaryImage: SAMPLE_ROOM_IMAGES.hotelExterior,
    rooms: [
      {
        roomType: 'Traditional Garden Homestay',
        bedType: '1 King Bed + 1 Single',
        sizeSqM: 32,
        maxGuests: 3,
        maxPets: 2,
        pricePerNight: 850,
        petAmenities: ['เบาะนอนธรรมชาติ', 'ชามข้าวและน้ำ', 'พื้นที่สวนรอบบ้าน'],
        roomAmenities: ['เครื่องปรับอากาศ', 'Wi-Fi ฟรี', 'อาหารเช้าพื้นบ้านขอนแก่น', 'ที่จอดรถในร่ม'],
        images: [
          { url: SAMPLE_ROOM_IMAGES.masterBedroom, title: 'ห้องพักโฮมสเตย์เรือนไม้', caption: 'บรรยากาศสบายๆ ใกล้ชิดธรรมชาติ', type: 'bedroom' },
          { url: SAMPLE_ROOM_IMAGES.dogBedZone, title: 'ระเบียงพักผ่อนสัตว์เลี้ยง', caption: 'รับลมเย็นสบายใต้ร่มไม้', type: 'pet_zone' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00012',
    hotelName: 'Pullman Khon Kaen Raja Orchid (ปลอดสัตว์เลี้ยง)',
    hotelType: 'Hotel',
    province: 'ขอนแก่น',
    district: 'เมือง',
    price: 2600,
    capacity: 2,
    rating: 4.8,
    reviewCount: 950,
    petFriendly: false,
    petTypesAllowed: [],
    nonPetReason: 'โรงแรมธุรกิจและศูนย์ประชุมระดับสากล ปลอดสารก่อภูมิแพ้ 100% ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก เพื่อความสะอาดและสุขอนามัยมาตรฐานสากล',
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 16.4328,
    longitude: 102.8340,
    popularAttractionNearby: 'บึงแก่นนคร',
    distanceToAttractionKm: 2.1,
    suitableScoreAvg: 88,
    description: 'โรงแรมหรูระดับ 5 ดาวใจกลางเมืองขอนแก่น พร้อมศูนย์ประชุมนานาชาติ สปาครบวงจร และห้องอาหาร 8 สัญชาติ (ไม่อนุญาตให้นำสัตว์เลี้ยงทุกชนิดเข้าพัก เพื่อสุขอนามัยและความเงียบสงบระดับธุรกิจ)',
    primaryImage: hotelLuxurySuite,
    rooms: [
      {
        roomType: 'Executive Business King Room (Non-Pet)',
        bedType: '1 King Bed Premium Slumberland',
        sizeSqM: 46,
        maxGuests: 2,
        maxPets: 0,
        pricePerNight: 2600,
        petAmenities: [],
        roomAmenities: ['พรมทอมือปลอดไรฝุ่น', 'เครื่องฟอกอากาศ HEPA ระดับการแพทย์', 'อ่างอาบน้ำหินอ่อน', 'โต๊ะทำงาน Executive', 'เข้าใช้ Executive Club Lounge ฟรี'],
        images: [
          { url: SAMPLE_ROOM_IMAGES.deluxeSuite, title: 'ห้อง Executive King', caption: 'ตกแต่งหรูหรา สะอาด ปลอดสารก่อภูมิแพ้ 100%', type: 'bedroom' },
          { url: SAMPLE_ROOM_IMAGES.modernBathroom, title: 'ห้องน้ำหินอ่อนพร้อมอ่างแช่ตัว', caption: 'สุขภัณฑ์ระบบอัตโนมัติและสิ่งอำนวยความสะดวกครบครัน', type: 'bathroom' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00013',
    hotelName: 'Kosa Hotel & Convention Center (ปลอดสัตว์เลี้ยง)',
    hotelType: 'Hotel',
    province: 'ขอนแก่น',
    district: 'เมือง',
    price: 1350,
    capacity: 3,
    rating: 4.4,
    reviewCount: 680,
    petFriendly: false,
    petTypesAllowed: [],
    nonPetReason: 'นโยบายการจัดงานประชุมและสัมมนาระดับจังหวัด ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพักในทุกกรณี',
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 16.4350,
    longitude: 102.8315,
    popularAttractionNearby: 'ตลาดต้นตาล ขอนแก่น',
    distanceToAttractionKm: 1.8,
    suitableScoreAvg: 85,
    description: 'โรงแรมชื่อดังคู่เมืองขอนแก่น ทำเลทองใกล้แหล่งช้อปปิ้งและศูนย์ราชการ ห้องพักกว้างขวาง สระว่ายน้ำกลางแจ้ง (นโยบายไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก)',
    primaryImage: hotelKkuExterior,
    rooms: [
      {
        roomType: 'Grand Superior Twin (Non-Pet)',
        bedType: '2 Single Beds',
        sizeSqM: 36,
        maxGuests: 2,
        maxPets: 0,
        pricePerNight: 1350,
        petAmenities: [],
        roomAmenities: ['Wi-Fi ฟรีความเร็วสูง', 'เครื่องปรับอากาศ', 'ตู้เย็น & มินิบาร์', 'ฝักบัวน้ำอุ่น', 'โต๊ะทำงาน'],
        images: [
          { url: SAMPLE_ROOM_IMAGES.masterBedroom, title: 'ห้องพัก Superior เตียงคู่', caption: 'โปร่งสบาย ปลอดกลิ่นและสารก่อภูมิแพ้', type: 'bedroom' },
          { url: SAMPLE_ROOM_IMAGES.modernBathroom, title: 'ห้องน้ำแยกโซนเปียก-แห้ง', caption: 'สะอาดตามมาตรฐานสากล', type: 'bathroom' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00014',
    hotelName: 'The Landmark Bangkok Executive Suites (ปลอดสัตว์เลี้ยง)',
    hotelType: 'Hotel',
    province: 'กรุงเทพมหานคร',
    district: 'คลองเตย',
    price: 3600,
    capacity: 2,
    rating: 4.7,
    reviewCount: 1420,
    petFriendly: false,
    petTypesAllowed: [],
    nonPetReason: 'โรงแรมธุรกิจ 5 ดาวระดับตำนาน ไม่อนุญาตให้นำสัตว์เลี้ยงทุกชนิดเข้าพักเพื่อสงวนความเงียบสงบสำหรับนักเดินทางเพื่อธุรกิจ',
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 13.7408,
    longitude: 100.5532,
    popularAttractionNearby: 'สวนเบญจกิติ (Dog Park)',
    distanceToAttractionKm: 2.0,
    suitableScoreAvg: 89,
    description: 'โรงแรมหรูระดับตำนานย่านสุขุมวิท สิ่งอำนวยความสะดวกครบครัน สระว่ายน้ำวิวเมือง ห้องอาหารมิชลินไกด์ (ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก)',
    primaryImage: hotelLuxurySuite,
    rooms: [
      {
        roomType: 'Club Executive Skyline King (Non-Pet)',
        bedType: '1 King Bed',
        sizeSqM: 50,
        maxGuests: 2,
        maxPets: 0,
        pricePerNight: 3600,
        petAmenities: [],
        roomAmenities: ['วิวขอบฟ้าสุขุมวิท', 'อ่างน้ำจากุซซี่', 'เครื่องชงกาแฟ Illy', 'สิทธิเข้าคลับเลานจ์ชั้น 31'],
        images: [
          { url: SAMPLE_ROOM_IMAGES.deluxeSuite, title: 'ห้องพักวิวสกายไลน์', caption: 'เงียบสงบ เหมาะสำหรับนักธุรกิจและผู้ต้องการการพักผ่อนแท้จริง', type: 'bedroom' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00015',
    hotelName: 'Chiang Mai Heritage Lanna Grand Sanctuary (ปลอดสัตว์เลี้ยง)',
    hotelType: 'Resort',
    province: 'เชียงใหม่',
    district: 'เมืองเชียงใหม่',
    price: 2900,
    capacity: 2,
    rating: 4.9,
    reviewCount: 780,
    petFriendly: false,
    petTypesAllowed: [],
    nonPetReason: 'เรือนไม้สักโบราณอายุกว่า 80 ปีและพรมทอมือล้านนา ปลอดสารก่อภูมิแพ้ ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพักเพื่อการอนุรักษ์มรดกทางวัฒนธรรม',
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 18.7880,
    longitude: 98.9850,
    popularAttractionNearby: 'ดอยสุเทพ',
    distanceToAttractionKm: 5.2,
    suitableScoreAvg: 90,
    description: 'รีสอร์ทอนุรักษ์สถาปัตยกรรมล้านนาโบราณ ร่มรื่นด้วยต้นไม้ใหญ่นับร้อยปี สระว่ายน้ำหินธรรมชาติ (นโยบายไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพักเพื่อรักษาความเงียบสงบและตัวเรือนไม้สัก)',
    primaryImage: hotelResortPool,
    rooms: [
      {
        roomType: 'Royal Lanna Teak Suite (Non-Pet)',
        bedType: '1 King Bed ไม้สักแกะสลัก',
        sizeSqM: 60,
        maxGuests: 2,
        maxPets: 0,
        pricePerNight: 2900,
        petAmenities: [],
        roomAmenities: ['เครื่องปรับอากาศไร้เสียง', 'อ่างแช่น้ำสมุนไพร', 'ระเบียงชมสวนบัว', 'ชาสมุนไพรโครงการหลวง'],
        images: [
          { url: SAMPLE_ROOM_IMAGES.deluxeSuite, title: 'ห้องพักเรือนไม้สักหลวง', caption: 'สง่างาม ประณีต ปลอดสารก่อภูมิแพ้', type: 'bedroom' }
        ]
      }
    ]
  },
  {
    hotelId: 'H00016',
    hotelName: 'Centara Grand Beach Resort Hua Hin - Colonial Wing (ปลอดสัตว์เลี้ยง)',
    hotelType: 'Resort',
    province: 'ประจวบคีรีขันธ์',
    district: 'หัวหิน',
    price: 4200,
    capacity: 2,
    rating: 4.9,
    reviewCount: 1650,
    petFriendly: false,
    petTypesAllowed: [],
    nonPetReason: 'อาคารอนุรักษ์สไตล์โคโลเนียลคลาสสิกริมหาดหัวหิน ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก เพื่อรักษาความสงบและคุณค่าทางประวัติศาสตร์',
    wifi: true,
    parking: true,
    breakfast: true,
    pool: true,
    latitude: 12.5700,
    longitude: 99.9600,
    popularAttractionNearby: 'ชายหาดหัวหิน',
    distanceToAttractionKm: 0.1,
    suitableScoreAvg: 92,
    description: 'รีสอร์ทคลาสสิกริมหาดหัวหิน สถาปัตยกรรมยุควิกตอเรียน สวนเขาวงกตดัดไม้ชื่อดัง สระว่ายน้ำ 4 สระ (ปีกโคโลเนียลสงวนสิทธิ์สำหรับผู้เข้าพักทั่วไป ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก)',
    primaryImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      {
        roomType: 'Colonial Heritage Ocean Room (Non-Pet)',
        bedType: '1 King Bed เพดานสูง',
        sizeSqM: 58,
        maxGuests: 2,
        maxPets: 0,
        pricePerNight: 4200,
        petAmenities: [],
        roomAmenities: ['เพดานสูงโปร่งสไตล์โคโลเนียล', 'ระเบียงรับลมทะเลส่วนตัว', 'อ่างอาบน้ำขาตั้งวินเทจ', 'บริการชาบ่าย High Tea'],
        images: [
          { url: SAMPLE_ROOM_IMAGES.masterBedroom, title: 'ห้องพักสไตล์โคโลเนียล', caption: 'บรรยากาศหรูหราคลาสสิก สะอาด ไร้ขนและกลิ่นสัตว์เลี้ยง', type: 'bedroom' }
        ]
      }
    ]
  }
];

// Helper to generate dynamic fallback hotels for any of the 77 provinces
export function getHotelsForProvince(provinceName: string): Hotel[] {
  const custom = SEED_HOTELS.filter(h => h.province === provinceName);
  if (custom.length > 0) {
    return custom;
  }

  // Generate realistic hotels for the selected province
  const provinceObj = ALL_77_PROVINCES.find(p => p.name === provinceName);
  const baseLat = provinceObj?.latitude ?? 15.0;
  const baseLon = provinceObj?.longitude ?? 101.0;

  const baseAttraction = provinceName === 'น่าน' ? 'วัดภูมินทร์ (ปู่ม่านย่าม่าน)'
    : provinceName === 'อุดรธานี' ? 'ทะเลบัวแดง หนองหาน'
    : provinceName === 'สุราษฎร์ธานี' ? 'เขาสก & ทะเลสาบเชี่ยวหลาน'
    : provinceName === 'กาญจนบุรี' ? 'สะพานข้ามแม่น้ำแคว'
    : provinceName === 'พระนครศรีอยุธยา' ? 'วัดมหาธาตุ อุทยานประวัติศาสตร์'
    : `สถานที่ท่องเที่ยวสำคัญ ประจำจังหวัด${provinceName}`;

  return [
    {
      hotelId: `GEN_${provinceName}_01`,
      hotelName: `${provinceName} Paw & Nature Resort`,
      hotelType: 'Resort',
      province: provinceName,
      district: 'เมือง',
      price: 1350,
      capacity: 3,
      rating: 4.6,
      reviewCount: 185,
      petFriendly: true,
      petTypesAllowed: ['dog', 'cat'],
      petWeightLimitKg: 20,
      wifi: true,
      parking: true,
      breakfast: true,
      pool: true,
      latitude: Number((baseLat - 0.012).toFixed(4)),
      longitude: Number((baseLon - 0.015).toFixed(4)),
      popularAttractionNearby: baseAttraction,
      distanceToAttractionKm: 3.2,
      suitableScoreAvg: 93,
      description: `รีสอร์ทชั้นนำในจังหวัด${provinceName} บรรยากาศธรรมชาติ เงียบสงบ สิ่งอำนวยความสะดวกครบครัน พร้อมบริการพิเศษสำหรับผู้เข้าพักที่มีสัตว์เลี้ยง`,
      primaryImage: SAMPLE_ROOM_IMAGES.hotelExterior,
      rooms: [
        {
          roomType: 'Deluxe Garden Room (Pet Friendly)',
          bedType: '1 King Bed',
          sizeSqM: 38,
          maxGuests: 2,
          maxPets: 2,
          pricePerNight: 1350,
          petAmenities: ['เบาะนอนเกรดพรีเมียม', 'ชามสแตนเลสใส่อาหารและน้ำ', 'ถุงเก็บมูลและแผ่นรองซับ', 'สวนวิ่งเล่น'],
          roomAmenities: ['Wi-Fi 500Mbps', 'แอร์เย็นฉ่ำ', 'ตู้เย็น', 'ฝักบัวน้ำอุ่น', 'สมาร์ททีวี'],
          images: [
            { url: SAMPLE_ROOM_IMAGES.masterBedroom, title: 'ห้องพักตกแต่งทันสมัย', caption: 'พื้นกระเบื้องเรียบกันลื่น ปลอดภัยสำหรับสัตว์เลี้ยง', type: 'bedroom' },
            { url: SAMPLE_ROOM_IMAGES.dogBedZone, title: 'จุดนอนสัตว์เลี้ยงในห้อง', caption: 'มีเบาะรองนอนพร้อมชามน้ำสะอาด', type: 'pet_zone' },
            { url: SAMPLE_ROOM_IMAGES.modernBathroom, title: 'ห้องน้ำกว้างขวาง', caption: 'แยกส่วนเปียก-แห้งชัดเจน', type: 'bathroom' }
          ]
        },
        {
          roomType: 'Family Pet Villa',
          bedType: '2 Queen Beds',
          sizeSqM: 56,
          maxGuests: 4,
          maxPets: 3,
          pricePerNight: 1980,
          petAmenities: ['คอนโดแมว', 'เบาะนอนสุนัข 2 ชุด', 'ของเล่นต้อนรับ', 'น้ำพุแมว'],
          roomAmenities: ['ห้องนั่งเล่นแยกเป็นสัดส่วน', 'ระเบียงกว้าง', 'อ่างอาบน้ำ', 'มินิบาร์'],
          images: [
            { url: SAMPLE_ROOM_IMAGES.deluxeSuite, title: 'ห้องนอนสำหรับครอบครัว', caption: 'เตียงคู่ขนาดใหญ่ นุ่มสบาย', type: 'bedroom' },
            { url: SAMPLE_ROOM_IMAGES.petPlayArea, title: 'ลานวิ่งเล่นกลางแจ้ง', caption: 'สนามหญ้าร่มรื่น ล้อมรั้วปลอดภัย', type: 'outdoor' }
          ]
        }
      ]
    },
    {
      hotelId: `GEN_${provinceName}_02`,
      hotelName: `${provinceName} City Grand Hotel`,
      hotelType: 'Hotel',
      province: provinceName,
      district: 'เมือง',
      price: 1100,
      capacity: 2,
      rating: 4.4,
      reviewCount: 230,
      petFriendly: true,
      petTypesAllowed: ['dog', 'cat'],
      petWeightLimitKg: 10,
      wifi: true,
      parking: true,
      breakfast: false,
      pool: false,
      latitude: Number((baseLat + 0.008).toFixed(4)),
      longitude: Number((baseLon + 0.006).toFixed(4)),
      popularAttractionNearby: baseAttraction,
      distanceToAttractionKm: 1.5,
      suitableScoreAvg: 88,
      description: `โรงแรมสไตล์โมเดิร์นใจกลางเมือง${provinceName} เดินทางสะดวก ใกล้แหล่งของกินและตลาด ต้อนรับสัตว์เลี้ยงขนาดเล็ก`,
      primaryImage: SAMPLE_ROOM_IMAGES.cozyStudio,
      rooms: [
        {
          roomType: 'Standard Pet Cozy',
          bedType: '1 Queen Bed',
          sizeSqM: 28,
          maxGuests: 2,
          maxPets: 1,
          pricePerNight: 1100,
          petAmenities: ['เบาะนอนขนาดเล็ก', 'ชามอาหารสัตว์เลี้ยง', 'แผ่นรองฉี่'],
          roomAmenities: ['Wi-Fi ฟรี', 'แอร์', 'ทีวีเคเบิล', 'โต๊ะทำงาน'],
          images: [
            { url: SAMPLE_ROOM_IMAGES.cozyStudio, title: 'ห้องพักขนาดกะทัดรัด', caption: 'สะอาด ปลอดโปร่ง', type: 'bedroom' },
            { url: SAMPLE_ROOM_IMAGES.petCorner, title: 'มุมสัตว์เลี้ยง', caption: 'จัดเป็นสัดส่วนน่ารัก', type: 'pet_zone' }
          ]
        }
      ]
    },
    {
      hotelId: `GEN_${provinceName}_03_NONPET`,
      hotelName: `${provinceName} Grand Heritage & Convention Hotel (ปลอดสัตว์เลี้ยง)`,
      hotelType: 'Hotel',
      province: provinceName,
      district: 'เมือง',
      price: 2150,
      capacity: 2,
      rating: 4.7,
      reviewCount: 420,
      petFriendly: false,
      petTypesAllowed: [],
      nonPetReason: `โรงแรมธุรกิจและศูนย์ประชุมประจำจังหวัด${provinceName} ปลอดสารก่อภูมิแพ้ 100% ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพักเพื่อสุขอนามัย`,
      wifi: true,
      parking: true,
      breakfast: true,
      pool: true,
      latitude: Number((baseLat + 0.016).toFixed(4)),
      longitude: Number((baseLon - 0.011).toFixed(4)),
      popularAttractionNearby: baseAttraction,
      distanceToAttractionKm: 1.8,
      suitableScoreAvg: 90,
      description: `โรงแรมหรูระดับมาตรฐานธุรกิจใจกลางจังหวัด${provinceName} บริการห้องประชุมสัมมนาและห้องพักมาตรฐานสูง (ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก เพื่อความสะอาดและปลอดสารก่อภูมิแพ้)`,
      primaryImage: SAMPLE_ROOM_IMAGES.masterBedroom,
      rooms: [
        {
          roomType: 'Executive Business Suite (Non-Pet)',
          bedType: '1 King Bed',
          sizeSqM: 48,
          maxGuests: 2,
          maxPets: 0,
          pricePerNight: 2150,
          petAmenities: [],
          roomAmenities: ['เครื่องปรับอากาศระบบฟอกอากาศ HEPA', 'อ่างอาบน้ำส่วนตัว', 'Wi-Fi 1Gbps', 'สมาร์ททีวี 55 นิ้ว', 'โต๊ะทำงาน'],
          images: [
            { url: SAMPLE_ROOM_IMAGES.masterBedroom, title: 'ห้องพัก Executive หรูหรา', caption: 'สะอาดระดับมาตรฐานสากล ไร้สารก่อภูมิแพ้', type: 'bedroom' },
            { url: SAMPLE_ROOM_IMAGES.modernBathroom, title: 'ห้องน้ำแยกส่วนเปียกแห้ง', caption: 'อุปกรณ์อาบน้ำเกรดพรีเมียม', type: 'bathroom' }
          ]
        }
      ]
    },
    {
      hotelId: `GEN_${provinceName}_04`,
      hotelName: `${provinceName} Luxury Pet Pool Villa`,
      hotelType: 'Villa',
      province: provinceName,
      district: 'เมือง',
      price: 2600,
      capacity: 4,
      rating: 4.9,
      reviewCount: 140,
      petFriendly: true,
      petTypesAllowed: ['dog', 'cat', 'all_pets'],
      petWeightLimitKg: 40,
      wifi: true,
      parking: true,
      breakfast: true,
      pool: true,
      latitude: Number((baseLat - 0.024).toFixed(4)),
      longitude: Number((baseLon + 0.019).toFixed(4)),
      popularAttractionNearby: baseAttraction,
      distanceToAttractionKm: 2.8,
      suitableScoreAvg: 96,
      description: `พูลวิลล่าส่วนตัวระดับพรีเมียมในจังหวัด${provinceName} มีสระว่ายน้ำส่วนตัวและสวนหญ้าธรรมชาติสำหรับสัตว์เลี้ยง`,
      primaryImage: SAMPLE_ROOM_IMAGES.poolVilla,
      rooms: [
        {
          roomType: 'Private Pool Villa',
          bedType: '1 Super King Bed',
          sizeSqM: 75,
          maxGuests: 4,
          maxPets: 3,
          pricePerNight: 2600,
          petAmenities: ['สระว่ายน้ำสัตว์เลี้ยงระบบเกลือ', 'เบาะนอนกันน้ำ', 'ลานวิ่งหญ้าปิดล้อม', 'ชูชีพสุนัข'],
          roomAmenities: ['สระว่ายน้ำส่วนตัว', 'ครัวเล็ก', 'มินิบาร์ฟรี', 'Smart TV 65 นิ้ว'],
          images: [
            { url: SAMPLE_ROOM_IMAGES.poolVilla, title: 'วิลล่าพร้อมสระว่ายน้ำส่วนตัว', caption: 'ลงว่ายน้ำร่วมกับสัตว์เลี้ยงได้อย่างอิสระ', type: 'bedroom' },
            { url: SAMPLE_ROOM_IMAGES.petPlayArea, title: 'สนามหญ้าส่วนตัว', caption: 'พื้นที่ปิด ปลอดภัย วิ่งเล่นได้เต็มที่', type: 'outdoor' }
          ]
        }
      ]
    },
    {
      hotelId: `GEN_${provinceName}_05_NONPET`,
      hotelName: `${provinceName} Royal Wellness Retreat & Medical Spa (ปลอดสัตว์เลี้ยง)`,
      hotelType: 'Boutique',
      province: provinceName,
      district: 'เมือง',
      price: 1850,
      capacity: 2,
      rating: 4.8,
      reviewCount: 160,
      petFriendly: false,
      petTypesAllowed: [],
      nonPetReason: `ศูนย์ฟื้นฟูสุขภาพและสปาเพื่อการผ่อนคลาย ปลอดเชื้อโรค สัตว์เลี้ยงทุกชนิดไม่สามารถเข้าพักได้ เพื่อสุขอนามัยทางการแพทย์`,
      wifi: true,
      parking: true,
      breakfast: true,
      pool: true,
      latitude: Number((baseLat + 0.022).toFixed(4)),
      longitude: Number((baseLon + 0.024).toFixed(4)),
      popularAttractionNearby: baseAttraction,
      distanceToAttractionKm: 3.0,
      suitableScoreAvg: 87,
      description: `รีทรีตเพื่อสุขภาพและการบำบัดด้วยธรรมชาติในจังหวัด${provinceName} เงียบสงบ ออกแบบเพื่อการฟื้นฟูร่างกายอย่างแท้จริง (ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพักตามมาตรฐานสุขอนามัยทางการแพทย์)`,
      primaryImage: SAMPLE_ROOM_IMAGES.deluxeSuite,
      rooms: [
        {
          roomType: 'Wellness Sanctuary Room (Non-Pet)',
          bedType: '1 King Bed Orthopedic',
          sizeSqM: 44,
          maxGuests: 2,
          maxPets: 0,
          pricePerNight: 1850,
          petAmenities: [],
          roomAmenities: ['เตียงนอนเพื่อสุขภาพลดอาการปวดหลัง', 'กลิ่นอโรมาเธอราพีธรรมชาติ', 'เครื่องฟอกอากาศประจุลบ', 'โปรแกรมอาหารสุขภาพคลีน'],
          images: [
            { url: SAMPLE_ROOM_IMAGES.deluxeSuite, title: 'ห้องพักเพื่อสุขภาพ', caption: 'บรรยากาศสงบ ผ่อนคลาย สะอาดบริสุทธิ์ 100%', type: 'bedroom' },
            { url: SAMPLE_ROOM_IMAGES.modernBathroom, title: 'ห้องอาบน้ำพร้อมฝักบัววารีบำบัด', caption: 'ผ่อนคลายกล้ามเนื้อ', type: 'bathroom' }
          ]
        }
      ]
    }
  ];
}

// Data Mining Model Evaluation comparison (CRISP-DM Step 4 & 5 from PDF)
export const MODEL_EVALUATIONS: ModelMetric[] = [
  {
    name: 'Random Forest',
    accuracy: 94.2,
    precision: 93.8,
    recall: 95.1,
    f1Score: 94.4,
    description: 'ใช้ Decision Tree หลายต้นร่วมตัดสินใจ เหมาะที่สุดสำหรับพฤติกรรมจับคู่ที่พักและสัตว์เลี้ยง รองรับความสัมพันธ์แบบ Non-linear ได้ดีเยี่ยม',
    recommended: true
  },
  {
    name: 'Decision Tree',
    accuracy: 88.5,
    precision: 87.2,
    recall: 89.0,
    f1Score: 88.1,
    description: 'ตัดสินใจเป็นลำดับขั้น คล้ายการตั้งคำถาม (เช่น มีสัตว์เลี้ยงไหม? -> งบประมาณถึงไหม? -> ระยะทาง?) อธิบายผลลัพธ์ (Explainability) ให้ผู้บริหารเข้าใจง่าย',
    recommended: false
  },
  {
    name: 'KNN (K-Nearest Neighbors)',
    accuracy: 84.6,
    precision: 83.1,
    recall: 85.4,
    f1Score: 84.2,
    description: 'จับกลุ่มข้อมูลที่มีคุณลักษณะและพิกัดใกล้เคียงกัน แล้วทำนายตามกลุ่มเพื่อนบ้าน ทำงานช้าลงเมื่อขนาดข้อมูลการค้นหาเพิ่มขึ้น',
    recommended: false
  },
  {
    name: 'Naive Bayes',
    accuracy: 81.3,
    precision: 80.5,
    recall: 82.0,
    f1Score: 81.2,
    description: 'คำนวณความน่าจะเป็นแบบมีเงื่อนไขจากปัจจัยต่างๆ รวดเร็วมาก แต่ตั้งสมมติฐานว่าตัวแปรอิสระจากกันซึ่งในความเป็นจริงงบประมาณและประเภทห้องพักสัมพันธ์กัน',
    recommended: false
  }
];

// Feature Importances from the Random Forest Model
export const FEATURE_IMPORTANCE = [
  { feature: 'Pet_Friendly Match (เงื่อนไขสัตว์เลี้ยง)', importance: 28.5, description: 'หากลูกค้ามีสัตว์เลี้ยง แต่โรงแรมไม่รับ ค่า Suitable จะเป็น 0 ทันที' },
  { feature: 'Budget_Diff (ส่วนต่างงบประมาณ)', importance: 24.2, description: 'ราคาห้องพักต้องไม่เกินงบประมาณที่ลูกค้าระบุเกิน 15%' },
  { feature: 'Facility_Match (%) (ความพร้อมสิ่งอำนวยความสะดวก)', importance: 18.7, description: 'Wi-Fi, ที่จอดรถ, อาหารเช้า, สระว่ายน้ำ, พื้นที่สัตว์เลี้ยง' },
  { feature: 'Distance_KM (ระยะทางไปที่เที่ยว)', importance: 15.1, description: 'ความใกล้ชิดสถานที่ท่องเที่ยวที่ระบุ' },
  { feature: 'Rating & Capacity (รีวิวและความจุ)', importance: 13.5, description: 'คะแนนรีวิวที่พักและความจุห้องพักรองรับจำนวนผู้เข้าพักได้' },
];

// Seed recent search history / customer profiles for Data Dictionary demonstration
export const RECENT_CUSTOMER_SEARCHES: CustomerProfile[] = [
  { customerId: 'C00001', budget: 1500, guests: 2, pet: true, petCount: 1, preferredHotelType: 'Hotel', province: 'ขอนแก่น', wifiNeed: true, parkingNeed: true, breakfastNeed: false, poolNeed: true, matchedHotelId: 'H00001', searchDate: '2026-09-10 18:24' },
  { customerId: 'C00002', budget: 2200, guests: 4, pet: true, petCount: 2, preferredHotelType: 'Resort', province: 'เชียงใหม่', wifiNeed: true, parkingNeed: true, breakfastNeed: true, poolNeed: true, matchedHotelId: 'H00003', searchDate: '2026-09-10 17:50' },
  { customerId: 'C00003', budget: 2800, guests: 2, pet: true, petCount: 1, preferredHotelType: 'Hotel', province: 'กรุงเทพมหานคร', wifiNeed: true, parkingNeed: true, breakfastNeed: true, poolNeed: false, matchedHotelId: 'H00004', searchDate: '2026-09-10 16:15' },
  { customerId: 'C00004', budget: 3500, guests: 4, pet: true, petCount: 2, preferredHotelType: 'Resort', province: 'ประจวบคีรีขันธ์', wifiNeed: true, parkingNeed: true, breakfastNeed: true, poolNeed: true, matchedHotelId: 'H00005', searchDate: '2026-09-10 15:40' },
  { customerId: 'C00005', budget: 1800, guests: 3, pet: false, petCount: 0, preferredHotelType: 'Hotel', province: 'ขอนแก่น', wifiNeed: true, parkingNeed: true, breakfastNeed: true, poolNeed: false, matchedHotelId: 'H00002', searchDate: '2026-09-10 14:10' },
  { customerId: 'C00006', budget: 2500, guests: 4, pet: true, petCount: 1, preferredHotelType: 'Resort', province: 'นครราชสีมา', wifiNeed: true, parkingNeed: true, breakfastNeed: true, poolNeed: true, matchedHotelId: 'H00006', searchDate: '2026-09-10 13:05' },
  { customerId: 'C00007', budget: 3000, guests: 2, pet: true, petCount: 1, preferredHotelType: 'Resort', province: 'ภูเก็ต', wifiNeed: true, parkingNeed: true, breakfastNeed: true, poolNeed: true, matchedHotelId: 'H00007', searchDate: '2026-09-10 11:22' },
  { customerId: 'C00008', budget: 2000, guests: 2, pet: true, petCount: 2, preferredHotelType: 'Hotel', province: 'ชลบุรี', wifiNeed: true, parkingNeed: true, breakfastNeed: false, poolNeed: true, matchedHotelId: 'H00008', searchDate: '2026-09-10 09:45' }
];

// Monthly executive trend data (Occupancy & Pet traveler share)
export const MONTHLY_TREND_DATA = [
  { month: 'ม.ค.', petTravelers: 4200, normalTravelers: 7800, matchRate: 91, avgBudget: 2100 },
  { month: 'ก.พ.', petTravelers: 4600, normalTravelers: 7600, matchRate: 92, avgBudget: 2250 },
  { month: 'มี.ค.', petTravelers: 5100, normalTravelers: 8200, matchRate: 93, avgBudget: 2300 },
  { month: 'เม.ย.', petTravelers: 6800, normalTravelers: 10400, matchRate: 95, avgBudget: 2600 },
  { month: 'พ.ค.', petTravelers: 5400, normalTravelers: 7900, matchRate: 92, avgBudget: 2200 },
  { month: 'มิ.ย.', petTravelers: 5200, normalTravelers: 7500, matchRate: 93, avgBudget: 2150 },
  { month: 'ก.ค.', petTravelers: 5900, normalTravelers: 8100, matchRate: 94, avgBudget: 2350 },
  { month: 'ส.ค.', petTravelers: 6100, normalTravelers: 8300, matchRate: 94, avgBudget: 2400 },
  { month: 'ก.ย.', petTravelers: 6450, normalTravelers: 8600, matchRate: 94, avgBudget: 2450 },
];

// Sample Hotel Reviews (รีวิวโรงแรม/ที่พักโดยผู้เข้าพักจริง)
export const SAMPLE_HOTEL_REVIEWS: HotelReview[] = [
  {
    id: 'HR001',
    hotelId: 'H00001',
    hotelName: 'KKU Hotel & Pet Paradise (โรงแรม มข.)',
    province: 'ขอนแก่น',
    author: 'คุณพัชราภา สุวรรณโคตร',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '10 กันยายน 2026',
    petBrought: true,
    petType: 'สุนัขพันธุ์โกลเด้น รีทรีฟเวอร์ (22 กก.)',
    title: 'ประทับใจมาก สนามหญ้ากว้าง น้องหมาแฮปปี้สุดๆ',
    comment: 'พาน้องหมาตัวโตมาพักที่ขอนแก่น ประทับใจมากค่ะ โรงแรมมีเบาะนอนขนาดใหญ่ ชามน้ำ และทางเชื่อมต่อไปสนามหญ้ากว้างขวาง ปลอดภัย เจ้าหน้าที่น่ารักและเข้าใจคนรักสัตว์มาก อาหารเช้าก็อร่อยคุ้มค่า',
    roomType: 'Deluxe Pet Garden Room',
    tags: ['สนามหญ้ากว้าง', 'บริการดีเยี่ยม', 'สะอาดไร้กลิ่น', 'ใกล้ มข.'],
    helpfulCount: 38
  },
  {
    id: 'HR002',
    hotelId: 'H00012',
    hotelName: 'Pullman Khon Kaen Raja Orchid (ปลอดสัตว์เลี้ยง)',
    province: 'ขอนแก่น',
    author: 'ดร.ธนกร เกียรติบูรพา',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '8 กันยายน 2026',
    petBrought: false,
    title: 'ห้องพักสะอาดมาตรฐาน 5 ดาว ปลอดสารก่อภูมิแพ้ 100%',
    comment: 'ผมมีปัญหาภูมิแพ้ขนสัตว์และฝุ่นอย่างรุนแรง พักที่พูลแมนขอนแก่นสบายใจมาก โรงแรมมีนโยบายปลอดสัตว์เลี้ยงชัดเจน เครื่องฟอกอากาศระดับการแพทย์ เตียงนอนสบายมาก ศูนย์ประชุมทันสมัย เงียบสงบ เหมาะกับการทำงานและพักผ่อนเพื่อธุรกิจ',
    roomType: 'Executive Business King Room (Non-Pet)',
    tags: ['ปลอดสารก่อภูมิแพ้', 'เงียบสงบ', 'มาตรฐาน 5 ดาว', 'เหมาะกับธุรกิจ'],
    helpfulCount: 29
  },
  {
    id: 'HR003',
    hotelId: 'H00003',
    hotelName: 'Nimman Paw Haven Boutique',
    province: 'เชียงใหม่',
    author: 'คุณกานต์พิชชา วรนันท์',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '5 กันยายน 2026',
    petBrought: true,
    petType: 'แมวบริติช ช็อตแฮร์ 2 ตัว',
    title: 'ตกแต่งสไตล์มินิมอล มีคอนโดแมวให้พร้อม สะอาดมาก',
    comment: 'พาน้องแมว 2 ตัวมาเที่ยวเชียงใหม่พักที่นี่ 3 คืน ชอบมาก ห้องพักสไตล์ญี่ปุ่นเตียงเตี้ย ปลอดภัยสำหรับแมว มีคอนโดแมวและของเล่นพร้อม เครื่องฟอกอากาศดักขนทำงานเงียบสนิท อยู่ใจกลางนิมมานเดินไปคาเฟ่สะดวกมาก',
    roomType: 'Tatami Zen Pet Suite',
    tags: ['คอนโดแมว', 'มินิมอลญี่ปุ่น', 'ทำเลนิมมาน', 'สะอาด'],
    helpfulCount: 42
  },
  {
    id: 'HR004',
    hotelId: 'H00005',
    hotelName: 'Hua Hin Beachfront Pet Haven',
    province: 'ประจวบคีรีขันธ์',
    author: 'คุณวรเมธ ศิริโรจน์',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2 กันยายน 2026',
    petBrought: true,
    petType: 'สุนัขพันธุ์ไซบีเรียน ฮัสกี้',
    title: 'พูลวิลล่าติดหาด พาน้องลงวิ่งหาดทรายได้ทั้งวัน!',
    comment: 'ที่นี่ให้สัตว์เลี้ยงได้เต็มที่จริงๆ ครับ มีสระน้ำสำหรับสุนัขโดยเฉพาะ ชูชีพครบไซส์ และสถานีล้างทรายเป่าลมร้อน สะดวกมาก วิลล่ากว้างขวาง บรรยากาศพระอาทิตย์ขึ้นสวยงาม แนะนำสำหรับคนรักสุนัขเลยครับ',
    roomType: 'Beach Access Pool Villa',
    tags: ['ติดทะเล', 'สระว่ายน้ำสุนัข', 'มีสถานีล้างทราย', 'วิวสวย'],
    helpfulCount: 51
  },
  {
    id: 'HR005',
    hotelId: 'H00013',
    hotelName: 'Kosa Hotel & Convention Center (ปลอดสัตว์เลี้ยง)',
    province: 'ขอนแก่น',
    author: 'คุณสมศักดิ์ ธรรมรัตน์',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    rating: 4.5,
    date: '28 สิงหาคม 2026',
    petBrought: false,
    title: 'ทำเลดีใจกลางเมืองขอนแก่น สงบ สะอาด คุ้มราคา',
    comment: 'มาจัดประชุมสัมมนาที่ขอนแก่น 2 วัน พักที่โรงแรมโฆษะ ห้องพักสะอาด พนักงานบริการเป็นมืออาชีพ อาหารเช้ามีหลากหลายมาก ไม่มีสัตว์เลี้ยงรบกวน นอนหลับสบายตลอดคืน ที่จอดรถสะดวกสบาย',
    roomType: 'Grand Superior Twin (Non-Pet)',
    tags: ['คุ้มค่า', 'ใจกลางเมือง', 'อาหารเช้าดี', 'ห้องกว้าง'],
    helpfulCount: 22
  },
  {
    id: 'HR006',
    hotelId: 'H00016',
    hotelName: 'Centara Grand Beach Resort Hua Hin - Colonial Wing (ปลอดสัตว์เลี้ยง)',
    province: 'ประจวบคีรีขันธ์',
    author: 'คุณพิมลวรรณ สุขประเสริฐ',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '25 สิงหาคม 2026',
    petBrought: false,
    title: 'ความหรูหราคลาสสิกริมหาดหัวหิน สวนไม้ดัดสวยงาม เงียบสงบอย่างแท้จริง',
    comment: 'ปีกโคโลเนียลมีนโยบายปลอดสัตว์เลี้ยงเพื่อรักษาพรมและไม้สักโบราณ ทำให้ได้บรรยากาศความเงียบสงบย้อนยุคริมหาดหัวหิน สระว่ายน้ำ 4 สระ อาหารเช้า High Tea ยอดเยี่ยมมาก สำหรับใครที่ต้องการพักผ่อนแบบสงบและสะอาดแนะนำเลยค่ะ',
    roomType: 'Colonial Heritage Ocean Room (Non-Pet)',
    tags: ['สไตล์โคโลเนียล', 'ริมหาดหัวหิน', 'เงียบสงบไฮเอนด์', 'สวนสวย'],
    helpfulCount: 45
  },
  {
    id: 'HR007',
    hotelId: 'H00002',
    hotelName: 'Kaen Nakhon Lakeview Resort',
    province: 'ขอนแก่น',
    author: 'คุณอรทัย ทวีทรัพย์',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 4.8,
    date: '20 สิงหาคม 2026',
    petBrought: true,
    petType: 'สุนัขพันธุ์คอร์กี้',
    title: 'วิวริมบึงแก่นนครสวยมาก มีสระว่ายน้ำแยกสำหรับน้องหมา',
    comment: 'ชอบมากค่ะ วิลล่าติดสระว่ายน้ำระบบเกลือ มีโซนสำหรับสัตว์เลี้ยงโดยเฉพาะ น้องคอร์กี้ชอบมาก ลมเย็นสบาย เดินไปไหว้พระวัดหนองแวงสะดวกมากค่ะ',
    roomType: 'Lakeside Pool Villa (Pet Allowed)',
    tags: ['วิวบึงแก่นนคร', 'สระระบบเกลือ', 'ใกล้สถานที่เที่ยว', 'พาสัตว์ลงเล่นน้ำได้'],
    helpfulCount: 31
  }
];

// Sample Website Reviews (รีวิวและข้อเสนอแนะเกี่ยวกับเว็บไซต์/ระบบ StayMatch ของเรา)
export const SAMPLE_WEBSITE_REVIEWS: WebsiteReview[] = [
  {
    id: 'WR001',
    author: 'คุณพัชราภา สุวรรณโคตร',
    role: 'ผู้ใช้งานและนักวิจัยระบบนำร่อง มข.',
    rating: 5,
    date: '10 กันยายน 2026',
    category: 'ระบบจับคู่ AI',
    title: 'ระบบจับคู่ AI ช่วยประหยัดเวลามาก ไม่ต้องโทรเช็คทีละโรงแรม!',
    comment: 'ประทับใจเว็บไซต์ StayMatch มากค่ะ แต่เดิมพาน้องหมาเที่ยวแต่ละทีต้องโทรศัพท์ถามโรงแรมเป็นสิบๆ แห่งว่ารับน้ำหนักกี่กิโล มีค่าธรรมเนียมไหม พอใช้ระบบนี้ โมเดลจับคู่ตามงบและเงื่อนไขเป๊ะมาก แม่นยำสมคำร่ำลือ',
    helpfulCount: 64,
    device: 'MacBook Pro / Chrome'
  },
  {
    id: 'WR002',
    author: 'คุณจิรายุ พัฒนกุล',
    role: 'นักเดินทางและผู้จัดการฝ่ายจัดซื้อ',
    rating: 5,
    date: '9 กันยายน 2026',
    category: 'การแสดงผลและข้อมูล',
    title: 'ยอดเยี่ยมมากที่แสดงทั้งที่พักรับสัตว์ และที่พักที่สัตว์พักไม่ได้แยกกันชัดเจน!',
    comment: 'ขอชื่นชมการอัปเดตล่าสุดที่แสดงที่พักทั้งสองกลุ่มอย่างโปร่งใสครับ! สำหรับคนทั่วไปหรือนักธุรกิจที่ต้องการที่พักปลอดสารก่อภูมิแพ้และเงียบสงบ ก็สามารถเลือกดูโรงแรมที่สัตว์ไม่สามารถพักได้ ส่วนทริปที่พาน้องหมาไปก็เลือก Pet-Friendly ได้ในเว็บเดียว ไม่สับสน',
    helpfulCount: 52,
    device: 'iPad Pro / Safari'
  },
  {
    id: 'WR003',
    author: 'คุณชนิตา วงศ์สว่าง',
    role: 'เจ้าของสุนัขและครีเอเตอร์สายท่องเที่ยว',
    rating: 5,
    date: '8 กันยายน 2026',
    category: 'ภาพถ่ายห้องพัก',
    title: 'ชอบฟังก์ชันดูภาพห้องพักจริงและมุมสัตว์เลี้ยงมาก ภาพชัด ละเอียด',
    comment: 'ภาพถ่ายห้องพักมีแยกหมวดหมู่ชัดเจน ทั้งห้องนอน โซนสัตว์เลี้ยง ห้องน้ำ และสวนกลางแจ้ง ช่วยให้ตัดสินใจได้มั่นใจ 100% ว่าเตียงเป็นแบบไหน มีที่รองนอนจริงไหม ไม่ต้องลุ้นตอนไปถึงหน้างาน',
    helpfulCount: 47,
    device: 'iPhone 16 Pro / Safari'
  },
  {
    id: 'WR004',
    author: 'นพ.ณัฐวุฒิ สิทธิชัย',
    role: 'แพทย์ผู้เชี่ยวชาญด้านโรคภูมิแพ้',
    rating: 5,
    date: '6 กันยายน 2026',
    category: 'ความสะดวกในการจอง',
    title: 'ระบบจองใช้งานง่าย มีสลิปรหัสการจองชัดเจน ปลอดภัย',
    comment: 'ได้ทดลองจองห้องพักผ่านระบบ Flow การจองลื่นไหลมาก ระบุจำนวนคนและสัตว์เลี้ยงได้ชัดเจน คำนวณราคาและออกใบยืนยัน Booking Confirmation สวยงาม สะดวกสบายมากครับ',
    helpfulCount: 39,
    device: 'Windows PC / Edge'
  },
  {
    id: 'WR005',
    author: 'คุณกิตติศักดิ์ เจริญผล',
    role: 'ผู้บริหารธุรกิจโรงแรมและรีสอร์ท',
    rating: 5,
    date: '4 กันยายน 2026',
    category: 'ข้อเสนอแนะทั่วไป',
    title: 'แดชบอร์ด BI สวยงามระดับ Executive มีทั้งแผนภาพวงกลมและแนวโน้มต่อเนื่องครบ 10+ รูป',
    comment: 'ในฐานะผู้บริหาร หน้า Dashboard BI ตอบโจทย์การวางแผนเชิงกลยุทธ์มากครับ แผนภาพข้อมูลครอบคลุมทั้งส่วนแบ่งการตลาด ดัชนีความต้องการ และสัดส่วนที่พัก ช่วยให้เข้าใจตลาด Pet Tourism ทั่วไทยได้ครบถ้วน',
    helpfulCount: 43,
    device: 'Desktop / Chrome'
  }
];

// Sample Initial Bookings for the Booking Manager
export const SAMPLE_BOOKINGS: BookingRecord[] = [
  {
    id: 'BK001',
    bookingCode: 'SM-2026-8812',
    hotelId: 'H00001',
    hotelName: 'KKU Hotel & Pet Paradise (โรงแรม มข.)',
    hotelType: 'Hotel',
    province: 'ขอนแก่น',
    district: 'เมือง',
    roomType: 'Deluxe Pet Garden Room',
    checkInDate: '2026-10-05',
    checkOutDate: '2026-10-07',
    nights: 2,
    guestsCount: 2,
    hasPet: true,
    petCount: 1,
    petType: 'สุนัข (Dog)',
    pricePerNight: 1200,
    totalPrice: 2400,
    guestName: 'คุณพัชราภา สุวรรณโคตร',
    guestPhone: '081-234-5678',
    guestEmail: 'patcharapa.su@kkumail.com',
    specialRequests: 'ขอชามอาหารและเบาะนอนสุนัขไซส์ L ห้องชั้นล่างติดสวน',
    status: 'confirmed',
    createdAt: '2026-09-11 10:15'
  },
  {
    id: 'BK002',
    bookingCode: 'SM-2026-9204',
    hotelId: 'H00012',
    hotelName: 'Pullman Khon Kaen Raja Orchid (ปลอดสัตว์เลี้ยง)',
    hotelType: 'Hotel',
    province: 'ขอนแก่น',
    district: 'เมือง',
    roomType: 'Executive Business King Room (Non-Pet)',
    checkInDate: '2026-10-12',
    checkOutDate: '2026-10-14',
    nights: 2,
    guestsCount: 2,
    hasPet: false,
    petCount: 0,
    pricePerNight: 2600,
    totalPrice: 5200,
    guestName: 'ดร.ธนกร เกียรติบูรพา',
    guestPhone: '089-876-5432',
    guestEmail: 'thanakorn@kku.ac.th',
    specialRequests: 'ขอห้องพักชั้นสูงปลอดสารก่อภูมิแพ้ สำหรับร่วมการประชุมสัมมนาระดับชาติ',
    status: 'confirmed',
    createdAt: '2026-09-12 14:30'
  }
];

