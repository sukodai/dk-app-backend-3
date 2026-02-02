# Overview

既存のApigatewayに追加するリソースを記載しています。

# 既存のAPIGateway

名前: AgileWorks-app-API

# 追加リソース1

- リソース
  パス: /
  リソース名: AWS_AgileWorks-app_DeviceGroupManagement4
  メソッド: POST

- 総合リクエスト
  Lambda プロキシ統合: false
  Lambda関数: AWS_AgileWorks-app_DeviceGroupManagement4

- メソッドリクエスト
  認可: NONE
  リクエストバリデータ: クエリ文字列パラメータおよびヘッダーの検証

- 総合レスポンス
  - マッピングテンプレート
    コンテンツタイプ: application/json
    テンプレート本文:
    #set($context.responseOverride.status = $input.path('$.statusCode'))
    $input.json('$.body')

# 追加リソース2

- リソース
  パス: /
  リソース名: AWS_AgileWorks-app_PushNotification4
  メソッド: POST

- 総合リクエスト
  Lambda プロキシ統合: false
  Lambda関数: AWS_AgileWorks-app_PushNotification4

- メソッドリクエスト
  追加りソース1と同じ設定にしてください。

- 総合レスポンス
  追加りソース1と同じ設定にしてください。

# 総合リクエストに指定された Lambda関数 のデプロイ状況

以下の ２つの Lambda 関数は、GitHub Actions を使い　各環境（dev, stg, prod）に 事前に　deploy 済みを想定しています。
GitHub Actions の実行時、指定の Lambda関数がない場合は、エラーで終了させてください。

- AWS_AgileWorks-app_DeviceGroupManagement4
- AWS_AgileWorks-app_PushNotification4
