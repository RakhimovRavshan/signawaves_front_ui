import * as types from '../types';
import DocumentService from '@/service/Document'

const state = {
  documents: {
    items: [], //{id, title, status, update_time}
    folder: "inbox", // "outbox"
    counts: {
      sumoutbox: 3,
      penoutbox: 1,
      suminbox: 2,
      peninbox: 1
    }
  }
};

const getters = {
    [types.DOCUMENTS_COUNT]: state => {
        // return {
        //   outboxSumCount: state.documents.counts.sumoutbox,
        //   outboxPenCount:state.documents.counts.penoutbox,
        //   inboxSumCount: state.documents.counts.suminbox,
        //   inboxPenCount:state.documents.counts.peninbox
        // };

        return {
          outboxSumCount: 2,
          outboxPenCount:1,
          inboxSumCount:3,
          inboxPenCount:1
        };
    },

    [types.DOCUMENT_ITEMS]: state => {
        return state.documents.items;
    },
};

const mutations = {
    [types.UPDATE_DOCUMENT_COUNTS]: (state, payload) => {
        DocumentService.getCounts(payload).then(counts => {
          state.documents.counts = counts
        })
    },

    [types.UPDATE_DOCUMENT_ITEMS]: (state, payload) => {
        DocumentService.getDocuments(payload.seed, payload.folder).then(items => {
          state.documents.items = items
        })
    },

    [types.CHANGE_DOCUMENTS_FOLDER]: (state, payload) => {
        state.documents.folder = payload
    }
};

const actions = {
    [types.REQUEST_DOCUMENT_COUNTS]: (context, payload) => {
        context.commit(types.UPDATE_DOCUMENT_COUNTS, context.rootState.profile.profile.seed);
    },
    [types.SELECT_DOCUMENT_FOLDER]: (context, payload) => {
        context.commit(types.CHANGE_DOCUMENTS_FOLDER, payload);
        context.commit(types.UPDATE_DOCUMENT_ITEMS, {
          folder: payload,
          seed: context.rootState.profile.profile.seed
        });
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
