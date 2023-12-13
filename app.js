const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Simulação de um banco de dados em memória
let tasks = [
  { id: 1, title: 'Estudar Node.js', completed: false },
  { id: 2, title: 'Criar API com Express', completed: true },
];

// Listar todas as tarefas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Obter uma tarefa por ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    res.status(404).json({ error: 'Tarefa não encontrada.' });
  } else {
    res.json(task);
  }
});

// Adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Atualizar uma tarefa existente
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Tarefa não encontrada.' });
  } else {
    tasks[taskIndex].title = req.body.title || tasks[taskIndex].title;
    tasks[taskIndex].completed = req.body.completed || tasks[taskIndex].completed;

    res.json(tasks[taskIndex]);
  }
});

// Excluir uma tarefa
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);

  res.json({ message: 'Tarefa excluída com sucesso.' });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
