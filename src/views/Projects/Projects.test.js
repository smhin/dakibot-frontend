import React from 'react';
import ReactDOM from 'react-dom';
import Projects from './';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Projects />, div);
  ReactDOM.unmountComponentAtNode(div);
})
