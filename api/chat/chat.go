package chat

import (
	"context"
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

type DefaultRequest struct{}
type DefaultResponse struct{}

func New() *Chat {
	messages, err := mantil.NewKV("messages")
	if err != nil {
		log.Fatal(err)
	}
	return &Chat{
		messages: messages,
	}
}

func (c *Chat) Default(ctx context.Context, req *DefaultRequest) (*DefaultResponse, error) {
	panic("not implemented")
}
