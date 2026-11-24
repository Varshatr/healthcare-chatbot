'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  Calendar,
  Clock,
  Phone,
  User,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Building,
  Filter,
} from 'lucide-react';

interface Appointment {
  id: string;
  name: string;
  phone: string;
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Appointments data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [metrics, setMetrics] = useState({ total: 0, confirmed: 0, cancelled: 0, completed: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Check saved session in sessionStorage
  useEffect(() => {
    const savedPassword = sessionStorage.getItem('apex_admin_pwd');
    if (savedPassword) {
      setPassword(savedPassword);
      fetchAppointments(savedPassword);
    }
  }, []);

  const fetchAppointments = async (pwdToUse: string) => {
    setIsLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/appointments', {
        headers: {
          'x-admin-password': pwdToUse,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setAuthError('Incorrect password. Please try again.');
          setIsAuthenticated(false);
          sessionStorage.removeItem('apex_admin_pwd');
        } else {
          setAuthError('Failed to load appointments.');
        }
        return;
      }

      const data = await res.json();
      setAppointments(data.appointments || []);
      setMetrics(data.metrics || { total: 0, confirmed: 0, cancelled: 0, completed: 0 });
      setIsAuthenticated(true);
      sessionStorage.setItem('apex_admin_pwd', pwdToUse);
    } catch (err) {
      console.error(err);
      setAuthError('Network error connecting to database.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    fetchAppointments(password.trim());
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    sessionStorage.removeItem('apex_admin_pwd');
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/appointments', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        fetchAppointments(password);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery) ||
      app.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* If Not Authenticated: Password Prompt */}
      {!isAuthenticated ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-sky-100 text-sky-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Admin Appointments Portal
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Enter your administrative password to access patient bookings.
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  Admin Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  required
                  placeholder="Enter admin password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:bg-white focus:border-sky-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-sky-700 hover:bg-sky-800 disabled:bg-slate-300 text-white font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Verifying credentials...</span>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Access Dashboard</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center">
              <Link href="/" className="text-xs text-sky-700 hover:text-sky-900 font-bold">
                &larr; Return to Hospital Website
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated Dashboard View */
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Header Row */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Hospital Administration • SQLite Database</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Appointment Management Portal
              </h1>
              <p className="text-xs text-slate-400">
                View, monitor, and manage outpatient clinic appointments in real time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fetchAppointments(password)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 bg-red-900/80 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Bookings</span>
              <p className="text-3xl font-black text-slate-900 mt-1">{metrics.total}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Confirmed</span>
              <p className="text-3xl font-black text-emerald-700 mt-1">{metrics.confirmed}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Completed</span>
              <p className="text-3xl font-black text-sky-700 mt-1">{metrics.completed}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Cancelled</span>
              <p className="text-3xl font-black text-red-700 mt-1">{metrics.cancelled}</p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient, phone, doctor, ID..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value="ALL">All Statuses ({appointments.length})</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center space-y-2">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-base font-bold text-slate-700">No appointments found</p>
                <p className="text-xs text-slate-400">
                  {appointments.length === 0
                    ? 'No appointments have been booked yet. New bookings from /book-appointment will show here.'
                    : 'No appointments match your search criteria.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                      <th className="py-3.5 px-4">Booking ID</th>
                      <th className="py-3.5 px-4">Patient Name & Contact</th>
                      <th className="py-3.5 px-4">Department & Doctor</th>
                      <th className="py-3.5 px-4">Date & Slot</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        {/* ID */}
                        <td className="py-4 px-4 font-black text-sky-800">
                          #{app.id}
                        </td>

                        {/* Patient */}
                        <td className="py-4 px-4">
                          <strong className="block text-slate-900 font-bold text-sm">
                            {app.name}
                          </strong>
                          <span className="text-xs text-slate-500 font-medium">
                            {app.phone}
                          </span>
                        </td>

                        {/* Doctor */}
                        <td className="py-4 px-4">
                          <strong className="block text-slate-900 font-bold">
                            {app.doctor}
                          </strong>
                          <span className="text-xs text-sky-700 font-medium">
                            {app.department}
                          </span>
                        </td>

                        {/* Date & Slot */}
                        <td className="py-4 px-4">
                          <span className="block font-bold text-slate-900">
                            {app.date}
                          </span>
                          <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium">
                            {app.timeSlot}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              app.status === 'CONFIRMED'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : app.status === 'COMPLETED'
                                ? 'bg-sky-50 text-sky-800 border border-sky-200'
                                : 'bg-red-50 text-red-800 border border-red-200'
                            }`}
                          >
                            {app.status === 'CONFIRMED' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                            {app.status === 'CANCELLED' && <XCircle className="w-3 h-3 text-red-600" />}
                            <span>{app.status}</span>
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right space-x-1.5 whitespace-nowrap">
                          {app.status === 'CONFIRMED' && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleStatusChange(app.id, 'COMPLETED')}
                                className="px-2.5 py-1 bg-sky-100 hover:bg-sky-200 text-sky-900 text-xs font-bold rounded-lg transition-colors"
                              >
                                Complete
                              </button>
                              <button
                                type="button"
                                onClick={() => handleStatusChange(app.id, 'CANCELLED')}
                                className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-900 text-xs font-bold rounded-lg transition-colors"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {app.status === 'CANCELLED' && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(app.id, 'CONFIRMED')}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
                            >
                              Re-confirm
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
