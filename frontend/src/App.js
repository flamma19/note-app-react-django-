import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";

function App() {
  return (
    // We should warp all Route and Routers elements in a Router element.
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />

          {/* all Route elements must be in Routes element. but Routes element should contain only Route element. */}
          <Routes>
            {/* we use exact down there cause this pattern is always true and it will be rendered everytime we go to other pages too.
          but we want to render it only when we go to exact address */}
            {/* element={<componentName />} is replaced component={componentName} */}
            <Route path="/" exact element={<NotesListPage />} />

            {/* we use dynamic parameters (:id) like we use it in django */}

            <Route path="/notes/:id" element={<NotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
