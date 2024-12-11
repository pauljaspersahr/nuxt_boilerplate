import prisma_app_client from '@/prisma/app.client';
import { PRICING_PLANS } from '@/config/pricing';

async function main() {
  // Upsert all plans from PRICING_PLANS
  for (const [_, plan] of Object.entries(PRICING_PLANS)) {
    await prisma_app_client.plan.upsert({
      where: { stripe_product_id: plan.stripe_product_id },
      update: {},
      create: {
        name: plan.name,
        description: plan.description,
        price: plan.price,
        old_price: plan.old_price,
        features: plan.features,
        not_features: plan.not_features,
        featured: plan.featured,
        subtext: plan.subtext,

        stripe_product_id: plan.stripe_product_id,
        tier: plan.tier,
        gen_token: plan.gen_token,
        project_token: plan.project_token,
      },
    });
    console.log(`Upserted plan: ${plan.name}`);
    console.log(plan);
  }
}

main()
  .then(async () => {
    await prisma_app_client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma_app_client.$disconnect();
    process.exit(1);
  });
