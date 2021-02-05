import React from 'react';
import Proptypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ReviewCard from './ReviewCard';

const noReviewsCard = () => (
  <Card>
    <CardHeader
      title={(
        <Typography variant="subtitle1" color="textPrimary" component="div">
          No results found.
        </Typography>
      )}
      subheader={(
        <Typography display="inline" variant="caption" color="textSecondary" component="p">
          Try removing a filter, changing your search, or clear all to read reviews.
        </Typography>
      )}
    />
  </Card>
);

const ReviewList = ({ reviewsToRender, helpfulClickHandler }) => {
  let reviewList = noReviewsCard();

  if (reviewsToRender.length > 0) {
    reviewList = reviewsToRender.map((review) => {
      const { _id, reviewtitle } = review;
      return (
        <div key={reviewtitle}>

          <ReviewCard
            review={review}
            helpfulClickHandler={helpfulClickHandler}
            key={String(_id)}
          />
          <Divider />
        </div>
      );
    });
  }

  return (
    <div>
      {reviewList}
    </div>
  );
};

ReviewList.propTypes = {
  reviewsToRender: Proptypes.arrayOf(Proptypes.shape({
    created_at: Proptypes.string,
    dateOfExperience: Proptypes.string,
    destination: Proptypes.number,
    helpfulVotes: Proptypes.number,
    images: Proptypes.arrayOf(Proptypes.string),
    profilePic: Proptypes.string,
    reviewBody: Proptypes.string,
    reviewTitle: Proptypes.string,
    starRating: Proptypes.number,
    userHomeLocation: Proptypes.string,
    userName: Proptypes.string,
    _id: Proptypes.string,
  })).isRequired,
  helpfulClickHandler: Proptypes.func.isRequired,
};

export default ReviewList;
