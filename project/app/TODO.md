# TODO

## trpc

## server

- [x] finalize server middleware when attempting to fetch usedata. check for app user, create if not existing
- [ ] create stripe router with proteced procedure. solves input validation and auth
- [ ] rate limiting

## email

- [x] setup domain in resend and namecheap
- [x] use resend sdk and vue mail to send emails
- [ ] go trough nuxt config for api key

## auth

- [x] server side auth client
- [x] update to better-auth 1.0
- [x] add OTP support (basic signup impl. done. bug in better-auth 0.8, signin missing)
- [x] remove password signup and login
- [ ] add github signin
- [ ] add email rate limit in auth client and timeout in ui

## stripe

- [x] create stripe account and create products
- [x] stripe backend: add checkout session for immediate client input handling, create webhook for stripe events and database updates

### checkout flow

- [x] email to store for persistency when comming back. dont render step1 after succesfull sign in. show "already signed in"
- [x] step2: product select step
- [x] step3: embedded stripe checkout page

- [Get Access] -> [redirect to /checkout] -> [From with mail] -> [Send pin] -> [verify email] -> [next checkout page (animate to right)] -> [select plan (prefill with product from landingpage)] -> [redirect to stripe checkout] -> [ on webhook payment success] -> [set has_access to true] -> [ close dialog and redirect to /dashboard]

## cookies

- [x] modal with cookie consent

## misc

- [ ] clean up site config runtime config with site urls etc.
- [ ] SEO with [nuxt-seo](https://nuxtseo.com/)
- [ ] [nuxt-security](https://github.com/nuxt-modules/security)
- [ ] posthog
- [ ] for blogpost with good SEO and image for Hero section https://blog.beehiiv.com/p/blog-post-seo-checklist
