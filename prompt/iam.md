# Prompt

IAM ポリシー、IAMロールを設定するコードを書いてもらえますか？

- ワークフローファイル
  以下の２つのファイルに構成してください。
  /.github/workflows/iam.yml
  /cdk/lib/iam-stack.ts

- IAMポリシーの設定
  /iam/iamPolicy.md に記載しています。

- IAMロールの設定
  /iam/iamRole.md に記載しています。

- CloudFormationの設定
  スタック名: {projectName}-IamStack-{env}
  説明: AWMobileApp Expo
  Tag: ManagedBy: CDK
