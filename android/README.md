# Android App - Property Management Platform

Native Android application built with **Kotlin** and **Jetpack Compose**, connecting to the shared REST API.

## Setup

### Prerequisites
- Android Studio Hedgehog (2023.1.1) or later
- JDK 17
- Android SDK 34

### Getting Started
1. Open the `android/` directory in Android Studio
2. Sync Gradle files
3. Update `BASE_URL` in `ApiConfig.kt` to point to your API server
4. Run on emulator or device (API 26+)

## Architecture

```
android/
├── app/
│   ├── src/main/
│   │   ├── java/com/propmanage/
│   │   │   ├── data/
│   │   │   │   ├── api/          # Retrofit API service
│   │   │   │   ├── model/        # Data models
│   │   │   │   ├── repository/   # Repository pattern
│   │   │   │   └── local/        # Room database
│   │   │   ├── di/               # Hilt dependency injection
│   │   │   ├── ui/
│   │   │   │   ├── auth/         # Login/Register screens
│   │   │   │   ├── dashboard/    # Dashboard screen
│   │   │   │   ├── properties/   # Properties list/detail
│   │   │   │   ├── tenants/      # Tenant management
│   │   │   │   ├── payments/     # Payment screens
│   │   │   │   ├── maintenance/  # Maintenance tickets
│   │   │   │   ├── components/   # Shared UI components
│   │   │   │   └── theme/        # Material 3 theme
│   │   │   ├── navigation/       # Navigation graph
│   │   │   ├── util/             # Extensions & utilities
│   │   │   └── PropManageApp.kt  # Application class
│   │   ├── res/                  # Resources
│   │   └── AndroidManifest.xml
│   └── build.gradle.kts
├── build.gradle.kts
├── settings.gradle.kts
└── gradle.properties
```

## Key Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| Jetpack Compose | 2024.02.00 | Declarative UI |
| Retrofit | 2.9.0 | Network calls |
| Hilt | 2.51 | Dependency injection |
| Room | 2.6.1 | Local database |
| Coroutines | 1.8.0 | Async operations |
| Coil | 2.6.0 | Image loading |
| Navigation Compose | 2.7.7 | Navigation |
