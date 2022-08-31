export function renderPost(post, options = {}) {
  const tag =
    post.type === "news"
      ? `<li class="tag tag-blue tag-rounded">News</li>`
      : `<li class="tag tag-rounded">Note</li>`;

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const possiblePost = favorites.find((p) => p.id === post.id);

  const deleteButton = `<button data-id="${post.id}" class="button-round button-small button-danger">Delete Post</button>`;

  const button = possiblePost
    ? `<button data-id="${post.id}" data-title="${post.title}" class="button-round button-small button-danger">Remove from Favorites</button>`
    : `<button data-id="${post.id}" data-title="${post.title}" class="button-round button-small button-primary">Save to Favorites</button>`;

  return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
          ${tag}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        ${options.withButton ? deleteButton : ""}
         ${options.withButton ? button : ""}
      </div>
    </div>
  `;
}
