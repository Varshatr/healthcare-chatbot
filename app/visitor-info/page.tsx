import React from 'react';
import Link from 'next/link';
import {
  Clock,
  ShieldAlert,
  Heart,
  Users,
  CheckCircle,
  AlertTriangle,
  Car,
  Pill,
  Utensils,
  DollarSign,
  Accessibility,
  ArrowRight,
  Phone,
  FileCheck,
  Building,
} from 'lucide-react';
import hospitalData from '@/data/hospitalData.json';

export default function VisitorInfoPage() {
  const { visitingWards, visitorGuidelines, amenities, hospitalInfo } = hospitalData;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs font-bold tracking-wider uppercase">
            Patient Support & Hospitality
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Visitor Information & Guidelines
          </h1>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            Family presence plays a vital role in recovery. We have established visiting policies that balance supportive companionship with clinical safety and infection control.
          </p>
        </div>
      </div>

      {/* Ward-Wise Visiting Hours Schedule */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
            Schedules by Inpatient Unit
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Visiting Hours & Capacity Limits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visitingWards.map((ward, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 hover:border-sky-500 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <h3 className="text-lg font-black text-slate-900">{ward.wardName}</h3>
                <span className="text-xs font-bold bg-sky-100 text-sky-800 px-3 py-1 rounded-full">
                  {ward.visitorLimit}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-sky-800 bg-sky-50 p-3 rounded-xl border border-sky-100">
                <Clock className="w-5 h-5 shrink-0" />
                <span className="font-extrabold text-sm sm:text-base">{ward.hours}</span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {ward.rules}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Visitor Safety & Infection Protocols */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-900/60 rounded-xl text-red-400">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Essential Visitor Guidelines & Rules
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Please adhere strictly to hospital safety and hygiene protocols
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visitorGuidelines.map((rule, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700"
            >
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-slate-200 text-sm leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital Amenities Section */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
            Comfort & Convenience
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Campus Amenities for Visitors & Families
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-sky-50 text-sky-700 rounded-xl flex items-center justify-center font-bold">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="pt-2 text-xs font-bold text-sky-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.timing}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visitor Desk Assistance Callout */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-sky-950">
            Need Special Visitor Accommodation or Passes?
          </h3>
          <p className="text-sm text-sky-800">
            Our Visitor Relations Desk in the Main Entrance Lobby is staffed 24 hours a day to assist with passes, wheelchairs, and lodging guidance.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${hospitalInfo.generalEnquiry}`}
            className="px-5 py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow"
          >
            <Phone className="w-4 h-4" />
            <span>Call Helpdesk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
