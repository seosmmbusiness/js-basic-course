import { Component } from "../core/component";
import { apiService } from "../service/api.service";
import { renderPost } from "../templates/post.template";

export class FavoriteComponent extends Component {
  constructor(id, options) {
    super(id);
    this.loader = options.loader;
    this.favorites = [];
  }
  init() {
    this.$el.addEventListener("click", linkClickHandler.bind(this));
  }
  onShow() {
    this.favorites = JSON.parse(localStorage.getItem("favorites"));

    renderFavorites.bind(this)(this.favorites);
  }
  onHide() {
    this.$el.innerHTML = "";
  }
}

function renderList(list = []) {
  if (list && list.length) {
    return `
    <ul>
    ${list
      .map(
        (item) =>
          `<li><a href="#" data-id="${item.id}" class="js-link">${item.title}</a></li>`
      )
      .join(" ")}
    </ul>
    `;
  }

  return "<p class='center'>No favorites found</p>";
}

async function linkClickHandler(event) {
  event.preventDefault();

  if (event.target.classList.contains("js-link")) {
    const postId = event.target.dataset.id;
    this.$el.innerHTML = "";

    this.loader.show();
    const post = await apiService.fetchPostById(postId);

    if (post) {
      this.$el.insertAdjacentHTML(
        "afterbegin",
        renderPost(post, { withButton: false })
      );
    } else {
      alert(
        "The post was removed. Will automatically delete it from favorites"
      );

      this.favorites = this.favorites.filter((p) => p.id !== postId);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));

      renderFavorites.bind(this)(this.favorites);
    }

    this.loader.hide();
  }
}

function renderFavorites(favorites) {
  const html = renderList(favorites);
  this.$el.insertAdjacentHTML("afterbegin", html);
}
