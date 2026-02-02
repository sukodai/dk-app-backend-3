# Overview

AWS CDK を使用してインフラをコードで管理し、GitHub Actions を使い、AWSへ手動デプロイを行います。

# 事前準備

- AWS デプロイに必要な認証情報は、GitHub の Environments（dev, stg, prod）に設定しておきます。
- ビルド済みの Lambda-jar を DEVアカウントの S3 にアップロードしておきます。

# YML 作成

Prompt にある md を　実行するように　claude に指示してください。
依存関係があるので、以下の順番で指示してください。

### 1 iam.yml

`/prompt/iam.md の内容を実行してもらえないでしょうか？`

### 2 deviceGroupManagement.yml

`/prompt/DeviceGroupManagement.md の内容を実行してもらえないでしょうか？`

### 3 pushNotification.yml

`/prompt/PushNotification.md の内容を実行してもらえないでしょうか？`

### 4 refreshFirebaseToken.yml

`/prompt/RefreshFirebaseToken.md の内容を実行してもらえないでしょうか？`

### 5 eventBridge.yml

`/prompt/EB_RefreshFirebaseToken.md の内容を実行してもらえないでしょうか？`

### 6 apiGateway.yml

`/prompt/ApiGateway.md の内容を実行してもらえないでしょうか？`
