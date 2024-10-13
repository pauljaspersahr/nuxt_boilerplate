import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Plans
  const basicPlan = await prisma.plan.create({
    data: {
      name: "Test Plan Basic",
      features: ["Feature 1", "Feature 2"],
      stripe_product_id: "prod_basic_123",
    },
  });

  const premiumPlan = await prisma.plan.create({
    data: {
      name: "Test Plan Premium",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      stripe_product_id: "prod_premium_456",
    },
  });

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      auth_uid: "auth123",
      email: "user1@example.com",
      email_confirmed: true,
      display_name: "User One",
      membership: {
        create: {
          name: "User One Membership",
          features: ["Feature 1"],
          stripe_subscription_id: "sub_001",
          stripe_customer_id: "cus_001",
          access: "ADMIN",
          plan: {
            connect: { id: basicPlan.id },
          },
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      auth_uid: "auth456",
      email: "user2@example.com",
      email_confirmed: false,
      display_name: "User Two",
      membership: {
        create: {
          name: "User Two Membership",
          features: ["Feature 1", "Feature 2", "Feature 3"],
          stripe_subscription_id: "sub_002",
          stripe_customer_id: "cus_002",
          access: "OWNER",
          plan: {
            connect: { id: premiumPlan.id },
          },
        },
      },
    },
  });

  console.log({ user1, user2, basicPlan, premiumPlan });
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
