import * as types from '../types';
import SegnificationService from '@/service/Signification'

const state = {
  request: {
    file: {
      title: '',
      description: '',
    },
    content: {
      body: '',
      name: ''
    },
    recipients: [] // {address, name}
  }
};

const getters = {
    [types.REQUEST_FILE]: state => {
        return state.request.file;
    },

    [types.REQUEST_CONTENT]: state => {
        return state.request.content;
    },

    [types.REQUEST_RECIPIENTS]: state => {
        return state.request.recipients;
    }
};

const mutations = {
    [types.REQUEST_UPDATE_FILE]: (state, payload) => {
        state.request.file = payload;
    },
    [types.REQUEST_UPDATE_CONTENT]: (state, payload) => {
        state.request.content = payload;
    },
    [types.REQUEST_UPDATE_RECIPIENTS]: (state, payload) => {
      console.log(payload)
        state.request.recipients = payload;
    },

    [types.REQUEST_CLEAR]: (state, payload) => {
        state.request = {
          name: '',
          file: {
            title: '',
            description: '',
          },
          content: {
            body: '',
            name: ''
          },
          recipients: []
        };
    }
};

const actions = {
    [types.REQUEST_SET_FILE]: ({ commit }, payload) => {
        commit(types.REQUEST_UPDATE_FILE, payload);
    },

    [types.REQUEST_SET_CONTENT]: ({ commit }, payload) => {
        commit(types.REQUEST_UPDATE_CONTENT, payload);
    },

    [types.REQUEST_UPDATE_RECIPIENTS]: ({ commit }, payload) => {
        commit(types.REQUEST_UPDATE_RECIPIENTS, payload);
    },

    [types.REQUEST_SEND]: (context, payload) => {
      console.log(context.rootState.signrequest.request)
      SegnificationService.send(context.rootState.profile.profile.seed, context.rootState.signrequest.request).then(() => {
        context.commit(types.REQUEST_CLEAR, {});
      })
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
