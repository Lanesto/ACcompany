import axios from 'axios'

const state = {
  // backend
  _basetime: null, // for soft-reload of content
  id       : null,
  start    : null,
  len      : null,
  // frontend
  posts    : []
}

const getters = {
  orderedPosts: state => {
    let copy = state.posts.slice()
    return copy.sort((a, b) => {
      // newest posts goes up
      return new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
    })
  }
}

const actions = {
  get(context) {
    return new Promise(function(resolve, reject) {
      axios.get('/api/post', {
        params: {
          _basetime: context.state._basetime,
          board    : context.state.id,
          start    : context.state.start,
          len      : context.state.len
        }
      })
      .then(res => {
        context.commit('push', res.data)
        resolve(res.data)
      })
      .catch(err => reject(err))
    })
  }
}

const mutations = {
  init(state, id) {
    state._basetime = new Date() // is timestamp
    state.id        = id
    state.start     = 0
    state.len       = 100
    state.posts     = []
  },
  push(state, data) {
    let { _basetime, posts } = data
    state._basetime = _basetime
    if (posts.length < state.len) {
      // length should be at least 1
      state.len = posts.length | 1
    }
    state.start += state.len
    posts.forEach(received => {
      let index = state.posts.findIndex(original => original.id === received.id)
      if (index > (-1)) {
        // if received post is duplicated
        // then if received is newer than original 
        //      then replace
        //      else do not replace
        state.posts[index] = (state.posts[index]._basetime > received._basetime) ? state.posts[index] : received
      }
      else
        // else just push into array
        state.posts.push(received)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
