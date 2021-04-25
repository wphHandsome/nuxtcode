<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset class="form-group">
              <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title"/>
            </fieldset>
            <fieldset class="form-group">
              <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description"/>
            </fieldset>
            <fieldset class="form-group">
              <textarea class="form-control md-text" rows="8" placeholder="Write your article (in markdown)" v-model="article.body"></textarea>
              <div class="previewCon">
                <p class="previewTxt">预览 :</p>
                <markdown-it-vue class="md-body" :content="article.body"/>
              </div>
            </fieldset>
            <fieldset class="form-group">
              <input type="text" class="form-control" placeholder="Enter tags" v-model="tag" @keydown.enter="tagClick(1, $event)"/>
              <div class="tag-list">
                <span class="tag-default tag-pill" v-for="(i, index) in article.tagList" :key="index">
                  {{i}}<i class="ion-close-round" style="margin-left: 10px;" @click="tagClick(2, index)"></i>
                </span>
              </div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="button" :disabled="btnDisabled" @click="publishClick">{{isEdit ? 'Save Article' : 'Publish Article'}}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, publishArticle, editArticle } from '@/api/article'

export default {
  // 路由匹配组件渲染之前会先执行中间件处理
  // middleware: 'auth',
  name: "ediot",
  async asyncData({ params }) {
    if (Object.keys(params).length > 0) {
      const { data } = await getArticle(params.slug)
      const { article } = data
      const isEdit = true
      return {
        article,
        isEdit
      }
    }
  },
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      tag: '',
      isEdit: false,
      btnDisabled: false
    }
  },
  methods: {
    tagClick (type, data) {
      // type: 1 data: ev, type: 2 data: index
      if (type === 1) {
        const code = data.keyCode
        if (code === 13) {
          this.article.tagList.push(data.target.value)
          this.tag = ''
        }
      } else if (type === 2) {
        this.article.tagList.splice(data, 1)
      }
    },
    async publishClick () {
      this.btnDisabled = true
      if (!this.article.title || !this.article.description || !this.article.body) {
        this.btnDisabled = false
        return false
      }
      const params = {
        article: this.article
      }
      if (this.isEdit) {
        // 编辑保存
        const paramsData = {
          slug: this.article.slug,
          data: params
        }
        const { data } = await editArticle(paramsData)
        this.$router.push({name: 'article', params: {slug: data.article.slug}})
      } else {
        // 发布保存
        const { data } = await publishArticle(params)
        this.$router.push({name: 'article', params: {slug: data.article.slug}})
      }
    }
  }
}
</script>

<style scoped>
.previewCon {
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 20px;
  border-radius: 4px;
}
.previewTxt {
  padding: 10px 0;
  border-bottom: 1px solid #cccc;
  font-weight: bold;
}
.tag-list {
  margin-top: 10px;
}
.tag-default i {
  cursor: pointer;
}
</style>