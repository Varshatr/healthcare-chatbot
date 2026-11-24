'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  HeartPulse,
  Search,
  Clock,
  MapPin,
  Phone,
  Bed,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CheckCircle,
  Users,
} from 'lucide-react';
import hospitalData from '@/data/hospitalData.json';

export default function DepartmentsPage() {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const { departments, hospitalInfo } = hospitalData;

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {
      const matchesSearch =
        dept.name.toLowerCase().includes(search.toLowerCase()) ||
        dept.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        dept.commonProcedures.some((p) => p.toLowerCase().includes(search.toLowerCase()));

      if (selectedFilter === 'ALL') return matchesSearch;
      if (selectedFilter === 'SURGICAL') {
        return matchesSearch && (dept.id === 'cardiology' || dept.id === 'neurology' || dept.id === 'orthopedics' || dept.id === 'gastroenterology');
      }
      if (selectedFilter === 'CRITICAL') {
        return matchesSearch && (dept.id === 'emergency' || dept.id === 'cardiology' || dept.id === 'pediatrics');
      }
      return matchesSearch;
    });
  }, [departments, search, selectedFilter]);

  return (
    <div className="py-10 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs font-bold tracking-wider uppercase">
            Specialized Medicine
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Clinical Departments & Specialties
          </h1>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            From round-the-clock emergency interventions to specialized multi-organ transplants, explore our world-class medical divisions.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 pt-6 border-t border-sky-800/60 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search specialty, procedure, or condition..."
              className="w-full bg-slate-800 text-white pl-11 pr-4 py-3 rounded-xl border border-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400 text-sm font-medium"
              aria-label="Search departments or procedures"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setSelectedFilter('ALL')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedFilter === 'ALL'
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Specialties ({departments.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('SURGICAL')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedFilter === 'SURGICAL'
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Surgical & Invasive
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('CRITICAL')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedFilter === 'CRITICAL'
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Critical & Emergency
            </button>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-slate-600 text-sm font-bold">
          <span>Showing {filteredDepartments.length} Departments</span>
          <span className="text-xs text-sky-700">OPD Consultation & Inpatient Services</span>
        </div>

        {filteredDepartments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-lg font-bold text-slate-800">No departments match &quot;{search}&quot;</p>
            <p className="text-sm text-slate-500 mt-1">Try searching for &quot;Heart&quot;, &quot;Spine&quot;, &quot;Child&quot;, or &quot;Laser&quot;.</p>
            <button
              type="button"
              onClick={() => setSearch('')}
              className="mt-4 px-4 py-2 bg-sky-700 text-white font-bold text-sm rounded-lg"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDepartments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-sky-500 hover:shadow-xl transition-all p-6 sm:p-7 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Title & Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                        <HeartPulse className="w-7 h-7" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {dept.name}
                        </h2>
                        <p className="text-xs font-semibold text-sky-800">
                          Head of Dept: {dept.headOfDepartment}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {dept.fullDescription}
                  </p>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-700 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-sky-700 shrink-0" />
                      <span>{dept.opdTimings}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-sky-700 shrink-0" />
                      <span>{dept.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-sky-700 shrink-0" />
                      <span>{dept.bedsCount} Specialized Beds</span>
                    </div>
                  </div>

                  {/* Procedures Tag List */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Key Procedures & Treatments:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.commonProcedures.map((proc, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold bg-sky-50 text-sky-900 border border-sky-200 px-2.5 py-1 rounded-lg"
                        >
                          {proc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-sky-600" />
                    <span>Direct: {dept.phoneExtension}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/doctors?department=${dept.id}`}
                      className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-sky-800 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      View Doctors
                    </Link>
                    <Link
                      href={`/book-appointment?department=${dept.id}`}
                      className="px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-white bg-sky-700 hover:bg-sky-800 shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book in Dept</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
