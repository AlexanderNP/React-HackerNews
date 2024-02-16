import styles from './NewsList.module.css'
import { NewsItem } from "../NewsItem/NewsItem"
import { useFetch } from '../../Hooks/useFetch'
import { Button } from '../UI/Button';

export function NewsList() {

  const [error, loading, data, refresh] = useFetch('https://hacker-news.firebaseio.com/v0/newstories.json');

  

  function refreshNews() {
    refresh()
  }

  if (!loading) {
    let timer = null
    clearTimeout(timer)
    timer = setTimeout(() => refreshNews(), 60000)
  }

  let row = []

  if(!loading){
    for (let i = 0; i < 50; i++) {
      row.push(<NewsItem newsItemId={data[i]} key={data[i]} path={`/news/${data[i]}`} />)
    }
  }

  if (error) return <h1>Ошибка</h1>

  return (
    <>
      <ul className={styles.newsList}>
        {loading ?
          <span className={styles.loader}></span>
          :
          row}
      </ul>

      <Button submit={refreshNews} stylesCustom={styles.buttonApp}>Обновить новости</Button>
    </>
  )
}