# TODO

## trpc

## server

- [x] finalize server middleware when attempting to fetch usedata. check for app user, create if not existing
- [ ] how to secure stripe endpoint? trpc routes are secured through trpc middleware on proteced procedures
- [ ] finalize user procedures

## auth

- [x] server side auth client
- [ ] setup domain in resend and namecheap
- [ ] use resend sdk and vue mail to send emails
- [ ] add OTP support
- [ ] remove password signup and login

## stripe

- [ ] create stripe account and create products
- [ ] add checkout session for immediate client input handling, create webhook for stripe events and database updates
- [ ] on checkout without account, create auth user, database user will be created when data is fetched for /dashboard

## cookies

- [x] modal with cookie consent
