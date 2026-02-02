import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface ApiGatewayStackProps extends cdk.StackProps {
  envName: string;
  accountId: string;
  restApiId: string;
  rootResourceId: string;
}

export class ApiGatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const { accountId, restApiId, rootResourceId } = props;

    // 既存の API Gateway を参照
    const api = apigateway.RestApi.fromRestApiAttributes(this, "ExistingApi", {
      restApiId,
      rootResourceId,
    });

    // リクエストバリデータ: クエリ文字列パラメータおよびヘッダーの検証
    const requestValidator = new apigateway.RequestValidator(this, "RequestValidator", {
      restApi: api,
      requestValidatorName: "QueryStringAndHeaderValidator",
      validateRequestParameters: true,
      validateRequestBody: false,
    });

    // 統合レスポンスのマッピングテンプレート
    const responseTemplate =
      "#set($context.responseOverride.status = $input.path('$.statusCode'))\n$input.json('$.body')";

    // --- 追加リソース1: DeviceGroupManagement4 ---
    const deviceGroupManagementFunction = lambda.Function.fromFunctionArn(
      this,
      "DeviceGroupManagementFunction",
      `arn:aws:lambda:ap-northeast-1:${accountId}:function:AWS_AgileWorks-app_DeviceGroupManagement4`
    );

    const deviceGroupManagementResource = api.root.addResource("AWS_AgileWorks-app_DeviceGroupManagement4");

    deviceGroupManagementResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(deviceGroupManagementFunction, {
        proxy: false,
        integrationResponses: [
          {
            statusCode: "200",
            responseTemplates: {
              "application/json": responseTemplate,
            },
          },
        ],
      }),
      {
        authorizationType: apigateway.AuthorizationType.NONE,
        requestValidator,
        methodResponses: [
          {
            statusCode: "200",
          },
        ],
      }
    );

    // --- 追加リソース2: PushNotification4 ---
    const pushNotificationFunction = lambda.Function.fromFunctionArn(
      this,
      "PushNotificationFunction",
      `arn:aws:lambda:ap-northeast-1:${accountId}:function:AWS_AgileWorks-app_PushNotification4`
    );

    const pushNotificationResource = api.root.addResource("AWS_AgileWorks-app_PushNotification4");

    pushNotificationResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(pushNotificationFunction, {
        proxy: false,
        integrationResponses: [
          {
            statusCode: "200",
            responseTemplates: {
              "application/json": responseTemplate,
            },
          },
        ],
      }),
      {
        authorizationType: apigateway.AuthorizationType.NONE,
        requestValidator,
        methodResponses: [
          {
            statusCode: "200",
          },
        ],
      }
    );
  }
}
