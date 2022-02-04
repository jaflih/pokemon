export class Api {
  POKEMON_URL = 'https://pokeapi-215911.firebaseapp.com/api/v2/pokemon';

  APP_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

  APP_NAME = 'Pokemon_Farid_Jihane';

  APP_ID = 'EtP7GW5T9AWxrJLgrSBm';

  COMMENT_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EtP7GW5T9AWxrJLgrSBm/comments';

  POCKEMON_COUNT = 0;

  #fetchPockemon = async (url) => {
    const result = {};
    const data = await (await fetch(url)).json();
    result.url = data.sprites.other.dream_world.front_default;
    result.id = data.id;
    result.name = data.name;
    result.height = data.height;
    result.weight = data.weight;
    return result;
  };

  NB_POKEMON_LOAD = 20;

  getDisplayItems = async () => {
    const promises = [];
    Array.from(Array(
      this.NB_POKEMON_LOAD,
    ).keys()).forEach(
      (i) => promises.push(this.getPokemonFromId(i + 1 + this.POCKEMON_COUNT)),
    );
    this.POCKEMON_COUNT += this.NB_POKEMON_LOAD;
    const items = await Promise.all(promises);
    return items;
  };

  getPokemonFromId = async (idPokemon) => {
    const data = await this.#fetchPockemon(`${this.POKEMON_URL}/${idPokemon}/`);
    return data;
  };

  getComments = async (idPokemon) => {
    const url = `${this.COMMENT_URL}?item_id=${idPokemon}`;
    return this.#fetchDataArray(url);
  };

  likeUrl = () => `${this.APP_URL}${this.APP_ID}/likes/`;

  #fetchDataArray = async (url) => {
    const response = await fetch(url);
    if ((response.status && response.status === 500) || response.status === 400) {
      return [];
    }

    const data = await response.json();
    return data.error ? [] : data;
  };

  getLikes = () => this.#fetchDataArray(this.likeUrl());

  like = async (id) => {
    const url = this.likeUrl();
    const obj = {
      item_id: id,
    };

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',

      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const text = await response.text();
    return text;
  };

  registerNewApp = async () => {
    const response = await fetch(this.APP_URL, {
      method: 'POST',
      body: JSON.stringify({
        name: this.APP_NAME,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.text();
    return data;
  };

  addComment = async (idPokemon, userName, userComment) => {
    const response = await fetch(`${this.COMMENT_URL}/`, {
      method: 'POST',
      body: JSON.stringify({
        item_id: idPokemon,
        username: userName,
        comment: userComment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.text();
    return data;
  };
}

const api = new Api();
export default api;
