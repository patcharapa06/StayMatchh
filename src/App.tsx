import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  BarChart3, 
  BrainCircuit, 
  Database, 
  Dog, 
  Compass, 
  Eye, 
  ShieldCheck, 
  Calendar, 
  Sparkles,
  Search,
  MessageSquare,
  BookmarkCheck,
  Star,
  Receipt,
  Route
} from 'lucide-react';
import { Header } from './components/Header';
import { ProvinceSelector } from './components/ProvinceSelector';
import { KpiCards } from './components/KpiCards';
import { HotelGallery } from './components/HotelGallery';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { ModelEvaluationSection } from './components/ModelEvaluationSection';
import { DataDictionaryView } from './components/DataDictionaryView';
import { ExecutiveReportModal } from './components/ExecutiveReportModal';
import { MatchingView } from './components/MatchingView';
import { RouteDistanceView } from './components/RouteDistanceView';
import { ReviewsView } from './components/ReviewsView';
import { BookingsView } from './components/BookingsView';
import { SEED_HOTELS, getHotelsForProvince, SAMPLE_BOOKINGS } from './data/mockData';
import { ALL_77_PROVINCES } from './data/provinces';
import { Hotel, BookingRecord, SharedSearchCriteria } from './types';

export default function App() {
  // Primary State: Province selection (defaults to all or Khon Kaen as in user pilot doc)
  const [selectedProvince, setSelectedProvince] = useState<string>('ทุกจังหวัด');
  const [selectedRegion, setSelectedRegion] = useState<string>('ทั้งหมด');
  const [activeTab, setActiveTab] = useState<
    'matching' | 'route' | 'rooms' | 'analytics' | 'reviews' | 'bookings' | 'model' | 'database'
  >('matching');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Shared Room Search Criteria (ดึงไปใช้ทุกหน้าและตอนกดจองห้องพักอัตโนมัติ ไม่ต้องกรอกใหม่)
  const [searchCriteria, setSearchCriteria] = useState<SharedSearchCriteria>({
    originProvince: 'กรุงเทพมหานคร',
    targetProvince: 'ขอนแก่น',
    includeCorridorHotels: true,
    selectedCorridorProvinceFilter: 'all',
    pointAId: '',
    selectedAttractionId: '',
    minBudget: 800,
    maxBudget: 3500,
    strictBudgetFilter: false,
    checkInDate: '2026-10-05',
    checkOutDate: '2026-10-07',
    guests: 2,
    pet: true,
    petCount: 1,
    petType: 'dog',
    includeNonPetHotels: true,
    preferredType: 'all',
    strictTypeOnly: false,
    wifiNeed: true,
    parkingNeed: true,
    breakfastNeed: false,
    poolNeed: true,
    guestName: '',
    guestPhone: '',
    guestEmail: ''
  });

  const handleUpdateSearchCriteria = React.useCallback(
    (partial: Partial<SharedSearchCriteria>) => {
      setSearchCriteria((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  // Bookings list state (real in-memory persistence across session)
  const [bookings, setBookings] = useState<BookingRecord[]>(SAMPLE_BOOKINGS);

  const handleConfirmBooking = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  // Derive hotels based on province selection
  const currentHotels: Hotel[] = useMemo(() => {
    if (selectedProvince === 'ทุกจังหวัด') {
      return SEED_HOTELS;
    }
    return getHotelsForProvince(selectedProvince);
  }, [selectedProvince]);

  // Executive Summary Metrics
  const totalHotelsCount = currentHotels.length;
  const petFriendlyCount = currentHotels.filter(h => h.petFriendly).length;
  const nonPetCount = totalHotelsCount - petFriendlyCount;
  const avgPrice = totalHotelsCount > 0 
    ? Math.round(currentHotels.reduce((acc, h) => acc + h.price, 0) / totalHotelsCount)
    : 1450;
  const avgRating = totalHotelsCount > 0
    ? Number((currentHotels.reduce((acc, h) => acc + h.rating, 0) / totalHotelsCount).toFixed(1))
    : 4.6;

  return (
    <div className="min-h-screen bg-[#fbf7f4] text-[#2b2320] flex flex-col font-['Prompt','Plus_Jakarta_Sans',sans-serif]">
      {/* Executive Header */}
      <Header
        selectedProvince={selectedProvince}
        totalHotelsCount={totalHotelsCount}
        onExportReport={() => setIsReportModalOpen(true)}
        onNavigateToMatching={() => setActiveTab('matching')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Province Selector for all 77 provinces */}
        <ProvinceSelector
          selectedProvince={selectedProvince}
          onSelectProvince={(prov) => setSelectedProvince(prov)}
          selectedRegion={selectedRegion}
          onSelectRegion={(reg) => setSelectedRegion(reg)}
          hotelCount={totalHotelsCount}
        />

        {/* Executive KPI Cards */}
        <KpiCards
          hotelCount={totalHotelsCount}
          petFriendlyCount={petFriendlyCount}
          avgPrice={avgPrice}
          avgRating={avgRating}
          accuracyRate={94.2}
          selectedProvince={selectedProvince}
        />

        {/* View Tabs Navigation */}
        <div className="flex items-center justify-between gap-3 border-b border-[#d2af91]/50 mb-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold">
            {/* Tab 1: Matcher */}
            <button
              onClick={() => setActiveTab('matching')}
              className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'matching'
                  ? 'border-[#a93f3f] text-[#a93f3f] font-bold bg-[#d2af91]/25 rounded-t-xl'
                  : 'border-transparent text-[#6b5c54] hover:text-[#2b2320] hover:bg-[#d2af91]/15 rounded-t-xl'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#a93f3f]" />
              <span>🎯 ระบบจับคู่ที่พัก (StayMatch Matcher)</span>
            </button>

            {/* Tab 1.5: Point A to B Distance & Closest Hotel */}
            <button
              onClick={() => setActiveTab('route')}
              className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'route'
                  ? 'border-[#a93f3f] text-[#a93f3f] font-bold bg-[#d2af91]/25 rounded-t-xl'
                  : 'border-transparent text-[#6b5c54] hover:text-[#2b2320] hover:bg-[#d2af91]/15 rounded-t-xl'
              }`}
            >
              <Route className="w-4 h-4 text-[#a93f3f]" />
              <span>🧭 เส้นทางข้ามจังหวัด (จ.A ➔ จ.B) & ที่พักระหว่างทาง</span>
            </button>

            {/* Tab 2: Gallery */}
            <button
              onClick={() => setActiveTab('rooms')}
              className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'rooms'
                  ? 'border-[#a93f3f] text-[#a93f3f] font-bold bg-[#d2af91]/25 rounded-t-xl'
                  : 'border-transparent text-[#6b5c54] hover:text-[#2b2320] hover:bg-[#d2af91]/15 rounded-t-xl'
              }`}
            >
              <Eye className="w-4 h-4 text-[#a93f3f]" />
              <span>🏨 ภาพห้องพัก ({currentHotels.length} แห่ง: รับสัตว์ {petFriendlyCount} / ไม่รับ {nonPetCount})</span>
            </button>

            {/* Tab 3: Analytics */}
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'border-[#a93f3f] text-[#a93f3f] font-bold bg-[#d2af91]/25 rounded-t-xl'
                  : 'border-transparent text-[#6b5c54] hover:text-[#2b2320] hover:bg-[#d2af91]/15 rounded-t-xl'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#a93f3f]" />
              <span>📊 แดชบอร์ดสถิติผู้บริหาร (12 แผนภาพ & สกอการ์ด)</span>
            </button>

            {/* Tab 4: Reviews */}
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-[#a93f3f] text-[#a93f3f] font-bold bg-[#d2af91]/25 rounded-t-xl'
                  : 'border-transparent text-[#6b5c54] hover:text-[#2b2320] hover:bg-[#d2af91]/15 rounded-t-xl'
              }`}
            >
              <Star className="w-4 h-4 text-[#a93f3f] fill-[#a93f3f]" />
              <span>⭐ รีวิวโรงแรม & รีวิวเว็บไซต์เรา (แยกกัน)</span>
            </button>

            {/* Tab 5: Bookings */}
            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'bookings'
                  ? 'border-[#a93f3f] text-[#a93f3f] font-bold bg-[#d2af91]/25 rounded-t-xl'
                  : 'border-transparent text-[#6b5c54] hover:text-[#2b2320] hover:bg-[#d2af91]/15 rounded-t-xl'
              }`}
            >
              <Receipt className="w-4 h-4 text-[#a93f3f]" />
              <span>📋 รายการจองที่พัก ({bookings.length})</span>
            </button>

            {/* Tab 6: Machine Learning */}
            <button
              onClick={() => setActiveTab('model')}
              className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'model'
                  ? 'border-[#a93f3f] text-[#a93f3f] font-bold bg-[#d2af91]/25 rounded-t-xl'
                  : 'border-transparent text-[#6b5c54] hover:text-[#2b2320] hover:bg-[#d2af91]/15 rounded-t-xl'
              }`}
            >
              <BrainCircuit className="w-4 h-4 text-[#a93f3f]" />
              <span>🧠 โมเดล CRISP-DM</span>
            </button>

            {/* Tab 7: Data Dictionary */}
            <button
              onClick={() => setActiveTab('database')}
              className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'database'
                  ? 'border-[#a93f3f] text-[#a93f3f] font-bold bg-[#d2af91]/25 rounded-t-xl'
                  : 'border-transparent text-[#6b5c54] hover:text-[#2b2320] hover:bg-[#d2af91]/15 rounded-t-xl'
              }`}
            >
              <Database className="w-4 h-4 text-[#a93f3f]" />
              <span>🗄️ พจนานุกรมข้อมูล</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-[#6b5c54] pb-2">
            <ShieldCheck className="w-4 h-4 text-[#a93f3f]" />
            <span>จับคู่ความพึงพอใจ 94.2%</span>
          </div>
        </div>

        {/* Tab 0: Interactive Matching Engine */}
        {activeTab === 'matching' && (
          <div className="space-y-6">
            <MatchingView
              hotels={currentHotels}
              selectedProvince={selectedProvince}
              onSelectProvince={(prov) => setSelectedProvince(prov)}
              searchCriteria={searchCriteria}
              onUpdateSearchCriteria={handleUpdateSearchCriteria}
              onConfirmBooking={handleConfirmBooking}
              onOpenRouteTab={() => setActiveTab('route')}
            />
          </div>
        )}

        {/* Tab 0.5: Point A to Point B Route Distance & Nearest Accommodation */}
        {activeTab === 'route' && (
          <div className="space-y-6">
            <RouteDistanceView
              selectedProvince={selectedProvince}
              onSelectProvince={(prov) => setSelectedProvince(prov)}
              searchCriteria={searchCriteria}
              onUpdateSearchCriteria={handleUpdateSearchCriteria}
              onConfirmBooking={handleConfirmBooking}
            />
          </div>
        )}

        {/* Tab 1: Hotel Gallery with Room Pictures */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <HotelGallery
              hotels={currentHotels}
              selectedProvince={selectedProvince}
              searchCriteria={searchCriteria}
              onUpdateSearchCriteria={handleUpdateSearchCriteria}
              onConfirmBooking={handleConfirmBooking}
            />
          </div>
        )}

        {/* Tab 2: Executive BI Analytics (10+ Charts, Circle, Continuous, Scorecards) */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <AnalyticsCharts
              selectedProvince={selectedProvince}
            />
          </div>
        )}

        {/* Tab 3: Reviews (Hotel Reviews & Website Reviews Separated) */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <ReviewsView
              hotels={currentHotels}
              selectedProvince={selectedProvince}
            />
          </div>
        )}

        {/* Tab 4: Booking Management System */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <BookingsView
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              onNavigateToMatching={() => setActiveTab('matching')}
            />
          </div>
        )}

        {/* Tab 5: Data Mining Model & Live Simulation */}
        {activeTab === 'model' && (
          <div className="space-y-6">
            <ModelEvaluationSection
              onSelectProvince={(prov) => {
                setSelectedProvince(prov);
                setActiveTab('rooms');
              }}
            />
          </div>
        )}

        {/* Tab 6: Data Dictionary & Query Logs */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <DataDictionaryView />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#d2af91]/40 py-6 mt-12 text-center text-xs text-[#6b5c54]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#a93f3f] text-white flex items-center justify-center font-bold text-[10px] shadow-2xs">
              S
            </div>
            <span className="font-semibold text-[#2b2320]">StayMatch Executive Analytics & Booking</span>
            <span className="text-[#6b5c54]">— ระบบวิเคราะห์และจับคู่ที่พักสำหรับนักท่องเที่ยวและสัตว์เลี้ยง</span>
          </div>
          <p className="text-[#6b5c54]">
            ครอบคลุม 77 จังหวัดทั่วไทย | รองรับทั้งที่พักรับสัตว์เลี้ยง & ที่พักปลอดสัตว์เลี้ยง
          </p>
        </div>
      </footer>

      {/* Executive Report Modal */}
      <ExecutiveReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        selectedProvince={selectedProvince}
        hotelCount={totalHotelsCount}
        petFriendlyCount={petFriendlyCount}
        avgPrice={avgPrice}
      />
    </div>
  );
}
