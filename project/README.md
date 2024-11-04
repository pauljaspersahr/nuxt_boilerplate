# SST

run `sst` commands from project root dir.

## dev

```bash
pnpm sst dev
```

starts dev server and deploys lambdas as stubs. requests to lambas are intercepted and they run locally.

## deploy

```bash
pnpm sst deploy
```

deploys application serverless to aws

## remove

```bash
pnpm sst remove
```

remove infrastructure
