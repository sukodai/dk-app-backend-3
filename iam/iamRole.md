# Overview

IAMロールの設定内容を記載してします。

# 名前

名前: AWS_AgileWorks-app4
説明: AWMobileApp Expo
命名規則: dev, stg, prod とも共通

# 許可ポリシー

- カスタマー管理
  AgileWorks-app4_Administer をアタッチ

- AWS管理
  AmazonAPIGatewayInvokeFullAccess
  AmazonDynamoDBReadOnlyAccess

# 信頼関係

"Effect": "Allow",
"Principal": {
"Service": [
"lambda.amazonaws.com",
"apigateway.amazonaws.com"
]
},
"Action": "sts:AssumeRole"

# タグ

ManagedBy: CDK
