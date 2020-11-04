<h1 align="center">Welcome to Forty-Two 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/Haswf/COMP30022FrontEndDev" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>


> This repository contains source code for frontend webpage of Forty-Two e-portfolio platform.
> This project is built for IT Project at The University of Melbourne. 

### 🏠 [Homepage](https://eportfolio.tech/)

## Dependencies

- `Node.js` 12.12.54

## Getting started

You can view a live demo over at https://eportfolio.tech/

To get the frontend running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server (this project uses create-react-app)

Local web server will use React standard port 3000, if you wish to change the port to avoid potential conflicts, depending on which endpoint you want to use, (i.e. dev or prod), simply change the **.env.dev** or **.env.prod**, by adding one line, for example `PORT=3001`, and run `npm start`.

### Making requests to the backend API

For convenience, we have a live API server running at https://dev.eportfolio.tech/api/ for the application to make requests against. You can view [the API spec here](https://dev.eportfolio.tech/api/swagger-ui.html) which contains all routes & responses for the server.

The source code for the backend server can be found in the [main Forty-Two repo](https://github.com/eportfolio-tech/server).

If you want to change the API URL to a local server, simply edit `src/utils/axios.js` and change `devEnvironment` to the local server's URL (i.e. `http://localhost:8090/`)

## Testing

This project has implemented some unit testing for page rendering.

​	run `npm run test`

## Repository Structure

The following outlines structure of the repository with description.

```
.
├── .travis.yml: TravisCI confidurations
├── .env: contains global environment variables
├── .env.dev: contains environment variables for development environment
├── .env.prod: contains environment variables for production environment
├── public: contains the public files
├── readme.md
├── package.json: NodeJS app configurations
├── tsconfig.json: Typescript configurations
└── src: source code
    ├── assets
    ├── components
    ├── containers
    ├── store
    ├── tests
    ├── theme
    └── utils
```

## Functionality overview

**General functionality:**

- Authenticate users via JWT (login/signup pages)
- CRU* users (sign up & dashboard page)
- CRUD tags
- CRUD portfolios
- CR*D comments on portfolios
- GET and display lists of portfolios
- Favorite portfolios
- Follow other users

**The general page breakdown looks like this:**

- Home page ([home](https://eportfolio.tech/))
  - Search bar
  - Discover e-portfolios by tags
- Explore page ([explore](https://dev.eportfolio.tech/explore))
  - Feed portfolios
- Search page ([search](https://dev.eportfolio.tech/search))
- Sign in/Sign up pages ([login](https://eportfolio.tech/?login=true), [register](https://eportfolio.tech/?sign-up=true))
  - Use JWT (store the token in localStorage)
- Editor page to create/edit portfolios ([editor](https://dev.eportfolio.tech/editor))
- Profile page ([profile](https://dev.eportfolio.tech/dashboard/profile))
  - Basic user info
  - Manage followers and following users
  - Change password

<br />

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/yunfeijing/"><img src="https://avatars3.githubusercontent.com/u/18676002?v=4" width="100px;" alt=""/><br /><sub><b>Yunfei Jing</b></sub></a><br /><a href="https://github.com/eportfolio-tech/server/commits?author=yunfeijing" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Skylar-Yang"><img src="https://avatars1.githubusercontent.com/u/61859437?v=4" width="100px;" alt=""/><br /><sub><b>Skylar-Yang</b></sub></a><br /><a href="https://github.com/eportfolio-tech/server/commits?author=Skylar-Yang" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Zijian-Zeng"><img src="https://avatars3.githubusercontent.com/u/53477823?v=4" width="100px;" alt=""/><br /><sub><b>Zijian-Zeng</b></sub></a><br /><a href="https://github.com/eportfolio-tech/server/commits?author=Zijian-Zeng" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/shuyang-fan-33231a17b/"><img src="https://avatars3.githubusercontent.com/u/34025121?v=4" width="100px;" alt=""/><br /><sub><b>Haswell Fan</b></sub></a><br /><a href="https://github.com/eportfolio-tech/server/commits?author=Haswf" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/FishWith7sMemory"><img src="https://avatars0.githubusercontent.com/u/63847386?v=4" width="100px;" alt=""/><br /><sub><b>FishWith7sMemory</b></sub></a><br /><a href="https://github.com/eportfolio-tech/server/commits?author=FishWith7sMemory" title="Code">💻</a></td>
  </tr>
</table>


<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
