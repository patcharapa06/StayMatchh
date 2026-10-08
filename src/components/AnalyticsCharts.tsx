import React from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ComposedChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Sparkles, 
  Building2, 
  Award,
  ArrowUpRight
} from 'lucide-react';
import { MONTHLY_TREND_DATA } from '../data/mockData';

interface AnalyticsChartsProps {
  selectedProvince: string;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ selectedProvince }) => {
  // Color palette: #a93f3f (Primary) and #d2af91 (Secondary) + tonal accents
  const COLOR_PRIMARY = '#a93f3f';
  const COLOR_SECONDARY = '#d2af91';
  const COLOR_DARK = '#8c3232';
  const COLOR_MUTED = '#b89270';
  const COLOR_LIGHT = '#e8d7c6';

  // Chart 2: Pet vs Non-Pet accommodation proportion (Donut Chart - Circle #1)
  const petFriendlyProportionData = [
    { name: 'ที่พักรับสัตว์เลี้ยง (Pet-Friendly)', value: 68, color: COLOR_PRIMARY, count: '1,428 แห่ง' },
    { name: 'ที่พักที่สัตว์พักไม่ได้ (Non Pet-Friendly)', value: 32, color: COLOR_SECONDARY, count: '672 แห่ง' },
  ];

  // Chart 3: Top Provinces
  const topProvincesData = [
    { province: 'ขอนแก่น (KKU)', searches: 9400, petRatio: 92, avgPrice: 1350 },
    { province: 'เชียงใหม่', searches: 8850, petRatio: 88, avgPrice: 1800 },
    { province: 'กรุงเทพมหานคร', searches: 8600, petRatio: 78, avgPrice: 2400 },
    { province: 'ชลบุรี/พัทยา', searches: 7900, petRatio: 85, avgPrice: 1950 },
    { province: 'ประจวบฯ/หัวหิน', searches: 7400, petRatio: 95, avgPrice: 2900 },
    { province: 'นครราชสีมา/เขาใหญ่', searches: 6800, petRatio: 90, avgPrice: 2100 },
    { province: 'ภูเก็ต', searches: 5900, petRatio: 74, avgPrice: 3200 },
  ];

  // Chart 4: Pet Types Breakdown (Pie Chart - Circle #2)
  const petTypeShareData = [
    { name: 'สุนัขพันธุ์เล็ก (< 10 กก.)', value: 42, color: COLOR_PRIMARY },
    { name: 'แมวทุกสายพันธุ์', value: 31, color: COLOR_SECONDARY },
    { name: 'สุนัขพันธุ์ใหญ่ (> 10 กก.)', value: 22, color: COLOR_DARK },
    { name: 'สัตว์เลี้ยงพิเศษ (Exotic)', value: 5, color: COLOR_LIGHT },
  ];

  // Chart 5: Price Seasonality Trend (Continuous Line Chart)
  const priceSeasonalityData = [
    { month: 'ม.ค.', petPrice: 1850, normalPrice: 1650 },
    { month: 'ก.พ.', petPrice: 1900, normalPrice: 1680 },
    { month: 'มี.ค.', petPrice: 2050, normalPrice: 1720 },
    { month: 'เม.ย.', petPrice: 2500, normalPrice: 2100 },
    { month: 'พ.ค.', petPrice: 1950, normalPrice: 1690 },
    { month: 'มิ.ย.', petPrice: 1880, normalPrice: 1620 },
    { month: 'ก.ค.', petPrice: 2100, normalPrice: 1780 },
    { month: 'ส.ค.', petPrice: 2150, normalPrice: 1820 },
    { month: 'ก.ย.', petPrice: 2200, normalPrice: 1850 },
    { month: 'ต.ค.', petPrice: 2350, normalPrice: 1980 },
    { month: 'พ.ย.', petPrice: 2600, normalPrice: 2200 },
    { month: 'ธ.ค.', petPrice: 2850, normalPrice: 2450 },
  ];

  // Chart 6: Accommodation Types Share (Donut Chart - Circle #3)
  const hotelTypeShareData = [
    { name: 'โรงแรม (Hotel)', value: 38, color: COLOR_PRIMARY },
    { name: 'รีสอร์ท (Resort)', value: 27, color: COLOR_SECONDARY },
    { name: 'พูลวิลล่า (Villa)', value: 18, color: COLOR_DARK },
    { name: 'บูทีค (Boutique)', value: 11, color: COLOR_MUTED },
    { name: 'โฮมสเตย์ (Homestay)', value: 6, color: COLOR_LIGHT },
  ];

  // Chart 7: Amenities Demand Breakdown
  const facilityDemandData = [
    { facility: 'Wi-Fi 1Gbps', demand: 98, petFriendlyPct: 96, nonPetPct: 99 },
    { facility: 'ที่จอดรถส่วนตัว', demand: 94, petFriendlyPct: 95, nonPetPct: 92 },
    { facility: 'สนามหญ้า/Pet Area', demand: 89, petFriendlyPct: 88, nonPetPct: 15 },
    { facility: 'อาหารเช้าบุฟเฟต์', demand: 76, petFriendlyPct: 74, nonPetPct: 82 },
    { facility: 'สระว่ายน้ำ', demand: 65, petFriendlyPct: 62, nonPetPct: 70 },
  ];

  // Chart 8: Regional Budget Spread (Stacked Bar)
  const regionalBudgetData = [
    { region: 'อีสาน', under1500: 45, b1500to3000: 42, over3000: 13 },
    { region: 'เหนือ', under1500: 32, b1500to3000: 48, over3000: 20 },
    { region: 'กลาง', under1500: 25, b1500to3000: 50, over3000: 25 },
    { region: 'ใต้', under1500: 18, b1500to3000: 46, over3000: 36 },
    { region: 'ตะวันออก', under1500: 22, b1500to3000: 52, over3000: 26 },
  ];

  // Chart 9: Model Accuracy vs Customer Satisfaction (Continuous Multi-Line)
  const quarterlySatisfactionData = [
    { quarter: 'Q1 2025', accuracy: 89.2, satisfaction: 90.5, bookings: 3200 },
    { quarter: 'Q2 2025', accuracy: 90.8, satisfaction: 91.8, bookings: 3850 },
    { quarter: 'Q3 2025', accuracy: 91.5, satisfaction: 92.4, bookings: 4300 },
    { quarter: 'Q4 2025', accuracy: 92.7, satisfaction: 93.6, bookings: 5100 },
    { quarter: 'Q1 2026', accuracy: 93.4, satisfaction: 94.8, bookings: 5600 },
    { quarter: 'Q2 2026', accuracy: 94.2, satisfaction: 96.2, bookings: 6450 },
  ];

  // Chart 10: Radar Readiness Dimensions (Spider Chart)
  const radarDimensionsData = [
    { dimension: 'สุขอนามัย/ปลอดกลิ่น', petFriendlyScore: 92, nonPetScore: 98 },
    { dimension: 'ความคุ้มค่าราคา', petFriendlyScore: 94, nonPetScore: 88 },
    { dimension: 'ทำเลใกล้ที่เที่ยว', petFriendlyScore: 90, nonPetScore: 91 },
    { dimension: 'การบริการและความใส่ใจ', petFriendlyScore: 96, nonPetScore: 93 },
    { dimension: 'สิ่งอำนวยความสะดวก', petFriendlyScore: 89, nonPetScore: 94 },
  ];

  // Chart 11: Bookings Volume vs Occupancy Rate (Composed Bar + Line)
  const bookingsVsOccupancyData = [
    { month: 'ม.ค.', bookings: 1240, occupancy: 72 },
    { month: 'ก.พ.', bookings: 1380, occupancy: 75 },
    { month: 'มี.ค.', bookings: 1520, occupancy: 79 },
    { month: 'เม.ย.', bookings: 2150, occupancy: 94 },
    { month: 'พ.ค.', bookings: 1610, occupancy: 80 },
    { month: 'มิ.ย.', bookings: 1540, occupancy: 78 },
    { month: 'ก.ค.', bookings: 1790, occupancy: 83 },
    { month: 'ส.ค.', bookings: 1850, occupancy: 85 },
    { month: 'ก.ย.', bookings: 1980, occupancy: 88 },
  ];

  // Chart 12: Rating Comparison by Accommodation Type
  const ratingComparisonData = [
    { type: 'พูลวิลล่า', petRating: 4.88, nonPetRating: 4.82 },
    { type: 'รีสอร์ท', petRating: 4.76, nonPetRating: 4.79 },
    { type: 'โรงแรมหรู', petRating: 4.62, nonPetRating: 4.78 },
    { type: 'บูทีค', petRating: 4.80, nonPetRating: 4.72 },
    { type: 'โฮมสเตย์', petRating: 4.68, nonPetRating: 4.60 },
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* ================= EXECUTIVE SCORECARD MATRIX ================= */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#d2af91]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d2af91]/25 text-[#a93f3f] text-xs font-bold mb-1 border border-[#d2af91]/40">
              <Award className="w-3.5 h-3.5 text-[#a93f3f]" />
              สกอการ์ดวัดผลผู้บริหาร (Executive Scorecards)
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2b2320]">
              แดชบอร์ดภาพรวมสถิติและแผนภาพข้อมูล 12 มิติ
            </h2>
            <p className="text-xs text-[#6b5c54]">
              ครอบคลุมทั้งแผนภาพวงกลม (Circle), แนวโน้มต่อเนื่อง (Continuous), สกอการ์ด (Scorecards) และการวิเคราะห์เปรียบเทียบ
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-[#fbf7f4] text-[#2b2320] border border-[#d2af91]/50 self-start sm:self-auto">
            ไตรมาส Q3 2026 • 77 จังหวัด
          </span>
        </div>

        {/* 4 Executive Scorecards - Solid Flat Styling (No Gradients) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Scorecard 1: Market Volume */}
          <div className="bg-white p-4 rounded-2xl border border-[#d2af91]/60 flex flex-col justify-between shadow-2xs hover:border-[#a93f3f] transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6b5c54]">
                <span className="font-semibold uppercase tracking-wider">มูลค่าตลาดการท่องเที่ยว</span>
                <span className="p-1 rounded-lg bg-[#d2af91]/30 text-[#a93f3f]"><TrendingUp className="w-3.5 h-3.5" /></span>
              </div>
              <div className="text-2xl font-black text-[#2b2320] mt-2">฿8,450 ล้าน</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[#d2af91]/30">
              <span className="text-[#a93f3f] font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +28.4% YoY
              </span>
              <span className="text-[#6b5c54]">เป้าหมาย ฿8,000M</span>
            </div>
          </div>

          {/* Scorecard 2: AI Matching Accuracy */}
          <div className="bg-white p-4 rounded-2xl border border-[#d2af91]/60 flex flex-col justify-between shadow-2xs hover:border-[#a93f3f] transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6b5c54]">
                <span className="font-semibold uppercase tracking-wider">ความแม่นยำ AI Matching</span>
                <span className="p-1 rounded-lg bg-[#a93f3f]/15 text-[#a93f3f]"><Sparkles className="w-3.5 h-3.5" /></span>
              </div>
              <div className="text-2xl font-black text-[#2b2320] mt-2">94.2%</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[#d2af91]/30">
              <span className="text-[#a93f3f] font-bold">Random Forest Model</span>
              <span className="text-emerald-700 font-bold">ผ่านเกณฑ์ SLA</span>
            </div>
          </div>

          {/* Scorecard 3: Pet vs Non-Pet Coverage */}
          <div className="bg-white p-4 rounded-2xl border border-[#d2af91]/60 flex flex-col justify-between shadow-2xs hover:border-[#a93f3f] transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6b5c54]">
                <span className="font-semibold uppercase tracking-wider">สัดส่วนที่พักในระบบ</span>
                <span className="p-1 rounded-lg bg-[#d2af91]/30 text-[#2b2320]"><Building2 className="w-3.5 h-3.5" /></span>
              </div>
              <div className="text-2xl font-black text-[#2b2320] mt-2">68% / 32%</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[#d2af91]/30">
              <span className="text-[#a93f3f] font-bold">🐾 รับสัตว์ 68%</span>
              <span className="text-[#6b5c54] font-bold">🚫 สัตว์พักไม่ได้ 32%</span>
            </div>
          </div>

          {/* Scorecard 4: Overall Satisfaction */}
          <div className="bg-white p-4 rounded-2xl border border-[#d2af91]/60 flex flex-col justify-between shadow-2xs hover:border-[#a93f3f] transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6b5c54]">
                <span className="font-semibold uppercase tracking-wider">ดัชนีความพึงพอใจเฉลี่ย</span>
                <span className="p-1 rounded-lg bg-[#fbf7f4] text-[#a93f3f] border border-[#d2af91]/50"><Award className="w-3.5 h-3.5" /></span>
              </div>
              <div className="text-2xl font-black text-[#2b2320] mt-2">4.86 / 5.0</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[#d2af91]/30">
              <span className="text-[#a93f3f] font-bold">★ ยอดเยี่ยม (Excellent)</span>
              <span className="text-[#6b5c54]">2,450+ รีวิว</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 10+ DATA DIAGRAMS GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* DIAGRAM 1: Continuous Area Trend (แผนภาพต่อเนื่อง 1) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white font-bold text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-base text-[#2b2320]">
                  แผนภาพเส้นต่อเนื่อง: ปริมาณนักท่องเที่ยวสัตว์เลี้ยง vs นักท่องเที่ยวทั่วไป (Continuous Area)
                </h3>
              </div>
              <p className="text-xs text-[#6b5c54] mt-0.5">
                การเติบโตรายเดือนเปรียบเทียบอัตราการเติบโตของกลุ่มนำสัตว์เลี้ยง (+28% YoY)
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#fbf7f4] text-[#2b2320] border border-[#d2af91]/40">
              Area Chart
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0e9e1" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b5c54' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6b5c54' }} />
                <Tooltip contentStyle={{ backgroundColor: '#2b2320', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Legend verticalAlign="top" height={36} formatter={(val) => val === 'petTravelers' ? '🐾 นักท่องเที่ยวพร้อมสัตว์เลี้ยง' : '👤 นักท่องเที่ยวทั่วไป'} />
                {/* Flat solid fills without gradient */}
                <Area type="monotone" dataKey="petTravelers" stroke={COLOR_PRIMARY} strokeWidth={2.5} fill={COLOR_PRIMARY} fillOpacity={0.25} />
                <Area type="monotone" dataKey="normalTravelers" stroke={COLOR_SECONDARY} strokeWidth={2} fill={COLOR_SECONDARY} fillOpacity={0.25} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DIAGRAM 2: Donut Circle Chart #1 (แผนภาพวงกลม 1) - Pet vs Non-Pet */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="font-bold text-base text-[#2b2320]">
                แผนภาพวงกลม: สัดส่วนที่พักรับสัตว์ vs ไม่รับสัตว์ (Circle Donut)
              </h3>
            </div>
            <p className="text-xs text-[#6b5c54] mb-2">
              ครอบคลุมทั้งกลุ่มลูกค้าทั่วไปและกลุ่มคนรักสัตว์เลี้ยง
            </p>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={petFriendlyProportionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {petFriendlyProportionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => [`${val}%`, 'สัดส่วน']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-1.5 pt-2 border-t border-[#d2af91]/30 text-xs">
            {petFriendlyProportionData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#6b5c54]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <strong className="text-[#2b2320]">{item.value}% ({item.count})</strong>
              </div>
            ))}
          </div>
        </div>

        {/* DIAGRAM 3: Top Demanded Provinces (Horizontal Bar) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white font-bold text-xs flex items-center justify-center">3</span>
            <h3 className="font-bold text-base text-[#2b2320]">
              แผนภาพแท่ง: 7 จังหวัดที่มีปริมาณการค้นหาสูงสุด (Search Volume)
            </h3>
          </div>
          <p className="text-xs text-[#6b5c54] mb-3">
            ขอนแก่นเป็นพื้นที่ศึกษานำร่อง (Pilot Project) มีอัตราความต้องการสูงสุด
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProvincesData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0e9e1" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#6b5c54' }} />
                <YAxis type="category" dataKey="province" tick={{ fontSize: 10, fill: '#2b2320' }} width={85} />
                <Tooltip formatter={(val: any) => [`${val.toLocaleString()} ครั้ง`, 'จำนวนการค้นหา']} />
                <Bar dataKey="searches" radius={[0, 8, 8, 0]}>
                  {topProvincesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.province.includes('ขอนแก่น') ? COLOR_PRIMARY : COLOR_SECONDARY} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DIAGRAM 4: Pet Types Share (Pie Chart - Circle #2) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white font-bold text-xs flex items-center justify-center">4</span>
            <h3 className="font-bold text-base text-[#2b2320]">
              แผนภาพวงกลม: สัดส่วนประเภทสัตว์เลี้ยงของผู้เข้าพัก (Circle Pie)
            </h3>
          </div>
          <p className="text-xs text-[#6b5c54] mb-3">
            สุนัขพันธุ์เล็กครองสัดส่วนสูงสุด ตามด้วยแมว และสุนัขพันธุ์ใหญ่
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={petTypeShareData} cx="50%" cy="50%" outerRadius={75} dataKey="value">
                    {petTypeShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => [`${val}%`, 'ส่วนแบ่ง']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 text-xs">
              {petTypeShareData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-[#fbf7f4] border border-[#d2af91]/30">
                  <span className="flex items-center gap-1.5 text-[#6b5c54]">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    {item.name}
                  </span>
                  <strong className="text-[#2b2320]">{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIAGRAM 5: Seasonality Price Trend (Continuous Line) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white font-bold text-xs flex items-center justify-center">5</span>
                <h3 className="font-bold text-base text-[#2b2320]">
                  แผนภาพเส้นต่อเนื่อง: แนวโน้มราคาเฉลี่ยต่อคืนตลอดทั้งปี (Continuous Price Seasonality)
                </h3>
              </div>
              <p className="text-xs text-[#6b5c54] mt-0.5">
                เปรียบเทียบราคาเฉลี่ยห้องพัก Pet-Friendly vs ห้องพักทั่วไปตามฤดูกาลท่องเที่ยว
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#fbf7f4] text-[#2b2320] border border-[#d2af91]/40">
              Line Chart
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceSeasonalityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0e9e1" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b5c54' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6b5c54' }} domain={[1400, 3000]} />
                <Tooltip formatter={(val: any, name: string) => [`฿${Number(val).toLocaleString()}`, name === 'petPrice' ? 'ห้องพักรับสัตว์เลี้ยง' : 'ห้องพักทั่วไป']} />
                <Legend verticalAlign="top" height={36} formatter={(val) => val === 'petPrice' ? '🐾 ที่พักรับสัตว์เลี้ยง (บาท/คืน)' : '🏨 ที่พักทั่วไป (บาท/คืน)'} />
                <Line type="monotone" dataKey="petPrice" stroke={COLOR_PRIMARY} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="normalPrice" stroke={COLOR_SECONDARY} strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DIAGRAM 6: Accommodation Type Breakdown (Donut Circle #3) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white font-bold text-xs flex items-center justify-center">6</span>
              <h3 className="font-bold text-base text-[#2b2320]">
                แผนภาพวงกลม: สัดส่วนประเภทที่พักในระบบ (Circle Donut)
              </h3>
            </div>
            <p className="text-xs text-[#6b5c54] mb-2">
              แบ่งตามโรงแรม, รีสอร์ท, พูลวิลล่า, บูทีค, และโฮมสเตย์
            </p>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hotelTypeShareData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {hotelTypeShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => [`${val}%`, 'สัดส่วน']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-1 pt-2 border-t border-[#d2af91]/30 text-xs">
            {hotelTypeShareData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#6b5c54]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <strong className="text-[#2b2320]">{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>

        {/* DIAGRAM 7: Facilities Demand vs Availability (Bar Chart) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white font-bold text-xs flex items-center justify-center">7</span>
            <h3 className="font-bold text-base text-[#2b2320]">
              แผนภาพแท่ง: อัตราความต้องการสิ่งอำนวยความสะดวก (Facility Demand %)
            </h3>
          </div>
          <p className="text-xs text-[#6b5c54] mb-3">
            เปรียบเทียบสิ่งอำนวยความสะดวกที่ลูกค้าเรียกร้องสูงสุด
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilityDemandData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0e9e1" />
                <XAxis dataKey="facility" tick={{ fontSize: 10, fill: '#6b5c54' }} />
                <YAxis tick={{ fontSize: 10, fill: '#6b5c54' }} domain={[0, 100]} />
                <Tooltip formatter={(val: any) => [`${val}%`, 'ความต้องการ']} />
                <Legend verticalAlign="top" height={36} formatter={() => 'เปอร์เซ็นต์ความต้องการ'} />
                <Bar dataKey="demand" fill={COLOR_PRIMARY} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DIAGRAM 8: Regional Budget Spread (Stacked Bar) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white font-bold text-xs flex items-center justify-center">8</span>
            <h3 className="font-bold text-base text-[#2b2320]">
              แผนภาพแท่งสแต็ก: ช่วงงบประมาณลูกค้าจำแนกตามภูมิภาค (Stacked Bar)
            </h3>
          </div>
          <p className="text-xs text-[#6b5c54] mb-3">
            สัดส่วนผู้ค้นหาตามช่วงงบประมาณ ต่ำกว่า 1,500 บ. / 1,500-3,000 บ. / เกิน 3,000 บ.
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalBudgetData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0e9e1" />
                <XAxis dataKey="region" tick={{ fontSize: 11, fill: '#6b5c54' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6b5c54' }} />
                <Tooltip formatter={(val: any) => [`${val}%`, 'สัดส่วน']} />
                <Legend verticalAlign="top" height={36} formatter={(val) => val === 'under1500' ? '< 1,500 บาท' : val === 'b1500to3000' ? '1,500 - 3,000 บาท' : '> 3,000 บาท'} />
                <Bar dataKey="under1500" stackId="a" fill={COLOR_LIGHT} />
                <Bar dataKey="b1500to3000" stackId="a" fill={COLOR_SECONDARY} />
                <Bar dataKey="over3000" stackId="a" fill={COLOR_PRIMARY} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DIAGRAM 9: Accuracy vs Customer Satisfaction (Continuous Multi-Line) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white font-bold text-xs flex items-center justify-center">9</span>
            <h3 className="font-bold text-base text-[#2b2320]">
              แผนภาพเส้นต่อเนื่อง: ความแม่นยำ AI vs อัตราความพึงพอใจ (Continuous Line)
            </h3>
          </div>
          <p className="text-xs text-[#6b5c54] mb-3">
            วัดผลการปรับปรุงโมเดล Random Forest และความพึงพอใจลูกค้ารายไตรมาส
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quarterlySatisfactionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0e9e1" />
                <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#6b5c54' }} />
                <YAxis tick={{ fontSize: 10, fill: '#6b5c54' }} domain={[85, 100]} />
                <Tooltip formatter={(val: any) => [`${val}%`, '']} />
                <Legend verticalAlign="top" height={36} formatter={(val) => val === 'accuracy' ? 'ความแม่นยำโมเดล (%)' : 'ความพึงพอใจ (%)'} />
                <Line type="monotone" dataKey="accuracy" stroke={COLOR_SECONDARY} strokeWidth={2.5} />
                <Line type="monotone" dataKey="satisfaction" stroke={COLOR_PRIMARY} strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DIAGRAM 10: Radar Readiness Dimensions (Spider Chart) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white font-bold text-xs flex items-center justify-center">10</span>
            <h3 className="font-bold text-base text-[#2b2320]">
              แผนภาพเรดาร์: ดัชนีศักยภาพความพร้อม 5 มิติ (Spider / Radar Chart)
            </h3>
          </div>
          <p className="text-xs text-[#6b5c54] mb-2">
            เปรียบเทียบที่พักรับสัตว์เลี้ยง vs ที่พักปลอดสัตว์เลี้ยงในมิติต่างๆ
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={80} data={radarDimensionsData}>
                <PolarGrid stroke="#f0e9e1" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 9, fill: '#2b2320' }} />
                <PolarRadiusAxis angle={30} domain={[60, 100]} tick={{ fontSize: 8 }} />
                <Radar name="🐾 ที่พักรับสัตว์เลี้ยง" dataKey="petFriendlyScore" stroke={COLOR_PRIMARY} fill={COLOR_PRIMARY} fillOpacity={0.4} />
                <Radar name="🚫 ที่พักปลอดสัตว์เลี้ยง" dataKey="nonPetScore" stroke={COLOR_SECONDARY} fill={COLOR_SECONDARY} fillOpacity={0.3} />
                <Legend verticalAlign="top" height={32} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DIAGRAM 11: Composed Chart (Bookings Volume vs Occupancy Rate %) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white font-bold text-xs flex items-center justify-center">11</span>
            <h3 className="font-bold text-base text-[#2b2320]">
              แผนภาพผสม: ปริมาณการจองสำเร็จ vs อัตราการเข้าพักเฉลี่ย (Composed Chart)
            </h3>
          </div>
          <p className="text-xs text-[#6b5c54] mb-3">
            แสดงจำนวนครั้งที่จองสำเร็จ (แท่ง) ควบคู่กับอัตรา Occupancy Rate % (เส้น)
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={bookingsVsOccupancyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0e9e1" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b5c54' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#6b5c54' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#6b5c54' }} domain={[50, 100]} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} formatter={(val) => val === 'bookings' ? 'จำนวนการจอง (ครั้ง)' : 'อัตราการเข้าพัก (%)'} />
                <Bar yAxisId="left" dataKey="bookings" fill={COLOR_SECONDARY} radius={[6, 6, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="occupancy" stroke={COLOR_PRIMARY} strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DIAGRAM 12: Rating Comparison by Accommodation Type */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white font-bold text-xs flex items-center justify-center">12</span>
            <h3 className="font-bold text-base text-[#2b2320]">
              แผนภาพแท่งกลุ่ม: เปรียบเทียบคะแนนรีวิวเฉลี่ย (Grouped Rating Comparison)
            </h3>
          </div>
          <p className="text-xs text-[#6b5c54] mb-3">
            เปรียบเทียบคะแนนรีวิวผู้เข้าพักระหว่างที่พักรับสัตว์เลี้ยง vs ที่พักปลอดสัตว์เลี้ยงในแต่ละหมวด
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingComparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0e9e1" />
                <XAxis dataKey="type" tick={{ fontSize: 11, fill: '#6b5c54' }} />
                <YAxis tick={{ fontSize: 10, fill: '#6b5c54' }} domain={[4.4, 5.0]} />
                <Tooltip formatter={(val: any) => [`${val} ดาว`, '']} />
                <Legend verticalAlign="top" height={36} formatter={(val) => val === 'petRating' ? '🐾 ที่พักรับสัตว์เลี้ยง' : '🚫 ที่พักปลอดสัตว์เลี้ยง'} />
                <Bar dataKey="petRating" fill={COLOR_PRIMARY} radius={[4, 4, 0, 0]} />
                <Bar dataKey="nonPetRating" fill={COLOR_SECONDARY} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
