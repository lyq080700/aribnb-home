"use client";
import { useEffect } from "react";

export default function MockComponent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("@/api/mock");
    }
  }, []);

  return null;
}
