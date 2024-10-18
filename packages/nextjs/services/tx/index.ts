import { APP_URL } from "~~/constants";
import { ITransactionSchema } from "~~/model/transaction";

export const getTxById = async (id: string) => {
  try {
    const response = await fetch(`/api/transactions/${id}`);
    if (!response.ok) {
      throw new Error("Fetching transaction by ID failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getTxAtServer = async (id: string) => {
  try {
    const response = await fetch(`${APP_URL}/api/transactions/${id}`);
    if (!response.ok) {
      throw new Error("Fetching transaction by ID failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const createTx = async (txConfig: Omit<ITransactionSchema, "_id">) => {
  try {
    const response = await fetch(`/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(txConfig),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const saveFrame = async (txConfig: ITransactionSchema) => {
  try {
    const response = await fetch(`/api/frame/${txConfig._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(txConfig),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
