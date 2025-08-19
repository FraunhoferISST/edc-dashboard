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
import {
  AtomicConstraint,
  Constraint,
  ConstraintTemplate,
  LogicalConstraint,
  Permission,
} from '../../../../models/policy';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConstraintDialogComponent } from './dialog/constraint-dialog/constraint-dialog.component';
import { LogicalConstraintDialogComponent } from './dialog/logical-dialog/logical-dialog.component';
import { PolicyService } from '../../../../services/policy.service';
import { ConstraintListComponent } from '../constraint/constraint.list.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  standalone: true,
  imports: [NgFor, FormsModule, ConstraintListComponent],
})
export class PermissionComponent {
  @Input() permission!: Permission;
  actions: string[];

  @Output()
  permissionChange = new EventEmitter<void>();

  @Input() constraints: ConstraintTemplate[] = [];

  constructor(policyService: PolicyService) {
    this.actions = policyService.actions();
    this.constraints = policyService.constraintTemplates();
  }

  onConstraintChange() {
    this.permissionChange.emit();
  }

  onConstraintEdit(constraint: Constraint) {
    // this.editConstraint(constraint);
  }

  // editConstraint(constraint: Constraint) {
  //   const onResult = (result: Constraint) => {
  //     const idx = this.permission.constraints.indexOf(constraint);
  //     if (result != null && idx != -1) {
  //       this.permission.constraints[idx] = result;
  //       this.permissionChange.emit();
  //     }
  //   };
  //   if (constraint instanceof AtomicConstraint) {
  //     const dialogRef = this.dialog.open(ConstraintDialogComponent, {
  //       data: constraint,
  //       minWidth: '400px',
  //     });
  //
  //     dialogRef.afterClosed().subscribe(onResult);
  //   } else if (constraint instanceof LogicalConstraint) {
  //     const dialogRef = this.dialog.open(LogicalConstraintDialogComponent, {
  //       data: {
  //         constraint: constraint,
  //         constraints: this.constraints.filter(c => !c.multiple),
  //       },
  //       minWidth: '600px',
  //     });
  //     dialogRef.afterClosed().subscribe(onResult);
  //   }
  // }
}
