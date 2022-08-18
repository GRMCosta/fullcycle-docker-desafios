FROM golang:alpine3.10 AS builder

WORKDIR /usr/app

COPY . .

RUN CGO_ENABLED=0 GOARCH=amd64 GOOS=linux go build -ldflags "-s -w -extldflags '-static'" -o /go/bin/hello

FROM scratch

COPY --from=builder /go/bin/hello /go/bin/hello

ENTRYPOINT [ "/go/bin/hello" ]

