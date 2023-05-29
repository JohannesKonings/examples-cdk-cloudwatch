import { App, Aspects, Stack, StackProps } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { config } from './config';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag'

export class CloudwatchSharing extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const crossAccountSharingRole = new iam.Role(this, 'CrossAccountSharingRole', {
      assumedBy: new iam.AccountPrincipal(config.accountView),
    });
    crossAccountSharingRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchReadOnlyAccess'));
    crossAccountSharingRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXrayReadOnlyAccess'));
    crossAccountSharingRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchAutomaticDashboardsAccess'));
    NagSuppressions.addResourceSuppressions(crossAccountSharingRole, [
      { id: 'AwsSolutions-IAM4', reason: 'using the AWS suggestions Policies for this use case' },
    ]);
  }
}

const env = {
  account: config.accountShare,
  region: config.region,
};

const app = new App();

new CloudwatchSharing(app, config.appName, { env: env });

Aspects.of(app).add(new AwsSolutionsChecks());

app.synth();