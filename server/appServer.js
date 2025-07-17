const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const feedController = require('./Controller/feedItemController');

const app = express();
const port = 1337;


app.use(express.static('client/public'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/views/index.html'));
});

app.get('/feed', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/views/feed.html'));
});


app.route('/api/feed')
  .get(feedController.getAllFeedItems)
  .post(feedController.saveFeedItem);

app.route('/api/feed/:id')
  .get(feedController.getFeedItemById)
  .delete(feedController.deleteFeedItemById)
  .patch(feedController.updateFeedItemById);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});