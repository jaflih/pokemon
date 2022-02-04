import {
  jest, expect, it, beforeEach, describe,
} from '@jest/globals';
import { Api } from '../src/modules/api.js';
import 'regenerator-runtime/runtime';
import { displayItems } from '../src/modules/app';

import '../src/modules/append_no_of_likes.js';

jest.mock('../src/modules/api.js');
jest.mock('../src/modules/append_no_of_likes.js');

const innerHtml = `
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
      </div>`;

describe('The counter', () => {
  document.body.innerHTML = innerHtml;
  beforeEach(() => {
    document.body.innerHTML = innerHtml;
  });

  const api = new Api();
  it('should mock the api', () => {
    expect(api.getDisplayItems()).resolves.toEqual([
      {
        url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/11.svg',
        id: 11,
      },
      {
        url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/12.svg',
        id: 12,
      },
      {
        url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/13.svg',
        id: 13,
      },
    ]);
  });

  it('should the value of (3) when displayItems is called', async () => {
    await displayItems();
    const displayList = document.querySelector('#display-items');
    expect(displayList.children.length).toBe(3);
    const count = document.querySelector('#count');
    expect(count.innerHTML).toBe('(3)');
  });
});
