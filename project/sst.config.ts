/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "project",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          // profile: input?.stage === "staging" ? "staging" : "iamadmin-general",
          // region: "eu-central-1",
        },
      },
    };
  },
  async run() {
    let DATABASE_URL;

    if ($dev) {
      DATABASE_URL = process.env.DATABASE_URL;

      console.log("DATABASE_URL ", DATABASE_URL);
      new sst.x.DevCommand("Prisma", {
        environment: { DATABASE_URL },
        dev: {
          autostart: false,
          directory: "app",
          command: "pnpm prisma studio",
        },
      });
    } else {
      const vpc = new sst.aws.Vpc("MyVpc");
      const rds = new sst.aws.Postgres("MyPostgres", { vpc });
      DATABASE_URL = $interpolate`postgresql://${rds.username}:${rds.password}@${rds.host}:${rds.port}/${rds.database}`;
    }

    const app = new sst.aws.Nuxt("MyWeb", {
      path: "app",
      environment: { DATABASE_URL },
    });
  },
});
