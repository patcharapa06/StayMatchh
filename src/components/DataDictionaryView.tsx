import React, { useState } from 'react';
import { 
  Database, 
  Table, 
  Search as SearchIcon, 
  Layers, 
  FileText,
  CheckCircle,
  Clock
} from 'lucide-react';
import { RECENT_CUSTOMER_SEARCHES } from '../data/mockData';

export const DataDictionaryView: React.FC = () => {
  const [activeTable, setActiveTable] = useState<'CUSTOMER' | 'HOTEL' | 'SEARCH' | 'ATTRACTION'>('SEARCH');

  return (
    <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border border-[#d6ce93]/70 shadow-xs mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#d6ce93]/40">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#d6ce93]/30 text-[#68684d] flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#353728]">
              พจนานุกรมข้อมูลและบันทึกประวัติการค้นหา (Data Dictionary & Query Logs)
            </h3>
          </div>
          <p className="text-xs text-[#767862] mt-1">
            โครงสร้างตารางฐานข้อมูลและบันทึกการคำนวณจริงตามสเปก Data Mining (Step 2 Data Understanding)
          </p>
        </div>

        {/* Table selector buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          {(['SEARCH', 'CUSTOMER', 'HOTEL', 'ATTRACTION'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTable(tab)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeTable === tab
                  ? 'bg-[#a3a380] text-white shadow-xs'
                  : 'bg-[#efebce]/50 text-[#434431] hover:bg-[#efebce] border border-[#d6ce93]/50'
              }`}
            >
              ตาราง {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Content */}
      <div className="mt-5 overflow-x-auto">
        {activeTable === 'SEARCH' && (
          <div>
            <div className="text-xs text-[#434431] mb-3 flex items-center justify-between">
              <span className="font-semibold text-[#353728]">
                ตาราง SEARCH — ข้อมูลการค้นหาและค่าที่ระบบคำนวณ (Distance, Budget_Diff, Facility_Match, Suitable)
              </span>
              <span className="text-[11px] text-[#767862]">8 รายการล่าสุด</span>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#efebce]/60 text-[#353728] font-semibold border-b border-[#d6ce93]/60">
                  <th className="p-2.5">Search_ID</th>
                  <th className="p-2.5">Customer_ID</th>
                  <th className="p-2.5">จังหวัด</th>
                  <th className="p-2.5">งบลูกค้า (Budget)</th>
                  <th className="p-2.5">สัตว์เลี้ยง</th>
                  <th className="p-2.5">Distance_KM</th>
                  <th className="p-2.5">Budget_Diff</th>
                  <th className="p-2.5">Facility_Match</th>
                  <th className="p-2.5">ผลลัพธ์ Suitable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d6ce93]/30 text-[#434431]">
                {RECENT_CUSTOMER_SEARCHES.map((item, idx) => (
                  <tr key={item.customerId} className="hover:bg-[#efebce]/20">
                    <td className="p-2.5 font-mono text-[#767862] font-medium">S0000{idx + 1}</td>
                    <td className="p-2.5 font-mono font-semibold text-[#353728]">{item.customerId}</td>
                    <td className="p-2.5 font-medium text-[#353728]">{item.province}</td>
                    <td className="p-2.5 font-semibold text-[#353728]">฿{item.budget.toLocaleString()}</td>
                    <td className="p-2.5">
                      {item.pet ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#d8a48f] text-white font-bold text-[10px]">
                          🐾 Yes ({item.petCount} ตัว)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-[#efebce] text-[#767862] text-[10px]">
                          No
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 font-mono">2.50 กม.</td>
                    <td className="p-2.5 font-mono text-[#683624] font-semibold">+300</td>
                    <td className="p-2.5 font-mono font-bold text-[#a3a380]">80.00%</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#efebce] text-[#353728] font-bold text-[11px] border border-[#d6ce93]">
                        1 (เหมาะสม)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTable === 'CUSTOMER' && (
          <div>
            <div className="text-xs text-[#434431] mb-3">
              <span className="font-semibold text-[#353728]">ตาราง CUSTOMER — ข้อมูลความต้องการของลูกค้า</span>
              <p className="text-[11px] text-[#767862]">เก็บคุณลักษณะผู้เข้าพัก: Customer_ID (PK), Budget, Guests, Pet, Preferred_Hotel_Type, Province, WiFi_Need, Parking_Need, Breakfast_Need, Pool_Need</p>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#efebce]/60 text-[#353728] font-semibold border-b border-[#d6ce93]/60">
                  <th className="p-2.5">Customer_ID</th>
                  <th className="p-2.5">งบประมาณ</th>
                  <th className="p-2.5">จำนวนคน</th>
                  <th className="p-2.5">สัตว์เลี้ยง</th>
                  <th className="p-2.5">ประเภทที่พัก</th>
                  <th className="p-2.5">จังหวัด</th>
                  <th className="p-2.5">Wi-Fi</th>
                  <th className="p-2.5">ที่จอดรถ</th>
                  <th className="p-2.5">อาหารเช้า</th>
                  <th className="p-2.5">สระว่ายน้ำ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d6ce93]/30 text-[#434431]">
                {RECENT_CUSTOMER_SEARCHES.map((cust) => (
                  <tr key={cust.customerId} className="hover:bg-[#efebce]/20">
                    <td className="p-2.5 font-mono font-bold text-[#353728]">{cust.customerId}</td>
                    <td className="p-2.5 font-semibold">฿{cust.budget.toLocaleString()}</td>
                    <td className="p-2.5">{cust.guests} คน</td>
                    <td className="p-2.5">{cust.pet ? 'Yes' : 'No'}</td>
                    <td className="p-2.5">{cust.preferredHotelType}</td>
                    <td className="p-2.5 font-medium">{cust.province}</td>
                    <td className="p-2.5">{cust.wifiNeed ? '✓ Yes' : 'No'}</td>
                    <td className="p-2.5">{cust.parkingNeed ? '✓ Yes' : 'No'}</td>
                    <td className="p-2.5">{cust.breakfastNeed ? '✓ Yes' : 'No'}</td>
                    <td className="p-2.5">{cust.poolNeed ? '✓ Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTable === 'HOTEL' && (
          <div>
            <div className="text-xs text-[#434431] mb-3">
              <span className="font-semibold text-[#353728]">ตาราง HOTEL — ข้อมูลที่พัก</span>
              <p className="text-[11px] text-[#767862]">Hotel_ID (PK), Hotel_Name, Hotel_Type, Province, District, Price, Capacity, Rating, Pet_Friendly, WiFi, Parking, Breakfast, Pool, Latitude, Longitude</p>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#efebce]/60 text-[#353728] font-semibold border-b border-[#d6ce93]/60">
                  <th className="p-2.5">Hotel_ID</th>
                  <th className="p-2.5">ชื่อที่พัก</th>
                  <th className="p-2.5">จังหวัด</th>
                  <th className="p-2.5">ราคา/คืน</th>
                  <th className="p-2.5">ความจุ</th>
                  <th className="p-2.5">คะแนน</th>
                  <th className="p-2.5">Pet_Friendly</th>
                  <th className="p-2.5">สระว่ายน้ำ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d6ce93]/30 text-[#434431]">
                <tr className="hover:bg-[#efebce]/20">
                  <td className="p-2.5 font-mono font-bold text-[#683624]">H00001</td>
                  <td className="p-2.5 font-semibold text-[#353728]">KKU Hotel & Pet Paradise</td>
                  <td className="p-2.5 font-medium">ขอนแก่น</td>
                  <td className="p-2.5 font-bold">฿1,200</td>
                  <td className="p-2.5">4 คน</td>
                  <td className="p-2.5 font-bold text-[#683624]">4.5</td>
                  <td className="p-2.5 font-bold text-[#a3a380]">Yes</td>
                  <td className="p-2.5 text-[#767862]">No</td>
                </tr>
                <tr className="hover:bg-[#efebce]/20">
                  <td className="p-2.5 font-mono font-bold text-[#767862]">H00002</td>
                  <td className="p-2.5 font-semibold text-[#353728]">Kaen Nakhon Lakeview Resort</td>
                  <td className="p-2.5 font-medium">ขอนแก่น</td>
                  <td className="p-2.5 font-bold">฿1,650</td>
                  <td className="p-2.5">4 คน</td>
                  <td className="p-2.5 font-bold text-[#683624]">4.7</td>
                  <td className="p-2.5 font-bold text-[#a3a380]">Yes</td>
                  <td className="p-2.5 font-bold text-[#a3a380]">Yes</td>
                </tr>
                <tr className="hover:bg-[#efebce]/20">
                  <td className="p-2.5 font-mono font-bold text-[#767862]">H00003</td>
                  <td className="p-2.5 font-semibold text-[#353728]">Nimman Paw Haven Boutique</td>
                  <td className="p-2.5 font-medium">เชียงใหม่</td>
                  <td className="p-2.5 font-bold">฿1,800</td>
                  <td className="p-2.5">2 คน</td>
                  <td className="p-2.5 font-bold text-[#683624]">4.8</td>
                  <td className="p-2.5 font-bold text-[#a3a380]">Yes</td>
                  <td className="p-2.5 font-bold text-[#a3a380]">Yes</td>
                </tr>
                <tr className="hover:bg-[#efebce]/20">
                  <td className="p-2.5 font-mono font-bold text-[#767862]">H00004</td>
                  <td className="p-2.5 font-semibold text-[#353728]">Sukhumvit Tails Executive Hotel</td>
                  <td className="p-2.5 font-medium">กรุงเทพมหานคร</td>
                  <td className="p-2.5 font-bold">฿2,400</td>
                  <td className="p-2.5">3 คน</td>
                  <td className="p-2.5 font-bold text-[#683624]">4.6</td>
                  <td className="p-2.5 font-bold text-[#a3a380]">Yes</td>
                  <td className="p-2.5 font-bold text-[#a3a380]">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTable === 'ATTRACTION' && (
          <div>
            <div className="text-xs text-[#434431] mb-3">
              <span className="font-semibold text-[#353728]">ตาราง ATTRACTION — ข้อมูลสถานที่ท่องเที่ยว</span>
              <p className="text-[11px] text-[#767862]">Attraction_ID (PK), Attraction_Name, Attraction_Type, Province, District, Latitude, Longitude</p>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#efebce]/60 text-[#353728] font-semibold border-b border-[#d6ce93]/60">
                  <th className="p-2.5">Attraction_ID</th>
                  <th className="p-2.5">ชื่อสถานที่ท่องเที่ยว</th>
                  <th className="p-2.5">ประเภท</th>
                  <th className="p-2.5">จังหวัด</th>
                  <th className="p-2.5">อำเภอ</th>
                  <th className="p-2.5">พิกัด Lat, Long</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d6ce93]/30 text-[#434431]">
                <tr className="hover:bg-[#efebce]/20">
                  <td className="p-2.5 font-mono font-bold text-[#683624]">A00001</td>
                  <td className="p-2.5 font-semibold text-[#353728]">บึงแก่นนคร</td>
                  <td className="p-2.5">ธรรมชาติ / สวนสาธารณะ</td>
                  <td className="p-2.5 font-medium">ขอนแก่น</td>
                  <td className="p-2.5">เมือง</td>
                  <td className="p-2.5 font-mono text-[#767862]">16.4269, 102.8355</td>
                </tr>
                <tr className="hover:bg-[#efebce]/20">
                  <td className="p-2.5 font-mono font-bold text-[#767862]">A00002</td>
                  <td className="p-2.5 font-semibold text-[#353728]">วัดหนองแวง พระอารามหลวง</td>
                  <td className="p-2.5">วัฒนธรรม / ศาสนา</td>
                  <td className="p-2.5 font-medium">ขอนแก่น</td>
                  <td className="p-2.5">เมือง</td>
                  <td className="p-2.5 font-mono text-[#767862]">16.4150, 102.8368</td>
                </tr>
                <tr className="hover:bg-[#efebce]/20">
                  <td className="p-2.5 font-mono font-bold text-[#767862]">A00003</td>
                  <td className="p-2.5 font-semibold text-[#353728]">ดอยสุเทพ</td>
                  <td className="p-2.5">ธรรมชาติ / วัฒนธรรม</td>
                  <td className="p-2.5 font-medium">เชียงใหม่</td>
                  <td className="p-2.5">เมืองเชียงใหม่</td>
                  <td className="p-2.5 font-mono text-[#767862]">18.8049, 98.9216</td>
                </tr>
                <tr className="hover:bg-[#efebce]/20">
                  <td className="p-2.5 font-mono font-bold text-[#767862]">A00004</td>
                  <td className="p-2.5 font-semibold text-[#353728]">หาดหัวหิน</td>
                  <td className="p-2.5">ชายหาด / ธรรมชาติ</td>
                  <td className="p-2.5 font-medium">ประจวบคีรีขันธ์</td>
                  <td className="p-2.5">หัวหิน</td>
                  <td className="p-2.5 font-mono text-[#767862]">12.5684, 99.9577</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
