import axios from "axios";
// import caxios from "@/apiHandler/axiosInstance";
import caxios from "./axiosInstance";
import decryptData from "./utils/decryption";

export const getRequestHandler = async (url) => {
  const responseData = await caxios.get(url);
  return responseData;
};

export const postRequestHandler = async (url, bodyData) => {
  const responseData = await caxios.post(url, { ...bodyData });
  return responseData;
};

export const patchRequestHandler = async (url, bodyData) => {
  const responseData = await caxios.patch(url, { ...bodyData });
  return responseData;
};

export const photoUploadRequestHandler = async (url, bodyData) => {
  // const responseData = await caxios.put(url, bodyData );
  // return responseData;

  const config = {
    method: 'put',
  maxBodyLength: Infinity,
    url,
    headers: { 
      Authorization : `Bearer ${localStorage.getItem(
        "accessToken"
      )}`
    },
    data : bodyData
  };

 let responseData;

 
  axios(config)
      .then((response)=> {
        // console.log(JSON.stringify(response.data));
        responseData= response.data.encoded
      })
      console.log("custom responseData", responseData)
  return responseData
};

export const putRequestHandler = async (formData) => {
  const accessToken = localStorage.getItem("accessToken");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "multipart/form-data",
  };

  let responseData;
  await axios
    .put(
      `${process.env.NEXT_PUBLIC_APIPOINT}/user/profile/uploadpicture`,
      formData,
      {
        headers,
      }
    )
    .then((response) => {
      responseData = JSON.parse(decryptData(responseData.data.encoded));
    })
    .catch((error) => {
      responseData = JSON.parse(decryptData(error.response.data.encoded));
    });

  return responseData;
};

export const deleteRequestHandler = async (url, bodyData) => {
 
   const responseData = await axios.delete(url, {
    
   headers : {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    data: {
      ...bodyData
    }
  });

  return responseData;
};

export const loginHandler = async (url, phoneNumber, password) => {
  const responseData = await postRequestHandler(url, {
    authorization: "application:secret",
    grant_type: "password",
    phoneNumber,
    password,
  });

  if (responseData.success) {
    localStorage.setItem("accessToken", responseData.data.accessToken);
    localStorage.setItem(
      "accessTokenExpiresAt",
      responseData.data.accessTokenExpiresAt
    );
    localStorage.setItem("refreshToken", responseData.data.refreshToken);
    localStorage.setItem(
      "refreshTokenExpiresAt",
      responseData.data.refreshTokenExpiresAt
    );
    localStorage.setItem("user", responseData.data.user);
    localStorage.setItem("createrAt", responseData.data.createrAt);
  }

  return responseData;
};

export const logoutHandler = async (url) => {
  const responseData = await postRequestHandler(url, { data: "" });

  if (responseData.success) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpiresAt");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExpiresAt");
    localStorage.removeItem("user");
    localStorage.removeItem("createrAt");
  }

  return responseData;
};

// SAMPLE REQUEST WITH AUTHORIZATION TOKEN
export const authGetRequestHandler = async (url) => {
  caxios.defaults.headers.common.Authorization =
    "Bearer fc95e87e0a205c5a77ba8b7b753b91b09e53da13";
    const responseData = await caxios.get(url);
  return responseData;
};
