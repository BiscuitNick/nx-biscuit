import styles from './biscuit-words.module.css';

/* eslint-disable-next-line */
export interface BiscuitWordsProps {}

function BiscuitWords(props: BiscuitWordsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BiscuitWords!</h1>
    </div>
  );
}

export { BiscuitWords };
