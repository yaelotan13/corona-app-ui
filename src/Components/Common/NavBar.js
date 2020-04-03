import React from "react";

export const NavBar = ({links, id}) =>
  <nav className="nav" id={id}>
    {links.map(({href, children, target, id}) =>
    <a key={id} id={id} href={href} target={target}>{children}</a>)}
  </nav>
;