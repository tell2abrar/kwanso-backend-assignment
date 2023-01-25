export const isEmptyList = (list: any): boolean => {
  if (list && list.length !== 0) return false;
  else return true;
};

export const extractAuthToken = (token: string): string | null => {
  if (!token) {
    return null;
  }
  const splits = token.split(' ');
  if (splits.length < 2) {
    return null;
  }
  if (splits[0] != 'Bearer') {
    return null;
  }
  if (!splits[1]) {
    return null;
  }
  return splits[1];
};
