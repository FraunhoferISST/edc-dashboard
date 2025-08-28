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
import { ModalAndAlertService } from '@eclipse-edc/dashboard-core';
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
  templates: PolicyConfiguration[];

  currentFormat: OutputKind;
  currentTemplate: PolicyConfiguration;

  constructor(
    public formatService: FormatService,
    public policyService: PolicyService,
    readonly modalService: ModalAndAlertService,
  ) {
    this.currentFormat = OutputKind.Plain;
    this.templates = PolicyTemplates.UsageTemplates();
    this.currentTemplate = this.templates[0];
    this.outputFormats = policyService.supportedOutput();

    this.updateJsonText(this.currentTemplate, this.currentFormat);
  }

  onTypeChange(type: Action) {
    this.policyType = type;
    if (type === Action.Use) {
      this.templates = PolicyTemplates.UsageTemplates();
    } else {
      this.templates = PolicyTemplates.AccessTemplates();
    }
    this.currentTemplate = this.templates[0];
  }

  onConfigSelectionChange(cfg: PolicyConfiguration) {
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
