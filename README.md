# famly-demo

famly-demo is a React demo project.

## Requirements

- Node.js/npm

## Setup instructions

1. Clone the repository or download it as .zip file

2. Rename .env.example file to .env file.

```bash
ren “.env.example” “.env”
```

3. Install dependencies

```bash
npm install
```

4. Run application

```bash
npm start
```

## About app design

Provided API has many vulnerabilities, such as XSRF. Since the access token has to be placed somewhere, my decision was to place it in a .env file and retrieve it via API context, as it is more secure than web storage (localStorage, sessionStorage) usage.

For API calls axios is used instead of fetch, as it is more secure and has built in XSFR protection.

While implementing the axios POST method for check-in I realised that many children had an error response. After checking childId provided within your github repo I found the same child in my fetched data, so I found some children at the end of the list that can be checked in. Error handling is implemented to inform users of errors with toast messages.

Regarding app performance, lazy-load is used and memorization as well. Photos of children are places for better UI/UX even though decreasing performance a bit.

I added some UI/UX just to bring some life to the app :)

# Interested in working for Famly?

Give us a chance to see your beautiful code! 🤩 

How to get started:
- Fork this repository
- Create a small application in React (or another agreed upon framework)
- Describe your design decisions and setup instructions in the README.md of the forked repository

The application should be able to do 3 things:
1. List children with some form of pagination/lazy-loading/infinite-scroll
2. Checkin a child
3. Checkout a child

There are no other requirements than that—don't worry about design or anything like that.

If you have any questions feel free to reach out to ckl@famly.co (Christian) or ab@famly.co (Adam) ☺️

## API Specification

Use this access token: `234ffdb8-0889-4be3-b096-97ab1679752c`

### Fetch some children from

The API does not support any limit or offset, so the pagination/lazy-loading/infinite-scroll will have to be done client-side only.

```
GET https://tryfamly.co/api/daycare/tablet/group
Arguments: {
	accessToken: <accessToken>,
	groupId: '11fc220c-ebba-4e55-9346-cd1eed714620',
	institutionId: 'fb6c8114-387e-4051-8cf7-4e388a77b673'
}
```

Example in cURL:

```bash
$ curl "https://tryfamly.co/api/daycare/tablet/group?accessToken=234ffdb8-0889-4be3-b096-97ab1679752c&groupId=11fc220c-ebba-4e55-9346-cd1eed714620&institutionId=fb6c8114-387e-4051-8cf7-4e388a77b673"
```

### Checkin child
```
POST https://tryfamly.co/api/v2/children/<childId>/checkins

Arguments: {
	accessToken: <accessToken>
	pickupTime: 16:00
}
```

Example in cURL:

```bash
$ curl \
  -d 'accessToken=234ffdb8-0889-4be3-b096-97ab1679752c&pickupTime=16:00' \
  https://tryfamly.co/api/v2/children/fcd683d0-bc31-468c-948f-1ca70b91439d/checkins
```

### Checkout child
```
POST https://tryfamly.co/api/v2/children/<childId>/checkout
Arguments: {
	accessToken: <accessToken>
}
```

Example in cURL:

```bash
$ curl \
  -d 'accessToken=234ffdb8-0889-4be3-b096-97ab1679752c' \
  https://tryfamly.co/api/v2/children/fcd683d0-bc31-468c-948f-1ca70b91439d/checkout
```
