package main

import (
	"gopkg.in/mgo.v2/bson"
)

type Person struct {
	Id    bson.ObjectId `bson:"_id,omitempty"`
	Name  string
	Email string
}
