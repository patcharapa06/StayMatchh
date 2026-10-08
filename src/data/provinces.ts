import { Region } from '../types';

export interface ProvinceInfo {
  name: string;
  nameEn: string;
  region: Region;
  zone: string;
  latitude: number;
  longitude: number;
}

export const ALL_77_PROVINCES: ProvinceInfo[] = [
  // ภาคเหนือ (9 จังหวัด)
  { name: 'เชียงใหม่', nameEn: 'Chiang Mai', region: 'ภาคเหนือ', zone: 'เหนือ', latitude: 18.7883, longitude: 98.9853 },
  { name: 'เชียงราย', nameEn: 'Chiang Rai', region: 'ภาคเหนือ', zone: 'เหนือ', latitude: 19.9105, longitude: 99.8406 },
  { name: 'ลำปาง', nameEn: 'Lampang', region: 'ภาคเหนือ', zone: 'เหนือ', latitude: 18.2888, longitude: 99.4908 },
  { name: 'ลำพูน', nameEn: 'Lamphun', region: 'ภาคเหนือ', zone: 'เหนือ', latitude: 18.5745, longitude: 99.0087 },
  { name: 'แม่ฮ่องสอน', nameEn: 'Mae Hong Son', region: 'ภาคเหนือ', zone: 'เหนือ', latitude: 19.3020, longitude: 97.9654 },
  { name: 'น่าน', nameEn: 'Nan', region: 'ภาคเหนือ', zone: 'เหนือ', latitude: 18.7756, longitude: 100.7730 },
  { name: 'พะเยา', nameEn: 'Phayao', region: 'ภาคเหนือ', zone: 'เหนือ', latitude: 19.1664, longitude: 99.9019 },
  { name: 'แพร่', nameEn: 'Phrae', region: 'ภาคเหนือ', zone: 'เหนือ', latitude: 18.1446, longitude: 100.1403 },
  { name: 'อุตรดิตถ์', nameEn: 'Uttaradit', region: 'ภาคเหนือ', zone: 'เหนือ', latitude: 17.6201, longitude: 100.0993 },

  // ภาคตะวันออกเฉียงเหนือ (20 จังหวัด)
  { name: 'ขอนแก่น', nameEn: 'Khon Kaen', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 16.4322, longitude: 102.8236 },
  { name: 'นครราชสีมา', nameEn: 'Nakhon Ratchasima', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 14.9799, longitude: 102.0978 },
  { name: 'อุดรธานี', nameEn: 'Udon Thani', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 17.4156, longitude: 102.7872 },
  { name: 'อุบลราชธานี', nameEn: 'Ubon Ratchathani', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 15.2287, longitude: 104.8564 },
  { name: 'บุรีรัมย์', nameEn: 'Buriram', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 14.9930, longitude: 103.1029 },
  { name: 'สุรินทร์', nameEn: 'Surin', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 14.8829, longitude: 103.4937 },
  { name: 'ศรีสะเกษ', nameEn: 'Sisaket', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 15.1186, longitude: 104.3220 },
  { name: 'มหาสารคาม', nameEn: 'Maha Sarakham', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 16.1851, longitude: 103.3026 },
  { name: 'ร้อยเอ็ด', nameEn: 'Roi Et', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 16.0538, longitude: 103.6520 },
  { name: 'กาฬสินธุ์', nameEn: 'Kalasin', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 16.4314, longitude: 103.5059 },
  { name: 'สกลนคร', nameEn: 'Sakon Nakhon', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 17.1546, longitude: 104.1348 },
  { name: 'นครพนม', nameEn: 'Nakhon Phanom', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 17.3920, longitude: 104.7695 },
  { name: 'มุกดาหาร', nameEn: 'Mukdahan', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 16.5424, longitude: 104.7209 },
  { name: 'ยโสธร', nameEn: 'Yasothon', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 15.7926, longitude: 104.1453 },
  { name: 'อำนาจเจริญ', nameEn: 'Amnat Charoen', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 15.8657, longitude: 104.6258 },
  { name: 'หนองคาย', nameEn: 'Nong Khai', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 17.8783, longitude: 102.7420 },
  { name: 'เลย', nameEn: 'Loei', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 17.4860, longitude: 101.7223 },
  { name: 'หนองบัวลำภู', nameEn: 'Nong Bua Lamphu', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 17.2041, longitude: 102.4407 },
  { name: 'บึงกาฬ', nameEn: 'Bueng Kan', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 18.3609, longitude: 103.6464 },
  { name: 'ชัยภูมิ', nameEn: 'Chaiyaphum', region: 'ภาคตะวันออกเฉียงเหนือ', zone: 'อีสาน', latitude: 15.8068, longitude: 102.0315 },

  // ภาคกลาง (22 จังหวัด รวม กทม.)
  { name: 'กรุงเทพมหานคร', nameEn: 'Bangkok', region: 'ภาคกลาง', zone: 'กลาง', latitude: 13.7563, longitude: 100.5018 },
  { name: 'นนทบุรี', nameEn: 'Nonthaburi', region: 'ภาคกลาง', zone: 'กลาง', latitude: 13.8591, longitude: 100.5217 },
  { name: 'ปทุมธานี', nameEn: 'Pathum Thani', region: 'ภาคกลาง', zone: 'กลาง', latitude: 14.0208, longitude: 100.5250 },
  { name: 'สมุทรปราการ', nameEn: 'Samut Prakan', region: 'ภาคกลาง', zone: 'กลาง', latitude: 13.5991, longitude: 100.5968 },
  { name: 'สมุทรสาคร', nameEn: 'Samut Sakhon', region: 'ภาคกลาง', zone: 'กลาง', latitude: 13.5475, longitude: 100.2736 },
  { name: 'สมุทรสงคราม', nameEn: 'Samut Songkhram', region: 'ภาคกลาง', zone: 'กลาง', latitude: 13.4098, longitude: 100.0023 },
  { name: 'พระนครศรีอยุธยา', nameEn: 'Phra Nakhon Si Ayutthaya', region: 'ภาคกลาง', zone: 'กลาง', latitude: 14.3532, longitude: 100.5684 },
  { name: 'อ่างทอง', nameEn: 'Ang Thong', region: 'ภาคกลาง', zone: 'กลาง', latitude: 14.5896, longitude: 100.4550 },
  { name: 'ลพบุรี', nameEn: 'Lopburi', region: 'ภาคกลาง', zone: 'กลาง', latitude: 14.7995, longitude: 100.6534 },
  { name: 'สิงห์บุรี', nameEn: 'Sing Buri', region: 'ภาคกลาง', zone: 'กลาง', latitude: 14.8936, longitude: 100.3967 },
  { name: 'ชัยนาท', nameEn: 'Chai Nat', region: 'ภาคกลาง', zone: 'กลาง', latitude: 15.1852, longitude: 100.1251 },
  { name: 'สระบุรี', nameEn: 'Saraburi', region: 'ภาคกลาง', zone: 'กลาง', latitude: 14.5289, longitude: 100.9101 },
  { name: 'นครนายก', nameEn: 'Nakhon Nayok', region: 'ภาคกลาง', zone: 'กลาง', latitude: 14.2069, longitude: 101.2131 },
  { name: 'สุพรรณบุรี', nameEn: 'Suphan Buri', region: 'ภาคกลาง', zone: 'กลาง', latitude: 14.4745, longitude: 100.1177 },
  { name: 'นครปฐม', nameEn: 'Nakhon Pathom', region: 'ภาคกลาง', zone: 'กลาง', latitude: 13.8199, longitude: 100.0622 },
  { name: 'พิษณุโลก', nameEn: 'Phitsanulok', region: 'ภาคกลาง', zone: 'กลาง', latitude: 16.8211, longitude: 100.2659 },
  { name: 'สุโขทัย', nameEn: 'Sukhothai', region: 'ภาคกลาง', zone: 'กลาง', latitude: 17.0056, longitude: 99.8264 },
  { name: 'เพชรบูรณ์', nameEn: 'Phetchabun', region: 'ภาคกลาง', zone: 'กลาง', latitude: 16.4190, longitude: 101.1561 },
  { name: 'พิจิตร', nameEn: 'Phichit', region: 'ภาคกลาง', zone: 'กลาง', latitude: 16.4419, longitude: 100.3488 },
  { name: 'กำแพงเพชร', nameEn: 'Kamphaeng Phet', region: 'ภาคกลาง', zone: 'กลาง', latitude: 16.4828, longitude: 99.5227 },
  { name: 'นครสวรรค์', nameEn: 'Nakhon Sawan', region: 'ภาคกลาง', zone: 'กลาง', latitude: 15.7047, longitude: 100.1372 },
  { name: 'อุทัยธานี', nameEn: 'Uthai Thani', region: 'ภาคกลาง', zone: 'กลาง', latitude: 15.3835, longitude: 100.0246 },

  // ภาคตะวันออก (7 จังหวัด)
  { name: 'ชลบุรี', nameEn: 'Chonburi', region: 'ภาคตะวันออก', zone: 'ตะวันออก', latitude: 13.3611, longitude: 100.9847 },
  { name: 'ระยอง', nameEn: 'Rayong', region: 'ภาคตะวันออก', zone: 'ตะวันออก', latitude: 12.6814, longitude: 101.2816 },
  { name: 'จันทบุรี', nameEn: 'Chanthaburi', region: 'ภาคตะวันออก', zone: 'ตะวันออก', latitude: 12.6114, longitude: 102.1039 },
  { name: 'ตราด', nameEn: 'Trat', region: 'ภาคตะวันออก', zone: 'ตะวันออก', latitude: 12.2428, longitude: 102.5175 },
  { name: 'ฉะเชิงเทรา', nameEn: 'Chachoengsao', region: 'ภาคตะวันออก', zone: 'ตะวันออก', latitude: 13.6904, longitude: 101.0780 },
  { name: 'ปราจีนบุรี', nameEn: 'Prachinburi', region: 'ภาคตะวันออก', zone: 'ตะวันออก', latitude: 14.0509, longitude: 101.3717 },
  { name: 'สระแก้ว', nameEn: 'Sa Kaeo', region: 'ภาคตะวันออก', zone: 'ตะวันออก', latitude: 13.8240, longitude: 102.0646 },

  // ภาคตะวันตก (5 จังหวัด)
  { name: 'ประจวบคีรีขันธ์', nameEn: 'Prachuap Khiri Khan', region: 'ภาคตะวันตก', zone: 'ตะวันตก', latitude: 12.5684, longitude: 99.9577 },
  { name: 'เพชรบุรี', nameEn: 'Phetchaburi', region: 'ภาคตะวันตก', zone: 'ตะวันตก', latitude: 13.1119, longitude: 99.9398 },
  { name: 'กาญจนบุรี', nameEn: 'Kanchanaburi', region: 'ภาคตะวันตก', zone: 'ตะวันตก', latitude: 14.0228, longitude: 99.5328 },
  { name: 'ราชบุรี', nameEn: 'Ratchaburi', region: 'ภาคตะวันตก', zone: 'ตะวันตก', latitude: 13.5283, longitude: 99.8134 },
  { name: 'ตาก', nameEn: 'Tak', region: 'ภาคตะวันตก', zone: 'ตะวันตก', latitude: 16.8840, longitude: 99.1258 },

  // ภาคใต้ (14 จังหวัด)
  { name: 'ภูเก็ต', nameEn: 'Phuket', region: 'ภาคใต้', zone: 'ใต้', latitude: 7.8804, longitude: 98.3923 },
  { name: 'กระบี่', nameEn: 'Krabi', region: 'ภาคใต้', zone: 'ใต้', latitude: 8.0863, longitude: 98.9063 },
  { name: 'สุราษฎร์ธานี', nameEn: 'Surat Thani', region: 'ภาคใต้', zone: 'ใต้', latitude: 9.1382, longitude: 99.3217 },
  { name: 'พังงา', nameEn: 'Phang Nga', region: 'ภาคใต้', zone: 'ใต้', latitude: 8.4501, longitude: 98.5255 },
  { name: 'สงขลา', nameEn: 'Songkhla', region: 'ภาคใต้', zone: 'ใต้', latitude: 7.1898, longitude: 100.5954 },
  { name: 'นครศรีธรรมราช', nameEn: 'Nakhon Si Thammarat', region: 'ภาคใต้', zone: 'ใต้', latitude: 8.4304, longitude: 99.9631 },
  { name: 'ชุมพร', nameEn: 'Chumphon', region: 'ภาคใต้', zone: 'ใต้', latitude: 10.4930, longitude: 99.1800 },
  { name: 'ระนอง', nameEn: 'Ranong', region: 'ภาคใต้', zone: 'ใต้', latitude: 9.9529, longitude: 98.6085 },
  { name: 'ตรัง', nameEn: 'Trang', region: 'ภาคใต้', zone: 'ใต้', latitude: 7.5594, longitude: 99.6114 },
  { name: 'สตูล', nameEn: 'Satun', region: 'ภาคใต้', zone: 'ใต้', latitude: 6.6238, longitude: 100.0674 },
  { name: 'พัทลุง', nameEn: 'Phatthalung', region: 'ภาคใต้', zone: 'ใต้', latitude: 7.6167, longitude: 100.0740 },
  { name: 'ปัตตานี', nameEn: 'Pattani', region: 'ภาคใต้', zone: 'ใต้', latitude: 6.8695, longitude: 101.2505 },
  { name: 'ยะลา', nameEn: 'Yala', region: 'ภาคใต้', zone: 'ใต้', latitude: 6.5411, longitude: 101.2804 },
  { name: 'นราธิวาส', nameEn: 'Narathiwat', region: 'ภาคใต้', zone: 'ใต้', latitude: 6.4255, longitude: 101.8253 },
];

export const REGIONS_LIST: Region[] = [
  'ภาคกลาง',
  'ภาคเหนือ',
  'ภาคตะวันออกเฉียงเหนือ',
  'ภาคตะวันออก',
  'ภาคตะวันตก',
  'ภาคใต้'
];

export function getProvinceCoordinates(provinceName: string): { latitude: number; longitude: number } {
  const found = ALL_77_PROVINCES.find((p) => p.name === provinceName);
  if (found) {
    return { latitude: found.latitude, longitude: found.longitude };
  }
  return { latitude: 13.7563, longitude: 100.5018 };
}
