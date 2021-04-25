<template>
  <div class="article-meta clearfix">
        <nuxt-link class="left" :to="{name: 'home', query: {username: article.author.username}}"><img :src="article.author.image" /></nuxt-link>
        <div class="info left">
            <nuxt-link :to="{name: 'home', query: {username: article.author.username}}" class="author">{{article.author.username}}</nuxt-link>
            <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
        </div>
        <div v-if="article.author.username !== user.username" class="left">
            <button class="btn btn-sm btn-outline-secondary" :class="{'active': article.author.following}" @click="articleClick(1)">
                <i class="ion-plus-round"></i>&nbsp; Follow {{article.author.username}} <span class="counter"></span>
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary" :class="{'active': article.favorited}" @click="articleClick(2)">
                <i class="ion-heart"></i>&nbsp; Favorite Post <span class="counter">({{article.favoritesCount}})</span>
            </button>
        </div>
        <div v-if="article.author.username === user.username" class="left">
            <nuxt-link class="btn btn-outline-secondary btn-sm" :to="{name: 'editor', params: {slug: article.slug}}">
                <i class="ion-edit"></i> Edit Article
            </nuxt-link>
            <button class="btn btn-outline-danger btn-sm" type="button" @click="articleClick(3)">
                <i class="ion-trash-a"></i> Delete Article
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'ArticleMeta',
    props: {
        article: {
            type: Object,
            require: true
        }
    },
    methods: {
        articleClick (type) {
            console.log('1111')
            let val = {
                type: type,
                data: ''
            }
            if (type === 1) {
                val.data = this.article.author.username
            } else if (type === 2 || type === 3) {
                val.data = this.article.slug
            }
            this.$emit('click', val)
        }
    },
    computed: {
      ...mapState(['user'])
    }
}
</script>

<style scoped>
.left {
    float: left;
}
.clearfix:after {
    display: block;
    content: '';
    clear: both;
}
</style>