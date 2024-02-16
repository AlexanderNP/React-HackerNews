import { Link, useParams } from "react-router-dom"
import { useFetch } from "../../Hooks/useFetch"
import styles from './NewPage.module.css'
import { Button } from "../UI/Button"
import { convertDate } from "../../Utils/convertDate"
import { Comments } from "../Comments/Comments"

export function NewPage() {

  const { id } = useParams()

  const [error, loading, data, refresh] = useFetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)


  function refreshComments() {
    refresh()
  }

  let dateNews
  if (!loading) {
    dateNews = convertDate(data.time)
  }

  if (error) return <h1>Ошибка</h1>

  return (
    <>

      <Button stylesCustom={styles.link}>
        <Link to={'/'}>Назад</Link>
      </Button>

      {loading ?
        <span className={styles.loader}></span>
        :
        <div>

          <a href={data.url} className={styles.title}>{data.title}</a>

          <div className={styles.textBox}>

            <p>{dateNews}</p>

            <p>Автор: {data.by}</p>

          </div>

          <p className={styles.count}>Количество комментариев: {data.kids ? data.kids.length : 0}</p>

          {data.kids ? <Comments comments={data.kids} /> : null}

        </div>
      }

      <Button stylesCustom={styles.refreshButton} submit={refreshComments}>
        Обновить комментарии
      </Button>
    </>
  )
}