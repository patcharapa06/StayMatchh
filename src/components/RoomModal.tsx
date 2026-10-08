import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  Dog, 
  Bed, 
  Maximize2, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle, 
  ShieldCheck, 
  Building2,
  Sparkles,
  CreditCard,
  Info
} from 'lucide-react';
import { Hotel, RoomImage } from '../types';

interface RoomModalProps {
  hotel: Hotel | null;
  isOpen?: boolean;
  selectedRoomType?: string;
  onClose: () => void;
  onOpenBooking?: (hotel: Hotel, roomType?: string) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({
  hotel,
  isOpen = true,
  selectedRoomType,
  onClose,
  onOpenBooking
}) => {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'bedroom' | 'pet_zone' | 'outdoor'>('all');

  useEffect(() => {
    if (hotel && hotel.rooms && hotel.rooms.length > 0) {
      const idx = selectedRoomType
        ? Math.max(0, hotel.rooms.findIndex((r) => r.roomType === selectedRoomType))
        : 0;
      setSelectedRoomIndex(idx >= 0 ? idx : 0);
      setSelectedImageIndex(0);
      setActiveCategory('all');
    }
  }, [hotel, selectedRoomType]);

  if (!isOpen || !hotel || !hotel.rooms || hotel.rooms.length === 0) {
    return null;
  }

  const currentRoom = hotel.rooms[selectedRoomIndex] || hotel.rooms[0];
  const allImages: RoomImage[] = currentRoom ? currentRoom.images : [];

  const filteredImages = allImages.filter(img => {
    if (activeCategory === 'all') return true;
    return img.type === activeCategory;
  });

  const activeImage = filteredImages[selectedImageIndex] || allImages[0] || {
    url: hotel.primaryImage,
    title: hotel.hotelName,
    caption: 'ภาพรวมห้องพัก',
    type: 'bedroom' as const
  };

  const handleNextImage = () => {
    if (filteredImages.length === 0) return;
    setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrevImage = () => {
    if (filteredImages.length === 0) return;
    setSelectedImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-[#d2af91]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Flat solid color without gradients */}
        <div className="px-6 py-4 border-b border-[#d2af91]/40 flex items-center justify-between bg-[#fbf7f4]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs ${
              hotel.petFriendly ? 'bg-[#a93f3f]' : 'bg-[#d2af91] text-[#2b2320]'
            }`}>
              {hotel.petFriendly ? <Dog className="w-5 h-5 text-white" /> : <Building2 className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2b2320] bg-white px-2 py-0.5 rounded border border-[#d2af91]/60">
                  {hotel.hotelType}
                </span>
                <span className="text-xs text-[#6b5c54] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#a93f3f]" />
                  อ.{hotel.district} จ.{hotel.province}
                </span>
                {hotel.petFriendly ? (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#d2af91]/30 text-[#a93f3f] border border-[#d2af91]">
                    🐾 Pet-Friendly
                  </span>
                ) : (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#fbf7f4] text-[#6b5c54] border border-[#d2af91]/60">
                    🚫 สัตว์ไม่สามารถพักได้
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#2b2320] leading-tight">
                {hotel.hotelName} — แกลเลอรีภาพห้องพักจริง
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-[#fbf7f4] text-[#2b2320] flex items-center justify-center transition-colors cursor-pointer border border-[#d2af91]/50"
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Room Types Tab selector */}
        <div className="px-6 py-2.5 bg-white border-b border-[#d2af91]/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-semibold text-[#6b5c54] whitespace-nowrap">เลือกประเภทห้องพัก:</span>
          {hotel.rooms.map((room, idx) => (
            <button
              key={room.roomType}
              onClick={() => {
                setSelectedRoomIndex(idx);
                setSelectedImageIndex(0);
                setActiveCategory('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedRoomIndex === idx
                  ? 'bg-[#a93f3f] text-white font-bold shadow-xs'
                  : 'bg-[#fbf7f4] text-[#6b5c54] hover:bg-[#d2af91]/25 border border-[#d2af91]/40'
              }`}
            >
              {room.roomType} (฿{room.pricePerNight.toLocaleString()}/คืน)
            </button>
          ))}
        </div>

        {/* Modal Body: Two Columns on large screens */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Image Showcase (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {/* Main Active Image with Prev/Next Controls */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video group shadow-inner">
              <img
                src={activeImage.url}
                alt={activeImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              />
              
              {/* Photo Caption Overlay - Solid flat translucent bar without gradient */}
              <div className="absolute inset-x-0 bottom-0 bg-black/75 p-3 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white drop-shadow-xs">
                      {activeImage.title}
                    </h3>
                    <p className="text-xs text-stone-200 line-clamp-1">
                      {activeImage.caption}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
                    {selectedImageIndex + 1} / {filteredImages.length}
                  </span>
                </div>
              </div>

              {/* Prev / Next Arrows */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Category Filter for images */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
              <span className="text-[#6b5c54] font-medium whitespace-nowrap">มุมมองภาพ:</span>
              <button
                onClick={() => { setActiveCategory('all'); setSelectedImageIndex(0); }}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                  activeCategory === 'all' ? 'bg-[#a93f3f] text-white font-bold' : 'bg-[#fbf7f4] text-[#6b5c54] border border-[#d2af91]/30'
                }`}
              >
                ทั้งหมด ({allImages.length})
              </button>
              <button
                onClick={() => { setActiveCategory('bedroom'); setSelectedImageIndex(0); }}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                  activeCategory === 'bedroom' ? 'bg-[#a93f3f] text-white font-bold' : 'bg-[#fbf7f4] text-[#6b5c54] border border-[#d2af91]/30'
                }`}
              >
                🛏️ ห้องนอน
              </button>
              {hotel.petFriendly && (
                <button
                  onClick={() => { setActiveCategory('pet_zone'); setSelectedImageIndex(0); }}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                    activeCategory === 'pet_zone' ? 'bg-[#d2af91] text-[#2b2320] font-bold border border-[#a93f3f]' : 'bg-[#fbf7f4] text-[#6b5c54] border border-[#d2af91]/30'
                  }`}
                >
                  🐾 โซนสัตว์เลี้ยง
                </button>
              )}
              <button
                onClick={() => { setActiveCategory('outdoor'); setSelectedImageIndex(0); }}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                  activeCategory === 'outdoor' ? 'bg-[#a93f3f] text-white font-bold' : 'bg-[#fbf7f4] text-[#6b5c54] border border-[#d2af91]/30'
                }`}
              >
                🌳 กลางแจ้ง/วิว
              </button>
            </div>

            {/* Thumbnails list */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {filteredImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all cursor-pointer ${
                    selectedImageIndex === i
                      ? 'border-[#a93f3f] shadow-md scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 px-1 py-0.5 text-[10px] text-white truncate text-center">
                    {img.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Room Specifications & Amenities (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Non-Pet Notice if Applicable */}
            {!hotel.petFriendly && (
              <div className="p-3.5 rounded-2xl bg-[#fbf7f4] border border-[#d2af91] text-xs text-[#2b2320] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#a93f3f] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-[#a93f3f]">นโยบายที่พัก: สัตว์ไม่สามารถพักได้ (Non Pet-Friendly)</strong>
                  <p className="text-[11px] text-[#6b5c54] mt-0.5 leading-relaxed">
                    {hotel.nonPetReason || 'โรงแรมนี้ไม่อนุญาตให้นำสัตว์เลี้ยงทุกชนิดเข้าพัก เพื่อรักษามาตรฐานความสะอาด ปลอดสารก่อภูมิแพ้ หรือนโยบายการจัดประชุมธุรกิจ'}
                  </p>
                </div>
              </div>
            )}

            {/* Price & Capacity Card */}
            <div className="bg-[#fbf7f4] rounded-2xl p-4 border border-[#d2af91]/60">
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <span className="text-2xl font-bold text-[#2b2320]">
                    ฿{currentRoom?.pricePerNight.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#6b5c54] font-medium"> / คืน (รวมภาษี)</span>
                </div>
                {hotel.petFriendly ? (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#d2af91]/30 text-[#a93f3f] border border-[#d2af91]">
                    รองรับสัตว์เลี้ยง 100%
                  </span>
                ) : (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white text-[#6b5c54] border border-[#d2af91]/60">
                    ปลอดสัตว์เลี้ยง 100%
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#2b2320] pt-2 border-t border-[#d2af91]/30">
                <div className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-[#a93f3f]" />
                  <span>{currentRoom?.bedType}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-[#a93f3f]" />
                  <span>ขนาด {currentRoom?.sizeSqM} ตร.ม.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#a93f3f]" />
                  <span>ผู้เข้าพัก: สูงสุด {currentRoom?.maxGuests} คน</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Dog className="w-4 h-4 text-[#a93f3f]" />
                  <span>
                    {hotel.petFriendly ? `สัตว์เลี้ยง: สูงสุด ${currentRoom?.maxPets} ตัว` : 'สัตว์เลี้ยง: ไม่อนุญาต'}
                  </span>
                </div>
              </div>
            </div>

            {/* Pet Amenities or Hypoallergenic Amenities */}
            {hotel.petFriendly ? (
              <div className="bg-white rounded-2xl p-4 border border-[#d2af91]/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#a93f3f] flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-4 h-4 text-[#a93f3f]" />
                  สิ่งอำนวยความสะดวกสำหรับสัตว์เลี้ยง (Pet Amenities)
                </h4>
                <ul className="space-y-1.5 text-xs text-[#2b2320] font-medium">
                  {currentRoom?.petAmenities.map((amenity, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#d2af91]/30 text-[#a93f3f] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
                {hotel.petWeightLimitKg && (
                  <div className="mt-2.5 pt-2 border-t border-[#d2af91]/40 text-xs text-[#6b5c54] flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#a93f3f]" />
                    <span>น้ำหนักสัตว์เลี้ยงไม่เกิน: {hotel.petWeightLimitKg} กก. (สุนัข/แมว)</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-4 border border-[#d2af91]/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2b2320] flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#a93f3f]" />
                  มาตรฐานความสะอาด & ปลอดสารก่อภูมิแพ้
                </h4>
                <ul className="space-y-1 text-xs text-[#6b5c54]">
                  <li className="flex items-center gap-1.5">✓ ปลอดไรฝุ่นและขนสัตว์ 100% เหมาะสำหรับผู้มีประวัติภูมิแพ้</li>
                  <li className="flex items-center gap-1.5">✓ ระบบฟอกอากาศ HEPA ประจำห้องพัก</li>
                  <li className="flex items-center gap-1.5">✓ สิ่งแวดล้อมเงียบสงบ ไร้เสียงรบกวน เหมาะกับการทำงานและพักผ่อน</li>
                </ul>
              </div>
            )}

            {/* General Room Amenities */}
            <div className="bg-white rounded-2xl p-4 border border-[#d2af91]/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2b2320] mb-2">
                สิ่งอำนวยความสะดวกภายในห้องพัก
              </h4>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {currentRoom?.roomAmenities.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#fbf7f4] text-[#2b2320] font-medium border border-[#d2af91]/40"
                  >
                    <Check className="w-3 h-3 text-[#a93f3f]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* CRISP-DM Model Suitability Metric Badge */}
            <div className="bg-[#fbf7f4] rounded-2xl p-3.5 border border-[#d2af91]/60 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#2b2320] flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#a93f3f]" />
                  Data Mining AI Score
                </span>
                <span className="font-bold text-[#a93f3f] bg-white px-2 py-0.5 rounded border border-[#d2af91]">
                  คะแนนความเหมาะสม: {hotel.suitableScoreAvg}%
                </span>
              </div>
              <p className="text-[#6b5c54] text-[11px] leading-relaxed">
                ทำนายผลด้วยโมเดล Random Forest จากงบประมาณ, ระยะทางสถานที่ท่องเที่ยว ({hotel.popularAttractionNearby} {hotel.distanceToAttractionKm} กม.) และสิ่งอำนวยความสะดวก
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer - Flat solid color without gradients */}
        <div className="px-6 py-3.5 border-t border-[#d2af91]/40 bg-[#fbf7f4] flex items-center justify-between gap-3">
          <div className="text-xs text-[#6b5c54]">
            {hotel.petFriendly ? '🐾 ที่พักต้อนรับสัตว์เลี้ยง' : '🚫 ที่พักปลอดสัตว์เลี้ยง'} | StayMatch Analytics
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-[#6b5c54] border border-[#d2af91]/60 text-xs font-semibold cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>

            {onOpenBooking && (
              <button
                onClick={() => onOpenBooking(hotel, currentRoom?.roomType)}
                className="px-5 py-2 rounded-xl bg-[#a93f3f] hover:bg-[#8c3232] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-98 transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>จองห้องพักนี้ (฿{currentRoom?.pricePerNight.toLocaleString()})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
