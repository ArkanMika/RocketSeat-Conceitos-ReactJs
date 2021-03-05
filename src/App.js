import React, { useState, useEffect } from "react"
import axios from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    axios.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const { data } = await axios.post('repositories', {
      title: `Novo Repositório - ${Date.now()}`,
      url: 'https://github.com/ArkanMika/RocketSeat-Conceitos-ReactJs',
      techs: ['ReactJs', 'Node'],
      like: 0
    })

    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    await axios.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repository => {
      return repository.id !== id
    }))
  }

  return (
    <>
      <button onClick={handleAddRepository}>Adicionar</button>

      <div data-testid="repository-list">
        {repositories.length > 0 &&
          <ul >
            {repositories.map(repository => {
              return <li key={repository.id}>{repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
              </li>
            })}
          </ul>
        }
      </div>
    </>)

}

export default App;
