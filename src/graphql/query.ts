import { Links } from './fragment'
import gql from 'graphql-tag'
import { Category, Tags, Article } from '@/graphql/fragment'

// 查询全部分类
export const ALLCATEGORY = gql`
    query {
        allCategory {
            ...Categoryfields
        }
    }
    ${Category.Categoryfields}
`

// 查询全部Tag
export const ALLTAGS = gql`
    query {
        allTags {
            ...Tagsfields
        }
    }
    ${Tags.Tagsfields}
`

// 查询全部文章
export const ALLARTICLE = gql`
    query {
        allArticle {
            ...Articlefields
        }
    }
    ${Article.Articlefields}
`

// 根据id查询文章
export const GETARTICLEBYID = gql`
    query($id: Int!) {
        getArticleById(id: $id) {
            ...Articlefields
        }
    }
    ${Article.Articlefields}
`

// 查询全部Links
export const ALLLINKS = gql`
    query {
        allLinks {
            ...Linksfields
        }
    }
    ${Links.Linksfields}
`
