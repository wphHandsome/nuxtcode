import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取公共文章列表
export const getYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    // headers: {
    //   // 添加用户身份，数据格式：Token空格Token数据
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDgxMTYsInVzZXJuYW1lIjoibHB6OTk5IiwiZXhwIjoxNTk3NzQxNTA4fQ.2yO8Fss4hYnvsIN2UYHsutQ1hmYqSSAA-UrIRnP4DOY`
    // }
  })
}

// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}
//发表文章
export const setarticles = data => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data
  })
}

//评论文章
export const setarticle = (slug,data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}

// 删除文章评论
export const deleteComment = data => {
  return request({
      method: 'DELETE',
      url: `/api/articles/${data.slug}/comments/${data.id}`
  })
}

// 获取个人中心
export const getProfile = username => {
  return request({
      method: 'GET',
      url: `/api/profiles/${username}`
  })
}


// 关注用户
export const followUser = username => {
  return request({
      method: 'POST',
      url: `/api/profiles/${username}/follow`
  })
}

// 取消关注用户
export const unFollowUser = username => {
  return request({
      method: 'DELETE',
      url: `/api/profiles/${username}/follow`
  })
}


// 编辑文章
export const editArticle = params => {
  return request({
      method: 'PUT',
      url: `/api/articles/${params.slug}`,
      data: params.data
  })
}

// 发表文章
export const publishArticle = data => {
  return request({
      method: 'POST',
      url: '/api/articles',
      data
  })
}

// 删除文章
export const deleteArticle = slug => {
  return request({
      method: 'DELETE',
      url: `/api/articles/${slug}`
  })
}