// ============================================================
// Repository - Property Management Platform (Android)
// ============================================================

package com.propmanage.data.repository

import com.propmanage.data.api.PropertyApi
import com.propmanage.data.model.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Sealed class representing the state of a network operation.
 * Used to communicate loading, success, and error states to the UI layer.
 */
sealed class Result<out T> {
    data object Loading : Result<Nothing>()
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String, val code: Int? = null) : Result<Nothing>()
}

/**
 * Main repository for all platform data operations.
 * Implements the Repository pattern, abstracting data sources
 * from the ViewModel/UI layer. In production, this would also
 * integrate Room for offline caching.
 */
@Singleton
class PropertyRepository @Inject constructor(
    private val api: PropertyApi
) {
    // ---- Properties ----

    fun getProperties(
        page: Int = 1,
        search: String? = null
    ): Flow<Result<List<Property>>> = flow {
        emit(Result.Loading)
        try {
            val response = api.getProperties(page = page, search = search)
            if (response.isSuccessful && response.body()?.success == true) {
                emit(Result.Success(response.body()!!.data))
            } else {
                emit(Result.Error(response.body()?.error ?: "Failed to load properties"))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message ?: "Network error"))
        }
    }

    fun getProperty(id: String): Flow<Result<Property>> = flow {
        emit(Result.Loading)
        try {
            val response = api.getProperty(id)
            if (response.isSuccessful && response.body()?.data != null) {
                emit(Result.Success(response.body()!!.data!!))
            } else {
                emit(Result.Error("Property not found"))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message ?: "Network error"))
        }
    }

    suspend fun createProperty(request: CreatePropertyRequest): Result<Property> {
        return try {
            val response = api.createProperty(request)
            if (response.isSuccessful && response.body()?.data != null) {
                Result.Success(response.body()!!.data!!)
            } else {
                Result.Error(response.body()?.error ?: "Failed to create property")
            }
        } catch (e: Exception) {
            Result.Error(e.message ?: "Network error")
        }
    }

    // ---- Tenants ----

    fun getTenants(
        page: Int = 1,
        propertyId: String? = null
    ): Flow<Result<List<Tenant>>> = flow {
        emit(Result.Loading)
        try {
            val response = api.getTenants(page = page, propertyId = propertyId)
            if (response.isSuccessful && response.body()?.success == true) {
                emit(Result.Success(response.body()!!.data))
            } else {
                emit(Result.Error("Failed to load tenants"))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message ?: "Network error"))
        }
    }

    // ---- Payments ----

    fun getPayments(
        page: Int = 1,
        status: String? = null
    ): Flow<Result<List<Payment>>> = flow {
        emit(Result.Loading)
        try {
            val response = api.getPayments(page = page, status = status)
            if (response.isSuccessful && response.body()?.success == true) {
                emit(Result.Success(response.body()!!.data))
            } else {
                emit(Result.Error("Failed to load payments"))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message ?: "Network error"))
        }
    }

    suspend fun createPayment(request: CreatePaymentRequest): Result<Payment> {
        return try {
            val response = api.createPayment(request)
            if (response.isSuccessful && response.body()?.data != null) {
                Result.Success(response.body()!!.data!!)
            } else {
                Result.Error(response.body()?.error ?: "Payment failed")
            }
        } catch (e: Exception) {
            Result.Error(e.message ?: "Network error")
        }
    }

    // ---- Maintenance ----

    fun getTickets(
        page: Int = 1,
        status: String? = null,
        priority: String? = null
    ): Flow<Result<List<MaintenanceTicket>>> = flow {
        emit(Result.Loading)
        try {
            val response = api.getTickets(page = page, status = status, priority = priority)
            if (response.isSuccessful && response.body()?.success == true) {
                emit(Result.Success(response.body()!!.data))
            } else {
                emit(Result.Error("Failed to load tickets"))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message ?: "Network error"))
        }
    }

    suspend fun createTicket(request: CreateTicketRequest): Result<MaintenanceTicket> {
        return try {
            val response = api.createTicket(request)
            if (response.isSuccessful && response.body()?.data != null) {
                Result.Success(response.body()!!.data!!)
            } else {
                Result.Error(response.body()?.error ?: "Failed to create ticket")
            }
        } catch (e: Exception) {
            Result.Error(e.message ?: "Network error")
        }
    }

    suspend fun updateTicket(id: String, request: UpdateTicketRequest): Result<MaintenanceTicket> {
        return try {
            val response = api.updateTicket(id, request)
            if (response.isSuccessful && response.body()?.data != null) {
                Result.Success(response.body()!!.data!!)
            } else {
                Result.Error(response.body()?.error ?: "Failed to update ticket")
            }
        } catch (e: Exception) {
            Result.Error(e.message ?: "Network error")
        }
    }

    // ---- Dashboard ----

    fun getDashboardStats(): Flow<Result<DashboardStats>> = flow {
        emit(Result.Loading)
        try {
            val response = api.getDashboardStats()
            if (response.isSuccessful && response.body()?.data != null) {
                emit(Result.Success(response.body()!!.data!!))
            } else {
                emit(Result.Error("Failed to load dashboard"))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message ?: "Network error"))
        }
    }

    // ---- Notifications ----

    fun getNotifications(unreadOnly: Boolean = false): Flow<Result<List<Notification>>> = flow {
        emit(Result.Loading)
        try {
            val response = api.getNotifications(unreadOnly)
            if (response.isSuccessful && response.body()?.data != null) {
                emit(Result.Success(response.body()!!.data!!))
            } else {
                emit(Result.Error("Failed to load notifications"))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message ?: "Network error"))
        }
    }
}
