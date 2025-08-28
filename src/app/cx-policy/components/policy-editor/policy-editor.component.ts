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

import { Component } from '@angular/core';
import { PolicyBuilderComponent } from './policy-builder/policy-builder.component';
import { Action, OutputKind, PolicyConfiguration } from '../../models/policy';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { FormatService } from '../../services/format.service';
import { PolicyService } from '../../services/policy.service';
import { DeleteConfirmComponent, ModalAndAlertService } from '@eclipse-edc/dashboard-core';
import { PolicyTemplates } from '../../services/atomic-constraints';

@Component({
  selector: 'app-policy-editor',
  templateUrl: './policy-editor.component.html',
  styleUrls: ['./policy-editor.component.css'],
  standalone: true,
  imports: [PolicyBuilderComponent, FormsModule, NgFor],
})
export class PolicyEditorComponent {
  text!: string;

  outputFormats: string[];
  policyType: Action = Action.Use;
  policyTemplates = {
    access: PolicyTemplates.AccessTemplates(),
    usage: PolicyTemplates.UsageTemplates(),
  };

  currentFormat: OutputKind;

  currentTemplate: PolicyConfiguration;

  constructor(
    public formatService: FormatService,
    public policyService: PolicyService,
    readonly modalService: ModalAndAlertService,
  ) {
    this.currentFormat = OutputKind.Plain;
    this.currentTemplate = this.policyTemplates.usage[0];
    this.outputFormats = policyService.supportedOutput();

    this.updateJsonText(this.currentTemplate, this.currentFormat);
  }

  getTemplates(): PolicyConfiguration[] {
    if (this.policyType === Action.Use) {
      return this.policyTemplates.usage;
    }
    return this.policyTemplates.access;
  }

  onTypeChange(type: Action) {
    const changeType = (to: Action) => {
      this.policyType = to;
      this.currentTemplate.policy.type = to;
    };
    const updatePolicy = (to: Action) => {
      this.currentTemplate.policy.obligations = [];
      this.currentTemplate.policy.prohibitions = [];
      this.currentTemplate.policy.permissions.forEach(x => (x.action = to));
      this.updateJsonText(this.currentTemplate, this.currentFormat);
    };

    changeType(type);

    if (type === Action.Access) {
      if (
        this.currentTemplate.policy.obligations.length !== 0 ||
        this.currentTemplate.policy.prohibitions.length !== 0
      ) {
        let isConfirmed = false;
        const cancelCallback = () => {
          this.modalService.closeModal();
          if (!isConfirmed) {
            changeType(Action.Use);
          }
        };
        this.modalService.openModal(
          DeleteConfirmComponent,
          {
            customText:
              'Access policies ONLY allow permissions. All existing obligations and prohibitions will be deleted!',
          },
          {
            canceled: cancelCallback,
            confirm: () => {
              isConfirmed = true;
              this.modalService.closeModal();
              updatePolicy(Action.Access);
            },
          },
          false,
          cancelCallback,
        );
      } else {
        updatePolicy(Action.Use);
      }
    } else {
      updatePolicy(Action.Use);
    }
  }

  onConfigSelectionChange(cfg: PolicyConfiguration) {
    this.currentTemplate = cfg;
    this.updateJsonText(cfg, this.currentFormat);
  }
  onConfigChange(cfg: PolicyConfiguration) {
    this.updateJsonText(cfg, this.currentFormat);
  }

  updateJsonText(cfg: PolicyConfiguration, format: OutputKind) {
    const ld = this.formatService.toJsonLd(cfg, format);
    this.text = this.formatService.formatPolicy(ld);
  }

  async copyPolicyToClipboard(): Promise<void> {
    await navigator.clipboard.writeText(this.text);
  }

  protected readonly Action = Action;
}
