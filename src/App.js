import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RouterPage from './component/router';

function App() {
  return (
    <Router>

      <Routes>
        {RouterPage.map((router, index) => {
          const Pages = router.component
          return (
            <Route
              key={index}
              path={router.path}
              element={
                    <Pages />
              }
            />
          )
          })
        }
        </Routes>
    </Router>
  );
}

export default App;
