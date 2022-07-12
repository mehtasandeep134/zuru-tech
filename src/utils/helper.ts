/**
 *
 * @param name as string
 * @returns returns caps for AVATAR formation
 */

const avatarCapsProviders = (name: string) => {
  const [firstName, lastName] = typeof name === 'string' ? name.split(' ') : ['', ''];
  return firstName.at(0) + lastName.at(0);
};

/**
 *
 * @param none
 * @returns returns uuid new user's
 */

function create_UUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export { avatarCapsProviders, create_UUID };
