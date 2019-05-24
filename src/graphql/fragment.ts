import gql from 'graphql-tag';
// 分类
export const Category = {
    Categoryfields: gql`
      fragment Categoryfields on Category {
            id
            label
            slug
            desc
            ArticleCount
            count
            order
            parent
            createdAt
            updatedAt
            # children
        }
    `,
};

// TAGS
export const Tags = {
    Tagsfields: gql`
      fragment Tagsfields on Tags {
        id
        label
        colro
        hot
        createdAt
        updatedAt
    }
    `,
};

// 文章
export const Article = {
    Articlefields: gql`
      fragment Articlefields on Article {
            id
            title
            slug
            text
            html
            order
            category {
                id
                label
            }
            author {
                name
            }
            tags {
                label
            }
            template
            type
            status
            publish
            password
            isTop
            allowComment
            allowPing
            createdAt
            updatedAt
        }
    `,
};

// Links
export const Links = {
    Linksfields: gql`
      fragment Linksfields on Links {
        id
        url
        name
        email
        logo
        target
        desc
        status
        createdAt
        updatedAt
        dataVersion
    }
    `,
};

