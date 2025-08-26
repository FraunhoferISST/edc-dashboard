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
import { PolicyConfigurationStore } from '../../stores/policy.store';
import { PolicyService } from '../../services/policy.service';
import { DeleteConfirmComponent, ModalAndAlertService } from '@eclipse-edc/dashboard-core';

@Component({
  selector: 'app-policy-editor',
  templateUrl: './policy-editor.component.html',
  styleUrls: ['./policy-editor.component.css'],
  standalone: true,
  imports: [PolicyBuilderComponent, FormsModule, NgFor],
  providers: [PolicyConfigurationStore],
})
export class PolicyEditorComponent {
  text!: string;

  outputFormats: string[];
  policyConfig: PolicyConfiguration;

  currentFormat: OutputKind;

  configurations: PolicyConfiguration[] = [];

  constructor(
    public formatService: FormatService,
    public store: PolicyConfigurationStore,
    public policyService: PolicyService,
    readonly modalService: ModalAndAlertService,
  ) {
    this.configurations = store.loadConfigurations();
    this.currentFormat = OutputKind.Plain;

    if (this.configurations.length == 0) {
      store.store(new PolicyConfiguration('Policy Template'));
    }
    this.policyConfig = this.configurations[0];
    this.outputFormats = policyService.supportedOutput();

    this.updateJsonText(this.policyConfig, this.currentFormat);
  }

  addPolicy(): void {
    this.policyConfig = new PolicyConfiguration('New Policy');
    this.store.store(this.policyConfig);
  }

  copyPolicy() {
    this.policyConfig = this.policyConfig.clone();
    this.store.store(this.policyConfig);
  }

  onTypeChange(type: Action) {
    const updatePolicy = (to: Action) => {
      this.policyConfig.policy.obligations = [];
      this.policyConfig.policy.prohibitions = [];
      this.policyConfig.policy.permissions.forEach(x => (x.action = to));
      this.updateJsonText(this.policyConfig, this.currentFormat);
    };
    if (type === Action.Access) {
      if (this.policyConfig.policy.obligations.length !== 0 || this.policyConfig.policy.prohibitions.length !== 0) {
        let isConfirmed = false;
        const cancelCallback = () => {
          this.modalService.closeModal();
          if (!isConfirmed) {
            this.policyConfig.policy.type = Action.Use;
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
    this.policyConfig = cfg;
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
