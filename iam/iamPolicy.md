# Overview

IAMポリシーの設定内容を記載してします。

# 設定内容

ポリシー名: AgileWorks-app4_Administer
説明: AWMobileApp Expo
タイプ: カスタマー管理

"Effect": "Allow",

"Action": [
"ssm:GetParameter",
"ssm:PutParameter",
"logs:CreateLogStream",
"logs:CreateLogGroup",
"logs:PutLogEvents",
"dynamodb:BatchGetItem",
"dynamodb:ConditionCheckItem",
"dynamodb:GetItem",
"dynamodb:GetRecords",
"dynamodb:Scan",
"dynamodb:Query"
],

"Resource": [
"arn:aws:logs:*:*:*",
"arn:aws:logs:ap-northeast-1:370632987723:log-group:/aws/lambda/AWS_AgileWorks-app_PushNotification2:*",
"arn:aws:logs:ap-northeast-1:370632987723:log-group:/aws/lambda/AWS_AgileWorks-app_Authorizer:*",
"arn:aws:logs:ap-northeast-1:370632987723:log-group:/aws/lambda/AWS_AgileWorks-app_RefreshFirebaseToken2:*",
"arn:aws:logs:ap-northeast-1:370632987723:log-group:/aws/lambda/AWS_AgileWorks-app_DeviceGroupManagement2:*",
"arn:aws:ssm:ap-northeast-1:370632987723:parameter/AgileWorks-app/Firebase/PrivateKey2",
"arn:aws:ssm:ap-northeast-1:370632987723:parameter/AgileWorks-app/Firebase/AccessToken2",
"arn:aws:dynamodb:ap-northeast-1:370632987723:table/license_info2/*",
"arn:aws:dynamodb:ap-northeast-1:370632987723:table/customer_license/*"
]
