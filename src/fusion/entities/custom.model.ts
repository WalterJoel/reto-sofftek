import { CustomSchema } from './custom.schema';
import * as dynamoose from 'dynamoose';

export const CustomModel = dynamoose.model('CustomTable', CustomSchema, {
  create: false,
});
