"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout";
import {
  Card, Button, StatusBadge, SearchBar, Modal, Input, Select,
  Textarea, EmptyState
} from "@/components/ui";
import { mockTickets } from "@/lib/mock-data";
import { formatCurrency, formatDate, getPriorityIcon, cn } from "@/lib/utils";
import type { MaintenanceTicket } from "@/types";

function TicketCard({ ticket, onClick }: { ticket: MaintenanceTicket; onClick: () => void }) {
  return (
    <Card hoverable className="p-5 cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">{getPriorityIcon(ticket.priority)}</span>
            <h3 className="text-sm font-semibold text-gray-900 truncate">{ticket.title}</h3>
          </div>
          <p className="text-xs text-surface-400 line-clamp-2 mb-3">{ticket.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={ticket.status} />
            <StatusBadge status={ticket.priority} />
            <span className="badge bg-surface-100 text-surface-500">{ticket.category}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-surface-100 flex items-center justify-between text-xs text-surface-400">
        <span>Created {formatDate(ticket.createdAt, "relative")}</span>
        {ticket.assignedTo && (
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {ticket.assignedTo}
          </span>
        )}
      </div>

      {ticket.scheduledDate && (
        <div className="mt-2 flex items-center gap-1 text-xs text-brand-600">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Scheduled: {formatDate(ticket.scheduledDate)}
        </div>
      )}
    </Card>
  );
}

function CreateTicketModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Maintenance Ticket" size="lg">
      <form className="space-y-4">
        <Input label="Title" placeholder="Brief description of the issue" />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Category"
            options={[
              { value: "PLUMBING", label: "Plumbing" },
              { value: "ELECTRICAL", label: "Electrical" },
              { value: "HVAC", label: "HVAC" },
              { value: "APPLIANCE", label: "Appliance" },
              { value: "STRUCTURAL", label: "Structural" },
              { value: "PEST", label: "Pest Control" },
              { value: "GENERAL", label: "General" },
              { value: "OTHER", label: "Other" },
            ]}
          />
          <Select
            label="Priority"
            options={[
              { value: "LOW", label: "Low" },
              { value: "MEDIUM", label: "Medium" },
              { value: "HIGH", label: "High" },
              { value: "URGENT", label: "Urgent" },
            ]}
          />
        </div>
        <Select
          label="Property / Unit"
          options={[
            { value: "", label: "Select unit" },
            { value: "prop_001-unit_001", label: "Riverside Apartments - Unit 101" },
            { value: "prop_001-unit_002", label: "Riverside Apartments - Unit 102" },
            { value: "prop_001-unit_004", label: "Riverside Apartments - Unit 201" },
            { value: "prop_002-unit_010", label: "Oakwood Townhomes - Unit 5" },
          ]}
        />
        <Textarea label="Description" placeholder="Provide detailed description of the issue..." rows={4} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Attach Photos</label>
          <div className="border-2 border-dashed border-surface-200 rounded-lg p-6 text-center hover:border-brand-300 transition-colors cursor-pointer">
            <svg className="h-8 w-8 text-surface-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-surface-400">Drop photos here or click to upload</p>
            <p className="text-xs text-surface-300 mt-1">PNG, JPG up to 10MB</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Create Ticket</Button>
        </div>
      </form>
    </Modal>
  );
}

function TicketDetailPanel({ ticket, onClose }: { ticket: MaintenanceTicket; onClose: () => void }) {
  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-modal border-l border-surface-200 animate-slide-up overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-surface-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{ticket.title}</h2>
          <p className="text-xs text-surface-400">Ticket #{ticket.id}</p>
        </div>
        <button onClick={onClose} className="text-surface-400 hover:text-surface-500">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={ticket.status} />
          <StatusBadge status={ticket.priority} />
          <span className="badge bg-surface-100 text-surface-500">{ticket.category}</span>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Description</h3>
          <p className="text-sm text-surface-500">{ticket.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-surface-400 mb-0.5">Assigned To</p>
            <p className="text-sm font-medium text-gray-900">{ticket.assignedTo || "Unassigned"}</p>
          </div>
          <div>
            <p className="text-xs text-surface-400 mb-0.5">Created</p>
            <p className="text-sm font-medium text-gray-900">{formatDate(ticket.createdAt, "long")}</p>
          </div>
          {ticket.estimatedCost && (
            <div>
              <p className="text-xs text-surface-400 mb-0.5">Estimated Cost</p>
              <p className="text-sm font-medium text-gray-900">{formatCurrency(ticket.estimatedCost)}</p>
            </div>
          )}
          {ticket.scheduledDate && (
            <div>
              <p className="text-xs text-surface-400 mb-0.5">Scheduled</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(ticket.scheduledDate)}</p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Activity</h3>
          {ticket.notes.length > 0 ? (
            <div className="space-y-3">
              {ticket.notes.map((note) => (
                <div key={note.id} className="bg-surface-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-gray-900">{note.authorName}</p>
                    <p className="text-xs text-surface-400">{formatDate(note.createdAt, "relative")}</p>
                  </div>
                  <p className="text-sm text-surface-500">{note.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-surface-400">No activity yet.</p>
          )}

          <div className="mt-4">
            <Textarea placeholder="Add a note..." rows={2} />
            <div className="flex justify-end mt-2">
              <Button variant="secondary" size="sm">Add Note</Button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2 border-t border-surface-100">
          <Button variant="primary" className="flex-1">Update Status</Button>
          <Button variant="secondary" className="flex-1">Assign</Button>
        </div>
      </div>
    </div>
  );
}

export default function MaintenancePage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceTicket | null>(null);

  const filtered = mockTickets.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || t.status === statusFilter;
    const matchPriority = priorityFilter === "ALL" || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const statusCounts = {
    OPEN: mockTickets.filter((t) => t.status === "OPEN").length,
    IN_PROGRESS: mockTickets.filter((t) => t.status === "IN_PROGRESS").length,
    WAITING: mockTickets.filter((t) => t.status === "WAITING").length,
    RESOLVED: mockTickets.filter((t) => t.status === "RESOLVED").length,
  };

  return (
    <div>
      <Header
        title="Maintenance"
        subtitle="Manage service requests and tickets"
        actions={
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Ticket
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? "ALL" : status)}
              className={cn(
                "card p-4 text-center transition-all",
                statusFilter === status && "ring-2 ring-brand-500 border-brand-200"
              )}
            >
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-xs text-surface-400 mt-0.5">{status.replace("_", " ")}</p>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Search tickets..." className="w-64" />
          <Select
            options={[
              { value: "ALL", label: "All Priorities" },
              { value: "URGENT", label: "Urgent" },
              { value: "HIGH", label: "High" },
              { value: "MEDIUM", label: "Medium" },
              { value: "LOW", label: "Low" },
            ]}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          />
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((ticket, i) => (
              <div key={ticket.id} className={`animate-in stagger-${Math.min(i + 1, 4)}`}>
                <TicketCard ticket={ticket} onClick={() => setSelectedTicket(ticket)} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="No tickets found"
            description="No maintenance tickets match your current filters."
          />
        )}
      </div>

      <CreateTicketModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
      {selectedTicket && (
        <TicketDetailPanel ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}
    </div>
  );
}
