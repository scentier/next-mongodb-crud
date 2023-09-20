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

    if (!res.ok) throw new Error("failed to fetch");

    const data = await res.json();

    return data;
  }

  async postData<T>(entity: T) {
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(entity),
    });

    if (!res.ok) {
      throw new Error("failed to post");
      console.log(this.endpoint);
    }
    const data = await res.json();
    return data;
  }
}

export default (arg: string) => new HttpService(arg);
