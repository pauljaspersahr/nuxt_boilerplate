FROM node:22.10-bookworm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# ENV COREPACK_ENABLE_PROMPT=0
RUN corepack enable && corepack prepare pnpm@latest --activate
