# AWSのデプロイ方法

GitHub に push後、GitHub Actions から手動で　AWSの各アカウント（dev, stg, prod）にデプロイします。

# AWS アカウント情報

dev: ./config/dev.json
stg: ./config/stg.json
prod: ./config/prod.json

# AWS デプロイに必要な認証情報

GitHub の Environments（dev, stg, prod）に以下の情報を設定済です。

AWS_ACCESS_KEY_ID: XXX
AWS_SECRET_ACCESS_KEY: XXX
S3_BUCKET: XXX

# Lambda 関数のアップロード方法

GitHub へ push 後、GitHubActions を利用し dev, stg, prod に設定する。

Job 1:
dev の認証情報で dev S3 からJARをダウンロード
↓ (GitHub Artifact で受け渡し)
Job 2:
stg/prod の認証情報でターゲットS3にアップロード → Lambda更新
