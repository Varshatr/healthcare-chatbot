'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  Star,
  Clock,
  Calendar,
  Languages,
  Award,
  CheckCircle,
  Building,
  UserCheck,
  ArrowRight,
} from 'lucide-react';
import hospitalData from '@/data/hospitalData.json';

function DoctorsContent() {
  const searchParams = useSearchParams();
  const initialDept = searchParams?.get('department') || 'ALL';

  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState(initialDept);
  const [selectedDay, setSelectedDay] = useState('ALL');

  const { doctors, departments } = hospitalData;

  const daysOfWeek = ['ALL', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.departmentName.toLowerCase().includes(search.toLowerCase()) ||
        doc.qualifications.toLowerCase().includes(search.toLowerCase()) ||
        doc.bio.toLowerCase().includes(search.toLowerCase());

      const matchesDept =
        departmentFilter === 'ALL' ? true : doc.departmentId === departmentFilter;

      const matchesDay =
        selectedDay === 'ALL' ? true : doc.availableDays.includes(selectedDay);

      return matchesSearch && matchesDept && matchesDay;
    });
  }, [doctors, search, departmentFilter, selectedDay]);

  return (
    <div className="py-10 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs font-bold tracking-wider uppercase">
            Medical Faculty Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Find & Consult Our Specialists
          </h1>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            Search our directory of distinguished surgeons, physicians, and sub-specialists. View consultation schedules, qualifications, and book your OPD appointment.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Name Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor name or specialty..."
              className="w-full bg-slate-800 text-white pl-11 pr-4 py-3 rounded-xl border border-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400 text-sm font-medium"
              aria-label="Search doctor by name or specialty"
            />
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400 text-sm font-medium"
              aria-label="Filter by clinical department"
            >
              <option value="ALL">All Clinical Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Day Filter */}
          <div>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400 text-sm font-medium"
              aria-label="Filter by available day"
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day === 'ALL' ? 'Any Available Day' : `Available on ${day}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-slate-700 text-sm font-bold">
          <span>Found {filteredDoctors.length} Specialists Available</span>
          {(search || departmentFilter !== 'ALL' || selectedDay !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setDepartmentFilter('ALL');
                setSelectedDay('ALL');
              }}
              className="text-xs text-sky-700 hover:text-sky-900 underline font-extrabold"
            >
              Reset all filters
            </button>
          )}
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-lg font-bold text-slate-800">No doctors match your selected criteria</p>
            <p className="text-sm text-slate-500 mt-1">Try resetting the department or day filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setDepartmentFilter('ALL');
                setSelectedDay('ALL');
              }}
              className="mt-4 px-4 py-2 bg-sky-700 text-white font-bold text-sm rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-sky-500 hover:shadow-xl transition-all p-6 sm:p-7 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Doctor Profile Header */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-sky-700 to-sky-500 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                      {doc.name.replace('Dr. ', '').split(' ').map((n) => n[0]).join('')}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">
                          {doc.departmentName.split('&')[0].trim()}
                        </span>
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified Faculty
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                        {doc.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-bold text-sky-800">
                        {doc.title}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        {doc.qualifications}
                      </p>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Experience</span>
                      <span className="text-slate-900 font-bold">{doc.experienceYears}+ Years</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Patient Rating</span>
                      <span className="text-amber-700 font-bold">⭐ {doc.rating} ({doc.reviewsCount})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Consultation Fee</span>
                      <span className="text-slate-900 font-bold">{doc.consultationFee}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {doc.bio}
                  </p>

                  {/* Schedule & Room */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock className="w-4 h-4 text-sky-700 shrink-0" />
                      <span className="font-bold">OPD Timings:</span>
                      <span>{doc.opdTimings}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700">
                      <Building className="w-4 h-4 text-sky-700 shrink-0" />
                      <span className="font-bold">Consultation Room:</span>
                      <span>{doc.roomNumber}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700">
                      <Languages className="w-4 h-4 text-sky-700 shrink-0" />
                      <span className="font-bold">Languages:</span>
                      <span>{doc.languages.join(', ')}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="font-bold text-slate-500 mr-1">Available:</span>
                      {doc.availableDays.map((day) => (
                        <span
                          key={day}
                          className="text-[11px] font-bold bg-slate-200/80 text-slate-800 px-2 py-0.5 rounded"
                        >
                          {day.slice(0, 3)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-500">
                    OPD Desk: Tower Reception
                  </span>

                  <Link
                    href={`/book-appointment?doctor=${doc.id}&department=${doc.departmentId}`}
                    className="bg-sky-700 hover:bg-sky-800 text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 focus:ring-4 focus:ring-sky-200"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-bold">Loading specialists directory...</div>}>
      <DoctorsContent />
    </Suspense>
  );
}

