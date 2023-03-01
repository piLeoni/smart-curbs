This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deployment

To deploy on gh-pages run:
```
yarn export && yarn deploy
```
Make sure that the *.nojekyll* file is present in the root folder on git in the branch *git-pages* or files in the *_next* folder will be ignored.

To simply generate a static version, modify the expected final url in *.env.production* and, if there is a basePath different than the root level, change it in *next.config.js*. Then run:
```
yarn export
```
The file will be located in the *out* folder.
