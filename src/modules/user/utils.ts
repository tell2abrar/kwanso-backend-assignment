import bcrypt from 'bcryptjs';

export const getHashedPassword = async (password: string) => {
  return bcrypt.hash(password, 12);
};
