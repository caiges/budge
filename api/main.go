package main

import (
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2"
	"log"
	"net/http"
)

var session *mgo.Session

func main() {
	var err error
	session, err = mgo.Dial("localhost")
	if err != nil {
		panic(err)
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)

	r := mux.NewRouter()
	people := r.PathPrefix("/people").Subrouter()
	people.HandleFunc("/", PeopleHandler)
	people.HandleFunc("/create", NewPersonHandler)
	people.HandleFunc("/show", ShowPersonHandler)

	http.Handle("/", r)
	log.Println("Listening...")
	err = http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
