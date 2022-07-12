/**
 *
 * @param name as string
 * @returns returns caps for AVATAR formation
 */

const avatarCapsProviders = (name: string) => {
  const [firstName, lastName] = typeof name === 'string' ? name.split(' ') : ['', ''];
  return firstName.at(0) + lastName.at(0);
};

export { avatarCapsProviders };
