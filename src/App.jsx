import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { useSwipeable } from 'react-swipeable';

import { useTelegram } from './hooks/useTelegram';
import { useGetZodiac } from './hooks/useGetZodiac';

import { Header } from './components/Header';

import styles from './styled.module.css';
import { LANG } from './constants/languages';

const App = () => {
  const { tg, onClose, user } = useTelegram();

  const [language, setLanguage] = useState(
    user?.language_code === LANG.RU ? LANG.RU : LANG.EN
  );

  const { error, zodiac, loading } = useGetZodiac({ language });
  const handlers = useSwipeable({
    onSwipedRight: () => onClose(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    tg.ready();
    tg.MainButton.text = user?.language_code === LANG.RU ? 'Назад' : 'Back';
    tg.MainButton.show();
  }, [tg, user?.language_code]);

  useEffect(() => {
    tg.MainButton.onClick(() => {
      onClose();
    });
    return () => {
      tg.MainButton.offClick();
    };
  }, [tg, onClose]);

  if (error) {
    return (
      <div {...handlers} className={styles.wrapper}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div {...handlers} className={styles.wrapper}>
      <Header
        zodiac={zodiac}
        language={language}
        setLanguage={setLanguage}
        loading={loading}
      />
      <main className={`${styles.main} ${loading ? styles.loaderWrapper : ''}`}>
        {loading ? <Loader /> : <p>{zodiac?.horoscope}</p>}
      </main>
    </div>
  );
};

export { App };
