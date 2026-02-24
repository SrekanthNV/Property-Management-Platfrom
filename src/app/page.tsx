"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout";
import DashboardPage from "@/app/dashboard/page";
import PropertiesPage from "@/app/properties/page";
import TenantsPage from "@/app/tenants/page";
import PaymentsPage from "@/app/payments/page";
import MaintenancePage from "@/app/maintenance/page";

export default function Home() {
  return (
    <AppShell>
      <DashboardPage />
    </AppShell>
  );
}
