import Api from '@/rest/Api'

export default {
    send (seed, request) {
      console.log(request)
        return Api().post('files/send?seed=' + seed, request)
    }
}
