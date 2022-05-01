import React, { InputHTMLAttributes, useEffect } from "react";
import { FormLabel, Image } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  promoImage?: string;
};


const Thumb: React.FC<InputFieldProps> = ({ label, promoImage,  ...props }) => {
  const [field, { error }] = useField(props);

  const [loading, setLoading] = React.useState(false);
  const [thumb, setThumb] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const formikProps = useFormikContext();

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="form-group">
        {/* <label for="file">File upload</label> */}
        {/* <FormLabel htmlFor={field.name}>{label}</FormLabel> */}
        <input
          // id="file"
          // name="file"
          type="file"
          {...field}
          {...props}
          //   id={field.name}

          onChange={(event) => {
            const reader = new FileReader();
            setLoading(true);

            reader.onloadend = () => {
              setLoading(false);
              setThumb(reader.result);
              console.log("reader result", reader.result);
            };

            file = event.currentTarget.files[0];
            reader.readAsDataURL(file);
            formikProps.setFieldValue("file", event.currentTarget.files[0]);
          }}
          //   className="form-control"
        />
        <Image
          src={thumb || promoImage}
          alt={"course image"}
          className="img-thumbnail mt-2"
          height={200}
          width={200}
        />
      </div>
    </div>
  );
};

export default Thumb;
