import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  s3bucket: AWS.S3;

  constructor() {
    AWS.config.update({
      accessKeyId: environment.s3AccessKeyId,
      secretAccessKey: environment.s3SecretAccessKey,
      region: environment.s3Region
    });
    this.s3bucket = new AWS.S3();
  }

  getSignedUrl(imageName: string) {
    return this.s3bucket.getSignedUrl('getObject', {
      Bucket: environment.s3Bucket,
      Key: imageName,
      Expires: environment.s3Expires
    });
  }
}
