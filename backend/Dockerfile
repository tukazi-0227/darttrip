# Build Stage
FROM gradle:7.6.1-jdk17 AS builder

# 作業ディレクトリを設定
WORKDIR /app

# Gradle キャッシュを利用するため、依存関係を先にコピー
COPY build.gradle settings.gradle ./
COPY src ./src

# 依存関係をダウンロード
RUN gradle build -x test --no-daemon

# WAR ファイルをビルド
RUN gradle clean war --no-daemon

# Runtime Stage
FROM tomcat:10.1-jdk17

# WAR ファイルを Tomcat の webapps ディレクトリにコピー
COPY --from=builder /app/build/libs/*.war /usr/local/tomcat/webapps/ROOT.war

# ポート8080を公開
EXPOSE 8080

# Tomcatをフォアグラウンドで実行
CMD ["catalina.sh", "run"]
