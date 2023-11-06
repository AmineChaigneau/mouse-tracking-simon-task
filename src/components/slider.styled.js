import styled, { css } from "styled-components";
import { RadioButton } from "./radio.styled";

const trackH = "0.4em";
const thumbD = "1.3em";
const trackC = "#ccced0";
const filllC = "#2EA44F";

const track = css`
  box-sizing: border-box;
  border: none;
  height: 4px;
  background: ${trackC};
  border-radius: 8px;
`;

const trackFill = css`
  --sx: calc(0.5 * ${thumbD} + var(--ratio) * (100% - ${thumbD}));
  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--val) - var(--min)) / var(--range));

  ${track};
  height: 8px;
  background-color: transparent;
  background-image: linear-gradient(${filllC}, ${filllC}), linear-gradient(${trackC}, ${trackC});
  background-size: var(--sx) 8px, calc(100% - var(--sx)) 6px;
  background-position: left center, right center;
  background-repeat: no-repeat;
`;

const fill = css`
  height: ${trackH};
  background: ${filllC};
  border-radius: 4px;
`;

const thumb = css`
  box-sizing: border-box;
  border: none;
  width: ${thumbD};
  height: ${thumbD};
  border-radius: 50%;
  background: white;
  box-shadow: 0px 0px 5px rgba(66, 97, 255, 0.5);
  cursor: pointer;
`;

const Input = styled.input`
  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
  }

  &:focus::-webkit-slider-thumb {
    border: solid 2px #2EA44F;
  }

  &:focus::-moz-range-thumb {
    border: solid 2px #2EA44F;
  }

  &:focus::-ms-thumb {
    border: solid 2px #2EA44F;
  }

  margin: 0;
  padding: 0;
  height: ${thumbD};
  background: transparent;
  font: 1em/1 arial, sans-serif;

  &::-webkit-slider-runnable-track {
    ${trackFill};
  }

  &::-moz-range-track {
    ${track};
  }

  &::-ms-track {
    ${track};
  }

  &::-moz-range-progress {
    ${fill};
  }

  &::-ms-fill-lower {
    ${fill};
  }

  &::-webkit-slider-thumb {
    margin-top: calc(0.5 * (${trackH} - ${thumbD}));
    ${thumb};
  }

  &::-webkit-slider-thumb:hover {
      border: solid 2px #2EA44F;
  }

  &::-moz-range-thumb {
    ${thumb};
  }

  &::-ms-thumb {
    margin-top: 0;
    ${thumb};
  }

  &::-ms-tooltip {
    display: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }
`;

export const Slider = ({
  value,
  ...props
}) => {

  return (
    <Input
      type='range'
      {...props}
      style={{
        width: "100%",
        "--min": 0,
        "--max": 100,
        "--val": value
      }}
    />
  )
}

const Wrapper = styled.form`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const SliderBar = styled.div`
    position: absolute;
    height: 2px;
    width: 100%;
    background: #2F2F2F;
    left: 0px;
    top: 32%;
    transform: translateY(-50%);
    z-index: 5;
`

export const RangeSlider = ({
  max,
  onChange,
  value,
  name,
  row,
  ...props
}) => {

  function range(start = 1, end = 10) {
    const ans = [];
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }

  const arr = range(1, max)

  return (
    <Wrapper name={name} onChange={onChange} value={value} {...props}>
      {arr.map((item, key) => {
        return (
          <div key={key} style={{ zIndex: 10 }}>
            <RadioButton value={item} label={item} row={true} />
          </div>
        )
      })}
      <SliderBar />
    </Wrapper>
  )
}

const StyledNumber = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 0;
  border: solid 2px #2F2F2F;
`

const Radio = styled.input`
  position: absolute;
  left: -9999px;
  &:checked + span {
		background: ${({ theme }) => theme.colors.primary.main};
	}
`

const StyledLabel = styled.label`
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin: 0;
`

const Square = ({
  children,
  value,
  onChange,
  ...props
}) => {

  return (
    <div>
      <StyledLabel>
        <Radio type='radio' value={value} onChange={onChange} name="radio"  {... props}></Radio>
        <Span>{children}</Span>
      </StyledLabel>
    </div>
  )
}

export const RangeNumber = ({
  max,
  onChange,
  value,
  name,
  ...props
}) => {

  function range(start = 1, end = 10) {
    const ans = [];
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }

  const arr = range(1, max)
  return (
    <StyledNumber name={name} onChange={onChange} value={value} {...props}>
      {arr.map((item, key) => {
        return (
          <div key={key}>
            <Square value={item} children={item}/>
          </div>
        )
      })}
    </StyledNumber>
  )
}
