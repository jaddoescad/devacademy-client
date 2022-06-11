import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadVideo } from "src/services/uploadVideo";
import { Progress } from "@chakra-ui/react";
import { saveVideo } from "src/services/firestore";

const MyDropzone = ({ lessonId, courseId }) => {
  const [title, setTitle] = React.useState("");
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  const [videoData, setVideoData] = useState({
    videoEmbedUrl: "",
    videoURI: "",
  });

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        setTitle(file.name);
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
      // upload here and return link
      uploadVideo(file, setProgress, setFinished, setVideoData);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "video/mp4,video/x-m4v,video/*",
  });

  useEffect(() => {
    if (
      videoData.videoEmbedUrl !== "" &&
      videoData.videoURI !== "" &&
      videoData.videoEmbedUrl &&
      videoData.videoURI
    ) {
      saveVideo(
        lessonId,
        courseId,
        videoData.videoURI,
        videoData.videoEmbedUrl
      );
    }
  }, [videoData]);

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        border: "1px solid black",
        backgroundColor: "white",
      }}
      {...getRootProps()}
    >
      <input type="file" {...getInputProps()} />
      <p>{"Drag 'n' drop some files here, or click to select files"}</p>
      <p>{title}</p>
      {!finished ? <Progress value={progress} /> : <p>Finished</p>}
    </div>
  );
};

export default MyDropzone;
