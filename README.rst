Moltin Ecommerce
=================

A small ecommerce application built on top of Moltin APIs.

Getting up and running
----------------------

The steps below will get you up and running with a local development environment. We assume you have the following installed:

* node
* npm

First, Clone the repository using this command ::

    $ git clone https://github.com/sheeshmohsin/moltin_ecommerce

Then, install the packages using below command ::

    $ cd moltin_ecommerce

    $ npm install

Add variables used in config.js in your local machine as environment variable e.g. using this command ::

    $ export CLIENT_ID="fdsu98ewuafakeweiszdjzo8ew9"
    $ export CLIENT_SECRET="fdsio38dskjfar3iw9ew8fake3uehr3ai348euyu47ey48e"
    $ export EMAIL_HOST_USER="sheeshmohsin@gmail.com"
    $ export EMAIL_HOST_PASSWORD="yourpassword"

Run backend server on port 8000 using below command ::

    $ nodemon

Run frontend server on port 8001 using below command ::

    $ cd frontend/

    $ python2 -m SimpleHTTPServer 8001

Open http://127.0.0.1:8001/ on your browser, you can register and sign in accordingly.
