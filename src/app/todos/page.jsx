export const instant = false;

const TodosPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await res.json();
  console.log(todos);

  return (
    <div>
      <h2>To-Dos: {todos[0].title}</h2>
    </div>
  );
};

export default TodosPage;
