import { ActionType } from "../action-types";

// type Action = {
//     type: string,
//     payload?: number
// }

interface DepositAction {
  type: ActionType.DEPOSIT;
  payload: number;
}

interface Withdraw {
  type: ActionType.WITHDRAW;
  payload: number;
}

interface Bankrupt {
  type: ActionType.BANKRUPT;
}

interface No_more_than_warning {
  type: ActionType.NO_MORE_THAN_WARNING;
}

export type Action = DepositAction | Withdraw | Bankrupt | No_more_than_warning;
