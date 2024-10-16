import mongoose, { Document, Schema } from "mongoose";

interface ITransactionSchema extends Document {
  frameId: string;
  chainId: string;
  to: string;
  value: string;
  data: string;
  gas: string;
  abi: any;
  functionName: string;
  args: any;
  transactionType: string;
}

const TransactionSchema: Schema<ITransactionSchema> = new Schema<ITransactionSchema>(
  {
    frameId: String,
    chainId: String,
    to: String,
    value: String,
    data: String,
    gas: String,
    abi: Object,
    functionName: String,
    args: Object,
    transactionType: String,
  },
  {
    timestamps: true,
  },
);

const Transaction = mongoose.models.Transaction || mongoose.model<ITransactionSchema>("Transaction", TransactionSchema);

export default Transaction;
