import axios from "axios";
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

const headerGet = {
    // Accept: "application/vnd.vimeo.*+json;version=3.4",
    Authorization: `bearer ${accessToken}`,
    // "Content-Type": "application/json",
  };

export const checkTranscode = async (lessonVideoUrl) => {
    // Get the selected file from the input element
    // const file = eventObject.target.files[0];

    console.log("checking", lessonVideoUrl)

    const response = await axios({
      method: "get",
      url: `https://api.vimeo.com/videos/703894332?fields=uri,upload.status,transcode.status`,
      headers: headerGet,
    });

    console.log("response", response.data.transcode.status);
  };
