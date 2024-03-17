import React from "react";

interface NumberTextProps {
  value: number;
}

const NumberText: React.FC<NumberTextProps> = ({ value }) => (
  <p>{value % 1 !== 0 ? value?.toFixed(1) : value}</p>
);

export default NumberText;
