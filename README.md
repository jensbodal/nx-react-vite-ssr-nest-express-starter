# NxReactViteSsrNestExpressStarter

## Generated base setup with

```
npx create-nx-workspace@latest nx-react-vite-ssr-nest-express-starter \
  --preset=apps \
  --packageManager=npm \
  --nxCloud=false

cd nx-react-vite-ssr-nest-express-starter

npm i -D @nrwl/nest @nrwl/react

npx nx g @nrwl/react:app web \
  --routing=true \
  --bundler=vite \
  --style=scss \
  --nxCloud=false

git add . && git commit -m "feat: add web app"

npx nx g @nrwl/nest:app api \
  --frontendProject=web

git add . && git commit -m "feat: add api app"
```
