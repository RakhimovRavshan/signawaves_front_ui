<template>
    <v-container grid-list-md text-xs-center>
  <v-layout row>
    <v-flex md3>
      <v-card height="100%">
        <v-toolbar color="light-blue" dark>
          <v-toolbar-title>Папки</v-toolbar-title>
        </v-toolbar>
        <v-list two-line subheader>
          <!-- <v-subheader inset>Документы</v-subheader> -->
          <v-list-tile
            v-for="item in folders"
            :key="item.key"
            avatar
            @click="folderSelect(item.key)"
          >
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-badge
              color="purple"
              left
            >
              <span slot="badge">{{ counts[item.key + 'PenCount'] }}</span>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>Всего: {{ counts[item.key + 'SumCount'] }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-badge>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>

  <v-flex md9>
  <v-data-table
    :headers="headers"
    :items="documents"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td width="60%" class="text-xs-left">{{ props.item.title }}</td>
      <td width="20%" class="">{{ props.item.status }}</td>
      <td width="20%" class="">{{ props.item.date }}</td>
      <td class="justify-center layout px-0">
   <v-icon
     small
     class="mr-2"
     @click="sign(props.item.id)"
   >
   edit
   </v-icon>
 </td>
    </template>
  </v-data-table>

</v-flex>
    </v-layout>
</v-container>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import * as types from '../store/types';
  import DocumentService from '@/service/Document';

  export default {
    mounted() {
      this.countUpdate(),
      this.folderSelect('inbox')
    },
    methods: {
      ...mapActions({
          folderSelect: types.SELECT_DOCUMENT_FOLDER,
          countUpdate: types.REQUEST_DOCUMENT_COUNTS
      }),
      sign(document_id) {
        DocumentService.sign(this.$store.state.profile.profile.seed, document_id)
      }
    },
    computed: {
      ...mapGetters({
          documents: types.DOCUMENT_ITEMS,
          counts: types.DOCUMENTS_COUNT
      })
    },
    data () {
      return {
        folders: [
          { icon: 'assignment', iconClass: 'blue white--text', title: 'Входящие', key: 'inbox'  },
          { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Исходящие', key: 'outbox' }
        ],
        headers: [
          { text: 'Название', value: 'title' },
          { text: 'Статус', value: 'status' },
          { text: 'Дата последнего изменения', value: 'update_time' },
           { text: 'Действия', value: 'name', sortable: false }
        ]
      }
    }
  }
</script>
