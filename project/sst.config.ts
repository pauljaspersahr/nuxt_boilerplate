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
    const vpc = new sst.aws.Vpc("MyVpc");
    const rds = new sst.aws.Postgres("MyPostgres", { vpc });

    const DATABASE_URL = $interpolate`postgresql://${rds.username}:${rds.password}@${rds.host}:${rds.port}/${rds.database}`;
    const app = new sst.aws.Nuxt("MyWeb", {
      path: "app",
      environment: { DATABASE_URL },
    });
  },
});
