"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout";
import { Card, Button, StatusBadge, SearchBar, Avatar, Modal, Input, Select } from "@/components/ui";
import { mockTenants } from "@/lib/mock-data";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { Tenant } from "@/types";

function TenantCard({ tenant, onClick }: { tenant: Tenant; onClick: () => void }) {
  return (
    <Card hoverable className="p-5 cursor-pointer" onClick={onClick}>
      <div className="flex items-start gap-4">
        <Avatar name={tenant.user.name} size="lg" />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-gray-900">{tenant.user.name}</h3>
          <p className="text-sm text-surface-400">{tenant.user.email}</p>
          <div className="mt-3 flex items-center gap-2">
            <StatusBadge status={tenant.leaseStatus} />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-surface-100 grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-surface-400">Monthly Rent</p>
          <p className="text-sm font-semibold text-gray-900">{formatCurrency(tenant.monthlyRent)}</p>
        </div>
        <div>
          <p className="text-xs text-surface-400">Lease Ends</p>
          <p className="text-sm font-semibold text-gray-900">{formatDate(tenant.leaseEnd)}</p>
        </div>
        <div>
          <p className="text-xs text-surface-400">Move-in Date</p>
          <p className="text-sm text-surface-500">{formatDate(tenant.moveInDate)}</p>
        </div>
        <div>
          <p className="text-xs text-surface-400">Security Deposit</p>
          <p className="text-sm text-surface-500">{formatCurrency(tenant.securityDeposit)}</p>
        </div>
      </div>
    </Card>
  );
}

function TenantDetailPanel({ tenant, onClose }: { tenant: Tenant; onClose: () => void }) {
  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-modal border-l border-surface-200 animate-slide-up overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-surface-100">
        <h2 className="text-lg font-semibold text-gray-900">Tenant Details</h2>
        <button onClick={onClose} className="text-surface-400 hover:text-surface-500">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Avatar name={tenant.user.name} size="lg" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{tenant.user.name}</h3>
            <p className="text-sm text-surface-400">{tenant.user.email}</p>
            <StatusBadge status={tenant.leaseStatus} className="mt-1" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-50 rounded-lg p-3">
            <p className="text-xs text-surface-400">Monthly Rent</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(tenant.monthlyRent)}</p>
          </div>
          <div className="bg-surface-50 rounded-lg p-3">
            <p className="text-xs text-surface-400">Security Deposit</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(tenant.securityDeposit)}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Lease Information</h4>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-surface-50">
              <span className="text-sm text-surface-400">Lease Start</span>
              <span className="text-sm font-medium text-gray-900">{formatDate(tenant.leaseStart, "long")}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-surface-50">
              <span className="text-sm text-surface-400">Lease End</span>
              <span className="text-sm font-medium text-gray-900">{formatDate(tenant.leaseEnd, "long")}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-surface-50">
              <span className="text-sm text-surface-400">Move-in Date</span>
              <span className="text-sm font-medium text-gray-900">{formatDate(tenant.moveInDate, "long")}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="primary" className="flex-1">Send Message</Button>
          <Button variant="secondary" className="flex-1">View Lease</Button>
        </div>
      </div>
    </div>
  );
}

function AddTenantModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Tenant" size="lg">
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" type="email" placeholder="john@email.com" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Phone" placeholder="(555) 123-4567" />
          <Input label="Emergency Contact" placeholder="(555) 987-6543" />
        </div>
        <Select
          label="Property / Unit"
          options={[
            { value: "", label: "Select unit" },
            { value: "prop_001-unit_003", label: "Riverside Apartments - Unit 103 (Vacant)" },
          ]}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Monthly Rent" type="number" placeholder="0.00" />
          <Input label="Security Deposit" type="number" placeholder="0.00" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Lease Start" type="date" />
          <Input label="Lease End" type="date" />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Add Tenant</Button>
        </div>
      </form>
    </Modal>
  );
}

export default function TenantsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const filtered = mockTenants.filter((t) => {
    const matchSearch = t.user.name.toLowerCase().includes(search.toLowerCase()) ||
      t.user.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || t.leaseStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <Header
        title="Tenants"
        subtitle={`${mockTenants.length} active tenants`}
        actions={
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Tenant
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Search tenants..." className="w-72" />
          <Select
            options={[
              { value: "ALL", label: "All Status" },
              { value: "ACTIVE", label: "Active" },
              { value: "PENDING", label: "Pending" },
              { value: "EXPIRED", label: "Expired" },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((tenant, i) => (
            <div key={tenant.id} className={`animate-in stagger-${Math.min(i + 1, 4)}`}>
              <TenantCard tenant={tenant} onClick={() => setSelectedTenant(tenant)} />
            </div>
          ))}
        </div>
      </div>

      <AddTenantModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
      {selectedTenant && (
        <TenantDetailPanel tenant={selectedTenant} onClose={() => setSelectedTenant(null)} />
      )}
    </div>
  );
}
