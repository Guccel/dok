import { browser } from '$app/env';

function getBrowserItem(key) {
  if (browser) {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  }
  return null;
}

function setBrowserItem(key, value){
  if(browser){
    localStorage.setItem(key, value)
  }
}

export async function post(fetch, url, body){
  
}