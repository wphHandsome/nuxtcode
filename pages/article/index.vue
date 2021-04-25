<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <ArticleMeta :article="article" @click="articleClick"/>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article" @click="articleClick"/>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <ArticleComments :article="article" />

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { getArticle,unFollowUser,followUser,deleteFavorite,addFavorite,deleteArticle} from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'

export default {
  name: 'ArticleIndex',
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  
  components: {
    ArticleMeta,
    ArticleComments
  },
  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  },
    methods: {
    async articleClick (val) {
      if (val.type === 1) {
        if (this.article.author.following) {
          await unFollowUser(val.data)
        } else {
          await followUser(val.data)
        }
        this.article.author.following = !this.article.author.following
      } else if (val.type === 2) {
        if (this.article.favorited) {
          await deleteFavorite(val.data)
          this.article.favoritesCount --
        } else {
          await addFavorite(val.data)
          this.article.favoritesCount ++
        }
        this.article.favorited = !this.article.favorited
      } else if (val.type === 3) {
        await deleteArticle(val.data)
        this.$router.push({name: 'home', query: {tab: 'your_feed'}})
      }
    }
  }
}
</script>

<style>

</style>
