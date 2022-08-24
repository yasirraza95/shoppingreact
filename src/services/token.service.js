class TokenService {
  getLocalRefreshToken() {
    return JSON.parse(localStorage.getItem("refreshToken"));
  }
  getLocalAccessToken() {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    return token;
  }
  updateLocalAccessToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
  }
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  removeUser() {
    localStorage.removeItem("userInfo");
  }
}

export default new TokenService();
