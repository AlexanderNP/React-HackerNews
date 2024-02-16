import styles from './Button.module.css'

export function Button({ children, submit, stylesCustom }) {
  return (
    <button className={`${styles.button} ${stylesCustom}`} onClick={submit}>{children}</button>
  )
}