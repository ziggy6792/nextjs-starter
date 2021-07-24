import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as ecs from '@aws-cdk/aws-ecs';
import * as path from 'path';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';
import * as ecr from '@aws-cdk/aws-ecr';

// Stack properties - what region to deploy to
const props = {
  env: {
    region: 'ap-southeast-1',
    account: '596905900055',
  },
};

export class CdkStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // The code that defines your stack goes here

    const vpc = new ec2.Vpc(this, 'fargate-test-task-vpc', {
      maxAzs: 2,
      natGateways: 1,
    });

    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc: vpc,
    });

    const repository = ecr.Repository.fromRepositoryArn(this, 'MyRepo', 'arn:aws:ecr:ap-southeast-1:932244219675:repository/whire');

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'MyFargateService', {
      cluster: cluster, // Required
      cpu: 512, // Default is 256
      desiredCount: 6, // Default is 1
      taskImageOptions: { image: ecs.RepositoryImage.fromEcrRepository(repository, 'latest'), containerPort: 3000 },
      memoryLimitMiB: 2048, // Default is 512
      publicLoadBalancer: true, // Default is false
    });
  }
}
