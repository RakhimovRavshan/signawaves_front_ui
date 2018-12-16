<template>

  <v-container grid-list-md text-xs-center>
    <v-layout row wrap justify-end>
      <v-flex xs3>
        <v-card>
          <v-card-text>
            <h2>{{ counts.inboxPenCount }}</h2>
            <v-btn color="info" @click="gotoOutbox">Требуется действий</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-text>
            <h2>{{ counts.outboxPenCount }}</h2>
            <v-btn color="info" @click="gotoInbox">Действий ожидается</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row pb-2>
   <v-flex xs8 offset-xs2>
     <v-flex xs12>
       <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
            <div class="dropbox">
                      <input type="file" name="files"  @change="handleFileUpload" class="input-file">
                        <p>
                          Drag your file(s) here to begin<br> or click to browse
                        </p>
                    </div>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-text-field
            label="Название"
            type="text"
            v-model="title"
          ></v-text-field>
          <v-textarea
            label="Описание"
            v-model="description"
          ></v-textarea>
          <v-text-field
            label="Подписант"
            type="text"
            v-model="recipient"
          ></v-text-field>
          <span class="caption grey--text text--darken-1">
            Please enter a password for your account
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <v-list
          subheader
          two-line
        >
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content >
              <v-list-tile-title>Игорь Сандреро</v-list-tile-title>
              <v-list-tile-sub-title>dsjkhksdjfhkrfbkbjc</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Игорь Сандреро1</v-list-tile-title>
              <v-list-tile-sub-title>dsjkhksdjfhkrfbkbjc</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
      </v-window-item>
    </v-window>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        :hidden="step !== 2"
        flat
        @click="step--"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :hidden="step !== 2"
        color="primary"
        depressed
        @click="next"
      >
        Отправить
      </v-btn>
    </v-card-actions>
  </v-card>

     </v-flex>
   </v-flex>
 </v-layout>
</v-container>

</template>
<style>
.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
<script>
import {mapGetters, mapActions} from 'vuex';
import * as types from '../store/types';

export default {
  name: 'home-main',
  mounted() {
    this.countUpdate()
  },
  data() {
      return {
          step: 1,
          title: "",
          description: "",
          recipient: ""
      }
  },
  computed: {
    ...mapGetters({
        file: types.REQUEST_FILE,
        content: types.REQUEST_CONTENT,
        recipients: types.REQUEST_RECIPIENTS,
        counts: types.DOCUMENTS_COUNT
    }),
    currentTitle () {
      switch (this.step) {
        case 1: return 'Загрузите файл'
        case 2: return 'Описание'
        default: return 'Выбрать подписантов'
      }
    }
  },
  methods: {
    ...mapActions({
        setFile: types.REQUEST_SET_FILE,
        setContent: types.REQUEST_SET_CONTENT,
        updateRecipient: types.REQUEST_UPDATE_RECIPIENTS,
        sendFile: types.REQUEST_SEND,
        countUpdate: types.REQUEST_DOCUMENT_COUNTS,
        folderSelect: types.SELECT_DOCUMENT_FOLDER
    }),
    gotoInbox() {
      this.folderSelect('inbox')
      this.$router.push('documents')
    },
    gotoOutbox() {
      this.folderSelect('outbox')
      this.$router.push('documents')
    },
    handleFileUpload(a) {

      console.log(a);

      var reader = new FileReader();
      const file = a.target.files[0]
      // Closure to capture the file information.
      var self = this;
      reader.onload = function(e) {
          self.setContent({
            name: a.target.value,
            content: e.target.result
          })
          self.step += 1
      };

      // Read in the image file as a data URL.
      reader.readAsDataURL(file);
    },
    next() {
        this.setFile({
          title: this.title,
          description: this.description
        })
        this.updateRecipient([this.recipient])
        this.sendFile()
        this.step = 1
      }
},

}
</script>
