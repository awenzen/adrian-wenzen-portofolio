# Adrian Wenzen — Portfolio

A Minecraft-style portfolio matching the layout and visual language of [rayyanhai.dev](https://rayyanhai.dev), personalized with Adrian's supplied résumé. No framework, dependencies, or build-time network access required.

## Run locally

```sh
npm run dev
```

Open http://localhost:5173. Requires Node.js 18 or newer.

## Build

```sh
npm run build
npm run preview
```

`dist/` is the complete static site. Configure the host to rewrite unknown paths to `index.html` for client-side routes. No hosting or deployment has been performed.

## Content

Edit `data.js` for experience, project details, links, and skills. About and blog copy is in `app.js`; styling is in `styles.css`. The provided résumé is available at `/resume.pdf`. The About portrait is Adrian’s supplied photograph (`public/adrian-wenzen.jpg`). Experience roles and dates follow Adrian’s LinkedIn profile; engineering details draw on his résumé and existing project material.

## Interactions

- Searchable project list, selection, project detail routes, and GitHub actions.
- Skills categories with keyboard navigation.
- About profile, contact dialog, and résumé link.
- Sound on by default, volume controls, reduced-motion setting, and persistent local preferences. Browsers that block autoplay begin music on the first interaction.
- Uses only the exact `menu-music.mp3` from https://rayyanhai.dev/audio/menu-music.mp3 on repeat. Its source URL and SHA-256 are recorded in `public/music-source.json`. Options → Restart Song restarts the same track. Audio focus prevents two portfolio tabs from playing at once.
- Browser Back/Forward and direct links to each page.

## Asset provenance

The panorama, Minecraft fonts, button textures, UI item artwork, and button sound were retrieved from the public reference site for the requested visual recreation. Background music uses only the reference site’s exact `menu-music.mp3`; other downloaded tracks are excluded from Git. Adrian's title artwork was created for this portfolio, and the About portrait was supplied by Adrian. The reference owner's personal logo, portrait, biography, and projects are not included. The visual theme is inspired by Minecraft; this is not an official Minecraft product and is not associated with Mojang or Microsoft.
