class HttpService {
  endpoint: string;

  constructor(parameters: string) {
    const url = new URL(process.env.API_URL!);
    url.pathname = url.pathname.concat(parameters);

    this.endpoint = url.href;
  }

  async getData<T>() {
    console.log(this.endpoint);
    const res = await fetch(this.endpoint, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("failed to fetch");

    const data = await res.json();

    return data;
  }
}

export default (arg: string) => new HttpService(arg);
