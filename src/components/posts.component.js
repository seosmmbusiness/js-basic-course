import { Component } from "../core/component";
import { apiService, deletePostById } from "../service/api.service";
import { TransformService } from "../service/transform.service";
import { renderPost } from "../templates/post.template";

export class PostsComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }
  init() {
    this.$el.addEventListener("click", buttonHandler.bind(this));
  }
  async onShow() {
    this.loader.show();
    await getPosts.bind(this)();
    this.loader.hide();
  }
  onHide() {
    this.$el.innerHTML = "";
  }
}

async function buttonHandler(event) {
  const $el = event.target;
  const id = $el.dataset.id;
  const title = $el.dataset.title;

  if (id && title) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const possiblePost = favorites.find((p) => p.id === id);

    if (possiblePost) {
      $el.textContent = "Save to Favorites";
      $el.classList.add("button-primary");
      $el.classList.remove("button-danger");
      favorites = favorites.filter((p) => p.id !== id);
    } else {
      $el.classList.add("button-danger");
      $el.classList.remove("button-primary");
      $el.textContent = "Remove from Favorites";
      favorites.push({ id, title });
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
  if (id && !title) {
    this.loader.show();
    this.$el.innerHTML = "";
    await apiService.deletePostById(id);
    await getPosts.bind(this)();
    this.loader.hide();
  }
}

async function getPosts() {
  const fbData = await apiService.fetchPosts();
  let html = "<p>No posts found</p>";
  if (fbData) {
    const posts = TransformService.fbObjectToArray(fbData);
    html = posts
      .map((post) => renderPost(post, { withButton: true }))
      .join(" ");
  }
  this.$el.insertAdjacentHTML("afterbegin", html);
}
