import { create } from 'zustand';

export type TransactionType = 'income' | 'expense';
export type Role = 'viewer' | 'admin';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
}

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  
  isAddModalOpen: boolean;
  setAddModalOpen: (isOpen: boolean) => void;

  isCommandOpen: boolean;
  setCommandOpen: (isOpen: boolean) => void;

  editingTransaction: Transaction | null;
  setEditingTransaction: (tx: Transaction | null) => void;

  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, tx: Transaction) => void;
}

const mockTransactions: Transaction[] = [
  { id: '1', date: '2026-04-01', amount: 120, category: 'Food', type: 'expense' },
  { id: '2', date: '2026-04-02', amount: 12000, category: 'Salary', type: 'income' },
  { id: '3', date: '2026-04-03', amount: 1500, category: 'Rent', type: 'expense' },
  { id: '4', date: '2026-04-04', amount: 80, category: 'Entertainment', type: 'expense' },
  { id: '5', date: '2026-04-05', amount: 200, category: 'Utilities', type: 'expense' },
  { id: '6', date: '2026-04-06', amount: 50, category: 'Transport', type: 'expense' },
  { id: '7', date: '2026-04-07', amount: 800, category: 'Freelance', type: 'income' },
];

export const useStore = create<AppState>((set) => ({
  role: 'admin',
  setRole: (role) => set({ role }),
  
  isAddModalOpen: false,
  setAddModalOpen: (isOpen) => set({ isAddModalOpen: isOpen }),

  isCommandOpen: false,
  setCommandOpen: (isOpen) => set({ isCommandOpen: isOpen }),

  editingTransaction: null,
  setEditingTransaction: (tx) => set({ editingTransaction: tx }),

  transactions: mockTransactions,
  addTransaction: (tx) => set((state) => ({ transactions: [tx, ...state.transactions] })),
  deleteTransaction: (id) => set((state) => ({ transactions: state.transactions.filter(t => t.id !== id) })),
  updateTransaction: (id, tx) => set((state) => ({
    transactions: state.transactions.map((t) => t.id === id ? tx : t)
  })),
}));
