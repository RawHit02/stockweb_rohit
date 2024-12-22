// TransactionFilterModel.ts
export interface TransactionFilterModel {
  order: string;
  page: number;
  take: number;
  startDate?: string;
  endDate?: string;
  ornament?: string;
  minValue?: number;
  maxValue?: number;
  paymentMethod?: string;
  status?: string;
}

export interface TransactionResponseModel {
  data: {
    data: TransactionData[];
    meta: {
      page: number;
      take: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  };
}


export interface TransactionData {
  id: string;
  transId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  // baseTotal: number;
  commission: number;
  // commissionValue : number ;
  totalValue: number;
  notes: string;
  createdDate: string;
  amountPaid: number;
  balanceDue: number;
  paymentStatus: string;
  paymentType: string;
}
