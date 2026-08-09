function art(g) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#05050b"/>
        <stop offset=".55" stop-color="${g.accent}"/>
        <stop offset="1" stop-color="#090711"/>
      </linearGradient>
      <radialGradient id="glow">
        <stop stop-color="${g.accent}" stop-opacity=".7"/>
        <stop offset="1" stop-color="${g.accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="800" height="420" fill="url(#bg)"/>
    <circle cx="650" cy="100" r="230" fill="url(#glow)"/>
    <circle cx="120" cy="370" r="190" fill="${g.accent}" opacity=".12"/>

    <path d="M0 330 Q180 220 350 330 T800 290 V420 H0Z"
          fill="#000" opacity=".5"/>

    <text x="40" y="65" fill="white"
          font-family="Arial" font-size="16"
          font-weight="bold">
      ${g.genre.toUpperCase()} • ${g.year}
    </text>

    <text x="40" y="285" fill="white"
          font-family="Arial" font-size="82"
          font-weight="900">
      ${g.mark}
    </text>

    <text x="40" y="345" fill="white"
          font-family="Arial" font-size="30"
          font-weight="900">
      ${g.title}
    </text>

    <rect x="40" y="365"
          width="210" height="3"
          fill="${g.accent}"/>

    <text x="40" y="395" fill="#ddd"
          font-family="Arial" font-size="11">
      GAMEVAULT ORIGINAL ARTWORK
    </text>
  </svg>`;

  return "data:image/svg+xml;charset=utf-8," +
         encodeURIComponent(svg);
}


function createCard(game) {

  return `
    <a class="card"
       href="game.html?id=${game.id}"
       style="--a:${game.accent}">

      <div class="pic">

        <img
          src="${art(game)}"
          alt="${game.title}"
        >

        <button
          onclick="event.preventDefault()">
          ♡
        </button>

      </div>

      <div>

        <small>
          ${game.genre} • ${game.year}
        </small>

        <h3>${game.title}</h3>

        <span>
          ★ ${game.rating}
        </span>

        <i>
          ${game.developer}
        </i>

      </div>

    </a>
  `;
}


function setupHome() {

  const grid = document.getElementById("grid");

  if (!grid) return;


  const search =
    document.getElementById("search");

  const genre =
    document.getElementById("genre");

  const sort =
    document.getElementById("sort");


  /* Fill genre menu */

  const genres =
    [...new Set(
      GAMES.map(game => game.genre)
    )];


  genre.innerHTML =
    `<option value="All Genres">
      All Genres
    </option>` +

    genres.map(g =>
      `<option value="${g}">
        ${g}
      </option>`
    ).join("");


  /* Display games */

  function displayGames() {

    const query =
      search.value.trim().toLowerCase();

    const selectedGenre =
      genre.value;


    let results =
      GAMES.filter(game => {

        const text =
          (
            game.title +
            " " +
            game.developer +
            " " +
            game.genre +
            " " +
            game.year
          ).toLowerCase();


        const matchesSearch =
          text.includes(query);


        const matchesGenre =
          selectedGenre === "All Genres" ||
          game.genre === selectedGenre;


        return matchesSearch &&
               matchesGenre;
      });


    /* Sorting */

    if (sort.value === "Rating") {

      results.sort(
        (a,b) => b.rating - a.rating
      );

    } else if (sort.value === "A-Z") {

      results.sort(
        (a,b) =>
          a.title.localeCompare(b.title)
      );

    } else {

      results.sort(
        (a,b) => b.year - a.year
      );
    }


    /* Show result */

    if (results.length === 0) {

      grid.innerHTML = `
        <div style="
          grid-column:1/-1;
          padding:50px;
          text-align:center;
          color:#aaa;
        ">
          <h2>No games found</h2>
          <p>
            Try another game name or genre.
          </p>
        </div>
      `;

      return;
    }


    grid.innerHTML =
      results.map(createCard).join("");
  }


  /* Search */

  search.addEventListener(
    "input",
    displayGames
  );


  /* Genre */

  genre.addEventListener(
    "change",
    displayGames
  );


  /* Sort */

  sort.addEventListener(
    "change",
    displayGames
  );


  /* Initial games */

  displayGames();
}


/* Game detail page */

function setupDetail() {

  const box =
    document.getElementById("detail");

  if (!box) return;


  const id =
    new URLSearchParams(
      window.location.search
    ).get("id");


  const game =
    GAMES.find(
      g => g.id === id
    ) || GAMES[0];


  box.innerHTML = `

    <section
      class="detail"
      style="--a:${game.accent}"
    >

      <img
        src="${art(game)}"
        alt="${game.title}"
      >

      <div>

        <small>
          ${game.genre} • ${game.year}
        </small>

        <h1>
          ${game.title}
        </h1>

        <p>
          ${game.description}
        </p>

        <strong>
          ★ ${game.rating}
          &nbsp; EXCELLENT
        </strong>

      </div>

    </section>


    <section class="meta">

      <div>
        <b>RELEASE DATE</b>
        ${game.year}
      </div>

      <div>
        <b>DEVELOPER</b>
        ${game.developer}
      </div>

      <div>
        <b>PUBLISHER</b>
        ${game.publisher}
      </div>

      <div>
        <b>GENRE</b>
        ${game.genre}
      </div>

      <div>
        <b>PLATFORMS</b>
        ${game.platforms}
      </div>

    </section>


    <section class="tabs">
      OVERVIEW
      &nbsp;&nbsp;
      STORY
      &nbsp;&nbsp;
      GAMEPLAY
      &nbsp;&nbsp;
      FEATURES
      &nbsp;&nbsp;
      HISTORY
      &nbsp;&nbsp;
      GALLERY
    </section>


    <section class="info">

      <article>

        <h2>ABOUT THIS GAME</h2>

        <p>
          ${game.story}
        </p>


        <h2>GAMEPLAY</h2>

        <p>
          Explore the world, master the core
          systems, discover secrets and develop
          your own play style.
        </p>


        <div class="boxes">

          <b>
            ◈
            <small>EXPLORE</small>
          </b>

          <b>
            ⚔
            <small>PLAY</small>
          </b>

          <b>
            ✦
            <small>DISCOVER</small>
          </b>

          <b>
            ♧
            <small>CREATE</small>
          </b>

        </div>

      </article>


      <aside>

        <h3>QUICK FACTS</h3>

        <p>
          ◆ Released ${game.year}
        </p>

        <p>
          ◆ ${game.developer}
        </p>

        <p>
          ◆ ${game.genre} game
        </p>


        <h3>GAME MODES</h3>

        <p>
          ◉ ${game.modes}
        </p>

      </aside>

    </section>
  `;
}


/* Start */

setupHome();
setupDetail();
