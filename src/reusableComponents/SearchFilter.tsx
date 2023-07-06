import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { packsThunks } from "features/packs/packs.slice";
import { GetPacksPayload } from "features/packs/packs.api";
import { deleteState, loadState, saveState } from "utils/localStorage";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useDebounce } from "utils/useDebounce";
import { ButtonComponent } from "reusableComponents/ButtonComponent";

type PropsType = {
  titleSearch: string;
  setTitleSearch: (titleSearch: string) => void;
  valueRange: number[];
  setValueRange: (valueRange: number[]) => void;
  pack: GetPacksPayload;
};

export const SearchFilter: React.FC<PropsType> = (props) => {
  const { valueRange, setValueRange, titleSearch, setTitleSearch, pack } = props;
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const [on, setOn] = useState("");
  const debouncedValue = useDebounce<string>(on, 1000);

  const allHandler = () => {
    deleteState();
    dispatch(packsThunks.getPacks(pack));
  };
  const myHandler = () => {
    saveState();
    dispatch(packsThunks.getPacks({ ...pack, user_id: userIDfromProfile }));
  };

  const cleanHandler = () => {
    dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
    setValueRange([0, 10]);
    setTitleSearch("");
  };

  useEffect(() => {
    switch (on) {
      case "CLEAN": {
        return cleanHandler();
      }
      case "MY": {
        return myHandler();
      }
      case "ALL": {
        return allHandler();
      }
    }

    // dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
    // setValueRange([0, 10]);
    // setTitleSearch("");
  }, [debouncedValue]);

  return (
    <MainWrapper>
      {/*<InputWithoutForm title={titleSearch} setTitle={setTitleSearch} pack={pack} />*/}
      <div>
        <ButtonComponent
          buttonName={"My cards"}
          //callback={myHandler}
          callback={() => setOn("MY")}
          disabled={false}
          variant={loadState() ? "outlined" : "contained"}
        />
        <ButtonComponent
          buttonName={"All cards"}
          //callback={allHandler}
          callback={() => setOn("ALL")}
          disabled={false}
          variant={!loadState() ? "outlined" : "contained"}
        />
      </div>
      {/*<RangeSlider value={valueRange} setValue={setValueRange} pack={pack} />*/}

      {/*<div title="reset filters">*/}
      {/*  /!*<IconButton aria-label="delete" onClick={cleanHandler}>*!/*/}
      {/*  <IconButton aria-label="delete" onClick={() => setOn("CLEAN")}>*/}
      {/*    <CleaningServicesIcon />*/}
      {/*  </IconButton>*/}
      {/*</div>*/}
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

//---------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { InputWithoutForm } from "common/componentsSmall/InputWithoutForm";
// import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
// import styled from "styled-components";
// import { useAppDispatch, useAppSelector } from "common/hooks";
// import { packsThunks } from "features/packs/packs.slice";
// import { deleteState, loadState, saveState } from "helpers/localStorage";
// import { RangeSlider } from "common/componentsSmall/RangeSlider";
// import IconButton from "@mui/material/IconButton";
// import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
// import { GetPacksPayload } from "features/packs/packs.api";
// import { PayloadTypeForUpdate } from "features/packs/Packs";
// import { useDebounce } from "common/hooks/useDebounce";
//
// type PropsType = {
//   titleSearch: string;
//   setTitleSearch: (titleSearch: string) => void;
//   valueRange: number[];
//   setValueRange: (valueRange: number[]) => void;
//   pack: GetPacksPayload;
// };
//
// export const SearchFilter: React.FC<PropsType> = (props) => {
//   const { valueRange, setValueRange, titleSearch, setTitleSearch, pack } = props;
//   const dispatch = useAppDispatch();
//   const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
//   const [on, setOn] = useState(false);
//   const debouncedValue = useDebounce<boolean>(on, 1000);
//
//   const allHandler = () => {
//     deleteState();
//     dispatch(packsThunks.getPacks(pack));
//   };
//   const myHandler = () => {
//     saveState();
//     dispatch(packsThunks.getPacks({ ...pack, user_id: userIDfromProfile }));
//   };
//
//   // const cleanHandler = () => {
//   //   setOn(!on)
//   //   // dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
//   //   // setValueRange([0, 10]);
//   //   // setTitleSearch("");
//   // };
//
//   useEffect(() => {
//     dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
//     setValueRange([0, 10]);
//     setTitleSearch("");
//   }, [debouncedValue]);
//
//   return (
//       <MainWrapper>
//         <InputWithoutForm title={titleSearch} setTitle={setTitleSearch} pack={pack} />
//         <div>
//           <ButtonComponent
//               buttonName={"My cards"}
//               callback={myHandler}
//               disabled={false}
//               variant={loadState() ? "outlined" : "contained"}
//           />
//           <ButtonComponent
//               buttonName={"All cards"}
//               callback={allHandler}
//               disabled={false}
//               variant={!loadState() ? "outlined" : "contained"}
//           />
//         </div>
//         <RangeSlider value={valueRange} setValue={setValueRange} pack={pack} />
//
//         <div title="reset filters">
//           {/*<IconButton aria-label="delete" onClick={cleanHandler}>*/}
//           <IconButton aria-label="delete" onClick={() => setOn(!on)}>
//             <CleaningServicesIcon />
//           </IconButton>
//         </div>
//       </MainWrapper>
//   );
// };
//
// const MainWrapper = styled.div`
//   margin-top: 20px;
//   display: flex;
//   justify-content: space-around;
// `;

//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { InputWithoutForm } from "common/componentsSmall/InputWithoutForm";
// import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
// import styled from "styled-components";
// import { useAppDispatch, useAppSelector } from "common/hooks";
// import { packsThunks } from "features/packs/packs.slice";
// import { deleteState, loadState, saveState } from "helpers/localStorage";
// import { RangeSlider } from "common/componentsSmall/RangeSlider";
// import IconButton from "@mui/material/IconButton";
// import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
// import { GetPacksPayload } from "features/packs/packs.api";
// import { PayloadTypeForUpdate } from "features/packs/Packs";
// import { useDebounce } from "common/hooks/useDebounce";
//
// type PropsType = {
//   titleSearch: string;
//   setTitleSearch: (titleSearch: string) => void;
//   valueRange: number[];
//   setValueRange: (valueRange: number[]) => void;
//   pack: GetPacksPayload;
// };
//
// export const SearchFilter: React.FC<PropsType> = (props) => {
//   const { valueRange, setValueRange, titleSearch, setTitleSearch, pack } = props;
//   const dispatch = useAppDispatch();
//   const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
//   const [toggle, setToggle] = useState(false);
//   const debouncedValue = useDebounce<boolean>(toggle, 500);
//
//   const allHandler = () => {
//     deleteState();
//     dispatch(packsThunks.getPacks(pack));
//   };
//   const myHandler = () => {
//     saveState();
//     dispatch(packsThunks.getPacks({ ...pack, user_id: userIDfromProfile }));
//   };
//
//   const cleanHandler = () => {
//     dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
//     setValueRange([0, 10]);
//     setTitleSearch("");
//   };
//   useEffect(() => {
//
//
//   }, [debouncedValue]);
//
//   return (
//       <MainWrapper>
//         <InputWithoutForm title={titleSearch} setTitle={setTitleSearch} pack={pack} />
//         <div>
//           <ButtonComponent
//               buttonName={"My cards"}
//               callback={myHandler}
//               disabled={false}
//               variant={loadState() ? "outlined" : "contained"}
//           />
//           <ButtonComponent
//               buttonName={"All cards"}
//               callback={allHandler}
//               disabled={false}
//               variant={!loadState() ? "outlined" : "contained"}
//           />
//         </div>
//         <RangeSlider value={valueRange} setValue={setValueRange} pack={pack} />
//
//         <div title="reset filters">
//           <IconButton aria-label="delete" onClick={cleanHandler}>
//             <CleaningServicesIcon />
//           </IconButton>
//         </div>
//       </MainWrapper>
//   );
// };
//
// const MainWrapper = styled.div`
//   margin-top: 20px;
//   display: flex;
//   justify-content: space-around;
// `;

//-----------------------------------------------------------------------------------------
