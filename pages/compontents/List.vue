<template>
  <div>
      <div class="article-preview" v-for="i in list" :key="i.slug">
            <div class="article-meta">
                <nuxt-link :to="{ name: 'profile', query: { username: i.author.username } }">
                    <img :src="i.author.image" />
                </nuxt-link>
                <div class="info">
                    <nuxt-link :to="{ name: 'profile', query: { username: i.author.username } }" class="author">{{i.author.username}}</nuxt-link>
                    <span class="date">{{i.createdAt | date('MMM DD, YYYY')}}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{'active': i.favorited}" type="button"><i class="ion-heart" :disabled="i.favoriteDisabled"></i> {{i.favoritesCount}}</button>
            </div>
            <nuxt-link :to="{ name: 'article', params: { slug: i.slug } }" class="preview-link">
                <h1>{{i.title}}</h1>
                <p>{{i.description}}</p>
                <span>Read more...</span>
                <ul class="tag-list">
                    <li class="tag-default tag-pill tag-outline" v-for="(i, index) in i.tagList" :key="index">{{i}}</li>
                </ul>
            </nuxt-link>
        </div>
        <div class="article-preview" v-if="list.length === 0">
            <p>No articles are here... yet.</p>
        </div>
        <nav v-if="total > limit">
            <ul class="pagination">
                <li class="page-item" :class="{'active': i === page}" v-for="i in total" :key="i">
                    <nuxt-link class="page-link" :to="{name: 'profile', query: {tab: tab, page: i, tag: tag}}">{{i}}</nuxt-link>
                </li>
            </ul>
        </nav>
  </div>
</template>

<script>
export default {
    name: 'List',
    props: {
        list: {
            type: Array,
            require: true
        },
        total: {
            type: Number,
            require: true
        },
        page: {
            type: Number,
            require: true
        },
        limit: {
            type: Number,
            require: true
        },
        tab: '',
        name: '',
        tag: ''
    }
}
</script>

<style>

</style>