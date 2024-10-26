# ダーツの旅アプリ
このアプリでは旅の行き先を選択した地方によってランダムに決められます。

## 概要
このアプリケーションは[Next.js](https://nextjs.org/)フレームワーク、[Springboot](https://spring.io/projects/spring-boot)フレームワーク、[Docker](https://www.docker.com/ja-jp/)をデータベース及び、フロント、バックエンド、[Yahoo場所情報API](https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/placeinfo.html)使用しています。
## 技術仕様
| 技術           | バージョン    |
| -------------- | ------------- |
| java        | 17.0.12      |
| npm           | 10.7.0       |
| next.js         | 14.2.11         |
| springboot        | 3.13.0         |
| docker | 27.0.3        |
## データベース設計 ※dockerで永続化
| Column           | Type    | Options |
| -------------- | ------------- | ------------- |
| id        | Int      | null:false, autoincrement |
| 地方名  | varchar      | null:false, size < 20 |
| 県名 | varchar      | null:false, size < 20 |
## 機能説明
| 機能    | 場所 | 機能説明  |
| -------------- | ------------- | ------------- |
| 地域の情報の検索 | ホーム画面右| YahooAPIを用いてプルダウンから求める地域の情報を得られます。  |
| 地域の情報のソート  | ホーム画面右| 検索した地域の情報を様々な条件でソートできます。  |
| 画面遷移 | [旅に出る] ボタン| ダーツページに移動できます。  |
| ダーツの旅  | ダーツ画面右| 全国から行きたい地方にチェックして[出発する]ボタンをクリックするとランダムに一県出力される  |
## Setup
このプロジェクトでは[npm](https://www.npmjs.com/),[gradle](https://gradle.org/)を使用して依存関係を管理しています。必ずローカルにインストールしてください。

**リポジトリをクローン**

```bash
git clone https://github.com/tukazi-0227/darttrip.git
```

### 環境構築 ###
コマンド一つで依存関係のインストール、起動まで行います。

```bash
# build
docker-compose up -d --build
```
### 備考 ###
以前はデプロイしていましたが、dockerを使用していることもあり、資源が足りず課金が必要だったためなくしました。
