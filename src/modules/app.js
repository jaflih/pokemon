import api from './api';
import { appendListItem } from './create_listhtml';
import likeListener from './like_listener';
import './comment';

import appendNoOFLikes from './append_no_of_likes';
import { appendCount } from './counter';
import { popupInit } from './popup';
import { selector, selectorAll } from './tools';

export const displayItems = async () => {
  const displayItems = await api.getDisplayItems();
  displayItems.forEach(appendListItem);
  appendCount();
  popupInit(api);
  likeListener();
  const likes = await api.getLikes();
  appendNoOFLikes(likes);
  selectorAll('img').forEach((element) => {
    element.style.opacity = '1';
  });
};

export const displayLess = async () => {
  if (api.POCKEMON_COUNT > 6) {
    api.POCKEMON_COUNT -= 6;
    const list = document.querySelectorAll('#display-items>li');

    Array.from(list)
      .slice(list.length - 6, list.length)
      .forEach((node) => node.remove());
    // appendCount();
  }
};

document.querySelector('#load-more').addEventListener('click', () => {
  displayItems();
});

function mqHandler(e) {
  if (e.matches) {
    selector('aside section').appendChild(selector('.comments-box'));
  } else {
    selector('.add-comment-form').appendChild(selector('.comments-box'));
  }
}

const mqLarge = window.matchMedia('(min-width : 1050px)');
mqLarge.addEventListener('change', mqHandler);

if (mqLarge.matches) {
  selector('aside section').appendChild(selector('.comments-box'));
} else {
  selector('.add-comment-form').appendChild(selector('.comments-box'));
}

window.onload = function () {
  setTimeout(() => {
    document.body.style.opacity = '100';
    selectorAll('img').forEach((element) => {
      element.style.opacity = '1';
    });
  }, 500);
};

export default displayItems;
