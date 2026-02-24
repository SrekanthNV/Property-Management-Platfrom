// ============================================================
// Dashboard ViewModel - Property Management Platform (Android)
// ============================================================

package com.propmanage.ui.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.propmanage.data.model.DashboardStats
import com.propmanage.data.model.MaintenanceTicket
import com.propmanage.data.model.Payment
import com.propmanage.data.repository.PropertyRepository
import com.propmanage.data.repository.Result
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

data class DashboardUiState(
    val isLoading: Boolean = true,
    val stats: DashboardStats? = null,
    val recentPayments: List<Payment> = emptyList(),
    val activeTickets: List<MaintenanceTicket> = emptyList(),
    val error: String? = null
)

@HiltViewModel
class DashboardViewModel @Inject constructor(
    private val repository: PropertyRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(DashboardUiState())
    val uiState: StateFlow<DashboardUiState> = _uiState.asStateFlow()

    init {
        loadDashboard()
    }

    fun loadDashboard() {
        viewModelScope.launch {
            repository.getDashboardStats().collect { result ->
                _uiState.value = when (result) {
                    is Result.Loading -> _uiState.value.copy(isLoading = true, error = null)
                    is Result.Success -> _uiState.value.copy(
                        isLoading = false,
                        stats = result.data,
                        error = null
                    )
                    is Result.Error -> _uiState.value.copy(
                        isLoading = false,
                        error = result.message
                    )
                }
            }
        }
    }

    fun refresh() {
        loadDashboard()
    }
}
