import Session from '../models/session';

export async function verify(session_id: string) {
  if (await Session.exists({_id: session_id})) {
    return true;
  } else {
    return false;
  }
}

export async function getData(session_id: string) {
  const session = await Session.findById(session_id);
  return session.data;
}
