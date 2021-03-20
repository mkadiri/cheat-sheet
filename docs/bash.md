### Bash

```shell
# Nano

# Open a file with line numbers
nano -l /path/to.file

# Jump to a line number 
ctrl + _               

# Remove a line (go to the line first)
ctrl + k                
```

```shell
# awk

# if 3rd column has the value "mkadiri", print out "yes"
ls -l | awk '$3 == "mkadiri" {print "yes"}'
```

```shell
# empty and write to a file
echo "hello world" > hello.txt

# add on to a file
echo "hello world" >> hello.txt

# give file exec priv
chmod +x temp.sh

# logout user
sudo pkill -KILL -u ${USERNAME}

# login as another user
su '${USERNAME}'

# find files with php file ext
find . -name *.php

# check currently logged in user
whoami

# create symbolic link, creates link to bin (application) folder
ln -s ~/.git/kubenv /usr/local/bin/kubenv

```

```shell
# direnv
# https://direnv.net/
# direnv is an extension for your shell. 
# It augments existing shells with a new feature that can load and unload environment variables depending on the current directory.

# install 
brew install direnv
eval "$(direnv hook bash)"

```