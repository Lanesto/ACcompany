import axios from 'axios'

const state = {
  _basetime    : null,
  id           : null,
  title        : null,
  content      : null,
  date_created : null,
  date_modified: null,
  nickname     : null,
  username     : null,
}

const getters = {

}

const actions = {
  get(context, boardID) {
    return new Promise(function(resolve, reject) {
      axios.get(`/api/post/${boardID}`)
      .then(res => {
        context.commit('set', res.data)
        resolve(res.data)
      })
      .catch(err => reject(err))
    })
  }
}

const mutations = {
  init(state) {},
  set(state, data) { Object.zip(state, data) }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
