import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

interface IamStackProps extends cdk.StackProps {
  envName: string;
  accountId: string;
}

export class IamStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IamStackProps) {
    super(scope, id, props);

    const { accountId } = props;

    // IAM ポリシー: AgileWorks-app4_Administer
    const policy = new iam.ManagedPolicy(this, "AgileWorksApp4Administer", {
      managedPolicyName: "AgileWorks-app4_Administer",
      description: "AWMobileApp Expo",
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
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
            "dynamodb:Query",
          ],
          resources: [
            "arn:aws:logs:*:*:*",
            `arn:aws:logs:ap-northeast-1:${accountId}:log-group:/aws/lambda/AWS_AgileWorks-app_PushNotification2:*`,
            `arn:aws:logs:ap-northeast-1:${accountId}:log-group:/aws/lambda/AWS_AgileWorks-app_Authorizer:*`,
            `arn:aws:logs:ap-northeast-1:${accountId}:log-group:/aws/lambda/AWS_AgileWorks-app_RefreshFirebaseToken2:*`,
            `arn:aws:logs:ap-northeast-1:${accountId}:log-group:/aws/lambda/AWS_AgileWorks-app_DeviceGroupManagement2:*`,
            `arn:aws:ssm:ap-northeast-1:${accountId}:parameter/AgileWorks-app/Firebase/PrivateKey2`,
            `arn:aws:ssm:ap-northeast-1:${accountId}:parameter/AgileWorks-app/Firebase/AccessToken2`,
            `arn:aws:dynamodb:ap-northeast-1:${accountId}:table/license_info2/*`,
            `arn:aws:dynamodb:ap-northeast-1:${accountId}:table/customer_license/*`,
          ],
        }),
      ],
    });
    cdk.Tags.of(policy).add("ManagedBy", "CDK");

    // IAM ロール: AWS_AgileWorks-app4
    const role = new iam.Role(this, "AgileWorksApp4Role", {
      roleName: "AWS_AgileWorks-app4",
      description: "AWMobileApp Expo",
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal("lambda.amazonaws.com"),
        new iam.ServicePrincipal("apigateway.amazonaws.com")
      ),
    });

    // カスタマー管理ポリシーをアタッチ
    role.addManagedPolicy(policy);

    // AWS管理ポリシーをアタッチ
    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "AmazonAPIGatewayInvokeFullAccess"
      )
    );
    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "AmazonDynamoDBReadOnlyAccess"
      )
    );

    cdk.Tags.of(role).add("ManagedBy", "CDK");
  }
}
