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
  Action,
  AtomicConstraint,
  Constraint,
  Permission,
  PolicyConfiguration,
  RuleType,
} from '../../../models/policy';
import { NgIf } from '@angular/common';
import { PermissionComponent } from './permission/permission.component';
import { FormsModule } from '@angular/forms';
import { RuleSets } from '../../../services/atomic-constraints';

@Component({
  selector: 'app-policy-builder',
  templateUrl: 'policy-builder.component.html',
  styleUrls: ['policy-builder.component.css'],
  standalone: true,
  imports: [NgIf, PermissionComponent, FormsModule],
})
export class PolicyBuilderComponent {
  private _policyConfig!: PolicyConfiguration;

  currentPermission?: Permission;
  constraintTemplates?: AtomicConstraint[];

  @Input()
  get policyConfig() {
    return this._policyConfig;
  }

  set policyConfig(cfg: PolicyConfiguration) {
    this._policyConfig = cfg;
    if (cfg.policy.permissions.length > 0) {
      this.currentPermission = cfg.policy.permissions[0];
      this.changeConstraintTemplates('Permission');
    } else {
      this.currentPermission = undefined;
    }
  }

  @Output() policyChange = new EventEmitter<PolicyConfiguration>();

  changeConstraintTemplates(ruleType: RuleType) {
    switch (this.policyConfig.policy.type) {
      case Action.Access: {
        this.constraintTemplates = RuleSets.AccessPermissions();
        break;
      }
      case Action.Use: {
        switch (ruleType) {
          case 'Permission': {
            this.constraintTemplates = RuleSets.UsagePermissions();
            break;
          }
          case 'Obligation': {
            this.constraintTemplates = RuleSets.UsageObligations();
            break;
          }
          case 'Prohibition': {
            this.constraintTemplates = RuleSets.UsageProhibitions();
            break;
          }
        }
      }
    }
  }

  addRule(ruleType: RuleType) {
    this.currentPermission = new Permission(`New ${ruleType}`);
    switch (ruleType) {
      case 'Permission':
        this.policyConfig.policy.permissions.push(this.currentPermission);
        break;
      case 'Obligation':
        this.policyConfig.policy.obligations.push(this.currentPermission);
        break;
      case 'Prohibition':
        this.policyConfig.policy.prohibitions.push(this.currentPermission);
        break;
    }
    this.policyChange.emit(this.policyConfig);
  }

  onRuleChange() {
    this.policyChange.emit(this.policyConfig);
  }

  onRuleSelectionChange(selection: Permission, ruleType: RuleType) {
    this.currentPermission = selection;
    this.changeConstraintTemplates(ruleType);
  }

  removeRule(target: Permission, ruleType: RuleType) {
    switch (ruleType) {
      case 'Permission':
        this.policyConfig.policy.permissions = this.policyConfig.policy.permissions.filter(item => item != target);
        break;
      case 'Obligation':
        this.policyConfig.policy.obligations = this.policyConfig.policy.obligations.filter(item => item != target);
        break;
      case 'Prohibition':
        this.policyConfig.policy.prohibitions = this.policyConfig.policy.prohibitions.filter(item => item != target);
        break;
    }
    if (target == this.currentPermission) {
      switch (ruleType) {
        case 'Permission':
          this.currentPermission = this.policyConfig.policy.permissions[0] ?? undefined;
          break;
        case 'Obligation':
          this.currentPermission = this.policyConfig.policy.obligations[0] ?? undefined;
          break;
        case 'Prohibition':
          this.currentPermission = this.policyConfig.policy.prohibitions[0] ?? undefined;
          break;
      }
    }
    this.policyChange.emit(this.policyConfig);
  }

  protected readonly Action = Action;
}
