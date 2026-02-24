// ============================================================
// Payments Page - Collection & Tracking
// ============================================================

"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout";
import { Card, Button, StatusBadge, SearchBar, StatCard, Select, Modal, Input } from "@/components/ui";
import { mockPayments } from "@/lib/mock-data";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { Payment } from "@/types";

// ---- Payment Row ----
function PaymentRow({ payment }: { payment: Payment }) {
  return (
    <tr className="table-row cursor-pointer">
      <td className="table-cell">
        <p className="font-medium text-gray-900">{payment.description}</p>
        <p className="text-xs text-surface-400">ID: {payment.id}</p>
      </td>
      <td className="table-cell font-semibold text-gray-900">
        {formatCurrency(payment.amount)}
      </td>
      <td className="table-cell">
        <StatusBadge status={payment.status} />
      </td>
      <td className="table-cell">
        <span className="badge bg-surface-100 text-surface-500">{payment.method.replace("_", " ")}</span>
      </td>
      <td className="table-cell text-surface-400">{formatDate(payment.dueDate)}</td>
      <td className="table-cell text-surface-400">
        {payment.paidDate ? formatDate(payment.paidDate) : "—"}
      </td>
      <td className="table-cell">
        <button className="btn-ghost p-1.5">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

// ---- Record Payment Modal ----
function RecordPaymentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Payment" size="md">
      <form className="space-y-4">
        <Select
          label="Tenant"
          options={[
            { value: "", label: "Select tenant" },
            { value: "ten_001", label: "Sarah Johnson - Unit 101" },
            { value: "ten_002", label: "Mike Chen - Unit 102" },
            { value: "ten_003", label: "Lisa Wang - Unit 201" },
            { value: "ten_004", label: "Raj Patel - Oakwood #5" },
          ]}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Amount" type="number" placeholder="0.00" />
          <Select
            label="Payment Method"
            options={[
              { value: "CARD", label: "Credit/Debit Card" },
              { value: "BANK_TRANSFER", label: "Bank Transfer" },
              { value: "CHECK", label: "Check" },
              { value: "CASH", label: "Cash" },
            ]}
          />
        </div>
        <Input label="Description" placeholder="Rent - Month Year" />
        <Input label="Payment Date" type="date" />
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Record Payment</Button>
        </div>
      </form>
    </Modal>
  );
}

// ---- Main Payments Page ----
export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showRecordModal, setShowRecordModal] = useState(false);

  const totalCollected = mockPayments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = mockPayments
    .filter((p) => p.status === "PENDING")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = mockPayments
    .filter((p) => p.status === "FAILED")
    .reduce((sum, p) => sum + p.amount, 0);

  const filtered = mockPayments.filter((p) => {
    const matchSearch = p.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <Header
        title="Payments"
        subtitle="Track and manage rent collection"
        actions={
          <Button variant="primary" onClick={() => setShowRecordModal(true)}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Record Payment
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Collected This Month"
            value={formatCurrency(totalCollected)}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Pending"
            value={formatCurrency(totalPending)}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Overdue"
            value={formatCurrency(totalOverdue)}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
        </div>

        {/* Filters & Table */}
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-surface-100">
            <SearchBar value={search} onChange={setSearch} placeholder="Search payments..." className="w-64" />
            <Select
              options={[
                { value: "ALL", label: "All Status" },
                { value: "COMPLETED", label: "Completed" },
                { value: "PENDING", label: "Pending" },
                { value: "FAILED", label: "Failed" },
                { value: "REFUNDED", label: "Refunded" },
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">Description</th>
                  <th className="table-header">Amount</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Method</th>
                  <th className="table-header">Due Date</th>
                  <th className="table-header">Paid Date</th>
                  <th className="table-header w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((payment) => (
                  <PaymentRow key={payment.id} payment={payment} />
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-surface-400">
              No payments match your filters.
            </div>
          )}
        </Card>
      </div>

      <RecordPaymentModal isOpen={showRecordModal} onClose={() => setShowRecordModal(false)} />
    </div>
  );
}
