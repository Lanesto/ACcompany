<template>
  <b-card class="my-1 mb-3">
    <!-- root only -->
    <div v-if="isRoot">
      <h4>Comments</h4>
      <b-form @submit.prevent="createSubcomment">
        <b-form-textarea
          class="new-comment"
          rows="1"
          max-rows="4"
          size="sm"
          placeholder="New public comment..."
          v-model.trim="textInput" />
        <b-button
          class="my-1"
          type="submit"
          size="sm"
          variant="secondary">
          Submit
        </b-button>
      </b-form>
    </div> 
    <!-- body of comment -->
    <div v-else>
      <b-media>
        <!-- remove button -->
        <span class="float-right" @click="removeSelf">&times;</span>
        <!-- content -->
        <h4>{{ comment.nickname || comment.username }}</h4>
        <p>{{ comment.date_created }}</p>
        <p>{{ comment.content }}</p>
        <!-- create new subcomment -->
        <p class="mb-1" @click="$root.$emit('bv::toggle::collapse', `${DOM}-create_subcomment`)">Reply</p>
        <b-collapse class="mb-2" :id="`${DOM}-create_subcomment`">
          <b-form @submit.prevent="createSubcomment">
            <b-form-textarea
              class="new-comment"
              rows="1"
              max-rows="4"
              size="sm"
              placeholder="Reply on this comment..."
              v-model.trim="textInput" />
            <b-button class="my-1" type="submit" size="sm" variant="secondary">Submit</b-button>
          </b-form>
        </b-collapse>
        <!-- subcomment toggler -->
        <span
          v-if="comment.count_subcomments > 0"
          @click="renderSubcomments = !renderSubcomments">
          Show {{ comment.count_subcomments }} replies on this comment
        </span>
      </b-media>
    </div>
    <template v-if="renderSubcomments">
      <comment
        :post="post"
        :group="child.id"
        :comment="child" 
        v-for="child in children" :key="child.id"
        @change="get"
        @delete="onDelete"/>
    </template>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'comment', // for recursion
  props: {
    post: {
      type: [Number, String],
      required: true
    },
    group: {
      type: null,
      required: true
    },
    comment: Object
  },
  data() {
    return {
      textInput: null,
      renderSubcomments: false,
      // for ajax
      _basetime: null,
      start    : 0,
      len      : 100,
      children : []
    }
  },
  computed: {
    DOM() { return `comment-${this.post}-${this.group}` },
    isRoot() { return (this.group === null) },
    ...mapState({
      user: state => state.user.id
    })
  },
  methods: {
    initialize() {
      this._basetime = new Date()
      this.get()
    },
    get() {
      this.$axios.get('/api/comment', {
        params: {
          _basetime: this._basetime,
          post     : this.post,
          group    : this.group || 'null',
          start    : this.start,
          len      : this.len
        }
      })
      .then(res => {
        let { _basetime, comments } = res.data
        comments.forEach(received => {
          let index = this.children.findIndex(elem => elem.id === received.id)
          if (index > (-1)) this.children.splice(index, 1, _basetime > this._basetime ? received : this.children[index])
          else {
            this.children.push(received)
            this.$emit('change')
          }
        })
        this.children = this.children.slice().sort((a, b) => {
          return new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
        })
        this._basetime = _basetime
      })
      .catch(err => alert(err.response.data.message))
    },
    createSubcomment() {
      this.$axios.post('/api/comment', {
        post   : this.post,
        group  : this.group,
        user   : this.user,
        content: this.textInput
      })
      .then(res => {
        this.textInput = null
        this.get()
      })
      .catch(err => alert(err.response.data.message))
    },
    removeSelf() {
      // BUG: count of subcomments are not refreshed well
      this.$axios.delete(`/api/comment/${this.comment.id}`)
      .then(res => {
        this.$emit('delete', this.comment.id)
      })
      .catch(err => alert(err.response.data.message))
    },
    onDelete(target) {
      let index = this.children.findIndex(elem => elem.id === target)
      this.children.splice(index, 1)
      this.get()
    }
  },
  watch: { 
    // becuz route component is reused, lifecycle hook won't be called again; watcher needed
    '$route': function(to, from) { 
      if (to.name.endsWith('.post'))
        this.initialize()
    }
  },
  created() {
    if (this.isRoot)
      this.renderSubcomments = true
    this.initialize() 
  }
}
</script>

<style scoped>
.new-comment {
  border: none;
  border-bottom: 1px solid gray;
  border-radius: 0;
}
</style>
