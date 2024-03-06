"use client";
import { useEffect } from "react";
import { timeConfig } from "@/lib/time-config";

export const ConfigLoader = () => {
  useEffect(() => {
    timeConfig();
  }, []);
  return null;
};
