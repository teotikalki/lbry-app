import * as types from "constants/action_types";
import * as modals from "constants/modal_types";
import lbryio from "lbryio";
import rewards from "rewards";
import { selectUnclaimedRewardsByType } from "redux/selectors/rewards";
import { selectUserIsRewardApproved } from "redux/selectors/user";
import { selectClaimedRewardsById } from "../selectors/rewards";

export function doRewardList() {
  return function(dispatch, getState) {
    const state = getState();

    dispatch({
      type: types.FETCH_REWARDS_STARTED,
    });

    lbryio
      .call("reward", "list", { multiple_rewards_per_type: true })
      .then(userRewards => {
        dispatch({
          type: types.FETCH_REWARDS_COMPLETED,
          data: { userRewards },
        });
      })
      .catch(() => {
        dispatch({
          type: types.FETCH_REWARDS_COMPLETED,
          data: { userRewards: [] },
        });
      });
  };
}

export function doClaimRewardType(rewardType) {
  return function(dispatch, getState) {
    const state = getState(),
      rewardsByType = selectUnclaimedRewardsByType(state),
      reward = rewardsByType[rewardType],
      userIsRewardApproved = selectUserIsRewardApproved(state);

    if (!reward || reward.transaction_id) {
      //already claimed or doesn't exist, do nothing
      return;
    }

    if (!userIsRewardApproved && rewardType !== rewards.TYPE_CONFIRM_EMAIL) {
      return dispatch({
        type: types.OPEN_MODAL,
        data: { modal: modals.REWARD_APPROVAL_REQUIRED },
      });
    }

    dispatch({
      type: types.CLAIM_REWARD_STARTED,
      data: { reward },
    });

    const success = reward => {
      dispatch({
        type: types.CLAIM_REWARD_SUCCESS,
        data: {
          reward,
        },
      });
      if (reward.reward_type == rewards.TYPE_CONFIRM_EMAIL) {
        dispatch({
          type: types.OPEN_MODAL,
          data: { modal: modals.FIRST_REWARD },
        });
      }
    };

    const failure = error => {
      dispatch({
        type: types.CLAIM_REWARD_FAILURE,
        data: { reward, error },
      });
    };

    rewards.claimReward(rewardType).then(success, failure);
  };
}

export function doClaimEligiblePurchaseRewards() {
  return function(dispatch, getState) {
    const state = getState(),
      rewardsByType = selectUnclaimedRewardsByType(state),
      userIsRewardApproved = selectUserIsRewardApproved(state);

    if (!userIsRewardApproved || !lbryio.enabled) {
      return;
    }

    if (rewardsByType[rewards.TYPE_FIRST_STREAM]) {
      dispatch(doClaimRewardType(rewards.TYPE_FIRST_STREAM));
    } else {
      [rewards.TYPE_MANY_DOWNLOADS, rewards.TYPE_FEATURED_DOWNLOAD].forEach(
        type => {
          dispatch(doClaimRewardType(type));
        }
      );
    }
  };
}

export function doClaimRewardClearError(reward) {
  return function(dispatch, getState) {
    dispatch({
      type: types.CLAIM_REWARD_CLEAR_ERROR,
      data: { reward },
    });
  };
}
