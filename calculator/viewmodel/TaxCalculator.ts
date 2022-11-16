import { timeStamp } from "console";
import { action, makeObservable, observable } from "mobx";
import { ControlContextService, ParametersChangedEventArgs } from "pcf-react";

export class TaxCalculatorViewModel {
  operator = "";
  amount = 0;
  tax = 20;
  valueAfterTax = 0;
  calculateMode = false;
  selectedOption: null;
  controlContext: ControlContextService;
  constructor(controlContext: ControlContextService) {
    this.controlContext = controlContext;

    makeObservable(this, {
      amount: observable,
      tax: observable,
      valueAfterTax: observable,
      calculateMode: observable,
      onChangeAmount: action.bound,
      onChangeTax: action.bound,
      onChangeValueAfterTax: action.bound,
      onAccept: action.bound,
      onCalculate: action.bound,
      onCancel: action.bound,
      onParametersChanged: action.bound,
      handleChange: action.bound

    });
    this.controlContext.onParametersChangedEvent.subscribe(this.onParametersChanged);
  }
  onParametersChanged(context: ControlContextService, args: ParametersChangedEventArgs): void {
    for (const param of args.updated) {
      switch (param) {
        case "amountAfterTax":
          this.valueAfterTax = args.values[param] as number;
          this.amount = this.valueAfterTax - this.valueAfterTax * (this.tax / 100);
          break;
      }
    }
  }
  onChangeAmount(ev: unknown, value?: string): void {
    this.amount = value ? parseFloat(value) : 0;
    this.valueAfterTax = this.amount + this.amount * (this.tax / 100);
  }
  onChangeTax(ev: unknown, value?: string): void {
    this.tax = value ? parseFloat(value) : 0;
    this.valueAfterTax = this.amount + this.amount * (this.tax / 100);
  }
  onChangeValueAfterTax(ev: unknown, value?: string): void {
    this.valueAfterTax = value ? parseFloat(value) : 0;
    this.amount = this.valueAfterTax - this.valueAfterTax * (this.tax / 100);
  }
  handleChange = (selectedOption: any) => {
    console.log(`Option selected:`, selectedOption.value);
    switch (selectedOption.value) {
      case "+":
        return this.valueAfterTax = this.amount + this.tax;
      case "-":
        return this.valueAfterTax = this.amount - this.tax;
      case "*":
        return this.valueAfterTax = this.amount * this.tax;
      case "/":
        return this.valueAfterTax = this.amount / this.tax;
      default: return null;
    }

  }
  onAccept(): void {
    this.calculateMode = false;
    this.controlContext.setParameters({
      amountAfterTax: this.valueAfterTax,
    });
  }
  onCancel(): void {
    this.calculateMode = false;
  }
  onCalculate(): void {
    this.calculateMode = true;
  }

}
