import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  HeartPulse,
  ShieldCheck,
  Award,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import hospitalData from '@/data/hospitalData.json';

export default function Footer() {
  const { hospitalInfo, departments } = hospitalData;

  return (
    <footer className="bg-slate-950 text-slate-200 pt-14 pb-8 border-t-4 border-sky-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Hospital Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-xl font-black text-white tracking-tight">
                  APEX CARE
                </span>
                <span className="block text-xs font-semibold text-sky-400 tracking-wider uppercase">
                  Super Specialty Hospital
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {hospitalInfo.tagline}. Delivering patient-centered clinical excellence, cutting-edge surgical innovation, and 24/7 critical emergency response.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-semibold text-sky-300">
                <Award className="w-3.5 h-3.5 text-amber-400" /> JCI Accredited
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> NABH Certified
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-base font-bold tracking-wide uppercase mb-4 border-b border-slate-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/departments"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-sky-500" /> Clinical Departments
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-sky-500" /> Find a Specialist Doctor
                </Link>
              </li>
              <li>
                <Link
                  href="/book-appointment"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-sky-500" /> Book an OPD Appointment
                </Link>
              </li>
              <li>
                <Link
                  href="/visitor-info"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-sky-500" /> Visiting Hours & Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/billing-insurance"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-sky-500" /> Cashless Insurance & Billing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-sky-500" /> Contact & Hospital Map
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5 text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Visiting Hours & Timings */}
          <div>
            <h3 className="text-white text-base font-bold tracking-wide uppercase mb-4 border-b border-slate-800 pb-2">
              Visiting & Timings
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wide mb-1">
                  <Clock className="w-4 h-4" /> General Wards Visiting
                </div>
                <p className="text-slate-200 font-semibold">{hospitalInfo.generalVisitingHours}</p>
                <p className="text-xs text-slate-400 mt-0.5">Maximum 2 visitors at bedside</p>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide mb-1">
                  <Clock className="w-4 h-4" /> ICU & Critical Care
                </div>
                <p className="text-slate-200 font-semibold">12:00 PM - 1:00 PM & 5:00 PM - 6:00 PM</p>
                <p className="text-xs text-slate-400 mt-0.5">1 immediate family member only</p>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide mb-1">
                  <Clock className="w-4 h-4" /> OPD Consultation Hours
                </div>
                <p className="text-slate-200">{hospitalInfo.opdHours}</p>
              </div>
            </div>
          </div>

          {/* Column 4: Address & Emergency Contacts */}
          <div>
            <h3 className="text-white text-base font-bold tracking-wide uppercase mb-4 border-b border-slate-800 pb-2">
              Hospital Location & Contacts
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
                <address className="not-italic text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <strong className="text-white font-semibold">{hospitalInfo.name}</strong><br />
                  {hospitalInfo.address.street}<br />
                  {hospitalInfo.address.city}, {hospitalInfo.address.state} {hospitalInfo.address.postalCode}<br />
                  <span className="text-sky-300 text-xs">({hospitalInfo.address.landmark})</span>
                </address>
              </div>

              <div className="pt-2 space-y-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-red-400 font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>24/7 Emergency:</span>
                  <a href={`tel:${hospitalInfo.emergencyNumber}`} className="text-white underline hover:text-red-300">
                    {hospitalInfo.emergencyNumber}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                  <span>General Enquiry:</span>
                  <a href={`tel:${hospitalInfo.generalEnquiry}`} className="text-white hover:text-sky-400">
                    {hospitalInfo.generalEnquiry}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                  <a href={`mailto:${hospitalInfo.email}`} className="text-white hover:text-sky-400 break-all text-xs sm:text-sm">
                    {hospitalInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {hospitalInfo.name}. All rights reserved.
          </p>
          <p className="text-center sm:text-right text-slate-400">
            For urgent life-threatening conditions, please call 108 or your local emergency number immediately.
          </p>
        </div>
      </div>
    </footer>
  );
}
