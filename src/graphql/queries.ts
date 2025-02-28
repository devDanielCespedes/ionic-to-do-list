import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetAllTasks {
    getAllTasks {
      id
      title
      description
      priority
      done
      archived
      createdAt
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      title
      description
      priority
      done
      archived
      createdAt
    }
  }
`;
