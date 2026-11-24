'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  Building,
  Navigation,
  Compass,
} from 'lucide-react';
import hospitalData from '@/data/hospitalData.json';

export default function ContactPage() {
  const { hospitalInfo } = hospitalData;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'General Enquiry',
    message: '',
  });

  const departmentExtensions = [
    { department: '24/7 Emergency & Casualty', extension: 'Ext. 108 / 1000', timing: '24 Hours / 7 Days' },
    { department: 'OPD Central Appointments', extension: 'Ext. 1010 / 1012', timing: '08:00 AM - 08:00 PM' },
    { department: 'Cashless Insurance & TPA Desk', extension: 'Ext. 1040', timing: '08:00 AM - 08:00 PM' },
    { department: '24/7 In-House Pharmacy', extension: 'Ext. 1055', timing: '24 Hours / 7 Days' },
    { department: 'Pathology & Diagnostic Laboratory', extension: 'Ext. 1060', timing: '24 Hours / 7 Days' },
    { department: 'Radiology & Imaging (MRI/CT)', extension: 'Ext. 1070', timing: '24 Hours / 7 Days' },
    { department: 'Patient Relations & Grievance', extension: 'Ext. 1090', timing: '09:00 AM - 06:00 PM' },
    { department: 'Blood Bank & Transfusion', extension: 'Ext. 1099', timing: '24 Hours / 7 Days' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-200 text-xs font-bold tracking-wider uppercase">
            24/7 Contact & Emergency Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Get in Touch With Apex Care
          </h1>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            Whether you need urgent emergency response, OPD specialist consultations, or general visitor guidance, our care team is ready to assist you.
          </p>
        </div>
      </div>

      {/* Emergency Hotlines Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ambulance */}
        <div className="bg-red-800 text-white p-6 rounded-2xl shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-200 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-white" />
              <span>Critical Emergency</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">Ambulance & Trauma (24/7)</h2>
            <p className="text-xs text-red-100">
              Immediate deployment of mobile ICU ambulances with paramedics and life-support systems.
            </p>
          </div>
          <a
            href={`tel:${hospitalInfo.emergencyNumber.split('/')[0].trim()}`}
            className="w-full text-center bg-red-950 hover:bg-red-900 text-white font-black py-3 rounded-xl transition-colors block text-sm"
          >
            Call: {hospitalInfo.emergencyNumber}
          </a>
        </div>

        {/* General Enquiry */}
        <div className="bg-sky-800 text-white p-6 rounded-2xl shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sky-200 font-bold text-xs uppercase tracking-wider">
              <Phone className="w-4 h-4 text-white" />
              <span>General Helpline</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">Hospital Enquiry Desk</h2>
            <p className="text-xs text-sky-100">
              For general hospital queries, patient room information, or visiting pass verification.
            </p>
          </div>
          <a
            href={`tel:${hospitalInfo.generalEnquiry}`}
            className="w-full text-center bg-sky-950 hover:bg-sky-900 text-white font-black py-3 rounded-xl transition-colors block text-sm"
          >
            Call: {hospitalInfo.generalEnquiry}
          </a>
        </div>

        {/* Email Support */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase tracking-wider">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>Digital Enquiries</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">Email Helpdesk</h2>
            <p className="text-xs text-slate-300">
              For non-urgent queries, medical records requests, corporate tie-ups, or feedback.
            </p>
          </div>
          <a
            href={`mailto:${hospitalInfo.email}`}
            className="w-full text-center bg-slate-800 hover:bg-slate-700 text-white font-black py-3 rounded-xl transition-colors block text-xs sm:text-sm border border-slate-700"
          >
            {hospitalInfo.email}
          </a>
        </div>
      </div>

      {/* Main Content Grid: Enquiry Form & Hospital Location */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Send an Online Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Our patient relations team will respond within 4 business hours.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-black text-slate-900">Enquiry Received</h3>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">
                Thank you, <strong>{formData.name}</strong>. Our hospital coordinator will contact you at <strong>{formData.phone}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', department: 'General Enquiry', message: '' });
                }}
                className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-sky-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-sky-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-sky-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-dept" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nature of Enquiry
                </label>
                <select
                  id="contact-dept"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-sky-600 focus:outline-none"
                >
                  <option value="General Enquiry">General Hospital Enquiry</option>
                  <option value="Doctor Consultation">Doctor Consultation & OPD</option>
                  <option value="Insurance & Billing">Insurance & Cashless Claim</option>
                  <option value="Visitor Passes">Visiting Hours & Attendant Pass</option>
                  <option value="Feedback / Grievance">Patient Feedback & Grievance</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Message / Question <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  required
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-sky-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-sky-700 hover:bg-sky-800 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Location & Directions */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Hospital Location & Transit
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Centrally located with direct metro, bus, and airport highway connectivity.
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-sky-700 shrink-0 mt-1" />
                <div>
                  <strong className="block text-slate-900 font-bold text-base">
                    {hospitalInfo.name}
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    {hospitalInfo.address.street}<br />
                    {hospitalInfo.address.city}, {hospitalInfo.address.state} {hospitalInfo.address.postalCode}<br />
                    <span className="text-sky-800 font-semibold text-xs">
                      Landmark: {hospitalInfo.address.landmark}
                    </span>
                  </p>
                </div>
              </div>

              {/* Transit Details */}
              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-bold block">By Metro / Subway:</strong>
                    <span>Central Metro Station (Blue Line) - Gate No. 3 (2-minute walking distance).</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-bold block">By City Bus:</strong>
                    <span>Stop: Medical District Central Terminal (Routes 14A, 22B, 105).</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Building className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-bold block">Airport Distance:</strong>
                    <span>Metropolis International Airport is 24 km away via Express Highway.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Visual Map Card */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-100 to-sky-50 border border-slate-300 p-6 text-center space-y-3">
              <MapPin className="w-8 h-8 text-sky-700 mx-auto animate-bounce" />
              <div>
                <h3 className="font-extrabold text-slate-900">Hospital Campus Navigator</h3>
                <p className="text-xs text-slate-600">
                  Tower A (Cardiology & Surgery) • Tower B (Neuro & Gastro) • Tower C (Pediatrics & Nephro) • Tower D (Oncology)
                </p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 underline hover:text-sky-950"
              >
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Phone Extensions Directory */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
            Internal Extension Directory
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Departmental Direct Extension Numbers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departmentExtensions.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5"
            >
              <h3 className="text-xs font-bold text-slate-900">{item.department}</h3>
              <p className="text-sm font-black text-sky-800">{item.extension}</p>
              <p className="text-[11px] text-slate-500 font-semibold">{item.timing}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
