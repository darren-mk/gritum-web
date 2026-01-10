FROM node:20-slim
WORKDIR /app

ENV PORT=8080
ENV HOST=0.0.0.0
ENV NODE_ENV=production

COPY .output .output

EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]
