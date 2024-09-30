# Create Archihect App CLI

Scaffold a new project with [Nextjs](https://nextjs.org/) and [Shadcn/UI](https://ui.shadcn.com/).

## Usage

To scaffold a new project, run the following command:

```bash
npx create-archiject-app my-app
# or
pnpm dlx create-archiject-app my-app
# or
yarn dlx create-archiject-app my-app
# or
bunx --bun create-archiject-app my-app
```

After running the above command, you will be prompted to select a theme based on [Shadcn/UI](https://ui.shadcn.com/themes). To select a theme, you need to choose a style and a color.

```bash
✔ Select a style (based of Shadcn/UI) > new-york
✔ Select a color (based of Shadcn/UI) > Neutral
```

If you want to use the default theme, you can use the `--default` or `-d` option.

```bash
npx create-archiject-app my-app -d
# or
pnpm dlx create-archiject-app my-app -d
# or
yarn dlx create-archiject-app my-app -d
# or
bunx --bun create-archiject-app my-app -d
```

**Note**: create-archiject-app will also implement dark mode feature by default. to disable dark mode, use the `--no-dark-mode` option.

## Options

To see the list of arguments and options available, run the following command:

```bash
npx create-archiject-app --help
# or
pnpm dlx create-archiject-app --help
# or
yarn dlx create-archiject-app --help
# or
bunx --bun create-archiject-app --help
```
