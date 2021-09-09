package chat

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/mantil-io/mantil.go"
)

type AddRequest struct {
	Message *Message
}
type AddResponse struct{}

func (c *Chat) Add(ctx context.Context, req *AddRequest) (*AddResponse, error) {
	req.Message.ID = uuid.NewString()
	t := time.Now()
	req.Message.CreatedAt = &t
	key := fmt.Sprintf("%v_%s", req.Message.CreatedAt, req.Message.ID)
	if err := c.messages.Put(key, req.Message); err != nil {
		return nil, err
	}
	return nil, mantil.Publish("chat-messages", req.Message)
}
