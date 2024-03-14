"use client";

import { useEffect } from "react";
import { timeConfig } from "@/utils/time-config";

export const ConfigLoader = () => {
  // todo: find a better way to load config
  useEffect(() => {
    timeConfig();
  }, []);
  return null;
};
