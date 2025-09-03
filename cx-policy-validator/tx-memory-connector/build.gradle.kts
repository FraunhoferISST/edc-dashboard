group = "de.fraunhofer.isst.dst.cx.validator"
version = "0.0.1"

plugins {
  java
  application
  id("com.github.johnrengelman.shadow") version "8.1.1"
}

repositories {
  mavenCentral()
}

dependencies {
  implementation("org.eclipse.edc:controlplane-dcp-bom:0.14.0")
  implementation("org.eclipse.edc:jersey-providers-lib:0.14.0")
  implementation("org.eclipse.edc:management-api-lib:0.14.0")
  implementation("org.eclipse.tractusx.edc:cx-policy:0.11.0-RC1")
  implementation("org.eclipse.tractusx.edc:bpn-validation-core:0.11.0-RC1")
  implementation("org.eclipse.tractusx.edc:bdrs-client:0.11.0-RC1")
  implementation("org.eclipse.tractusx.edc:json-ld-core:0.11.0-RC1")
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
