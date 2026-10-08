import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Dog, 
  MapPin, 
  Star, 
  Eye, 
  Waves, 
  Coffee, 
  Car, 
  Wifi, 
  Search, 
  Filter, 
  Sparkles,
  Camera,
  CheckCircle2,
  AlertCircle,
  Calendar,
  CreditCard,
  Banknote,
  X
} from 'lucide-react';
import { Hotel, BookingRecord, SharedSearchCriteria } from '../types';
import { RoomModal } from './RoomModal';
import { BookingModal } from './BookingModal';

interface HotelGalleryProps {
  hotels: Hotel[];
  selectedProvince: string;
  searchCriteria?: SharedSearchCriteria;
  onUpdateSearchCriteria?: (partial: Partial<SharedSearchCriteria>) => void;
  onConfirmBooking?: (booking: BookingRecord) => void;
}

export const HotelGallery: React.FC<HotelGalleryProps> = ({
  hotels,
  selectedProvince,
  searchCriteria,
  onUpdateSearchCriteria,
  onConfirmBooking
}) => {
  const [selectedHotelForModal, setSelectedHotelForModal] = useState<Hotel | null>(null);
  const [selectedHotelForBooking, setSelectedHotelForBooking] = useState<Hotel | null>(null);
  const [selectedBookingRoomType, setSelectedBookingRoomType] = useState<string | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState('');
  // 3-Way Pet Filter: 'all' (รวมทั้งรับสัตว์และสัตว์พักไม่ได้), 'pet' (เฉพาะรับสัตว์), 'nonpet' (เฉพาะสัตว์พักไม่ได้)
  const [petFilterMode, setPetFilterMode] = useState<'all' | 'pet' | 'nonpet'>('all');
  const [filterPool, setFilterPool] = useState(false);
  const [filterBreakfast, setFilterBreakfast] = useState(false);
  const [selectedHotelType, setSelectedHotelType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'price_asc' | 'price_desc' | 'rating'>('score');

  // Min-Max Budget Filter State (คำขอ: ปรับงบประมาณแบบเลือกได้ต่ำสุดเท่าไหร่สูงสุดเท่าไหร่)
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  // Filter & Sort
  const filteredHotels = useMemo(() => {
    return hotels
      .filter((h) => {
        const matchesSearch = 
          h.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.popularAttractionNearby.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesPet = 
          petFilterMode === 'all' 
            ? true 
            : petFilterMode === 'pet' 
              ? h.petFriendly 
              : !h.petFriendly;

        const matchesPool = !filterPool || h.pool;
        const matchesBreakfast = !filterBreakfast || h.breakfast;
        const matchesType = selectedHotelType === 'all' || h.hotelType.toLowerCase() === selectedHotelType.toLowerCase();

        // Price Range filter
        const matchesMinPrice = minPrice === '' || h.price >= Number(minPrice);
        const matchesMaxPrice = maxPrice === '' || h.price <= Number(maxPrice);

        return matchesSearch && matchesPet && matchesPool && matchesBreakfast && matchesType && matchesMinPrice && matchesMaxPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return b.suitableScoreAvg - a.suitableScoreAvg;
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [hotels, searchQuery, petFilterMode, filterPool, filterBreakfast, selectedHotelType, minPrice, maxPrice, sortBy]);

  const petFriendlyCount = hotels.filter(h => h.petFriendly).length;
  const nonPetCount = hotels.filter(h => !h.petFriendly).length;

  return (
    <div className="bg-white/95 rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#d2af91]/40 shadow-xs mb-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-[#d2af91]/30">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#d2af91]/40 text-[#2b2320] flex items-center justify-center font-bold">
              <Camera className="w-4 h-4" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#2b2320]">
              สำรวจที่พักและแกลเลอรีภาพห้องพักจริง ({filteredHotels.length} แห่ง)
            </h3>
          </div>
          <p className="text-xs text-[#6b5c54] mt-1">
            {selectedProvince === 'ทุกจังหวัด' 
              ? `แสดงรายการที่พักครบทั้งรับสัตว์เลี้ยง (${petFriendlyCount} แห่ง) และที่สัตว์ไม่สามารถพักได้ (${nonPetCount} แห่ง)`
              : `แสดงรายการที่พักในจังหวัด${selectedProvince} พร้อมภาพถ่ายห้องพักจริงและข้อมูลนโยบายสัตว์เลี้ยง`}
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาชื่อที่พัก, อำเภอ, ที่เที่ยว..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-[#fbf7f4]/40 border border-[#d2af91]/60 rounded-xl text-xs text-[#2b2320] placeholder:text-[#6b5c54] focus:outline-none focus:ring-2 focus:ring-[#d2af91] w-52 sm:w-64 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-[#a93f3f] absolute left-2.5 top-2.5" />
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#6b5c54] font-medium">เรียงตาม:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#d2af91]/60 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#2b2320] focus:outline-none focus:ring-2 focus:ring-[#d2af91]"
            >
              <option value="score">คะแนนความเหมาะสม (AI Score)</option>
              <option value="rating">คะแนนรีวิวสูงสุด</option>
              <option value="price_asc">ราคา: ต่ำไปสูง</option>
              <option value="price_desc">ราคา: สูงไปต่ำ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Quick Pills */}
      <div className="flex flex-col gap-3 py-3 border-b border-[#d2af91]/30 text-xs">
        {/* Row 1: Pet Policy Selector (Core Feature: ให้ขึ้นที่พักที่สัตว์ไม่สามารถพักได้ด้วย) */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#6b5c54] font-bold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#a93f3f]" /> นโยบายสัตว์เลี้ยง:
          </span>
          <button
            onClick={() => setPetFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              petFilterMode === 'all'
                ? 'bg-[#d2af91] text-[#2b2320] shadow-xs'
                : 'bg-[#fbf7f4]/50 text-[#6b5c54] hover:bg-[#fbf7f4] border border-[#d2af91]/40'
            }`}
          >
            <span>ทั้งหมด (แสดงทุกที่พัก {hotels.length} แห่ง)</span>
          </button>

          <button
            onClick={() => setPetFilterMode('pet')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              petFilterMode === 'pet'
                ? 'bg-[#d2af91] text-[#2b2320] shadow-xs'
                : 'bg-[#fbf7f4]/50 text-[#6b5c54] hover:bg-[#fbf7f4] border border-[#d2af91]/40'
            }`}
          >
            <Dog className="w-3.5 h-3.5 text-[#a93f3f]" />
            <span>🐾 เฉพาะรับสัตว์เลี้ยง ({petFriendlyCount} แห่ง)</span>
          </button>

          <button
            onClick={() => setPetFilterMode('nonpet')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              petFilterMode === 'nonpet'
                ? 'bg-amber-200 text-amber-950 shadow-xs ring-2 ring-amber-300'
                : 'bg-[#fbf7f4]/50 text-[#6b5c54] hover:bg-[#fbf7f4] border border-[#d2af91]/40'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>🚫 เฉพาะที่สัตว์พักไม่ได้ / ปลอดสัตว์ ({nonPetCount} แห่ง)</span>
          </button>
        </div>

        {/* Row 2: Accommodation Types & Amenities */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Accommodation Type Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[#6b5c54] font-semibold flex items-center gap-1 shrink-0 mr-1">
              <Building2 className="w-3.5 h-3.5 text-[#a93f3f]" /> ประเภท:
            </span>
            {[
              { id: 'all', label: 'ทั้งหมด' },
              { id: 'Hotel', label: '🏨 โรงแรม' },
              { id: 'Resort', label: '🌴 รีสอร์ท' },
              { id: 'Villa', label: '🏡 พูลวิลล่า' },
              { id: 'Boutique', label: '✨ บูทีค' },
              { id: 'Homestay', label: '🌿 โฮมสเตย์' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedHotelType(t.id)}
                className={`px-2.5 py-1 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
                  selectedHotelType === t.id
                    ? 'bg-[#d2af91] text-[#2b2320] font-bold shadow-xs'
                    : 'bg-[#fbf7f4]/40 text-[#6b5c54] hover:bg-[#fbf7f4] border border-[#d2af91]/30'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Feature Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setFilterPool(!filterPool)}
              className={`px-2.5 py-1 rounded-xl font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                filterPool 
                  ? 'bg-[#d2af91] text-[#a93f3f] font-bold shadow-xs' 
                  : 'bg-[#fbf7f4]/40 text-[#6b5c54] hover:bg-[#fbf7f4] border border-[#d2af91]/30'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-[#a93f3f]" />
              <span>สระว่ายน้ำ</span>
            </button>

            <button
              onClick={() => setFilterBreakfast(!filterBreakfast)}
              className={`px-2.5 py-1 rounded-xl font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                filterBreakfast 
                  ? 'bg-[#d2af91] text-[#2b2320] font-bold shadow-xs' 
                  : 'bg-[#fbf7f4]/40 text-[#6b5c54] hover:bg-[#fbf7f4] border border-[#d2af91]/30'
              }`}
            >
              <Coffee className="w-3.5 h-3.5 text-[#a93f3f]" />
              <span>อาหารเช้า</span>
            </button>
          </div>
        </div>

        {/* Row 3: Price / Budget Range Filter (Min & Max Price) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-[#d2af91]/20 bg-[#d2af91]/15 p-2.5 rounded-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#2b2320] font-bold flex items-center gap-1.5 shrink-0">
              <Banknote className="w-4 h-4 text-[#a93f3f]" /> ช่วงงบประมาณ/คืน:
            </span>

            {/* Quick Price Bracket Buttons */}
            {[
              { label: 'ทุกราคา', min: '', max: '' },
              { label: 'ไม่เกิน 1,500฿', min: '', max: 1500 },
              { label: '1,500 - 3,000฿', min: 1500, max: 3000 },
              { label: '3,000 - 5,000฿', min: 3000, max: 5000 },
              { label: 'มากกว่า 5,000฿', min: 5000, max: '' },
            ].map((bracket, idx) => {
              const isSelected = minPrice === bracket.min && maxPrice === bracket.max;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setMinPrice(bracket.min as any);
                    setMaxPrice(bracket.max as any);
                  }}
                  className={`px-2.5 py-1 rounded-xl font-semibold text-[11px] transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#d2af91] text-[#2b2320] font-bold shadow-2xs ring-1 ring-[#a93f3f]'
                      : 'bg-white text-[#6b5c54] hover:bg-white/80 border border-[#d2af91]/40'
                  }`}
                >
                  {bracket.label}
                </button>
              );
            })}
          </div>

          {/* Custom Min & Max Inputs */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[#6b5c54] font-medium text-[11px]">ต่ำสุด:</span>
              <div className="relative w-24">
                <input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  step="100"
                  min="0"
                  className="w-full px-2 py-1 bg-white border border-[#d2af91] rounded-lg text-xs font-semibold text-[#2b2320] pr-5 focus:outline-none focus:ring-1 focus:ring-[#a93f3f]"
                />
                <span className="absolute right-1.5 top-1 text-[10px] text-[#6b5c54]">฿</span>
              </div>
            </div>

            <span className="text-[#a93f3f] font-bold">-</span>

            <div className="flex items-center gap-1.5">
              <span className="text-[#6b5c54] font-medium text-[11px]">สูงสุด:</span>
              <div className="relative w-24">
                <input
                  type="number"
                  placeholder="ไม่จำกัด"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  step="100"
                  min="0"
                  className="w-full px-2 py-1 bg-white border border-[#d2af91] rounded-lg text-xs font-semibold text-[#2b2320] pr-5 focus:outline-none focus:ring-1 focus:ring-[#a93f3f]"
                />
                <span className="absolute right-1.5 top-1 text-[10px] text-[#6b5c54]">฿</span>
              </div>
            </div>

            {(minPrice !== '' || maxPrice !== '') && (
              <button
                onClick={() => {
                  setMinPrice('');
                  setMaxPrice('');
                }}
                className="p-1 rounded-lg text-[#6b5c54] hover:text-[#2b2320] hover:bg-white transition-colors cursor-pointer"
                title="ล้างตัวกรองงบประมาณ"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      {filteredHotels.length === 0 ? (
        <div className="py-12 text-center">
          <Building2 className="w-12 h-12 text-[#a93f3f]/40 mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#2b2320]">ไม่พบที่พักที่ตรงกับเงื่อนไขการค้นหา</p>
          <p className="text-xs text-[#6b5c54] mt-1">ลองปรับตัวกรองหรือเลือกเงื่อนไขอื่น</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredHotels.map((hotel) => {
            const totalRoomPhotos = hotel.rooms.reduce((acc, r) => acc + r.images.length, 0);

            return (
              <div
                key={hotel.hotelId}
                className={`bg-white rounded-3xl border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group ${
                  hotel.petFriendly 
                    ? 'border-[#d2af91]/50 hover:border-[#a93f3f]' 
                    : 'border-amber-200 hover:border-amber-400 bg-amber-50/10'
                }`}
              >
                {/* Image Section */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                  <img
                    src={hotel.primaryImage}
                    alt={hotel.hotelName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                      <Building2 className="w-3 h-3 text-[#d2af91]" />
                      {hotel.hotelType}
                    </span>

                    {hotel.petFriendly ? (
                      <span className="px-2.5 py-1 rounded-lg bg-[#d2af91] text-[#2b2320] text-[11px] font-bold flex items-center gap-1 shadow-md">
                        <Dog className="w-3.5 h-3.5" />
                        <span>Pet-Friendly</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 border border-amber-300 text-[11px] font-bold flex items-center gap-1 shadow-md">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                        <span>สัตว์พักไม่ได้ (Non-Pet)</span>
                      </span>
                    )}
                  </div>

                  {/* Rating & Match Score at bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      <span>{hotel.rating}</span>
                      <span className="text-slate-300 font-normal">({hotel.reviewCount})</span>
                    </div>

                    <div className="bg-[#d2af91]/90 text-[#2b2320] backdrop-blur-md px-2.5 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#a93f3f]" />
                      <span>AI Score {hotel.suitableScoreAvg}%</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location & Title */}
                    <div className="mb-2">
                      <div className="flex items-center gap-1 text-[#6b5c54] text-xs mb-1">
                        <MapPin className="w-3 h-3 text-[#a93f3f] shrink-0" />
                        <span className="truncate">อ.{hotel.district} จ.{hotel.province}</span>
                        <span className="text-[#d2af91]">•</span>
                        <span className="text-[#8c355c] font-semibold truncate">
                          ใกล้{hotel.popularAttractionNearby} ({hotel.distanceToAttractionKm} กม.)
                        </span>
                      </div>
                      <h4 className="font-bold text-[#2b2320] text-base line-clamp-1 group-hover:text-[#a93f3f] transition-colors">
                        {hotel.hotelName}
                      </h4>
                      <p className="text-xs text-[#6b5c54] line-clamp-2 mt-1 leading-relaxed">
                        {hotel.description}
                      </p>
                    </div>

                    {/* Non-Pet Notice Box if applicable */}
                    {!hotel.petFriendly && (
                      <div className="my-2.5 p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <div className="line-clamp-2 leading-tight">
                          <strong>ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก:</strong> {hotel.nonPetReason || 'นโยบายปลอดสารก่อภูมิแพ้และความสะอาดมาตรฐานสากล'}
                        </div>
                      </div>
                    )}

                    {/* Mini Room Images Strip */}
                    <div className="my-2.5 pt-2.5 border-t border-[#d2af91]/30">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold text-[#6b5c54]">
                          {hotel.petFriendly ? 'ตัวอย่างภาพห้องพัก & มุมสัตว์เลี้ยง:' : 'ตัวอย่างภาพห้องพักจริง:'}
                        </span>
                        <span className="text-[11px] text-[#8c355c] font-semibold">
                          {totalRoomPhotos} รูป
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-1.5">
                        {hotel.rooms.flatMap(r => r.images).slice(0, 4).map((img, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedHotelForModal(hotel)}
                            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 group/img border border-[#d2af91]/50"
                            title={img.title}
                          >
                            <img src={img.url} alt={img.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            {idx === 3 && totalRoomPhotos > 4 && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-[11px]">
                                +{totalRoomPhotos - 3}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amenities Icons */}
                    <div className="flex items-center gap-2 py-2 border-t border-[#d2af91]/30 text-xs text-[#6b5c54]">
                      {hotel.wifi && (
                        <span className="inline-flex items-center gap-1" title="มี Wi-Fi ฟรี">
                          <Wifi className="w-3.5 h-3.5 text-[#a93f3f]" />
                          <span className="text-[11px]">Wi-Fi</span>
                        </span>
                      )}
                      {hotel.parking && (
                        <span className="inline-flex items-center gap-1" title="มีที่จอดรถสะดวก">
                          <Car className="w-3.5 h-3.5 text-[#a93f3f]" />
                          <span className="text-[11px]">ที่จอดรถ</span>
                        </span>
                      )}
                      {hotel.pool && (
                        <span className="inline-flex items-center gap-1" title="มีสระว่ายน้ำ">
                          <Waves className="w-3.5 h-3.5 text-[#a93f3f]" />
                          <span className="text-[11px]">สระว่ายน้ำ</span>
                        </span>
                      )}
                      {hotel.breakfast && (
                        <span className="inline-flex items-center gap-1" title="มีอาหารเช้า">
                          <Coffee className="w-3.5 h-3.5 text-[#a93f3f]" />
                          <span className="text-[11px]">อาหารเช้า</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="mt-3 pt-3 border-t border-[#d2af91]/30 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] text-[#6b5c54] font-medium">เริ่มต้นเพียง</div>
                      <div className="text-base font-bold text-[#2b2320]">
                        ฿{hotel.price.toLocaleString()}
                        <span className="text-[11px] font-normal text-[#6b5c54]"> / คืน</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedHotelForModal(hotel)}
                        className="px-2.5 py-1.5 rounded-xl bg-[#fbf7f4] hover:bg-[#fbf7f4]/80 text-[#2b2320] border border-[#d2af91] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        title="ดูภาพถ่ายห้องพักจริง"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#a93f3f]" />
                        <span>ภาพห้อง ({totalRoomPhotos})</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedBookingRoomType(undefined);
                          setSelectedHotelForBooking(hotel);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-[#d2af91] hover:bg-[#b89270] text-[#2b2320] text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer transition-all active:scale-98"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>จองทันที</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full Modal Viewer for Room Images */}
      <RoomModal
        hotel={selectedHotelForModal}
        isOpen={!!selectedHotelForModal}
        onClose={() => setSelectedHotelForModal(null)}
        onOpenBooking={(h, roomType) => {
          setSelectedHotelForModal(null);
          setSelectedBookingRoomType(roomType);
          setSelectedHotelForBooking(h);
        }}
      />

      {/* Booking Modal with Auto-Pulled Search Criteria */}
      <BookingModal
        hotel={selectedHotelForBooking}
        selectedRoomType={selectedBookingRoomType}
        searchCriteria={searchCriteria}
        onUpdateSearchCriteria={onUpdateSearchCriteria}
        isOpen={!!selectedHotelForBooking}
        onClose={() => {
          setSelectedHotelForBooking(null);
          setSelectedBookingRoomType(undefined);
        }}
        onConfirmBooking={(booking) => {
          if (onConfirmBooking) {
            onConfirmBooking(booking);
          }
        }}
      />
    </div>
  );
};
