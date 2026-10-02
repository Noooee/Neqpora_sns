const postInput = document.getElementById("postInput");
const postButton = document.getElementById("postButton");
const charCount = document.getElementById("charCount");

const feed = document.getElementById("feed");

const postModal = document.getElementById("postModal");
const openPostButton = document.getElementById("openPostButton");
const closePostButton = document.getElementById("closePostButton");

const modalPostInput =
  document.getElementById("modalPostInput");

const modalPostButton =
  document.getElementById("modalPostButton");

const modalCharCount =
  document.getElementById("modalCharCount");


/* =========================
   CHARACTER COUNTER
========================= */

function updateCounter(input, counter, button) {

  const length = input.value.length;

  counter.textContent = `${length} / 500`;

  button.disabled = length === 0;
}


/* MAIN COMPOSER */

postInput.addEventListener("input", () => {

  updateCounter(
    postInput,
    charCount,
    postButton
  );

});


/* MODAL COMPOSER */

modalPostInput.addEventListener("input", () => {

  updateCounter(
    modalPostInput,
    modalCharCount,
    modalPostButton
  );

});


/* =========================
   CREATE POST
========================= */

function createPost(text) {

  const article =
    document.createElement("article");

  article.className = "post";

  article.innerHTML = `

    <div class="post-avatar">

      <span class="avatar">
        N
      </span>

    </div>


    <div class="post-body">

      <div class="post-header">

        <strong>
          ねくぽらユーザー
        </strong>

        <span class="verified">
          ✓
        </span>

        <span class="username">
          @neqpora
        </span>

        <span class="post-time">
          · たった今
        </span>

        <button class="post-more">
          ⋯
        </button>

      </div>


      <div class="post-text"></div>


      <div class="post-actions">

        <button>
          💬
          <span>0</span>
        </button>

        <button>
          🔁
          <span>0</span>
        </button>

        <button class="like-button">
          ♡
          <span>0</span>
        </button>

        <button>
          🔖
        </button>

        <button>
          ↗
        </button>

      </div>

    </div>

  `;

  const textElement =
    article.querySelector(".post-text");

  textElement.textContent = text;


  /* 一番上に追加 */

  feed.prepend(article);


  /* いいねボタン */

  const likeButton =
    article.querySelector(".like-button");

  likeButton.addEventListener(
    "click",
    () => {

      const count =
        likeButton.querySelector("span");

      const liked =
        likeButton.dataset.liked === "true";

      if (liked) {

        likeButton.dataset.liked = "false";

        likeButton.firstChild.textContent = "♡";

        count.textContent =
          Math.max(
            0,
            Number(count.textContent) - 1
          );

      } else {

        likeButton.dataset.liked = "true";

        likeButton.firstChild.textContent = "♥";

        count.textContent =
          Number(count.textContent) + 1;

      }

    }
  );

}


/* =========================
   MAIN POST
========================= */

postButton.addEventListener(
  "click",
  () => {

    const text =
      postInput.value.trim();

    if (!text) return;


    createPost(text);


    postInput.value = "";

    updateCounter(
      postInput,
      charCount,
      postButton
    );

  }
);


/* =========================
   MODAL
========================= */

openPostButton.addEventListener(
  "click",
  () => {

    postModal.classList.add("open");

    setTimeout(() => {
      modalPostInput.focus();
    }, 50);

  }
);


closePostButton.addEventListener(
  "click",
  () => {

    postModal.classList.remove("open");

  }
);


postModal.addEventListener(
  "click",
  (event) => {

    if (
      event.target === postModal
    ) {

      postModal.classList.remove("open");

    }

  }
);


/* MODAL POST */

modalPostButton.addEventListener(
  "click",
  () => {

    const text =
      modalPostInput.value.trim();

    if (!text) return;


    createPost(text);


    modalPostInput.value = "";

    updateCounter(
      modalPostInput,
      modalCharCount,
      modalPostButton
    );


    postModal.classList.remove("open");

  }
);


/* =========================
   ESCAPE
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      postModal.classList.remove("open");

    }

  }
);


/* =========================
   DEMO LIKE BUTTONS
========================= */

document
  .querySelectorAll(".like-button")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const count =
          button.querySelector("span");

        const liked =
          button.dataset.liked === "true";

        if (liked) {

          button.dataset.liked = "false";

          button.firstChild.textContent = "♡";

          count.textContent =
            Math.max(
              0,
              Number(count.textContent) - 1
            );

        } else {

          button.dataset.liked = "true";

          button.firstChild.textContent = "♥";

          count.textContent =
            Number(count.textContent) + 1;

        }

      }
    );

  });


/* =========================
   API TEST
========================= */

async function checkAPI() {

  try {

    const response =
      await fetch("/api/hello");

    const data =
      await response.json();

    console.log(
      "Neqpora API:",
      data
    );

  } catch (error) {

    console.error(
      "API connection error:",
      error
    );

  }

}

checkAPI();
