import { message } from "antd";

type optionsType = {
  method?: string;
  headers?: any;
};
export const fetchData = async (
  url: string,
  body: object,
  options: optionsType = {}
) => {
  try {
    const { method = "POST", headers = {} } = options;
    let parmas = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(url, parmas);
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error: any) {
    message.error(error.message);
    return null;
  }
};
