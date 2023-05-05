import { Select } from "antd";
import styled from "styled-components";

const SelectExercise = styled(Select)`
  width: 100%;

  .ant-select-selection-item {
    white-space: normal;
    word-break: break-word;
    min-height: 70px;
    font-weight: bold;
  }

  .ant-select-arrow {
    color: #000;
  }
`;

export default SelectExercise;
