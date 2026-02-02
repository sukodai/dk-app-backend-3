import * as cdk from "aws-cdk-lib";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface EventBridgeStackProps extends cdk.StackProps {
  envName: string;
  accountId: string;
}

export class EventBridgeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EventBridgeStackProps) {
    super(scope, id, props);

    const { accountId } = props;

    // 既存の Lambda関数を参照
    const lambdaFunction = lambda.Function.fromFunctionArn(
      this,
      "RefreshFirebaseTokenFunction",
      `arn:aws:lambda:ap-northeast-1:${accountId}:function:AWS_AgileWorks-app_RefreshFirebaseToken4`
    );

    // EventBridge ルール: AgileWorks-app_RefreshFirebaseToken4
    const rule = new events.Rule(this, "RefreshFirebaseTokenRule", {
      ruleName: "AgileWorks-app_RefreshFirebaseToken4",
      description: "AWMobileApp Expo",
      schedule: events.Schedule.rate(cdk.Duration.minutes(50)),
    });

    // ターゲット: Lambda関数
    rule.addTarget(new targets.LambdaFunction(lambdaFunction));

    cdk.Tags.of(rule).add("ManagedBy", "CDK");
  }
}
