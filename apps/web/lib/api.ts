import axios from "axios"

export const joinMeet = async (url: string) => {
    // TODO: Write better error handling
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/join`, { url });
    if (response.status !== 200) {
        return response.data.error;
    }

    return response.data;
}