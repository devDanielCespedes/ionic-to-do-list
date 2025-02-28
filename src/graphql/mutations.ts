import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String, $priority: Priority!) {
    createTask(title: $title, description: $description, priority: $priority) {
      id
      title
      priority
      done
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $description: String
    $priority: Priority
    $done: Boolean
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      priority: $priority
      done: $done
    ) {
      id
      title
      priority
      done
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export const TOGGLE_TASK_DONE = gql`
  mutation ToggleTaskDone($id: ID!) {
    toggleTaskDone(id: $id) {
      id
      done
    }
  }
`;

export const TOGGLE_TASK_ARCHIVED = gql`
  mutation ToggleTaskArchived($id: ID!) {
    toggleTaskArchived(id: $id) {
      id
      archived
    }
  }
`;
