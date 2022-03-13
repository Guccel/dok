//# imports
import User from '../models/user';

//# exports
export async function getUserData(_id: string, keysArray: Array<string>): Promise<object> {
  let projectionObject = {};
  for (let keyIndex = 0; keyIndex < keysArray.length; keyIndex++) {
    const key = keysArray[keyIndex];
    projectionObject = { ...projectionObject, [key]: 1 };
  }

  return User.findById(_id, projectionObject);
}

console.log('asdf');
