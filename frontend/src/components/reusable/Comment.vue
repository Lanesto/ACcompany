<template>
  <div>
    <!-- root only -->
    <div v-if="parent.id === null">
      <template v-if="commSize === 1">
        <h4>No comments yet</h4>
      </template>
      <template v-else>
        <h4>Comments</h4>
      </template>
      <b-form @submit.prevent="submit(null)">
        <b-form-textarea v-model.trim="textInput" rows="3" placeholder="New comment" />
        <b-button class="my-2" type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div> 
    <!-- body of comment -->
    <div v-else>
      <!-- content -->
      <div>
        {{ parent.content }}
        <br/>
        {{ parent.date_created }}
        <br/>
        {{ parent.nickname || parent.username }}
        <br/>
        <span @click="$root.$emit('bv::toggle::collapse', `${DOM}-sub`)">+</span>
        <span @click="remove">&times;</span>
        <b-collapse :id="`${DOM}-sub`">
          <b-form @submit.prevent="submit(parent.id)">
            <b-form-textarea v-model.trim="textInput" rows="2" size="sm" placeholder="New Subcomment" />
            <b-button class="my-1" type="submit" size="sm" variant="primary">Submit</b-button>
          </b-form>
        </b-collapse>
      </div>
      <!-- subcomments -->
    </div>
    <comment style="margin-left: 5px;" :parent="child" v-for="child in parent.children" :key="child.id" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'comment', // for recursion
  props: { parent: Object },
  data() {
    return {
      textInput: null
    }
  },
  computed: {
    DOM() { return `comment-${this.parent.id}` },
    commSize() {
      const count = (parent) => {
        if (parent.children) return parent.children.reduce((acc, child) => acc + count(child), 1)
        else                 return 1
      }
      return count(this.parent)
    }
  },
  methods: {
    initialize() {
      this.get(this.parent.id)
    },
    submit(group) {
      this.create({ 
        group,
        content: this.textInput
      })
      .then(res => this.get(this.parent.id))
      .catch(err => alert(err.response.data.message))
    },
    remove() {
      this.delete(this.parent.id)
      .then(res => alert(res))
      .catch(err => alert(err.response.data.message))
    },
    ...mapActions({
      get: 'comment/get',
      create: 'comment/create',
      delete: 'comment/delete'
    })
  },
  watch: { 
    // becuz route component is reused, lifecycle hook won't be called again; watcher needed
    '$route': function(to, from) { 
      if (to.name.endsWith('.post'))
        this.initialize(to.params.postID)
    }
  },
  created() { this.initialize() }
}
</script>


<style scoped>

</style>
