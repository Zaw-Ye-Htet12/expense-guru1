import React from 'react'
import { API_ROUTE, MOBILE_HOME_PAGE, TEST_MOBILE_REGEX } from '@/constants/route'
import { Route } from '@/enums/route';

export const isAPIRoute = (path?: string) => {
  const currentPath = path || (typeof window !== 'undefined' && window.location.pathname);
  return currentPath ? currentPath.includes(API_ROUTE) : false;
}

export const isMobileRoute = (path: string) => {
  return path?.includes(MOBILE_HOME_PAGE)
}

export const isMobile = (providedUserAgent?: string): boolean => {
  const userAgent = typeof window !== "undefined" ? navigator.userAgent : providedUserAgent;

  if (!userAgent) {
    return false;
  }

  return TEST_MOBILE_REGEX.test(userAgent);
};

export const getMobileRoute = (path: Route) => {
  return `${Route.MOBILE}${path}`
}

export const getRelevantRoute = (path: Route) => {
  return isMobile() ? getMobileRoute(path) : path;
}

export const createQueryString = (name: string, value: string, searchParams: string) => {
  const param = new URLSearchParams(searchParams);
  param.set(name, value);
  return param;
}