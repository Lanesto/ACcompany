import axios from 'axios'

const state = {
  _basetime: null,
  postID   : null,
  start    : 0,
  len      : 100,
  comments : []
}

const getters = {
  treefiedComments: state => {
    // tree-fy given data
    let copy = state.comments.slice()
    let root = {
      id: null,
      children: []
    }
    copy.push(root)
    copy.forEach(comment => {
      comment.children = copy.filter(child => child.group_id === comment.id) || []
      comment.children.sort((a, b) => {
        return new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
      })
    })
    return root
  }
}

const actions = {
  get(context, group) {
    return new Promise(function(resolve, reject) {
      axios.get('/api/comment', {
        params: {
          _basetime: context.state._basetime,
          post     : context.state.postID,
          group    : group || 'null', // axios has a bug that query of null is ignored
          start    : state.start,
          len      : state.len
        }
      })
      .then(res => {
        context.commit('push', res.data)
        resolve(res.data)
      })
      .catch(err => reject(err))
    })
  },
  create(context, payload) {
    return new Promise(function(resolve, reject) {
      axios.post('/api/comment', {
        post   : context.state.postID,
        group  : payload.group,
        content: payload.content
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err))
    })
  },
  delete(context, target) {
    return new Promise(function(resolve, reject) {
      axios.delete(`/api/comment/${target}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
    })
  }
}

const mutations = {
  init(state, postID) {
    state._basetime = new Date()
    state.postID    = postID
    state.start     = 0
    state.len       = 100,
    state.comments  = []
  },
  push(state, data) {
    let { _basetime, comments } = data
    state._basetime = _basetime
    if (comments.length < state.len) {
      // length should be at least 1
      state.len = comments.length | 1
    }
    state.start += state.len
    comments.forEach(received => {
      let index = state.comments.findIndex(original => original.id === received.id)
      if (index > (-1)) {
        // if received comment is duplicated
        // then if received is newer than original 
        //      then replace
        //      else do not replace
        state.comments[index] = (state.comments[index]._basetime > received._basetime) ? state.comments[index] : received
      }
      else
        // else just push into array
        state.comments.push(received)
    })
  }
}

// TODO: Soft-reload on comment also

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

