class HttpService {
  endpoint: string;

  constructor(parameters: string) {
    const url = new URL(process.env.API_URL!);
    url.pathname = url.pathname.concat(parameters);

    this.endpoint = url.href;
  }

  async getData<T>() {
    const res = await fetch(this.endpoint, {
      cache: "no-store",
    });

    // const res = await fetch(this.endpoint);

    if (!res.ok) throw new Error("failed to fetch");

    const data = await res.json();

    return data;
  }

  async createData<T>(entity: T) {
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(entity),
    });

    if (!res.ok) {
      throw new Error("failed to post");
    }
    const data = await res.json();
    return data;
  }

  async deleteData<T>(id: T) {
    const res = await fetch(`${this.endpoint}?deleteId=${id}`, {
      method: "DELETE",
    });
    return res;
  }

  async updateData<T>(entity: T, id: T) {
    const res = await fetch(`${this.endpoint}/${id}`, {
      method: "PUT",
      body: JSON.stringify(entity),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      alert("PUT Fetch Failed");
      return;
    }

    const data = await res.json();
    return data;
  }
}

export default (arg: string) => new HttpService(arg);
