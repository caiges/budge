package main

import (
	"gopkg.in/mgo.v2/bson"
)

type Bill struct {
	Id       bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name     string
	Amount   float64
	Revision uint16
}

type Person struct {
	Id    bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name  string
	Email string
}
