import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Dog,
  MapPin,
  Banknote,
  Users,
  Wifi,
  Car,
  Coffee,
  Waves,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Eye,
  BookmarkCheck,
  Building2,
  ShieldCheck,
  CreditCard,
  TrendingDown,
  TrendingUp,
  Check,
  ArrowRightLeft,
  Route,
  Award,
  Navigation,
  Calendar
} from 'lucide-react';
import { Hotel, BookingRecord, SharedSearchCriteria } from '../types';
import { ALL_77_PROVINCES } from '../data/provinces';
import {
  getAttractionsForProvince,
  calculateRoadDistanceKm,
  findCorridorProvincesBetween,
  formatDriveDuration
} from '../data/attractions';
import { getHotelsForProvince } from '../data/mockData';
import { RoomModal } from './RoomModal';
import { BookingModal } from './BookingModal';

interface MatchingViewProps {
  hotels: Hotel[];
  selectedProvince: string;
  onSelectProvince: (prov: string) => void;
  searchCriteria?: SharedSearchCriteria;
  onUpdateSearchCriteria?: (partial: Partial<SharedSearchCriteria>) => void;
  onSaveSearchRecord?: (record: any) => void;
  onConfirmBooking?: (booking: BookingRecord) => void;
  onOpenRouteTab?: () => void;
}

export const MatchingView: React.FC<MatchingViewProps> = ({
  hotels,
  selectedProvince,
  onSelectProvince,
  searchCriteria,
  onUpdateSearchCriteria,
  onSaveSearchRecord,
  onConfirmBooking,
  onOpenRouteTab
}) => {
  // Province A (Origin) -> Province B (Destination) initialized from shared search criteria
  const [originProvince, setOriginProvince] = useState<string>(
    searchCriteria?.originProvince || 'กรุงเทพมหานคร'
  );
  const [targetProvince, setTargetProvince] = useState<string>(
    searchCriteria?.targetProvince ||
      (selectedProvince === 'ทุกจังหวัด' ? 'ขอนแก่น' : selectedProvince)
  );
  const [includeCorridorHotels, setIncludeCorridorHotels] = useState<boolean>(
    searchCriteria?.includeCorridorHotels ?? true
  );
  const [selectedCorridorProvinceFilter, setSelectedCorridorProvinceFilter] = useState<string>(
    searchCriteria?.selectedCorridorProvinceFilter || 'all'
  );

  // Sync province when parent selector changes to a specific province
  React.useEffect(() => {
    if (selectedProvince !== 'ทุกจังหวัด' && selectedProvince !== targetProvince) {
      setTargetProvince(selectedProvince);
      setSelectedCorridorProvinceFilter('all');
    }
  }, [selectedProvince]);

  // Feature 4: ปรับงบประมาณแบบเลือกได้ต่ำสุดเท่าไหร่สูงสุดเท่าไหร่ (Min-Max Budget Selection)
  const [minBudget, setMinBudget] = useState<number>(searchCriteria?.minBudget ?? 800);
  const [maxBudget, setMaxBudget] = useState<number>(searchCriteria?.maxBudget ?? 3500);
  const [strictBudgetFilter, setStrictBudgetFilter] = useState<boolean>(
    searchCriteria?.strictBudgetFilter ?? false
  );

  const [checkInDate, setCheckInDate] = useState<string>(
    searchCriteria?.checkInDate || '2026-10-05'
  );
  const [checkOutDate, setCheckOutDate] = useState<string>(
    searchCriteria?.checkOutDate || '2026-10-07'
  );
  const [guests, setGuests] = useState<number>(searchCriteria?.guests ?? 2);
  const [pet, setPet] = useState<boolean>(searchCriteria?.pet ?? true);
  const [petCount, setPetCount] = useState<number>(searchCriteria?.petCount ?? 1);
  const [petType, setPetType] = useState<'dog' | 'cat' | 'all'>(
    searchCriteria?.petType || 'dog'
  );

  // Feature 3: ให้ขึ้นที่พักที่สัตว์ไม่สามารถพักได้ด้วย (Toggle to show non-pet accommodations)
  const [includeNonPetHotels, setIncludeNonPetHotels] = useState<boolean>(
    searchCriteria?.includeNonPetHotels ?? true
  );
  const [preferredType, setPreferredType] = useState<string>(
    searchCriteria?.preferredType || 'all'
  );
  const [strictTypeOnly, setStrictTypeOnly] = useState<boolean>(
    searchCriteria?.strictTypeOnly ?? false
  );
  const [wifiNeed, setWifiNeed] = useState<boolean>(searchCriteria?.wifiNeed ?? true);
  const [parkingNeed, setParkingNeed] = useState<boolean>(
    searchCriteria?.parkingNeed ?? true
  );
  const [breakfastNeed, setBreakfastNeed] = useState<boolean>(
    searchCriteria?.breakfastNeed ?? false
  );
  const [poolNeed, setPoolNeed] = useState<boolean>(searchCriteria?.poolNeed ?? true);
  const [algorithm, setAlgorithm] = useState<string>('Random Forest');

  // Sort Mode: AI Score vs Closest along A->B Route vs Closest to A vs Closest to B
  const [resultSortBy, setResultSortBy] = useState<
    'score' | 'closest_route' | 'closest_a' | 'closest_b'
  >('score');

  // Available Landmarks / Attractions for Point A (Origin Province) and Point B (Destination Province)
  const availableAttractionsA = useMemo(() => {
    return getAttractionsForProvince(originProvince);
  }, [originProvince]);

  const availableAttractions = useMemo(() => {
    return getAttractionsForProvince(targetProvince);
  }, [targetProvince]);

  // Corridor provinces along the route from originProvince -> targetProvince
  const corridorProvinces = useMemo(() => {
    return findCorridorProvincesBetween(originProvince, targetProvince);
  }, [originProvince, targetProvince]);

  // Point A (Origin / Starting Landmark) & Point B (Destination Attraction)
  const [pointAId, setPointAId] = useState<string>(searchCriteria?.pointAId || '');
  const [selectedAttractionId, setSelectedAttractionId] = useState<string>(
    searchCriteria?.selectedAttractionId || ''
  );

  // Sync changes back to parent SharedSearchCriteria so Route tab, Gallery, and BookingModal never require re-entry
  React.useEffect(() => {
    if (onUpdateSearchCriteria) {
      onUpdateSearchCriteria({
        originProvince,
        targetProvince,
        includeCorridorHotels,
        selectedCorridorProvinceFilter,
        pointAId,
        selectedAttractionId,
        minBudget,
        maxBudget,
        strictBudgetFilter,
        checkInDate,
        checkOutDate,
        guests,
        pet,
        petCount,
        petType,
        includeNonPetHotels,
        preferredType,
        strictTypeOnly,
        wifiNeed,
        parkingNeed,
        breakfastNeed,
        poolNeed
      });
    }
  }, [
    originProvince,
    targetProvince,
    includeCorridorHotels,
    selectedCorridorProvinceFilter,
    pointAId,
    selectedAttractionId,
    minBudget,
    maxBudget,
    strictBudgetFilter,
    checkInDate,
    checkOutDate,
    guests,
    pet,
    petCount,
    petType,
    includeNonPetHotels,
    preferredType,
    strictTypeOnly,
    wifiNeed,
    parkingNeed,
    breakfastNeed,
    poolNeed
  ]);

  // Keep Point A and Point B valid when province changes
  const activePointA = useMemo(() => {
    const found = availableAttractionsA.find((a) => a.attractionId === pointAId);
    if (found) return found;
    return availableAttractionsA[3] || availableAttractionsA[1] || availableAttractionsA[0];
  }, [availableAttractionsA, pointAId]);

  const activeAttraction = useMemo(() => {
    const found = availableAttractions.find((a) => a.attractionId === selectedAttractionId);
    if (
      found &&
      (originProvince !== targetProvince || found.attractionId !== activePointA?.attractionId)
    ) {
      return found;
    }
    return availableAttractions[0];
  }, [availableAttractions, selectedAttractionId, activePointA, originProvince, targetProvince]);

  // Calculate Direct Distance from Point A to Point B
  const directABDistanceKm = useMemo(() => {
    if (!activePointA || !activeAttraction) return 0;
    return calculateRoadDistanceKm(
      activePointA.latitude,
      activePointA.longitude,
      activeAttraction.latitude,
      activeAttraction.longitude
    );
  }, [activePointA, activeAttraction]);

  const directABDriveMins = useMemo(() => {
    const speed = directABDistanceKm > 50 ? 72 : 42;
    return Math.max(3, Math.round((directABDistanceKm / speed) * 60));
  }, [directABDistanceKm]);

  const handleSwapAB = () => {
    if (originProvince !== targetProvince) {
      const oldOrigin = originProvince;
      setOriginProvince(targetProvince);
      setTargetProvince(oldOrigin);
      setPointAId('');
      setSelectedAttractionId('');
      setSelectedCorridorProvinceFilter('all');
    } else {
      if (!activePointA || !activeAttraction) return;
      const oldA = activePointA.attractionId;
      setPointAId(activeAttraction.attractionId);
      setSelectedAttractionId(oldA);
    }
  };

  // Modals state
  const [modalHotel, setModalHotel] = useState<Hotel | null>(null);
  const [selectedHotelForBooking, setSelectedHotelForBooking] = useState<Hotel | null>(null);
  const [selectedBookingRoomType, setSelectedBookingRoomType] = useState<string | undefined>(
    undefined
  );
  const [savedRecords, setSavedRecords] = useState<string[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  const effectiveSearchCriteria: SharedSearchCriteria = useMemo(
    () => ({
      originProvince,
      targetProvince,
      includeCorridorHotels,
      selectedCorridorProvinceFilter,
      pointAId,
      selectedAttractionId,
      minBudget,
      maxBudget,
      strictBudgetFilter,
      checkInDate,
      checkOutDate,
      guests,
      pet,
      petCount,
      petType,
      includeNonPetHotels,
      preferredType,
      strictTypeOnly,
      wifiNeed,
      parkingNeed,
      breakfastNeed,
      poolNeed,
      guestName: searchCriteria?.guestName ?? '',
      guestPhone: searchCriteria?.guestPhone ?? '',
      guestEmail: searchCriteria?.guestEmail ?? ''
    }),
    [
      originProvince,
      targetProvince,
      includeCorridorHotels,
      selectedCorridorProvinceFilter,
      pointAId,
      selectedAttractionId,
      minBudget,
      maxBudget,
      strictBudgetFilter,
      checkInDate,
      checkOutDate,
      guests,
      pet,
      petCount,
      petType,
      includeNonPetHotels,
      preferredType,
      strictTypeOnly,
      wifiNeed,
      parkingNeed,
      breakfastNeed,
      poolNeed,
      searchCriteria
    ]
  );

  // Load Presets with updated Min & Max Budgets
  const handleLoadPilotPreset = () => {
    setOriginProvince('ขอนแก่น');
    setTargetProvince('ขอนแก่น');
    setPointAId('A00005'); // ม.ขอนแก่น (KKU)
    setSelectedAttractionId('A00001'); // บึงแก่นนคร
    setSelectedCorridorProvinceFilter('all');
    setMinBudget(800);
    setMaxBudget(1800);
    setStrictBudgetFilter(false);
    setGuests(2);
    setPet(true);
    setPetCount(1);
    setPetType('dog');
    setIncludeNonPetHotels(true);
    setPreferredType('all');
    setStrictTypeOnly(false);
    setWifiNeed(true);
    setParkingNeed(true);
    setBreakfastNeed(false);
    setPoolNeed(true);
  };

  const handleLoadInterProvincePreset = (fromProv: string, toProv: string) => {
    setOriginProvince(fromProv);
    setTargetProvince(toProv);
    setIncludeCorridorHotels(true);
    setSelectedCorridorProvinceFilter('all');
    setPointAId('');
    setSelectedAttractionId('');
    setMinBudget(800);
    setMaxBudget(4500);
    setStrictBudgetFilter(false);
  };

  const handleLoadHuaHinPreset = () => {
    setOriginProvince('กรุงเทพมหานคร');
    setTargetProvince('ประจวบคีรีขันธ์');
    setIncludeCorridorHotels(true);
    setSelectedCorridorProvinceFilter('all');
    setPointAId('A00023'); // สยามพารากอน กรุงเทพฯ
    setSelectedAttractionId('A00030'); // หาดหัวหิน
    setMinBudget(1200);
    setMaxBudget(4800);
    setStrictBudgetFilter(false);
    setGuests(4);
    setPet(true);
    setPetCount(2);
    setPetType('dog');
    setIncludeNonPetHotels(true);
    setPreferredType('all');
    setStrictTypeOnly(false);
    setWifiNeed(true);
    setParkingNeed(true);
    setBreakfastNeed(true);
    setPoolNeed(true);
  };

  const handleLoadNonPetPreset = () => {
    setOriginProvince('ขอนแก่น');
    setTargetProvince('ขอนแก่น');
    setSelectedCorridorProvinceFilter('all');
    setPointAId('A00006'); // สนามบินขอนแก่น
    setSelectedAttractionId('A00001'); // บึงแก่นนคร
    setMinBudget(1500);
    setMaxBudget(3200);
    setStrictBudgetFilter(false);
    setGuests(2);
    setPet(false);
    setPetCount(0);
    setIncludeNonPetHotels(true);
    setPreferredType('Hotel');
    setStrictTypeOnly(false);
    setWifiNeed(true);
    setParkingNeed(true);
    setBreakfastNeed(true);
    setPoolNeed(true);
  };

  const handleLoadVillaPreset = () => {
    setOriginProvince('ขอนแก่น');
    setTargetProvince('เชียงใหม่');
    setIncludeCorridorHotels(true);
    setSelectedCorridorProvinceFilter('all');
    setPointAId('A00005'); // ม.ขอนแก่น
    setSelectedAttractionId('A00011'); // นิมมาน เชียงใหม่
    setMinBudget(1500);
    setMaxBudget(5500);
    setStrictBudgetFilter(false);
    setGuests(4);
    setPet(true);
    setPetCount(2);
    setPetType('dog');
    setIncludeNonPetHotels(true);
    setPreferredType('all');
    setStrictTypeOnly(false);
    setWifiNeed(true);
    setParkingNeed(true);
    setBreakfastNeed(true);
    setPoolNeed(true);
  };

  // Quick Budget Preset Handler
  const handleSetBudgetPreset = (min: number, max: number) => {
    setMinBudget(min);
    setMaxBudget(max);
  };

  // Handlers for Min & Max Budget Inputs with auto-adjustment
  const handleMinBudgetChange = (value: number) => {
    const val = Math.max(0, value);
    setMinBudget(val);
    if (val > maxBudget) {
      setMaxBudget(val + 500);
    }
  };

  const handleMaxBudgetChange = (value: number) => {
    const val = Math.max(0, value);
    setMaxBudget(val);
    if (val < minBudget) {
      setMinBudget(Math.max(0, val - 500));
    }
  };

  // Transit-only provinces along the route
  const transitOnlyProvinces = useMemo(() => {
    return corridorProvinces.filter((s) => s.role === 'transit');
  }, [corridorProvinces]);

  // Perform Match Algorithm with Min-Max Budget Range + Province A to Province B Route Distance
  const matchedHotels = useMemo(() => {
    let candidateList: Hotel[] = [];

    // If user explicitly selected a specific transit/corridor province, show ONLY that province's hotels
    if (selectedCorridorProvinceFilter !== 'all') {
      candidateList = getHotelsForProvince(selectedCorridorProvinceFilter);
    } else if (originProvince !== targetProvince && includeCorridorHotels) {
      const seenIds = new Set<string>();
      for (const step of corridorProvinces) {
        const provHotels = getHotelsForProvince(step.provinceName);
        for (const h of provHotels) {
          if (!seenIds.has(h.hotelId)) {
            seenIds.add(h.hotelId);
            candidateList.push(h);
          }
        }
      }
    } else {
      const provinceHotels = getHotelsForProvince(targetProvince);
      candidateList = provinceHotels.length > 0 ? provinceHotels : hotels;
    }

    // Strict filter by hotel type if enabled
    if (strictTypeOnly && preferredType !== 'all') {
      const typeFiltered = candidateList.filter(
        (h) => h.hotelType.toLowerCase() === preferredType.toLowerCase()
      );
      if (typeFiltered.length > 0) {
        candidateList = typeFiltered;
      }
    }

    // Filter pet policy:
    if (pet && !includeNonPetHotels) {
      candidateList = candidateList.filter((h) => h.petFriendly);
    }

    // Strict Budget Filter: Filter strictly within min and max budget
    if (strictBudgetFilter) {
      candidateList = candidateList.filter(
        (h) => h.price >= minBudget && h.price <= maxBudget
      );
    }

    const mapped = candidateList.map((hotel) => {
      // 1. Pet Suitability constraint
      const petSatisfied = !pet || hotel.petFriendly;

      // 2. Min-Max Budget Evaluation
      const isWithinBudget = hotel.price >= minBudget && hotel.price <= maxBudget;
      let budgetStatus: 'within' | 'under' | 'over' = 'within';
      let budgetDiff = 0;

      if (isWithinBudget) {
        budgetStatus = 'within';
        budgetDiff = 0;
      } else if (hotel.price < minBudget) {
        budgetStatus = 'under';
        budgetDiff = minBudget - hotel.price;
      } else {
        budgetStatus = 'over';
        budgetDiff = hotel.price - maxBudget;
      }

      // 3. Facility Match Calculation
      let totalRequirements = 0;
      let matchedRequirements = 0;

      if (wifiNeed) {
        totalRequirements++;
        if (hotel.wifi) matchedRequirements++;
      }
      if (parkingNeed) {
        totalRequirements++;
        if (hotel.parking) matchedRequirements++;
      }
      if (breakfastNeed) {
        totalRequirements++;
        if (hotel.breakfast) matchedRequirements++;
      }
      if (poolNeed) {
        totalRequirements++;
        if (hotel.pool) matchedRequirements++;
      }

      const facilityMatchPct =
        totalRequirements > 0
          ? Math.round((matchedRequirements / totalRequirements) * 100)
          : 100;

      // 4. Capacity Diff
      const capacityDiff = hotel.capacity - guests;

      // 5. Point A -> Hotel -> Point B Distance Calculation
      const distFromAKm = activePointA
        ? calculateRoadDistanceKm(
            activePointA.latitude,
            activePointA.longitude,
            hotel.latitude,
            hotel.longitude
          )
        : 2.0;

      const distFromBKm = activeAttraction
        ? calculateRoadDistanceKm(
            hotel.latitude,
            hotel.longitude,
            activeAttraction.latitude,
            activeAttraction.longitude
          )
        : hotel.distanceToAttractionKm || 2.5;

      const totalRouteWithHotelKm = Number((distFromAKm + distFromBKm).toFixed(2));
      const detourKm = Number(
        Math.max(0, totalRouteWithHotelKm - directABDistanceKm).toFixed(2)
      );
      const driveFromAMins = Math.max(2, Math.round((distFromAKm / 42) * 60));
      const driveToBMins = Math.max(2, Math.round((distFromBKm / 42) * 60));

      const distanceKm = distFromBKm;

      // 6. Hotel Type Match
      const typeMatched =
        preferredType === 'all' ||
        hotel.hotelType.toLowerCase() === preferredType.toLowerCase();

      // 7. Algorithm Score Calculation
      let rawScore = 0;

      if (pet && !hotel.petFriendly) {
        rawScore = 20;
      } else {
        rawScore += 30;

        if (!pet && !hotel.petFriendly) {
          rawScore += 5;
        }

        // Budget range scoring
        if (isWithinBudget) {
          rawScore += 25;
        } else if (budgetStatus === 'under') {
          rawScore += 22;
        } else {
          const overPct = (hotel.price - maxBudget) / maxBudget;
          if (overPct <= 0.15) {
            rawScore += 12;
          } else if (overPct <= 0.35) {
            rawScore += 5;
          } else {
            rawScore += 0;
          }
        }

        // Facility match score
        rawScore += (facilityMatchPct / 100) * 20;

        // Rating score
        rawScore += (hotel.rating / 5) * 15;

        // Route & Destination Distance score (rewards proximity to A->B route)
        if (detourKm <= 2.5 || distanceKm <= 3.0) rawScore += 10;
        else if (detourKm <= 6.0 || distanceKm <= 6.0) rawScore += 6;
        else rawScore += 2;

        // Preferred Hotel Type bonus/penalty
        if (preferredType !== 'all') {
          if (typeMatched) {
            rawScore += 15;
          } else {
            rawScore -= 10;
          }
        }
      }

      const suitableScore = Math.min(99, Math.max(10, Math.round(rawScore)));
      const isSuitable =
        petSatisfied &&
        (isWithinBudget ||
          budgetStatus === 'under' ||
          (budgetStatus === 'over' && budgetDiff <= 300)) &&
        facilityMatchPct >= 50 &&
        capacityDiff >= 0 &&
        (!strictTypeOnly || typeMatched);

      return {
        ...hotel,
        matchMetrics: {
          isWithinBudget,
          budgetStatus,
          budgetDiff,
          minBudget,
          maxBudget,
          facilityMatchPct,
          capacityDiff,
          distanceKm,
          distFromAKm,
          distFromBKm,
          totalRouteWithHotelKm,
          detourKm,
          driveFromAMins,
          driveToBMins,
          suitableScore,
          isSuitable,
          petSatisfied,
          typeMatched,
        },
      };
    });

    return mapped.sort((a, b) => {
      if (resultSortBy === 'closest_route') {
        return a.matchMetrics.totalRouteWithHotelKm - b.matchMetrics.totalRouteWithHotelKm;
      }
      if (resultSortBy === 'closest_a') {
        return a.matchMetrics.distFromAKm - b.matchMetrics.distFromAKm;
      }
      if (resultSortBy === 'closest_b') {
        return a.matchMetrics.distFromBKm - b.matchMetrics.distFromBKm;
      }
      return b.matchMetrics.suitableScore - a.matchMetrics.suitableScore;
    });
  }, [
    hotels,
    targetProvince,
    minBudget,
    maxBudget,
    strictBudgetFilter,
    guests,
    pet,
    includeNonPetHotels,
    wifiNeed,
    parkingNeed,
    breakfastNeed,
    poolNeed,
    preferredType,
    strictTypeOnly,
    activePointA,
    activeAttraction,
    directABDistanceKm,
    resultSortBy
  ]);

  // Identify the #1 Closest Hotel along A -> B Route (among currently matched hotels)
  const closestRouteHotel = useMemo(() => {
    if (matchedHotels.length === 0) return null;
    return [...matchedHotels].sort(
      (a, b) => a.matchMetrics.totalRouteWithHotelKm - b.matchMetrics.totalRouteWithHotelKm
    )[0];
  }, [matchedHotels]);

  const handleSaveSearch = (hotelId: string) => {
    if (!savedRecords.includes(hotelId)) {
      setSavedRecords((prev) => [...prev, hotelId]);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
      if (onSaveSearchRecord) {
        onSaveSearchRecord({
          hotelId,
          targetProvince,
          minBudget,
          maxBudget,
          budget: maxBudget,
          guests,
          pet,
        });
      }
    }
  };

  // Count how many hotels are in the current budget range
  const countInBudget = useMemo(() => {
    return matchedHotels.filter((h) => h.price >= minBudget && h.price <= maxBudget).length;
  }, [matchedHotels, minBudget, maxBudget]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-500 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>บันทึกผลการจับคู่ลงในประวัติการค้นหาเรียบร้อยแล้ว</span>
        </div>
      )}

      {/* Hero Banner & Presets */}
      <div className="bg-[#d2af91] rounded-3xl p-6 sm:p-7 text-[#2b2320] shadow-sm border border-[#d2af91]/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2b2320] mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#a93f3f]" />
              <span>ระบบจับคู่อัตโนมัติ & เดินทางข้ามจังหวัด จ.A ➔ จ.B (StayMatch AI & Inter-Province Route)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#2b2320]">
              เลือกจากจังหวัดหนึ่งไปอีกจังหวัดหนึ่ง & จับคู่ที่พักที่เหมาะสมที่สุด
            </h2>
            <p className="text-xs sm:text-sm text-[#6b5c54] max-w-2xl mt-1 leading-relaxed">
              รองรับการเลือก<strong>จังหวัดต้นทาง (A) ➔ จังหวัดปลายทาง (B)</strong> เพื่อดูว่าตลอดเส้นทาง (ต้นทาง, จังหวัดทางผ่านแวะพัก และปลายทาง) มีที่พักไหนบ้าง พร้อมคำนวณความเหมาะสม (Suitable) อัตโนมัติ
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#6b5c54] font-semibold block w-full md:w-auto">
              เส้นทางตัวอย่าง:
            </span>
            <button
              onClick={() => handleLoadInterProvincePreset('กรุงเทพมหานคร', 'ขอนแก่น')}
              className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              🚗 กรุงเทพฯ ➔ ขอนแก่น
            </button>
            <button
              onClick={handleLoadVillaPreset}
              className="px-3 py-1.5 rounded-xl bg-white text-[#2b2320] hover:bg-[#fbf7f4] text-xs font-bold transition-all shadow-xs cursor-pointer border border-[#d2af91]/40"
            >
              ⛰️ ขอนแก่น ➔ เชียงใหม่
            </button>
            <button
              onClick={handleLoadHuaHinPreset}
              className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-[#2b2320] text-xs font-bold transition-all cursor-pointer border border-[#d2af91]/40"
            >
              🌊 กรุงเทพฯ ➔ หัวหิน (ประจวบฯ)
            </button>
            <button
              onClick={handleLoadPilotPreset}
              className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-[#2b2320] text-xs font-bold transition-all cursor-pointer border border-[#d2af91]/40"
            >
              ⭐ ภายในขอนแก่น (มข. ➔ บึงแก่นนคร)
            </button>
          </div>
        </div>
      </div>

      {/* 2 Columns: Matching Form (Left 5 cols) & Matched Results (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Criteria Form Controls */}
        <div className="lg:col-span-5 bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#d2af91]/30 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#d2af91]/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#d2af91]/40 text-[#43334e] flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#2b2320] text-base">
                กำหนดเงื่อนไขการจับคู่ (Matching Inputs)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#6b5c54]">
              CRISP-DM Engine
            </span>
          </div>

          {/* 1 & 2. Province A -> Province B & Landmarks Route Selection */}
          <div className="bg-white p-4 rounded-2xl border border-emerald-300/80 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-extrabold text-[#2b2320] flex items-center gap-1.5">
                <Route className="w-4 h-4 text-emerald-700" />
                1. เลือกจังหวัดต้นทาง (A) ➔ จังหวัดปลายทาง (B):
              </label>
              <button
                type="button"
                onClick={handleSwapAB}
                className="px-2 py-1 rounded-lg bg-white hover:bg-[#fbf7f4] text-[11px] font-bold text-[#2b2320] border border-[#d2af91]/50 flex items-center gap-1 cursor-pointer transition-colors"
                title="สลับจังหวัดต้นทาง A กับจังหวัดปลายทาง B"
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>สลับ A ⇄ B</span>
              </button>
            </div>

            {/* Origin Province A & Destination Province B Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-300">
                <span className="text-[11px] font-extrabold text-emerald-900 block mb-1">
                  🟢 จังหวัดต้นทาง (Province A):
                </span>
                <select
                  value={originProvince}
                  onChange={(e) => {
                    setOriginProvince(e.target.value);
                    setPointAId('');
                    setSelectedCorridorProvinceFilter('all');
                  }}
                  className="w-full px-2.5 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs font-bold text-[#2b2320] cursor-pointer mb-1.5"
                >
                  {ALL_77_PROVINCES.map((prov) => (
                    <option key={`orig-${prov.name}`} value={prov.name}>
                      จ.{prov.name} ({prov.region})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] font-semibold text-emerald-800 block mb-0.5">
                  จุดออกเดินทางใน จ.{originProvince}:
                </span>
                <select
                  value={activePointA?.attractionId || ''}
                  onChange={(e) => setPointAId(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-emerald-200 rounded-lg text-[11px] font-semibold text-[#2b2320] cursor-pointer"
                >
                  {availableAttractionsA.map((att) => (
                    <option key={`a-${att.attractionId}`} value={att.attractionId}>
                      {att.attractionName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-[#d2af91]/30 p-2.5 rounded-xl border border-[#a93f3f]/50">
                <span className="text-[11px] font-extrabold text-[#8c2d56] block mb-1">
                  🔴 จังหวัดปลายทาง (Province B):
                </span>
                <select
                  value={targetProvince}
                  onChange={(e) => {
                    setTargetProvince(e.target.value);
                    onSelectProvince(e.target.value);
                    setSelectedAttractionId('');
                    setSelectedCorridorProvinceFilter('all');
                  }}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#a93f3f]/50 rounded-lg text-xs font-bold text-[#2b2320] cursor-pointer mb-1.5"
                >
                  {ALL_77_PROVINCES.map((prov) => (
                    <option key={`dest-${prov.name}`} value={prov.name}>
                      จ.{prov.name} ({prov.region})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] font-semibold text-[#8c2d56] block mb-0.5">
                  จุดหมายใน จ.{targetProvince}:
                </span>
                <select
                  value={activeAttraction?.attractionId || ''}
                  onChange={(e) => setSelectedAttractionId(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-[#a93f3f]/40 rounded-lg text-[11px] font-semibold text-[#2b2320] cursor-pointer"
                >
                  {availableAttractions.map((att) => (
                    <option key={`b-${att.attractionId}`} value={att.attractionId}>
                      {att.attractionName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dedicated Transit Province Selector (คำขอผู้ใช้: เลือกที่พักจังหวัดที่เป็นทางผ่านได้แล้วขึ้นแค่จังหวัดนั้น) */}
            {originProvince !== targetProvince && (
              <div className="bg-amber-50/90 rounded-xl p-3 border-2 border-amber-300 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                    <span>🟡 เลือกที่พักจังหวัดที่เป็นทางผ่าน (ขึ้นเฉพาะจังหวัดนั้น):</span>
                  </span>
                  {selectedCorridorProvinceFilter !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setSelectedCorridorProvinceFilter('all')}
                      className="text-[11px] font-bold text-amber-900 underline cursor-pointer"
                    >
                      ดูทั้งเส้นทาง
                    </button>
                  )}
                </div>

                {/* Dropdown to pick a specific transit province and show ONLY that province */}
                <select
                  value={selectedCorridorProvinceFilter}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedCorridorProvinceFilter(val);
                    if (val !== 'all') {
                      setIncludeCorridorHotels(true);
                    }
                  }}
                  className="w-full px-2.5 py-2 bg-white border border-amber-400 rounded-xl text-xs font-extrabold text-[#2b2320] cursor-pointer"
                >
                  <option value="all">
                    🌐 รวมทุกจังหวัดตามเส้นทาง ({corridorProvinces.length} จังหวัด)
                  </option>
                  <optgroup label={`🟡 จังหวัดทางผ่านบนเส้นทาง จ.${originProvince} ➔ จ.${targetProvince}`}>
                    {transitOnlyProvinces.map((step, idx) => (
                      <option key={`m-tr-${step.provinceName}`} value={step.provinceName}>
                        🟡 ทางผ่านที่ {idx + 1}: เฉพาะที่พักใน จ.{step.provinceName} ({getHotelsForProvince(step.provinceName).length} แห่ง)
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🟢 ต้นทาง / 🔴 ปลายทาง">
                    <option value={originProvince}>
                      🟢 ต้นทาง: เฉพาะที่พักใน จ.{originProvince} ({getHotelsForProvince(originProvince).length} แห่ง)
                    </option>
                    <option value={targetProvince}>
                      🔴 ปลายทาง: เฉพาะที่พักใน จ.{targetProvince} ({getHotelsForProvince(targetProvince).length} แห่ง)
                    </option>
                  </optgroup>
                </select>

                {/* Quick 1-Click Transit Province Pills */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-900 block">
                    ⚡ คลิกจังหวัดทางผ่านเพื่อดูเฉพาะจังหวัดนั้น:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {transitOnlyProvinces.map((step, idx) => {
                      const isSel = selectedCorridorProvinceFilter === step.provinceName;
                      const count = getHotelsForProvince(step.provinceName).length;
                      return (
                        <button
                          key={`pill-tr-${step.provinceName}`}
                          type="button"
                          onClick={() => {
                            setIncludeCorridorHotels(true);
                            setSelectedCorridorProvinceFilter(
                              isSel ? 'all' : step.provinceName
                            );
                          }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all border ${
                            isSel
                              ? 'bg-amber-500 text-white border-amber-600 shadow-2xs ring-2 ring-amber-300'
                              : 'bg-white hover:bg-amber-100 text-amber-950 border-amber-300'
                          }`}
                        >
                          🟡 ทางผ่าน {idx + 1}: จ.{step.provinceName} ({count})
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => setSelectedCorridorProvinceFilter('all')}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                        selectedCorridorProvinceFilter === 'all'
                          ? 'bg-[#2b2320] text-white border-[#2b2320]'
                          : 'bg-white/80 text-[#6b5c54] border-[#d2af91]/60'
                      }`}
                    >
                      ดูทั้งหมด ({corridorProvinces.length} จังหวัด)
                    </button>
                  </div>
                </div>

                {selectedCorridorProvinceFilter !== 'all' && (
                  <div className="bg-emerald-900 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between">
                    <span>
                      ✅ แสดงเฉพาะที่พักใน จ.{selectedCorridorProvinceFilter} เท่านั้น ({matchedHotels.length} แห่ง)
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedCorridorProvinceFilter('all')}
                      className="text-[11px] text-amber-300 hover:underline cursor-pointer"
                    >
                      ✕ ล้าง
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Live Distance A -> B Summary & Closest Hotel Answer */}
            <div className="bg-white/95 rounded-xl p-3 border border-emerald-200 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[#6b5c54] font-semibold">
                  ระยะทาง จ.{originProvince} (A) ➔ จ.{targetProvince} (B):
                </span>
                <span className="font-extrabold text-emerald-800 text-sm">
                  {directABDistanceKm} กม. <span className="text-[11px] font-normal text-[#6b5c54]">(~{formatDriveDuration(directABDriveMins)})</span>
                </span>
              </div>

              {closestRouteHotel && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      ที่พักเกาะแนวเส้นทางดีที่สุด:
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setResultSortBy(
                          resultSortBy === 'closest_route' ? 'score' : 'closest_route'
                        )
                      }
                      className="text-[11px] font-bold text-[#a93f3f] hover:underline cursor-pointer"
                    >
                      {resultSortBy === 'closest_route' ? '✓ กำลังเรียงตามระยะใกล้สุด' : 'เรียงตามระยะใกล้สุด'}
                    </button>
                  </div>
                  <p className="font-extrabold text-[#2b2320] truncate">
                    {closestRouteHotel.hotelName} (จ.{closestRouteHotel.province})
                  </p>
                  <p className="text-[11px] text-[#6b5c54]">
                    ห่างจาก A <strong className="text-emerald-700">{closestRouteHotel.matchMetrics.distFromAKm} กม.</strong> · ห่างจาก B <strong className="text-[#a93f3f]">{closestRouteHotel.matchMetrics.distFromBKm} กม.</strong> (รวม {closestRouteHotel.matchMetrics.totalRouteWithHotelKm} กม.)
                  </p>
                </div>
              )}

              {onOpenRouteTab && (
                <button
                  type="button"
                  onClick={onOpenRouteTab}
                  className="w-full mt-1 py-1.5 px-3 rounded-lg bg-[#d2af91]/30 hover:bg-[#d2af91]/50 text-[#2b2320] text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#2b2320]" />
                  <span>เปิดดูแผนผังเส้นทางข้ามจังหวัด A ➔ ที่พัก ➔ B แบบเต็มจอ</span>
                </button>
              )}
            </div>
          </div>

          {/* 3. Min & Max Budget Range Selection */}
          <div className="bg-[#d2af91]/25 p-4 rounded-2xl border border-[#d2af91]/50 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#2b2320] flex items-center gap-1.5">
                <Banknote className="w-4 h-4 text-[#a93f3f]" />
                3. ช่วงงบประมาณ/คืน (ต่ำสุด - สูงสุด):
              </label>
              <span className="text-[11px] font-bold text-[#2b2320]">
                ฿{minBudget.toLocaleString()} – ฿{maxBudget.toLocaleString()}
              </span>
            </div>

            {/* Quick Budget Range Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { label: 'ทุกงบประมาณ', min: 300, max: 15000 },
                { label: 'ประหยัด (500-1,500฿)', min: 500, max: 1500 },
                { label: 'มาตรฐาน (1,500-3,500฿)', min: 1500, max: 3500 },
                { label: 'พรีเมียม (3,500-6,000฿)', min: 3500, max: 6000 },
              ].map((p, idx) => {
                const isActive = minBudget === p.min && maxBudget === p.max;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSetBudgetPreset(p.min, p.max)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold transition-all cursor-pointer text-center ${
                      isActive
                        ? 'bg-[#d2af91] text-[#2b2320] font-bold shadow-2xs ring-1 ring-[#a93f3f]'
                        : 'bg-white text-[#6b5c54] hover:bg-[#fbf7f4] border border-[#d2af91]/40'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Dual Inputs: Min Budget & Max Budget */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] font-bold text-[#6b5c54] block mb-1">
                  งบประมาณต่ำสุด (Min Price):
                </span>
                <div className="relative">
                  <input
                    type="number"
                    value={minBudget}
                    onChange={(e) => handleMinBudgetChange(Number(e.target.value))}
                    step="100"
                    min="0"
                    max={maxBudget}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#d2af91] rounded-xl text-xs font-bold text-[#2b2320] pr-9 focus:ring-2 focus:ring-[#d2af91] focus:outline-none"
                  />
                  <span className="absolute right-2.5 top-2 text-[11px] text-[#6b5c54] font-medium">฿</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#6b5c54] block mb-1">
                  งบประมาณสูงสุด (Max Price):
                </span>
                <div className="relative">
                  <input
                    type="number"
                    value={maxBudget}
                    onChange={(e) => handleMaxBudgetChange(Number(e.target.value))}
                    step="100"
                    min={minBudget}
                    max="30000"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#d2af91] rounded-xl text-xs font-bold text-[#2b2320] pr-9 focus:ring-2 focus:ring-[#d2af91] focus:outline-none"
                  />
                  <span className="absolute right-2.5 top-2 text-[11px] text-[#6b5c54] font-medium">฿</span>
                </div>
              </div>
            </div>

            {/* Interactive Range Sliders */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[10px] text-[#6b5c54] font-medium">
                <span>ปรับสไลเดอร์งบต่ำสุด: ฿{minBudget.toLocaleString()}</span>
                <span>ปรับสไลเดอร์งบสูงสุด: ฿{maxBudget.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="range"
                  min="300"
                  max="10000"
                  step="100"
                  value={minBudget}
                  onChange={(e) => handleMinBudgetChange(Number(e.target.value))}
                  className="w-full accent-[#a93f3f] cursor-pointer"
                />
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="100"
                  value={maxBudget}
                  onChange={(e) => handleMaxBudgetChange(Number(e.target.value))}
                  className="w-full accent-[#a93f3f] cursor-pointer"
                />
              </div>
            </div>

            {/* Strict Filter & Match Count Info */}
            <div className="pt-2 border-t border-[#d2af91]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#2b2320] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={strictBudgetFilter}
                  onChange={(e) => setStrictBudgetFilter(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#a93f3f] accent-[#a93f3f]"
                />
                <span>กรองเฉพาะที่พักที่อยู่ในช่วงงบนี้เท่านั้น (Strict Range)</span>
              </label>

              <span className="text-[11px] font-semibold text-[#6b5c54]">
                ตรงช่วงงบ: <strong className="text-emerald-700">{countInBudget} แห่ง</strong>
              </span>
            </div>
          </div>

          {/* Number of Guests & Check-in / Check-out Dates (ดึงไปใช้ตอนกดจองห้องพักอัตโนมัติ) */}
          <div className="bg-[#fbf7f4]/50 p-3 rounded-2xl border border-[#d2af91]/40 space-y-2.5">
            <div>
              <label className="text-xs font-bold text-[#2b2320] block mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#a93f3f]" />
                จำนวนผู้เข้าพัก (ดึงไปใช้ตอนจองอัตโนมัติ):
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-[#d2af91]/50 rounded-xl text-xs font-bold text-[#2b2320] focus:ring-2 focus:ring-[#d2af91]"
              >
                <option value={1}>1 คน (Solo Traveler)</option>
                <option value={2}>2 คน (Couple / 2 Persons)</option>
                <option value={3}>3 คน (Small Family)</option>
                <option value={4}>4 คน (Family / Group)</option>
                <option value={5}>5 คนขึ้นไป (Large Group)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#d2af91]/30">
              <div>
                <label className="text-[11px] font-bold text-[#2b2320] block mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#a93f3f]" />
                  วันเช็คอิน:
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-[#d2af91]/50 rounded-xl text-xs font-bold text-[#2b2320]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#2b2320] block mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#a93f3f]" />
                  วันเช็คเอาท์:
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-[#d2af91]/50 rounded-xl text-xs font-bold text-[#2b2320]"
                />
              </div>
            </div>
          </div>

          {/* 3.5. Preferred Hotel Type Selection */}
          <div className="bg-[#fbf7f4]/60 p-3.5 rounded-2xl border border-[#d2af91]/40 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#2b2320] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#a93f3f]" />
                ประเภทที่พักที่ต้องการ (Preferred Type):
              </label>
              {preferredType !== 'all' && (
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#6b5c54] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={strictTypeOnly}
                    onChange={(e) => setStrictTypeOnly(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-[#d2af91] focus:ring-[#d2af91] accent-[#d2af91]"
                  />
                  <span>กรองเฉพาะประเภทนี้</span>
                </label>
              )}
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'all', label: 'ทุกประเภท', icon: '🏢' },
                { id: 'Hotel', label: 'โรงแรม', icon: '🏨' },
                { id: 'Resort', label: 'รีสอร์ท', icon: '🌴' },
                { id: 'Villa', label: 'พูลวิลล่า', icon: '🏡' },
                { id: 'Boutique', label: 'บูทีค', icon: '✨' },
                { id: 'Homestay', label: 'โฮมสเตย์', icon: '🌿' },
              ].map((item) => {
                const isSelected = preferredType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPreferredType(item.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#d2af91] text-[#2b2320] shadow-2xs ring-2 ring-[#d2af91]/40 font-bold'
                        : 'bg-white text-[#6b5c54] border border-[#d2af91]/30 hover:bg-[#fbf7f4]'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Pet Configuration + Non-Pet Toggle */}
          <div className="bg-[#d2af91]/20 p-3.5 rounded-2xl border border-[#d2af91]/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2b2320] flex items-center gap-1.5">
                <Dog className="w-4 h-4 text-[#a93f3f]" />
                นำสัตว์เลี้ยงเข้าพัก (Pet Requirement):
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPet(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    pet ? 'bg-[#d2af91] text-[#2b2320] shadow-2xs' : 'bg-white text-[#6b5c54] border border-[#d2af91]/40'
                  }`}
                >
                  Yes (นำมา)
                </button>
                <button
                  type="button"
                  onClick={() => setPet(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !pet ? 'bg-[#d2af91] text-[#2b2320] shadow-2xs' : 'bg-white text-[#6b5c54] border border-[#d2af91]/40'
                  }`}
                >
                  No (ไม่นำมา)
                </button>
              </div>
            </div>

            {pet ? (
              <div className="space-y-2 pt-2 border-t border-[#d2af91]/40 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[11px] text-[#2b2320] block mb-1 font-medium">ชนิดสัตว์เลี้ยง:</span>
                    <select
                      value={petType}
                      onChange={(e) => setPetType(e.target.value as any)}
                      className="w-full px-2 py-1 bg-white border border-[#d2af91] rounded-lg text-xs text-[#2b2320] font-semibold"
                    >
                      <option value="dog">🐕 สุนัข (Dog)</option>
                      <option value="cat">🐈 แมว (Cat)</option>
                      <option value="all">🐾 สุนัขและแมว</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#2b2320] block mb-1 font-medium">จำนวนสัตว์เลี้ยง:</span>
                    <select
                      value={petCount}
                      onChange={(e) => setPetCount(Number(e.target.value))}
                      className="w-full px-2 py-1 bg-white border border-[#d2af91] rounded-lg text-xs text-[#2b2320] font-semibold"
                    >
                      <option value={1}>1 ตัว</option>
                      <option value={2}>2 ตัว</option>
                      <option value={3}>3 ตัวขึ้นไป</option>
                    </select>
                  </div>
                </div>

                {/* Core Feature Checkbox */}
                <div className="pt-2 border-t border-[#d2af91]/30">
                  <label className="flex items-center gap-2 text-xs font-bold text-[#2b2320] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeNonPetHotels}
                      onChange={(e) => setIncludeNonPetHotels(e.target.checked)}
                      className="w-4 h-4 rounded text-[#a93f3f] accent-[#a93f3f]"
                    />
                    <span>ให้ขึ้นที่พักที่สัตว์ไม่สามารถพักได้ด้วย (เพื่อเปรียบเทียบ)</span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-[#d2af91]/40 text-xs text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  ทริปนี้ไม่มีสัตว์เลี้ยง: สามารถพักได้ทุกโรงแรม รวมถึงโรงแรมปลอดสัตว์เลี้ยง 100%
                </span>
              </div>
            )}
          </div>

          {/* 5. Amenities Needs */}
          <div>
            <label className="text-xs font-bold text-[#2b2320] block mb-2">
              ความต้องการสิ่งอำนวยความสะดวก (Facility Needs):
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#d2af91]/40 cursor-pointer hover:bg-[#d2af91]/25">
                <input
                  type="checkbox"
                  checked={wifiNeed}
                  onChange={(e) => setWifiNeed(e.target.checked)}
                  className="rounded text-[#d2af91] focus:ring-[#d2af91] accent-[#d2af91]"
                />
                <span className="flex items-center gap-1 font-medium text-[#2b2320]">
                  <Wifi className="w-3.5 h-3.5 text-[#a93f3f]" /> Wi-Fi ฟรี
                </span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#d2af91]/40 cursor-pointer hover:bg-[#d2af91]/25">
                <input
                  type="checkbox"
                  checked={parkingNeed}
                  onChange={(e) => setParkingNeed(e.target.checked)}
                  className="rounded text-[#d2af91] focus:ring-[#d2af91] accent-[#d2af91]"
                />
                <span className="flex items-center gap-1 font-medium text-[#2b2320]">
                  <Car className="w-3.5 h-3.5 text-[#a93f3f]" /> ที่จอดรถ
                </span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#d2af91]/40 cursor-pointer hover:bg-[#d2af91]/25">
                <input
                  type="checkbox"
                  checked={breakfastNeed}
                  onChange={(e) => setBreakfastNeed(e.target.checked)}
                  className="rounded text-[#d2af91] focus:ring-[#d2af91] accent-[#d2af91]"
                />
                <span className="flex items-center gap-1 font-medium text-[#2b2320]">
                  <Coffee className="w-3.5 h-3.5 text-[#a93f3f]" /> อาหารเช้า
                </span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#d2af91]/40 cursor-pointer hover:bg-[#d2af91]/25">
                <input
                  type="checkbox"
                  checked={poolNeed}
                  onChange={(e) => setPoolNeed(e.target.checked)}
                  className="rounded text-[#d2af91] focus:ring-[#d2af91] accent-[#d2af91]"
                />
                <span className="flex items-center gap-1 font-medium text-[#2b2320]">
                  <Waves className="w-3.5 h-3.5 text-[#a93f3f]" /> สระว่ายน้ำ
                </span>
              </label>
            </div>
          </div>

          {/* 6. Machine Learning Algorithm Selector */}
          <div className="pt-2 border-t border-[#d2af91]/30">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#2b2320] flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-[#a93f3f]" />
                อัลกอริทึมทำนายความเหมาะสม:
              </span>
              <span className="text-[10px] font-bold text-[#2b2320]">
                แม่นยำ 94.2%
              </span>
            </div>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-[#d2af91]/50 rounded-xl text-xs font-semibold text-[#2b2320] focus:ring-2 focus:ring-[#d2af91]"
            >
              <option value="Random Forest">Random Forest (แนะนำสูงสุด - รองรับ Non-linear)</option>
              <option value="Decision Tree">Decision Tree (ลำดับขั้นเงื่อนไข)</option>
              <option value="KNN">KNN (เพื่อนบ้านใกล้เคียง)</option>
              <option value="Naive Bayes">Naive Bayes (ความน่าจะเป็น)</option>
            </select>
          </div>
        </div>

        {/* Right Column: Matched Results Cards */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Results Summary Bar + Sort Selector */}
          <div className="bg-white/95 rounded-2xl p-4 border border-[#d2af91]/40 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-[#2b2320]">
                    {selectedCorridorProvinceFilter !== 'all'
                      ? `🎯 แสดงเฉพาะที่พักจังหวัดทางผ่าน/ที่เลือก: จ.${selectedCorridorProvinceFilter} เท่านั้น (${matchedHotels.length} แห่ง)`
                      : originProvince !== targetProvince && includeCorridorHotels
                        ? `ผลการจับคู่ที่พักตามเส้นทาง จ.${originProvince} ➔ จ.${targetProvince} (${matchedHotels.length} แห่ง)`
                        : `ผลการจับคู่ที่พักในจังหวัด${targetProvince} (${matchedHotels.length} แห่ง)`}
                  </span>
                  <span>·</span>
                  <span className="font-semibold text-[#a93f3f]">
                    งบ ฿{minBudget.toLocaleString()} – ฿{maxBudget.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-[#6b5c54] mt-1">
                  เส้นทาง: <strong className="text-emerald-800">[A: จ.{originProvince}] {activePointA?.attractionName}</strong> ➔ <strong className="text-[#8c2d56]">[B: จ.{targetProvince}] {activeAttraction?.attractionName}</strong> (ระยะทางตรง {directABDistanceKm} กม. · ~{formatDriveDuration(directABDriveMins)})
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs shrink-0">
                <span className="text-[#6b5c54] font-medium">เรียงตาม:</span>
                <select
                  value={resultSortBy}
                  onChange={(e) => setResultSortBy(e.target.value as any)}
                  className="bg-[#fbf7f4]/60 border border-[#d2af91] rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#2b2320] focus:outline-none cursor-pointer"
                >
                  <option value="score">🎯 คะแนนความเหมาะสม AI สูงสุด</option>
                  <option value="closest_route">🏆 ที่พักใกล้เส้นทาง A ➔ B ที่สุด</option>
                  <option value="closest_a">🟢 ที่พักใกล้ต้นทาง A (จ.{originProvince}) ที่สุด</option>
                  <option value="closest_b">🔴 ที่พักใกล้ปลายทาง B (จ.{targetProvince}) ที่สุด</option>
                </select>
              </div>
            </div>

            {/* Closest Hotel to A -> B Highlight Strip */}
            {closestRouteHotel && (
              <div className="bg-emerald-50/80 border border-emerald-300 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <Award className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div className="min-w-0">
                    <span className="font-extrabold text-emerald-950">
                      ที่พักที่ใกล้เส้นทาง A ➔ B ที่สุด: {closestRouteHotel.hotelName} (จ.{closestRouteHotel.province})
                    </span>
                    <span className="block text-[11px] text-emerald-800">
                      ห่างจากจุด A เพียง {closestRouteHotel.matchMetrics.distFromAKm} กม. · ห่างจากจุด B เพียง {closestRouteHotel.matchMetrics.distFromBKm} กม. · รวมแวะพัก {closestRouteHotel.matchMetrics.totalRouteWithHotelKm} กม.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedHotelForBooking(closestRouteHotel)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold shrink-0 cursor-pointer transition-colors"
                >
                  จองที่พักที่ใกล้ที่สุดนี้
                </button>
              </div>
            )}

            {/* Tourist Attractions for the Active Province / Transit Province (คำขอผู้ใช้: ให้ขึ้นสถานที่เที่ยวด้วย) */}
            {(() => {
              const activeProvinceForAttractions =
                selectedCorridorProvinceFilter !== 'all'
                  ? selectedCorridorProvinceFilter
                  : targetProvince;
              const provinceAttractions = getAttractionsForProvince(activeProvinceForAttractions);

              return (
                <div className="bg-[#fbf7f4]/60 border border-[#d2af91]/60 rounded-xl p-3 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-[#2b2320] flex items-center gap-1.5">
                      <span>
                        🏞️ สถานที่ท่องเที่ยวแนะนำใน จ.{activeProvinceForAttractions} ({provinceAttractions.length} แห่ง):
                      </span>
                    </span>
                    <span className="text-[11px] text-[#6b5c54]">
                      {selectedCorridorProvinceFilter !== 'all'
                        ? 'แสดงสถานที่เที่ยวเฉพาะจังหวัดทางผ่านที่คุณเลือก'
                        : 'คลิกเลือกเพื่อตั้งเป็นจุดหมายเที่ยวได้'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {provinceAttractions.map((att) => {
                      const isActiveDest = activeAttraction?.attractionId === att.attractionId;
                      return (
                        <div
                          key={att.attractionId}
                          onClick={() => {
                            if (selectedCorridorProvinceFilter === 'all') {
                              setSelectedAttractionId(att.attractionId);
                            }
                          }}
                          className={`p-2.5 rounded-xl border bg-white text-xs flex items-start justify-between gap-2 transition-all ${
                            selectedCorridorProvinceFilter === 'all' ? 'cursor-pointer' : ''
                          } ${
                            isActiveDest && selectedCorridorProvinceFilter === 'all'
                              ? 'border-[#a93f3f] ring-1 ring-[#a93f3f]/40 bg-rose-50/30'
                              : 'border-[#d2af91]/40 hover:border-[#a93f3f]'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1 mb-0.5">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#d2af91]/30 text-[#2b2320]">
                                {att.attractionType}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  att.petAllowed
                                    ? 'bg-[#d2af91]/60 text-[#2b2320]'
                                    : 'bg-amber-100 text-amber-900'
                                }`}
                              >
                                {att.petAllowed ? '🐾 สัตว์เข้าเที่ยวได้' : '🚫 สัตว์เข้าไม่ได้'}
                              </span>
                            </div>
                            <p className="font-bold text-[#2b2320] leading-snug">
                              {att.attractionName}
                            </p>
                            <span className="text-[10px] text-[#6b5c54]">
                              📍 อ.{att.district} จ.{att.province}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {matchedHotels.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-dashed border-[#d2af91] text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-[#a93f3f] mx-auto" />
                <h4 className="font-bold text-base text-[#2b2320]">ไม่พบที่พักในช่วงงบประมาณที่คุณกำหนด</h4>
                <p className="text-xs text-[#6b5c54] max-w-md mx-auto">
                  ลองขยายช่วงงบประมาณ (เช่น ปรับงบสูงสุดขึ้น หรือปลดตัวกรองเฉพาะช่วงงบ) เพื่อค้นหาที่พักเพิ่มเติม
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMinBudget(500);
                    setMaxBudget(10000);
                    setStrictBudgetFilter(false);
                  }}
                  className="px-4 py-2 bg-[#d2af91] hover:bg-[#b89270] text-[#2b2320] rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  รีเซ็ตช่วงงบประมาณ (500 – 10,000฿)
                </button>
              </div>
            ) : (
              matchedHotels.map((hotel, idx) => {
                const { matchMetrics } = hotel;
                const isSaved = savedRecords.includes(hotel.hotelId);
                const isClosestToRoute =
                  closestRouteHotel?.hotelId === hotel.hotelId;

                return (
                  <div
                    key={hotel.hotelId}
                    className={`bg-white rounded-3xl border transition-all overflow-hidden shadow-xs hover:shadow-md ${
                      idx === 0 && matchMetrics.isSuitable
                        ? 'border-[#a93f3f] ring-2 ring-[#a93f3f]/25'
                        : isClosestToRoute
                          ? 'border-emerald-400 ring-1 ring-emerald-300'
                          : !hotel.petFriendly && pet
                            ? 'border-amber-200 bg-amber-50/15'
                            : 'border-[#d2af91]/40 hover:border-[#a93f3f]'
                    }`}
                  >
                    {/* Top Recommended Tag for Rank #1 */}
                    {idx === 0 && matchMetrics.isSuitable && (
                      <div className="bg-[#a93f3f] px-4 py-1 text-white text-[11px] font-bold flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          อันดับ 1 ที่พักแนะนำตรงเงื่อนไขมากที่สุด (Top Recommendation)
                        </span>
                        <span>โมเดล {algorithm}</span>
                      </div>
                    )}

                    <div className="p-5 flex flex-col sm:flex-row gap-4">
                      {/* Hotel Image & Gallery Shortcut */}
                      <div className="sm:w-44 shrink-0 flex flex-col gap-2">
                        <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 group">
                          <img
                            src={hotel.primaryImage}
                            alt={hotel.hotelName}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white">
                            {hotel.hotelType}
                          </div>
                          {hotel.petFriendly ? (
                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#d2af91] text-[#2b2320] text-[10px] font-bold flex items-center gap-1 shadow-2xs">
                              <Dog className="w-3 h-3" /> พาสัตว์เลี้ยงได้
                            </div>
                          ) : (
                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-2xs">
                              <AlertCircle className="w-3 h-3" /> สัตว์เข้าไม่ได้
                            </div>
                          )}
                        </div>

                        {/* View Room Photos Button */}
                        <button
                          onClick={() => setModalHotel(hotel)}
                          className="w-full py-1.5 px-2 rounded-xl bg-[#fbf7f4] hover:bg-[#ffe5d9] text-[#2b2320] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#d2af91]/30"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#a93f3f]" />
                          <span>ดูภาพห้องจริง ({hotel.rooms.length} ห้อง)</span>
                        </button>
                      </div>

                      {/* Content & Metrics */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                {originProvince !== targetProvince && (
                                  <span
                                    className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                                      hotel.province === originProvince
                                        ? 'bg-emerald-100 text-emerald-900'
                                        : hotel.province === targetProvince
                                          ? 'bg-rose-100 text-rose-900'
                                          : 'bg-amber-100 text-amber-900'
                                    }`}
                                  >
                                    {hotel.province === originProvince
                                      ? `🟢 ต้นทาง: จ.${hotel.province}`
                                      : hotel.province === targetProvince
                                        ? `🔴 ปลายทาง: จ.${hotel.province}`
                                        : `🟡 ทางผ่าน: จ.${hotel.province}`}
                                  </span>
                                )}
                                <h4 className="font-bold text-base text-[#2b2320]">
                                  {hotel.hotelName}
                                </h4>
                                {isClosestToRoute && (
                                  <span className="text-xs font-extrabold text-emerald-700">
                                    · 🏆 ใกล้เส้นทาง A➔B ที่สุด
                                  </span>
                                )}
                                {!hotel.petFriendly && (
                                  <span className="text-xs font-bold text-amber-800">
                                    · 🚫 ปลอดสัตว์เลี้ยง
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#6b5c54] flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-[#a93f3f]" />
                                อ.{hotel.district}, จ.{hotel.province}
                              </p>
                            </div>

                            {/* Suitable Match Score Box */}
                            <div className="text-right shrink-0">
                              <div
                                className={`inline-flex flex-col items-center justify-center px-3 py-1.5 rounded-2xl border ${
                                  matchMetrics.suitableScore >= 80
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : matchMetrics.suitableScore >= 60
                                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                                      : 'bg-rose-50 text-rose-800 border-rose-300'
                                }`}
                              >
                                <span className="text-[10px] font-bold uppercase tracking-wider">
                                  Match Score
                                </span>
                                <span className="text-lg font-extrabold leading-tight">
                                  {matchMetrics.suitableScore}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Route A -> Hotel -> B Distance Breakdown Box */}
                          <div className="my-2.5 p-2.5 rounded-xl bg-[#f8f5f2] border border-[#d2af91]/40 text-xs flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[#2b2320] font-medium">
                              🟢 ห่างจุด A: <strong className="text-emerald-700">{matchMetrics.distFromAKm} กม.</strong> ({matchMetrics.driveFromAMins} นาที)
                            </span>
                            <span>·</span>
                            <span className="text-[#2b2320] font-medium">
                              🔴 ห่างจุด B: <strong className="text-[#a93f3f]">{matchMetrics.distFromBKm} กม.</strong> ({matchMetrics.driveToBMins} นาที)
                            </span>
                            <span>·</span>
                            <span className="text-[#2b2320] font-bold">
                              รวม A➔ที่พัก➔B: {matchMetrics.totalRouteWithHotelKm} กม.
                            </span>
                          </div>

                          {/* Non-Pet Alert Banner if user brings pet */}
                          {!hotel.petFriendly && pet && (
                            <div className="my-2 p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-bold block">
                                  ⚠️ สัตว์ไม่สามารถพักได้ที่นี่ (Non Pet-Friendly)
                                </strong>
                                <span className="text-[11px] text-amber-900">
                                  {hotel.nonPetReason || 'ที่พักมีนโยบายปลอดสัตว์เลี้ยงเพื่อสุขอนามัยและผู้เข้าพักที่แพ้ขนสัตว์'}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Hypoallergenic notice if user does NOT bring pet */}
                          {!pet && !hotel.petFriendly && (
                            <div className="my-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>ปลอดสัตว์เลี้ยง 100% สภาพแวดล้อมสะอาดและเงียบสงบเป็นพิเศษ</span>
                            </div>
                          )}

                          {/* Budget Status Badge & Calculated Metrics */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2.5">
                            {/* Card 1: Min-Max Budget Evaluation */}
                            <div
                              className={`p-2 rounded-xl border text-center ${
                                matchMetrics.isWithinBudget
                                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                                  : matchMetrics.budgetStatus === 'under'
                                    ? 'bg-blue-50/70 border-blue-300 text-blue-900'
                                    : 'bg-rose-50/70 border-rose-300 text-rose-900'
                              }`}
                            >
                              <span className="text-[10px] font-semibold block text-[#6b5c54]">สถานะงบประมาณ</span>
                              <div className="text-xs font-bold flex items-center justify-center gap-1">
                                {matchMetrics.isWithinBudget ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span className="text-emerald-700">ตรงตามงบ</span>
                                  </>
                                ) : matchMetrics.budgetStatus === 'under' ? (
                                  <>
                                    <TrendingDown className="w-3 h-3 text-blue-600" />
                                    <span className="text-blue-700">ประหยัด ฿{matchMetrics.budgetDiff.toLocaleString()}</span>
                                  </>
                                ) : (
                                  <>
                                    <TrendingUp className="w-3 h-3 text-rose-600" />
                                    <span className="text-rose-700">เกินงบ ฿{matchMetrics.budgetDiff.toLocaleString()}</span>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="bg-[#fbf7f4]/40 p-2 rounded-xl border border-[#d2af91]/30 text-center">
                              <span className="text-[10px] text-[#6b5c54] block">Facility Match</span>
                              <span className="text-xs font-bold text-[#2b2320]">
                                {matchMetrics.facilityMatchPct}%
                              </span>
                            </div>

                            <div className="bg-[#fbf7f4]/40 p-2 rounded-xl border border-[#d2af91]/30 text-center">
                              <span className="text-[10px] text-[#6b5c54] block">ระยะอ้อม A➔B</span>
                              <span className="text-xs font-bold text-[#2b2320]">
                                +{matchMetrics.detourKm} กม.
                              </span>
                            </div>

                            <div className="bg-[#fbf7f4]/40 p-2 rounded-xl border border-[#d2af91]/30 text-center">
                              <span className="text-[10px] text-[#6b5c54] block">ความจุห้องพัก</span>
                              <span className="text-xs font-bold text-[#2b2320]">
                                {hotel.capacity} คน (+{matchMetrics.capacityDiff})
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Pricing & Booking / Log Action */}
                        <div className="pt-3 border-t border-[#d2af91]/30 flex items-center justify-between gap-3">
                          <div>
                            <span className="text-[10px] text-[#6b5c54] block font-medium">ราคาห้องพัก</span>
                            <div className="text-base font-bold text-[#2b2320]">
                              ฿{hotel.price.toLocaleString()}
                              <span className="text-xs font-normal text-[#6b5c54]"> / คืน</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSaveSearch(hotel.hotelId)}
                              disabled={isSaved}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                isSaved
                                  ? 'bg-slate-100 text-[#6b5c54] border border-slate-300'
                                  : 'bg-[#fbf7f4] hover:bg-[#fbf7f4]/80 text-[#2b2320] border border-[#d2af91]/40'
                              }`}
                            >
                              <BookmarkCheck className="w-3.5 h-3.5 text-[#a93f3f]" />
                              <span>{isSaved ? 'บันทึกแล้ว' : 'บันทึก'}</span>
                            </button>

                            <button
                              onClick={() => {
                                setSelectedBookingRoomType(undefined);
                                setSelectedHotelForBooking(hotel);
                              }}
                              className="px-4 py-1.5 rounded-xl bg-[#d2af91] hover:bg-[#b89270] active:scale-98 text-[#2b2320] text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>จองที่พักนี้ (ดึงข้อมูลอัตโนมัติ)</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Room Modal */}
      <RoomModal
        hotel={modalHotel}
        isOpen={!!modalHotel}
        onClose={() => setModalHotel(null)}
        onOpenBooking={(h, roomType) => {
          setModalHotel(null);
          setSelectedBookingRoomType(roomType);
          setSelectedHotelForBooking(h);
        }}
      />

      {/* Booking Modal with Auto-Pulled Search Criteria */}
      <BookingModal
        hotel={selectedHotelForBooking}
        selectedRoomType={selectedBookingRoomType}
        searchCriteria={effectiveSearchCriteria}
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
