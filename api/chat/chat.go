package chat

import (
	"log"
	"time"

	"github.com/mantil-io/mantil.go"
)

type Chat struct {
	messages *mantil.KV
}

type Message struct {
	ID        string     `json:"id"`
	User      string     `json:"user"`
	Content   string     `json:"content"`
	CreatedAt *time.Time `json:"createdAt"`
}

func New() *Chat {
	messages, err := mantil.NewKV("messages")
	if err != nil {
		log.Fatal(err)
	}
	return &Chat{
		messages: messages,
	}
}
