import type { ReactNode } from "react";
import type { RouteObject } from "react-router-dom";

export interface RouteMeta {
  title: string;
  icon?: ReactNode;
}

export interface AppRouteObject extends Omit<RouteObject, "children"> {
  meta?: RouteMeta;
  children?: AppRouteObject[];
  element?: ReactNode;
  index?: boolean;
}
