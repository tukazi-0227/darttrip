# ベースイメージとしてTomcatを使用（Java 17対応）
FROM tomcat:10.1-jdk17

# WARファイルをTomcatのwebappsディレクトリにコピー
# build/libsディレクトリに生成されたWARファイルをコピーします
# WARファイル名を固定する場合は直接指定することも可能です
COPY build/libs/*.war /usr/local/tomcat/webapps/ROOT.war

# ポート8080を公開
EXPOSE 8080

# Tomcatをフォアグラウンドで実行
CMD ["catalina.sh", "run"]
