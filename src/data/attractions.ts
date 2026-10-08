import { Attraction, Hotel } from '../types';
import { ALL_77_PROVINCES, getProvinceCoordinates } from './provinces';

export const POPULAR_ATTRACTIONS: Record<string, Attraction[]> = {
  'ขอนแก่น': [
    { attractionId: 'A00001', attractionName: 'บึงแก่นนคร (แลนด์มาร์กริมบึง)', attractionType: 'ธรรมชาติ', province: 'ขอนแก่น', district: 'เมือง', petAllowed: true, latitude: 16.4269, longitude: 102.8355 },
    { attractionId: 'A00002', attractionName: 'วัดหนองแวง พระอารามหลวง (พระมหาธาตุแก่นนคร)', attractionType: 'วัฒนธรรม', province: 'ขอนแก่น', district: 'เมือง', petAllowed: false, latitude: 16.4150, longitude: 102.8368 },
    { attractionId: 'A00003', attractionName: 'ตลาดต้นตาล ขอนแก่น (Ton Tann Market)', attractionType: 'ชุมชน/ตลาด', province: 'ขอนแก่น', district: 'เมือง', petAllowed: true, latitude: 16.4290, longitude: 102.8150 },
    { attractionId: 'A00005', attractionName: 'มหาวิทยาลัยขอนแก่น (KKU & บึงสีฐาน)', attractionType: 'สวนสาธารณะ/กิจกรรม', province: 'ขอนแก่น', district: 'เมือง', petAllowed: true, latitude: 16.4467, longitude: 102.8140 },
    { attractionId: 'A00006', attractionName: 'ท่าอากาศยานนานาชาติขอนแก่น (สนามบินขอนแก่น)', attractionType: 'ชุมชน/ตลาด', province: 'ขอนแก่น', district: 'เมือง', petAllowed: true, latitude: 16.4666, longitude: 102.7836 },
    { attractionId: 'A00007', attractionName: 'สถานีรถไฟขอนแก่น (ศูนย์กลางการเดินทาง)', attractionType: 'ชุมชน/ตลาด', province: 'ขอนแก่น', district: 'เมือง', petAllowed: true, latitude: 16.4281, longitude: 102.8260 },
    { attractionId: 'A00008', attractionName: 'เซ็นทรัล ขอนแก่น (Central Plaza Khon Kaen)', attractionType: 'ชุมชน/ตลาด', province: 'ขอนแก่น', district: 'เมือง', petAllowed: true, latitude: 16.4322, longitude: 102.8253 },
    { attractionId: 'A00004', attractionName: 'อุทยานแห่งชาติภูเก้า-ภูพานคำ (เขื่อนอุบลรัตน์)', attractionType: 'ธรรมชาติ', province: 'ขอนแก่น', district: 'อุบลรัตน์', petAllowed: true, latitude: 16.7800, longitude: 102.6200 },
  ],
  'เชียงใหม่': [
    { attractionId: 'A00010', attractionName: 'วัดพระธาตุดอยสุเทพราชวรวิหาร', attractionType: 'ธรรมชาติ', province: 'เชียงใหม่', district: 'เมืองเชียงใหม่', petAllowed: false, latitude: 18.8049, longitude: 98.9216 },
    { attractionId: 'A00011', attractionName: 'ถนนนิมมานเหมินทร์ & One Nimman', attractionType: 'ชุมชน/ตลาด', province: 'เชียงใหม่', district: 'เมืองเชียงใหม่', petAllowed: true, latitude: 18.7990, longitude: 98.9680 },
    { attractionId: 'A00012', attractionName: 'อ่างแก้ว มหาวิทยาลัยเชียงใหม่ (ลานพาสุนัขเดิน)', attractionType: 'สวนสาธารณะ/กิจกรรม', province: 'เชียงใหม่', district: 'เมืองเชียงใหม่', petAllowed: true, latitude: 18.8050, longitude: 98.9510 },
    { attractionId: 'A00014', attractionName: 'ท่าอากาศยานเชียงใหม่ (สนามบินเชียงใหม่)', attractionType: 'ชุมชน/ตลาด', province: 'เชียงใหม่', district: 'เมืองเชียงใหม่', petAllowed: true, latitude: 18.7668, longitude: 98.9626 },
    { attractionId: 'A00015', attractionName: 'ประตูท่าแพ (แลนด์มาร์กคูเมืองเก่า)', attractionType: 'วัฒนธรรม', province: 'เชียงใหม่', district: 'เมืองเชียงใหม่', petAllowed: true, latitude: 18.7877, longitude: 98.9933 },
    { attractionId: 'A00013', attractionName: 'ม่อนแจ่ม แม่ริม', attractionType: 'ธรรมชาติ', province: 'เชียงใหม่', district: 'แม่ริม', petAllowed: true, latitude: 18.9350, longitude: 98.8220 },
  ],
  'กรุงเทพมหานคร': [
    { attractionId: 'A00020', attractionName: 'สวนเบญจกิติ (Dog Park โซนสัตว์เลี้ยง)', attractionType: 'สวนสาธารณะ/กิจกรรม', province: 'กรุงเทพมหานคร', district: 'คลองเตย', petAllowed: true, latitude: 13.7290, longitude: 100.5580 },
    { attractionId: 'A00023', attractionName: 'สยามพารากอน & เซ็นทรัลเวิลด์ (Pet-Friendly Mall Zone)', attractionType: 'ชุมชน/ตลาด', province: 'กรุงเทพมหานคร', district: 'ปทุมวัน', petAllowed: true, latitude: 13.7466, longitude: 100.5347 },
    { attractionId: 'A00021', attractionName: 'เอเชียทีค เดอะ ริเวอร์ฟรอนท์', attractionType: 'ชุมชน/ตลาด', province: 'กรุงเทพมหานคร', district: 'บางคอแหลม', petAllowed: true, latitude: 13.7040, longitude: 100.5030 },
    { attractionId: 'A00022', attractionName: 'สวนรถไฟ (สวนวชิรเบญจทัศ จตุจักร)', attractionType: 'สวนสาธารณะ/กิจกรรม', province: 'กรุงเทพมหานคร', district: 'จตุจักร', petAllowed: true, latitude: 13.8120, longitude: 100.5540 },
    { attractionId: 'A00024', attractionName: 'สถานีกลางกรุงเทพอภิวัฒน์ (บางซื่อ)', attractionType: 'ชุมชน/ตลาด', province: 'กรุงเทพมหานคร', district: 'จตุจักร', petAllowed: true, latitude: 13.8042, longitude: 100.5410 },
  ],
  'ประจวบคีรีขันธ์': [
    { attractionId: 'A00030', attractionName: 'หาดหัวหิน (ชายหาดวิ่งเล่นสัตว์เลี้ยง)', attractionType: 'ชายหาด', province: 'ประจวบคีรีขันธ์', district: 'หัวหิน', petAllowed: true, latitude: 12.5684, longitude: 99.9577 },
    { attractionId: 'A00031', attractionName: 'ซิเคด้า มาร์เก็ต (Cicada Market)', attractionType: 'ชุมชน/ตลาด', province: 'ประจวบคีรีขันธ์', district: 'หัวหิน', petAllowed: true, latitude: 12.5340, longitude: 99.9660 },
    { attractionId: 'A00033', attractionName: 'สถานีรถไฟหัวหิน (แลนด์มาร์กคลาสสิก)', attractionType: 'วัฒนธรรม', province: 'ประจวบคีรีขันธ์', district: 'หัวหิน', petAllowed: true, latitude: 12.5674, longitude: 99.9547 },
    { attractionId: 'A00034', attractionName: 'เขาตะเกียบ & จุดชมวิวหัวหิน', attractionType: 'ชายหาด', province: 'ประจวบคีรีขันธ์', district: 'หัวหิน', petAllowed: true, latitude: 12.5135, longitude: 99.9781 },
    { attractionId: 'A00032', attractionName: 'อ่าวประจวบ & อ่าวมะนาว', attractionType: 'ชายหาด', province: 'ประจวบคีรีขันธ์', district: 'เมือง', petAllowed: true, latitude: 11.7950, longitude: 99.8050 },
  ],
  'นครราชสีมา': [
    { attractionId: 'A00040', attractionName: 'อุทยานแห่งชาติเขาใหญ่ (ด่านปากช่อง)', attractionType: 'ธรรมชาติ', province: 'นครราชสีมา', district: 'ปากช่อง', petAllowed: false, latitude: 14.4390, longitude: 101.3720 },
    { attractionId: 'A00041', attractionName: 'พรีโม่ เพียซซ่า เขาใหญ่ (Primo Piazza)', attractionType: 'สวนสาธารณะ/กิจกรรม', province: 'นครราชสีมา', district: 'ปากช่อง', petAllowed: true, latitude: 14.5420, longitude: 101.3320 },
    { attractionId: 'A00043', attractionName: 'อนุสาวรีย์ท้าวสุรนารี (ย่าโม ตัวเมืองโคราช)', attractionType: 'วัฒนธรรม', province: 'นครราชสีมา', district: 'เมือง', petAllowed: true, latitude: 14.9799, longitude: 102.0978 },
    { attractionId: 'A00042', attractionName: 'ทุ่งทานตะวัน ไร่มณีศร เขาใหญ่', attractionType: 'ธรรมชาติ', province: 'นครราชสีมา', district: 'ปากช่อง', petAllowed: true, latitude: 14.6100, longitude: 101.4500 },
  ],
  'ชลบุรี': [
    { attractionId: 'A00050', attractionName: 'หาดจอมเทียน พัทยา', attractionType: 'ชายหาด', province: 'ชลบุรี', district: 'บางละมุง', petAllowed: true, latitude: 12.8950, longitude: 100.8750 },
    { attractionId: 'A00053', attractionName: 'ท่าเรือแหลมบาลีฮาย & ถนนคนเดินพัทยา', attractionType: 'ชายหาด', province: 'ชลบุรี', district: 'บางละมุง', petAllowed: true, latitude: 12.9252, longitude: 100.8672 },
    { attractionId: 'A00051', attractionName: 'หาดบางแสน', attractionType: 'ชายหาด', province: 'ชลบุรี', district: 'เมือง', petAllowed: true, latitude: 13.2830, longitude: 100.9150 },
    { attractionId: 'A00052', attractionName: 'สวนนงนุช พัทยา', attractionType: 'สวนสาธารณะ/กิจกรรม', province: 'ชลบุรี', district: 'สัตหีบ', petAllowed: true, latitude: 12.7660, longitude: 100.9320 },
  ],
  'ภูเก็ต': [
    { attractionId: 'A00060', attractionName: 'หาดกะรน & หาดกะตะ', attractionType: 'ชายหาด', province: 'ภูเก็ต', district: 'เมืองภูเก็ต', petAllowed: true, latitude: 7.8200, longitude: 98.2980 },
    { attractionId: 'A00063', attractionName: 'หาดป่าตอง (Patong Beach)', attractionType: 'ชายหาด', province: 'ภูเก็ต', district: 'กะทู้', petAllowed: true, latitude: 7.8965, longitude: 98.2965 },
    { attractionId: 'A00061', attractionName: 'ย่านเมืองเก่าภูเก็ต (Old Phuket Town)', attractionType: 'วัฒนธรรม', province: 'ภูเก็ต', district: 'เมืองภูเก็ต', petAllowed: true, latitude: 7.8840, longitude: 98.3880 },
    { attractionId: 'A00062', attractionName: 'แหลมพรหมเทพ', attractionType: 'ธรรมชาติ', province: 'ภูเก็ต', district: 'เมืองภูเก็ต', petAllowed: true, latitude: 7.7630, longitude: 98.3050 },
  ],
  'พระนครศรีอยุธยา': [
    { attractionId: 'A00070', attractionName: 'อุทยานประวัติศาสตร์พระนครศรีอยุธยา (วัดมหาธาตุ & วัดพระศรีสรรเพชญ์)', attractionType: 'วัฒนธรรม', province: 'พระนครศรีอยุธยา', district: 'พระนครศรีอยุธยา', petAllowed: true, latitude: 14.3565, longitude: 100.5684 },
    { attractionId: 'A00071', attractionName: 'ตลาดน้ำอโยธยา (Ayothaya Floating Market)', attractionType: 'ชุมชน/ตลาด', province: 'พระนครศรีอยุธยา', district: 'พระนครศรีอยุธยา', petAllowed: true, latitude: 14.3592, longitude: 100.5928 },
    { attractionId: 'A00072', attractionName: 'วัดไชยวัฒนาราม (จุดชมวิวริมแม่น้ำเจ้าพระยา)', attractionType: 'วัฒนธรรม', province: 'พระนครศรีอยุธยา', district: 'พระนครศรีอยุธยา', petAllowed: false, latitude: 14.3432, longitude: 100.5418 },
    { attractionId: 'A00073', attractionName: 'ตลาดกุ้งอยุธยา & คาเฟ่ริมน้ำ', attractionType: 'ชุมชน/ตลาด', province: 'พระนครศรีอยุธยา', district: 'พระนครศรีอยุธยา', petAllowed: true, latitude: 14.3490, longitude: 100.6050 }
  ],
  'สระบุรี': [
    { attractionId: 'A00080', attractionName: 'น้ำตกเจ็ดสาวน้อย & มวกเหล็ก', attractionType: 'ธรรมชาติ', province: 'สระบุรี', district: 'มวกเหล็ก', petAllowed: true, latitude: 14.7248, longitude: 101.1904 },
    { attractionId: 'A00081', attractionName: 'ฟาร์มโคนมไทย-เดนมาร์ค (มวกเหล็ก)', attractionType: 'สวนสาธารณะ/กิจกรรม', province: 'สระบุรี', district: 'มวกเหล็ก', petAllowed: true, latitude: 14.6562, longitude: 101.1985 },
    { attractionId: 'A00082', attractionName: 'อ่างเก็บน้ำมวกเหล็ก & จุดแคมป์ปิ้งริมน้ำ', attractionType: 'ธรรมชาติ', province: 'สระบุรี', district: 'มวกเหล็ก', petAllowed: true, latitude: 14.7820, longitude: 101.1640 },
    { attractionId: 'A00083', attractionName: 'วัดพระพุทธบาทราชวรมหาวิหาร', attractionType: 'วัฒนธรรม', province: 'สระบุรี', district: 'พระพุทธบาท', petAllowed: false, latitude: 14.7169, longitude: 100.7889 }
  ],
  'เพชรบุรี': [
    { attractionId: 'A00090', attractionName: 'หาดชะอำ (ชายหาดพาสัตว์เลี้ยงเดินเล่น)', attractionType: 'ชายหาด', province: 'เพชรบุรี', district: 'ชะอำ', petAllowed: true, latitude: 12.8012, longitude: 99.9856 },
    { attractionId: 'A00091', attractionName: 'อุทยานประวัติศาสตร์พระนครคีรี (เขาวัง เพชรบุรี)', attractionType: 'วัฒนธรรม', province: 'เพชรบุรี', district: 'เมืองเพชรบุรี', petAllowed: false, latitude: 13.1092, longitude: 99.9369 },
    { attractionId: 'A00092', attractionName: 'คาเมล รีพับบลิค ชะอำ (Camel Republic)', attractionType: 'สวนสาธารณะ/กิจกรรม', province: 'เพชรบุรี', district: 'ชะอำ', petAllowed: true, latitude: 12.8235, longitude: 99.9512 },
    { attractionId: 'A00093', attractionName: 'อุทยานแห่งชาติแก่งกระจาน (จุดชมวิวเขื่อนแก่งกระจาน)', attractionType: 'ธรรมชาติ', province: 'เพชรบุรี', district: 'แก่งกระจาน', petAllowed: true, latitude: 12.9150, longitude: 99.6280 }
  ],
  'สมุทรสงคราม': [
    { attractionId: 'A00100', attractionName: 'ตลาดน้ำอัมพวา (Amphawa Floating Market)', attractionType: 'ชุมชน/ตลาด', province: 'สมุทรสงคราม', district: 'อัมพวา', petAllowed: true, latitude: 13.4259, longitude: 99.9554 },
    { attractionId: 'A00101', attractionName: 'ตลาดร่มหุบ แม่กลอง (Maeklong Railway Market)', attractionType: 'ชุมชน/ตลาด', province: 'สมุทรสงคราม', district: 'เมืองสมุทรสงคราม', petAllowed: true, latitude: 13.4075, longitude: 99.9989 },
    { attractionId: 'A00102', attractionName: 'ดอนหอยหลอด & ร้านอาหารทะเลริมอ่าว', attractionType: 'ชายหาด', province: 'สมุทรสงคราม', district: 'เมืองสมุทรสงคราม', petAllowed: true, latitude: 13.3680, longitude: 100.0250 }
  ],
  'สมุทรสาคร': [
    { attractionId: 'A00110', attractionName: 'สะพานแดง จุดชมวิวโลมา & ชายทะเลพันท้ายนรสิงห์', attractionType: 'ชายหาด', province: 'สมุทรสาคร', district: 'เมืองสมุทรสาคร', petAllowed: true, latitude: 13.4950, longitude: 100.3520 },
    { attractionId: 'A00111', attractionName: 'ตลาดทะเลไทย & ท่าเรือมหาชัย', attractionType: 'ชุมชน/ตลาด', province: 'สมุทรสาคร', district: 'เมืองสมุทรสาคร', petAllowed: true, latitude: 13.5475, longitude: 100.2736 }
  ],
  'เพชรบูรณ์': [
    { attractionId: 'A00120', attractionName: 'จุดชมวิวทะเลหมอกเขาค้อ & กังหันลมเขาค้อ', attractionType: 'ธรรมชาติ', province: 'เพชรบูรณ์', district: 'เขาค้อ', petAllowed: true, latitude: 16.6320, longitude: 100.9950 },
    { attractionId: 'A00121', attractionName: 'วัดพระธาตุผาซ่อนแก้ว เขาค้อ', attractionType: 'วัฒนธรรม', province: 'เพชรบูรณ์', district: 'เขาค้อ', petAllowed: false, latitude: 16.7892, longitude: 101.0504 },
    { attractionId: 'A00122', attractionName: 'ภูทับเบิก จุดชมวิวสูงสุดเพชรบูรณ์', attractionType: 'ธรรมชาติ', province: 'เพชรบูรณ์', district: 'หล่มเก่า', petAllowed: true, latitude: 16.9050, longitude: 101.1060 }
  ],
  'พิษณุโลก': [
    { attractionId: 'A00130', attractionName: 'วัดพระศรีรัตนมหาธาตุวรมหาวิหาร (พระพุทธชินราช)', attractionType: 'วัฒนธรรม', province: 'พิษณุโลก', district: 'เมืองพิษณุโลก', petAllowed: false, latitude: 16.8235, longitude: 100.2615 },
    { attractionId: 'A00131', attractionName: 'จุดชมวิวเนินมะปราง & บ้านมุง', attractionType: 'ธรรมชาติ', province: 'พิษณุโลก', district: 'เนินมะปราง', petAllowed: true, latitude: 16.5620, longitude: 100.6840 },
    { attractionId: 'A00132', attractionName: 'สวนชมน่านเฉลิมพระเกียรติ ริมแม่น้ำน่าน', attractionType: 'สวนสาธารณะ/กิจกรรม', province: 'พิษณุโลก', district: 'เมืองพิษณุโลก', petAllowed: true, latitude: 16.8190, longitude: 100.2600 }
  ],
  'นครสวรรค์': [
    { attractionId: 'A00140', attractionName: 'พาสาน (Pasan อาคารสัญลักษณ์ต้นแม่น้ำเจ้าพระยา)', attractionType: 'วัฒนธรรม', province: 'นครสวรรค์', district: 'เมืองนครสวรรค์', petAllowed: true, latitude: 15.7025, longitude: 100.1422 },
    { attractionId: 'A00141', attractionName: 'อุทยานสวรรค์ (หนองสมบูรณ์ สวนสาธารณะกลางเมือง)', attractionType: 'สวนสาธารณะ/กิจกรรม', province: 'นครสวรรค์', district: 'เมืองนครสวรรค์', petAllowed: true, latitude: 15.6980, longitude: 100.1225 },
    { attractionId: 'A00142', attractionName: 'บึงบอระเพ็ด นครสวรรค์', attractionType: 'ธรรมชาติ', province: 'นครสวรรค์', district: 'เมืองนครสวรรค์', petAllowed: true, latitude: 15.6850, longitude: 100.1890 }
  ],
  'ลำปาง': [
    { attractionId: 'A00150', attractionName: 'กาดกองต้า ถนนคนเดินริมแม่น้ำวัง & รถม้าลำปาง', attractionType: 'ชุมชน/ตลาด', province: 'ลำปาง', district: 'เมืองลำปาง', petAllowed: true, latitude: 18.2932, longitude: 99.4985 },
    { attractionId: 'A00151', attractionName: 'วัดพระธาตุลำปางหลวง', attractionType: 'วัฒนธรรม', province: 'ลำปาง', district: 'เกาะคา', petAllowed: false, latitude: 18.2165, longitude: 99.3888 },
    { attractionId: 'A00152', attractionName: 'อุทยานแห่งชาติแจ้ซ้อน (น้ำพุร้อนแจ้ซ้อน)', attractionType: 'ธรรมชาติ', province: 'ลำปาง', district: 'เมืองปาน', petAllowed: true, latitude: 18.8365, longitude: 99.4695 }
  ],
  'กาญจนบุรี': [
    { attractionId: 'A00160', attractionName: 'สะพานข้ามแม่น้ำแคว', attractionType: 'วัฒนธรรม', province: 'กาญจนบุรี', district: 'เมืองกาญจนบุรี', petAllowed: true, latitude: 14.0418, longitude: 99.5038 },
    { attractionId: 'A00161', attractionName: 'น้ำตกเอราวัณ & เขื่อนศรีนครินทร์', attractionType: 'ธรรมชาติ', province: 'กาญจนบุรี', district: 'ศรีสวัสดิ์', petAllowed: true, latitude: 14.3685, longitude: 99.1440 },
    { attractionId: 'A00162', attractionName: 'สกายวอล์คกาญจนบุรี ริมแม่น้ำแคว', attractionType: 'สวนสาธารณะ/กิจกรรม', province: 'กาญจนบุรี', district: 'เมืองกาญจนบุรี', petAllowed: true, latitude: 14.0220, longitude: 99.5240 }
  ],
  'น่าน': [
    { attractionId: 'A00170', attractionName: 'วัดภูมินทร์ & ซุ้มลีลาวดี เมืองน่าน', attractionType: 'วัฒนธรรม', province: 'น่าน', district: 'เมืองน่าน', petAllowed: true, latitude: 18.7745, longitude: 100.7715 },
    { attractionId: 'A00171', attractionName: 'ดอยเสมอดาว & ถนนหมายเลข 3 สันติสุข-บ่อเกลือ', attractionType: 'ธรรมชาติ', province: 'น่าน', district: 'นาน้อย', petAllowed: true, latitude: 18.3820, longitude: 100.8510 }
  ]
};

export function getAttractionsForProvince(provinceName: string): Attraction[] {
  if (POPULAR_ATTRACTIONS[provinceName]) {
    return POPULAR_ATTRACTIONS[provinceName];
  }
  const coords = getProvinceCoordinates(provinceName);
  return [
    {
      attractionId: `GEN_ATT_${provinceName}_01`,
      attractionName: `จุดแลนด์มาร์กใจกลางเมือง จังหวัด${provinceName}`,
      attractionType: 'ธรรมชาติ',
      province: provinceName,
      district: 'เมือง',
      petAllowed: true,
      latitude: Number((coords.latitude + 0.004).toFixed(4)),
      longitude: Number((coords.longitude + 0.004).toFixed(4))
    },
    {
      attractionId: `GEN_ATT_${provinceName}_02`,
      attractionName: `สวนสาธารณะเฉลิมพระเกียรติ จังหวัด${provinceName}`,
      attractionType: 'สวนสาธารณะ/กิจกรรม',
      province: provinceName,
      district: 'เมือง',
      petAllowed: true,
      latitude: Number((coords.latitude + 0.015).toFixed(4)),
      longitude: Number((coords.longitude - 0.012).toFixed(4))
    },
    {
      attractionId: `GEN_ATT_${provinceName}_03`,
      attractionName: `สถานีขนส่ง & ศูนย์กลางการเดินทาง จังหวัด${provinceName}`,
      attractionType: 'ชุมชน/ตลาด',
      province: provinceName,
      district: 'เมือง',
      petAllowed: true,
      latitude: Number((coords.latitude - 0.014).toFixed(4)),
      longitude: Number((coords.longitude - 0.015).toFixed(4))
    },
    {
      attractionId: `GEN_ATT_${provinceName}_04`,
      attractionName: `ตลาดไนท์บาซาร์ & ถนนคนเดิน จังหวัด${provinceName}`,
      attractionType: 'ชุมชน/ตลาด',
      province: provinceName,
      district: 'เมือง',
      petAllowed: true,
      latitude: Number((coords.latitude - 0.008).toFixed(4)),
      longitude: Number((coords.longitude + 0.018).toFixed(4))
    },
    {
      attractionId: `GEN_ATT_${provinceName}_05`,
      attractionName: `วัดพระธาตุ & ศูนย์วัฒนธรรม จังหวัด${provinceName}`,
      attractionType: 'วัฒนธรรม',
      province: provinceName,
      district: 'เมือง',
      petAllowed: false,
      latitude: Number((coords.latitude + 0.024).toFixed(4)),
      longitude: Number((coords.longitude + 0.021).toFixed(4))
    }
  ];
}

/**
 * Calculate realistic driving distance in kilometers between two GPS coordinates (Haversine * 1.22 road factor)
 */
export function calculateRoadDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightKm = R * c;
  // Road factor 1.22x for real highway/urban curves
  return Number(Math.max(0.2, straightKm * 1.22).toFixed(1));
}

export function formatDriveDuration(totalMinutes: number): string {
  if (totalMinutes < 60) {
    return `${Math.max(2, Math.round(totalMinutes))} นาที`;
  }
  const hrs = Math.floor(totalMinutes / 60);
  const mins = Math.round(totalMinutes % 60);
  if (mins === 0) return `${hrs} ชม.`;
  return `${hrs} ชม. ${mins} นาที`;
}

export interface CorridorProvinceStep {
  provinceName: string;
  region: string;
  role: 'origin' | 'transit' | 'destination';
  distFromOriginKm: number;
  distToDestinationKm: number;
  detourFromDirectKm: number;
  progressRatio: number; // 0 = Origin A, 1 = Destination B
  latitude: number;
  longitude: number;
}

/**
 * Find all provinces along the travel corridor from Origin Province A to Destination Province B
 * Sorted in travel sequence from Origin (0%) -> Transit Provinces -> Destination (100%)
 */
export function findCorridorProvincesBetween(
  originProvince: string,
  destinationProvince: string
): CorridorProvinceStep[] {
  const originCoord = getProvinceCoordinates(originProvince);
  const originInfo = ALL_77_PROVINCES.find((p) => p.name === originProvince);

  if (originProvince === destinationProvince) {
    return [
      {
        provinceName: originProvince,
        region: originInfo?.region || 'ภาคกลาง',
        role: 'origin',
        distFromOriginKm: 0,
        distToDestinationKm: 0,
        detourFromDirectKm: 0,
        progressRatio: 0,
        latitude: originCoord.latitude,
        longitude: originCoord.longitude
      }
    ];
  }

  const destCoord = getProvinceCoordinates(destinationProvince);
  const destInfo = ALL_77_PROVINCES.find((p) => p.name === destinationProvince);
  const directKm = calculateRoadDistanceKm(
    originCoord.latitude,
    originCoord.longitude,
    destCoord.latitude,
    destCoord.longitude
  );

  const dx = destCoord.longitude - originCoord.longitude;
  const dy = destCoord.latitude - originCoord.latitude;
  const segLenSq = dx * dx + dy * dy;

  const transitSteps: CorridorProvinceStep[] = [];
  const candidateFallbacks: CorridorProvinceStep[] = [];

  for (const prov of ALL_77_PROVINCES) {
    if (prov.name === originProvince || prov.name === destinationProvince) continue;

    // Projection parameter t along segment A -> B
    const t =
      segLenSq > 0
        ? ((prov.longitude - originCoord.longitude) * dx +
            (prov.latitude - originCoord.latitude) * dy) /
          segLenSq
        : -1;

    if (t < 0.04 || t > 0.96) continue;

    // Closest point on straight segment A -> B
    const projLon = originCoord.longitude + t * dx;
    const projLat = originCoord.latitude + t * dy;
    const perpRoadKm = calculateRoadDistanceKm(
      prov.latitude,
      prov.longitude,
      projLat,
      projLon
    );

    const distFromOriginKm = calculateRoadDistanceKm(
      originCoord.latitude,
      originCoord.longitude,
      prov.latitude,
      prov.longitude
    );
    const distToDestinationKm = calculateRoadDistanceKm(
      prov.latitude,
      prov.longitude,
      destCoord.latitude,
      destCoord.longitude
    );
    const detourFromDirectKm = Number(
      Math.max(0, distFromOriginKm + distToDestinationKm - directKm).toFixed(1)
    );

    const stepObj: CorridorProvinceStep = {
      provinceName: prov.name,
      region: prov.region,
      role: 'transit',
      distFromOriginKm,
      distToDestinationKm,
      detourFromDirectKm,
      progressRatio: Number(t.toFixed(3)),
      latitude: prov.latitude,
      longitude: prov.longitude
    };

    candidateFallbacks.push(stepObj);

    // Corridor width threshold: wider for long curved routes (e.g. Southern Phetkasem highway)
    const maxCorridorWidthKm = Math.min(130, Math.max(52, directKm * 0.22));
    if (perpRoadKm <= maxCorridorWidthKm || detourFromDirectKm <= directKm * 0.18) {
      transitSteps.push(stepObj);
    }
  }

  // If no province matched strict corridor (e.g. short hop), pick up to 2 best intermediate provinces by lowest detour
  if (transitSteps.length === 0 && candidateFallbacks.length > 0) {
    candidateFallbacks.sort((a, b) => a.detourFromDirectKm - b.detourFromDirectKm);
    transitSteps.push(...candidateFallbacks.slice(0, 2));
  }

  // Sort transit provinces in travel order from A (t=0) to B (t=1)
  transitSteps.sort((a, b) => a.progressRatio - b.progressRatio);

  // Deduplicate very close parallel provinces so the route corridor stays clean (max 7 transit stops)
  const filteredTransit: CorridorProvinceStep[] = [];
  for (const step of transitSteps) {
    const prev = filteredTransit[filteredTransit.length - 1];
    if (prev && Math.abs(step.progressRatio - prev.progressRatio) < 0.055) {
      if (step.detourFromDirectKm < prev.detourFromDirectKm) {
        filteredTransit[filteredTransit.length - 1] = step;
      }
    } else {
      filteredTransit.push(step);
    }
  }

  return [
    {
      provinceName: originProvince,
      region: originInfo?.region || 'ภาคกลาง',
      role: 'origin',
      distFromOriginKm: 0,
      distToDestinationKm: directKm,
      detourFromDirectKm: 0,
      progressRatio: 0,
      latitude: originCoord.latitude,
      longitude: originCoord.longitude
    },
    ...filteredTransit.slice(0, 7),
    {
      provinceName: destinationProvince,
      region: destInfo?.region || 'ภาคกลาง',
      role: 'destination',
      distFromOriginKm: directKm,
      distToDestinationKm: 0,
      detourFromDirectKm: 0,
      progressRatio: 1,
      latitude: destCoord.latitude,
      longitude: destCoord.longitude
    }
  ];
}

export interface HotelRouteAnalysis {
  hotel: Hotel;
  stageRole: 'origin' | 'transit' | 'destination';
  distFromAKm: number;
  distFromBKm: number;
  totalRouteWithHotelKm: number; // A -> Hotel -> B
  directABKm: number; // A -> B directly
  detourKm: number; // Extra distance compared to direct A -> B
  distFromMidpointKm: number; // Distance from geographic midpoint of A and B
  driveFromAMins: number;
  driveToBMins: number;
  totalDriveMins: number;
}

/**
 * Evaluate and rank hotels based on their proximity to Point A, Point B, and the route A -> B
 */
export function analyzeHotelsAlongRoute(
  hotels: Hotel[],
  pointA: { latitude: number; longitude: number; province?: string },
  pointB: { latitude: number; longitude: number; province?: string },
  sortMode: 'route' | 'closest_a' | 'closest_b' | 'midpoint' = 'route'
): HotelRouteAnalysis[] {
  const directABKm = calculateRoadDistanceKm(
    pointA.latitude,
    pointA.longitude,
    pointB.latitude,
    pointB.longitude
  );

  // Use highway speed (~72 km/h) for inter-province distances (> 50 km), urban speed (~42 km/h) for intra-city
  const avgSpeedKmh = directABKm > 50 ? 72 : 42;

  const midLat = (pointA.latitude + pointB.latitude) / 2;
  const midLon = (pointA.longitude + pointB.longitude) / 2;

  const analyzed = hotels.map((hotel) => {
    const distFromAKm = calculateRoadDistanceKm(
      pointA.latitude,
      pointA.longitude,
      hotel.latitude,
      hotel.longitude
    );
    const distFromBKm = calculateRoadDistanceKm(
      hotel.latitude,
      hotel.longitude,
      pointB.latitude,
      pointB.longitude
    );
    const totalRouteWithHotelKm = Number((distFromAKm + distFromBKm).toFixed(1));
    const detourKm = Number(Math.max(0, totalRouteWithHotelKm - directABKm).toFixed(1));
    const distFromMidpointKm = calculateRoadDistanceKm(
      midLat,
      midLon,
      hotel.latitude,
      hotel.longitude
    );

    const driveFromAMins = Math.max(2, Math.round((distFromAKm / avgSpeedKmh) * 60));
    const driveToBMins = Math.max(2, Math.round((distFromBKm / avgSpeedKmh) * 60));
    const totalDriveMins = driveFromAMins + driveToBMins;

    let stageRole: 'origin' | 'transit' | 'destination' = 'destination';
    if (pointA.province && pointB.province && pointA.province !== pointB.province) {
      if (hotel.province === pointA.province) {
        stageRole = 'origin';
      } else if (hotel.province === pointB.province) {
        stageRole = 'destination';
      } else {
        stageRole = 'transit';
      }
    } else {
      stageRole = 'destination';
    }

    return {
      hotel,
      stageRole,
      distFromAKm,
      distFromBKm,
      totalRouteWithHotelKm,
      directABKm,
      detourKm,
      distFromMidpointKm,
      driveFromAMins,
      driveToBMins,
      totalDriveMins
    };
  });

  return analyzed.sort((a, b) => {
    if (sortMode === 'closest_a') return a.distFromAKm - b.distFromAKm;
    if (sortMode === 'closest_b') return a.distFromBKm - b.distFromBKm;
    if (sortMode === 'midpoint') return a.distFromMidpointKm - b.distFromMidpointKm;
    // Default 'route': shortest total route A -> Hotel -> B
    return a.totalRouteWithHotelKm - b.totalRouteWithHotelKm;
  });
}
