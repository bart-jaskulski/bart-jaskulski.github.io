#!/usr/bin/env bash

slugify () {
  echo "$@" | iconv -t ascii//TRANSLIT | sed -r s/[^a-zA-Z0-9]+/-/g | sed -r s/^-+\|-+$//g | tr A-Z a-z
}

read -p "Post title: " post_title
FILENAME="$(date +'%Y-%m-%d')-$(slugify $post_title[*])"
cat <<EOF > ./blog/${FILENAME}.md
---
layout: post
title: "${post_title[*]}"
date: $(date +'%Y-%m-%d %H:%M:%S %z')
---
EOF
echo "New post created!"
atom ./_posts/${FILENAME}.md
