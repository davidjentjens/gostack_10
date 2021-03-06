import styled, { keyframes } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
`;

export const StateButtons = styled.ul`
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 100px;
    border: 1px solid #eee;
    user-select: none;
    border-radius: 5px;
    background: #7159c1;
    color: #fff;
    transition: 0.1s;
  }

  button:hover {
    filter: grayscale(100%);
  }
`;

export const LoadingIssues = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const IssueList = styled.ul`
  margin-top: 20px;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const PageButtons = styled.ul`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
`;

export const PageButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.buttonDisabled
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 70px;
  border: 1px solid #eee;
  user-select: none;
  border-radius: 5px;
  background: #7159c1;
  color: #fff;
  transition: 0.1s;

  &:hover {
    filter: grayscale(100%);
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
