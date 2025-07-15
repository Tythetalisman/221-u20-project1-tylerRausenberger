


const FeedItem = require('../Model/feedItem');
let feedItems = []; 

exports.getAllFeedItems = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(feedItems);
};

exports.saveFeedItem = (req, res) => {
  const { title, body, linkUrl, imageUrl } = req.body;
  const newItem = new FeedItem(title, body, linkUrl, imageUrl);
  feedItems.push(newItem);
  res.setHeader('Content-Type', 'application/json');
  res.send(feedItems);
};

exports.getFeedItemById = (req, res) => {
  const id = parseInt(req.params.id);
  const item = feedItems[id];
  res.setHeader('Content-Type', 'application/json');
  item ? res.send(item) : res.status(404).send({ error: 'Not found' });
};

exports.deleteFeedItemById = (req, res) => {
  const id = parseInt(req.params.id);
  if (feedItems[id]) {
    feedItems.splice(id, 1);
    res.sendStatus(204); 
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
};

exports.updateFeedItemById = (req, res) => {
  const id = parseInt(req.params.id);
  const item = feedItems[id];
  if (!item) {
    return res.status(404).send({ error: 'Item not found' });
  }

  const { title, body, linkUrl, imageUrl } = req.body;
  if (title) item.title = title;
  if (body) item.body = body;
  if (linkUrl) item.linkUrl = linkUrl;
  if (imageUrl) item.imageUrl = imageUrl;

  res.setHeader('Content-Type', 'application/json');
  res.send(item);
};
