#!/bin/bash

# Check if postgres command line tools are installed
echo 'Checking for PostgreSQL and command line tools...'
if type createdb; then
	echo 'PostgreSQL is installed...woot!'
else
	echo 'Please install PostgreSQL...here is a link to the mac installation http://postgresapp.com/'
	exit 1
fi

# Check if postgres is running on port 5432
echo 'Checking if PostgreSQL is running...'
if pg_isready; then
	if pg_isready -p 5432; then
		echo 'PostgreSQL is running on port 5432...woot!'
	else
		echo 'PostgreSQL is running, but not on port 5432, please address this'
		exit 1
	fi
else
	echo 'PostgreSQL is NOT running, please start it and try again'
	exit 1
fi

# Check if testing database exists, if not, create it
echo 'Checking if testing database already exists'
if psql -l | grep bridge; then
	echo 'Already have bridge Database...you are good to run integration tests...woot!'
	exit 0
else
	echo 'Creating bridge Database locally...'
	createdb bridge
	echo 'Database succesfully created...you are good to run integration tests...woot!'
fi

echo 'Ending DB Creation!!'
exit 0