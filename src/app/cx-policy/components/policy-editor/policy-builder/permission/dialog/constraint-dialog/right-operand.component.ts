import { Component, EventEmitter, Input, Output } from '@angular/core';
import { camelCaseToWords, RightOperand } from '../../../../../../models/policy';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-right-operand',
  templateUrl: './right-operand.component.html',
  imports: [FormsModule],
})
export class RightOperandComponent {
  @Input() rightOperand!: RightOperand;
  @Input() selectTypes?: RightOperand[];

  @Output() changed = new EventEmitter<RightOperand>();

  getOperandType(): string {
    return this.rightOperand.operandType === 'string' ? 'string' : 'number';
  }

  protected readonly camelCaseToWords = camelCaseToWords;
}
