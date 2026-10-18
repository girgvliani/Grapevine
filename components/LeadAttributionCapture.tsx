"use client";

import { useEffect } from "react";
import { captureLeadAttribution } from "@/lib/leadAttribution";

// Notes which ad / campaign link brought the visitor (see lib/leadAttribution).
// Renders nothing.
export default function LeadAttributionCapture() {
  useEffect(() => {
    captureLeadAttribution();
  }, []);
  return null;
}
