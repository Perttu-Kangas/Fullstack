import { gql } from '@apollo/client';

import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query ($orderDirection: OrderDirection, 
    $orderBy: AllRepositoriesOrderBy, 
    $searchKeyword: String, 
    $after: String, 
    $first: Int) {
    repositories(
      orderDirection: $orderDirection, 
      orderBy: $orderBy, 
      searchKeyword: $searchKeyword, 
      after: $after, 
      first: $first
      ) {
      edges {
        cursor
        node {
          ...repositoryBaseFields
          ratingAverage
          reviewCount
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query ($id: ID!) {
    repository(id: $id) {
      ...repositoryBaseFields
      ratingAverage
      reviewCount
    }
  }

  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_REPOSITORY_REVIEWS = gql`
  query ($id: ID!, $after: String, $first: Int) {
    repository(id: $id) {
      id
      fullName
      reviews (after: $after, first: $first) {
        totalCount
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    me {
      ...userBaseFields
    }
  }

  ${USER_BASE_FIELDS}
`;