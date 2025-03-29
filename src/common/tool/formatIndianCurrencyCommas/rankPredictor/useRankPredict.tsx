import { useState, useEffect } from "react";

interface ApiResponse {
  // Adjust the response structure as per your API's response
  message?: string;
  // other fields as per the API response
}

interface ApiError {
  message: string;
  // other error details, if any
}

const useRankPredict = (
  // name: string,
  // email: string,
  // contactNumber: string,
  // examCategory: string,
  score: string
) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset previous error state
      try {
        const response = await fetch(
          "https://hellomentor.in/api/v5/home/rankpredict/score",
          {
            headers: {
              accept: "*/*",
              "accept-language": "en-US,en;q=0.9",
              "content-type": "application/json",
              "sec-ch-ua":
                '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-mm-client-id":
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlX2lkIjoiYjE4ZDVmMDYtMTg1Yy00MzU1LWFiZWUtMjJiM2Q0ODllYzM4IiwiaWF0IjoxNzEzNjgwNDczLCJleHAiOjQ4Mzc4ODI4NzN9.C48B4KOeob1dPtCKNBPOuffi2rrR6Nn3oWtpgP46xtw",
              cookie:
                "_ga=GA1.1.715555132.1732359290; _gcl_au=1.1.230017452.1732359290; ORG34871=82fcbc16-8956-401a-a1ac-5c601731bbfb; ORG34871_DNT=0; _fbp=fb.1.1735794890142.238647598433445577;_ ga_FKSBMN8XGD=GS1.1.1739448289.99.1.1739448388.0.0.0; _clck=visidy%7C2%7Cftg%7C0%7C1788;_ clsk=omt65e%7C1739596568378%7C1%7C1%7Co.clarity.ms%2Fcollect; _ga_QR5QHCJK70=GS1.1.1739596566.63.1.1739596644.0.0.0",
              Referer: "https://hellomentor.in/",
              "Referrer-Policy": "strict-origin-when-cross-origin",
            },
            body: JSON.stringify({
              name: "Uthaya-rank-test",
              email: "uthaya-rank-test@gmail.com",
              contact_number: "+919999999999",
              exam_category: "NEETUG",
              score,
            }),
            method: "POST",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const result = await response.json();
        setData(result); // Assuming the API returns the data in JSON format
      } catch (err: any) {
        setError({ message: err.message || "Something went wrong" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    // name, email, contactNumber, examCategory,
    score,
  ]);

  return { data, loading, error };
};

export default useRankPredict;
