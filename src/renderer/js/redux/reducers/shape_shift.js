import { handleActions } from "util/redux-utils";
import * as types from "constants/action_types";
import * as statuses from "constants/shape_shift";

const defaultState = {
  loading: true,
  updating: false,
  shifting: false,
  error: undefined,
  shiftSupportedCoins: [],
  originCoin: undefined,
  hasActiveShift: false,
  // shapeshift address to send your coins to
  shiftDepositAddress: undefined,
  // your address you are sending coins from
  shiftReturnAddress: undefined,
  shiftCoinType: undefined,
  shiftOrderId: undefined,
  shiftState: undefined,
  originCoinDepositLimit: undefined,
};

export default handleActions(
  {
    [types.GET_SUPPORTED_COINS_START]: (state, action) => ({
      ...state,
      loading: true,
      error: undefined,
    }),
    [types.GET_SUPPORTED_COINS_SUCCESS]: (
      state,
      { data: shiftSupportedCoins }
    ) => ({
      ...state,
      error: undefined,
      shiftSupportedCoins,
    }),
    [types.GET_SUPPORTED_COINS_FAIL]: (state, action) => ({
      ...state,
      loading: false,
      error: true,
    }),

    [types.GET_COIN_STATS_START]: (state, { data: coin }) => ({
      ...state,
      updating: true,
      originCoin: coin,
    }),
    [types.GET_COIN_STATS_SUCCESS]: (
      state,
      { data: originCoinDepositLimit }
    ) => ({
      ...state,
      loading: false,
      updating: false,
      originCoinDepositLimit,
    }),
    [types.GET_COIN_STATS_FAIL]: (state, { data: error }) => ({
      ...state,
      loading: false,
      error,
    }),

    [types.PREPARE_SHAPE_SHIFT_START]: state => ({
      ...state,
      shifting: true,
      error: undefined,
    }),
    [types.PREPARE_SHAPE_SHIFT_SUCCESS]: (
      state,
      { data: { deposit, depositType, returnAddress, orderId } }
    ) => ({
      ...state,
      shifting: false,
      hasActiveShift: true,
      shiftDepositAddress: deposit,
      shiftCoinType: depositType,
      shiftReturnAddress: returnAddress,
      shiftOrderId: orderId,
      shiftState: statuses.NO_DEPOSITS,
    }),
    [types.PREPARE_SHAPE_SHIFT_FAIL]: (state, { data: error }) => ({
      ...state,
      shifting: false,
      error: error.message,
    }),

    [types.CLEAR_SHAPE_SHIFT]: state => ({
      ...state,
      loading: false,
      updating: false,
      shifting: false,
      hasActiveShift: false,
      shiftDepositAddress: undefined,
      shiftReturnAddress: undefined,
      shiftCoinType: undefined,
      shiftOrderId: undefined,
      originCoin: "BTC",
    }),

    [types.GET_ACTIVE_SHIFT_START]: state => ({
      ...state,
      error: undefined,
      updating: true,
    }),
    [types.GET_ACTIVE_SHIFT_SUCCESS]: (state, { data: status }) => ({
      ...state,
      updating: false,
      shiftState: status,
    }),
  },
  defaultState
);
