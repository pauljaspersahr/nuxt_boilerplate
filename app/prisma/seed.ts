import { PrismaClient } from "@prisma/client";
import { PLAN_TIER } from "./Enums";
const prisma = new PrismaClient();

async function main() {
  const freeTrial = await prisma.plan.upsert({
    where: { name: "Free Trial" },
    update: {},
    create: {
      name: "Free Trial",
      duration_days: 3,
      tier: PLAN_TIER.BASIC,
    },
  });

  const monthlyBasicPlan = await prisma.plan.upsert({
    where: { name: "Monthly Basic Plan" },
    update: {},
    create: {
      name: "Monthly Basic Plan",
      duration_days: 30,
      stripe_product_id: "prod_NQR7vwUulvIeqW",
      tier: PLAN_TIER.BASIC,
    },
  });

  const lifetimeBasicPlan = await prisma.plan.upsert({
    where: { name: "Lifetime Basic Plan" },
    update: {},
    create: {
      name: "Lifetime Basic Plan",
      duration_days: -1,
      stripe_product_id: "prod_NQR7vwUulvIeqW",
      tier: PLAN_TIER.PREMIUM,
    },
  });

  const monthlyPremiumPlan = await prisma.plan.upsert({
    where: { name: "Monthly Premium Plan" },
    update: {},
    create: {
      name: "Monthly Premium Plan",
      duration_days: -1,
      stripe_product_id: "prod_NQkljahkkdhqBwu2",
      tier: PLAN_TIER.PREMIUM,
    },
  });

  const lifetimePremiumPlan = await prisma.plan.upsert({
    where: { name: "Lifetime Basic Plan" },
    update: {},
    create: {
      name: "Lifetime Basic Plan",
      duration_days: -1,
      stripe_product_id: "prod_ad09asdkjh",
      tier: PLAN_TIER.PREMIUM,
    },
  });

  console.log({
    freeTrial,
    monthlyBasicPlan,
    monthlyPremiumPlan,
    lifetimeBasicPlan,
    lifetimePremiumPlan,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
