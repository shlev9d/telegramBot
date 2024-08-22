const tg = window.Telegram.WebApp;
const useTelegram = () => {
  const onClose = () => {
    tg.close();
  };

  return {
    tg,
    user: tg.initDataUnsafe?.user,
    onClose,
  };
};

export { useTelegram };
