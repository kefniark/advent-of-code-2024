# Advent of Code 2024

![](./advent-logo.jpg)

> Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any
> programming language you like.

I use this event as an opportunity to write some TS in deno, I'm a bit rusted and I haven't used it for a while ^^

## Run

```sh
deno task d{DAY}_p{PART}

# example
deno task d2-p1 # Day 2 - Part 1
```

Each day is a self contain folder with vanilla TS, no extra tooling, scripts or dependencies

## Previous Years

- [Advent of Code 2023 (Golang)](https://github.com/kefniark/advent-of-code-2023)
- [Advent of Code 2022 (Golang)](https://github.com/kefniark/advent-of-code-2022)

## Developer environment

The project is really simple to provision (with just `deno@2.x`), but I also provides alternative way to get started. To ensure a
reproducible environment between machines and CI, use one of the following:

- [Devbox](https://www.jetify.com/devbox) (nix):
  - [Install devbox](https://www.jetify.com/docs/devbox/installing_devbox/)
  - Run `devbox shell` (or use direnv for auto IDE setup)
- [Devcontainer](https://code.visualstudio.com/docs/devcontainers/containers) (docker):
  - Install devcontainer to your IDE (provided by default in VSCode)
  - Click on Open a Remote Window (bottom left icon) > Reopen in container

## Caution

Please don't use these answers as a way to cheat, those are puzzle made for entertainment.

To quote the official FAQ:

> Please try to avoid giving away the solution while people are competing. If a puzzle's global daily leaderboard isn't full yet and you're
> likely to get points, please wait to stream/post your solution until after that leaderboard is full.

## Copyright

> Advent of Code is a registered trademark in the United States. The design elements, language, styles, and concept of Advent of Code are
> all the sole property of Advent of Code and may not be replicated or used by any other person or entity without express written consent of
> Advent of Code. Copyright 2015-2024 Advent of Code. All rights reserved.
