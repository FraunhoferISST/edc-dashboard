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

import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtomicConstraint, Constraint, ConstraintTemplate, LogicalConstraint } from '../../../../../../models/policy';
import { PolicyService } from '../../../../../../services/policy.service';
import { AtomicConstraintComponent } from '../../../constraint/atomic.constraint.component';

@Component({
  selector: 'app-logical-dialog',
  templateUrl: './logical-dialog.component.html',
  standalone: true,
  imports: [FormsModule, NgFor, AtomicConstraintComponent],
})
export class LogicalConstraintDialogComponent implements OnChanges {
  @Input() constraint!: LogicalConstraint;
  @Input() constraints!: ConstraintTemplate[];

  @Output() save = new EventEmitter<LogicalConstraint>();
  @Output() canceled = new EventEmitter<void>();

  logicalOperators: string[];
  operators: string[];
  currentConstraint!: AtomicConstraint;

  constructor(policyService: PolicyService) {
    this.logicalOperators = policyService.logicalOperators();
    this.operators = policyService.operators();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['constraint']) {
      const constraints = this.constraint.constraints
        .filter(c => c instanceof AtomicConstraint)
        .map(c => c as AtomicConstraint);

      if (constraints.length > 0) {
        this.currentConstraint = constraints[0];
      }
    }
  }

  onConstraintAdd(constraint: Constraint) {
    if (constraint instanceof AtomicConstraint) {
      this.currentConstraint = constraint;
    }
  }

  onConstraintRemove(constraint: Constraint) {
    if (constraint instanceof AtomicConstraint) {
      if (this.constraint.constraints.length == 0) {
        this.currentConstraint = new AtomicConstraint();
      }
    }
  }

  onConstraintEdit(constraint: Constraint) {
    this.editConstraint(constraint);
  }

  isEditorDisabled() {
    return this.constraint.constraints.length == 0;
  }

  editConstraint(constraint: Constraint) {
    if (constraint instanceof AtomicConstraint) {
      this.currentConstraint = constraint;
    }
  }
}
