import { useFetch } from '../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../config/apiConfig';
import { TransactionModel } from '../models/TransactionModel';
import { TransactionItemModel } from '../models/TransactionItemModel';
import { CodeValueModel } from '../models/CodeValueModel';

export const transactionApi = () => {
  const { getData, postData } = useFetch();

  const loadTransaction = async (take: number) => {
    let data: TransactionModel[] = [];
    let count: number = 0;
    let transactionTypeIds: CodeValueModel[] = [];
    let items: TransactionItemModel[] = [];

    await getData(
      `${protectedResources.oaprojectsApi.transactionEnpoint}/load?take=${take}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.transactions;
        count = json.model.count;
        transactionTypeIds = json.model.transactionTypeIds;
        items = json.model.transactionItems;
      }
    });

    return {
      data,
      count,
      transactionTypeIds,
      items,
    };
  };

  const getTransaction = async (page: number, take: number, search: string) => {
    let data: TransactionModel[] = [];
    let count: number = 0;
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.transactionEnpoint}/get?offset=${offset}&take=${take}&search=${search}`,
    ).then(json => {
      if (json.errors.length == 0) {
        data = json.model.transactions;
        count = json.model.count;
      }
    });

    return {
      data,
      count,
    };
  };

  const saveTransaction = async (transaction: TransactionModel) => {
    let data: TransactionModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.transactionEnpoint}/save`,
      transaction,
    ).then(async json => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  const deleteTransaction = async (transactionId: number) => {
    let success: boolean = false;
    await postData(
      `${protectedResources.oaprojectsApi.transactionEnpoint}/delete`,
      {
        transactionId: transactionId,
      },
    ).then(async json => {
      if (json.errors.length == 0) {
        success = true;
      }
    });

    return success;
  };

  return {
    loadTransaction,
    getTransaction,
    saveTransaction,
    deleteTransaction,
  };
};
