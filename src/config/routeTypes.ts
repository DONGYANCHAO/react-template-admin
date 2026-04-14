import type { ReactNode } from "react";
import type { NonIndexRouteObject, IndexRouteObject } from "react-router-dom";

export type AppRouteObject = (NonIndexRouteObject | IndexRouteObject) & {
  title?: string;
  icon?: ReactNode;
};
