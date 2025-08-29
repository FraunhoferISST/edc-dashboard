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
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtomicConstraint, camelCaseToWords, RightOperand } from '../../../../models/policy';

@Component({
  selector: 'app-atomic-constraint',
  templateUrl: './atomic.constraint.component.html',
  styleUrls: [],
  standalone: true,
  imports: [FormsModule, NgFor],
})
export class AtomicConstraintComponent implements OnInit {
  @Input() constraint!: AtomicConstraint;
  rightOperand?: RightOperand;

  ngOnInit() {
    if (!Array.isArray(this.constraint.rightOperandValue)) {
      this.rightOperand = this.constraint.rightOperandValue as RightOperand;
    }
  }

  protected readonly camelCaseToWords = camelCaseToWords;
}
