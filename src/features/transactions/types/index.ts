const _tag = [
  {
    name: "groceries",
    description: "Essential food items like milk, potatoes, and bread.",
    color: "green",
  },
  {
    name: "entertainment",
    description: "Expenses related to streaming services like Netflix, HBO, and Apple Music.",
    color: "purple",
  },
  {
    name: "transportation",
    description:
      "Commuting expenses such as taxi rides, bus fares, train tickets, and other transportation-related costs.",
    color: "blue",
  },
  {
    name: "restaurants",
    description: "Dining out or ordering takeout expenses.",
    color: "orange",
  },
  {
    name: "bills-and-utilities",
    description: "Utility bills like electricity and gas.",
    color: "yellow",
  },
  {
    name: "shopping",
    description: "Shopping expenses.",
    color: "pink",
  },
  {
    name: "health-and-fitness",
    description: "Health and fitness expenses.",
    color: "red",
  },
  {
    name: "travel",
    description: "Travel-related expenses.",
    color: "cyan",
  },
  {
    name: "education",
    description: "Educational expenses.",
    color: "turquoise",
  },
  {
    name: "others",
    description: "Expenses that do not fit into any other category.",
    color: "gray",
  },
];

export type TransactionCategory =
  | "groceries"
  | "entertainment"
  | "transportation"
  | "restaurants"
  | "bills-and-utilities"
  | "shopping"
  | "health-and-fitness"
  | "travel"
  | "education"
  | "others";

export interface TransactionType {
  id: number;
  title: string;
  category: TransactionCategory;
  amount: number;
  timestamp: string;
}
