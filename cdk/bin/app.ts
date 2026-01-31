#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as fs from "fs";
import * as path from "path";
import { IamStack } from "../lib/iam-stack";

const app = new cdk.App();

const envName = app.node.tryGetContext("env") || "dev";
const configPath = path.resolve(__dirname, `../../config/${envName}.json`);
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const projectName = "AWMobileApp4";

const iamStack = new IamStack(app, `${projectName}-IamStack-${config.envName}`, {
  env: {
    account: config.account,
    region: config.region,
  },
  envName: config.envName,
  accountId: config.account,
});
cdk.Tags.of(iamStack).add("ManagedBy", "CDK");
