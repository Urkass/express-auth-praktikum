const COOKIE_NAME = 'parrotToken';

export const getCookie = (name = COOKIE_NAME) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

export const getHeaders = () => {
  const cookie = getCookie(COOKIE_NAME);
  if (cookie) {
    return {
      Authorization: cookie,
    }
  }
  return {}
};
