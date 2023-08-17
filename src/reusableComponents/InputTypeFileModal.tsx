import React, { ChangeEvent, useState } from "react";
import defaultAva from "assets/icon/ava.jpg";
import { toast } from "react-toastify";
import styled from "styled-components";
import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Control, Controller } from "react-hook-form";

type PropsType = {
  name: string;
  control: Control<any>;
};

export const InputTypeFileModal: React.FC<PropsType> = (props) => {
  const { name, control } = props;
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);
  const [ava, setAva] = useState(profile ? profile!.avatar : defaultAva);

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
            <img src={ava || defaultAva} style={{ width: "60%" }} alt="ava" {...field} />
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

//---------------------------------------------------------------------------------------------------------------------------

// import React, { ChangeEvent, useState } from "react";
// import IconButton from "@mui/material/IconButton";
// import defaultAva from "assets/icon/ava.jpg";
// import Avatar from "@mui/material/Avatar";
// import { toast } from "react-toastify";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import styled from "styled-components";
// import { authThunks } from "features/auth/auth.slice";
// import { useAppDispatch, useAppSelector } from "app/hooks";
// import { Link } from "react-router-dom";
//
// export const InputTypeFileModal = () => {
//   const dispatch = useAppDispatch();
//   const profile = useAppSelector((state) => state.auth.profile);
//   const [ava, setAva] = useState(profile ? profile!.avatar : defaultAva);
//
//   const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length) {
//       const file = e.target.files[0];
//       if (file.size < 4000000) {
//         convertFileToBase64(file, (file64: string) => {
//           setAva(file64);
//           const payload = {
//             name: profile ? profile.name : "user",
//             avatar: file64,
//           };
//           dispatch(authThunks.updateProfile({ payload }));
//         });
//       } else {
//         toast.error("Файл слишком большого размера");
//       }
//     }
//   };
//
//   const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const file64 = reader.result as string;
//       callBack(file64);
//     };
//     reader.readAsDataURL(file);
//   };
//
//   return (
//       <>
//         <label>
//           <input type="file" onChange={uploadHandler} style={{ display: "none" }} />
//           <PictureWrapper>
//             <h4 style={{ cursor: "pointer" }}>Cover</h4>
//             <h4 style={{ cursor: "pointer" }}>Change cover</h4>
//           </PictureWrapper>
//         </label>
//         <ImgWrapper>
//           <img src={ava || defaultAva} style={{ width: "60%" }} alt="ava" />
//         </ImgWrapper>
//       </>
//   );
// };
//
// const ImgWrapper = styled.span`
//   display: flex;
//   justify-content: center;
// `;
//
// const PictureWrapper = styled.span`
//   margin-top: 30px;
//   display: flex;
//   justify-content: space-around;
// `;
