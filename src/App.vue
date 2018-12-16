<template>
  <v-app>
    <v-toolbar fixed app>
      <v-toolbar-items>
        <v-btn flat to="/home"><v-icon>dashboard</v-icon>Главная</v-btn>
        <v-btn flat to="/documents"><v-icon>receipt</v-icon>Документы</v-btn>
        <!-- <v-btn flat to="/contacts">Контакты</v-btn> -->
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
          <v-btn icon to="/profile">
              <v-avatar size="36px">
                  <img :src="avatar">
              </v-avatar>
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>

import {mapGetters} from 'vuex'
import * as types from './store/types'

export default {
  name: 'App',
  components: {},
  computed: {
    ...mapGetters({
        avatar: types.PROFILE_AVATAR
    })
  },
  data () {
    return {
      drawer: true,
      clipped: false,
      items: [
        { title: 'Главная', icon: 'dashboard', path: '/main' },
        { title: 'Новая сделка', icon: 'send', path: '/deal/new' },
        { title: 'Cделки', icon: 'input', path: '/deals' },
        { title: 'Настройки', icon: 'settings', path: '/settings' }
      ]
    }
  }
}
</script>
