# PHP

## Composer
```
# update single package
composer update doctrine/doctrine-fixtures-bundle

# increase composer memory
COMPOSER_MEMORY_LIMIT=-1 composer install

# require a specific branch of a library, prepend with `dev-`
composer require google/apiclient:dev-feature-123 

# errors

# The requested package maple-syrup-group/qp-lib-event-bus dev-kinesis exists as ${LIBRARY}[v1.0.0, ..] but these are rejected by your constraint.
composer clear

# composer not pulling latest library code
composer clearcache
composer upgrade

# view php ini information
php --ini
```