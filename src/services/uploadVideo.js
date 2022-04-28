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

export const uploadVideo = async (file, setProgress, setFinished, setVideoData) => {
    // Get the selected file from the input element
    // const file = eventObject.target.files[0];
    const fileName = file.name;
    const fileSize = file.size.toString();
    console.log(file, fileName, fileSize);

    const response = await axios({
      method: "post",
      url: `https://api.vimeo.com/me/videos`,
      headers: headerPost,
      data: {
        upload: {
          approach: "tus",
          size: fileSize,
        },
        privacy: {
          view: "disable",
          download: "false",
          embed: "whitelist",
        },
      },
    });

    console.log("response", response);

    // Create a new tus upload
    const upload = new tus.Upload(file, {
      endPoint: "https://api.vimeo.com/me/videos",
      uploadUrl: response.data.upload.upload_link,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      headers: {},
      onError: function (error) {
        console.log("Failed because: " + error);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");

        //update bar
        setProgress(percentage);
      },
      onSuccess: function () {
        console.log("Download %s from %s", upload.file.name, upload.url);
        setFinished(true);
        // setVideoUrl(response.data.player_embed_url);
        setVideoData({videoEmbedUrl: response.data.player_embed_url, videoURI: response.data.uri});
        
      },
    });

    // Start the upload
    upload.start();
  };
