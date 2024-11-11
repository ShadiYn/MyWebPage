import { useState } from 'react';
import Router from '../src/app/Router'

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <>
        <Router userId={userId} setUserId={setUserId} />
       
    </>
  )
}

export default App
