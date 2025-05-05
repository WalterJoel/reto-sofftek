import { Schema } from 'dynamoose';

export const FusionSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true, // Partition Key
    },
    mergedData: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
    saveUnknown: true,
  },
);
