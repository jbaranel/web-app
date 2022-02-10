class API {
  constructor() {
    this.token = localStorage.getItem("auth");
    this.authorization = `Bearer ${this.token}`;
    this.base_url = process.env.REACT_APP_API_URL;
  }

  async GET(url) {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authorization,
      },
    };

    const response = await fetch(`${this.base_url}/${url}`, params)
      .then((res) => res.json())
      .catch((error) => {
        console.log(error)
        return;
      });
    return response;
  }

  async POST(url, body) {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authorization,
      },
      body: body,
    };
    
    const response = await fetch(`${this.base_url}/${url}`, params)
      .then((res) => res.json())
      .catch((error) => {
        //console.log(error)
        return;
      });
    return response;
  }

  async PATCH(url, body) {
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authorization,
      },
      body: body,
    };
    
    const response = await fetch(`${this.base_url}/${url}`, params)
      .then((res) => res.json())
      .catch((error) => {
        console.log(error)
        return;
      });
    return response;
  }

  async DELETE(url, body) {
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authorization,
      },
      body: body,
    };
    
    const response = await fetch(`${this.base_url}/${url}`, params)
      .then((res) => res.json())
      .catch((error) => {
        //console.log(error)
        return;
      });
    return response;
  }
}

const api = new API()

export default api