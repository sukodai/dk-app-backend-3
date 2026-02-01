# Overview

Lambda関数の設定内容を記載してします。

# Lambda関数

名前: AWS_AgileWorks-app_PushNotification4
命名規則: dev, stg, prod とも共通

# コード

S3バケット名: GitHub Environments に設定
コードソース: s3://dk-mobileapp/lambda-jar/aw_lambda-pushNotification-all.jar

# ランタイム設定

ランタイム: Java17
アーキテクチャ: x86_64
ハンドラ: jp.atled.cloud.lambda.mobileapp.PushNotificationHandler::handleRequest

# トリガー

API Gateway: AgileWorks-app-API

# アクセス制限

実行ロール: AWS_AgileWorks-app4

# 環境変数

PrivateKey: /AgileWorks-app/Firebase/PrivateKey2
ProjectId: agileworks-app2
