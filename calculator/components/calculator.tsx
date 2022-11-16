import { TextField } from "@fluentui/react/lib/TextField";
import { Label } from "@fluentui/react/lib/Label";
import * as React from "react";
import { Stack } from "@fluentui/react/lib/Stack";
import { ServiceProvider } from "pcf-react";
import { TaxCalculatorViewModel } from "../viewmodel/TaxCalculator";
import { observer } from "mobx-react";
import { IconButton } from "@fluentui/react/lib/Button";
import Select from 'react-Select';
export interface CalculatorComponentProps {
  serviceProvider: ServiceProvider;
}
const operators = [
  { label: "+", value: "+" },
  { label: "-", value: "-" },
  { label: "*", value: "*" },
  { label: "%", value: "/" },
];

export class CalculatorComponent extends React.Component<CalculatorComponentProps> {




  render(): JSX.Element {
    const vm = this.props.serviceProvider.get("TaxCalculatorViewModel") as TaxCalculatorViewModel;
    const { calculateMode, amount, tax, valueAfterTax,selectedOption} = vm;
    return (
      <Stack horizontal>
        {calculateMode && (
          <>
            <TextField label="Amount 1" type="number" value={amount.toString()} onChange={vm.onChangeAmount} />
            <TextField label="Amount 2" type="number" value={tax.toString()} onChange={vm.onChangeTax} />
            <div>
              <label><b>Choose Value</b></label>
              <Select options={operators} id="operators" value={vm.selectedOption} onChange={vm.handleChange}/>
            </div>
            
            <TextField
              label="Total Value"
              value={valueAfterTax.toString()}
              type="number"
              onChange={vm.onChangeValueAfterTax}
            />
            <IconButton iconProps={{ iconName: "Accept" }} onClick={vm.onAccept} />
            <IconButton iconProps={{ iconName: "Cancel" }} onClick={vm.onCancel} />
          </>
        )}
        {!calculateMode && (
          <>
            <Label>{valueAfterTax}</Label>
            <IconButton iconProps={{ iconName: "Calculator" }} onClick={vm.onCalculate} />
          </>
        )}
      </Stack>


    );
  }
}

observer(CalculatorComponent);
