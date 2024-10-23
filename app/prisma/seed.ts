import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Upsert "Free Trial" plan
  const freeTrial = await prisma.plan.upsert({
    where: { name: "Free Trial" },
    update: {},
    create: {
      name: "Free Trial",
      features: ["ADD_NOTES", "EDIT_NOTES", "VIEW_NOTES"],
      stripe_product_id: null, // No Stripe product for free plan
    },
  });

  // Upsert "Individual Plan"
  const individualPlan = await prisma.plan.upsert({
    where: { name: "Individual Plan" },
    update: {},
    create: {
      name: "Individual Plan",
      features: ["ADD_NOTES", "EDIT_NOTES", "VIEW_NOTES", "SPECIAL_FEATURE"],
      stripe_product_id: "prod_NQR7vwUulvIeqW",
    },
  });

  // Upsert "Team Plan"
  const teamPlan = await prisma.plan.upsert({
    where: { name: "Team Plan" },
    update: {},
    create: {
      name: "Team Plan",
      features: [
        "ADD_NOTES",
        "EDIT_NOTES",
        "VIEW_NOTES",
        "SPECIAL_FEATURE",
        "SPECIAL_TEAM_FEATURE",
      ],
      stripe_product_id: "prod_NQR8IkkdhqBwu2",
    },
  });

  // Upsert "Enterprise Plan"
  const enterprisePlan = await prisma.plan.upsert({
    where: { name: "Enterprise Plan" },
    update: {},
    create: {
      name: "Enterprise Plan",
      features: [
        "ADD_NOTES",
        "EDIT_NOTES",
        "VIEW_NOTES",
        "SPECIAL_FEATURE",
        "SPECIAL_TEAM_FEATURE",
        "ENTERPRISE_SUPPORT",
      ],
      stripe_product_id: "prod_NQR9DklxvwYop3",
    },
  });

  console.log({ freeTrial, individualPlan, teamPlan, enterprisePlan });
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
