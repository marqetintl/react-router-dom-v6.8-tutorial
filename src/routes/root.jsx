export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React router contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input type="search" name="q" id="q" placeholder="Search" aria-label="Search contacts" />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite" />
          </form>

          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>

        <nav>
          <ul>
            <li>
              <a href="/contacts/1">Your name</a>
            </li>
            <li>
              <a href="/contacts/2">Your friend</a>
            </li>
          </ul>
        </nav>

        <div id="detail"></div>
      </div>
    </>
  );
}
