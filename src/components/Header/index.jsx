import { LANG } from '../../constants/languages';

import { zodiacsEN, zodiacsRU } from '../../utils/zodiacs';

import styles from './styled.module.css';

const Header = ({ zodiac, language, setLanguage, loading }) => {
  const formattedDate = new Intl.DateTimeFormat(
    language === LANG.RU ? 'ru-RU' : 'en-US',
    {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  ).format(new Date());

  return (
    <header className={styles.header}>
      {loading ? (
        <h3>{language === LANG.RU ? 'Загрузка...' : 'Loading...'}</h3>
      ) : (
        <h3>
          {language === LANG.RU
            ? zodiacsRU[zodiac?.sign]
            : zodiacsEN[zodiac?.sign]}{' '}
          - {formattedDate}
        </h3>
      )}
      <div className={styles.buttons}>
        <button
          onClick={() => setLanguage(LANG.RU)}
          className={language === LANG.RU ? styles.active : ''}
        >
          RU
        </button>
        <button
          onClick={() => setLanguage(LANG.EN)}
          className={language !== LANG.RU ? styles.active : ''}
        >
          EN
        </button>
      </div>
    </header>
  );
};

export { Header };
