# Golang

```shell
# install golang on ubuntu
sudo apt-get update && sudo apt-get install golang-go

# test multiple packages
go test ./...

# build go application, make it verbose and specify output
go build -v -o /bin/app

# running binary
sudo chmod +x [binary]
./[binary]

# building and running binary

# linux
env GOOS=linux GOARCH=amd64 go build -o app && \
chmod +x app && \
./app

# mac os
env GOOS=darwin GOARCH=amd64 go build -o app && \
chmod +x app && \
./app
```

```shell
# create template
pip install cookiecutter

cookiecutter https://github.com/lacion/cookiecutter-golang.git
```