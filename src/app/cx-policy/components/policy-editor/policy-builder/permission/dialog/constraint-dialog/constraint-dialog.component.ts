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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtomicConstraint, Operator } from '../../../../../../models/policy';
import { AtomicConstraintComponent } from '../../../constraint/atomic.constraint.component';

@Component({
  selector: 'app-constraint-dialog',
  templateUrl: './constraint-dialog.component.html',
  standalone: true,
  imports: [FormsModule, AtomicConstraintComponent],
})
export class ConstraintDialogComponent {
  @Input() constraint!: AtomicConstraint;
  @Output() save = new EventEmitter<AtomicConstraint>();
  @Output() canceled = new EventEmitter<void>();

  operators: string[];

  constructor() {
    this.operators = Object.values(Operator).filter(value => typeof value === 'string') as string[];
  }
}
