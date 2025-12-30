# 1단계: 빌드 스테이지 (Build Stage)
FROM node:20-slim AS build
WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 의존성 설치를 위해 설정 파일 먼저 복사
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 소스 코드 복사 및 빌드
COPY . .
RUN pnpm build

# 2단계: 실행 스테이지 (Runtime Stage)
FROM node:20-slim AS runtime
WORKDIR /app

# 빌드 결과물만 복사 (이미지 용량 최적화)
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Cloud Run은 환경 변수 PORT(기본 8080)를 사용합니다.
ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080

# 앱 실행
CMD ["node", "./dist/server/entry.mjs"]