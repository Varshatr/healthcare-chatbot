'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CreditCard,
  FileText,
  HelpCircle,
  Phone,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Building,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import hospitalData from '@/data/hospitalData.json';

export default function BillingInsurancePage() {
  const { insurancePartners, cashlessProcessSteps, faqs, hospitalInfo } = hospitalData;
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[3]?.id || null);

  const billingFaqs = faqs.filter(
    (f) => f.category === 'Billing & Insurance' || f.category === 'General'
  );

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold tracking-wider uppercase">
            Financial Counsel & TPA Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Billing & Cashless Insurance
          </h1>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            We believe in complete financial transparency. Discover our empanelled insurance network, hassle-free cashless hospitalization process, and flexible payment options.
          </p>
        </div>
      </div>

      {/* 4-Step Cashless Hospitalization Workflow */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
            Hassle-Free Approvals
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            4-Step Cashless Admission & Claim Flow
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cashlessProcessSteps.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3 relative overflow-hidden flex flex-col justify-between hover:border-sky-500 transition-all"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-sky-700 text-white flex items-center justify-center font-black text-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-sky-700 font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Step {item.step} of 4</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empanelled Insurance Partners & TPAs */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Insurance Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Empanelled Insurers & TPAs
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Cashless facilities subject to policy terms
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {insurancePartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {partner.category}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {partner.claimType}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-tight pt-1">
                {partner.name}
              </h3>
              <p className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 pt-1">
                <Phone className="w-3.5 h-3.5 text-sky-700" />
                <span>Helpline: {partner.contact}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modes Accepted */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-black tracking-tight text-white">
            Accepted Payment Methods
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Multiple secure payment avenues available at billing counters and through online patient portal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
            <CreditCard className="w-7 h-7 text-sky-400" />
            <h3 className="text-base font-bold text-white">Credit & Debit Cards</h3>
            <p className="text-xs text-slate-300">Visa, Mastercard, American Express, Rupay (All domestic & foreign cards)</p>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
            <DollarSign className="w-7 h-7 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Instant UPI & QR</h3>
            <p className="text-xs text-slate-300">Google Pay, PhonePe, Apple Pay, Paytm, and direct QR scans at counter</p>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
            <Building className="w-7 h-7 text-amber-400" />
            <h3 className="text-base font-bold text-white">Net Banking & Wire</h3>
            <p className="text-xs text-slate-300">Direct NEFT/RTGS bank transfers for planned surgeries and major admissions</p>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
            <ShieldCheck className="w-7 h-7 text-purple-400" />
            <h3 className="text-base font-bold text-white">Direct Cashless Desk</h3>
            <p className="text-xs text-slate-300">Direct settlement with insurance TPAs without patient out-of-pocket deposits</p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
            Common Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Billing & Insurance FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {billingFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-sky-700 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* TPA Desk Callout */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-emerald-950">
            Have Questions About Your Specific Insurance Policy?
          </h3>
          <p className="text-sm text-emerald-800">
            Visit our Cashless Insurance & TPA Helpdesk located on the Ground Floor, Tower A. Open Monday to Saturday: 8:00 AM - 8:00 PM.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${hospitalInfo.generalEnquiry}`}
            className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow"
          >
            <Phone className="w-4 h-4" />
            <span>Speak with TPA Officer</span>
          </a>
        </div>
      </div>
    </div>
  );
}
