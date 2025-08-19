/*******************************************************************************
 * Copyright (c) 2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ******************************************************************************/

import { NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtomicConstraint, Value, ValueKind } from '../../../../models/policy';
import { PolicyService } from '../../../../services/policy.service';
import { ValueExpressionComponent } from './value.expression.component';

@Component({
  selector: 'app-atomic-constraint',
  templateUrl: './atomic.constraint.component.html',
  styleUrls: [],
  standalone: true,
  imports: [FormsModule, NgFor, NgSwitch, NgSwitchCase, ValueExpressionComponent],
})
export class AtomicConstraintComponent {
  operators: string[];
  types: string[];
  @Input() constraint!: AtomicConstraint;
  @Input() disabled = false;

  constructor(policyService: PolicyService) {
    this.operators = policyService.operators();
    this.types = policyService.valueKinds();
  }

  onKindChange(kind: ValueKind) {
    switch (kind) {
      case ValueKind.Number: {
        this.constraint.rightOperand = 0;
        break;
      }
      case ValueKind.String: {
        this.constraint.rightOperand = '';
        break;
      }
      case ValueKind.Value: {
        this.constraint.rightOperand = new Value('', '');
      }
    }
  }
}
