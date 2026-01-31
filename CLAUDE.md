# 基本情報

projectName: AWMobileApp4

# AWSのデプロイ方法

GitHub に push後、GitHub Actions から手動トリガーで　AWSの各アカウント（dev, stg, prod）にデプロイします。
AWS デプロイに必要な認証情報は、GitHub の Environments（dev, stg, prod）に設定済みです。
OIDC認証は使いません。

# AWS アカウント情報

dev: ./config/dev.json
stg: ./config/stg.json
prod: ./config/prod.json

# GitHub Settings

- General
  githubOrg: dkochi
  githubRepo: dk-app-backend-3
  visibility: public
  About: AWS DeployTools by CDK ver3

- Environments（dev, stg, prod）
  AWS_ACCESS_KEY_ID: XXX
  AWS_SECRET_ACCESS_KEY: XXX
  S3_BUCKET: XXX

# Lambda 関数のアップロード方法

Job 1:
dev の認証情報で dev S3 からJARをダウンロード
↓ (GitHub Artifact で受け渡し)
Job 2:
stg/prod の認証情報でターゲットS3にアップロード → Lambda更新
