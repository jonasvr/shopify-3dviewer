import Experience from './components/Experience'
import UIInterface from './components/UIInterface'

function App() {
  return (
    <>
      <div className="app-container">
        <div className="canvas-wrapper">
          <Experience />
        </div>
        <div className="ui-wrapper">
          <UIInterface />
        </div>
      </div>
    </>
  )
}

export default App
