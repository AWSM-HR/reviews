/**
 * @jest-environment jsdom
 */

import React from 'react';
import { createMount, createShallow, createRender } from '@material-ui/core/test-utils';
import App from '../../src/components/App';
import ReviewListControls from '../../src/components/ReviewListControls';
import SearchBar from '../../src/components/SearchBar';
import ReviewList from '../../src/components/ReviewList';
import Pagination from '../../src/components/Pagination';

const fakeReviews = [
  {
    created_at: "2021-01-16T01:04:01.548Z",
    dateOfExperience: "2021-01-16T01:04:01.548Z",
    destination: "Bangkok",
    helpfulVotes: 11,
    images: ["http://d20lp9tw1uk7y6.cloudfront.net/images/tripadvisor_thailand_4.jpg", "http://d20lp9tw1uk7y6.cloudfront.net/images/tripadvisor_thailand_82.jpg", "http://d20lp9tw1uk7y6.cloudfront.net/images/tripadvisor_thailand_23.jpg", "http://d20lp9tw1uk7y6.cloudfront.net/images/tripadvisor_thailand_46.jpg"],
    profilePic: "http://d20lp9tw1uk7y6.cloudfront.net/profilePics/profilePic_people_1.jpg",
    reviewBody: "Et facere aliquam sit eveniet. Ullam deserunt eveniet quos distinctio. Velit nostrum voluptatibus sapiente aut totam molestiae inventore dignissimos porro. Voluptatem nihil qui iste doloribus natus esse. Excepturi praesentium quo earum. Laudantium aliquid voluptas totam enim nostrum.",
    reviewTitle: "dolores vitae quis",
    starRating: 3,
    userHomeLocation: "Niger",
    userName: "Herta Corwin",
  }
];

describe('App component', () => {
  let mount;
  let shallow;

  beforeEach(() => {
    mount = createMount();
    shallow = createShallow();
  });

  test('Renders', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists()).toBe(true);
  });
});
