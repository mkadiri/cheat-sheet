# install kdiff3

brew install --cask kdiff3

kdiff3 is /usr/local/bin/kdiff3

git config --global merge.tool kdiff3


# install meld

brew install --cask meld

git config --global merge.tool meld


# beyond compare
brew install --cask beyond-compare

git config --global merge.tool beyond-compare
git config --global diff.tool beyond-compare

git mergetool
