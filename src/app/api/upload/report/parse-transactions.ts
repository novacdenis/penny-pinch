import { parse } from "node-html-parser";

interface Transaction {
  date: string;
  sum: number;
  sumInLei: number;
  transactionCurrency: string;
  description: string;
  transactionType: "SPENDING" | "INCOME";
}

const config = {
  descriptionIdentification: ["Impozit din dobinda", "Dobanda calculata", "******", "5988", "P2P"],
};

export function parseTransactions(htmlContent: string): Transaction[] {
  const root = parse(htmlContent);
  const transactions: Transaction[] = [];
  const rows = root.querySelectorAll("tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");

    if (
      !cells.length ||
      cells.length === 0 ||
      !cells[0] ||
      !cells[2] ||
      !cells[3] ||
      !cells[4] ||
      !config.descriptionIdentification.some((identification) =>
        cells[2]?.text.includes(identification)
      )
    ) {
      return;
    }
    try {
      const transaction: Transaction = {
        date: cells[0].text.trim(),
        sum: extractCurrencyAndNumbers([cells[3].text])[0]?.number || 0,
        sumInLei: parseFloat(cells[4].text),
        transactionCurrency: extractCurrencyAndNumbers([cells[3].text])[0]?.currency || "",
        description: clearPatternFromString(cells[2].text.trim()),
        transactionType: Number(cells[4].text) < 0 ? "SPENDING" : "INCOME",
      };
      transactions.push(transaction);
    } catch (e) {
      console.log(cells[0]?.text, cells[3]?.text, cells[4]?.text, cells[2]?.text);
      console.log(e);
    }
  });

  return transactions;
}
function clearPatternFromString(str: string) {
  // Define the regex pattern to match the specific sequence
  const pattern = /\d\*+\d+\s*/g; // The 'g' flag is for global search, to replace all occurrences

  // Replace the matched patterns with an empty string
  return str.replace(pattern, "");
}

function extractCurrencyAndNumbers(data: string[]) {
  // Define the regex pattern
  // This regex has two capturing groups:
  // 1. `([-]?\d+(\.\d+)?)` captures the number, including optional minus sign and decimal part
  // 2. `([A-Z]{3})` captures the 3-letter currency code
  const regex = /([-]?\d+(\.\d+)?)\s([A-Z]{3})/;

  return data
    .map((item) => {
      const match = item.match(regex);
      if (match) {
        return { number: parseFloat(match[1]), currency: match[3] };
      }
      // Return null or an appropriate value if the string does not match the pattern
      return null;
    })
    .filter((result) => result !== null); // Filter out null values if there are strings that don't match the pattern
}
