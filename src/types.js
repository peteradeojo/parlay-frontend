/**
 * @typedef {{
 *  id: number;
 *  title: string;
 *  outcomes: string[];
 *  entry_amount: number|string;
 *  start_date: string,
 *  start_time: string,
 *  close_time: string,
 *  close_date: string,
 *  status: number;
 *  code: string;
 *  creator: User;
 * }} ParlayType
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

/**
 * @typedef {number} IStatus
 * 
 * @typedef {{
 * name: string;
 * description: string;
 * id: number;
 * amount: number;
 * status: IStatus;
 * createdat: Date;
 * }} ITransaction
 */