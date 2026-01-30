# Prompt

IAM ポリシー、IAMロールを設定するコードを書いてもらえますか？
github に push後、Github Actions から手動で　AWSの各アカウント（dev, stg, prod）にデプロイします。

- AWS デプロイに必要な認証情報
  ./Credentials.md を確認してください。

- ワークフローファイル
  以下の２つのファイルjに構成してください。
  .github/workflows/iam.yml
  ./cdk/lib/iam-stack.ts

- IAMポリシーの設定
  ./iam/iamPolicy.md に記載しています。

- IAMロールの設定
  ./iam/iamRole.md に記載しています。
