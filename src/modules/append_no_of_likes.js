const appendNoOFLike = (id, likeNumber) => {
  document.querySelector(`#likes-${id}`).innerHTML = `${likeNumber}`;
};

const appendNoOFLikes = (likesArray = []) => {
  document.querySelectorAll('.like').forEach((node) => {
    const id = node.id.match(/\d+/)[0];
    const obj = likesArray.find((obj) => obj.item_id === id);
    if (obj) {
      const { likes } = obj;
      appendNoOFLike(id, likes);
    }
  });
};

export default appendNoOFLikes;
