ARG DISTRO_VERSION=bookworm
FROM debian:${DISTRO_VERSION}-slim

# Restore arg after from:
# https://docs.docker.com/reference/dockerfile#understand-how-arg-and-from-interact
ARG DISTRO_VERSION

# Set language
ENV LANG=C.UTF-8

# Headless apt
ENV DEBIAN_FRONTEND=noninteractive

# Install packages
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get install -y --no-install-recommends \
    curl \ 
    git  \
    apt-transport-https \
    ca-certificates

RUN update-ca-certificates

# Install node lts
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    nodejs

# Intall npm
RUN curl -L https://npmjs.org/install.sh | bash - 

# Install pyhthon
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-wheel \
    python3-setuptools