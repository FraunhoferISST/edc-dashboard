import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { camelCaseToWords, RightOperand } from '../../../../../../models/policy';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-right-operand',
  templateUrl: './right-operand.component.html',
  imports: [ReactiveFormsModule, FormsModule],
})
export class RightOperandComponent implements OnInit {
  @Input() rightOperand!: RightOperand;
  @Input() selectTypes?: RightOperand[];
  @Input() parentFormGroup!: FormGroup;

  @Output() changed = new EventEmitter<RightOperand>();

  readonly uuid: string = crypto.randomUUID();

  ngOnInit() {
    this.updateFormGroup();
  }

  getOperandType(): string {
    return this.rightOperand.operandType === 'string' ? 'string' : 'number';
  }

  onOperandChange(op: RightOperand) {
    this.changed.emit(op);
    this.updateFormGroup();
  }

  compare(a: RightOperand, b: RightOperand): boolean {
    return a && b && a.name === b.name;
  }

  updateFormGroup() {
    if (this.rightOperand.pattern) {
      this.parentFormGroup.setControl(
        this.uuid,
        new FormControl(this.rightOperand.value ?? '', [
          Validators.required,
          Validators.pattern(this.rightOperand.pattern),
        ]),
      );
    } else if (this.parentFormGroup.get(this.uuid)) {
      this.parentFormGroup.removeControl(this.uuid);
    }
  }

  protected readonly camelCaseToWords = camelCaseToWords;
}
