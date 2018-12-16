import Vue from 'vue';
import Vuex from 'vuex';
import profile from './modules/profile';
import document from './modules/document'
import signrequest from './modules/signrequest'

export const store = new Vuex.Store({
    modules: {
        profile,
        document,
        signrequest
    }
});
