import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // const income = this.transactions
    //   .filter(({ type }) => type === 'income')
    //   .reduce((acc, curr, index, arr) => {
    //     acc + curr.value;
    //     return acc;
    //   }, 0);
    // const outcome = this.transactions
    //   .filter(({ type }) => type === 'outcome')
    //   .reduce((acc, curr, index, arr) => {
    //     acc + curr.value;
    //     return acc;
    //   }, 0);

    // const total = income - outcome;

    // const balance = {
    //   income,
    //   outcome,
    //   total,
    // };

    return this.balance;
  }

  public setBalance(type: string, value: number): void {
    if (type === 'income') {
      this.balance.income += value;
      this.balance.total += value;
    } else {
      this.balance.outcome += value;
      this.balance.total -= value;
    }
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.setBalance(type, value);

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
