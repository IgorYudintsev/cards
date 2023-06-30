import React from "react";
import incubaIcon from "assets/icon/incubaIcon.jpg";
import styled from "styled-components";
import { ButtonComponent } from "reusable components/ButtonComponent";

type PropsType = {
  disabled?: boolean;
};

export const Header: React.FC<PropsType> = (props) => {
  const { disabled = false } = props;
  // const dispatch = useAppDispatch();
  // const profile = useAppSelector((state) => state.auth.profile);
  // const navigate = useNavigate();
  //
  // const goToRegisterHandler = () => {
  //   navigate("/register");
  // };

  // useEffect(() => {
  //   dispatch(authThunks.authMe());
  // }, []);

  return (
    <>
      <Wrapper>
        <Icon>
          <img src={incubaIcon} alt="incubaIcon" />
        </Icon>

        {/*{profile ? (*/}
        {/*  <LoginWrapper>*/}
        {/*    <MenuListComposition />*/}
        {/*    /!*<NameSpan>{profile.name}</NameSpan>*!/*/}
        {/*    <Avatar style={{ marginTop: "-7px" }} alt="Remy Sharp" src={ava} sx={{ width: 40, height: 40 }} />*/}
        {/*  </LoginWrapper>*/}
        {/*) : (*/}
        <ButtonCase>
          <ButtonComponent buttonName={"Sign up"} callback={() => {}} disabled={disabled} />
        </ButtonCase>
        {/*// )}*/}
      </Wrapper>
      <LineWithShadow />
    </>
  );
};

const LoginWrapper = styled.span`
  margin-top: 18px;
  display: flex;
`;

const Wrapper = styled.span`
  height: 60px;
  display: flex;
  justify-content: space-around;
`;

const ButtonCase = styled.span`
  height: 60px;

  & > button {
    margin-top: 10px;
  }
`;

const Icon = styled.span`
  & > img {
    width: 250px;
  }
`;

const LineWithShadow = styled.div`
  border-bottom: 1px solid #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.7);
`;
