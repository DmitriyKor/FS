import mongoose from 'mongoose';

export function isObjectIdInstance(value) {
  return value instanceof mongoose.Types.ObjectId;
}

export function ensureObjectId(obj, field) {
  if (!isObjectIdInstance(obj[field])) obj[field]=new mongoose.Types.ObjectId(obj[field]);
  return obj;
}

export function ensureValueObjectId(value) {
  return isObjectIdInstance(value)? value : new mongoose.Types.ObjectId(value);
}