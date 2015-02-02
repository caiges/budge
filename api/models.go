package main

import (
	"gopkg.in/mgo.v2/bson"
)

type Bill struct {
	Id       bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name     string        `json:"name"`
	Amount   float64       `json:"amount"`
	Revision uint16
}

type Person struct {
	Id    bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name  string
	Email string
}
