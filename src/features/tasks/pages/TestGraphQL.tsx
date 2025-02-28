import { gql, useQuery } from "@apollo/client";

const GET_TASKS = gql`
  query GetAllTasks {
    getAllTasks {
      id
      title
      priority
      done
    }
  }
`;

export function TestGraphQL() {
  const { data, loading, error } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Tasks from Backend</h1>
      <ul>
        {data.getAllTasks.map((task: any) => (
          <li key={task.id}>
            {task.title} - {task.priority} - {task.done ? "✅ Done" : "❌ Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}
