<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <ul class="error-messages offset-md-1">
          <li class="ng-scope" v-if='titleshow'>title can't be blank</li>
          <li class="ng-scope" v-if='titleshortshow'>title is too short (minimum is 1 character)</li>
          <li class="ng-scope" v-if='aboutshow'>body can't be blank</li>
          <li class="ng-scope" v-if='textareashow'>description can't be blank</li>
          <li class="ng-scope" v-if="textareashortshow">description is too short (minimum is 1 character)</li>
        </ul>
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="title">
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="What's this article about?" v-model="about">
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="textarea"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="Enter tags" v-model="tags"><div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="onFavorite()">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { setarticles } from '@/api/article'

export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex',
  data () {
    return {
       title:'',
       about:'',
       textarea:'',
       tags:'',
       titleshow:false,
       titleshortshow:false,
       aboutshow:false,
       textareashow:false,
       textareashortshow:false
    }
  },
  methods:{
    onFavorite(){
       if(this.title == '' || this.textarea == '' || this.about == ''){
          if(this.title == '') {
            this.titleshow = true
            this.titleshortshow = true
          }else{
             this.titleshow = false
            this.titleshortshow = false
          }

        if(this.about == '' ){
          this.aboutshow = true
        }else {
          this.aboutshow = false
        }

        if(this.textarea == '') {
          this.textareashow = true
          this.textareashortshow = true
        }else{
          this.textareashow = false
          this.textareashortshow = false
        }
        return
      }
     

      const ss = this.tags.split(",")
      const data ={
        "article":{
          "title":this.title,
          "description":this.about,
          "body":this.textarea,
          "tagList": ss
        }
      }
      setarticles(data)
      this.$router.push( {path:'/'})
    }
  }
}
</script>

<style>

</style>
