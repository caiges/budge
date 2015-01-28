package main

import (
	"fmt"
	//"gopkg.in/mgo.v2/bson"
	"log"
	"net/http"
)

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

func NewPersonHandler(w http.ResponseWriter, r *http.Request) {
	s := session.Copy()
	defer s.Close()
	c := s.DB("test").C("people")
	err := c.Insert(&Person{"Caige", "caigesn@gmail.com"},
		&Person{"Sara", "saralynnenichols@gmail.com"})
	if err != nil {
		log.Fatal(err)
	}
}
