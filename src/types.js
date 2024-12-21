/**
 * @typedef {{
 *  title: string;
 *  outcomes: string[];
 *  entry_amount: number|string;
 *  start_date: string,
 *  start_time: string,
 *  end_time: string,
 *  end_date: string,
 *  status: number;
 * }} Parlay
 */

/**
 * @typedef {{
 *  amount: number;
 *  id: number;
 *  user_id: number;
 *  status: number;
 * }} Wallet
 */

/**
 * @typedef {{
 *  id: number;
 *  firstname: string;
 *  lastname: string;
 *  email: string;
 *  wallet: Wallet;
 *  status: number;
 * }} User
 */
