// import * as AWS from 'aws-sdk'
const AWS = require('aws-sdk');
import { vars } from '../config/vars';

const {
	s3
} = vars;
AWS.config.update({
	accessKeyId: s3.s3AccessKeyId,
	secretAccessKey: s3.s3secretAccessKey,
	bucket: s3.s3BucketName,
	region: 'ap-south-1'
});
const s3bucket = new AWS.S3();
export default class FileService {
	static async uploadFiles(filename, buffer) {
		try {
			const s3bucket = new AWS.S3({
				params: { Bucket: s3.s3BucketName },
				accessKeyId: s3.s3AccessKeyId,
				secretAccessKey: s3.s3secretAccessKey
			});
			const params = {
				Bucket: s3.s3BucketName,
				Key: `${filename}`,
				Body: buffer
				// ACL: 'public-read'
			};
			// video/mp4
			return new Promise((resolve, reject) => {
				s3bucket.upload(params, async (err, result) => {
					if (err) {
						return reject(false);
					}
					return resolve(result);
				});
			});
		}
		catch (error) {
			throw error;
		}
	}


	static async getImageByLocation(fileName) {
		try {
			// const { fileName } = filename;
			const imageUrl = s3bucket.getSignedUrl('getObject', {
				Bucket: s3.s3BucketName,
				Key: fileName,
				Expires: s3.signedUrlExpireSeconds
			});
			return imageUrl;

		}
		catch (error) {
			throw error;
		}
	}



}









