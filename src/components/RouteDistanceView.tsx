import React, { useState, useMemo } from 'react';
import {
  Navigation,
  MapPin,
  ArrowRightLeft,
  Dog,
  Car,
  Clock,
  Eye,
  CreditCard,
  Compass,
  Award,
  Building2,
  Route,
  ChevronRight,
  Milestone
} from 'lucide-react';
import { Hotel, BookingRecord, SharedSearchCriteria } from '../types';
import { ALL_77_PROVINCES } from '../data/provinces';
import {
  getAttractionsForProvince,
  analyzeHotelsAlongRoute,
  calculateRoadDistanceKm,
  findCorridorProvincesBetween,
  formatDriveDuration
} from '../data/attractions';
import { getHotelsForProvince } from '../data/mockData';
import { RoomModal } from './RoomModal';
import { BookingModal } from './BookingModal';

interface RouteDistanceViewProps {
  selectedProvince: string;
  onSelectProvince: (prov: string) => void;
  searchCriteria?: SharedSearchCriteria;
  onUpdateSearchCriteria?: (partial: Partial<SharedSearchCriteria>) => void;
  onConfirmBooking?: (booking: BookingRecord) => void;
}

export const RouteDistanceView: React.FC<RouteDistanceViewProps> = ({
  selectedProvince,
  onSelectProvince,
  searchCriteria,
  onUpdateSearchCriteria,
  onConfirmBooking
}) => {
  // Travel Mode: 'inter_province' (จังหวัด A -> จังหวัด B) or 'intra_province' (ภายในจังหวัดเดียวกัน)
  const [travelMode, setTravelMode] = useState<'inter_province' | 'intra_province'>(
    searchCriteria && searchCriteria.originProvince === searchCriteria.targetProvince
      ? 'intra_province'
      : 'inter_province'
  );

  // Origin Province (จังหวัดต้นทาง A) & Destination Province (จังหวัดปลายทาง B) pulled from room search
  const [originProvince, setOriginProvince] = useState<string>(
    searchCriteria?.originProvince || 'กรุงเทพมหานคร'
  );
  const [destinationProvince, setDestinationProvince] = useState<string>(
    searchCriteria?.targetProvince ||
      (selectedProvince !== 'ทุกจังหวัด' && selectedProvince !== 'กรุงเทพมหานคร'
        ? selectedProvince
        : 'ขอนแก่น')
  );

  // Sync destination province if user selects a specific province in top global selector
  React.useEffect(() => {
    if (selectedProvince !== 'ทุกจังหวัด') {
      if (travelMode === 'intra_province') {
        setOriginProvince(selectedProvince);
        setDestinationProvince(selectedProvince);
      } else if (selectedProvince !== originProvince) {
        setDestinationProvince(selectedProvince);
      }
    }
  }, [selectedProvince]);

  const effectiveDestProvince =
    travelMode === 'intra_province' ? originProvince : destinationProvince;

  const attractionsA = useMemo(
    () => getAttractionsForProvince(originProvince),
    [originProvince]
  );
  const attractionsB = useMemo(
    () => getAttractionsForProvince(effectiveDestProvince),
    [effectiveDestProvince]
  );

  const [pointAId, setPointAId] = useState<string>(searchCriteria?.pointAId || '');
  const [pointBId, setPointBId] = useState<string>(
    searchCriteria?.selectedAttractionId || ''
  );
  const [sortMode, setSortMode] = useState<'route' | 'closest_b' | 'closest_a' | 'midpoint'>('route');
  const [petFilter, setPetFilter] = useState<'all' | 'pet' | 'nonpet'>(
    searchCriteria
      ? !searchCriteria.includeNonPetHotels && searchCriteria.pet
        ? 'pet'
        : 'all'
      : 'all'
  );
  const [stageFilter, setStageFilter] = useState<'all' | 'destination' | 'transit' | 'origin' | string>(
    searchCriteria?.selectedCorridorProvinceFilter || 'all'
  );
  const [selectedHotelIdOnMap, setSelectedHotelIdOnMap] = useState<string | null>(null);

  // Modals
  const [modalHotel, setModalHotel] = useState<Hotel | null>(null);
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);
  const [selectedBookingRoomType, setSelectedBookingRoomType] = useState<string | undefined>(
    undefined
  );

  // Sync changes back to shared searchCriteria so user never re-enters across tabs
  React.useEffect(() => {
    if (onUpdateSearchCriteria) {
      const specificProv =
        stageFilter !== 'all' &&
        stageFilter !== 'destination' &&
        stageFilter !== 'transit' &&
        stageFilter !== 'origin'
          ? stageFilter
          : 'all';
      onUpdateSearchCriteria({
        originProvince,
        targetProvince: effectiveDestProvince,
        selectedCorridorProvinceFilter: specificProv,
        pointAId,
        selectedAttractionId: pointBId
      });
    }
  }, [originProvince, effectiveDestProvince, stageFilter, pointAId, pointBId]);

  // Active Point A & Point B landmarks
  const pointA = useMemo(() => {
    return attractionsA.find((a) => a.attractionId === pointAId) || attractionsA[0];
  }, [attractionsA, pointAId]);

  const pointB = useMemo(() => {
    const found = attractionsB.find((a) => a.attractionId === pointBId);
    if (found && (travelMode === 'inter_province' || found.attractionId !== pointA?.attractionId)) {
      return found;
    }
    return travelMode === 'intra_province'
      ? attractionsB[1] || attractionsB[0]
      : attractionsB[0];
  }, [attractionsB, pointBId, pointA, travelMode]);

  // Compute corridor provinces along the route from Origin Province A -> Destination Province B
  const corridorSteps = useMemo(() => {
    return findCorridorProvincesBetween(originProvince, effectiveDestProvince);
  }, [originProvince, effectiveDestProvince]);

  // Map province -> hotels count & list
  const corridorHotelsByProvince = useMemo(() => {
    const map: Record<string, Hotel[]> = {};
    for (const step of corridorSteps) {
      const list = getHotelsForProvince(step.provinceName);
      map[step.provinceName] = list.filter((h) => {
        if (petFilter === 'pet') return h.petFriendly;
        if (petFilter === 'nonpet') return !h.petFriendly;
        return true;
      });
    }
    return map;
  }, [corridorSteps, petFilter]);

  // Transit-only steps along the corridor
  const transitOnlySteps = useMemo(() => {
    return corridorSteps.filter((s) => s.role === 'transit');
  }, [corridorSteps]);

  // Combined hotels along the route filtered by stageFilter
  // When a specific province name is selected (e.g. a transit province), ONLY hotels in that province are returned
  const filteredRouteHotels = useMemo(() => {
    const isSpecificProvince =
      stageFilter !== 'all' &&
      stageFilter !== 'destination' &&
      stageFilter !== 'transit' &&
      stageFilter !== 'origin';

    if (isSpecificProvince) {
      const list = getHotelsForProvince(stageFilter);
      return list.filter((h) => {
        if (petFilter === 'pet') return h.petFriendly;
        if (petFilter === 'nonpet') return !h.petFriendly;
        return true;
      });
    }

    const allHotels: Hotel[] = [];
    for (const step of corridorSteps) {
      if (stageFilter === 'destination' && step.role !== 'destination') continue;
      if (stageFilter === 'transit' && step.role !== 'transit') continue;
      if (stageFilter === 'origin' && step.role !== 'origin') continue;
      const list = corridorHotelsByProvince[step.provinceName] || [];
      allHotels.push(...list);
    }
    return allHotels;
  }, [corridorSteps, corridorHotelsByProvince, stageFilter, petFilter]);

  // Perform A -> B route distance analysis
  const routeResults = useMemo(() => {
    if (!pointA || !pointB) return [];
    return analyzeHotelsAlongRoute(
      filteredRouteHotels,
      {
        latitude: pointA.latitude,
        longitude: pointA.longitude,
        province: originProvince
      },
      {
        latitude: pointB.latitude,
        longitude: pointB.longitude,
        province: effectiveDestProvince
      },
      sortMode
    );
  }, [filteredRouteHotels, pointA, pointB, originProvince, effectiveDestProvince, sortMode]);

  // Total hotels across all corridor provinces (before stageFilter)
  const totalCorridorHotelCount = useMemo(() => {
    return (Object.values(corridorHotelsByProvince) as Hotel[][]).reduce(
      (sum, list) => sum + list.length,
      0
    );
  }, [corridorHotelsByProvince]);

  const directABKm = useMemo(() => {
    if (!pointA || !pointB) return 0;
    return calculateRoadDistanceKm(
      pointA.latitude,
      pointA.longitude,
      pointB.latitude,
      pointB.longitude
    );
  }, [pointA, pointB]);

  const directDriveMins = useMemo(() => {
    const speed = directABKm > 50 ? 72 : 42;
    return Math.max(3, Math.round((directABKm / speed) * 60));
  }, [directABKm]);

  const closestOverall = routeResults[0] || null;
  const activeMapAnalysis = useMemo(() => {
    if (selectedHotelIdOnMap) {
      const found = routeResults.find((r) => r.hotel.hotelId === selectedHotelIdOnMap);
      if (found) return found;
    }
    return closestOverall;
  }, [routeResults, selectedHotelIdOnMap, closestOverall]);

  const handleSwapProvincesOrPoints = () => {
    if (travelMode === 'inter_province') {
      const tempProv = originProvince;
      setOriginProvince(destinationProvince);
      setDestinationProvince(tempProv);
      setPointAId('');
      setPointBId('');
      setSelectedHotelIdOnMap(null);
    } else {
      if (!pointA || !pointB) return;
      const tempA = pointA.attractionId;
      setPointAId(pointB.attractionId);
      setPointBId(tempA);
    }
  };

  const handlePresetInterProvinceRoute = (provA: string, provB: string) => {
    setTravelMode('inter_province');
    setOriginProvince(provA);
    setDestinationProvince(provB);
    setPointAId('');
    setPointBId('');
    setStageFilter('all');
    setSelectedHotelIdOnMap(null);
  };

  // Compute SVG Map projection coordinates for Point A, Transit Provinces, Point B, and Hotels
  const mapProjection = useMemo(() => {
    if (!pointA || !pointB) return null;
    const allLats = [
      pointA.latitude,
      pointB.latitude,
      ...corridorSteps.map((s) => s.latitude),
      ...routeResults.map((r) => r.hotel.latitude)
    ];
    const allLons = [
      pointA.longitude,
      pointB.longitude,
      ...corridorSteps.map((s) => s.longitude),
      ...routeResults.map((r) => r.hotel.longitude)
    ];

    const minLat = Math.min(...allLats);
    const maxLat = Math.max(...allLats);
    const minLon = Math.min(...allLons);
    const maxLon = Math.max(...allLons);

    const latSpan = Math.max(0.015, maxLat - minLat);
    const lonSpan = Math.max(0.015, maxLon - minLon);

    const toXY = (lat: number, lon: number) => {
      const x = 75 + ((lon - minLon) / lonSpan) * 450;
      const y = 285 - ((lat - minLat) / latSpan) * 225;
      return { x: Math.round(x), y: Math.round(y) };
    };

    const posA = toXY(pointA.latitude, pointA.longitude);
    const posB = toXY(pointB.latitude, pointB.longitude);
    const posMid = toXY(
      (pointA.latitude + pointB.latitude) / 2,
      (pointA.longitude + pointB.longitude) / 2
    );

    const transitNodes = corridorSteps
      .filter((s) => s.role === 'transit')
      .map((step) => ({
        ...step,
        pos: toXY(step.latitude, step.longitude)
      }));

    const hotelNodes = routeResults.slice(0, 18).map((item, index) => ({
      ...item,
      rank: index + 1,
      pos: toXY(item.hotel.latitude, item.hotel.longitude)
    }));

    return { posA, posB, posMid, transitNodes, hotelNodes };
  }, [pointA, pointB, corridorSteps, routeResults]);

  const getRoleBadge = (role: 'origin' | 'transit' | 'destination', provName: string) => {
    if (travelMode === 'intra_province') {
      return (
        <span className="px-2 py-0.5 rounded-lg bg-[#d2af91]/50 text-[#a93f3f] text-[11px] font-bold">
          จ.{provName}
        </span>
      );
    }
    if (role === 'origin') {
      return (
        <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 text-[11px] font-bold">
          🟢 ต้นทาง: จ.{provName}
        </span>
      );
    }
    if (role === 'transit') {
      return (
        <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 text-[11px] font-bold">
          🟡 ทางผ่านแวะพัก: จ.{provName}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-900 text-[11px] font-bold">
        🔴 ปลายทาง: จ.{provName}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#d2af91] rounded-3xl p-6 sm:p-7 text-[#2b2320] shadow-xs border border-[#d2af91]/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2b2320] mb-1.5">
              <Route className="w-4 h-4 text-[#a93f3f]" />
              <span>ระบบค้นหาที่พักตามเส้นทางข้ามจังหวัด & จุด A ➔ จุด B (Province-to-Province Route & Accommodation Finder)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#2b2320]">
              เลือกเดินทางจากจังหวัดหนึ่ง ➔ ไปอีกจังหวัดหนึ่ง มีที่พักไหนบ้าง?
            </h2>
            <p className="text-xs sm:text-sm text-[#6b5c54] max-w-3xl mt-1 leading-relaxed">
              เลือก<strong>จังหวัดต้นทาง (A)</strong> และ<strong>จังหวัดปลายทาง (B)</strong> ระบบจะวิเคราะห์เส้นทางผ่านจังหวัดต่างๆ พร้อมรวบรวมที่พักทั้งใน<strong>จังหวัดต้นทาง</strong>, <strong>จังหวัดทางผ่านสำหรับแวะพักครึ่งทาง</strong> และ<strong>จังหวัดปลายทาง</strong> ให้ครบในที่เดียว
            </p>
          </div>

          {/* Travel Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-white/80 p-1.5 rounded-2xl border border-[#d2af91]/50 self-start lg:self-center shrink-0">
            <button
              type="button"
              onClick={() => {
                setTravelMode('inter_province');
                if (originProvince === destinationProvince) {
                  setDestinationProvince(originProvince === 'ขอนแก่น' ? 'เชียงใหม่' : 'ขอนแก่น');
                }
                setStageFilter('all');
                setSelectedHotelIdOnMap(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                travelMode === 'inter_province'
                  ? 'bg-[#2b2320] text-white shadow-2xs'
                  : 'text-[#6b5c54] hover:text-[#2b2320]'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>เดินทางข้ามจังหวัด (จ.A ➔ จ.B)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTravelMode('intra_province');
                setStageFilter('all');
                setSelectedHotelIdOnMap(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                travelMode === 'intra_province'
                  ? 'bg-[#2b2320] text-white shadow-2xs'
                  : 'text-[#6b5c54] hover:text-[#2b2320]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>ภายในจังหวัดเดียว</span>
            </button>
          </div>
        </div>

        {/* Popular Inter-Province Route Presets */}
        <div className="mt-4 pt-3.5 border-t border-[#d2af91]/40 flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-[#2b2320]">
            ⚡ เส้นทางข้ามจังหวัดยอดนิยม:
          </span>
          {[
            { from: 'กรุงเทพมหานคร', to: 'ขอนแก่น', label: '🚗 กรุงเทพฯ ➔ ขอนแก่น (สายอีสาน)' },
            { from: 'ขอนแก่น', to: 'เชียงใหม่', label: '⛰️ ขอนแก่น ➔ เชียงใหม่ (อีสาน-เหนือ)' },
            { from: 'กรุงเทพมหานคร', to: 'เชียงใหม่', label: '🌲 กรุงเทพฯ ➔ เชียงใหม่ (สายเหนือ)' },
            { from: 'กรุงเทพมหานคร', to: 'ประจวบคีรีขันธ์', label: '🌊 กรุงเทพฯ ➔ หัวหิน/ประจวบฯ' },
            { from: 'กรุงเทพมหานคร', to: 'นครราชสีมา', label: '🏕️ กรุงเทพฯ ➔ เขาใหญ่/โคราช' },
            { from: 'กรุงเทพมหานคร', to: 'ชลบุรี', label: '🏖️ กรุงเทพฯ ➔ บางแสน/พัทยา' },
            { from: 'สุราษฎร์ธานี', to: 'ภูเก็ต', label: '🏝️ สุราษฎร์ธานี ➔ ภูเก็ต (สายใต้)' }
          ].map((preset) => {
            const isActive =
              travelMode === 'inter_province' &&
              originProvince === preset.from &&
              destinationProvince === preset.to;
            return (
              <button
                key={`${preset.from}-${preset.to}`}
                type="button"
                onClick={() => handlePresetInterProvinceRoute(preset.from, preset.to)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs'
                    : 'bg-white/90 hover:bg-white text-[#2b2320] border-[#d2af91]/60'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Province A -> Province B Selection Panel */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
          {/* Origin Province A Box */}
          <div className="lg:col-span-5 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-300/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold inline-flex items-center justify-center">
                  A
                </span>
                {travelMode === 'inter_province'
                  ? 'จังหวัดต้นทาง (Origin Province A)'
                  : 'จังหวัดที่ต้องการเดินทาง'}
              </span>
              <span className="text-[11px] font-semibold text-emerald-800">
                มีที่พัก {getHotelsForProvince(originProvince).length} แห่ง
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-[#6b5c54] block mb-1">
                  เลือกจังหวัดต้นทาง (ครบ 77 จังหวัด):
                </label>
                <select
                  value={originProvince}
                  onChange={(e) => {
                    setOriginProvince(e.target.value);
                    setPointAId('');
                    if (travelMode === 'intra_province') {
                      setDestinationProvince(e.target.value);
                      onSelectProvince(e.target.value);
                    }
                    setStageFilter('all');
                    setSelectedHotelIdOnMap(null);
                  }}
                  className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs font-extrabold text-[#2b2320] focus:ring-2 focus:ring-emerald-400 cursor-pointer"
                >
                  {ALL_77_PROVINCES.map((p) => (
                    <option key={`orig-${p.name}`} value={p.name}>
                      จ.{p.name} ({p.region})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#6b5c54] block mb-1">
                  จุดออกเดินทางใน จ.{originProvince}:
                </label>
                <select
                  value={pointA?.attractionId || ''}
                  onChange={(e) => setPointAId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs font-semibold text-[#2b2320] focus:ring-2 focus:ring-emerald-400 cursor-pointer"
                >
                  {attractionsA.map((att) => (
                    <option key={att.attractionId} value={att.attractionId}>
                      🟢 {att.attractionName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="lg:col-span-1 flex justify-center">
            <button
              type="button"
              onClick={handleSwapProvincesOrPoints}
              title="สลับต้นทาง A กับปลายทาง B"
              className="w-full lg:w-11 h-11 rounded-2xl bg-[#d2af91]/35 hover:bg-[#d2af91]/70 text-[#2b2320] flex items-center justify-center gap-1.5 text-xs font-extrabold transition-all cursor-pointer border border-[#d2af91]/60 shadow-2xs"
            >
              <ArrowRightLeft className="w-4 h-4 text-[#2b2320]" />
              <span className="lg:hidden">สลับจังหวัดต้นทาง ⇄ ปลายทาง</span>
            </button>
          </div>

          {/* Destination Province B Box */}
          <div className="lg:col-span-5 bg-[#d2af91]/25 p-4 rounded-2xl border border-[#a93f3f]/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#8c2d56] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#a93f3f] text-white text-[11px] font-extrabold inline-flex items-center justify-center">
                  B
                </span>
                {travelMode === 'inter_province'
                  ? 'จังหวัดปลายทาง (Destination Province B)'
                  : `จุดหมายปลายทางใน จ.${originProvince}`}
              </span>
              <span className="text-[11px] font-semibold text-[#8c2d56]">
                มีที่พัก {getHotelsForProvince(effectiveDestProvince).length} แห่ง
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {travelMode === 'inter_province' ? (
                <div>
                  <label className="text-[11px] font-bold text-[#6b5c54] block mb-1">
                    เลือกจังหวัดปลายทาง (ครบ 77 จังหวัด):
                  </label>
                  <select
                    value={destinationProvince}
                    onChange={(e) => {
                      setDestinationProvince(e.target.value);
                      onSelectProvince(e.target.value);
                      setPointBId('');
                      setStageFilter('all');
                      setSelectedHotelIdOnMap(null);
                    }}
                    className="w-full px-3 py-2 bg-white border border-[#a93f3f]/50 rounded-xl text-xs font-extrabold text-[#2b2320] focus:ring-2 focus:ring-[#a93f3f] cursor-pointer"
                  >
                    {ALL_77_PROVINCES.map((p) => (
                      <option key={`dest-${p.name}`} value={p.name}>
                        จ.{p.name} ({p.region})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="text-[11px] font-bold text-[#6b5c54] block mb-1">
                    จังหวัดเดียวกัน:
                  </label>
                  <div className="w-full px-3 py-2 bg-white/70 border border-[#d2af91]/50 rounded-xl text-xs font-bold text-[#6b5c54]">
                    จ.{originProvince} (ภายในจังหวัด)
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-[#6b5c54] block mb-1">
                  จุดหมายปลายทางใน จ.{effectiveDestProvince}:
                </label>
                <select
                  value={pointB?.attractionId || ''}
                  onChange={(e) => setPointBId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#a93f3f]/50 rounded-xl text-xs font-semibold text-[#2b2320] focus:ring-2 focus:ring-[#a93f3f] cursor-pointer"
                >
                  {attractionsB.map((att) => (
                    <option key={att.attractionId} value={att.attractionId}>
                      🔴 {att.attractionName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Transit / Stopover Province Selector (คำขอผู้ใช้: เลือกที่พักจังหวัดที่เป็นทางผ่านได้แล้วขึ้นแค่จังหวัดนั้น) */}
        {travelMode === 'inter_province' && (
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-amber-300/90 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-extrabold inline-flex items-center justify-center shadow-2xs">
                    🟡
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#2b2320]">
                    เลือกที่พักจังหวัดที่เป็นทางผ่าน (คลิกเลือกจังหวัดไหน จะขึ้นเฉพาะที่พักจังหวัดนั้นทันที)
                  </h4>
                </div>
                <p className="text-xs text-[#6b5c54] mt-1">
                  เส้นทาง <strong>จ.{originProvince} ➔ จ.{effectiveDestProvince}</strong> มีจังหวัดทางผ่านแนะนำ {transitOnlySteps.length} จังหวัด สามารถเลือกดูเฉพาะที่พักในจังหวัดทางผ่านที่ต้องการแวะพักได้เลย
                </p>
              </div>

              {/* Dropdown to select a single Transit Province strictly */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
                <select
                  value={
                    stageFilter !== 'all' &&
                    stageFilter !== 'destination' &&
                    stageFilter !== 'transit' &&
                    stageFilter !== 'origin'
                      ? stageFilter
                      : ''
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    setStageFilter(val ? val : 'all');
                    setSelectedHotelIdOnMap(null);
                  }}
                  className="px-3.5 py-2 bg-white border-2 border-amber-400 rounded-xl text-xs font-extrabold text-[#2b2320] focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-2xs"
                >
                  <option value="">
                    🔍 เลือกจังหวัดทางผ่านเพื่อแสดงเฉพาะจังหวัดนั้น...
                  </option>
                  <optgroup label={`🟡 จังหวัดทางผ่านบนเส้นทาง จ.${originProvince} ➔ จ.${effectiveDestProvince}`}>
                    {transitOnlySteps.map((step, i) => {
                      const count = (corridorHotelsByProvince[step.provinceName] || []).length;
                      return (
                        <option key={`tr-opt-${step.provinceName}`} value={step.provinceName}>
                          🟡 ทางผ่านที่ {i + 1}: จ.{step.provinceName} — แสดงเฉพาะ {count} ที่พักใน จ.{step.provinceName}
                        </option>
                      );
                    })}
                  </optgroup>
                  <optgroup label="🟢 ต้นทาง / 🔴 ปลายทาง">
                    <option value={originProvince}>
                      🟢 ต้นทาง: เฉพาะที่พักใน จ.{originProvince} ({(corridorHotelsByProvince[originProvince] || []).length} แห่ง)
                    </option>
                    <option value={effectiveDestProvince}>
                      🔴 ปลายทาง: เฉพาะที่พักใน จ.{effectiveDestProvince} ({(corridorHotelsByProvince[effectiveDestProvince] || []).length} แห่ง)
                    </option>
                  </optgroup>
                  <optgroup label="🗺️ หรือเลือกแวะจังหวัดอื่นๆ (ครบ 77 จังหวัด)">
                    {ALL_77_PROVINCES.map((p) => (
                      <option key={`any-tr-${p.name}`} value={p.name}>
                        เฉพาะที่พักใน จ.{p.name} ({getHotelsForProvince(p.name).length} แห่ง)
                      </option>
                    ))}
                  </optgroup>
                </select>

                {stageFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => {
                      setStageFilter('all');
                      setSelectedHotelIdOnMap(null);
                    }}
                    className="px-3 py-2 rounded-xl bg-[#2b2320] hover:bg-[#6b5c54] text-white text-xs font-bold cursor-pointer transition-all shrink-0"
                  >
                    แสดงทุกจังหวัดบนเส้นทาง
                  </button>
                )}
              </div>
            </div>

            {/* Quick 1-Click Transit Province Buttons (คลิกปุ๊บ ขึ้นเฉพาะที่พักในจังหวัดทางผ่านนั้นทันที) */}
            {transitOnlySteps.length > 0 && (
              <div className="bg-white/90 p-3 rounded-xl border border-amber-200/90 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-900">
                    ⚡ คลิกเลือกจังหวัดทางผ่านเพื่อแสดงเฉพาะที่พักในจังหวัดนั้น:
                  </span>
                  <span className="text-[11px] font-semibold text-amber-800">
                    คลิกซ้ำเพื่อดูทั้งหมด
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {transitOnlySteps.map((step, idx) => {
                    const provHotels = corridorHotelsByProvince[step.provinceName] || [];
                    const isSelected = stageFilter === step.provinceName;
                    return (
                      <button
                        key={`quick-transit-${step.provinceName}`}
                        type="button"
                        onClick={() => {
                          setStageFilter(isSelected ? 'all' : step.provinceName);
                          setSelectedHotelIdOnMap(null);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-600 shadow-sm ring-2 ring-amber-300 scale-[1.02]'
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300'
                        }`}
                      >
                        <span>
                          🟡 ทางผ่าน {idx + 1}: จ.{step.provinceName}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-lg text-[11px] ${
                            isSelected
                              ? 'bg-white text-amber-900 font-extrabold'
                              : 'bg-white/90 text-amber-800'
                          }`}
                        >
                          ขึ้นเฉพาะ {provHotels.length} ที่พัก
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Active Single-Province Banner Confirmation */}
            {stageFilter !== 'all' &&
              stageFilter !== 'destination' &&
              stageFilter !== 'transit' &&
              stageFilter !== 'origin' && (
                <div className="bg-emerald-900 text-white px-4 py-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
                    <span>✅ กำลังแสดงเฉพาะที่พักในจังหวัด:</span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-extrabold">
                      จ.{stageFilter} เท่านั้น ({routeResults.length} แห่ง)
                    </span>
                    <span className="text-emerald-200 text-xs font-normal">
                      (ไม่รวมจังหวัดอื่นปน)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStageFilter('all');
                      setSelectedHotelIdOnMap(null);
                    }}
                    className="px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold cursor-pointer self-start sm:self-center"
                  >
                    ✕ ล้างตัวกรองจังหวัดเดียว (ดูทั้งเส้นทาง)
                  </button>
                </div>
              )}

            {/* Interactive Corridor Province Sequence Stepper */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
              {corridorSteps.map((step, index) => {
                const provHotels = corridorHotelsByProvince[step.provinceName] || [];
                const petCount = provHotels.filter((h) => h.petFriendly).length;
                const provAttractions = getAttractionsForProvince(step.provinceName);
                const isSelectedProvince = stageFilter === step.provinceName;

                return (
                  <React.Fragment key={step.provinceName}>
                    <button
                      type="button"
                      onClick={() => {
                        setStageFilter(
                          isSelectedProvince ? 'all' : step.provinceName
                        );
                        setSelectedHotelIdOnMap(null);
                      }}
                      className={`min-w-[205px] p-3 rounded-2xl border text-left transition-all cursor-pointer shrink-0 ${
                        isSelectedProvince
                          ? 'bg-[#2b2320] text-white border-[#2b2320] shadow-sm scale-[1.01] ring-2 ring-amber-400'
                          : step.role === 'origin'
                            ? 'bg-emerald-50/80 hover:bg-emerald-100/70 border-emerald-300 text-[#2b2320]'
                            : step.role === 'destination'
                              ? 'bg-rose-50/80 hover:bg-rose-100/70 border-rose-300 text-[#2b2320]'
                              : 'bg-white hover:bg-amber-100/60 border-amber-300 text-[#2b2320]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md ${
                            isSelectedProvince
                              ? 'bg-amber-400 text-slate-950'
                              : step.role === 'origin'
                                ? 'bg-emerald-600 text-white'
                                : step.role === 'destination'
                                  ? 'bg-[#a93f3f] text-white'
                                  : 'bg-amber-500 text-white'
                          }`}
                        >
                          {step.role === 'origin'
                            ? '🟢 จังหวัดต้นทาง (A)'
                            : step.role === 'destination'
                              ? '🔴 จังหวัดปลายทาง (B)'
                              : `🟡 ทางผ่านที่ ${index}`}
                        </span>
                        <span
                          className={`text-[10px] font-bold ${
                            isSelectedProvince ? 'text-emerald-300' : 'text-[#6b5c54]'
                          }`}
                        >
                          {step.distFromOriginKm === 0
                            ? 'จุดเริ่ม 0 กม.'
                            : `+${step.distFromOriginKm} กม.`}
                        </span>
                      </div>

                      <p className="text-sm font-extrabold truncate">
                        จ.{step.provinceName}
                      </p>

                      <div
                        className={`text-[11px] mt-1 flex items-center justify-between ${
                          isSelectedProvince ? 'text-amber-300 font-bold' : 'text-[#6b5c54]'
                        }`}
                      >
                        <span className="font-bold">
                          {isSelectedProvince
                            ? `✓ ที่พัก ${provHotels.length} แห่ง`
                            : `🏨 ที่พัก ${provHotels.length} แห่ง`}
                        </span>
                        <span>🏞️ ที่เที่ยว {provAttractions.length} แห่ง</span>
                      </div>

                      <div
                        className={`text-[10px] mt-1 truncate ${
                          isSelectedProvince ? 'text-slate-200' : 'text-emerald-800 font-medium'
                        }`}
                      >
                        📍 {provAttractions[0]?.attractionName}
                      </div>
                    </button>

                    {index < corridorSteps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-[#a93f3f] shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Quick Stage Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-bold text-[#6b5c54] mr-1">
                ตัวกรองกลุ่มจังหวัด:
              </span>
              {[
                {
                  id: 'all',
                  label: `🌐 รวมทุกจังหวัดบนเส้นทาง (${totalCorridorHotelCount} แห่ง)`
                },
                ...(transitOnlySteps.length > 0
                  ? [
                      {
                        id: 'transit',
                        label: `🟡 รวมเฉพาะกลุ่มจังหวัดทางผ่านทั้งหมด (${transitOnlySteps.reduce(
                          (acc, s) =>
                            acc + (corridorHotelsByProvince[s.provinceName]?.length || 0),
                          0
                        )} แห่ง)`
                      }
                    ]
                  : []),
                {
                  id: 'destination',
                  label: `🔴 เฉพาะจังหวัดปลายทาง จ.${effectiveDestProvince} (${
                    (corridorHotelsByProvince[effectiveDestProvince] || []).length
                  } แห่ง)`
                },
                {
                  id: 'origin',
                  label: `🟢 เฉพาะจังหวัดต้นทาง จ.${originProvince} (${
                    (corridorHotelsByProvince[originProvince] || []).length
                  } แห่ง)`
                }
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    setStageFilter(st.id);
                    setSelectedHotelIdOnMap(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    stageFilter === st.id
                      ? 'bg-[#a93f3f] text-white shadow-2xs'
                      : 'bg-white text-[#6b5c54] hover:bg-[#fbf7f4] border border-[#d2af91]/50'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mode & Pet Filter Bar */}
        <div className="pt-3 border-t border-[#d2af91]/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-[#6b5c54] mr-1">เรียงลำดับที่พักตาม:</span>
            {[
              { id: 'route', label: '🏆 เกาะแนวเส้นทาง A ➔ B ดีที่สุด (อ้อมน้อยสุด)' },
              { id: 'closest_b', label: `🔴 ใกล้ปลายทาง (จ.${effectiveDestProvince}) ที่สุด` },
              { id: 'midpoint', label: '⚖️ อยู่กึ่งกลางครึ่งทางระหว่าง A กับ B' },
              { id: 'closest_a', label: `🟢 ใกล้ต้นทาง (จ.${originProvince}) ที่สุด` }
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSortMode(m.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sortMode === m.id
                    ? 'bg-[#d2af91] text-[#2b2320] shadow-2xs ring-1 ring-[#a93f3f]'
                    : 'bg-[#fbf7f4]/50 text-[#6b5c54] hover:bg-[#fbf7f4] border border-[#d2af91]/30'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#6b5c54]">นโยบายสัตว์เลี้ยง:</span>
            {[
              { id: 'all', label: 'ทั้งหมด' },
              { id: 'pet', label: '🐾 รับสัตว์เลี้ยง' },
              { id: 'nonpet', label: '🚫 สัตว์พักไม่ได้' }
            ].map((pf) => (
              <button
                key={pf.id}
                type="button"
                onClick={() => setPetFilter(pf.id as any)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  petFilter === pf.id
                    ? 'bg-[#d2af91] text-[#2b2320] shadow-2xs'
                    : 'bg-white text-[#6b5c54] border border-[#d2af91]/40 hover:bg-[#fbf7f4]/40'
                }`}
              >
                {pf.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tourist Attractions Along Route / Selected Province Showcase (คำขอผู้ใช้: ให้ขึ้นสถานที่เที่ยวด้วย) */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-emerald-300/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#2b2320]">
                {stageFilter !== 'all' &&
                stageFilter !== 'destination' &&
                stageFilter !== 'transit' &&
                stageFilter !== 'origin'
                  ? `🏞️ สถานที่ท่องเที่ยวแนะนำในจังหวัดทางผ่าน/ที่เลือก: จ.${stageFilter}`
                  : stageFilter === 'transit'
                    ? `🏞️ สถานที่ท่องเที่ยวแวะเที่ยวในจังหวัดทางผ่าน (จ.${originProvince} ➔ จ.${effectiveDestProvince})`
                    : `🏞️ สถานที่ท่องเที่ยวไฮไลต์ตามเส้นทาง จ.${originProvince} ➔ จ.${effectiveDestProvince}`}
              </h3>
              <p className="text-xs text-[#6b5c54]">
                แสดงสถานที่ท่องเที่ยวยอดนิยมประจำจังหวัด พร้อมสถานะนำสัตว์เลี้ยงเข้าเที่ยวได้ และปุ่มตั้งเป็นจุดหมายแวะเที่ยว
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-center">
            🐾 มีป้ายบอกสถานที่พาสัตว์เลี้ยงเที่ยวได้
          </span>
        </div>

        {/* Province Attractions Cards */}
        <div className="space-y-4">
          {corridorSteps
            .filter((step) => {
              if (
                stageFilter !== 'all' &&
                stageFilter !== 'destination' &&
                stageFilter !== 'transit' &&
                stageFilter !== 'origin'
              ) {
                return step.provinceName === stageFilter;
              }
              if (stageFilter === 'transit') return step.role === 'transit';
              if (stageFilter === 'destination') return step.role === 'destination';
              if (stageFilter === 'origin') return step.role === 'origin';
              return true;
            })
            .map((step) => {
              const provAttractions = getAttractionsForProvince(step.provinceName);
              return (
                <div
                  key={`att-prov-${step.provinceName}`}
                  className="bg-[#fbf7f4]/40 rounded-2xl p-3.5 border border-[#d2af91]/50 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {getRoleBadge(step.role, step.provinceName)}
                      <span className="text-xs font-extrabold text-[#2b2320]">
                        สถานที่ท่องเที่ยวใน จ.{step.provinceName} ({provAttractions.length} แห่ง)
                      </span>
                    </div>
                    {stageFilter !== step.provinceName && (
                      <button
                        type="button"
                        onClick={() => {
                          setStageFilter(step.provinceName);
                          setSelectedHotelIdOnMap(null);
                        }}
                        className="text-[11px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg border border-amber-300 cursor-pointer"
                      >
                        ดูเฉพาะที่พักและที่เที่ยวใน จ.{step.provinceName}
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {provAttractions.map((att) => {
                      const isPointA = pointA?.attractionId === att.attractionId;
                      const isPointB = pointB?.attractionId === att.attractionId;
                      return (
                        <div
                          key={att.attractionId}
                          className={`p-3 rounded-xl border bg-white flex flex-col justify-between gap-2 transition-all ${
                            isPointA || isPointB
                              ? 'border-emerald-500 ring-2 ring-emerald-200'
                              : 'border-[#d2af91]/40 hover:border-[#a93f3f]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#d2af91]/30 text-[#2b2320]">
                                🏞️ {att.attractionType}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  att.petAllowed
                                    ? 'bg-[#d2af91]/60 text-[#2b2320]'
                                    : 'bg-amber-100 text-amber-900'
                                }`}
                              >
                                {att.petAllowed ? '🐾 สัตว์เข้าได้' : '🚫 สัตว์เข้าไม่ได้'}
                              </span>
                            </div>
                            <h4 className="text-xs font-extrabold text-[#2b2320] leading-snug">
                              {att.attractionName}
                            </h4>
                            <span className="text-[11px] text-[#6b5c54] block mt-0.5">
                              📍 อ.{att.district} จ.{att.province}
                            </span>
                          </div>

                          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1">
                            {step.role === 'origin' ? (
                              <button
                                type="button"
                                onClick={() => setPointAId(att.attractionId)}
                                className={`w-full py-1 px-2 rounded-lg text-[10px] font-bold cursor-pointer ${
                                  isPointA
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {isPointA ? '✓ จุดเริ่มต้น A ปัจจุบัน' : 'ตั้งเป็นจุดเริ่มต้น A'}
                              </button>
                            ) : step.role === 'destination' ? (
                              <button
                                type="button"
                                onClick={() => setPointBId(att.attractionId)}
                                className={`w-full py-1 px-2 rounded-lg text-[10px] font-bold cursor-pointer ${
                                  isPointB
                                    ? 'bg-[#a93f3f] text-white'
                                    : 'bg-rose-50 hover:bg-rose-100 text-[#8c2d56]'
                                }`}
                              >
                                {isPointB ? '✓ จุดหมาย B ปัจจุบัน' : 'ตั้งเป็นจุดหมายเที่ยว B'}
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setStageFilter(step.provinceName);
                                  setSelectedHotelIdOnMap(null);
                                }}
                                className="w-full py-1 px-2 rounded-lg text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 cursor-pointer"
                              >
                                🏨 ดูที่พักใกล้ที่เที่ยวนี้ ({(corridorHotelsByProvince[step.provinceName] || []).length} แห่ง)
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Main Spotlight & Visual Route Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Direct A -> B Distance + #1 Nearest Hotel Winner Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-3xl p-5 border border-[#d2af91]/40 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#6b5c54] uppercase tracking-wider">
                สรุประยะทางขับรถ (จ.{originProvince} ➔ จ.{effectiveDestProvince})
              </span>
              <span className="text-xs font-bold text-[#a93f3f] bg-[#d2af91]/40 px-2.5 py-1 rounded-lg">
                {corridorSteps.length > 1
                  ? `ผ่าน ${corridorSteps.length} จังหวัด`
                  : `ภายใน จ.${originProvince}`}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 bg-[#fbf7f4]/50 p-3.5 rounded-2xl border border-[#d2af91]/30">
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold text-emerald-700 block">
                  ต้นทาง A (จ.{originProvince})
                </span>
                <p className="text-xs font-extrabold text-[#2b2320] truncate">
                  {pointA?.attractionName}
                </p>
              </div>

              <div className="px-3 text-center shrink-0">
                <span className="text-sm font-extrabold text-[#a93f3f] block">
                  {directABKm} กม.
                </span>
                <span className="text-[10px] text-[#6b5c54] block">
                  ~{formatDriveDuration(directDriveMins)}
                </span>
              </div>

              <div className="min-w-0 flex-1 text-right">
                <span className="text-[11px] font-bold text-[#a93f3f] block">
                  ปลายทาง B (จ.{effectiveDestProvince})
                </span>
                <p className="text-xs font-extrabold text-[#2b2320] truncate">
                  {pointB?.attractionName}
                </p>
              </div>
            </div>

            {/* Winner #1 Accommodation */}
            {closestOverall && (
              <div className="bg-white rounded-2xl p-4 border-2 border-emerald-400/80 space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                    อันดับ #1 ที่พักแนะนำบนเส้นทางนี้
                  </span>
                  {getRoleBadge(closestOverall.stageRole, closestOverall.hotel.province)}
                </div>

                <div className="flex gap-3 items-center">
                  <img
                    src={closestOverall.hotel.primaryImage}
                    alt={closestOverall.hotel.hotelName}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-emerald-200"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#2b2320] truncate">
                      {closestOverall.hotel.hotelName}
                    </h3>
                    <p className="text-xs text-[#6b5c54]">
                      จ.{closestOverall.hotel.province} · {closestOverall.hotel.hotelType} · ฿{closestOverall.hotel.price.toLocaleString()}/คืน · ★ {closestOverall.hotel.rating}
                    </p>
                    <p className="text-[11px] font-semibold text-emerald-800 mt-1">
                      {closestOverall.hotel.petFriendly ? '🐾 สัตว์เลี้ยงพักได้' : '🚫 สัตว์พักไม่ได้'} · อ้อมจากเส้นทางหลักเพียง +{closestOverall.detourKm} กม.
                    </p>
                  </div>
                </div>

                {/* 3-Metric Breakdown for Winner */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="bg-white/90 p-2 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-[#6b5c54] block">
                      ห่างจาก จ.{originProvince}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700">
                      {closestOverall.distFromAKm} กม.
                    </span>
                    <span className="text-[10px] text-[#6b5c54] block">
                      ({formatDriveDuration(closestOverall.driveFromAMins)})
                    </span>
                  </div>
                  <div className="bg-white/90 p-2 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-[#6b5c54] block">
                      ห่างจาก จ.{effectiveDestProvince}
                    </span>
                    <span className="text-xs font-extrabold text-[#a93f3f]">
                      {closestOverall.distFromBKm} กม.
                    </span>
                    <span className="text-[10px] text-[#6b5c54] block">
                      ({formatDriveDuration(closestOverall.driveToBMins)})
                    </span>
                  </div>
                  <div className="bg-white/90 p-2 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-[#6b5c54] block">รวมระยะทาง</span>
                    <span className="text-xs font-extrabold text-[#2b2320]">
                      {closestOverall.totalRouteWithHotelKm} กม.
                    </span>
                    <span className="text-[10px] text-[#6b5c54] block">
                      ({formatDriveDuration(closestOverall.totalDriveMins)})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setModalHotel(closestOverall.hotel)}
                    className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-[#fbf7f4] text-[#2b2320] text-xs font-bold border border-[#d2af91] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#a93f3f]" />
                    <span>ดูภาพห้องจริง</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingHotel(closestOverall.hotel)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#d2af91] hover:bg-[#b89270] text-[#2b2320] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>จองที่พักนี้</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 7 Cols: Interactive SVG Coordinate Route Map */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-[#d2af91]/40 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#d2af91]/30">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#2b2320] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#a93f3f]" />
                แผนผังพิกัดเส้นทาง จ.{originProvince} (A) ➔ จังหวัดทางผ่าน ➔ จ.{effectiveDestProvince} (B)
              </h3>
              <p className="text-xs text-[#6b5c54]">
                คลิกที่หมุดที่พักบนแผนผังเพื่อเปรียบเทียบระยะทางแวะพักแต่ละจังหวัดแบบโต้ตอบ
              </p>
            </div>
            {activeMapAnalysis && (
              <span className="text-xs font-bold text-[#2b2320] bg-[#d2af91]/25 px-3 py-1 rounded-xl">
                กำลังเลือก: {activeMapAnalysis.hotel.hotelName} (จ.{activeMapAnalysis.hotel.province})
              </span>
            )}
          </div>

          {/* Interactive SVG Map */}
          {mapProjection && (
            <div className="my-3 rounded-2xl bg-[#fbf7f4] border border-[#d2af91]/40 overflow-hidden relative">
              <svg
                viewBox="0 0 600 340"
                className="w-full h-64 sm:h-80 select-none"
                role="img"
                aria-label="แผนผังแสดงเส้นทางข้ามจังหวัดและตำแหน่งที่พัก"
              >
                {/* Subtle Coordinate Grid Lines */}
                {[60, 120, 180, 240, 300].map((y) => (
                  <line
                    key={`gy-${y}`}
                    x1="0"
                    y1={y}
                    x2="600"
                    y2={y}
                    stroke="#d2af91"
                    strokeOpacity="0.25"
                    strokeDasharray="4 4"
                  />
                ))}
                {[100, 200, 300, 400, 500].map((x) => (
                  <line
                    key={`gx-${x}`}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="340"
                    stroke="#d2af91"
                    strokeOpacity="0.25"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Direct Line A -> B (Dashed Baseline) */}
                <line
                  x1={mapProjection.posA.x}
                  y1={mapProjection.posA.y}
                  x2={mapProjection.posB.x}
                  y2={mapProjection.posB.y}
                  stroke="#a93f3f"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                />

                {/* Transit Province Nodes along the corridor */}
                {mapProjection.transitNodes.map((tn) => (
                  <g
                    key={`transit-${tn.provinceName}`}
                    transform={`translate(${tn.pos.x}, ${tn.pos.y})`}
                    onClick={() =>
                      setStageFilter(
                        stageFilter === tn.provinceName ? 'all' : tn.provinceName
                      )
                    }
                    className="cursor-pointer"
                  >
                    <circle
                      r="12"
                      fill="#fef3c7"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    <text
                      x="0"
                      y="-15"
                      textAnchor="middle"
                      fill="#92400e"
                      fontSize="9.5"
                      fontWeight="bold"
                    >
                      ทางผ่าน: จ.{tn.provinceName}
                    </text>
                  </g>
                ))}

                {/* Active Hotel Route Lines: A -> Active Hotel -> B */}
                {activeMapAnalysis && (() => {
                  const activeNode = mapProjection.hotelNodes.find(
                    (n) => n.hotel.hotelId === activeMapAnalysis.hotel.hotelId
                  );
                  if (!activeNode) return null;
                  const midAH = {
                    x: (mapProjection.posA.x + activeNode.pos.x) / 2,
                    y: (mapProjection.posA.y + activeNode.pos.y) / 2
                  };
                  const midHB = {
                    x: (activeNode.pos.x + mapProjection.posB.x) / 2,
                    y: (activeNode.pos.y + mapProjection.posB.y) / 2
                  };

                  return (
                    <g>
                      <line
                        x1={mapProjection.posA.x}
                        y1={mapProjection.posA.y}
                        x2={activeNode.pos.x}
                        y2={activeNode.pos.y}
                        stroke="#059669"
                        strokeWidth="3.5"
                      />
                      <line
                        x1={activeNode.pos.x}
                        y1={activeNode.pos.y}
                        x2={mapProjection.posB.x}
                        y2={mapProjection.posB.y}
                        stroke="#a93f3f"
                        strokeWidth="3.5"
                      />

                      <g transform={`translate(${midAH.x}, ${midAH.y - 10})`}>
                        <rect
                          x="-48"
                          y="-10"
                          width="96"
                          height="19"
                          rx="6"
                          fill="#ecfdf5"
                          stroke="#10b981"
                        />
                        <text
                          x="0"
                          y="3"
                          textAnchor="middle"
                          fill="#065f46"
                          fontSize="9.5"
                          fontWeight="bold"
                        >
                          A➔ที่พัก {activeNode.distFromAKm} กม.
                        </text>
                      </g>

                      <g transform={`translate(${midHB.x}, ${midHB.y + 14})`}>
                        <rect
                          x="-48"
                          y="-10"
                          width="96"
                          height="19"
                          rx="6"
                          fill="#fdf2f8"
                          stroke="#db2777"
                        />
                        <text
                          x="0"
                          y="3"
                          textAnchor="middle"
                          fill="#831843"
                          fontSize="9.5"
                          fontWeight="bold"
                        >
                          ที่พัก➔B {activeNode.distFromBKm} กม.
                        </text>
                      </g>
                    </g>
                  );
                })()}

                {/* Point A Node */}
                <g transform={`translate(${mapProjection.posA.x}, ${mapProjection.posA.y})`}>
                  <circle r="18" fill="#10b981" fillOpacity="0.2" />
                  <circle r="12" fill="#059669" stroke="#ffffff" strokeWidth="2.5" />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    A
                  </text>
                  <text
                    x="0"
                    y="-18"
                    textAnchor="middle"
                    fill="#065f46"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    จ.{originProvince}
                  </text>
                </g>

                {/* Point B Node */}
                <g transform={`translate(${mapProjection.posB.x}, ${mapProjection.posB.y})`}>
                  <circle r="18" fill="#a93f3f" fillOpacity="0.2" />
                  <circle r="12" fill="#a93f3f" stroke="#ffffff" strokeWidth="2.5" />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    B
                  </text>
                  <text
                    x="0"
                    y="-18"
                    textAnchor="middle"
                    fill="#831843"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    จ.{effectiveDestProvince}
                  </text>
                </g>

                {/* Hotel Pins */}
                {mapProjection.hotelNodes.map((node) => {
                  const isActive =
                    activeMapAnalysis?.hotel.hotelId === node.hotel.hotelId;
                  const isRank1 = node.rank === 1;
                  return (
                    <g
                      key={node.hotel.hotelId}
                      transform={`translate(${node.pos.x}, ${node.pos.y})`}
                      onClick={() => setSelectedHotelIdOnMap(node.hotel.hotelId)}
                      className="cursor-pointer"
                    >
                      {isActive && (
                        <circle
                          r="20"
                          fill="#f59e0b"
                          fillOpacity="0.25"
                        />
                      )}
                      <circle
                        r={isRank1 || isActive ? 11 : 8}
                        fill={
                          isRank1
                            ? '#d97706'
                            : node.hotel.petFriendly
                              ? '#a93f3f'
                              : '#64748b'
                        }
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="8.5"
                        fontWeight="bold"
                      >
                        #{node.rank}
                      </text>
                      {(isRank1 || isActive) && (
                        <text
                          x="0"
                          y="23"
                          textAnchor="middle"
                          fill="#2b2320"
                          fontSize="9.5"
                          fontWeight="bold"
                        >
                          {node.hotel.hotelName.slice(0, 20)}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          )}

          {/* Map Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6b5c54] pt-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" /> ต้นทาง จ.{originProvince}
              </span>
              {corridorSteps.length > 2 && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-600 inline-block" /> จังหวัดทางผ่าน
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#a93f3f] inline-block" /> ปลายทาง จ.{effectiveDestProvince}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#a93f3f] inline-block" /> ที่พักรับสัตว์เลี้ยง
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-500 inline-block" /> ที่พักปลอดสัตว์เลี้ยง
              </span>
            </div>
            <span>คลิกหมุดจังหวัดทางผ่านหรือหมุดที่พักเพื่อดูรายละเอียด</span>
          </div>
        </div>
      </div>

      {/* Complete Ranked List of Accommodations from Province A to Province B */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#d2af91]/40 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#d2af91]/30">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#2b2320]">
              {stageFilter !== 'all' &&
              stageFilter !== 'destination' &&
              stageFilter !== 'transit' &&
              stageFilter !== 'origin'
                ? `🎯 แสดงเฉพาะที่พักใน จ.${stageFilter} เท่านั้น (บนเส้นทาง จ.${originProvince} ➔ จ.${effectiveDestProvince})`
                : stageFilter === 'transit'
                  ? `🟡 แสดงเฉพาะที่พักจังหวัดทางผ่านทั้งหมด (บนเส้นทาง จ.${originProvince} ➔ จ.${effectiveDestProvince})`
                  : stageFilter === 'destination'
                    ? `🔴 แสดงเฉพาะที่พักจังหวัดปลายทาง: จ.${effectiveDestProvince} เท่านั้น`
                    : stageFilter === 'origin'
                      ? `🟢 แสดงเฉพาะที่พักจังหวัดต้นทาง: จ.${originProvince} เท่านั้น`
                      : `รายการที่พักจาก จ.${originProvince} ➔ จ.${effectiveDestProvince} (รวมทุกจังหวัดตามเส้นทาง)`}
            </h3>
            <p className="text-xs text-[#6b5c54]">
              {stageFilter !== 'all' &&
              stageFilter !== 'destination' &&
              stageFilter !== 'transit' &&
              stageFilter !== 'origin'
                ? `ซ่อนที่พักจังหวัดอื่นทั้งหมด — แสดงเฉพาะที่พักที่อยู่ในเขต จ.${stageFilter} พร้อมระยะทางจากต้นทางและไปปลายทาง`
                : 'แสดงที่พักพร้อมป้ายระบุจังหวัดต้นทาง, จังหวัดทางผ่านแวะพัก และจังหวัดปลายทาง พร้อมระยะทางจริง'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {stageFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setStageFilter('all')}
                className="text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl border border-amber-300 cursor-pointer"
              >
                ดูครบทุกจังหวัด
              </button>
            )}
            <span className="text-xs font-bold text-[#2b2320] bg-[#fbf7f4] px-3 py-1.5 rounded-xl border border-[#d2af91]/40">
              พบที่พักที่ตรงเงื่อนไข {routeResults.length} แห่ง
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {routeResults.map((item, idx) => {
            const { hotel } = item;
            const isSelectedOnMap =
              activeMapAnalysis?.hotel.hotelId === hotel.hotelId;

            return (
              <div
                key={hotel.hotelId}
                onClick={() => setSelectedHotelIdOnMap(hotel.hotelId)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  idx === 0
                    ? 'bg-emerald-50/40 border-emerald-400 ring-1 ring-emerald-300'
                    : isSelectedOnMap
                      ? 'bg-[#fbf7f4]/60 border-[#a93f3f]'
                      : 'bg-white hover:bg-[#fbf7f4]/30 border-[#d2af91]/40'
                }`}
              >
                {/* Left Info */}
                <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                  <div
                    className={`w-9 h-9 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 ${
                      idx === 0
                        ? 'bg-amber-500 text-white shadow-xs'
                        : idx === 1
                          ? 'bg-[#d2af91] text-[#2b2320]'
                          : idx === 2
                            ? 'bg-[#d2af91] text-[#2b2320]'
                            : 'bg-slate-100 text-[#6b5c54]'
                    }`}
                  >
                    #{idx + 1}
                  </div>

                  <img
                    src={hotel.primaryImage}
                    alt={hotel.hotelName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#d2af91]/40"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {getRoleBadge(item.stageRole, hotel.province)}
                      <h4 className="font-bold text-sm sm:text-base text-[#2b2320] truncate">
                        {hotel.hotelName}
                      </h4>
                      {idx === 0 && (
                        <span className="text-xs font-extrabold text-emerald-700">
                          · 🏆 แนะนำอันดับ 1
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#6b5c54] mt-1">
                      <span>{hotel.hotelType}</span>
                      <span>·</span>
                      <span>
                        {hotel.petFriendly
                          ? '🐾 สัตว์เลี้ยงพักได้'
                          : '🚫 สัตว์ไม่สามารถพักได้'}
                      </span>
                      <span>·</span>
                      <span className="font-bold text-[#2b2320]">
                        ฿{hotel.price.toLocaleString()}/คืน
                      </span>
                      <span>·</span>
                      <span>★ {hotel.rating}</span>
                    </div>
                    <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-900">
                      <Compass className="w-3 h-3 text-emerald-700 shrink-0" />
                      <span>
                        🏞️ ใกล้ที่เที่ยว: {hotel.popularAttractionNearby} ({hotel.distanceToAttractionKm} กม.)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle Route Distance Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 lg:w-[460px] shrink-0 text-center">
                  <div className="bg-emerald-50/70 p-2 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 block truncate">
                      ห่างจาก จ.{originProvince}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700">
                      {item.distFromAKm} กม.
                    </span>
                    <span className="text-[10px] text-[#6b5c54] block">
                      {formatDriveDuration(item.driveFromAMins)}
                    </span>
                  </div>

                  <div className="bg-rose-50/70 p-2 rounded-xl border border-rose-200">
                    <span className="text-[10px] text-rose-800 block truncate">
                      ห่างจาก จ.{effectiveDestProvince}
                    </span>
                    <span className="text-xs font-extrabold text-rose-700">
                      {item.distFromBKm} กม.
                    </span>
                    <span className="text-[10px] text-[#6b5c54] block">
                      {formatDriveDuration(item.driveToBMins)}
                    </span>
                  </div>

                  <div className="bg-[#d2af91]/30 p-2 rounded-xl border border-[#d2af91]">
                    <span className="text-[10px] text-[#a93f3f] block">รวม A➔ที่พัก➔B</span>
                    <span className="text-xs font-extrabold text-[#2b2320]">
                      {item.totalRouteWithHotelKm} กม.
                    </span>
                    <span className="text-[10px] text-[#6b5c54] block">
                      รวม {formatDriveDuration(item.totalDriveMins)}
                    </span>
                  </div>

                  <div className="bg-[#fbf7f4]/70 p-2 rounded-xl border border-[#d2af91]/40">
                    <span className="text-[10px] text-[#6b5c54] block">ระยะอ้อมเพิ่ม</span>
                    <span className="text-xs font-extrabold text-[#2b2320]">
                      +{item.detourKm} กม.
                    </span>
                    <span className="text-[10px] text-[#6b5c54] block">
                      ห่างกึ่งกลาง {item.distFromMidpointKm} กม.
                    </span>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div
                  className="flex items-center gap-2 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setModalHotel(hotel)}
                    className="py-2 px-3 rounded-xl bg-[#fbf7f4] hover:bg-[#ffe5d9] text-[#2b2320] text-xs font-bold border border-[#d2af91]/40 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#a93f3f]" />
                    <span>ดูห้องจริง</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingHotel(hotel)}
                    className="py-2 px-3.5 rounded-xl bg-[#d2af91] hover:bg-[#b89270] text-[#2b2320] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>จองเลย</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Room Gallery Modal */}
      <RoomModal
        hotel={modalHotel}
        isOpen={!!modalHotel}
        onClose={() => setModalHotel(null)}
        onOpenBooking={(h, roomType) => {
          setModalHotel(null);
          setSelectedBookingRoomType(roomType);
          setBookingHotel(h);
        }}
      />

      {/* Booking Modal with Auto-Pulled Search Criteria */}
      <BookingModal
        hotel={bookingHotel}
        selectedRoomType={selectedBookingRoomType}
        searchCriteria={searchCriteria}
        onUpdateSearchCriteria={onUpdateSearchCriteria}
        isOpen={!!bookingHotel}
        onClose={() => {
          setBookingHotel(null);
          setSelectedBookingRoomType(undefined);
        }}
        onConfirmBooking={(b) => {
          if (onConfirmBooking) onConfirmBooking(b);
        }}
      />
    </div>
  );
};
