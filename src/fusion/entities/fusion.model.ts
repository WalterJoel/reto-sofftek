import { FusionSchema } from './fusion.schema';
import * as dynamoose from 'dynamoose';

export const FusionModel = dynamoose.model('FusionTable', FusionSchema, {
  create: false,
});
