# NxReactViteSsrNestExpressStarter

## Generated base setup with

```
npx create-nx-workspace@latest nx-react-vite-ssr-nest-express-starter \
  --preset=apps \
  --packageManager=npm \
  --nxCloud=false

cd nx-react-vite-ssr-nest-express-starter

npm i -D @nx/nest @nx/react

npx nx g @nx/react:app web \
  --routing=true \
  --bundler=vite \
  --style=scss \
  --nxCloud=false

git add . && git commit -m "feat: add web app"

npx nx g @nx/nest:app api \
  --frontendProject=web

git add . && git commit -m "feat: add api app"
```

## Adding vavite

Add `"type": "module"` to your `package.json` files

```
npm i -D @swc/core @types/express rollup-plugin-swc3 vavite
```

add `vite.config.ts` with the following: https://raw.githubusercontent.com/cyco130/vavite/main/examples/nestjs/vite.config.ts
