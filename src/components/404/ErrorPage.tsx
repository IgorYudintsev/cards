import { useRouteError } from "react-router-dom";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

export default function ErrorPage() {
  const error: unknown = useRouteError();

  return (
    <Wrapper>
      <Paper variant="outlined" elevation={24}>
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="text-slate-400">
          <i>{(error as Error)?.message || (error as { statusText?: string })?.statusText}</i>
        </p>
      </Paper>
    </Wrapper>
  );
}

const Wrapper = styled.span`
  margin-top: 50px;
  display: flex;
  justify-content: center;

  & > div {
    width: 400px;
    height: 200px;
    background-color: orange;
    color: white;
    text-align: center;
    box-shadow: 0 2px 4px rgba(10, 10, 10, 0.6); /* Добавление тени */
  }
`;

const Wrapper2 = styled.span`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
