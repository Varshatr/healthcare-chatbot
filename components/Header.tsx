'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Calendar, Clock, Menu, X, ShieldAlert, HeartPulse } from 'lucide-react';
import hospitalData from '@/data/hospitalData.json';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/departments', label: 'Departments' },
  { href: '/doctors', label: 'Doctors' },
  { href: '/book-appointment', label: 'Book Appointment' },
  { href: '/visitor-info', label: 'Visitor Info' },
  { href: '/billing-insurance', label: 'Billing & Insurance' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { hospitalInfo } = hospitalData;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Emergency & Visiting Hours Bar */}
      <div className="bg-red-700 text-white text-sm font-medium py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <div className="flex items-center gap-1.5 font-bold tracking-wide">
              <ShieldAlert className="w-4 h-4 text-white" aria-hidden="true" />
              <span>24/7 EMERGENCY & AMBULANCE:</span>
            </div>
            <a
              href={`tel:${hospitalInfo.emergencyNumber.split('/')[0].trim()}`}
              className="underline font-extrabold text-white hover:text-red-100 transition-colors ml-1 focus:ring-2 focus:ring-white rounded px-1"
              aria-label={`Emergency telephone number: ${hospitalInfo.emergencyNumber}`}
            >
              {hospitalInfo.emergencyNumber}
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-xs text-red-50">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-200" aria-hidden="true" />
              <span>General Visiting: {hospitalInfo.generalVisitingHours}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-red-200" aria-hidden="true" />
              <span>OPD Helpline: {hospitalInfo.generalEnquiry}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Hospital Branding */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:ring-2 focus:ring-sky-600 rounded-lg p-1"
          aria-label="Apex Care Hospital Homepage"
        >
          <div className="w-11 h-11 bg-sky-700 text-white rounded-xl flex items-center justify-center shadow-md group-hover:bg-sky-800 transition-colors">
            <HeartPulse className="w-7 h-7" aria-hidden="true" />
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-tight">
              APEX CARE
            </span>
            <span className="block text-xs font-semibold text-sky-800 tracking-wider uppercase">
              Super Specialty Hospital
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors focus:ring-2 focus:ring-sky-600 ${
                  isActive
                    ? 'bg-sky-100 text-sky-900 border border-sky-300'
                    : 'text-slate-700 hover:text-sky-900 hover:bg-slate-100'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/book-appointment"
            className="flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white text-sm sm:text-base font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow hover:shadow-md transition-all focus:ring-4 focus:ring-sky-300"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            <span>Book Appointment</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:ring-2 focus:ring-sky-600 border border-slate-200"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 text-white px-4 pt-4 pb-6 border-t border-slate-800 shadow-2xl">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Navigation Menu
          </div>
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-bold transition-colors ${
                    isActive
                      ? 'bg-sky-700 text-white'
                      : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 pt-4 border-t border-slate-800 text-sm text-slate-300 space-y-2">
            <p className="flex items-center gap-2">
              <span className="font-bold text-red-400">Emergency:</span>
              <a href={`tel:${hospitalInfo.emergencyNumber}`} className="underline text-white font-bold">
                {hospitalInfo.emergencyNumber}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold text-sky-400">Visiting Hours:</span>
              <span>{hospitalInfo.generalVisitingHours}</span>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
