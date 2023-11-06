import styled from "styled-components";

const StyledRoot = styled.div`
  position: relative;
  > * {
    transition: 0.5s ease-in-out;
  }
  margin: 5px;
`;



const StyledButton = styled.button`
  position: relative;
  box-sizing: border-box;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border: 1px solid rgba(27, 31, 35, .15);
  color: #fff;
  
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
  
  padding: 10px 25px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 600;

  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;

  &:hover {
    background-color: #2c974b;
  }

  &:focus {
    box-shadow: rgba(192, 192, 192, .4) 0 0 0 1px;
    outline: none;
  }

  &:disabled {
    background-color: #E7E7E7;
    border-color: rgba(27, 31, 35, .1);
    color: #C8C8C8;
    cursor: default;
    box-shadow: rgba(27, 31, 35, .1) 0 0px 0;
  }

  &:active {
    background-color: #298e46;
    box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
  }

  &.outlined {
    background: #ECECEC;
    color: #2F2F2F;
    border: 1px solid rgba(47, 47, 47, 1);
    &:hover {
      background-color: #D1D1D1;
    }
    &:disabled {
      background-color: #E7E7E7;
      border-color: rgba(27, 31, 35, .1);
      color: #C8C8C8;
      cursor: default;
      box-shadow: rgba(27, 31, 35, .1) 0 0px 0;
    }
  }
`

export const Button = ({
  children,
  disabled,
  onClick,
  className,
  type,
  ...props
}) => {
  return (
    <StyledRoot {...props}>
      <StyledButton type={type} className={className} onClick={onClick} disabled={disabled}>
        {children}
      </StyledButton>
    </StyledRoot>
  );
};

const StyledButtonMT = styled.button`
  position: relative;
  box-sizing: border-box;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;

  border: 1px solid rgba(27, 31, 35, .15);
  background-color: ${((props) => props.bg ? '#4ABE6A' : '#C4C4C4')};
  cursor: pointer;
  display: inline-block;
  
  padding: 50px 100px;
  line-height: 20px;
  font-size: 18px;
  font-weight: 600;

  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;

  &:disabled {
    background-color: #E7E7E7;
    color: #E7E7E7;
    cursor: default;
      &:hover {
        background: #E7E7E7;
      }
  }

  &:focus {
    box-shadow: rgba(231, 231, 231, .4) 0 0 0 2px;
    outline: none;
  }

  &:hover {
    background-color: ${((props) => props.bg ? '#4FBF7E' : '#8E8C8C')};
  }

  &:active {
    background-color: ${((props) => props.bg ? '#4FBF7E' : '#ABABAB')};
    box-shadow: rgba(231, 231, 231, .4) 0 1px 0 inset;
  }
`

export const MTbutton = ({
  children,
  disabled,
  onClick,
  bg,
  id,
  ...props
}) => {
  return (
    <StyledRoot {...props}>
      <StyledButtonMT disabled={disabled} bg={bg} onClick={onClick} id={id}>
        {children}
      </StyledButtonMT>
    </StyledRoot>
  )
}


const Icon = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 20px;
  border-radius: 50%;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  > svg {
    height: 70px;
    width: 70px;
  }

  > img {
    height: 65px;
    width: 65px;
  }

  &:hover {
    background: #E7E7E766;
  }
`

export const ButtonIcon = ({
  children,
  onClick,
  disabled,
  ...props
}) => {
  return (
      <Icon disabled={disabled} onClick={onClick} {...props}>
          {children}
      </Icon>
  )
}
