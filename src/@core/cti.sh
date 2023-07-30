#!/bin/sh

npm run cti create "./src/shared/application" -- -i "*test.ts" -b &&
npm run cti create "./src/shared/domain"-- -i "*test.ts" -b &&
npm run cti create "./src/shared/infra" -- -i "*test.ts" -b &&

npm run cti create "./src/category/application" -- -i "*test.ts" -b &&
npm run cti create "./src/category/domain" -- -i "*test.ts" -b &&
npm run cti create "./src/category/infra" -- -i "*test.ts" -b 

