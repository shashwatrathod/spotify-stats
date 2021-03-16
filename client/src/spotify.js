const response_type = "code";
var scopes = [
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-library-read",
];
scopes = scopes.join(" ");
const show_dialog = false;

export const authURL = `https://accounts.spotify.com/authorize?response_type=${response_type}&client_id=${
  import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID
}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(
  import.meta.env.SNOWPACK_PUBLIC_REDIRECT_URI
)}&show_dialog=${show_dialog}`;

export const getTokenFromSearch = (search) => {
  if (search && search.includes("code")) {
    const splited = search.split("=");
    const code = splited[1];
    return code;
  } else {
    return false;
  }
};
