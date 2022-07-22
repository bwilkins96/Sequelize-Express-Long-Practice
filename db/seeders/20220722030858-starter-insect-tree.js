'use strict';

const { Tree, Insect } = require("../models");

const seedData = [
  {
    insect: { name: "Western Pygmy Blue Butterfly" },
    trees: [
      { tree: "General Sherman" },
      { tree: "General Grant" },
      { tree: "Lincoln" },
      { tree: "Stagg" },
    ],
  },
  {
    insect: { name: "Patu Digua Spider" },
    trees: [
      { tree: "Stagg" },
    ],
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {

    for (let dIdx = 0; dIdx < seedData.length; dIdx++) {
      let current = seedData[dIdx];
      let insect = await Insect.findOne( { where: {name: current.insect.name} } );

      let trees = current.trees;
      for (let tIdx = 0; tIdx < trees.length; tIdx++) {
        let treeName = trees[tIdx].tree;
        let tree = await Tree.findOne( { where: {tree: treeName} } );

        await queryInterface.bulkInsert('InsectTrees', [
          { insectId: insect.id , treeId: tree.id }
        ]);
      }
    }

  },

  down: async (queryInterface, Sequelize) => {

    for (let dIdx = 0; dIdx < seedData.length; dIdx++) {
      let current = seedData[dIdx];
      let insect = await Insect.findOne( { where: {name: current.insect.name} } );

      let trees = current.trees;
      for (let tIdx = 0; tIdx < trees.length; tIdx++) {
        let treeName = trees[tIdx].tree;
        let tree = await Tree.findOne( {where: {tree: treeName}} );

        await queryInterface.bulkDelete('InsectTrees', [
          {insectId: insect.id, treeId: tree.id}
        ]);
      }
    }

  }
};
