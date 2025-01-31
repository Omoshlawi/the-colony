import React, { FC } from "react";

export interface SelectionInputProps<TData, TValue> {
  // Data and extraction props
  data?: TData[];
  initialValue?: TData | TData[];
  keyExtractor?: (item: TData) => string | number;
  labelExtractor?: (item: TData) => string;
  valueExtractor?: (item: TData) => TValue;
}
// TODO Implement to allow accept form input externally as in Image pickers that trigers the dialog
const SelectionInput = <TData, TValue>(
  props: SelectionInputProps<TData, TValue>
) => {
  return <div>SelectionInput</div>;
};

export default SelectionInput;
