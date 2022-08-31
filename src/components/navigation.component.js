import { Component } from "../core/component";

export class NavigationComponent extends Component {
  constructor(id) {
    super(id);
    this.tabs = [];
  }
  init() {
    this.$el.addEventListener("click", tabClickHandler.bind(this));
  }
  registerTabs(tabs) {
    this.tabs = tabs;
  }
}

function tabClickHandler(event) {
  // remove default
  event.preventDefault();

  if (event.target.classList.contains("tab")) {
    // remove active from all tabs
    Array.from(this.$el.querySelectorAll(".tab")).forEach((tab) =>
      tab.classList.remove("active")
    );
    // add active to selected tab
    event.target.classList.add("active");

    // find tab with active component
    const activeTab = this.tabs.find(
      (t) => t.name === event.target.dataset.name
    );

    // hide all components
    this.tabs.forEach((tab) => tab.component.hide());

    // show current component
    activeTab.component.show();
  }
}
