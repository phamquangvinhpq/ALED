class Authentication {
    constructor() {}
  
    isAuthentication() {
      let accessToken = null;
      if (localStorage.getItem("accessToken")) {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));
        accessToken = accessToken.accessToken;
      }
  
      return accessToken !== null;
    }
  }
  
  const authentication = new Authentication();
  export { authentication };
  