<template>
  <v-container fluid grid-list-md>
    <v-layout row pb-2>
      <v-flex xs8 offset-xs2>
        <v-textarea
          label="Seed"
          auto-grow
          :value="seed"
          @input="updateSeed"
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import * as types from '../store/types';

export default {
  name: 'page-profile',
  methods: {
    ...mapActions({
      updateSeed: types.PROFILE_UPDATE_SEED
    })
  },
  computed: {
    ...mapGetters({
        seed: types.PROFILE_SEED
    })
  }
}
</script>
