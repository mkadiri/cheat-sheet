# Git

```shell
# create and push tag
git tag v3.0.0
git push --tags

# fatal: refusing to merge unrelated histories 
git pull origin master --allow-unrelated-histories

# returns account used to push/pull
git remote -v

# change remote branch
git remote set-url origin [URL]

# switch accounts
git config --global user.name 'mkadiri'
git config --global user.email 'my@email.com'

# delete tags
git push --delete origin v1.11.1 && git tag --delete v1.11.1  

# revert code to a previous commit
git reset --hard head~1

# store credentials
git config credential.helper store
git pull


# rebase, merge commits in to one
git fetch -p
git rebase -i origin/master

You'll now see an editable page.
- The first commit should have the keyword `pick` prepended
- The remaining should use the keyword `f`
- Save changes and quit `:wq`

git push -f


# amend commit message
git commit --amend
git push -f


# amend commit author
git commit --amend --author="name <email>"
git push -f

# show all commits in one line
git log --oneline

# display all commits of a branch that has yet to be merged in to master
git log --oneline `git merge-base lazy-mo master`..lazy-mo

# pull a branch after rebase to fix `CONFLICT` error (change dest branch if necessary)
git fetch origin && \
git reset --hard origin/develop && \
git pull --rebase

# branch has diverged error
git checkout develop
git branch ${branch} -D
git checkout ${branch}

# view config
git config --list

# find git config location
git config --list --show-origin

# setup keys
ssh-keygen -t ed25519 -C "<comment>"
ssh-add -K ~/.ssh/id_rsa
```