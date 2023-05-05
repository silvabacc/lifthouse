import { Select } from "antd";
import styled from "styled-components";

const SelectExercise = styled(Select)`
  width: 100%;

  .ant-select-selection-item {
    white-space: normal;
    word-break: break-word;
    height: 70px;
  }
`;

export default SelectExercise;
