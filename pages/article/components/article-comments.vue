<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="text"></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click.prevent="onComment">
        Post Comment
        </button>
      </div>
    </form>

    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
         <span class="mod-options" v-if="comment.author.username === user.username">
            <i class="ion-trash-a" @click="deletecomment(comment)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments,setarticle,deleteComment } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      comments: [], // 文章列表
      text:''
    }
  },
  async mounted () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
    this.$forceUpdate()
  },
  methods:{
    onComment(){
      if(this.text != ''){
        const date = {
          "comment": {
            "body": this.text
          }
        }
        setarticle(this.article.slug,date).then((res) => {
          this.$nextTick(function(){
            this.comments.unshift(res.data.comment)
            this.text = ''
          })
        })
      }
    },
    deletecomment(data){
      const params = {
            slug: this.article.slug,
            id: data.id
      }
      deleteComment(params)
      this.comments.splice(this.comments.findIndex(item => item.id === data.id), 1) 
    }
  }
}
</script>

<style>

</style>
