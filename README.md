# Spotify Stats 🎶

View your spotify top artists, top tracks and recently played tracks, all at one place! SpotifyStats connects with Spotify's [API](https://developer.spotify.com/documentation/web-api/) to show you your spotify usage data 📈.

You can view the demo [here](https://your-spotify-stats.herokuapp.com/).

## Features 🔥

- View your 4 Weeks/6 months/All time Top 50 artists.
- View your 4 Weeks/6 months/All time Top 50 tracks.
- View your most recently played 50 tracks.

## Demo 🚀

View live demo [here](https://your-spotify-stats.herokuapp.com/).

## Screenshots 📷

![Login Page](/images/login.png)
![Home Page](/images/home.png)
![Top Artists 4 Weeks](/images/top_a_s.png)
![Top Artists All Time](/images/top_a_l.png)
![Top Songs 4 weeks](/images/top_s_s.png)
![Top Songs 6 months](/images/top_s_m.png)
![Recently played tracks](/images/recent.png)

## Tech 🤖

**Client:** ReactJS, MaterialUI, Snowpack, Node

**Server:** Node, ExpressJS, SpotifyAPI, Authentication and Authorization

## Development 💻

SpotifyStats is a React app that uses Express on it's backend.

### Getting Started

- Create a spotify application.

  Go to https://developer.spotify.com/dashboard/, login with your spotify account and then create a new application. Obtain the Client ID and Client Secret from the application dashboard page. DO NOT expose your Client Secret to the public at any point. Edit the "Redirect URIs" under "Edit Settings" to include "http://localhost:5000/login", "http://localhost:8080/login", and "https://_your deployment domain_/login" (if applicable).

- Clone the repository.

```
git clone https://github.com/shashwatrathod/spotify-stats.git
```

- Install necessary server dependancies.
  ```
  yarn
  ```
  or
  ```
  npm i
  ```
- Install necessary client dependancies.

  ```
  cd client
  ```

  and

  ```
  yarn or npm i
  ```

### Environment Variables

- ./.env

```
CLIENT_ID=*spotify app client id (public)*
CLIENT_SECRET=*spotify app client Secret (private)*
BASE64ENCODED=*base64 encoded client_id:client_secret*
FRONTEND_REDIRECT_URI=http://localhost:5000/login *Change this to wherever you want spotify to redirect after the login*
```

Use [this](https://www.base64encode.org/) tool to encode client_id:client_secret to base64.

- ./client/.env

```
SNOWPACK_PUBLIC_CLIENT_ID=*spotify app client id (public)*
SNOWPACK_PUBLIC_REDIRECT_URI_DEV=http://localhost:5000/login *tell spotify to redirect to localhost in dev Environment*
SNOWPACK_PUBLIC_REDIRECT_URI_PROD=https://your-spotify-stats.herokuapp.com/login *tell spotify to redirect to deployment url in dev Environment*
SNOWPACK_PUBLIC_PROXY=http://localhost:5000
```

### Running Locally

- In the root dir, do a `yarn start`.
- Then go to ./client and do a `yarn start`. Access app via snowpack dev server URL.

### Running Production

- Go to ./client and run `yarn build`.
- Go to root dir and run `yarn start`. Access the app via the express server URL.
