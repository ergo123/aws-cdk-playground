import {RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import {Construct} from 'constructs';

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const spaBucket = new s3.Bucket(this, 'SPABucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      bucketName: 'spa-bucket'
    });

    new s3Deployment.BucketDeployment(this, 'DeploySPA', {
      sources: [s3Deployment.Source.asset('../app/out')],
      destinationBucket: spaBucket
    })
  }
}
