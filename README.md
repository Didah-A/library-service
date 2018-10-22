# Library Service
This is a RESTful Library Service that can
- create a book
- update a book
- get a single book
- list all books
- delete a bookk
- borrow a book
- return a book
- list overdue books
- list all available books
- delete all books

_[DEMO]( https://blooming-reaches-19245.herokuapp.com/)_
 
# Getting Started
The program has been fully developed using **Nodejs, Expressjs** while the database implementation uses **Mongoose** and **Mongodb**

## **Pre-requisites**
Below are some of the basic requirements to run the program:
* **Nodejs** should be installed in your computer, if not do so here _[Node download](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjdk56dm4rcAhUOyKQKHWMHC6AQFgglMAA&url=https%3A%2F%2Fnodejs.org%2Fen%2Fdownload%2F&usg=AOvVaw3mpn_kqKBfLUVM2X6RrMKX)_
* **Mongodb** database should also be installed in your computer, if not do so here _[Mongodb Download](https://www.mongodb.com/download-center?initial=true)_
* **Mongodb Compass** database should also be installed in your computer for database management, if not do so here _[Mongodb compass Download](https://www.mongodb.com/download-center?jmp=hero#compass)_
* **Git** should be installed in your computer, if not do so here, _[Git Download](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjxsYyak8zRAhWsI8AKHR9YDL4QFggfMAA&url=https%3A%2F%2Fgit-scm.com%2Fdownloads&usg=AFQjCNHZLDrEFiZHXrz1JGq57NFHFrcfkA&sig2=4ht1GzU2s-G7fLM3fuDxYA)_
* A stable internet connection is recommended

## Installation

Run the following commands to install the project locally.

* `$ git clone https://github.com/Andela-Didacus/library-service.git`

* `$ cd library-service && npm install`

* `create .env file` with the following values 

```
PORT="The port you want your server to run on"
DIALECT="mongodb"
DB_NAME="the database name"
HOST="a url string to the database"
```

* `$ mongod`
* `$ npm run start:dev`

## Endpoints

| Endpoint                              | Allowed Methods  | Functionality                             |
| ------------------------------------- | ---------------- | ----------------------------------------- |
| `api/v1/books`                        | POST             | Create a book                             |
| `api/v1/books`                        | GET              | Gets all books                            |
| `api/v1/books?author=mark`            | GET              | gets all books with author by mark        |
| `api/v1/books?publication_year=1994`  | GET              | gets all books published in 1994          |
| `api/v1/books?available=true`         | GET              | gets all  available books                 |
| `api/v1/books/:id`                    | GET, PUT, DELETE | Retrieve, Update and Delete a book        |
| `api/v1/books/:bookId/borrow`         | PUT              | Borrow a book                             |
| `api/v1/books/:bookId/return`         | PUT              | Return a borrowed book                    |
| `api/v1/books/overdue`                | GET              | Gets all overdue books                    |
 - - - - - - - - - - - - - - - - -  - - - - - - - - - -  - - - - - - - - - - - - - - - -- - - - -
 
 ### Usage
 
 #### POST endpoint payload
 using postman, send a POST request with the following payload to create a book

 ```
 {
	"name": "",
	"author": "",
	"publication_year": "",
	"num_of_pages": ""
}
```

#### PUT endpoint Payload
To Update a book, send a PUT request with the following payload.
```
 {
	"publication_year": "",
	"num_of_pages": ""
}
```
#### Report script

To view a report of all the books and their details enter the following command on your terminal 

```
$ npm run report
```
#### Author

**Didacus Odhiambo** - Software developer, Andela
