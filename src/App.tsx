import { useState } from 'react'
import './App.css'
import { Application } from './components/Application'
import Greet from './components/Greet'
import { Skills } from './components/Skills'
import TodoApp from './components/TodoApp'
import { Counter } from './components/Counter'

function App() {
  const [viewComponents, setViewComponents] = useState({
    todo: false,
    greet: false,
    application: false,
    skills: false,
    counter: true
  })

  const toggleView = (component: keyof typeof viewComponents) => {
    setViewComponents(prevState => ({ ...prevState, [component]: !prevState[component] }))
  }

  return (
    <div className='bg-black text-white h-screen flex flex-col items-center justify-center w-screen space-y-2' data-testid="main-container">
      <h1 className='text-red-500 text-2xl'>Todo App</h1>
      {viewComponents.todo && <TodoApp />}
      {viewComponents.greet && <Greet name='Habibulloh' />}
      {viewComponents.application && <Application />}
      {viewComponents.skills && <Skills skills={["React", "Vue", "Angular"]} />}
      {viewComponents.counter && <Counter />}
      <div className='flex items-center gap-3'>
        {Object.keys(viewComponents)?.map(component => (
          <button
            key={component}
            className='border-white p-1 border rounded-md'
            onClick={() => toggleView(component as keyof typeof viewComponents)}
          >
            View {component}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App