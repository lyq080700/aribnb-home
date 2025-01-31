"use client";
import React, { useEffect } from "react";

export default function MockComponent():React.ReactNode {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("@/api/mock");
    }
  }, []);

  return null;
}
