import { QueryData } from "@supabase/supabase-js";
import { categories } from "@/lib/categories";
import { createClient } from "../../../../../supabase/server";

const supabase = createClient();
export const getDashboardData = async () => {
  const resp = supabase.from("transactions").select(
    `
  *,
  categories ( name )
  `
  );
  // .not("categories", "is", null);
  type TransactionsWithCategories = QueryData<typeof resp>;
  const { data, error } = await resp;
  if (error) {
    throw error;
  }
  const transactions: TransactionsWithCategories = data;

  return transactions;
};
