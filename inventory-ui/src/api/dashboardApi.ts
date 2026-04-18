import axios from "axios";
import type { Counts } from "../types/counts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCounts = async() : Promise<Counts> => {
    var countedData = await axios.get<Counts>(`${BASE_URL}/dashboard`)
    return countedData.data;
}

