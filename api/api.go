package main

import (
	"encoding/json"
	"fmt"
	"gopkg.in/mgo.v2/bson"
	"log"
	"net/http"
)

func BillsHandler(w http.ResponseWriter, r *http.Request) {
	s := session.Copy()
	defer s.Close()
	c := s.DB("test").C("bills")
	var results []Bill
	err := c.Find(nil).All(&results)
	if err != nil {
		log.Fatal(err)
	}

	json, err := json.Marshal(results)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v", results)

	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
}

func PeopleHandler(w http.ResponseWriter, r *http.Request) {
	s := session.Copy()
	defer s.Close()
	c := s.DB("test").C("people")
	var results []Person
	err := c.Find(nil).All(&results)
	if err != nil {
		log.Fatal(err)
	}
	for _, person := range results {
		fmt.Println("Email:", person.Email)
	}
}

func ShowPersonHandler(w http.ResponseWriter, r *http.Request) {
	s := session.Copy()
	defer s.Close()

	c := s.DB("test").C("people")
	var person Person
	err := c.FindId(bson.ObjectIdHex("54c999b6752842ae77000004")).One(&person)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Person found: %s", person)
}

func NewPersonHandler(w http.ResponseWriter, r *http.Request) {
	s := session.Copy()
	defer s.Close()
	c := s.DB("test").C("people")
	err := c.Insert(&Person{bson.NewObjectId(), "Caige", "caigesn@gmail.com"},
		&Person{bson.NewObjectId(), "Sara", "saralynnenichols@gmail.com"})
	if err != nil {
		log.Fatal(err)
	}
}
