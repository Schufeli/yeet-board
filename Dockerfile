FROM denoland/deno:latest as base

COPY ./api /api
COPY ./app /app

RUN deno cache api/deps.ts

CMD ["run", "--allow-net", "--allow-read", "api/mod.ts" ]