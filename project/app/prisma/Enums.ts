import type {
  USER_STATUS as USER_STATUS_ORG,
  PLAN_TIER as PLAN_TIER_ORG,
} from "@prisma-app/client";

import { create } from "~~/lib/utils.prisma";

export const USER_STATUS = create<USER_STATUS_ORG>();
export type USER_STATUS = typeof USER_STATUS;

export const PLAN_TIER = create<PLAN_TIER_ORG>();
export type PLAN_TIER = typeof PLAN_TIER;

// // hardcoded fallback if generic does not work
// export const ACCCES_STATUS: { [k in ACCESS_STATUS_ORIGINAL]: k } = {
//   ACTIVE: "ACTIVE",
//   INACTIVE: "INACTIVE",
// } as const;
