import {
  jest, expect, it, beforeEach, describe,
} from '@jest/globals';
import 'regenerator-runtime/runtime';
import { Api } from '../src/modules/api.js';
import { displayItems } from '../src/modules/app';
import '../src/modules/append_no_of_likes.js';

jest.mock('../src/modules/api.js');

jest.mock('../src/modules/append_no_of_likes.js');

describe('The comment counter', () => {
  const dom = `
  <span id="count"></span>
  <section class="centered-column">
          <ul id="display-items">
          </ul>
      </section>

        <div class="popup-modal popup-hidden">
        <div class="popup-datas">
          <div class="popup-close">
            <img src="close_popup.png" class="close_popup" alt="close popup" />
          </div>
          <div class="popup-image">
            <img class="pokemon-image" id="pokemon_image" src="#" alt="pokemon picture" />
          </div>
          <div class="popup-pokemon">
            <h3 id="pokemon_name">pokemon_name</h3>
            <ul class="pokemon-characteristics">
              <li>Height : <span id="pokemon_height"></span></li>
              <li>Weight : <span id="pokemon_weight"></span></li>
            </ul>
            <h3>Comments <span id="nb-comments"></span></h3>
            <ul class="pokemon-comments"></ul>
            <h3>Add a comment</h3>
            <form id="add-comment">
              <input type="hidden" name="idPokemon" id="idPokemon" />
              <input name="username" placeholder="Your name" />
              <textarea name="comment" cols="30" rows="10" placeholder="Your insights"></textarea>
              <button type="submit">Comment</button>
            </form>
          </div>
        </div>
      </div>
  `;

  document.body.innerHTML = dom;
  beforeEach(() => {
    document.body.innerHTML = dom;
  });

  it('should mock the api', async () => {
    const api = new Api();
    const comments = await api.getComments(5);
    expect(comments).toEqual([
      {
        comment: 'This is my favorite pokemon.',
        username: 'Noemi',
        creation_date: '2022-02-02',
      },
    ]);
  });

  it('should the value of (1) when displayItems is called', async () => {
    await displayItems();
    await await document.querySelector('button[id^="comment-"]').click();
    expect(document.querySelector('#nb-comments').innerHTML).toEqual('(1)');
    expect(document.querySelector('.pokemon-comments').children.length).toEqual(1);
  });
});
