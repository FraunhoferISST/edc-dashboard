/*
 *  Copyright (c) 2025 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V.
 *
 *  This program and the accompanying materials are made available under the
 *  terms of the Apache License, Version 2.0 which is available at
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 *  Contributors:
 *       Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V. - initial API and implementation
 *
 */

group = "de.fraunhofer.isst.dst.cx.validator"
version = "0.0.1"

val edcVersion = "0.14.0"
val txVersion = "0.11.0-RC2"


plugins {
  java
  application
  id("com.github.johnrengelman.shadow") version "8.1.1"
}

repositories {
  mavenLocal()
  mavenCentral()
}

dependencies {
  implementation("org.eclipse.edc:controlplane-dcp-bom:${edcVersion}")
  implementation("org.eclipse.edc:jersey-providers-lib:${edcVersion}")
  implementation("org.eclipse.edc:management-api-lib:${edcVersion}")

//  implementation("org.eclipse.tractusx.edc:cx-policy:${txVersion}")
  implementation("org.eclipse.tractusx.edc:cx-policy:0.11.0-LOCAL")
//  implementation("org.eclipse.tractusx.edc:json-ld-core:${txVersion}")
  implementation("org.eclipse.tractusx.edc:json-ld-core:0.11.0-LOCAL")

  implementation("org.eclipse.tractusx.edc:bpn-validation-core:${txVersion}")
  implementation("org.eclipse.tractusx.edc:bdrs-client:${txVersion}")

}

tasks.withType<com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar> {
  exclude("**/pom.properties", "**/pom.xml")
  mergeServiceFiles()
  archiveFileName.set("runtime.jar")
  isZip64 = true
}

application {
  mainClass.set("org.eclipse.edc.boot.system.runtime.BaseRuntime")
}
