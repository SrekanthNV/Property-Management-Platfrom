// ============================================================
// Dashboard Page - Analytics & Overview
// ============================================================

"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout";
import { Card, StatCard, StatusBadge, Avatar, Button, ProgressBar } from "@/components/ui";
import { mockDashboardStats, mockProperties, mockPayments, mockTickets } from "@/lib/mock-data";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

// ---- Revenue Chart (simplified inline chart) ----
function RevenueChart() {
  const data = mockDashboardStats.revenueByMonth;
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Revenue Overview</h3>
          <p className="text-sm text-surface-400 mt-0.5">Last 6 months performance</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-500" /> Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-surface-300" /> Expenses
          </span>
        </div>
      </div>
      <div className="flex items-end gap-3 h-48">
        {data.map((item, i) => (
          <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex gap-1 items-end" style={{ height: "160px" }}>
              <div
                className="flex-1 bg-brand-500 rounded-t-md transition-all duration-500 hover:bg-brand-600"
                style={{ height: `${(item.revenue / maxRevenue) * 100}%`, animationDelay: `${i * 0.1}s` }}
                title={formatCurrency(item.revenue)}
              />
              <div
                className="flex-1 bg-surface-200 rounded-t-md transition-all duration-500 hover:bg-surface-300"
                style={{ height: `${(item.expenses / maxRevenue) * 100}%` }}
                title={formatCurrency(item.expenses)}
              />
            </div>
            <span className="text-xs text-surface-400 font-medium">{item.month}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---- Occupancy by Property ----
function OccupancyCard() {
  return (
    <Card className="p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-1">Occupancy Rate</h3>
      <p className="text-sm text-surface-400 mb-5">By property</p>
      <div className="space-y-4">
        {mockDashboardStats.occupancyByProperty.map((item) => (
          <ProgressBar
            key={item.property}
            label={item.property}
            value={item.rate}
            color={item.rate >= 90 ? "success" : item.rate >= 70 ? "brand" : "warning"}
          />
        ))}
      </div>
    </Card>
  );
}

// ---- Recent Payments Table ----
function RecentPaymentsTable() {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100">
        <h3 className="text-base font-semibold text-gray-900">Recent Payments</h3>
        <Button variant="ghost" size="sm">View All →</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header">Tenant</th>
              <th className="table-header">Amount</th>
              <th className="table-header">Status</th>
              <th className="table-header">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockPayments.slice(0, 5).map((payment) => (
              <tr key={payment.id} className="table-row">
                <td className="table-cell font-medium text-gray-900">{payment.description}</td>
                <td className="table-cell font-semibold">{formatCurrency(payment.amount)}</td>
                <td className="table-cell">
                  <StatusBadge status={payment.status} />
                </td>
                <td className="table-cell text-surface-400">
                  {formatDate(payment.dueDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ---- Active Tickets ----
function ActiveTickets() {
  const priorityOrder = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
  const activeTickets = mockTickets
    .filter((t) => t.status !== "CLOSED" && t.status !== "RESOLVED")
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100">
        <h3 className="text-base font-semibold text-gray-900">Active Tickets</h3>
        <Button variant="ghost" size="sm">View All →</Button>
      </div>
      <div className="divide-y divide-surface-100">
        {activeTickets.map((ticket) => (
          <div key={ticket.id} className="px-6 py-4 hover:bg-surface-50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{ticket.title}</p>
                <p className="text-xs text-surface-400 mt-0.5">
                  Unit {ticket.unitId.replace("unit_", "")} · {formatDate(ticket.createdAt, "relative")}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusBadge status={ticket.priority} />
                <StatusBadge status={ticket.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---- Main Dashboard ----
export default function DashboardPage() {
  const stats = mockDashboardStats;

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle={`Welcome back, ${mockDashboardStats.totalProperties} properties managed`}
      />
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            change={{ value: 3.2, label: "vs last month" }}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Occupancy Rate"
            value={`${stats.occupancyRate}%`}
            change={{ value: 1.5, label: "vs last month" }}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />
          <StatCard
            title="Pending Payments"
            value={stats.pendingPayments}
            change={{ value: -12, label: "vs last month" }}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Open Tickets"
            value={stats.openTickets}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            }
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <OccupancyCard />
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentPaymentsTable />
          <ActiveTickets />
        </div>
      </div>
    </div>
  );
}
