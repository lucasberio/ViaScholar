import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import ScholarshipCard, { Scholarship } from '../ui/ScholarshipCard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="scholarship-entry">
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onSave={handleSaveScholarship}
              onApply={handleApplyScholarship}
            />

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
