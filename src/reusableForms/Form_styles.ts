import styled from "styled-components";

const OpacitySpan = styled.span`
  opacity: 0.5;
  text-align: left;
  margin-left: 10px;
`;

const DontHaveAccount = styled.span`
  margin-top: 10px;
  padding-bottom: 30px;

  & > a {
    color: #036ea4;
    font-size: 14px;
  }
`;

const TipicalWrapper = styled.div`
  margin-top: 40px;

  & > button {
    width: 96%;
  }
`;

// const TipicalWrapper = styled.div`
//   margin-top: 40px;
//
// `;

const Wrapper = styled.span`
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
`;

const WrapperForgetPassword = styled.span`
  display: flex;
  justify-content: end;
  margin-right: 10px;
  cursor: pointer;

  & > a {
    text-decoration: none;
    color: black;
  }
`;

const FormWrapper = styled.span`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 310px;
`;

export const S = {
  OpacitySpan,
  DontHaveAccount,
  TipicalWrapper,
  Wrapper,
  WrapperForgetPassword,
  FormWrapper,
};
