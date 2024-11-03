import React from 'react';
import UseRef from './components/UseRef';
import UseMemo from './components/UseMemo';
import UseCallback from './components/UseCallback';
import CustomHooks from './components/CustomHooks';

export default function App() {
  return (
    <div>
      <UseRef />
      <UseMemo />
      <UseCallback />
      <CustomHooks />
    </div>
  );
}