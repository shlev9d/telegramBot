import { useEffect, useState } from 'react';

import { getZodiac } from '../api/getZodiac';

import { LANG } from '../constants/languages';

const useGetZodiac = ({ language }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [zodiac, setZodiac] = useState(null);

  const queryParams = new URLSearchParams(window.location.search);
  const sign = queryParams.get('sign');

  useEffect(() => {
    const fetchData = async (sign) => {
      setLoading(true);
      try {
        const data = await getZodiac(sign, language);
        setZodiac(data);
      } catch (error) {
        setError(
          language === LANG.RU
            ? 'На данный момент сервис недоспутен, повторите попытку попозже'
            : 'The service is temporarily unavailable, please try again later'
        );
      } finally {
        setLoading(false);
      }
    };
    if (sign) {
      fetchData(sign);
    }
  }, [language, sign]);

  return {
    zodiac,
    loading,
    error,
  };
};

export { useGetZodiac };
