import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type LogoutMessage = {
  __typename?: 'LogoutMessage';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask?: Maybe<Task>;
  createUser?: Maybe<User>;
  deleteTask?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<AuthPayload>;
  logout?: Maybe<LogoutMessage>;
  refreshToken?: Maybe<AuthPayload>;
  toggleTaskArchived?: Maybe<Task>;
  toggleTaskDone?: Maybe<Task>;
  updateTask?: Maybe<Task>;
};


export type MutationCreateTaskArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  priority: Priority;
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Role>;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationToggleTaskArchivedArgs = {
  id: Scalars['ID']['input'];
};


export type MutationToggleTaskDoneArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateTaskArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  done?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  priority?: InputMaybe<Priority>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type Query = {
  __typename?: 'Query';
  getAllTasks: Array<Maybe<Task>>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getTask?: Maybe<Task>;
  getUser?: Maybe<User>;
};


export type QueryGetTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Task = {
  __typename?: 'Task';
  archived: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  done: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  priority: Priority;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Role;
};

export type CreateTaskMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  priority: Priority;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask?: { __typename?: 'Task', id: string, title: string, priority: Priority, done: boolean } | null };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Priority>;
  done?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask?: { __typename?: 'Task', id: string, title: string, priority: Priority, done: boolean } | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: boolean | null };

export type ToggleTaskDoneMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ToggleTaskDoneMutation = { __typename?: 'Mutation', toggleTaskDone?: { __typename?: 'Task', id: string, done: boolean } | null };

export type ToggleTaskArchivedMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ToggleTaskArchivedMutation = { __typename?: 'Mutation', toggleTaskArchived?: { __typename?: 'Task', id: string, archived: boolean } | null };

export type GetAllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTasksQuery = { __typename?: 'Query', getAllTasks: Array<{ __typename?: 'Task', id: string, title: string, description?: string | null, priority: Priority, done: boolean, archived: boolean, createdAt: string } | null> };

export type GetTaskQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTaskQuery = { __typename?: 'Query', getTask?: { __typename?: 'Task', id: string, title: string, description?: string | null, priority: Priority, done: boolean, archived: boolean, createdAt: string } | null };


export const CreateTaskDocument = gql`
    mutation CreateTask($title: String!, $description: String, $priority: Priority!) {
  createTask(title: $title, description: $description, priority: $priority) {
    id
    title
    priority
    done
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      priority: // value for 'priority'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: ID!, $title: String, $description: String, $priority: Priority, $done: Boolean) {
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
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      priority: // value for 'priority'
 *      done: // value for 'done'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: ID!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const ToggleTaskDoneDocument = gql`
    mutation ToggleTaskDone($id: ID!) {
  toggleTaskDone(id: $id) {
    id
    done
  }
}
    `;
export type ToggleTaskDoneMutationFn = Apollo.MutationFunction<ToggleTaskDoneMutation, ToggleTaskDoneMutationVariables>;

/**
 * __useToggleTaskDoneMutation__
 *
 * To run a mutation, you first call `useToggleTaskDoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleTaskDoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleTaskDoneMutation, { data, loading, error }] = useToggleTaskDoneMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleTaskDoneMutation(baseOptions?: Apollo.MutationHookOptions<ToggleTaskDoneMutation, ToggleTaskDoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleTaskDoneMutation, ToggleTaskDoneMutationVariables>(ToggleTaskDoneDocument, options);
      }
export type ToggleTaskDoneMutationHookResult = ReturnType<typeof useToggleTaskDoneMutation>;
export type ToggleTaskDoneMutationResult = Apollo.MutationResult<ToggleTaskDoneMutation>;
export type ToggleTaskDoneMutationOptions = Apollo.BaseMutationOptions<ToggleTaskDoneMutation, ToggleTaskDoneMutationVariables>;
export const ToggleTaskArchivedDocument = gql`
    mutation ToggleTaskArchived($id: ID!) {
  toggleTaskArchived(id: $id) {
    id
    archived
  }
}
    `;
export type ToggleTaskArchivedMutationFn = Apollo.MutationFunction<ToggleTaskArchivedMutation, ToggleTaskArchivedMutationVariables>;

/**
 * __useToggleTaskArchivedMutation__
 *
 * To run a mutation, you first call `useToggleTaskArchivedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleTaskArchivedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleTaskArchivedMutation, { data, loading, error }] = useToggleTaskArchivedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleTaskArchivedMutation(baseOptions?: Apollo.MutationHookOptions<ToggleTaskArchivedMutation, ToggleTaskArchivedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleTaskArchivedMutation, ToggleTaskArchivedMutationVariables>(ToggleTaskArchivedDocument, options);
      }
export type ToggleTaskArchivedMutationHookResult = ReturnType<typeof useToggleTaskArchivedMutation>;
export type ToggleTaskArchivedMutationResult = Apollo.MutationResult<ToggleTaskArchivedMutation>;
export type ToggleTaskArchivedMutationOptions = Apollo.BaseMutationOptions<ToggleTaskArchivedMutation, ToggleTaskArchivedMutationVariables>;
export const GetAllTasksDocument = gql`
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

/**
 * __useGetAllTasksQuery__
 *
 * To run a query within a React component, call `useGetAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(GetAllTasksDocument, options);
      }
export function useGetAllTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(GetAllTasksDocument, options);
        }
export function useGetAllTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(GetAllTasksDocument, options);
        }
export type GetAllTasksQueryHookResult = ReturnType<typeof useGetAllTasksQuery>;
export type GetAllTasksLazyQueryHookResult = ReturnType<typeof useGetAllTasksLazyQuery>;
export type GetAllTasksSuspenseQueryHookResult = ReturnType<typeof useGetAllTasksSuspenseQuery>;
export type GetAllTasksQueryResult = Apollo.QueryResult<GetAllTasksQuery, GetAllTasksQueryVariables>;
export const GetTaskDocument = gql`
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

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables> & ({ variables: GetTaskQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
      }
export function useGetTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export function useGetTaskSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskSuspenseQueryHookResult = ReturnType<typeof useGetTaskSuspenseQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<GetTaskQuery, GetTaskQueryVariables>;