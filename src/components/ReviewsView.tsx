import React, { useState, useMemo } from 'react';
import { 
  Star, 
  MessageSquare, 
  Building2, 
  Globe, 
  Dog, 
  ShieldCheck, 
  ThumbsUp, 
  Filter, 
  Plus, 
  Sparkles, 
  Calendar, 
  User, 
  CheckCircle2, 
  Smartphone, 
  Search,
  Award,
  X
} from 'lucide-react';
import { HotelReview, WebsiteReview, Hotel } from '../types';
import { SAMPLE_HOTEL_REVIEWS, SAMPLE_WEBSITE_REVIEWS } from '../data/mockData';

interface ReviewsViewProps {
  hotels: Hotel[];
  selectedProvince: string;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ hotels, selectedProvince }) => {
  // Main Tab: Hotel Reviews vs Website Reviews (แยกกันตามคำขอ)
  const [activeReviewTab, setActiveReviewTab] = useState<'hotel' | 'website'>('hotel');

  // Hotel reviews state
  const [hotelReviews, setHotelReviews] = useState<HotelReview[]>(SAMPLE_HOTEL_REVIEWS);
  const [hotelFilterType, setHotelFilterType] = useState<'all' | 'pet' | 'nonpet'>('all');
  const [hotelSearchText, setHotelSearchText] = useState('');
  const [selectedHotelFilter, setSelectedHotelFilter] = useState<string>('all');

  // Website reviews state
  const [websiteReviews, setWebsiteReviews] = useState<WebsiteReview[]>(SAMPLE_WEBSITE_REVIEWS);
  const [websiteCategoryFilter, setWebsiteCategoryFilter] = useState<string>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New Website Review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('นักท่องเที่ยว / ผู้ใช้งานทั่วไป');
  const [newRating, setNewRating] = useState(5);
  const [newCategory, setNewCategory] = useState<WebsiteReview['category']>('ระบบจับคู่ AI');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submitSuccessToast, setSubmitSuccessToast] = useState(false);

  // Filtered Hotel Reviews
  const filteredHotelReviews = useMemo(() => {
    return hotelReviews.filter(rev => {
      const matchSearch = rev.hotelName.toLowerCase().includes(hotelSearchText.toLowerCase()) ||
                          rev.comment.toLowerCase().includes(hotelSearchText.toLowerCase()) ||
                          rev.province.toLowerCase().includes(hotelSearchText.toLowerCase());
      const matchPet = hotelFilterType === 'all' 
        ? true 
        : hotelFilterType === 'pet' ? rev.petBrought : !rev.petBrought;
      const matchHotel = selectedHotelFilter === 'all' || rev.hotelId === selectedHotelFilter;
      const matchProvince = selectedProvince === 'ทุกจังหวัด' || rev.province === selectedProvince;

      return matchSearch && matchPet && matchHotel && matchProvince;
    });
  }, [hotelReviews, hotelSearchText, hotelFilterType, selectedHotelFilter, selectedProvince]);

  // Filtered Website Reviews
  const filteredWebsiteReviews = useMemo(() => {
    return websiteReviews.filter(rev => {
      const matchCat = websiteCategoryFilter === 'all' || rev.category === websiteCategoryFilter;
      return matchCat;
    });
  }, [websiteReviews, websiteCategoryFilter]);

  // Handle Likes for helpful reviews
  const handleLikeHotelReview = (id: string) => {
    setHotelReviews(prev => prev.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
  };

  const handleLikeWebsiteReview = (id: string) => {
    setWebsiteReviews(prev => prev.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
  };

  // Submit Website Review
  const handleSubmitWebsiteReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newTitle || !newComment) return;

    const newRev: WebsiteReview = {
      id: `WR_${Date.now()}`,
      author: newAuthor,
      role: newRole,
      rating: newRating,
      date: 'วันนี้',
      category: newCategory,
      title: newTitle,
      comment: newComment,
      helpfulCount: 1,
      device: 'เว็บเบราว์เซอร์ / StayMatch App'
    };

    setWebsiteReviews([newRev, ...websiteReviews]);
    setIsWriteModalOpen(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    setSubmitSuccessToast(true);
    setTimeout(() => setSubmitSuccessToast(false), 3500);
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Success Toast */}
      {submitSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-500 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>ขอบคุณสำหรับรีวิวเว็บไซต์ StayMatch! รีวิวของคุณได้รับการเผยแพร่เรียบร้อยแล้ว</span>
        </div>
      )}

      {/* Review Section Master Header with Distinct Tab Switcher */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#d2af91]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d2af91]/25 text-[#2b2320] text-xs font-bold mb-1.5 border border-[#d2af91]/40">
              <Award className="w-3.5 h-3.5 text-[#a93f3f]" />
              ศูนย์รวมรีวิวและความคิดเห็น (Verified Reviews Hub)
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2b2320]">
              รีวิวที่พัก & รีวิวเว็บไซต์ StayMatch (แยกส่วนชัดเจน)
            </h2>
            <p className="text-xs text-[#6b5c54] mt-1">
              อ่านรีวิวประสบการณ์เข้าพักจริงในโรงแรม และรีวิวประเมินความพึงพอใจต่อระบบและเว็บไซต์ของเรา
            </p>
          </div>

          {/* Distinct 2-Way Tab Switcher */}
          <div className="flex items-center p-1.5 bg-[#fbf7f4] rounded-2xl border border-[#d2af91]/50 self-start md:self-auto">
            <button
              onClick={() => setActiveReviewTab('hotel')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeReviewTab === 'hotel'
                  ? 'bg-white text-[#2b2320] shadow-sm border border-[#d2af91]/50'
                  : 'text-[#6b5c54] hover:text-[#2b2320]'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#a93f3f]" />
              <span>🏨 รีวิวโรงแรมและที่พัก ({hotelReviews.length})</span>
            </button>

            <button
              onClick={() => setActiveReviewTab('website')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeReviewTab === 'website'
                  ? 'bg-white text-[#2b2320] shadow-sm border border-[#d2af91]/50'
                  : 'text-[#6b5c54] hover:text-[#2b2320]'
              }`}
            >
              <Globe className="w-4 h-4 text-[#a93f3f]" />
              <span>🌐 รีวิวเว็บไซต์ของเรา ({websiteReviews.length})</span>
            </button>
          </div>
        </div>

        {/* Sub-header Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <div className="bg-[#fbf7f4]/50 p-3.5 rounded-2xl border border-[#d2af91]/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d2af91]/50 text-[#8c355c] flex items-center justify-center font-bold">
              ★ 4.8
            </div>
            <div>
              <span className="text-[11px] text-[#6b5c54] block">คะแนนเฉลี่ยรีวิวโรงแรม</span>
              <strong className="text-sm font-bold text-[#2b2320]">พึงพอใจ 96.4% จากผู้เข้าพักจริง</strong>
            </div>
          </div>

          <div className="bg-[#fbf7f4]/50 p-3.5 rounded-2xl border border-[#d2af91]/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d2af91]/50 text-[#a93f3f] flex items-center justify-center font-bold">
              ★ 4.9
            </div>
            <div>
              <span className="text-[11px] text-[#6b5c54] block">คะแนนเฉลี่ยเว็บไซต์ StayMatch</span>
              <strong className="text-sm font-bold text-[#2b2320]">ระบบใช้งานง่าย & จองสะดวก</strong>
            </div>
          </div>

          <div className="bg-[#fbf7f4]/50 p-3.5 rounded-2xl border border-[#d2af91]/40 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#6b5c54] block">ร่วมแสดงความคิดเห็น</span>
              <span className="text-xs text-[#2b2320] font-bold">แบ่งปันประสบการณ์ใช้งานเว็บ</span>
            </div>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#d2af91] hover:bg-[#b89270] text-[#2b2320] text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เขียนรีวิวเว็บ</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: HOTEL REVIEWS ================= */}
      {activeReviewTab === 'hotel' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Controls Bar for Hotel Reviews */}
          <div className="bg-white/95 rounded-2xl p-4 border border-[#d2af91]/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-xs">
              <input
                type="text"
                placeholder="ค้นหารีวิวโรงแรม, จังหวัด, เนื้อหา..."
                value={hotelSearchText}
                onChange={(e) => setHotelSearchText(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#fbf7f4]/40 border border-[#d2af91]/50 rounded-xl text-xs text-[#2b2320] focus:ring-2 focus:ring-[#d2af91]"
              />
              <Search className="w-3.5 h-3.5 text-[#a93f3f] absolute left-2.5 top-2.5" />
            </div>

            {/* Pet vs Non-Pet Filter */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#6b5c54] font-medium flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#a93f3f]" /> ประเภททริป:
              </span>
              {[
                { id: 'all', label: 'ทั้งหมด' },
                { id: 'pet', label: '🐾 ทริปมีสัตว์เลี้ยง' },
                { id: 'nonpet', label: '🚫 ทริปปลอดสัตว์เลี้ยง' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setHotelFilterType(f.id as any)}
                  className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                    hotelFilterType === f.id
                      ? 'bg-[#d2af91] text-[#2b2320] shadow-xs'
                      : 'bg-[#fbf7f4]/50 text-[#6b5c54] border border-[#d2af91]/30 hover:bg-[#fbf7f4]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hotel Reviews Cards Grid */}
          {filteredHotelReviews.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#d2af91]/40">
              <Building2 className="w-10 h-10 text-[#a93f3f]/40 mx-auto mb-2" />
              <p className="text-sm font-bold text-[#2b2320]">ไม่พบรีวิวโรงแรมตามเงื่อนไขที่เลือก</p>
              <p className="text-xs text-[#6b5c54] mt-0.5">ลองปรับคำค้นหาหรือตัวกรองประเภททริป</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHotelReviews.map((rev) => (
                <div 
                  key={rev.id}
                  className="bg-white rounded-3xl p-5 border border-[#d2af91]/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Hotel Name & Pet Tag */}
                    <div className="flex items-start justify-between gap-2 mb-2 pb-2.5 border-b border-[#d2af91]/30">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#6b5c54]">
                          <Building2 className="w-3 h-3 text-[#a93f3f]" />
                          <span>จ.{rev.province}</span>
                          <span>•</span>
                          <span className="font-medium text-[#2b2320]">{rev.roomType}</span>
                        </div>
                        <h4 className="font-bold text-[#2b2320] text-sm mt-0.5 line-clamp-1">
                          {rev.hotelName}
                        </h4>
                      </div>

                      {rev.petBrought ? (
                        <span className="px-2 py-0.5 rounded-lg bg-[#d2af91] text-[#2b2320] text-[10px] font-bold shrink-0 flex items-center gap-1">
                          <Dog className="w-3 h-3" /> รับสัตว์เลี้ยง
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold shrink-0 flex items-center gap-1">
                          🚫 สัตว์ไม่สามารถพักได้
                        </span>
                      )}
                    </div>

                    {/* Review Rating & Title */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(rev.rating) 
                                ? 'text-amber-400 fill-amber-400' 
                                : 'text-slate-200'
                            }`} 
                          />
                        ))}
                        <span className="text-xs font-bold text-[#2b2320] ml-1">{rev.rating}.0</span>
                      </div>
                      <span className="text-[10px] text-[#6b5c54] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#a93f3f]" /> {rev.date}
                      </span>
                    </div>

                    <h5 className="font-bold text-xs text-[#2b2320] mb-1">
                      {rev.title}
                    </h5>

                    <p className="text-xs text-[#6b5c54] leading-relaxed line-clamp-3">
                      "{rev.comment}"
                    </p>

                    {rev.petType && (
                      <div className="mt-2 text-[11px] text-[#8c355c] bg-[#d2af91]/20 px-2.5 py-1 rounded-lg border border-[#d2af91]/40 inline-flex items-center gap-1">
                        🐾 สัตว์เลี้ยงที่นำมา: <strong>{rev.petType}</strong>
                      </div>
                    )}

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {rev.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-[#fbf7f4] text-[#6b5c54] px-2 py-0.5 rounded-md border border-[#d2af91]/30 font-medium">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Reviewer info & Helpful Button */}
                  <div className="pt-3 mt-3 border-t border-[#d2af91]/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src={rev.avatar} 
                        alt={rev.author} 
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover border border-[#d2af91]" 
                      />
                      <div>
                        <span className="text-xs font-bold text-[#2b2320] block leading-tight">{rev.author}</span>
                        <span className="text-[10px] text-emerald-700 flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> พักจริง (Verified Stay)
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLikeHotelReview(rev.id)}
                      className="px-2.5 py-1 rounded-xl bg-[#fbf7f4] hover:bg-[#d2af91]/40 text-[#6b5c54] hover:text-[#2b2320] text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors border border-[#d2af91]/40"
                    >
                      <ThumbsUp className="w-3 h-3 text-[#a93f3f]" />
                      <span>มีประโยชน์ ({rev.helpfulCount})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: WEBSITE REVIEWS ================= */}
      {activeReviewTab === 'website' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Controls Bar for Website Reviews */}
          <div className="bg-white/95 rounded-2xl p-4 border border-[#d2af91]/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6b5c54] font-medium flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#a93f3f]" /> หมวดหมู่รีวิวเว็บ:
              </span>
              <select
                value={websiteCategoryFilter}
                onChange={(e) => setWebsiteCategoryFilter(e.target.value)}
                className="px-3 py-1.5 bg-[#fbf7f4]/40 border border-[#d2af91]/50 rounded-xl text-xs font-semibold text-[#2b2320]"
              >
                <option value="all">ทั้งหมดทุกหมวดหมู่</option>
                <option value="ระบบจับคู่ AI">ระบบจับคู่ AI</option>
                <option value="ความสะดวกในการจอง">ความสะดวกในการจอง</option>
                <option value="ภาพถ่ายห้องพัก">ภาพถ่ายห้องพัก</option>
                <option value="การแสดงผลและข้อมูล">การแสดงผลและข้อมูล</option>
                <option value="ข้อเสนอแนะทั่วไป">ข้อเสนอแนะทั่วไป</option>
              </select>
            </div>

            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#d2af91] hover:bg-[#b89270] text-[#2b2320] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เขียนรีวิวเว็บไซต์ของเรา</span>
            </button>
          </div>

          {/* Website Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWebsiteReviews.map((rev) => (
              <div 
                key={rev.id}
                className="bg-white rounded-3xl p-5 border border-[#d2af91]/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2.5 border-b border-[#d2af91]/30">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#d2af91]/50 text-[#a93f3f] border border-[#d2af91] text-[11px] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#a93f3f]" />
                      หมวดหมู่: {rev.category}
                    </span>
                    <span className="text-[10px] text-[#6b5c54] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#a93f3f]" /> {rev.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(rev.rating) 
                            ? 'text-amber-400 fill-amber-400' 
                            : 'text-slate-200'
                        }`} 
                      />
                    ))}
                    <span className="text-xs font-bold text-[#2b2320] ml-1">{rev.rating}.0</span>
                  </div>

                  <h4 className="font-bold text-sm text-[#2b2320] mb-1.5">
                    {rev.title}
                  </h4>

                  <p className="text-xs text-[#6b5c54] leading-relaxed">
                    "{rev.comment}"
                  </p>

                  <div className="mt-3 text-[10px] text-[#6b5c54] flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    <span>อุปกรณ์ที่ใช้: {rev.device}</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#d2af91]/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#2b2320] block">{rev.author}</span>
                    <span className="text-[10px] text-[#6b5c54]">{rev.role}</span>
                  </div>

                  <button
                    onClick={() => handleLikeWebsiteReview(rev.id)}
                    className="px-2.5 py-1 rounded-xl bg-[#fbf7f4] hover:bg-[#d2af91]/40 text-[#6b5c54] hover:text-[#2b2320] text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors border border-[#d2af91]/40"
                  >
                    <ThumbsUp className="w-3 h-3 text-[#a93f3f]" />
                    <span>มีประโยชน์ ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= WRITE WEBSITE REVIEW MODAL ================= */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#d2af91]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-[#d2af91]/40 flex items-center justify-between bg-[#fbf7f4]">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#a93f3f]" />
                <h3 className="font-bold text-base text-[#2b2320]">
                  เขียนรีวิวเว็บไซต์ StayMatch ของเรา
                </h3>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-[#2b2320] flex items-center justify-center cursor-pointer border border-[#d2af91]/40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitWebsiteReview} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-[#2b2320] block mb-1">
                  ชื่อผู้รีวิว:
                </label>
                <input
                  type="text"
                  placeholder="เช่น คุณพัชราภา หรือ นามสมมุติ"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#d2af91]/60 rounded-xl text-xs font-semibold text-[#2b2320]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2b2320] block mb-1">
                    บทบาท / ลักษณะผู้ใช้งาน:
                  </label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-[#d2af91]/60 rounded-xl text-xs font-medium text-[#2b2320]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2b2320] block mb-1">
                    หมวดหมู่ที่ต้องการรีวิว:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#d2af91]/60 rounded-xl text-xs font-semibold text-[#2b2320]"
                  >
                    <option value="ระบบจับคู่ AI">ระบบจับคู่ AI</option>
                    <option value="ความสะดวกในการจอง">ความสะดวกในการจอง</option>
                    <option value="ภาพถ่ายห้องพัก">ภาพถ่ายห้องพัก</option>
                    <option value="การแสดงผลและข้อมูล">การแสดงผลและข้อมูล</option>
                    <option value="ข้อเสนอแนะทั่วไป">ข้อเสนอแนะทั่วไป</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#2b2320] block mb-1">
                  คะแนนความพึงพอใจ:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          star <= newRating 
                            ? 'text-amber-400 fill-amber-400' 
                            : 'text-slate-200'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#2b2320] ml-2">{newRating} ดาว</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#2b2320] block mb-1">
                  หัวข้อรีวิว:
                </label>
                <input
                  type="text"
                  placeholder="เช่น ระบบค้นหาแม่นยำมาก, สะดวกสบาย..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#d2af91]/60 rounded-xl text-xs font-semibold text-[#2b2320]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2b2320] block mb-1">
                  ความคิดเห็นและข้อเสนอแนะ:
                </label>
                <textarea
                  rows={3}
                  placeholder="เขียนความคิดเห็นของคุณเกี่ยวกับเว็บไซต์ StayMatch..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#d2af91]/60 rounded-xl text-xs font-medium text-[#2b2320]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#6b5c54] border border-[#d2af91]/60 text-xs font-semibold cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#d2af91] hover:bg-[#b89270] text-[#2b2320] text-xs font-bold shadow-xs cursor-pointer"
                >
                  เผยแพร่รีวิว
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
