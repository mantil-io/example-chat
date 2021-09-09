package chat

import (
	"context"
)

type GetRequest struct {
	Channel string
}
type GetResponse struct {
	Messages []*Message `json:"messages"`
}

func (c *Chat) Get(ctx context.Context, req *GetRequest) (*GetResponse, error) {
	var msgs []*Message
	_, err := c.messages.FindAll(&msgs)
	if err != nil {
		return nil, err
	}
	return &GetResponse{
		Messages: msgs,
	}, nil
}
