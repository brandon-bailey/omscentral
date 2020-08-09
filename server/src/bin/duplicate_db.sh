#!/bin/sh

pg_dump $1 -cxO > prod.sql
psql $2 -f prod.sql
rm prod.sql
