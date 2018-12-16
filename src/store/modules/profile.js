import * as types from '../types';

const state = {
  profile: {
    seed: ''
  }
};

const getters = {
    [types.PROFILE_SEED]: state => {
        return state.profile.seed;
    },

    [types.PROFILE_AVATAR]: state => {
        return "https://www.gravatar.com/avatar/" + md5(state.profile.seed) + "?d=retro";
    }
};

const mutations = {
    [types.PROFILE_CHANGE_SEED]: (state, payload) => {
        state.profile.seed = payload;
    }
};

const actions = {
    [types.PROFILE_UPDATE_SEED]: ({ commit }, payload) => {
        commit(types.PROFILE_CHANGE_SEED, payload);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
