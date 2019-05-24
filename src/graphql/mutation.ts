import { Tags, Links } from './fragment';
import gql from 'graphql-tag';
import { Category, Article } from '@/graphql/fragment';

// 创建分类
export const CREATECATEGORY = gql`
    mutation($category: CategoryInput) {
        createCategory(category: $category) {
            ...Categoryfields
        }
    }
    ${Category.Categoryfields}
`;

// 修改分类
export const UPDATECATEGORY = gql`
    mutation($id: Int!, $category: CategoryInput) {
        updateCategory(id: $id, category: $category) {
            ...Categoryfields
        }
    }
    ${Category.Categoryfields}
`;

// 删除分类
export const DELETECATEGORY = gql`
    mutation($id: Int) {
        deleteCategory(id: $id) {
            ...Categoryfields
        }
    }
    ${Category.Categoryfields}
`;

// 创建tag
export const CREATETAGS = gql`
   mutation($tags:TagsInput){
        createTags(tags: $tags){
            ...Tagsfields
        }
    }
    ${Tags.Tagsfields}
`;

// 创建文章
export const CREATEARTICLE = gql`
    mutation($article: ArticleInput) {
        createArticle(article: $article) {
        ...Articlefields
        }
    }
    ${Article.Articlefields}
`;

// 修改文章
export const UPDATEARTICLE = gql`
    mutation($id:Int,$article: ArticleInput) {
        updateArticle(id:$id,article: $article) {
        ...Articlefields
        }
    }
    ${Article.Articlefields}
`;

// 删除文章
export const DELETEARTICLE = gql`
    mutation($id:Int) {
        deleteArticle(id:$id) {
        ...Articlefields
        }
    }
    ${Article.Articlefields}
`;

// 创建Links
export const CREATELINKS = gql`
   mutation($links:LinkInput){
        createLinks(links: $links){
            ...Linksfields
        }
    }
    ${Links.Linksfields}
`;

// 修改Links
export const UPDATELINKS = gql`
    mutation($id: Int!, $links:LinkInput) {
        updateLinks(id: $id, links: $links) {
            ...Linksfields
        }
    }
    ${Links.Linksfields}
`;

// 删除Links
export const DELETELINKS = gql`
    mutation($id:Int) {
        deleteLinks(id:$id) {
        ...Linksfields
        }
    }
    ${Links.Linksfields}
`;
