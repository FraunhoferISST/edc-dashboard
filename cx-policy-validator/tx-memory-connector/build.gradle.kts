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
  mavenCentral()
}

dependencies {
  implementation("org.eclipse.edc:controlplane-dcp-bom:${edcVersion}")
  implementation("org.eclipse.edc:jersey-providers-lib:${edcVersion}")
  implementation("org.eclipse.edc:management-api-lib:${edcVersion}")
  implementation("org.eclipse.tractusx.edc:cx-policy:${txVersion}")
  implementation("org.eclipse.tractusx.edc:bpn-validation-core:${txVersion}")
  implementation("org.eclipse.tractusx.edc:bdrs-client:${txVersion}")
  implementation("org.eclipse.tractusx.edc:json-ld-core:${txVersion}")
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
