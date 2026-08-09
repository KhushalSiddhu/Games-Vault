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

    <text x="40" y="65"
          fill="white"
          opacity=".8"
          font-family="Arial"
          font-size="16"
          font-weight="bold">
      ${g.genre.toUpperCase()} • ${g.year}
    </text>

    <text x="40" y="285"
          fill="white"
          font-family="Arial"
          font-size="82"
          font-weight="900">
      ${g.mark}
    </text>

    <text x="40" y="345"
          fill="white"
          font-family="Arial"
          font-size="30"
          font-weight="900">
      ${g.title}
    </text>

    <rect x="40" y="365"
          width="210"
          height="3"
          fill="${g.accent}"/>

    <text x="40" y="395"
          fill="#ddd"
          font-family="Arial"
          font-size="11">
      GAMEVAULT ORIGINAL ARTWORK
    </text>
  </svg>`;

  return "data:image/svg+xml;charset=utf-8," +
         encodeURIComponent(svg);
}


function card(g) {
  return `
    <a class="card"
       href="game.html?id=${g.id}"
       style="--a:${g.accent}">

      <div class="pic">
        <img src="${art(g)}" alt="${g.title}">
        <button onclick="event.preventDefault()">♡</button>
      </div>

      <div>
        <small>${g.genre} • ${g.year}</small>

        <h3>${g.title}</h3>

        <span>★ ${g.rating}</span>

        <i>${g.developer}</i>
      </div>

    </a>
  `;
}


function home() {

  const grid = document.querySelector("#grid");

  if (!grid) return;

  const search = document.querySelector("#search");
  const genre = document.querySelector("#genre");
  const sort = document.querySelector("#sort");

  genre.innerHTML =
    '<option>All Genres</option>' +

    [...new Set(GAMES.map(g => g.genre))]
      .map(g => `<option>${g}</option>`)
      .join("");


  function render() {

    let q = search.value.toLowerCase();

    let games = GAMES.filter(g =>

      (genre.value === "All Genres" ||
       g.genre === genre.value)

      &&

      (g.title + " " +
       g.developer + " " +
       g.genre)
       .toLowerCase()
       .includes(q)

    );


    if (sort.value === "Rating") {

      games.sort((a,b) =>
        b.rating - a.rating
      );

    }


    if (sort.value === "A-Z") {

      games.sort((a,b) =>
        a.title.localeCompare(b.title)
      );

    }


    if (sort.value === "Release Date") {

      games.sort((a,b) =>
        b.year - a.year
      );

    }


    grid.innerHTML =
      games.map(card).join("");

  }


  search.oninput = render;
  genre.onchange = render;
  sort.onchange = render;

  render();
}


function detail() {

  const box =
    document.querySelector("#detail");

  if (!box) return;

  const id =
    new URLSearchParams(location.search)
      .get("id");

  const g =
    GAMES.find(x => x.id === id)
    || GAMES[0];


  box.innerHTML = `

    <section class="detail"
             style="--a:${g.accent}">

      <img src="${art(g)}"
           alt="${g.title}">

      <div>

        <small>
          ${g.genre} • ${g.year}
        </small>

        <h1>${g.title}</h1>

        <p>
          ${g.description}
        </p>

        <strong>
          ★ ${g.rating} &nbsp; EXCELLENT
        </strong>

      </div>

    </section>


    <section class="meta">

      <div>
        <b>RELEASE DATE</b>
        ${g.year}
      </div>

      <div>
        <b>DEVELOPER</b>
        ${g.developer}
      </div>

      <div>
        <b>PUBLISHER</b>
        ${g.publisher}
      </div>

      <div>
        <b>GENRE</b>
        ${g.genre}
      </div>

      <div>
        <b>PLATFORMS</b>
        ${g.platforms}
      </div>

    </section>


    <section class="tabs">

      OVERVIEW &nbsp;&nbsp;
      STORY &nbsp;&nbsp;
      GAMEPLAY &nbsp;&nbsp;
      FEATURES &nbsp;&nbsp;
      HISTORY &nbsp;&nbsp;
      GALLERY

    </section>


    <section class="info">

      <article>

        <h2>ABOUT THIS GAME</h2>

        <p>
          ${g.story}
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

        <p>◆ Released ${g.year}</p>

        <p>◆ ${g.developer}</p>

        <p>◆ ${g.genre} game</p>


        <h3>GAME MODES</h3>

        <p>
          ◉ ${g.modes}
        </p>

      </aside>

    </section>
  `;
}


home();
detail();
