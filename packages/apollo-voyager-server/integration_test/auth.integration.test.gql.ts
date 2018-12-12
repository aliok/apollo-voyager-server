'use strict'

import crypto from 'crypto'
import gql from 'graphql-tag'

export function profileMutation (mutationName: string) {
  return {
    // language=GraphQL
    mutation: gql`
          mutation {
              ${mutationName} (
                  email: "jordan@example.com",
                  displayname: "Michael Jordan",
                  pictureurl:"http://example.com/mj.jpg"
              ) {
                  id,
                  email,
                  displayname,
                  pictureurl
              }
          }
      `
  }
}

export const allProfiles = {
  // language=GraphQL
  query: gql`{
        allProfiles {
            id
        }
      }`
}

export function createMeme (owner: number) {
  const randomUrl = `http://example.com/meme.jpg?${crypto.randomBytes(16).toString('hex')}`
  return {
    // language=GraphQL
    mutation: gql`
            mutation {
                createMeme (
                owner: ${owner},
                photourl: "${randomUrl}"
              )
              {
                id,
                photourl,
                likes,
                owner {
                    id
                }
              }
            }
        `
  }
}

export function allMemes (withComments: boolean) {
  const comments = withComments ? ',comments { id, comment }' : ''
  return {
    query: gql`
        query {
        allMemes {
            id,
            photourl,
            likes,
            owner {
               id
            }
            ${comments}
        }
        }
    `
  }
}

export function likeMeme (id: number) {
  return {
    mutation: gql`
            mutation {
                likeMeme (id: "${id}")
            }
        `
  }
}

export function postComment (memeid: number, comment: string, owner: number) {
  return {
    mutation: gql`
            mutation {
                postComment (memeid:"${memeid}",comment:"${comment}",owner:"${owner}")
                {
                    id
                    comment
                }
            }
        `
  }
}

export const allComments = {
  // language=GraphQL
  query: gql`
    query {
        allComments {
            id
            comment
        }
    }
  `
}
