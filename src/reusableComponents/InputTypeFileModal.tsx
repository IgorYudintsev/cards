import React, { ChangeEvent, useState } from "react";
import defaultAva from "assets/icon/ava.jpg";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Control, Controller } from "react-hook-form";

type PropsType = {
  name: string;
  control: Control<any>;
  modalKey: "add" | "update";
  deckCover?: string;
};

export const InputTypeFileModal: React.FC<PropsType> = (props) => {
  const { name, control, modalKey, deckCover } = props;
  const [ava, setAva] = useState(deckCover || defaultAva);

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>, field: any) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setAva(file64);
          field.onChange(file64);
        });
      } else {
        toast.error("Файл слишком большого размера");
      }
    }
  };

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file64 = reader.result as string;
      callBack(file64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={ava}
      render={({ field, fieldState }) => (
        <>
          <label>
            <input type="file" onChange={(e) => uploadHandler(e, field)} style={{ display: "none" }} />
            <PictureWrapper>
              <h4 style={{ cursor: "pointer", color: "#0670c4" }}>Change cover</h4>
            </PictureWrapper>
          </label>
          <h4 style={{ marginTop: "-43px", marginLeft: "20px" }}>Cover</h4>
          <ImgWrapper>
            {modalKey === "add" ? (
              <img src={ava || defaultAva} style={{ width: "60%" }} alt="ava" {...field} />
            ) : (
              <img src={ava || defaultAva} style={{ width: "60%" }} alt="ava" {...field} />
            )}
          </ImgWrapper>
        </>
      )}
    />
  );
};

const ImgWrapper = styled.span`
  display: flex;
  justify-content: center;
`;

const PictureWrapper = styled.span`
  margin-top: 30px;
  display: flex;
  justify-content: right;
`;
