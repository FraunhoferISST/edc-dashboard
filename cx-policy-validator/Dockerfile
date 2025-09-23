#  Copyright (c) 2025 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V.
#  This program and the accompanying materials are made available under the
#  terms of the Apache License, Version 2.0 which is available at
#  https://www.apache.org/licenses/LICENSE-2.0
#
#  SPDX-License-Identifier: Apache-2.0
#
#  Contributors:
#       Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V. - initial API and implementation
#
#

# Download (and cache) dependencies
#FROM gradle:8.14.3-jdk17-alpine AS build
#WORKDIR /app
#ENV GRADLE_OPTS -Dkotlin.compiler.execution.strategy="in-process"
#ENV JAVA_OPTS -XX:-UsePerfData
##COPY gradle/libs.versions.toml gradle/
##COPY buildSrc buildSrc/
##COPY extensions extensions/
##COPY runtimes runtimes/
#COPY tx-memory-connector tx-memory-connector/
#COPY settings.gradle.kts .
##COPY build.gradle.kts .
##ARG RUNTIME_NAME
##COPY runtimes/${RUNTIME_NAME} runtimes/${RUNTIME_NAME}/
#RUN gradle shadowJar --no-daemon --parallel

# Run jar
FROM eclipse-temurin:17.0.16_8-jre-alpine
WORKDIR /app
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
#ARG RUNTIME_NAME
COPY tx-memory-connector/build/libs/runtime.jar /app
COPY tx-memory-connector/config.properties /app

USER nonroot
# Define entrypoint by starting the .jar file with Java
ENTRYPOINT ["java", "-Dedc.fs.config=config.properties", "-jar", "runtime.jar"]
