import axios from 'axios';

import { API_URL } from '../constants/apiUrl';
import { LANG, LANG_REQUEST } from '../constants/languages';

const getZodiac = async (sign, language) => {
  try {
    const { data } = await axios.post(API_URL, {
      sign: sign,
      language: language === LANG.RU ? LANG_REQUEST.RU : LANG_REQUEST.EN,
      period: 'today',
    });
    return data;
  } catch (error) {
    throw new Error(
      language === LANG.RU
        ? 'На данный момент сервис недоспутен, повторите попытку попозже'
        : 'The service is temporarily unavailable, please try again later'
    );
  }
};

export { getZodiac };
