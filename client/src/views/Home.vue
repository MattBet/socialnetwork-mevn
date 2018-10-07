<template>
  <div class="home">
      <button @click="showPostsForm = !showPostsForm" class="btn btn-info mt-3 mb-3">Toggle post form</button>
      <form v-if="showPostsForm" class="mb-3" @submit.prevent="addPost">
          <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
              <strong>Holy guacamole!</strong> {{ error }}.
          </div>
          <div class="form-group">
              <label for="username">Username</label>
              <input v-model="post.username" type="text" class="form-control" id="username" value="Anonymous" placeholder="Anonymous" required>
          </div>
          <div class="form-group">
              <label for="subject">Subject</label>
              <input v-model="post.subject" type="text" class="form-control" id="subject" value="Test" placeholder="Enter a subject" required>
          </div>
          <div class="form-group">
              <label for="message">Message</label>
              <textarea v-model="post.message" class="form-control" rows="5" id="message" placeholder="Enter a message"></textarea>
          </div>
          <button class="btn btn-primary" type="submit">Add post</button>
      </form>


      <div class="card mb-3" v-for="post in reversedPosts" :key="post._id">
          <div class="card-header">
               {{post.subject}}
          </div>
          <div class="card-body">
              <h5 class="card-title">By {{post.username}}</h5>
              <p class="card-text">{{post.message}}</p>
              <a href="#" class="btn btn-primary">Go</a>
          </div>
          <div class="card-footer">
              <p class="text-muted">{{post.created_at}}</p>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
const API_URL = 'http://localhost:8081/posts';
export default {
  name: 'home',
  data: () => ({
      error: '',
      showPostsForm: false,
      posts: [],
      post: {
          username: 'Anonymous',
          subject: '',
          message: '',
      }
  }),
  computed: {
      reversedPosts() {
          return this.posts.slice().reverse();
      }
  },
  mounted() {
    fetch(API_URL).then(response => response.json()).then(result => {
        this.posts = result;
    });
  },
  methods: {
    addPost() {
        console.log(this.post);
        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(this.post),
            headers: {
                'content-type' : 'application/json'
            }
        }).then(response => response.json()).then(result => {

            if (result.details) {
                const error = result.details.map(detail => detail.message).join(' ');
                this.error = error;
            } else {
                this.posts.push(result);
            }
        })
    }
  },
};
</script>
