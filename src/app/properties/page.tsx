"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout";
import {
  Card, Button, StatusBadge, SearchBar, Modal, Input, Select,
  Textarea, ProgressBar, EmptyState
} from "@/components/ui";
import { mockProperties, mockUnits } from "@/lib/mock-data";
import { formatCurrency, calculateOccupancyRate, cn } from "@/lib/utils";
import type { Property } from "@/types";

function PropertyCard({ property, onClick }: { property: Property; onClick: () => void }) {
  const occupancy = calculateOccupancyRate(property.occupiedUnits, property.units);

  return (
    <Card hoverable className="overflow-hidden cursor-pointer" onClick={onClick}>
      <div className="h-44 bg-gradient-to-br from-brand-100 to-brand-200 relative flex items-center justify-center">
        <svg className="h-12 w-12 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <div className="absolute top-3 right-3">
          <StatusBadge status={property.status} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="badge bg-white/90 text-gray-700 backdrop-blur-sm text-xs">
            {property.type}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-900">{property.name}</h3>
        <p className="text-sm text-surface-400 mt-0.5">
          {property.address}, {property.city}, {property.state}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div>
            <p className="text-xs text-surface-400">Units</p>
            <p className="text-sm font-semibold text-gray-900">{property.units}</p>
          </div>
          <div>
            <p className="text-xs text-surface-400">Occupied</p>
            <p className="text-sm font-semibold text-gray-900">{property.occupiedUnits}</p>
          </div>
          <div>
            <p className="text-xs text-surface-400">Revenue</p>
            <p className="text-sm font-semibold text-gray-900">{formatCurrency(property.monthlyRevenue)}</p>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar
            value={occupancy}
            label="Occupancy"
            color={occupancy >= 90 ? "success" : occupancy >= 70 ? "brand" : "warning"}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {property.amenities.slice(0, 3).map((a) => (
            <span key={a} className="text-xs text-surface-400 bg-surface-50 px-2 py-0.5 rounded-md">
              {a}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-xs text-surface-400 bg-surface-50 px-2 py-0.5 rounded-md">
              +{property.amenities.length - 3}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

function AddPropertyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Property" size="lg">
      <form className="space-y-4">
        <Input label="Property Name" placeholder="e.g., Riverside Apartments" />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Property Type"
            options={[
              { value: "APARTMENT", label: "Apartment" },
              { value: "HOUSE", label: "House" },
              { value: "CONDO", label: "Condo" },
              { value: "TOWNHOUSE", label: "Townhouse" },
              { value: "COMMERCIAL", label: "Commercial" },
            ]}
          />
          <Input label="Total Units" type="number" placeholder="0" />
        </div>
        <Input label="Address" placeholder="Street address" />
        <div className="grid grid-cols-3 gap-4">
          <Input label="City" placeholder="City" />
          <Input label="State" placeholder="OH" />
          <Input label="Zip Code" placeholder="44503" />
        </div>
        <Textarea label="Description" placeholder="Brief description of the property..." />
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Add Property</Button>
        </div>
      </form>
    </Modal>
  );
}

function PropertyDetailPanel({ property, onClose }: { property: Property; onClose: () => void }) {
  const propertyUnits = mockUnits.filter((u) => u.propertyId === property.id);

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-modal border-l border-surface-200 animate-slide-up overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-surface-100">
        <h2 className="text-lg font-semibold text-gray-900">{property.name}</h2>
        <button onClick={onClose} className="text-surface-400 hover:text-surface-500">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <StatusBadge status={property.status} />
            <span className="badge bg-surface-100 text-surface-500">{property.type}</span>
          </div>
          <p className="text-sm text-surface-400">
            {property.address}, {property.city}, {property.state} {property.zipCode}
          </p>
          {property.description && (
            <p className="text-sm text-surface-500 mt-2">{property.description}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-surface-50 rounded-lg">
            <p className="text-xl font-bold text-gray-900">{property.units}</p>
            <p className="text-xs text-surface-400">Total Units</p>
          </div>
          <div className="text-center p-3 bg-surface-50 rounded-lg">
            <p className="text-xl font-bold text-success-700">{property.occupiedUnits}</p>
            <p className="text-xs text-surface-400">Occupied</p>
          </div>
          <div className="text-center p-3 bg-surface-50 rounded-lg">
            <p className="text-xl font-bold text-brand-700">{formatCurrency(property.monthlyRevenue)}</p>
            <p className="text-xs text-surface-400">Monthly Rev</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((a) => (
              <span key={a} className="badge bg-brand-50 text-brand-700">{a}</span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Units</h3>
          <div className="space-y-2">
            {propertyUnits.map((unit) => (
              <div
                key={unit.id}
                className="flex items-center justify-between p-3 bg-surface-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">Unit {unit.unitNumber}</p>
                  <p className="text-xs text-surface-400">
                    {unit.bedrooms}bd / {unit.bathrooms}ba · {unit.sqft} sqft
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(unit.rent)}/mo</p>
                  <StatusBadge status={unit.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterType, setFilterType] = useState<string>("ALL");

  const filtered = mockProperties.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "ALL" || p.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div>
      <Header
        title="Properties"
        subtitle={`${mockProperties.length} properties managed`}
        actions={
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Property
          </Button>
        }
      />

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search properties..."
            className="w-72"
          />
          <Select
            options={[
              { value: "ALL", label: "All Types" },
              { value: "APARTMENT", label: "Apartment" },
              { value: "HOUSE", label: "House" },
              { value: "CONDO", label: "Condo" },
              { value: "TOWNHOUSE", label: "Townhouse" },
            ]}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          />
          <div className="ml-auto flex border border-surface-200 rounded-lg overflow-hidden">
            <button
              className={cn("px-3 py-2 text-sm", viewMode === "grid" ? "bg-brand-50 text-brand-700" : "text-surface-400 hover:bg-surface-50")}
              onClick={() => setViewMode("grid")}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              className={cn("px-3 py-2 text-sm", viewMode === "list" ? "bg-brand-50 text-brand-700" : "text-surface-400 hover:bg-surface-50")}
              onClick={() => setViewMode("list")}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
              : "space-y-3"
          )}>
            {filtered.map((property, i) => (
              <div key={property.id} className={`animate-in stagger-${Math.min(i + 1, 4)}`}>
                <PropertyCard
                  property={property}
                  onClick={() => setSelectedProperty(property)}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            title="No properties found"
            description="Try adjusting your search or filters to find what you're looking for."
          />
        )}
      </div>

      <AddPropertyModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
      {selectedProperty && (
        <PropertyDetailPanel
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
