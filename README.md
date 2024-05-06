# Invoice sys

## Documentation
[Nuxt](https://nuxt.com/docs/getting-started/introduction) | [Vue](https://vuejs.org/guide/introduction.html) | [Mongoose](https://mongoosejs.com/docs/guide.html)  | [Pinia](https://pinia.vuejs.org/getting-started.html)  | [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
## Setup
Install dependencies
```
$ yarn install
```
Copy .env.exmaple and rename to .env

Create mongoDB localhost database
> mongodb://127.0.0.1:27017/invoice-sys

## Build
```
$ yarn dev
```
Open
> http://localhost:3000/

Try create a user to test the database

## Endpoints

`index` [/](http://localhost:3000/) <br/>
`users index` [/api/users](http://localhost:3000/api/users) <br/>
`users create` [/api/users/create]() <br/>
`users delete` [/api/users/[id]]() <br/>

## License
[MIT](https://choosealicense.com/licenses/mit/)