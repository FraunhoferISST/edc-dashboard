// /*******************************************************************************
//  * Copyright (c) 2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
//  * Copyright (c) 2023 Contributors to the Eclipse Foundation
//  *
//  * See the NOTICE file(s) distributed with this work for additional
//  * information regarding copyright ownership.
//  *
//  * This program and the accompanying materials are made available under the
//  * terms of the Apache License, Version 2.0 which is available at
//  * https://www.apache.org/licenses/LICENSE-2.0.
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
//  * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
//  * License for the specific language governing permissions and limitations
//  * under the License.
//  *
//  * SPDX-License-Identifier: Apache-2.0
//  ******************************************************************************/
//
// import { NgIf } from '@angular/common';
// import { Component, Input, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { AtomicConstraint, Value, ValueKind } from '../../../../models/policy';
//
// @Component({
//   selector: 'app-value-expression',
//   templateUrl: './value.expression.component.html',
//   styleUrls: [],
//   standalone: true,
//   imports: [FormsModule, NgIf],
// })
// export class ValueExpressionComponent implements OnInit {
//   @Input() constraint!: AtomicConstraint;
//   @Input() disabled = false;
//
//   value!: Value;
//
//   ngOnInit() {
//     if (this.constraint.kind === ValueKind.Value) {
//       if (this.constraint.rightOperand == null) {
//         this.constraint.rightOperand = new Value();
//       }
//       this.value = this.constraint.rightOperand;
//     }
//   }
// }
