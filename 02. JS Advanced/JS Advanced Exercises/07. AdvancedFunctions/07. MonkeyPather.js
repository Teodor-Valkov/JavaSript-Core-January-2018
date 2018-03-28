function solve (input) {
  switch (input) {
    case 'upvote':
      this['upvotes']++;
      break;
    case 'downvote':
      this['downvotes']++;
      break;
    case 'score':
      return score(this);
  }

  function score (object) {
    let upVotes = object['upvotes'];
    let downVotes = object['downvotes'];

    let votesBalance = upVotes - downVotes;
    let votesCount = upVotes + downVotes;

    if (votesCount > 50) {
      let modifier = Math.ceil(Math.max(upVotes, downVotes) * 0.25);
      upVotes += modifier;
      downVotes += modifier;
    }

    let rating = '';

    if (votesCount < 10) {
      rating = 'new';
    } else if (votesBalance < 0) {
      rating = 'unpopular';
    } else if (object['upvotes'] / votesCount > 0.66) {
      rating = 'hot';
    } else if (object['upvotes'] > 100 || object['downvotes'] > 100) {
      rating = 'controversial';
    } else {
      rating = 'new';
    }

    return [upVotes, downVotes, votesBalance, rating];
  }
}

let post = {
  id: '3',
  author: 'emil',
  content: 'wazaaaaa',
  upvotes: 100,
  downvotes: 100
};

solve.call(post, 'upvote');
solve.call(post, 'downvote');

let score = solve.call(post, 'score'); // [127, 127, 0, 'controversial']
for (let i = 0; i < 50; i++) {
  solve.call(post, 'downvote');
}
console.log(score);

score = solve.call(post, 'score'); // [139, 189, -50, 'unpopular']
console.log(score);
