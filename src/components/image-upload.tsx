import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import { Flex, Box, FormLabel, Image, Button } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  promoImage?: string;
};

const Thumb: React.FC<InputFieldProps> = ({ label, promoImage, ...props }) => {
  const [field, { error }] = useField(props);

  const [loading, setLoading] = React.useState(false);
  const [thumb, setThumb] = React.useState<any>(null);
  // const [file, setFile] = React.useState(null);
  const formikProps = useFormikContext();
  const inputRef = useRef<any>(null);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <FormLabel htmlFor={field.name}>{label}</FormLabel>

      <Flex>
        <Image
          src={thumb || promoImage}
          alt={"course image"}
          objectFit='cover'
          // className="img-thumbnail mt-2"
          height={200}
          width={300}

        />

        <input
          style={{
            display: "none",
          }}
          ref={inputRef}
          id="upload-photo"
          // id="file"
          // name="file"
          type="file"
          {...field}
          {...props}
          //   id={field.name}

          onChange={(event: any) => {
            const reader = new FileReader();
            setLoading(true);

            reader.onloadend = () => {
              setLoading(false);
              setThumb(reader.result);
              console.log("reader result", reader.result);
            };

            const file = event.currentTarget.files[0];
            reader.readAsDataURL(file);
            formikProps.setFieldValue("file", event.currentTarget.files[0]);
          }}
          //   className="form-control"
        />
        <Button ml="3" onClick={() => inputRef.current.click()}>Upload File</Button>
      </Flex>
    </div>
  );
};

export default Thumb;
