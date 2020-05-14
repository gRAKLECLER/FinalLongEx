const image = require("/asset/img/kyrie.jpg");

document.addEventListener("DOMContentLoaded", function () {
  class Model {
    constructor() {
      this.pages = [
        {
          title: "Homepage",
          url: "#",
          background: "red",
          content: `
						<div>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							<ul>
								<li>Lorem ipsum</li>
								<li>dolor sit</li>
								<li>amet consectetur</li>
							</ul>
						</div>
					`,
          dynamisme: () => {
            document.querySelector("ul").querySelector("li").innerText =
              "Ipsum Lorem";
          },
        },
        {
          title: "Players",
          url: "#player",
          background: "green",
          content: `
          <img src=${image} alt="player"/>
          `,
        },
        {
          title: "Test",
          url: "#test",
          background: "purple",
        },
      ];
    }

    getPageByUrl(url) {
      return this.pages.find((page) => page.url == url);
    }
  }

  class View {
    constructor(pages) {
      this.container = document.querySelector(".container");
      this.container.innerHTML = "";
      this.addHeader(pages);
    }

    run(dynamisme) {
      dynamisme();
    }

    addContent(content) {
      let contentContainer = document.createElement("div");
      contentContainer.classList.add("content");
      contentContainer.innerHTML = content;

      this.container.appendChild(contentContainer);
    }

    addHeader(pages) {
      pages.forEach((page) => {
        const pageButton = document.createElement("a");

        pageButton.style.cursor = "pointer";

        pageButton.innerText = page.title;

        this.container.appendChild(pageButton);

        pageButton.addEventListener("click", () => {
          location.hash = page.url;
        });
      });
    }

    changeTitle(text) {
      const title = document.createElement("h1");

      title.innerText = text;

      this.container.appendChild(title);
    }

    changeBackground(color) {
      this.container.style.background = color;
    }
  }

  function controller() {
    let data = new Model();

    const currentPage = data.getPageByUrl(location.hash || "#");

    let page = new View(data.pages);
    page.changeTitle(currentPage.title);
    page.changeBackground(currentPage.background);

    if (currentPage.content) {
      page.addContent(currentPage.content);
    }

    if (typeof currentPage.dynamisme === "function") {
      page.run(currentPage.dynamisme);
    }
  }

  window.addEventListener("hashchange", () => {
    controller();
  });

  controller();
});
