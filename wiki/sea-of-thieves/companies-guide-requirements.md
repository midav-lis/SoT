# Sea of Thieves Companies Guide — Requirements



- Sources: User conversation prompts (Untitled-2, Untitled-1), 2026-07-12

- Raw: [2026-07-12-companies-guide-requirements.md](../../raw/sea-of-thieves/2026-07-12-companies-guide-requirements.md); [2026-07-12-companies-guide-followup-requirements.md](../../raw/sea-of-thieves/2026-07-12-companies-guide-followup-requirements.md)

- Updated: 2026-07-12



## Context



The owner is new to Sea of Thieves (playing in 2026) and wants a beginner tutorial page focused on trading companies: which companies accept which loot, with real photos and tips. Delivery should be a portable HTML (or similar) file that transfers easily across computers and the internet without broken assets.



Related artifact: `sea-of-thieves-companies-guide.html` in the project root (**The Pirate's Ledger**).



## Product requirements



### Core content



- Cover trading companies that accept loot.

- Show real photos of each company (representatives / shops).

- Show example loot each company accepts.

- Include helpful beginner gameplay tips.

- Explain unfamiliar terms with images when text alone is unclear (e.g. **contraband**, **tavern** for Athena's Fortune).

- Include more loot examples per faction where coverage is thin.

- Add a **quests / voyages guide** (at least for Gold Hoarders types: buried treasure, riddle, treasure vault, etc.): describe each, estimated gold, what to do, difficulty, and tips.

- For map-related clues / outposts / spots: show how markers look on the map (real map pictures or examples) to help navigation.

- **Fight tips** page: which weapons to use against which enemies; recommended loadouts.

- **Pirate Emporium** page: what is worth buying for beginners (Ancient Coins).

- **Wind / sailing** page: how to tell wind direction.



### Loot presentation



- Sort loot **low → high** reward within each company.

- Show a **price** on every loot item.

- Whenever a game item is mentioned in tips or body text (e.g. "red Reaper emissary flag"), attach a real image on hover / preview — not only in loot grids.



### Interaction / UX



- Hovering a small loot/icon image should open a **larger preview** after a **short delay**.

- Replace one long scrolling landing page with **clickable section / page titles** (e.g. factions vs fight tips) so the reader can jump without endless scroll.

- Optimize for **very wide screens**: avoid large empty side backgrounds; use the horizontal space efficiently.



### Delivery



- Ship as a shareable, transferable single HTML (or equivalent) that works offline when moved between machines.



## Implementation status (verified 2026-07-12)



Delivered in `sea-of-thieves-companies-guide.html`:



| Requirement | Status |

|-------------|--------|

| Companies, loot photos, prices, hover previews | Done |

| Contraband / tavern explainers | Done |

| Sticky page nav (Home, Companies, Quests, Map, Fight, Emporium, Wind, Tips) | Done |

| Wide layout (`max-width` ~1600px+) | Done |

| Quests guide with gold / difficulty / tips | Done |

| Map table + clickable outposts + real in-game wiki images (no diagrams) | Done |

| Quests sorted easy→hard; dotted hover images on mentioned items | Done |

| Fight tips with real enemy + weapon photos | Done |

| Pirate Emporium buying guide | Done |

| How to read the wind | Done |


