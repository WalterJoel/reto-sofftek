import { Schema } from 'dynamoose';

export const CustomSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true, // Partition Key
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    customData: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
    saveUnknown: true,
  },
);
