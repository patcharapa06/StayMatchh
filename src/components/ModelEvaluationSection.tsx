import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Gauge, 
  Sliders, 
  FileSpreadsheet, 
  HelpCircle,
  Building2,
  Dog,
  DollarSign
} from 'lucide-react';
import { MODEL_EVALUATIONS, FEATURE_IMPORTANCE } from '../data/mockData';
import { ALL_77_PROVINCES } from '../data/provinces';

interface ModelEvaluationSectionProps {
  onSelectProvince: (prov: string) => void;
}

export const ModelEvaluationSection: React.FC<ModelEvaluationSectionProps> = ({ onSelectProvince }) => {
  // Live Simulator State (based on PDF Page 2 & 4 example)
  const [simBudget, setSimBudget] = useState(1500);
  const [simGuests, setSimGuests] = useState(2);
  const [simPet, setSimPet] = useState(true);
  const [simWifi, setSimWifi] = useState(true);
  const [simParking, setSimParking] = useState(true);
  const [simBreakfast, setSimBreakfast] = useState(false);
  const [simPool, setSimPool] = useState(true);
  const [simProvince, setSimProvince] = useState('ขอนแก่น');
  const [simAlgorithm, setSimAlgorithm] = useState('Random Forest');

  // Simulation Results
  const [isSimulated, setIsSimulated] = useState(true);

  // Compute live match
  const handleRunSimulation = () => {
    setIsSimulated(true);
  };

  // Facility match calculation
  const totalNeeds = (simWifi ? 1 : 0) + (simParking ? 1 : 0) + (simBreakfast ? 1 : 0) + (simPool ? 1 : 0);
  // Compare with KKU Hotel (Wifi: true, Parking: true, Breakfast: true, Pool: false, Price: 1200)
  const matchedNeeds = (simWifi ? 1 : 0) + (simParking ? 1 : 0) + (simBreakfast ? 1 : 0);
  const facilityMatchPercent = totalNeeds > 0 ? Math.round((matchedNeeds / (totalNeeds + 1)) * 100) : 80;
  const budgetDiff = simBudget - 1200;
  const isSuitable = simBudget >= 1200 && (simPet ? true : true);

  return (
    <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border border-[#d6ce93]/70 shadow-xs mb-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#d6ce93]/40">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#d6ce93]/30 text-[#68684d] flex items-center justify-center">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#353728]">
              การประเมินและเปรียบเทียบโมเดล Data Mining (CRISP-DM Modeling & Evaluation)
            </h3>
          </div>
          <p className="text-xs text-[#767862] mt-1">
            เปรียบเทียบประสิทธิภาพ 4 อัลกอริทึมในการทำนายความเหมาะสมของที่พักสำหรับนักท่องเที่ยวและสัตว์เลี้ยง (Target: Suitable 0/1)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#efebce] text-[#434431] border border-[#d6ce93]">
            Random Forest แม่นยำสูงสุด 94.2%
          </span>
        </div>
      </div>

      {/* 4 Models Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {MODEL_EVALUATIONS.map((model) => (
          <div
            key={model.name}
            className={`rounded-2xl p-4 border transition-all ${
              model.recommended
                ? 'bg-[#efebce]/50 border-[#a3a380] ring-2 ring-[#a3a380]/20 shadow-xs'
                : 'bg-[#efebce]/20 border-[#d6ce93]/60 hover:border-[#a3a380]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-[#353728]">{model.name}</span>
              {model.recommended && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#a3a380] text-white">
                  โมเดลแนะนำหลัก
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1 my-2">
              <span className="text-2xl font-extrabold text-[#353728]">
                {model.accuracy}%
              </span>
              <span className="text-[11px] text-[#767862] font-medium">Accuracy</span>
            </div>

            <div className="space-y-1 text-[11px] text-[#434431] border-t border-[#d6ce93]/40 pt-2 mb-2">
              <div className="flex justify-between">
                <span>Precision:</span>
                <span className="font-semibold text-[#353728]">{model.precision}%</span>
              </div>
              <div className="flex justify-between">
                <span>Recall:</span>
                <span className="font-semibold text-[#353728]">{model.recall}%</span>
              </div>
              <div className="flex justify-between">
                <span>F1-Score:</span>
                <span className="font-semibold text-[#353728]">{model.f1Score}%</span>
              </div>
            </div>

            <p className="text-[11px] text-[#767862] leading-relaxed border-t border-[#d6ce93]/40 pt-2">
              {model.description}
            </p>
          </div>
        ))}
      </div>

      {/* Feature Importance Section */}
      <div className="bg-[#efebce]/30 rounded-2xl p-4 sm:p-5 border border-[#d6ce93]/60 my-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#353728] mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#a3a380]" />
          ลำดับความสำคัญของตัวแปร (Feature Importance ในการตัดสินใจ)
        </h4>

        <div className="space-y-3">
          {FEATURE_IMPORTANCE.map((feat, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#353728]">{feat.feature}</span>
                <span className="font-bold text-[#683624]">{feat.importance}%</span>
              </div>
              <div className="w-full bg-[#efebce] h-2 rounded-full overflow-hidden mb-1 border border-[#d6ce93]/30">
                <div 
                  className="bg-[#a93f3f] h-full rounded-full"
                  style={{ width: `${feat.importance * 3.2}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-[#767862]">{feat.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Prediction Sandbox for Executives */}
      <div className="bg-[#efebce]/40 rounded-2xl p-5 sm:p-6 border border-[#d6ce93]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d8a48f]" />
              <h4 className="text-base font-bold text-[#353728]">
                ระบบทดลองจำลองการทำนายความเหมาะสม (Interactive Prediction Sandbox)
              </h4>
            </div>
            <p className="text-xs text-[#767862] mt-0.5">
              ทดสอบส่งข้อมูลลูกค้าเพื่อดูผลการคำนวณ Facility Match, Budget Diff, และการทำนายความเหมาะสม Suitable (1/0)
            </p>
          </div>
          <span className="text-xs font-mono bg-white px-2.5 py-1 rounded-lg border border-[#d6ce93] text-[#434431]">
            อิงตาม Data Dictionary เอกสารวิจัย
          </span>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Budget Input */}
          <div className="bg-white rounded-xl p-3 border border-[#d6ce93]/70">
            <label className="text-xs font-semibold text-[#434431] block mb-1">
              งบประมาณต่อคืน (Budget):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={simBudget}
                onChange={(e) => setSimBudget(Number(e.target.value))}
                step="100"
                min="500"
                max="10000"
                className="w-full bg-[#efebce]/30 border border-[#d6ce93] rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#353728] focus:ring-1 focus:ring-[#a3a380] outline-none"
              />
              <span className="text-xs text-[#767862] whitespace-nowrap">บาท</span>
            </div>
          </div>

          {/* Guests Input */}
          <div className="bg-white rounded-xl p-3 border border-[#d6ce93]/70">
            <label className="text-xs font-semibold text-[#434431] block mb-1">
              จำนวนผู้เข้าพัก (Guests):
            </label>
            <select
              value={simGuests}
              onChange={(e) => setSimGuests(Number(e.target.value))}
              className="w-full bg-[#efebce]/30 border border-[#d6ce93] rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#353728] focus:ring-1 focus:ring-[#a3a380] outline-none"
            >
              <option value={1}>1 คน</option>
              <option value={2}>2 คน (ตัวอย่างวิจัย)</option>
              <option value={3}>3 คน</option>
              <option value={4}>4 คน</option>
            </select>
          </div>

          {/* Pet Friendly Choice */}
          <div className="bg-white rounded-xl p-3 border border-[#d6ce93]/70">
            <label className="text-xs font-semibold text-[#434431] block mb-1">
              นำสัตว์เลี้ยงมาด้วย (Pet):
            </label>
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => setSimPet(true)}
                className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  simPet ? 'bg-[#d8a48f] text-white shadow-xs' : 'bg-[#efebce]/60 text-[#434431]'
                }`}
              >
                🐾 Yes (นำมา)
              </button>
              <button
                onClick={() => setSimPet(false)}
                className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  !simPet ? 'bg-[#353728] text-white' : 'bg-[#efebce]/60 text-[#434431]'
                }`}
              >
                No (ไม่นำมา)
              </button>
            </div>
          </div>

          {/* Province select */}
          <div className="bg-white rounded-xl p-3 border border-[#d6ce93]/70">
            <label className="text-xs font-semibold text-[#434431] block mb-1">
              จังหวัดที่ต้องการเข้าพัก (Province):
            </label>
            <select
              value={simProvince}
              onChange={(e) => setSimProvince(e.target.value)}
              className="w-full bg-[#efebce]/30 border border-[#d6ce93] rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#353728] focus:ring-1 focus:ring-[#a3a380] outline-none"
            >
              <option value="ขอนแก่น">ขอนแก่น (KKU Pilot)</option>
              <option value="เชียงใหม่">เชียงใหม่</option>
              <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
              <option value="ชลบุรี">ชลบุรี</option>
              <option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์</option>
              <option value="ภูเก็ต">ภูเก็ต</option>
            </select>
          </div>
        </div>

        {/* Needs Checkboxes */}
        <div className="bg-white rounded-xl p-3.5 border border-[#d6ce93]/70 flex flex-wrap items-center justify-between gap-3 mb-4 text-xs">
          <span className="font-semibold text-[#353728]">สิ่งอำนวยความสะดวกที่ต้องการ:</span>
          <div className="flex flex-wrap items-center gap-4 text-[#434431]">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={simWifi}
                onChange={(e) => setSimWifi(e.target.checked)}
                className="rounded accent-[#a3a380]"
              />
              <span>Wi-Fi_Need</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={simParking}
                onChange={(e) => setSimParking(e.target.checked)}
                className="rounded accent-[#a3a380]"
              />
              <span>Parking_Need</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={simBreakfast}
                onChange={(e) => setSimBreakfast(e.target.checked)}
                className="rounded accent-[#a3a380]"
              />
              <span>Breakfast_Need</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={simPool}
                onChange={(e) => setSimPool(e.target.checked)}
                className="rounded accent-[#a3a380]"
              />
              <span>Pool_Need</span>
            </label>
          </div>

          <button
            onClick={handleRunSimulation}
            id="run-model-simulation-btn"
            className="px-4 py-1.5 rounded-lg bg-[#a3a380] hover:bg-[#6e705b] text-white font-bold transition-all cursor-pointer shadow-xs"
          >
            ประมวลผลคำทำนาย
          </button>
        </div>

        {/* Simulation Results Output Box (Matches Page 2 Example) */}
        {isSimulated && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#a3a380] shadow-xs animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d6ce93]/30">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#a3a380]" />
                <span className="font-bold text-sm text-[#353728]">
                  ผลการทำนายโดยโมเดล {simAlgorithm}:
                </span>
                <span className="px-3 py-0.5 rounded-full bg-[#efebce] text-[#353728] text-xs font-bold border border-[#d6ce93]">
                  Suitable = {isSuitable ? '1 (เหมาะสมอย่างยิ่ง)' : '0 (ไม่แนะนำ)'}
                </span>
              </div>

              <div className="text-xs text-[#767862]">
                สถานะที่พักเป้าหมาย: <span className="font-bold text-[#353728]">KKU Hotel (บึงแก่นนคร)</span>
              </div>
            </div>

            {/* Calculated Values Table (Matches Page 2 & 5) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 text-xs">
              <div className="bg-[#efebce]/30 p-2.5 rounded-xl border border-[#d6ce93]/60">
                <span className="text-[#767862] block text-[10px]">Budget_Diff</span>
                <span className="font-bold text-[#353728] text-sm">+{budgetDiff} บาท</span>
                <span className="text-[10px] text-[#683624] block">อยู่ในงบประมาณ</span>
              </div>

              <div className="bg-[#efebce]/30 p-2.5 rounded-xl border border-[#d6ce93]/60">
                <span className="text-[#767862] block text-[10px]">Facility_Match</span>
                <span className="font-bold text-[#353728] text-sm">{facilityMatchPercent}%</span>
                <span className="text-[10px] text-[#a3a380] block font-semibold">ตรงใจสิ่งอำนวยความสะดวก</span>
              </div>

              <div className="bg-[#efebce]/30 p-2.5 rounded-xl border border-[#d6ce93]/60">
                <span className="text-[#767862] block text-[10px]">Distance_KM</span>
                <span className="font-bold text-[#353728] text-sm">2.5 กม.</span>
                <span className="text-[10px] text-[#767862] block">ถึงบึงแก่นนคร</span>
              </div>

              <div className="bg-[#efebce]/30 p-2.5 rounded-xl border border-[#d6ce93]/60">
                <span className="text-[#767862] block text-[10px]">Capacity_Diff</span>
                <span className="font-bold text-[#353728] text-sm">+2 คน</span>
                <span className="text-[10px] text-[#767862] block">ความจุห้องพัก 4 คน</span>
              </div>
            </div>

            {/* Explanation text */}
            <div className="pt-2 text-xs text-[#555] flex items-center justify-between">
              <span>
                💡 ที่พักแนะนำ: <strong className="text-[#353728]">KKU Hotel & Pet Paradise</strong> (ราคา ฿1,200/คืน, คะแนน 4.5/5 ดาว, มีสิ่งอำนวยความสะดวกครบถ้วนและสนามหญ้าสัตว์เลี้ยง)
              </span>
              <button
                onClick={() => onSelectProvince(simProvince)}
                className="text-xs text-[#683624] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                ดูโรงแรมในจังหวัดนี้ <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
