import { useState } from "react";
import { useFetch } from "../../Hooks/useFetch"
import { convertDate } from "../../Utils/convertDate";
import styles from './CommentsItem.module.css';

export function CommentsItem({ commentId }) {


  const [error, loading, data, refresh] = useFetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`);

  const [showReplies, setShowReplies] = useState(false);

  function handleToggleReplies() {
    setShowReplies(!showReplies);
  }


  function refreshComments() {
    refresh();
  }


  if (!loading) {
    let timer = null;
    clearTimeout(timer);
    timer = setTimeout(() => refreshComments(), 60000);
  }

  let commentDate
  if (!loading) {
    commentDate = convertDate(data.time);
  }

  if (error) return <h1>Ошибка</h1>

  return (
    <>
      {loading ?
        <div className={styles.loader}></div>
        :
        <li className={styles.itemContain}>

          <div className={styles.textBox}>
            <p>Автор: <span>{data.by}</span></p>
            <p>Время: <span>{commentDate}</span></p>
          </div>

          <p className={styles.textComment}>{data.text}</p>

          {data.kids && data.kids.length > 0 && (
            <button className={styles.button} onClick={handleToggleReplies}>
              {showReplies ? 'Скрыть комментарии' : 'Показать комментарии'}
            </button>
          )}

          {showReplies && data.kids &&
            <div className={styles.repliesWrapper}>

              {data.kids.map((kid) =>
                <CommentsItem key={kid.id} commentId={kid} />
              )}

            </div>
          }
        </li>
      }

    </>
  )
}