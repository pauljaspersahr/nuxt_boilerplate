# TODO

## trpc

## server

- [x] finalize server middleware when attempting to fetch usedata. check for app user, create if not existing
- [ ] how to secure stripe endpoint? trpc routes are secured through trpc middleware on proteced procedures
- [ ] finalize user procedures

## email

- [x] setup domain in resend and namecheap
- [x] use resend sdk and vue mail to send emails

## auth

- [x] server side auth client
- [x] update to better-auth 1.0
- [x] add OTP support (basic signup impl. done. bug in better-auth 0.8, signin missing)
- [ ] remove password signup and login
- [ ] add github signin
- [ ] add email rate limit in auth client and timeout in ui

## stripe

- [ ] create stripe account and create products
- [ ] add checkout session for immediate client input handling, create webhook for stripe events and database updates
- [ ] on checkout without account, create auth user, database user will be created when data is fetched for /dashboard

### payment flow

- [Get Access] -> [redirect to /checkout] -> [From with mail] -> [Send pin] -> [verify email] -> [next checkout page (animate to right)] -> [select plan (prefill with product from landingpage)] -> [redirect to stripe checkout] -> [ on webhook payment success] -> [set has_access to true] -> [redirect to /dashboard]
- if signed in but !has_access -> [redirect to /checkout], show user management sidebar

## cookies

- [x] modal with cookie consent

## misc

- [ ] clean up site config runtime config with site urls etc.
- [ ] SEO with [nuxt-seo](https://nuxtseo.com/)
