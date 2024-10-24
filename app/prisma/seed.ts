import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Upsert "Free Trial" plan
  const freeTrial = await prisma.plan.upsert({
    where: { name: "Free Trial" },
    update: {},
    create: {
      name: "Free Trial",
      duration_days: 3,
    },
  });

  // Upsert "Individual Plan"
  const individualPlan = await prisma.plan.upsert({
    where: { name: "Monthly Plan" },
    update: {},
    create: {
      name: "Monthly Plan",
      duration_days: 30,
      stripe_product_id: "prod_NQR7vwUulvIeqW",
    },
  });

  // Upsert "Team Plan"
  const teamPlan = await prisma.plan.upsert({
    where: { name: "Lifetime Plan" },
    update: {},
    create: {
      name: "Team Plan",
      duration_days: -1,
      stripe_product_id: "prod_NQR8IkkdhqBwu2",
    },
  });

  console.log({ freeTrial, individualPlan, teamPlan });
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
