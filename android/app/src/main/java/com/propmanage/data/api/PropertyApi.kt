// ============================================================
// Retrofit API Service - Property Management Platform
// ============================================================

package com.propmanage.data.api

import com.propmanage.data.model.*
import retrofit2.Response
import retrofit2.http.*

/**
 * Central API service interface for all platform endpoints.
 * Uses Retrofit with coroutines for async network calls.
 */
interface PropertyApi {

    // ---- Authentication ----

    @POST("api/auth/login")
    suspend fun login(
        @Body credentials: LoginRequest
    ): Response<ApiResponse<AuthResponse>>

    @POST("api/auth/register")
    suspend fun register(
        @Body data: RegisterRequest
    ): Response<ApiResponse<AuthResponse>>

    @POST("api/auth/refresh")
    suspend fun refreshToken(
        @Body request: RefreshTokenRequest
    ): Response<ApiResponse<AuthResponse>>

    // ---- Properties ----

    @GET("api/properties")
    suspend fun getProperties(
        @Query("page") page: Int = 1,
        @Query("limit") limit: Int = 20,
        @Query("search") search: String? = null
    ): Response<PaginatedResponse<Property>>

    @GET("api/properties/{id}")
    suspend fun getProperty(
        @Path("id") id: String
    ): Response<ApiResponse<Property>>

    @POST("api/properties")
    suspend fun createProperty(
        @Body property: CreatePropertyRequest
    ): Response<ApiResponse<Property>>

    @PUT("api/properties/{id}")
    suspend fun updateProperty(
        @Path("id") id: String,
        @Body property: UpdatePropertyRequest
    ): Response<ApiResponse<Property>>

    @DELETE("api/properties/{id}")
    suspend fun deleteProperty(
        @Path("id") id: String
    ): Response<ApiResponse<Unit>>

    @GET("api/properties/{id}/units")
    suspend fun getPropertyUnits(
        @Path("id") propertyId: String
    ): Response<ApiResponse<List<PropertyUnit>>>

    // ---- Tenants ----

    @GET("api/tenants")
    suspend fun getTenants(
        @Query("page") page: Int = 1,
        @Query("limit") limit: Int = 20,
        @Query("propertyId") propertyId: String? = null
    ): Response<PaginatedResponse<Tenant>>

    @GET("api/tenants/{id}")
    suspend fun getTenant(
        @Path("id") id: String
    ): Response<ApiResponse<Tenant>>

    @POST("api/tenants")
    suspend fun createTenant(
        @Body tenant: CreateTenantRequest
    ): Response<ApiResponse<Tenant>>

    // ---- Payments ----

    @GET("api/payments")
    suspend fun getPayments(
        @Query("page") page: Int = 1,
        @Query("limit") limit: Int = 20,
        @Query("status") status: String? = null,
        @Query("tenantId") tenantId: String? = null
    ): Response<PaginatedResponse<Payment>>

    @POST("api/payments")
    suspend fun createPayment(
        @Body payment: CreatePaymentRequest
    ): Response<ApiResponse<Payment>>

    @POST("api/payments/intent")
    suspend fun createPaymentIntent(
        @Body request: PaymentIntentRequest
    ): Response<ApiResponse<PaymentIntent>>

    // ---- Maintenance ----

    @GET("api/maintenance")
    suspend fun getTickets(
        @Query("page") page: Int = 1,
        @Query("limit") limit: Int = 20,
        @Query("status") status: String? = null,
        @Query("priority") priority: String? = null
    ): Response<PaginatedResponse<MaintenanceTicket>>

    @GET("api/maintenance/{id}")
    suspend fun getTicket(
        @Path("id") id: String
    ): Response<ApiResponse<MaintenanceTicket>>

    @POST("api/maintenance")
    suspend fun createTicket(
        @Body ticket: CreateTicketRequest
    ): Response<ApiResponse<MaintenanceTicket>>

    @PUT("api/maintenance/{id}")
    suspend fun updateTicket(
        @Path("id") id: String,
        @Body update: UpdateTicketRequest
    ): Response<ApiResponse<MaintenanceTicket>>

    @PUT("api/maintenance/{id}/assign")
    suspend fun assignTicket(
        @Path("id") id: String,
        @Body assignment: AssignTicketRequest
    ): Response<ApiResponse<MaintenanceTicket>>

    @Multipart
    @POST("api/maintenance/{id}/images")
    suspend fun uploadTicketImage(
        @Path("id") ticketId: String,
        @Part image: okhttp3.MultipartBody.Part
    ): Response<ApiResponse<String>>

    // ---- Notifications ----

    @GET("api/notifications")
    suspend fun getNotifications(
        @Query("unread") unreadOnly: Boolean = false
    ): Response<ApiResponse<List<Notification>>>

    @PUT("api/notifications/{id}/read")
    suspend fun markNotificationRead(
        @Path("id") id: String
    ): Response<ApiResponse<Unit>>

    @PUT("api/notifications/read-all")
    suspend fun markAllNotificationsRead(): Response<ApiResponse<Unit>>

    // ---- Dashboard ----

    @GET("api/dashboard/stats")
    suspend fun getDashboardStats(): Response<ApiResponse<DashboardStats>>
}
