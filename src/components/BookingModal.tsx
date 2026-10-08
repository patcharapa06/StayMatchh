import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Users,
  Dog,
  Building2,
  CheckCircle2,
  CreditCard,
  Bed,
  Download,
  Sparkles,
  User,
  Phone,
  Mail,
  SlidersHorizontal,
  Route,
  Check,
  MapPin,
  Compass
} from 'lucide-react';
import { Hotel, HotelRoom, BookingRecord, SharedSearchCriteria } from '../types';
import { getAttractionsForProvince } from '../data/attractions';

interface BookingModalProps {
  hotel: Hotel | null;
  selectedRoomType?: string;
  searchCriteria?: SharedSearchCriteria;
  onUpdateSearchCriteria?: (partial: Partial<SharedSearchCriteria>) => void;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (booking: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  hotel,
  selectedRoomType,
  searchCriteria,
  onUpdateSearchCriteria,
  isOpen,
  onClose,
  onConfirmBooking
}) => {
  // Determine best matching room from search criteria or explicit room type
  const getBestMatchingRoom = (targetHotel: Hotel): HotelRoom => {
    if (selectedRoomType) {
      const explicitRoom = targetHotel.rooms.find((r) => r.roomType === selectedRoomType);
      if (explicitRoom) return explicitRoom;
    }
    if (searchCriteria) {
      const fittingRooms = targetHotel.rooms.filter(
        (r) =>
          r.maxGuests >= searchCriteria.guests &&
          r.pricePerNight >= searchCriteria.minBudget &&
          r.pricePerNight <= searchCriteria.maxBudget
      );
      if (fittingRooms.length > 0) return fittingRooms[0];

      const guestFittingRooms = targetHotel.rooms.filter(
        (r) => r.maxGuests >= searchCriteria.guests
      );
      if (guestFittingRooms.length > 0) return guestFittingRooms[0];
    }
    return targetHotel.rooms[0];
  };

  const mapPetTypeLabel = (code?: 'dog' | 'cat' | 'all'): string => {
    if (code === 'cat') return 'แมว (Cat)';
    if (code === 'all') return 'สุนัขและแมว';
    return 'สุนัข (Dog)';
  };

  const buildAutoPulledSummaryNotes = (
    targetHotel: Hotel,
    criteria?: SharedSearchCriteria
  ): string => {
    if (!criteria) return '';
    const notes: string[] = [];

    if (criteria.originProvince && criteria.targetProvince) {
      if (
        criteria.selectedCorridorProvinceFilter &&
        criteria.selectedCorridorProvinceFilter !== 'all'
      ) {
        notes.push(
          `แวะพักจังหวัดทางผ่าน จ.${criteria.selectedCorridorProvinceFilter} (เส้นทาง จ.${criteria.originProvince} ➔ จ.${criteria.targetProvince})`
        );
      } else if (criteria.originProvince !== criteria.targetProvince) {
        notes.push(
          `เดินทางจาก จ.${criteria.originProvince} ➔ จ.${criteria.targetProvince}`
        );
      } else {
        notes.push(`เดินทางใน จ.${criteria.targetProvince}`);
      }
    }

    const reqFacilities: string[] = [];
    if (criteria.wifiNeed && targetHotel.wifi) reqFacilities.push('Wi-Fi ความเร็วสูง');
    if (criteria.parkingNeed && targetHotel.parking) reqFacilities.push('ที่จอดรถ');
    if (criteria.breakfastNeed && targetHotel.breakfast) reqFacilities.push('อาหารเช้า');
    if (criteria.poolNeed && targetHotel.pool) reqFacilities.push('สระว่ายน้ำ');

    if (reqFacilities.length > 0) {
      notes.push(`สิ่งอำนวยความสะดวกที่เลือกไว้: ${reqFacilities.join(', ')}`);
    }

    return notes.join(' • ');
  };

  // Auto-pulled fields (already selected during room search — no need to re-enter!)
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(
    hotel ? getBestMatchingRoom(hotel) : null
  );
  const [checkInDate, setCheckInDate] = useState(
    searchCriteria?.checkInDate || '2026-10-05'
  );
  const [checkOutDate, setCheckOutDate] = useState(
    searchCriteria?.checkOutDate || '2026-10-07'
  );
  const [guestsCount, setGuestsCount] = useState<number>(
    searchCriteria?.guests || 2
  );
  const [bringPet, setBringPet] = useState<boolean>(
    hotel ? hotel.petFriendly && (searchCriteria ? searchCriteria.pet : true) : false
  );
  const [petCount, setPetCount] = useState<number>(
    hotel && hotel.petFriendly
      ? searchCriteria
        ? searchCriteria.pet
          ? Math.max(1, searchCriteria.petCount)
          : 0
        : 1
      : 0
  );
  const [petType, setPetType] = useState<string>(
    mapPetTypeLabel(searchCriteria?.petType)
  );

  // Booker Contact Info (ตรงกดจองมีให้ใส่ข้อมูลผู้จอง — และถ้าเคยกรอกแล้วจะดึงมาให้ไม่ต้องกรอกซ้ำ)
  const [guestName, setGuestName] = useState(searchCriteria?.guestName || '');
  const [guestPhone, setGuestPhone] = useState(searchCriteria?.guestPhone || '');
  const [guestEmail, setGuestEmail] = useState(searchCriteria?.guestEmail || '');
  const [specialRequests, setSpecialRequests] = useState('');

  // Optional toggle if user ever wants to override the auto-pulled room search parameters
  const [showEditSearchParams, setShowEditSearchParams] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<BookingRecord | null>(null);

  // Sync automatically whenever hotel, selectedRoomType, or searchCriteria changes
  useEffect(() => {
    if (!hotel || !isOpen) return;
    setBookingSuccess(null);
    setShowEditSearchParams(false);
    setSelectedRoom(getBestMatchingRoom(hotel));
    setCheckInDate(searchCriteria?.checkInDate || '2026-10-05');
    setCheckOutDate(searchCriteria?.checkOutDate || '2026-10-07');
    setGuestsCount(searchCriteria?.guests || 2);

    const shouldBringPet =
      hotel.petFriendly && (searchCriteria ? searchCriteria.pet : true);
    setBringPet(shouldBringPet);
    setPetCount(
      shouldBringPet ? Math.max(1, searchCriteria?.petCount || 1) : 0
    );
    setPetType(mapPetTypeLabel(searchCriteria?.petType));

    // If booker info was already entered previously, pull it automatically so they don't have to re-type
    setGuestName(searchCriteria?.guestName || '');
    setGuestPhone(searchCriteria?.guestPhone || '');
    setGuestEmail(searchCriteria?.guestEmail || '');
    setSpecialRequests('');
  }, [hotel, selectedRoomType, isOpen, searchCriteria]);

  if (!isOpen || !hotel || !selectedRoom) return null;

  // Calculate nights
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  const calculatedNights = Math.max(
    1,
    Math.round(timeDiff / (1000 * 3600 * 24)) || 1
  );

  // Price calculations
  const pricePerNight = selectedRoom.pricePerNight;
  const roomTotal = pricePerNight * calculatedNights;
  const petFee =
    hotel.petFriendly && bringPet && petCount > 0
      ? petCount * 200 * calculatedNights
      : 0;
  const serviceTax = Math.round((roomTotal + petFee) * 0.07);
  const grandTotal = roomTotal + petFee + serviceTax;

  const autoPulledSummaryText = buildAutoPulledSummaryNotes(hotel, searchCriteria);
  const hasSavedBookerInfo = Boolean(
    searchCriteria?.guestName && searchCriteria?.guestPhone
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save booker info + any updated parameters into shared state so next booking pulls them automatically
    if (onUpdateSearchCriteria) {
      onUpdateSearchCriteria({
        checkInDate,
        checkOutDate,
        guests: guestsCount,
        pet: bringPet,
        petCount: bringPet ? petCount : 0,
        guestName,
        guestPhone,
        guestEmail
      });
    }

    const combinedSpecialRequests = [autoPulledSummaryText, specialRequests.trim()]
      .filter(Boolean)
      .join(' | ');

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: BookingRecord = {
      id: `BK_${Date.now()}`,
      bookingCode: `SM-2026-${randomSuffix}`,
      hotelId: hotel.hotelId,
      hotelName: hotel.hotelName,
      hotelType: hotel.hotelType,
      province: hotel.province,
      district: hotel.district,
      roomType: selectedRoom.roomType,
      checkInDate,
      checkOutDate,
      nights: calculatedNights,
      guestsCount,
      hasPet: hotel.petFriendly && bringPet,
      petCount: hotel.petFriendly && bringPet ? petCount : 0,
      petType: hotel.petFriendly && bringPet ? petType : undefined,
      pricePerNight,
      totalPrice: grandTotal,
      guestName,
      guestPhone,
      guestEmail,
      specialRequests: combinedSpecialRequests,
      status: 'confirmed',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setBookingSuccess(newBooking);
    onConfirmBooking(newBooking);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  if (!isOpen || !hotel) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-[#d2af91]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Flat solid styling without gradients */}
        <div className="px-6 py-4 border-b border-[#d2af91]/40 flex items-center justify-between bg-[#fbf7f4]">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs ${
                hotel.petFriendly ? 'bg-[#a93f3f]' : 'bg-[#d2af91] text-[#2b2320]'
              }`}
            >
              {hotel.petFriendly ? (
                <Dog className="w-5 h-5 text-white" />
              ) : (
                <Building2 className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-[#d2af91]/60 text-[#2b2320]">
                  {hotel.hotelType}
                </span>
                {hotel.petFriendly ? (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#d2af91]/30 text-[#a93f3f] border border-[#d2af91] flex items-center gap-1">
                    <Dog className="w-3 h-3 text-[#a93f3f]" /> Pet-Friendly
                  </span>
                ) : (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-300 flex items-center gap-1">
                    🚫 สัตว์ไม่สามารถพักได้ (Non Pet-Friendly)
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#2b2320] leading-tight mt-0.5">
                จองห้องพัก: {hotel.hotelName} (อ.{hotel.district} จ.{hotel.province})
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#fbf7f4] text-[#2b2320] flex items-center justify-center transition-colors cursor-pointer border border-[#d2af91]/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1">
          {bookingSuccess ? (
            /* Booking Confirmation Slip */
            <div className="space-y-5 animate-fadeIn">
              <div className="text-center py-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900">
                  ยืนยันการจองห้องพักสำเร็จ!
                </h3>
                <p className="text-xs text-emerald-700 mt-1">
                  รหัสการจอง:{' '}
                  <strong className="text-sm font-mono text-emerald-950">
                    {bookingSuccess.bookingCode}
                  </strong>
                </p>
                <p className="text-[11px] text-emerald-600">
                  ส่งใบยืนยันการจองไปยัง {bookingSuccess.guestEmail} เรียบร้อยแล้ว
                </p>
              </div>

              {/* Printable Confirmation Card */}
              <div className="bg-[#fbf7f4] rounded-2xl p-5 border border-[#d2af91]/60 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#d2af91]/40">
                  <div>
                    <span className="text-[11px] text-[#6b5c54] block">
                      โรงแรม / ที่พัก
                    </span>
                    <h4 className="font-bold text-[#2b2320] text-base">
                      {bookingSuccess.hotelName}
                    </h4>
                    <span className="text-xs text-[#6b5c54]">
                      อ.{bookingSuccess.district} จ.{bookingSuccess.province}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#6b5c54] block">
                      สถานะการจอง
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                      ● ชำระเงิน/ยืนยันแล้ว
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-[#d2af91]/40">
                    <span className="text-[10px] text-[#6b5c54] block">
                      วันเช็คอิน
                    </span>
                    <strong className="text-[#2b2320]">
                      {bookingSuccess.checkInDate}
                    </strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#d2af91]/40">
                    <span className="text-[10px] text-[#6b5c54] block">
                      วันเช็คเอาท์
                    </span>
                    <strong className="text-[#2b2320]">
                      {bookingSuccess.checkOutDate}
                    </strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#d2af91]/40">
                    <span className="text-[10px] text-[#6b5c54] block">
                      จำนวนคืน / ผู้เข้าพัก
                    </span>
                    <strong className="text-[#2b2320]">
                      {bookingSuccess.nights} คืน / {bookingSuccess.guestsCount} ท่าน
                    </strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#d2af91]/40">
                    <span className="text-[10px] text-[#6b5c54] block">
                      สัตว์เลี้ยง
                    </span>
                    <strong
                      className={
                        bookingSuccess.hasPet ? 'text-[#a93f3f]' : 'text-[#6b5c54]'
                      }
                    >
                      {bookingSuccess.hasPet
                        ? `${bookingSuccess.petCount} ตัว (${bookingSuccess.petType})`
                        : 'ไม่มีสัตว์เลี้ยง'}
                    </strong>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#d2af91]/40 text-xs space-y-1">
                  <div className="flex justify-between text-[#6b5c54]">
                    <span>ประเภทห้องพัก:</span>
                    <strong className="text-[#2b2320]">
                      {bookingSuccess.roomType}
                    </strong>
                  </div>
                  <div className="flex justify-between text-[#6b5c54]">
                    <span>ชื่อผู้จอง:</span>
                    <strong className="text-[#2b2320]">
                      {bookingSuccess.guestName}
                    </strong>
                  </div>
                  <div className="flex justify-between text-[#6b5c54]">
                    <span>เบอร์โทรศัพท์:</span>
                    <strong className="text-[#2b2320]">
                      {bookingSuccess.guestPhone}
                    </strong>
                  </div>
                  <div className="flex justify-between text-[#6b5c54]">
                    <span>อีเมล:</span>
                    <strong className="text-[#2b2320]">
                      {bookingSuccess.guestEmail}
                    </strong>
                  </div>
                  {bookingSuccess.specialRequests && (
                    <div className="flex justify-between gap-2 text-[#6b5c54] pt-1 border-t border-stone-100">
                      <span className="shrink-0">รายละเอียดการเดินทาง/คำขอ:</span>
                      <span className="text-[#2b2320] text-right">
                        {bookingSuccess.specialRequests}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#d2af91]/40 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#2b2320]">
                    ยอดชำระสุทธิ (รวมภาษี):
                  </span>
                  <span className="text-xl font-extrabold text-[#a93f3f]">
                    ฿{bookingSuccess.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#fbf7f4] text-[#2b2320] border border-[#d2af91] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#a93f3f]" />
                  <span>พิมพ์ / บันทึกใบยืนยัน (Slip)</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-[#a93f3f] hover:bg-[#8c3232] text-white text-xs font-bold cursor-pointer shadow-xs"
                >
                  เสร็จสิ้น
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* SECTION 1: ข้อมูลที่มีแล้ว ดึงมาจากตอนเลือกหาห้องพักอัตโนมัติ (ไม่ต้องกรอกใหม่) */}
              <div className="bg-emerald-50/70 rounded-2xl p-4 border-2 border-emerald-300 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-emerald-950 block">
                        1. ข้อมูลที่มีแล้วจากตอนเลือกหาห้องพัก (ดึงมาให้อัตโนมัติ ไม่ต้องกรอกใหม่)
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEditSearchParams(!showEditSearchParams)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold flex items-center gap-1 shrink-0 cursor-pointer self-start sm:self-center"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>
                      {showEditSearchParams
                        ? 'ล็อกค่าตามที่ค้นหา'
                        : 'เปลี่ยนวัน/จำนวนคน/ห้อง'}
                    </span>
                  </button>
                </div>

                {/* Auto-pulled items badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3 h-3 text-emerald-700" /> ห้องพักที่เลือกไว้
                      </span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-bold">
                        ดึงมาแล้ว
                      </span>
                    </span>
                    <strong className="text-[#2e2938] block mt-1 truncate">
                      {selectedRoom.roomType}
                    </strong>
                    <span className="text-[10px] text-[#a93f3f] font-bold">
                      ฿{selectedRoom.pricePerNight.toLocaleString()}/คืน ({selectedRoom.bedType})
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-700" /> วันเข้าพัก
                      </span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-bold">
                        ดึงมาแล้ว
                      </span>
                    </span>
                    <strong className="text-[#2b2320] block mt-1">
                      {checkInDate} ➔ {checkOutDate}
                    </strong>
                    <span className="text-[10px] text-emerald-700 font-bold">
                      รวม {calculatedNights} คืน
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-emerald-700" /> ผู้เข้าพัก
                      </span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-bold">
                        ดึงมาแล้ว
                      </span>
                    </span>
                    <strong className="text-[#2b2320] block mt-1 text-sm">
                      {guestsCount} ท่าน
                    </strong>
                    <span className="text-[10px] text-[#6b5c54]">
                      รองรับสูงสุด {selectedRoom.maxGuests} ท่าน
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Dog className="w-3 h-3 text-[#a93f3f]" /> สัตว์เลี้ยง
                      </span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-bold">
                        ดึงมาแล้ว
                      </span>
                    </span>
                    <strong
                      className={`block mt-1 ${
                        hotel.petFriendly && bringPet
                          ? 'text-[#a93f3f]'
                          : 'text-[#6b5c54]'
                      }`}
                    >
                      {hotel.petFriendly && bringPet
                        ? `${petCount} ตัว (${petType})`
                        : 'ไม่มีสัตว์เลี้ยง'}
                    </strong>
                    <span className="text-[10px] text-[#5c546b]">
                      {hotel.petFriendly ? 'Pet-Friendly' : 'ปลอดสัตว์เลี้ยง'}
                    </span>
                  </div>
                </div>

                {/* Pulled Route & Facility Info */}
                {autoPulledSummaryText && (
                  <div className="bg-white px-3 py-2 rounded-xl border border-emerald-200 text-xs flex items-start gap-2">
                    <Route className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-950">
                        เส้นทางและเงื่อนไขที่ดึงมาจากตอนค้นหา:{' '}
                      </span>
                      <span className="text-[#2e2938]">{autoPulledSummaryText}</span>
                    </div>
                  </div>
                )}

                {/* Pulled Tourist Attractions Near Hotel & in Province (คำขอผู้ใช้: ให้ขึ้นสถานที่เที่ยวด้วย) */}
                {(() => {
                  const provAttractions = getAttractionsForProvince(hotel.province);
                  return (
                    <div className="bg-white p-3 rounded-xl border border-emerald-200 space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-emerald-700" />
                          <span>
                            🏞️ สถานที่ท่องเที่ยวใกล้ที่พัก & ใน จ.{hotel.province} (ดึงมาให้อัตโนมัติ):
                          </span>
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                          ใกล้ {hotel.popularAttractionNearby} เพียง {hotel.distanceToAttractionKm} กม.
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {provAttractions.map((att) => (
                          <span
                            key={att.attractionId}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#fbf7f4] border border-[#d2af91]/50 text-[11px] font-semibold text-[#2b2320]"
                          >
                            <span>📍 {att.attractionName}</span>
                            <span
                              className={`text-[10px] font-bold ${
                                att.petAllowed ? 'text-[#a93f3f]' : 'text-amber-800'
                              }`}
                            >
                              ({att.petAllowed ? '🐾 สัตว์เข้าได้' : '🚫 สัตว์เข้าไม่ได้'})
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Optional Override Controls (Only shown if user clicks 'เปลี่ยนวัน/จำนวนคน/ห้อง') */}
                {showEditSearchParams && (
                  <div className="pt-3 border-t border-emerald-200 space-y-3 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {hotel.rooms.map((room) => {
                        const isSelected = selectedRoom.roomType === room.roomType;
                        return (
                          <div
                            key={room.roomType}
                            onClick={() => setSelectedRoom(room)}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#d2af91]/30 border-[#a93f3f] font-bold'
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <span className="text-xs text-[#2b2320]">
                              {isSelected && '✓ '}
                              {room.roomType} ({room.bedType})
                            </span>
                            <span className="text-xs font-extrabold text-[#a93f3f]">
                              ฿{room.pricePerNight.toLocaleString()}/คืน
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div>
                        <label className="text-[11px] font-bold text-[#2b2320] block mb-1">
                          วันเช็คอิน:
                        </label>
                        <input
                          type="date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-emerald-300 rounded-xl font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#2b2320] block mb-1">
                          วันเช็คเอาท์:
                        </label>
                        <input
                          type="date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-emerald-300 rounded-xl font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#2b2320] block mb-1">
                          ผู้เข้าพัก:
                        </label>
                        <select
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 bg-white border border-emerald-300 rounded-xl font-semibold"
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>
                              {n} ท่าน
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 2: ข้อมูลผู้จอง (ตรงกดจองมีให้ใส่ข้อมูลผู้จอง — และถ้าเคยกรอกแล้วดึงมาให้ทันที) */}
              <div className="bg-[#fbf7f4] rounded-2xl p-4 border-2 border-[#d2af91] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d2af91]/40 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#a93f3f] text-white flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-[#2b2320] block">
                        2. ข้อมูลผู้จองห้องพัก (สำหรับออกใบยืนยันการจอง)
                      </span>
                      <span className="text-[11px] text-[#6b5c54] block">
                        {hasSavedBookerInfo
                          ? '✨ ดึงข้อมูลผู้จองที่คุณเคยกรอกไว้มาให้แล้ว (ไม่ต้องพิมพ์ซ้ำ หรือแก้ไขได้ตามต้องการ)'
                          : 'กรอกเฉพาะชื่อ เบอร์โทร และอีเมลผู้จอง (ส่วนข้อมูลห้องพักดึงมาจากตอนค้นหาแล้ว)'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {!guestName && (
                      <button
                        type="button"
                        onClick={() => {
                          setGuestName('คุณพัชราภา สุวรรณโคตร');
                          setGuestPhone('081-234-5678');
                          setGuestEmail('patcharapa.su@kkumail.com');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#d2af91]/30 hover:bg-[#d2af91]/60 text-[#a93f3f] text-[11px] font-bold cursor-pointer"
                      >
                        ⚡ ดึงข้อมูลสมาชิก
                      </button>
                    )}
                    {guestName && (
                      <button
                        type="button"
                        onClick={() => {
                          setGuestName('');
                          setGuestPhone('');
                          setGuestEmail('');
                        }}
                        className="px-2 py-1 rounded-lg bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-semibold cursor-pointer"
                      >
                        ล้างค่า
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-[#2b2320] block mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-[#a93f3f]" /> ชื่อ-นามสกุลผู้จอง *
                      </span>
                      {guestName && (
                        <span className="text-[9px] text-emerald-700 font-bold">
                          ✓ มีข้อมูลแล้ว
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น คุณพัชราภา สุวรรณโคตร"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#d2af91] rounded-xl font-bold text-[#2b2320] focus:ring-2 focus:ring-[#a93f3f] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#2b2320] block mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#a93f3f]" /> เบอร์โทรศัพท์ *
                      </span>
                      {guestPhone && (
                        <span className="text-[9px] text-emerald-700 font-bold">
                          ✓ มีข้อมูลแล้ว
                        </span>
                      )}
                    </label>
                    <input
                      type="tel"
                      placeholder="เช่น 081-234-5678"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#d2af91] rounded-xl font-bold text-[#2b2320] focus:ring-2 focus:ring-[#a93f3f] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#2b2320] block mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#a93f3f]" /> อีเมลรับใบยืนยัน *
                      </span>
                      {guestEmail && (
                        <span className="text-[9px] text-emerald-700 font-bold">
                          ✓ มีข้อมูลแล้ว
                        </span>
                      )}
                    </label>
                    <input
                      type="email"
                      placeholder="เช่น name@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#d2af91] rounded-xl font-bold text-[#2b2320] focus:ring-2 focus:ring-[#a93f3f] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#2b2320] block mb-1">
                    หมายเหตุ / คำขอพิเศษเพิ่มเติมของผู้จอง (ถ้ามี — ไม่บังคับ):
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น ขอเช็คอินช่วงค่ำ, ขอห้องชั้นล่างใกล้สวนสัตว์เลี้ยง"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#d2af91]/80 rounded-xl text-xs font-medium text-[#2b2320] focus:ring-2 focus:ring-[#a93f3f] focus:outline-none"
                  />
                </div>
              </div>

              {/* SECTION 3: สรุปค่าใช้จ่ายสุทธิ */}
              <div className="bg-white p-4 rounded-2xl border border-[#d2af91]/50 space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6b5c54]">
                  <span>
                    ค่าห้องพัก ({selectedRoom.roomType}: ฿
                    {pricePerNight.toLocaleString()} × {calculatedNights} คืน):
                  </span>
                  <span className="font-semibold text-[#2b2320]">
                    ฿{roomTotal.toLocaleString()}
                  </span>
                </div>
                {petFee > 0 && (
                  <div className="flex justify-between text-[#6b5c54]">
                    <span>ค่าธรรมเนียมสัตว์เลี้ยง ({petCount} ตัว):</span>
                    <span className="font-semibold text-[#a93f3f]">
                      ฿{petFee.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-[#6b5c54]">
                  <span>ภาษีและค่าบริการ (7%):</span>
                  <span className="font-semibold text-[#2b2320]">
                    ฿{serviceTax.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#d2af91]/40 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-[#2b2320]">
                    ยอดรวมสุทธิทั้งสิ้น:
                  </span>
                  <span className="text-xl font-extrabold text-[#a93f3f]">
                    ฿{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#fbf7f4] text-[#6b5c54] border border-[#d2af91]/60 text-xs font-semibold cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#a93f3f] hover:bg-[#8c3232] text-white text-xs font-extrabold shadow-sm cursor-pointer flex items-center gap-1.5 transition-all"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>ยืนยันการจองห้องพัก</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
