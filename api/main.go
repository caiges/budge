package main

import (
	"github.com/gorilla/mux"
	"github.com/justinas/alice"
	"github.com/rs/cors"
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

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
	})
	r := mux.NewRouter()
	people := r.PathPrefix("/people").Subrouter()
	people.HandleFunc("/", PeopleHandler)
	people.HandleFunc("/create", NewPersonHandler)
	people.HandleFunc("/show", ShowPersonHandler)

	r.HandleFunc("/bills", BillsHandler).Methods("GET")
	r.HandleFunc("/bills", NewBillHandler).Methods("POST")
	bills := r.PathPrefix("/bills").Subrouter()
	bills.HandleFunc("/", BillsHandler).Methods("GET")
	bills.HandleFunc("/", NewBillHandler).Methods("POST")

	chain := alice.New(c.Handler).Then(r)

	http.Handle("/", r)
	log.Println("Listening...")
	err = http.ListenAndServe(":3000", chain)
	if err != nil {
		log.Fatal(err)
	}
}
