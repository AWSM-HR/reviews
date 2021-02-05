/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Proptypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  typography: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontSize: '0.8rem',
  },
  typographyHeader: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontSize: '1rem',
    fontWeight: '600',
  },
  ratingRow: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  progressBarTrack: {
    backgroundColor: 'grey',
    /* (height of inner div) / 2 + padding */
    width: '6vw',
    padding: '0',
  },
  progressBarIndicator: {
    backgroundColor: 'black',
    width: '40%',
    height: '0.8rem',
  },
  ratingColumn: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  main: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
  },
});

class ReviewFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      travelerRatings: props.travelerRatings,
      handleChangeRatingFilter: props.handleChangeRatingFilter,
      ratings: {
        excellent: false,
        good: false,
        average: false,
        poor: false,
        terrible: false,
      },
      types: {
        families: false,
        couples: false,
        solo: false,
        business: false,
        friends: false,
      },
      timeOfYear: {
        marMay: false,
        junAug: false,
        sepNov: false,
        decFeb: false,
      },
      language: {
        all: true,
        english: false,
        spanish: false,
        french: false,
        italian: false,
        russian: false,
      },
    };
    this.classes = props.classes;

    // technical debt, im building this on saturday of the last week of fec.
    // this would have been cleaner otherwise.
    this.handleRatings = function handleRatings(e) {
      const { ratings, handleChangeRatingFilter } = this.state;
      const rating = e.target.getAttribute('data-key');
      const otherRatings = Object.keys(ratings).filter((item) => item !== rating);
      const filteredRatings = {};
      otherRatings.forEach((key) => {
        filteredRatings[key] = ratings[key];
      });
      filteredRatings[rating] = !ratings[rating];
      const ratingsToInclude = [];
      const ratingKey = {
        excellent: 5,
        good: 4,
        average: 3,
        poor: 2,
        terrible: 1,
      };
      const keys = Object.keys(filteredRatings);
      const values = Object.values(filteredRatings);
      for (let i = 0; i < keys.length; i += 1) {
        if (values[i]) {
          ratingsToInclude.push(ratingKey[keys[i]]);
        }
      }
      this.setState({
        ratings: filteredRatings,
      });
      handleChangeRatingFilter(ratingsToInclude);
    };

    this.handleType = function handleType(e) {
      const { types } = this.state;
      const { handleChangeFilterTravelerType } = this.props;
      const type = e.target.getAttribute('data-key');
      const otherTypes = Object.keys(types).filter((item) => item !== type);
      const filteredtypes = {};
      otherTypes.forEach((key) => {
        filteredtypes[key] = types[key];
      });

      const travelerTypes = [];
      otherTypes.forEach((updatedType) => {
        if (types[updatedType]) {
          travelerTypes.push(updatedType);
        }
      });
      if (!types[type]) {
        travelerTypes.push(type);
      }

      this.setState({
        types: {
          ...filteredtypes,
          [type]: !types[type],
        },
      });

      handleChangeFilterTravelerType(travelerTypes);
    };

    this.handleTimeOfYear = function handleTimeOfYear(e) {
      const { timeOfYear } = this.state;
      const { handleChangeFilterTimeOfYear } = this.props;
      const time = e.target.getAttribute('data-key');
      const otherTimes = Object.keys(timeOfYear).filter((item) => item !== time);
      const filteredTimes = {};
      const shownTimes = [];
      otherTimes.forEach((key) => {
        filteredTimes[key] = timeOfYear[key];
        if (timeOfYear[key]) {
          shownTimes.push(key);
        }
      });
      filteredTimes[time] = !timeOfYear[time];
      if (!timeOfYear[time]) {
        shownTimes.push(time);
      }
      this.setState({
        timeOfYear: {
          ...filteredTimes,
          [time]: !timeOfYear[time],
        },
      });
      // not just grabbing state and passing it in because setState is async
      handleChangeFilterTimeOfYear(shownTimes);
    };

    this.handleLanguage = function handleLanguage(e) {
      const { handleChangeFilterLanguage } = this.props;
      const key = e.target.getAttribute('data-key');
      const val = e.target.checked;
      this.setState({
        language: {
          all: false,
          english: false,
          spanish: false,
          french: false,
          italian: false,
          russian: false,
          [key]: val,
        },
      });
      handleChangeFilterLanguage(key);
    };
  }

  RatingColumn() {
    const { travelerRatings, ratings } = this.state;
    return (
      <Grid item xs={3}>
        <Grid className={this.classes.ratingRow}>
          <Typography className={this.classes.typographyHeader}>Traveler rating</Typography>
        </Grid>
        <div className={this.classes.ratingColumn}>
          <div>
            <Grid item xs className={this.classes.ratingRow}>
              <input data-key="excellent" type="checkbox" onChange={(e) => { this.handleRatings(e); }} checked={ratings.excellent} />
              <Typography className={this.classes.typography}>Excellent</Typography>
            </Grid>
            <Grid item xs className={this.classes.ratingRow}>
              <input data-key="good" type="checkbox" onChange={(e) => { this.handleRatings(e); }} checked={ratings.good} />
              <Typography className={this.classes.typography}>Good</Typography>
            </Grid>
            <Grid item xs className={this.classes.ratingRow}>
              <input data-key="average" type="checkbox" onChange={(e) => { this.handleRatings(e); }} checked={ratings.average} />
              <Typography className={this.classes.typography}>Average</Typography>
            </Grid>
            <Grid item xs className={this.classes.ratingRow}>
              <input data-key="poor" type="checkbox" onChange={(e) => { this.handleRatings(e); }} checked={ratings.poor} />
              <Typography className={this.classes.typography}>Poor</Typography>
            </Grid>
            <Grid item xs className={this.classes.ratingRow}>
              <input data-key="terrible" type="checkbox" onChange={(e) => { this.handleRatings(e); }} checked={ratings.terrible} />
              <Typography className={this.classes.typography}>Terrible</Typography>
            </Grid>
          </div>
          <div>
            <Typography className={this.classes.typography} component="p" data-testid="goodCount">{travelerRatings.excellent}</Typography>
            <Typography className={this.classes.typography} component="p" data-testid="goodCount">{travelerRatings.good}</Typography>
            <Typography className={this.classes.typography} component="p" data-testid="averageCount">{travelerRatings.average}</Typography>
            <Typography className={this.classes.typography} component="p" data-testid="poorCount">{travelerRatings.poor}</Typography>
            <Typography className={this.classes.typography} component="p" data-testid="terribleCount">{travelerRatings.terrible}</Typography>
          </div>
        </div>
      </Grid>
    );
  }

  TravelerTypeColumn() {
    const { types } = this.state;
    return (
      <Grid item xs={3}>
        <Grid className={this.classes.ratingRow}>
          <Typography className={this.classes.typographyHeader}>Traveler type</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input checked={types.families} data-key="families" onChange={(e) => { this.handleType(e); }} type="checkbox" />
          <Typography className={this.classes.typography}>Families</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input checked={types.couples} data-key="couples" onChange={(e) => { this.handleType(e); }} type="checkbox" />
          <Typography className={this.classes.typography}>Couples</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input checked={types.solo} data-key="solo" onChange={(e) => { this.handleType(e); }} type="checkbox" />
          <Typography className={this.classes.typography}>Solo</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input checked={types.business} data-key="business" onChange={(e) => { this.handleType(e); }} type="checkbox" />
          <Typography className={this.classes.typography}>Business</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input checked={types.friends} data-key="friends" onChange={(e) => { this.handleType(e); }} type="checkbox" />
          <Typography className={this.classes.typography}>Friends</Typography>
        </Grid>
      </Grid>
    );
  }

  TimeOfYearColumn() {
    const { timeOfYear } = this.state;
    return (
      <Grid item xs={3}>
        <Grid className={this.classes.ratingRow}>
          <Typography className={this.classes.typographyHeader}>Time of year</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input checked={timeOfYear.marMay} data-key="marMay" onChange={(e) => { this.handleTimeOfYear(e); }} type="checkbox" />
          <Typography className={this.classes.typography}>Mar-May</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input checked={timeOfYear.junAug} data-key="junAug" onChange={(e) => { this.handleTimeOfYear(e); }} type="checkbox" />
          <Typography className={this.classes.typography}>Jun-Aug</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input checked={timeOfYear.sepNov} data-key="sepNov" onChange={(e) => { this.handleTimeOfYear(e); }} type="checkbox" />
          <Typography className={this.classes.typography}>Sep-Nov</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input checked={timeOfYear.decFeb} data-key="decFeb" onChange={(e) => { this.handleTimeOfYear(e); }} type="checkbox" />
          <Typography className={this.classes.typography}>Dec-Feb</Typography>
        </Grid>
      </Grid>
    );
  }

  LanguageColumn() {
    const { language } = this.state;
    return (
      <Grid item xs={3}>
        <Grid className={this.classes.ratingRow}>
          <Typography className={this.classes.typographyHeader}>Language</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input data-key="all" checked={language.all} onChange={(e) => { this.handleLanguage(e); }} type="radio" />
          <Typography className={this.classes.typography}>All languages</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input data-key="english" checked={language.english} onChange={(e) => { this.handleLanguage(e); }} type="radio" />
          <Typography className={this.classes.typography}>English</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input data-key="spanish" checked={language.spanish} onChange={(e) => { this.handleLanguage(e); }} type="radio" />
          <Typography className={this.classes.typography}>Spanish</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input data-key="french" checked={language.french} onChange={(e) => { this.handleLanguage(e); }} type="radio" />
          <Typography className={this.classes.typography}>French</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input data-key="italian" checked={language.italian} onChange={(e) => { this.handleLanguage(e); }} type="radio" />
          <Typography className={this.classes.typography}>Italian</Typography>
        </Grid>
        <Grid className={this.classes.ratingRow}>
          <input data-key="russian" checked={language.russian} onChange={(e) => { this.handleLanguage(e); }} type="radio" />
          <Typography className={this.classes.typography}>Russian</Typography>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container spacing={3} className={this.classes.root}>
        <Grid container item xs={12} spacing={3} className={this.classes.main}>
          {this.RatingColumn()}
          {this.TravelerTypeColumn()}
          {this.TimeOfYearColumn()}
          {this.LanguageColumn()}
        </Grid>
      </Grid>
    );
  }
}

ReviewFilters.propTypes = {
  travelerRatings: Proptypes.shape({
    excellent: Proptypes.number,
    good: Proptypes.number,
    average: Proptypes.number,
    poor: Proptypes.number,
    terrible: Proptypes.number,
  }),
  handleChangeFilterTravelerType: Proptypes.func.isRequired,
  handleChangeFilterTimeOfYear: Proptypes.func.isRequired,
  handleChangeFilterLanguage: Proptypes.func.isRequired,
  handleChangeRatingFilter: Proptypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: Proptypes.object.isRequired,
};

ReviewFilters.defaultProps = {
  travelerRatings: Proptypes.shape({
    excellent: 0,
    good: 0,
    average: 0,
    poor: 0,
    terrible: 0,
  }),
};

export default withStyles(useStyles)(ReviewFilters);
