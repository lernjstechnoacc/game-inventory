<div align="center">
<img src="https://rishavanand.github.io/static/images/greetings.gif" align="center" style="width: 100%" />
</div>

# Game-inventory on React | TypeScript

This is a simple in-game inventory prototype where you can craft and collect items taken from the in-game store. It is possible to expand the number of items, also use one item to craft different items

### Authors

---

- Of cource me
- ✨And my stupid idea ✨

### Contributing

---

:tw-1f432: My inspiration and simply mega senior JavaScript engineer `VladOps`

## Installation

Install my-project with npm

```bash
  npm install
 yarn start
```

### About structure

The project is divided into two parts: View (components) and Core (project logic).

:tw-1f428: **View** (`src/components`):
A simple template is written in React, where each entity has its own component. Drag and drop functionality and CSS styles are written using Tailwind.

:tw-1f428: **Core** (`src/components`):
The project logic is written in classes with TypeScript type safety and is built in useBuildLogic upon project launch. The project logic is divided into the following parts:

- **Store**: a simple class that stores all existing items.
- **Wallet**: a simple class with two fields, currency type and amount, which monitors inventory changes (adding or removing items) through an observer and changes the amount of coins based on the operation.
- **Craft platform**: the main class for crafting, dismantling, modifying, and creating items, which through an observer monitors the inventory and attempts to craft or dismantle the required item upon adding a new item or performing other operations.
- **Adjacent Matrix**: the main system for finding the required item for crafting and the ability to craft, which is implemented on graphs.
- **Item Factory**: a simple factory for creating items.

## Connect with me

<div align="center">
<a href="https://github.com/marohovsky" target="_blank">
<img src=https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white alt=github style="margin-bottom: 0px;" />
</a>

<a href="https://www.linkedin.com/in/vladimir-marohovsky-4aa763264/" target="_blank">
<img src=https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin style="margin-bottom: 0px;" />
</a>

</div>
