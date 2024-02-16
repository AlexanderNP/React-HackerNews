import { CommentsItem } from "../CommentsItem/CommentsItem";
import styles from './Comments.module.css'

export function Comments({ comments }) {

  let row = [];

  for (let i = 0; i < comments.length; i++) {
    row.push(<CommentsItem commentId={comments[i]} key={comments[i]} />);
  }

  return (
    <ul className={styles.commentList}>
      {row}
    </ul>
  )
}