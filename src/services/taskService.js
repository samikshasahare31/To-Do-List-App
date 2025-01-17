const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.slice(0, 10); 
};

export const addTask = async (title) => {
  console.log("title",title)
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({ title, completed: false }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const updateTask = async (id, title) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, completed: false }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const deleteTask = async (id) => {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
};
