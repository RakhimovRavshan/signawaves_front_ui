import Api from '@/rest/Api'

export default {
    getCounts (seed) {
        return Api().get('main?seed=' + seed).then(response => { return {
          sumoutbox: response.data.body.total_outcome,
          penoutbox: response.data.body.outcome,
          suminbox: response.data.body.total_income,
          peninbox: response.data.body.income
        }
      })
    },

    getDocuments (seed, folder) {
        return Api().get('documents/' + folder + '?seed=' + seed).then(response => {
          return response.data.body.map(document =>{ return {id: document.id, title: document.title, status: document.is_signed ? 'Подписан': 'Ожидает', date: document.update_time}})
        })
    },

    sign(seed, document_id) {
      return Api().get('document/sign?id=' + document_id + '&seed='+ seed )
    }
}
