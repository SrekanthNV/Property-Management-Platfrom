// ============================================================
// Data Models - Property Management Platform (Android)
// ============================================================

package com.propmanage.data.model

import com.google.gson.annotations.SerializedName
import java.util.Date

// ---- Generic API Response ----

data class ApiResponse<T>(
    val success: Boolean,
    val data: T?,
    val error: String?,
    val message: String?
)

data class PaginatedResponse<T>(
    val success: Boolean,
    val data: List<T>,
    val total: Int,
    val page: Int,
    val limit: Int,
    val totalPages: Int
)

// ---- Auth ----

data class LoginRequest(
    val email: String,
    val password: String
)

data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String,
    val role: String = "TENANT"
)

data class RefreshTokenRequest(
    val refreshToken: String
)

data class AuthResponse(
    val user: User,
    val tokens: AuthTokens
)

data class AuthTokens(
    val accessToken: String,
    val refreshToken: String,
    val expiresIn: Int
)

data class User(
    val id: String,
    val email: String,
    val name: String,
    val role: String,
    val phone: String? = null,
    val avatarUrl: String? = null
)

// ---- Property ----

data class Property(
    val id: String,
    val name: String,
    val address: String,
    val city: String,
    val state: String,
    val zipCode: String,
    val type: String,
    val status: String,
    val units: Int,
    val occupiedUnits: Int,
    val monthlyRevenue: Double,
    val imageUrl: String? = null,
    val description: String? = null,
    val amenities: List<String>,
    val managerId: String,
    val createdAt: Date,
    val updatedAt: Date
)

data class CreatePropertyRequest(
    val name: String,
    val address: String,
    val city: String,
    val state: String,
    val zipCode: String,
    val type: String,
    val description: String? = null,
    val amenities: List<String> = emptyList()
)

data class UpdatePropertyRequest(
    val name: String? = null,
    val address: String? = null,
    val status: String? = null,
    val description: String? = null,
    val amenities: List<String>? = null
)

data class PropertyUnit(
    val id: String,
    val propertyId: String,
    val unitNumber: String,
    val floor: Int,
    val bedrooms: Int,
    val bathrooms: Double,
    val sqft: Int,
    val rent: Double,
    val status: String,
    val tenantId: String? = null
)

// ---- Tenant ----

data class Tenant(
    val id: String,
    val userId: String,
    val user: User,
    val unitId: String,
    val propertyId: String,
    val leaseStart: Date,
    val leaseEnd: Date,
    val leaseStatus: String,
    val monthlyRent: Double,
    val securityDeposit: Double,
    val moveInDate: Date,
    val emergencyContact: String? = null
)

data class CreateTenantRequest(
    val name: String,
    val email: String,
    val phone: String? = null,
    val unitId: String,
    val monthlyRent: Double,
    val securityDeposit: Double,
    val leaseStart: String,
    val leaseEnd: String
)

// ---- Payment ----

data class Payment(
    val id: String,
    val tenantId: String,
    val propertyId: String,
    val unitId: String,
    val amount: Double,
    val status: String,
    val method: String,
    val description: String,
    val dueDate: Date,
    val paidDate: Date? = null,
    val stripePaymentId: String? = null,
    val createdAt: Date
)

data class CreatePaymentRequest(
    val tenantId: String,
    val amount: Double,
    val method: String = "CARD",
    val description: String
)

data class PaymentIntentRequest(
    val amount: Double,
    val tenantId: String,
    val description: String
)

data class PaymentIntent(
    val clientSecret: String,
    val amount: Double,
    val currency: String
)

// ---- Maintenance ----

data class MaintenanceTicket(
    val id: String,
    val tenantId: String,
    val propertyId: String,
    val unitId: String,
    val title: String,
    val description: String,
    val category: String,
    val priority: String,
    val status: String,
    val assignedTo: String? = null,
    val images: List<String>,
    val notes: List<TicketNote>,
    val estimatedCost: Double? = null,
    val actualCost: Double? = null,
    val scheduledDate: Date? = null,
    val resolvedDate: Date? = null,
    val createdAt: Date,
    val updatedAt: Date
)

data class TicketNote(
    val id: String,
    val ticketId: String,
    val authorId: String,
    val authorName: String,
    val content: String,
    val createdAt: Date
)

data class CreateTicketRequest(
    val title: String,
    val description: String,
    val category: String,
    val priority: String = "MEDIUM",
    val propertyId: String,
    val unitId: String
)

data class UpdateTicketRequest(
    val status: String? = null,
    val priority: String? = null,
    val estimatedCost: Double? = null,
    val scheduledDate: String? = null
)

data class AssignTicketRequest(
    val assignedTo: String
)

// ---- Notification ----

data class Notification(
    val id: String,
    val userId: String,
    val type: String,
    val title: String,
    val message: String,
    val read: Boolean,
    val actionUrl: String? = null,
    val createdAt: Date
)

// ---- Dashboard ----

data class DashboardStats(
    val totalProperties: Int,
    val totalUnits: Int,
    val occupancyRate: Double,
    val totalRevenue: Double,
    val pendingPayments: Int,
    val openTickets: Int,
    val expiringLeases: Int,
    val revenueByMonth: List<RevenueMonth>,
    val occupancyByProperty: List<OccupancyData>
)

data class RevenueMonth(
    val month: String,
    val revenue: Double,
    val expenses: Double
)

data class OccupancyData(
    val property: String,
    val rate: Double
)
