#!/bin/sh

source .env

mysql -u $DB_USER -p$DB_PASSWORD < db/schema.sql