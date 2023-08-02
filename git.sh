# !/bin/bash

echo "copy docs to i18n/zh"
cp -r docs/** i18n/fr/docusaurus-plugin-content-docs/current

echo "Please enter git commit message"
read message

git add .;
git commit -m "$message"
while ! git push; do sleep 2; done