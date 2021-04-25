<template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="profile.image" class="user-img" />
                        <h4>{{profile.username}}</h4>
                        <p>{{profile.bio}}</p>
                        <button v-if="profile.username !== user.username" type="button" class="btn btn-sm btn-outline-secondary action-btn" :class="{'active': profile.following}" @click="followAuthor"><i class="ion-plus-round"></i>&nbsp;Follow {{profile.username}}</button>
                        <nuxt-link v-if="profile.username === user.username" class="btn btn-sm btn-outline-secondary action-btn" :to="{name: 'settings', params: {username: profile.username}}">
                            <i class="ion-gear-a"></i> Edit Profile Settings
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <nuxt-link class="nav-link" :to="{name: 'profile', query: {username: profile.username}}" exact>My Articles</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" :to="{name: 'profile', query: {username: profile.username, tab: 'favorited'}}" exact>Favorited Articles</nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <List :list="articles" :total="totalPage" :page="page" :limit="limit" :tab="tab" :name="'Profile'"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getArticles,getProfile, followUser, unFollowUser } from '@/api/article'
import List from '../compontents/List'
import { mapState } from 'vuex'
export default {
    // middleware: 'auth',
    name: 'editorindex',
    components: {
        List
    },
    async asyncData({query}) {
        const page = parseInt(query.page || 1)
        const limit = 10
        const { username, tab } = query
        const [ articleRes, profileRes ] = await Promise.all([
            getArticles({
                limit: limit,
                offset: (page - 1) * limit,
                author: tab ? null : username,
                favorited: tab === 'favorited' ? username : null
            }),
            getProfile(query.username)
        ])
        const { articles, articlesCount } = articleRes.data
        const { profile } = profileRes.data

        articles.forEach(article => {
            article.favoriteDisabled = false
        })

        return {
            articles,
            articlesCount,
            limit,
            page,
            tab,
            profile
        }
    },
    watchQuery: ['page', 'tab'],
    computed: {
        ...mapState(['user']),
        totalPage () {
            return Math.ceil(this.articlesCount / this.limit)
        }
    },
    methods: {
        async followAuthor () {
            const username = this.profile.username
            if (this.profile.following) {
                await unFollowUser(username)
            } else {
                await followUser(username)
            }
            this.profile.following = !this.profile.following
        }
    }
}
</script>

<style scoped>

</style>