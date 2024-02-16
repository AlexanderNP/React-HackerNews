import styles from './App.module.css'
import { NewPage } from './Components/NewPage/NewPage';
import { NewsList } from './Components/NewsList/NewsList';
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <div className={styles.App}>

      <p className={styles.title}>Новости</p>

      <Routes>
        <Route path='/' element={<NewsList />}></Route>
        <Route path='/news/:id' element={<NewPage />}></Route>
      </Routes>

    </div>
  );
}

export default App;
