'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HeartPulse,
  Calendar,
  Clock,
  Phone,
  ShieldCheck,
  Search,
  ArrowRight,
  Activity,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Building2,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import hospitalData from '@/data/hospitalData.json';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { hospitalInfo, departments, doctors } = hospitalData;

  const featuredDepartments = departments.slice(0, 6);
  const featuredDoctors = doctors.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white overflow-hidden py-16 sm:py-24">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 text-xs sm:text-sm font-semibold tracking-wide">
              <BadgeCheck className="w-4 h-4 text-sky-300" />
              <span>JCI Accredited & NABH Certified Super Specialty Center</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight text-white">
              Compassionate Care, <br />
              <span className="text-sky-400 underline decoration-sky-600 decoration-wavy decoration-2">
                Advanced Medicine
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed">
              Serving our community with 24/7 emergency response, world-renowned clinical specialists, state-of-the-art robotic surgery, and patient-first compassionate care.
            </p>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/book-appointment"
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-base sm:text-lg px-6 py-3.5 rounded-xl shadow-lg hover:shadow-sky-500/30 transition-all flex items-center gap-2.5 focus:ring-4 focus:ring-sky-300"
              >
                <Calendar className="w-5 h-5 text-slate-950" />
                <span>Book Appointment</span>
              </Link>

              <Link
                href="/departments"
                className="bg-slate-800/80 hover:bg-slate-800 border-2 border-slate-600 text-white font-bold text-base sm:text-lg px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 hover:border-sky-400 focus:ring-4 focus:ring-slate-500"
              >
                <span>Explore Departments</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href={`tel:${hospitalInfo.emergencyNumber.split('/')[0].trim()}`}
                className="bg-red-700 hover:bg-red-600 text-white font-black text-base sm:text-lg px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 border border-red-500"
              >
                <Phone className="w-5 h-5 animate-pulse" />
                <span>Call Emergency (24/7)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Notice & Quick Information Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shadow-xl rounded-2xl overflow-hidden">
          {/* Card 1: 24/7 Emergency */}
          <div className="bg-red-800 text-white p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-900 rounded-xl">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight">24/7 Emergency & Trauma</h3>
                <p className="text-xs text-red-200">Immediate critical care response</p>
              </div>
            </div>
            <p className="text-sm text-red-100 leading-snug">
              Level 1 trauma resuscitation, cardiac cath lab on continuous alert, and critical care ambulances.
            </p>
            <a
              href={`tel:${hospitalInfo.emergencyNumber.split('/')[0].trim()}`}
              className="inline-flex items-center gap-2 font-black text-white bg-red-950 hover:bg-red-900 px-4 py-2.5 rounded-lg text-sm w-fit transition-colors"
            >
              <Phone className="w-4 h-4" /> Call: {hospitalInfo.emergencyNumber.split('/')[0]}
            </a>
          </div>

          {/* Card 2: Visiting Hours */}
          <div className="bg-sky-800 text-white p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-900 rounded-xl">
                <Clock className="w-7 h-7 text-sky-200" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight">Visiting Hours</h3>
                <p className="text-xs text-sky-200">Patient recovery & family time</p>
              </div>
            </div>
            <p className="text-sm text-sky-100 leading-snug">
              General Wards: <strong>11:00 AM - 1:00 PM & 5:00 PM - 7:30 PM</strong>. Pass registration at lobby.
            </p>
            <Link
              href="/visitor-info"
              className="inline-flex items-center gap-2 font-bold text-sky-950 bg-sky-200 hover:bg-sky-100 px-4 py-2.5 rounded-lg text-sm w-fit transition-colors"
            >
              <span>View Ward Schedules</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: Cashless Insurance */}
          <div className="bg-slate-900 text-white p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-800 rounded-xl">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight">Insurance & Cashless</h3>
                <p className="text-xs text-slate-400">Hassle-free admissions</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-snug">
              Empanelled with 30+ leading insurance providers and TPAs. Direct billing and cashless desk assistance.
            </p>
            <Link
              href="/billing-insurance"
              className="inline-flex items-center gap-2 font-bold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-lg text-sm w-fit transition-colors border border-slate-700"
            >
              <span>Insurance Partners</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Specialties & Clinical Departments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Centers of Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Clinical Departments & Specialties
            </h2>
          </div>
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-sky-700 hover:text-sky-900"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDepartments.map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-500 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Head: {dept.headOfDepartment}
                  </p>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {dept.shortDescription}
                </p>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-400 block mb-1">Common Procedures:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dept.commonProcedures.slice(0, 2).map((proc, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                      >
                        {proc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                <span className="text-xs font-semibold text-slate-500">
                  {dept.opdTimings}
                </span>
                <Link
                  href={`/book-appointment?department=${dept.id}`}
                  className="font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Specialist Doctors Preview */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                Renowned Medical Faculty
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Consult With Senior Specialists
              </h2>
            </div>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-sky-700 hover:text-sky-900"
            >
              <span>See All Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="p-5 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-sky-100 border-2 border-sky-300 flex items-center justify-center text-sky-800 text-xl font-black mb-2">
                    {doc.name.replace('Dr. ', '').split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-semibold text-sky-700 mt-0.5">
                      {doc.title}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {doc.qualifications}
                  </p>
                  <p className="text-xs text-slate-600 font-semibold">
                    ⭐ {doc.rating} / 5.0 ({doc.reviewsCount} reviews) • {doc.experienceYears}+ yrs exp
                  </p>
                  <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    🕒 {doc.opdTimings}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <Link
                    href={`/book-appointment?doctor=${doc.id}&department=${doc.departmentId}`}
                    className="w-full block text-center bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl transition-colors shadow-sm"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Highlights & Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pt-4 md:pt-0">
              <span className="block text-4xl sm:text-5xl font-black text-sky-400">500+</span>
              <span className="block text-sm sm:text-base font-semibold text-slate-300 mt-2">
                Inpatient Beds
              </span>
              <span className="text-xs text-slate-400">Including 110 Critical Care ICU Beds</span>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <span className="block text-4xl sm:text-5xl font-black text-emerald-400">99.2%</span>
              <span className="block text-sm sm:text-base font-semibold text-slate-300 mt-2">
                Patient Satisfaction
              </span>
              <span className="text-xs text-slate-400">Verified clinical quality index</span>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <span className="block text-4xl sm:text-5xl font-black text-sky-400">50+</span>
              <span className="block text-sm sm:text-base font-semibold text-slate-300 mt-2">
                Senior Consultants
              </span>
              <span className="text-xs text-slate-400">International fellowships & faculty</span>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <span className="block text-4xl sm:text-5xl font-black text-red-400">24/7</span>
              <span className="block text-sm sm:text-base font-semibold text-slate-300 mt-2">
                Trauma & Emergency
              </span>
              <span className="text-xs text-slate-400">&lt; 8 min average ambulance dispatch</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
