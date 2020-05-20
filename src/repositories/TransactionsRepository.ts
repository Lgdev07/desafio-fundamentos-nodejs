import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateData {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface BalanceAll {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): BalanceAll {
    const balance = this.getBalance();
    return {
      transactions: this.transactions,
      balance,
    };
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => t.value + total, 0);

    const outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .reduce((total, t) => t.value + total, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateData): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
