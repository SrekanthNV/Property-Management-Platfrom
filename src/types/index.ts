export type UserRole = "ADMIN" | "MANAGER" | "TENANT";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: UserRole;
  phone?: string;
}

export type PropertyType = "APARTMENT" | "HOUSE" | "CONDO" | "TOWNHOUSE" | "COMMERCIAL";
export type PropertyStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE";

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: PropertyType;
  status: PropertyStatus;
  units: number;
  occupiedUnits: number;
  monthlyRevenue: number;
  imageUrl?: string;
  description?: string;
  amenities: string[];
  managerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  rent: number;
  status: "VACANT" | "OCCUPIED" | "MAINTENANCE";
  tenantId?: string;
  leaseId?: string;
}

export type LeaseStatus = "ACTIVE" | "PENDING" | "EXPIRED" | "TERMINATED";

export interface Tenant {
  id: string;
  userId: string;
  user: User;
  unitId: string;
  propertyId: string;
  leaseStart: Date;
  leaseEnd: Date;
  leaseStatus: LeaseStatus;
  monthlyRent: number;
  securityDeposit: number;
  emergencyContact?: string;
  moveInDate: Date;
}

export interface Lease {
  id: string;
  tenantId: string;
  unitId: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  securityDeposit: number;
  status: LeaseStatus;
  terms: string;
  documentUrl?: string;
  createdAt: Date;
}

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type PaymentMethod = "CARD" | "BANK_TRANSFER" | "CHECK" | "CASH";

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  unitId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  description: string;
  dueDate: Date;
  paidDate?: Date;
  stripePaymentId?: string;
  receiptUrl?: string;
  createdAt: Date;
}

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TicketStatus = "OPEN" | "IN_PROGRESS" | "WAITING" | "RESOLVED" | "CLOSED";
export type TicketCategory =
  | "PLUMBING"
  | "ELECTRICAL"
  | "HVAC"
  | "APPLIANCE"
  | "STRUCTURAL"
  | "PEST"
  | "GENERAL"
  | "OTHER";

export interface MaintenanceTicket {
  id: string;
  tenantId: string;
  propertyId: string;
  unitId: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo?: string;
  images: string[];
  notes: TicketNote[];
  estimatedCost?: number;
  actualCost?: number;
  scheduledDate?: Date;
  resolvedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketNote {
  id: string;
  ticketId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
}

export type NotificationType =
  | "PAYMENT_DUE"
  | "PAYMENT_RECEIVED"
  | "PAYMENT_LATE"
  | "MAINTENANCE_UPDATE"
  | "LEASE_EXPIRING"
  | "ANNOUNCEMENT"
  | "SYSTEM";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalProperties: number;
  totalUnits: number;
  occupancyRate: number;
  totalRevenue: number;
  pendingPayments: number;
  openTickets: number;
  expiringLeases: number;
  recentPayments: Payment[];
  recentTickets: MaintenanceTicket[];
  revenueByMonth: { month: string; revenue: number; expenses: number }[];
  occupancyByProperty: { property: string; rate: number }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
