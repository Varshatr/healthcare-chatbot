'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Lock,
  KeyRound,
  RefreshCw,
} from 'lucide-react';
import hospitalData from '@/data/hospitalData.json';

function AppointmentFormContent() {
  const searchParams = useSearchParams();
  const initialDoctorId = searchParams?.get('doctor') || '';
  const initialDepartmentId = searchParams?.get('department') || '';

  const { departments, doctors, hospitalInfo } = hospitalData;

  const [selectedDept, setSelectedDept] = useState(initialDepartmentId);
  const [selectedDoctor, setSelectedDoctor] = useState(initialDoctorId);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  // Patient details
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Male');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [symptoms, setSymptoms] = useState('');

  // Already booked slots from SQLite database
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Mock OTP step
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [mockGeneratedOtp, setMockGeneratedOtp] = useState('1234');
  const [otpError, setOtpError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirmation state from DB
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');
  const [bookingError, setBookingError] = useState('');

  // Keep department & doctor in sync
  useEffect(() => {
    if (selectedDoctor) {
      const doc = doctors.find((d) => d.id === selectedDoctor);
      if (doc && (!selectedDept || selectedDept !== doc.departmentId)) {
        setSelectedDept(doc.departmentId);
      }
    }
  }, [selectedDoctor, doctors, selectedDept]);

  const currentDoctorObj = doctors.find((d) => d.id === selectedDoctor);

  // Fetch booked slots from SQLite database when doctor and date change
  useEffect(() => {
    async function checkBookedSlots() {
      if (currentDoctorObj?.name && appointmentDate) {
        setIsLoadingSlots(true);
        try {
          const res = await fetch(
            `/api/appointments?doctor=${encodeURIComponent(currentDoctorObj.name)}&date=${encodeURIComponent(appointmentDate)}`
          );
          if (res.ok) {
            const data = await res.json();
            setBookedSlots(data.bookedSlots || []);
          }
        } catch (err) {
          console.error('Error fetching booked slots:', err);
        } finally {
          setIsLoadingSlots(false);
        }
      } else {
        setBookedSlots([]);
      }
    }
    checkBookedSlots();
  }, [currentDoctorObj?.name, appointmentDate]);

  // Filter available doctors by department
  const availableDoctors = selectedDept
    ? doctors.filter((doc) => doc.departmentId === selectedDept)
    : doctors;

  const timeSlots = [
    '09:00 AM - 09:30 AM',
    '10:00 AM - 10:30 AM',
    '11:30 AM - 12:00 PM',
    '02:30 PM - 03:00 PM',
    '03:45 PM - 04:15 PM',
    '05:00 PM - 05:30 PM',
    '06:15 PM - 06:45 PM',
  ];

  // Initiate booking: Validates and prompts Mock OTP
  const handleInitiateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');

    if (!selectedDept || !selectedDoctor || !appointmentDate || !timeSlot || !patientName || !patientPhone) {
      alert('Please fill out all mandatory fields marked with an asterisk (*).');
      return;
    }

    // Check if slot is already in the booked list
    if (bookedSlots.includes(timeSlot)) {
      setBookingError(`The slot "${timeSlot}" is already booked for this doctor. Please choose another slot.`);
      return;
    }

    // Generate random 4-digit mock OTP
    const mockCode = Math.floor(1000 + Math.random() * 9000).toString();
    setMockGeneratedOtp(mockCode);
    setEnteredOtp(mockCode); // Pre-fill mock OTP for smooth testing experience
    setOtpError('');
    setShowOtpModal(true);
  };

  // Confirm OTP and save to SQLite DB via /api/appointments
  const handleVerifyOtpAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp.trim() !== mockGeneratedOtp && enteredOtp.trim() !== '1234') {
      setOtpError('Invalid OTP code. Please enter the 4-digit code shown above.');
      return;
    }

    setIsSubmitting(true);
    setBookingError('');

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: patientName,
          phone: patientPhone,
          department: currentDoctorObj?.departmentName || selectedDept,
          doctor: currentDoctorObj?.name || selectedDoctor,
          date: appointmentDate,
          timeSlot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle double booking conflict (409) or other errors
        setShowOtpModal(false);
        setBookingError(data.error || 'Failed to book appointment.');
        // Refresh booked slots list
        if (currentDoctorObj?.name && appointmentDate) {
          setBookedSlots((prev) => [...prev, timeSlot]);
        }
        return;
      }

      // Success! Saved in SQLite
      setConfirmedBookingId(data.bookingId || data.appointment.id);
      setShowOtpModal(false);
      setBookingConfirmed(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Error submitting appointment:', err);
      setBookingError('Network error saving appointment. Please try again.');
      setShowOtpModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs font-bold tracking-wider uppercase mb-2">
              Outpatient Department (OPD)
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Book a Doctor Consultation
            </h1>
            <p className="text-slate-200 text-sm sm:text-base mt-2 max-w-2xl">
              Appointments are recorded directly in our real-time hospital database. Double bookings are automatically prevented.
            </p>
          </div>

          <Link
            href="/admin"
            className="self-start sm:self-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>

      {/* Double Booking Warning Banner */}
      {bookingError && (
        <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-5 flex items-start gap-3 text-red-900 animate-in fade-in">
          <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-base text-red-900">Booking Error</h3>
            <p className="text-sm text-red-800">{bookingError}</p>
          </div>
        </div>
      )}

      {bookingConfirmed ? (
        /* Booking Confirmation Receipt */
        <div className="bg-white rounded-3xl border-2 border-emerald-500 shadow-2xl p-6 sm:p-10 space-y-8 animate-in fade-in">
          <div className="text-center space-y-3 pb-6 border-b border-slate-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full">
              Appointment Confirmed & Saved to Database
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Booking ID: #{confirmedBookingId}
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto">
              Your appointment is locked in our hospital system. Please save or print your booking ID below.
            </p>
          </div>

          {/* Appointment Ticket Details */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block">Doctor / Specialist</span>
              <p className="text-lg font-black text-slate-900">{currentDoctorObj?.name}</p>
              <p className="text-xs text-sky-700 font-bold">{currentDoctorObj?.title}</p>
              <p className="text-xs text-slate-600 mt-1">Room: {currentDoctorObj?.roomNumber}</p>
            </div>

            <div>
              <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block">Department & Fee</span>
              <p className="text-lg font-black text-slate-900">{currentDoctorObj?.departmentName}</p>
              <p className="text-xs text-slate-700 font-bold">Consultation Fee: {currentDoctorObj?.consultationFee}</p>
            </div>

            <div>
              <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block">Date & Time Slot</span>
              <p className="text-base font-black text-slate-900">{appointmentDate}</p>
              <p className="text-sm text-sky-800 font-bold">{timeSlot}</p>
            </div>

            <div>
              <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block">Patient Details</span>
              <p className="text-base font-black text-slate-900">{patientName} ({patientAge} yrs, {patientGender})</p>
              <p className="text-xs text-slate-600">Phone: {patientPhone}</p>
            </div>
          </div>

          {/* Important Arrival Guidelines */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 space-y-2 text-xs sm:text-sm text-sky-950">
            <h3 className="font-extrabold flex items-center gap-2 text-sky-900">
              <ShieldCheck className="w-5 h-5 text-sky-700" /> Instructions For Your Visit:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sky-900 font-medium pl-1">
              <li>Arrive 15 minutes before your scheduled slot at the Ground Floor OPD Registration Desk.</li>
              <li>Present your Booking ID <strong>#{confirmedBookingId}</strong> or registered mobile number at the counter.</li>
              <li>Carry a valid Government Photo ID and past prescriptions or medical investigation records.</li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print Appointment Pass</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setBookingConfirmed(false);
                setPatientName('');
                setPatientPhone('');
                setPatientEmail('');
                setSymptoms('');
                setTimeSlot('');
              }}
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm rounded-xl transition-colors shadow"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      ) : (
        /* Booking Form */
        <form
          onSubmit={handleInitiateBooking}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8"
        >
          {/* Section 1: Department & Doctor */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-lg border-b border-slate-200 pb-2">
              <span className="w-7 h-7 rounded-full bg-sky-700 text-white flex items-center justify-center text-xs">1</span>
              <span>Select Clinical Specialty & Specialist Doctor</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Department */}
              <div>
                <label htmlFor="dept-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  id="dept-select"
                  value={selectedDept}
                  onChange={(e) => {
                    setSelectedDept(e.target.value);
                    setSelectedDoctor('');
                    setTimeSlot('');
                  }}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-medium focus:bg-white focus:border-sky-600 focus:outline-none text-sm"
                >
                  <option value="">-- Choose Clinical Department --</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor */}
              <div>
                <label htmlFor="doctor-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Specialist Doctor <span className="text-red-500">*</span>
                </label>
                <select
                  id="doctor-select"
                  value={selectedDoctor}
                  onChange={(e) => {
                    setSelectedDoctor(e.target.value);
                    setTimeSlot('');
                  }}
                  required
                  disabled={!selectedDept}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-medium focus:bg-white focus:border-sky-600 focus:outline-none text-sm disabled:bg-slate-200"
                >
                  <option value="">
                    {selectedDept ? '-- Choose Doctor --' : '-- Select department first --'}
                  </option>
                  {availableDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} - {doc.title} ({doc.consultationFee})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Doctor Summary Card */}
            {currentDoctorObj && (
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-sky-950">
                <div>
                  <p className="font-extrabold text-sky-900 text-base">{currentDoctorObj.name}</p>
                  <p className="text-sky-800 font-semibold">{currentDoctorObj.title} • {currentDoctorObj.qualifications}</p>
                  <p className="text-slate-600 text-xs mt-1">
                    Room: {currentDoctorObj.roomNumber} | OPD Hours: {currentDoctorObj.opdTimings}
                  </p>
                </div>
                <div className="text-right sm:text-right shrink-0">
                  <span className="block text-xs font-bold text-slate-500">Consultation Fee</span>
                  <span className="text-base font-black text-sky-900">{currentDoctorObj.consultationFee}</span>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Date & Slot */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-lg border-b border-slate-200 pb-2">
              <span className="w-7 h-7 rounded-full bg-sky-700 text-white flex items-center justify-center text-xs">2</span>
              <span>Preferred Date & Time Slot</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="appointment-date" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Appointment Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="appointment-date"
                  type="date"
                  min={todayStr}
                  value={appointmentDate}
                  onChange={(e) => {
                    setAppointmentDate(e.target.value);
                    setTimeSlot('');
                  }}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-medium focus:bg-white focus:border-sky-600 focus:outline-none text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Available Time Slots <span className="text-red-500">*</span>
                  </label>
                  {isLoadingSlots && (
                    <span className="text-[11px] text-sky-700 font-semibold flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Checking DB...
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                  {timeSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setTimeSlot(slot)}
                        className={`px-3 py-2.5 text-xs font-bold rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isBooked
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                            : timeSlot === slot
                            ? 'bg-sky-700 text-white border-sky-700 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{slot}</span>
                        {isBooked && (
                          <span className="text-[10px] text-red-600 font-extrabold uppercase mt-0.5">
                            Already Booked
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Patient Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-lg border-b border-slate-200 pb-2">
              <span className="w-7 h-7 rounded-full bg-sky-700 text-white flex items-center justify-center text-xs">3</span>
              <span>Patient Contact Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="patient-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="patient-name"
                  type="text"
                  required
                  placeholder="e.g. Johnathan Doe"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-medium focus:bg-white focus:border-sky-600 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label htmlFor="patient-age" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  id="patient-age"
                  type="number"
                  min="0"
                  max="120"
                  required
                  placeholder="e.g. 45"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-medium focus:bg-white focus:border-sky-600 focus:outline-none text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="patient-gender" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="patient-gender"
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-medium focus:bg-white focus:border-sky-600 focus:outline-none text-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="patient-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Mobile Phone (for OTP) <span className="text-red-500">*</span>
                </label>
                <input
                  id="patient-phone"
                  type="tel"
                  required
                  placeholder="+1 (555) 012-3456"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-medium focus:bg-white focus:border-sky-600 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label htmlFor="patient-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  id="patient-email"
                  type="email"
                  placeholder="name@example.com"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-medium focus:bg-white focus:border-sky-600 focus:outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="patient-symptoms" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Primary Reason for Consultation / Symptoms
              </label>
              <textarea
                id="patient-symptoms"
                rows={3}
                placeholder="Briefly describe symptoms, duration, or previous treatments..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-medium focus:bg-white focus:border-sky-600 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Double-booking verification and mock phone verification will be performed upon submission.
            </p>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-sky-700 hover:bg-sky-800 text-white font-black text-base rounded-xl shadow-lg hover:shadow-xl transition-all focus:ring-4 focus:ring-sky-300 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-5 h-5" />
              <span>Proceed to Verification (OTP)</span>
            </button>
          </div>
        </form>
      )}

      {/* Mock OTP Verification Modal */}
      {showOtpModal && (
        <div
          role="dialog"
          aria-label="Mock OTP Verification"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-sky-100 text-sky-800 rounded-2xl flex items-center justify-center mx-auto">
                <KeyRound className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Phone Verification (OTP)
              </h3>
              <p className="text-xs text-slate-500">
                Verifying phone number <strong>{patientPhone}</strong>
              </p>
            </div>

            {/* Mock OTP Hint Callout */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mock OTP Mode Active:</span>
              </p>
              <p>
                Your mock verification code is: <strong className="text-sm font-black text-emerald-800 tracking-widest">{mockGeneratedOtp}</strong>
              </p>
            </div>

            {otpError && (
              <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                {otpError}
              </p>
            )}

            <form onSubmit={handleVerifyOtpAndSave} className="space-y-4">
              <div>
                <label htmlFor="otp-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Enter 4-Digit Code
                </label>
                <input
                  id="otp-input"
                  type="text"
                  maxLength={4}
                  required
                  autoFocus
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  className="w-full text-center tracking-[0.5em] text-2xl font-black bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:bg-white focus:border-sky-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 py-3 bg-sky-700 hover:bg-sky-800 disabled:bg-slate-300 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? (
                    <span>Booking...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Book</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-bold">Loading appointment booking...</div>}>
      <AppointmentFormContent />
    </Suspense>
  );
}
