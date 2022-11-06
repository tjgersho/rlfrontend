import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
 
import DataTimer from './components/DataTimer';

test('renders data timer counter', () => {
  render(<DataTimer doReset={1} doAction={()=>{}}/>);
  let button = screen.getByText('Get Data');
  fireEvent.click(button);
  expect(screen.getByText('0'));
});
