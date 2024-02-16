import { Link } from 'react-router-dom'
import { useFetch } from '../../Hooks/useFetch'
import styles from './NewsItem.module.css'
import { convertDate } from '../../Utils/convertDate'

export function NewsItem({ newsItemId, path }) {

  const [error, loading, data] = useFetch(`https://hacker-news.firebaseio.com/v0/item/${newsItemId}.json`)


  let dateNews
  if (!loading) {
    dateNews = convertDate(data.time)
  }

  if (error) return <h1>Ошибка</h1>

  return (
    <>
      {loading ? <span className={styles.loader}> </span> :

        <li className={styles.newsItem} >
          
            <Link to={path}>
              <p className={styles.title}>{data.title}</p>
              <p className={styles.author}>{data.by}</p>
              <div className={styles.boxText}>
                <p>Рейтинг: {data.score}</p>
                <p>{dateNews}</p>
              </div>
            </Link>

        </li>}
    </>
  )
}