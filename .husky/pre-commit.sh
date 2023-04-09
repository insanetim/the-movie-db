#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint:styles && yarn pretty-quick --staged