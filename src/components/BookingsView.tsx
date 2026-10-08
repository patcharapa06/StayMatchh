import React, { useState } from 'react';
import { 
  Calendar, 
  Dog, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Download, 
  Trash2, 
  Sparkles,
  Search,
  Bed,
  User,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react';
import { BookingRecord } from '../types';

interface BookingsViewProps {
  bookings: BookingRecord[];
  onCancelBooking: (id: string) => void;
  onNavigateToMatching: () => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  bookings,
  onCancelBooking,
  onNavigateToMatching
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all');
  const [selectedBookingForSlip, setSelectedBookingForSlip] = useState<BookingRecord | null>(null);

  const filteredBookings = bookings.filter(b => {
    const matchSearch = b.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        b.province.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 mb-8">
      {/* Header Banner */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d2af91]/25 text-[#2b2320] text-xs font-bold mb-1.5 border border-[#d2af91]/40">
              <Calendar className="w-3.5 h-3.5 text-[#a93f3f]" />
              ระบบบริหารจัดการการจองที่พัก (Booking Management System)
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2b2320]">
              รายการจองห้องพักของฉัน ({bookings.length} รายการ)
            </h2>
            <p className="text-xs text-[#6b5c54] mt-1">
              ตรวจสอบสถานะการจอง พิมพ์ใบยืนยัน (Confirmation Slip) และรายละเอียดค่าใช้จ่าย
            </p>
          </div>

          <button
            onClick={onNavigateToMatching}
            className="px-4 py-2 rounded-xl bg-[#d2af91] hover:bg-[#b89270] text-[#2b2320] text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ จองห้องพักใหม่</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/95 rounded-2xl p-4 border border-[#d2af91]/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <input
            type="text"
            placeholder="ค้นหารหัสจอง, ชื่อโรงแรม, ชื่อผู้จอง..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#fbf7f4]/40 border border-[#d2af91]/50 rounded-xl text-xs text-[#2b2320] focus:ring-2 focus:ring-[#d2af91]"
          />
          <Search className="w-3.5 h-3.5 text-[#a93f3f] absolute left-2.5 top-2.5" />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#6b5c54] font-medium">สถานะ:</span>
          {[
            { id: 'all', label: 'ทั้งหมด' },
            { id: 'confirmed', label: '● ยืนยันแล้ว' },
            { id: 'cancelled', label: '✕ ยกเลิกแล้ว' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setStatusFilter(s.id as any)}
              className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                statusFilter === s.id
                  ? 'bg-[#d2af91] text-[#2b2320] shadow-xs'
                  : 'bg-[#fbf7f4]/50 text-[#6b5c54] border border-[#d2af91]/30 hover:bg-[#fbf7f4]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#d2af91]/40">
          <Calendar className="w-12 h-12 text-[#a93f3f]/40 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#2b2320]">ไม่พบรายการจองห้องพัก</h3>
          <p className="text-xs text-[#6b5c54] mt-1 mb-4">คุณยังไม่มีรายการจองตามเงื่อนไขที่ค้นหา</p>
          <button
            onClick={onNavigateToMatching}
            className="px-4 py-2 rounded-xl bg-[#d2af91] text-[#2b2320] text-xs font-bold cursor-pointer"
          >
            ค้นหาและจองที่พักเลย
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div 
              key={b.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs hover:border-[#d2af91] transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#d2af91]/30">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 mt-0.5 ${
                    b.hasPet ? 'bg-[#a93f3f]' : 'bg-[#a93f3f]'
                  }`}>
                    {b.hasPet ? <Dog className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-[#fbf7f4] px-2 py-0.5 rounded border border-[#d2af91]/40 text-[#2b2320]">
                        รหัสจอง: {b.bookingCode}
                      </span>
                      <span className="text-xs text-[#6b5c54]">จองเมื่อ: {b.createdAt}</span>
                      {b.status === 'confirmed' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                          ● ยืนยันการจองแล้ว
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[11px] font-bold border border-red-300">
                          ✕ ยกเลิกแล้ว
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#2b2320] mt-1">
                      {b.hotelName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#6b5c54] mt-0.5">
                      <MapPin className="w-3 h-3 text-[#a93f3f]" />
                      <span>อ.{b.district} จ.{b.province}</span>
                      <span>•</span>
                      <span className="font-semibold text-[#2b2320]">{b.roomType}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#6b5c54] block">ยอดชำระสุทธิ</span>
                  <span className="text-xl font-extrabold text-[#a93f3f]">
                    ฿{b.totalPrice.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#6b5c54] block">({b.nights} คืน รวมภาษีและบริการ)</span>
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 text-xs">
                <div className="bg-[#fbf7f4]/40 p-2.5 rounded-xl border border-[#d2af91]/30">
                  <span className="text-[10px] text-[#6b5c54] block">วันเช็คอิน</span>
                  <strong className="text-[#2b2320]">{b.checkInDate}</strong>
                </div>
                <div className="bg-[#fbf7f4]/40 p-2.5 rounded-xl border border-[#d2af91]/30">
                  <span className="text-[10px] text-[#6b5c54] block">วันเช็คเอาท์</span>
                  <strong className="text-[#2b2320]">{b.checkOutDate}</strong>
                </div>
                <div className="bg-[#fbf7f4]/40 p-2.5 rounded-xl border border-[#d2af91]/30">
                  <span className="text-[10px] text-[#6b5c54] block">ผู้เข้าพัก</span>
                  <strong className="text-[#2b2320]">{b.guestsCount} ท่าน</strong>
                </div>
                <div className="bg-[#fbf7f4]/40 p-2.5 rounded-xl border border-[#d2af91]/30">
                  <span className="text-[10px] text-[#6b5c54] block">สัตว์เลี้ยง</span>
                  <strong className={b.hasPet ? 'text-[#a93f3f]' : 'text-[#6b5c54]'}>
                    {b.hasPet ? `${b.petCount} ตัว (${b.petType || 'สุนัข'})` : '🚫 ปลอดสัตว์เลี้ยง'}
                  </strong>
                </div>
              </div>

              {/* Guest & Contact row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#d2af91]/30 text-xs">
                <div className="flex items-center gap-3 text-[#6b5c54]">
                  <span className="flex items-center gap-1 font-medium text-[#2b2320]">
                    <User className="w-3 h-3 text-[#a93f3f]" /> {b.guestName}
                  </span>
                  <span>•</span>
                  <span>{b.guestPhone}</span>
                  <span>•</span>
                  <span>{b.guestEmail}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedBookingForSlip(b)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#fbf7f4] text-[#2b2320] border border-[#d2af91] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  >
                    <Download className="w-3 h-3 text-[#a93f3f]" />
                    <span>พิมพ์ใบยืนยัน</span>
                  </button>

                  {b.status === 'confirmed' && (
                    <button
                      onClick={() => onCancelBooking(b.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>ยกเลิกการจอง</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slip Modal View */}
      {selectedBookingForSlip && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#d2af91] p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center pb-4 border-b border-[#d2af91]/40">
              <div className="w-12 h-12 rounded-2xl bg-[#d2af91] text-[#2b2320] flex items-center justify-center mx-auto mb-2 font-bold text-lg shadow-sm">
                SM
              </div>
              <h3 className="font-bold text-lg text-[#2b2320]">StayMatch Booking Confirmation Slip</h3>
              <p className="text-xs text-[#6b5c54]">ใบยืนยันการจองห้องพักอย่างเป็นทางการ</p>
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-[#fbf7f4] border border-[#d2af91] font-mono text-xs font-bold text-[#2b2320]">
                {selectedBookingForSlip.bookingCode}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-[#6b5c54]">ที่พัก:</span>
                <strong className="text-[#2b2320]">{selectedBookingForSlip.hotelName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-[#6b5c54]">ห้องพัก:</span>
                <strong className="text-[#2b2320]">{selectedBookingForSlip.roomType}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-[#6b5c54]">วันเช็คอิน - เช็คเอาท์:</span>
                <strong className="text-[#2b2320]">{selectedBookingForSlip.checkInDate} ถึง {selectedBookingForSlip.checkOutDate} ({selectedBookingForSlip.nights} คืน)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-[#6b5c54]">ผู้เข้าพัก / สัตว์เลี้ยง:</span>
                <strong className="text-[#2b2320]">{selectedBookingForSlip.guestsCount} ท่าน / {selectedBookingForSlip.hasPet ? `${selectedBookingForSlip.petCount} ตัว` : 'ไม่มีสัตว์เลี้ยง'}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-[#6b5c54]">ชื่อผู้จอง:</span>
                <strong className="text-[#2b2320]">{selectedBookingForSlip.guestName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-[#6b5c54]">เบอร์ติดต่อ:</span>
                <strong className="text-[#2b2320]">{selectedBookingForSlip.guestPhone}</strong>
              </div>
              <div className="flex justify-between py-2 pt-3 border-t border-[#d2af91]/50 text-sm">
                <span className="font-bold text-[#2b2320]">ยอดชำระรวม:</span>
                <span className="font-extrabold text-[#a93f3f] text-base">฿{selectedBookingForSlip.totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#d2af91] hover:bg-[#b89270] text-[#2b2320] text-xs font-bold cursor-pointer"
              >
                พิมพ์ใบเสร็จ
              </button>
              <button
                onClick={() => setSelectedBookingForSlip(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#2b2320] text-xs font-bold cursor-pointer"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
