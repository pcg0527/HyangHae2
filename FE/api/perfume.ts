/*
향수 관련 api
@author Wendy
@version 1.0.0
생성일 2022-03-22
마지막 수정일 2022-04-05
*/

import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export interface searchResult {
  data: any;
  message: string;
  statusCode: number;
}

export const apiShoppingSearch = async (
  keyword: string
): Promise<searchResult> => {
  try {
    return await axios.get(`/v1/search/shop.json`, {
      params: {
        query: "초콜릿",
      },
      headers: {
        "X-Naver-Client-Id": "SGQWYLc_8_6M2ZpCjAsg",
        "X-Naver-Client-Secret": "_8QJILf9ZB",
      },
    });
  } catch (e) {
    throw new Error("server Error");
  }
};
// export const apiShoppingSearch = async (
//   keyword: string
// ): Promise<searchResult> => {
//   try {
//     console.log(process.env.EBAY_API_KEY);
//     return await axios.get(
//       `https://api.ebay.com/buy/browse/v1/item_summary/search?q=perfume ${keyword}&limit=5`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EBAY_API_KEY}`,
//         },
//       }
//     );
//   } catch (e) {
//     throw new Error("server Error");
//   }
// };

export interface PerfumeResult {
  message: string;
  statusCode: number;
  data: object;
}

export const apiPerfumeDetail = async (
  token: string,
  perfumeId: string
): Promise<PerfumeResult> => {
  try {
    return await axios.get(`${BASE_URL}/perfume/${perfumeId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error("server error");
  }
};

export const apiPostPerfumeReview = async (
  accessToken: string,
  perfumeId: number,
  reviewContent: string,
  reviewScore: string
): Promise<PerfumeResult> => {
  try {
    return await axios.post(
      `${BASE_URL}/perfume/review`,
      { perfumeId, reviewContent, reviewScore },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (e) {
    throw new Error("server error");
  }
};

export const apiGetPerfumeReview = async (
  perfumeId: string,
  page: number,
  size: number,
  sort: string
) => {
  try {
    return await axios.get(
      `${BASE_URL}/perfume/review/list/${perfumeId}?page=${page}&size=${size}&sort=${sort}`
    );
  } catch (e) {
    throw new Error("server error");
  }
};

export const apiDeletePerfumeReview = async (
  perfumeId: string,
  token: string
) => {
  try {
    return await axios.delete(`${BASE_URL}/perfume/review/${perfumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error("server error");
  }
};

export const apiPutPerfumeReview = async (
  token: string,
  perfumeId: number,
  reviewContent: string,
  reviewScore: string
) => {
  try {
    return await axios.put(
      `${BASE_URL}/perfume/review`,
      { perfumeId, reviewContent, reviewScore },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    throw new Error("server error");
  }
};

export const reviewLike = async (token: string, perfumeId: number) => {
  try {
    return await axios.get(`${BASE_URL}/perfume/like/${perfumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    // throw new Error("server error");
    console.log(e);
  }
};

export const getBestPerfumes = async function () {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + "/perfume/list",
      { params: { page: 0, size: 10, sort: "likeCnt,DESC" } }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getPerfumes = async function (page: number, sort: string) {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + "/perfume/list",
      { params: { page, size: 10, sort } }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
