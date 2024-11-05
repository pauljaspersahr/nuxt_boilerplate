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
    let APP_DATABASE_URL;
    let AUTH_DATABASE_URL;

    if ($dev) {
      APP_DATABASE_URL = process.env.APP_DATABASE_URL;
      AUTH_DATABASE_URL = process.env.AUTH_DATABASE_URL;

      new sst.x.DevCommand("Prisma", {
        environment: { APP_DATABASE_URL },
        dev: {
          autostart: false,
          directory: "app",
          command: "pnpm prisma studio --schema=prisma/app.schema.prisma",
        },
      });
    } else {
      const vpc = new sst.aws.Vpc("MyVpc");

      const rds_app = new sst.aws.Postgres("MyPostgres", { vpc });
      APP_DATABASE_URL = $interpolate`postgresql://${rds_app.username}:${rds_app.password}@${rds_app.host}:${rds_app.port}/${rds_app.database}`;

      const rds_auth = new sst.aws.Postgres("MyPostgres", { vpc });
      AUTH_DATABASE_URL = $interpolate`postgresql://${rds_auth.username}:${rds_auth.password}@${rds_auth.host}:${rds_auth.port}/${rds_auth.database}`;
    }

    const app = new sst.aws.Nuxt("MyWeb", {
      path: "app",
      environment: { APP_DATABASE_URL, AUTH_DATABASE_URL },
    });
  },
});
