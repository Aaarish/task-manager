import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Base from './components/Base'
import Subtask from './components/Subtask'
import ViewTodo from './components/ViewTodo'
import AddTodoForm from './components/AddTodoForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Base />}>
          <Route path='' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='view/:todoId' element={<ViewTodo />} />
          <Route path='sub' element={<Subtask />} />
          <Route path='add' element={<AddTodoForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
