import React from 'react';
import PersonInfoHeader from '../../components/View/PersonInfoHeader/PersonInfoHeader';
import NavInfoFooter from '../../components/View/NavInfoFooter/NavInfoFooter';

const Tree = () => {
  return (
    <div className="tree">
      <PersonInfoHeader />
      <div>This is a tree!!!</div>
      <div>This is a tree!!!</div>
      <div>This is a tree!!!</div>
      <div>This is a tree!!!</div>
      <div>This is a tree!!!</div>
      <NavInfoFooter />
    </div>
  );
};

export default Tree;