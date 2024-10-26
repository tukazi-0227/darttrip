# Build Stage
FROM node:18-alpine AS builder

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package.json package-lock.json* ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# Next.js アプリケーションをビルド
RUN npm run build

# Production Stage
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# ビルド成果物のみをコピー
COPY --from=builder /app ./

# 依存関係のインストール（productionのみ）
RUN npm install --production

# ポート3000を公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]
