import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://europe-west3-wigymtv.cloudfunctions.net",
});

const client = {
  clientAccess: (clientId: string) =>
    axiosClient.get<string>("clientAccess", { params: { clientId } }),
};

export default client;
