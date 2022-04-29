import React, { useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import * as tus from 'tus-js-client'

const accessToken = "916f4af982bb6f8a63b44020ab2b97e5";

const headerDelete = {
  Accept: "application/vnd.vimeo.*+json;version=3.4",
  Authorization: `bearer ${accessToken}`,
  "Content-Type": "application/x-www-form-urlencode",
};

const headerPatch = {
  "Tus-Resumable": "1.0.0",
  "Upload-Offset": 0,
  "Content-Type": "application/offset+octet-stream",
  Accept: "application/vnd.vimeo.*+json;version=3.4",
};

const headerPost = {
  Accept: "application/vnd.vimeo.*+json;version=3.4",
  Authorization: `bearer ${accessToken}`,
  "Content-Type": "application/json",
};

export const deleteVideo = async (videoUri) => {
    console.log(`https://api.vimeo.com${videoUri}`)
    const response = await axios({
      method: "delete",
      url: `https://api.vimeo.com/${videoUri}`,
      headers: headerDelete,
    });
    console.log("response", response);
  };