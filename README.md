 # User sign in project using Node.js & Heroku 
 
### Install package manager

```shell
$ npm init
```

### Install dependencies

```shell
$ npm i express bcryptjs passport
	passport-local ejs express-ejs-layouts
	connect-flash express-session mongoose
```

### Install devDependencies

```shell
$ npm install --save-dev nodemon
$ npm run dev
```

---

### Heroku initial deploy

```shell
$ heroku login
$ heroku create
$ heroku git:remote -a thawing-falls-30759
$ git push heroku master
$ heroku open
```

### Deploy changes to Heroku

```shell
$ git add .
$ git commit -am "commit"
$ git push heroku master
```

Project Link: [https://powerful-lake-53040.herokuapp.com](https://powerful-lake-53040.herokuapp.com)
