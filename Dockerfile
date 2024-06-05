# Base Image
FROM golang:1.22.4-bookworm

# Hugo Version
ENV HUGO_VERSION 0.126.3

# Installing dependencies
RUN apt-get update && apt-get install -y wget

# Downloads the Hugo executable
RUN wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-amd64.deb
RUN dpkg -i hugo_${HUGO_VERSION}_linux-amd64.deb
RUN rm hugo_${HUGO_VERSION}_linux-amd64.deb

# Configuring the project root
WORKDIR /blog
COPY . /blog

# Exposing the port for development
EXPOSE 1313

RUN hugo version

# Define the build and serve commands
# CMD ["sh", "-c", "case \"$1\" in \
#     build) \
#         hugo --minify ;; \
#     serve) \
#         hugo server --bind 0.0.0.0 --buildDrafts --buildFuture ;; \
#     *) \
#         echo 'Usage: docker run <container> (build|serve)' ;; \
#     esac", "$@"]


CMD ["sh", "-c", "case \"$1\" in \
    build) \
        hugo version \
    serve) \
        hugo version \
    *) \
        echo 'Usage: docker run <container> (build|serve)' ;; \
    esac", "$@"]
